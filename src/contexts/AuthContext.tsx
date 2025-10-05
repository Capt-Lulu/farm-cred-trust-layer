"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User, Session } from "@supabase/supabase-js"
import { supabase } from "../lib/supabase"
import { verificationService, type VerificationResult } from "../services/verification"
import { agentVerificationService } from "../services/agentVerification"

interface UserProfile {
  id: string
  email: string
  fullName: string
  phone: string
  userType: "farmer" | "cooperative" | "bank"
  verificationStatus: {
    nin: { isVerified: boolean; data?: any }
    bvn: { isVerified: boolean; data?: any }
    crossVerification: { isVerified: boolean; data?: any }
    farmVerification: {
      isVerified: boolean
      requestId?: string
      status?: "pending" | "assigned" | "in_progress" | "completed" | "rejected"
    }
  }
  farmData?: {
    location: { latitude: number; longitude: number; address: string }
    photos: string[]
    farmType: string
    farmSize: string
  }
  bankData?: {
    bankName: string
    bankCode: string
  }
  cooperativeData?: {
    cooperativeName: string
    cooperativeId: string
  }
  createdAt: Date
  updatedAt: Date
}

interface AuthContextType {
  user: User | null
  session: Session | null
  userProfile: UserProfile | null
  signIn: (email: string, password: string) => Promise<any>
  signUp: (email: string, password: string, profileData: Partial<UserProfile>) => Promise<any>
  signOut: () => Promise<any>
  updateProfile: (updates: Partial<UserProfile>) => Promise<any>
  verifyIdentity: (nin: string, bvn: string) => Promise<VerificationResult>
  submitFarmVerification: (farmData: any) => Promise<{ success: boolean; requestId?: string; error?: string }>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        loadUserProfile(session.user.id)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)

        if (session?.user) {
          await loadUserProfile(session.user.id)
        } else {
          setUserProfile(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const loadUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", userId)
        .single()

      if (error && error.code !== "PGRST116") {
        console.error("Error loading user profile:", error)
        return
      }

      if (data) {
        setUserProfile(data)
      }
    } catch (error) {
      console.error("Error loading user profile:", error)
    }
  }

  const signIn = async (email: string, password: string) => {
    const result = await supabase.auth.signInWithPassword({ email, password })
    if (result.data.user && !result.error) {
      await loadUserProfile(result.data.user.id)
    }
    return result
  }

  const signUp = async (email: string, password: string, profileData: Partial<UserProfile>) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      })

      if (authError) return { error: authError }

      if (authData.user) {
        const profile: Partial<UserProfile> = {
          id: authData.user.id,
          email: authData.user.email!,
          ...profileData,
          verificationStatus: {
            nin: { isVerified: false },
            bvn: { isVerified: false },
            crossVerification: { isVerified: false },
            farmVerification: { isVerified: false },
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        await supabase.from("user_profiles").insert([profile])
        setUserProfile(profile as UserProfile)
      }

      return { data: authData, error: null }
    } catch (error) {
      return { error: { message: "Unexpected signup error" } }
    }
  }

  const signOut = async () => {
    const result = await supabase.auth.signOut()
    setUserProfile(null)
    return result
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !userProfile) return { error: { message: "No authenticated user" } }

    const updatedProfile = { ...updates, updatedAt: new Date() }
    const { error } = await supabase.from("user_profiles").update(updatedProfile).eq("id", user.id)

    if (error) return { error }

    setUserProfile((prev) => (prev ? { ...prev, ...updatedProfile } : null))
    return { error: null }
  }

  const verifyIdentity = async (nin: string, bvn: string): Promise<VerificationResult> => {
    if (!user || !userProfile) {
      return { isValid: false, error: "NO_USER", message: "No authenticated user" }
    }

    try {
      const result = await verificationService.crossVerifyIdentity(nin, bvn)
      if (result.isValid) {
        const verificationUpdates = {
          verificationStatus: {
            ...userProfile.verificationStatus,
            nin: { isVerified: true, data: result.data?.nin },
            bvn: { isVerified: true, data: result.data?.bvn },
            crossVerification: { isVerified: true, data: result.data },
          },
        }
        await updateProfile(verificationUpdates)
      }
      return result
    } catch {
      return { isValid: false, error: "VERIFICATION_ERROR", message: "Failed to verify identity" }
    }
  }

  const submitFarmVerification = async (farmData: {
    location: { latitude: number; longitude: number; address: string }
    photos: File[]
    farmType: string
    farmSize: string
  }) => {
    if (!user || !userProfile) {
      return { success: false, error: "No authenticated user" }
    }

    if (userProfile.userType !== "farmer") {
      return { success: false, error: "Only farmers can submit farm verification requests" }
    }

    try {
      const result = await agentVerificationService.submitForVerification({
        farmerId: user.id,
        farmerName: userProfile.fullName,
        farmerPhone: userProfile.phone,
        farmLocation: farmData.location,
        farmType: farmData.farmType,
        farmSize: farmData.farmSize,
        photos: farmData.photos,
      })

      if (result.success && result.requestId) {
        await updateProfile({
          verificationStatus: {
            ...userProfile.verificationStatus,
            farmVerification: {
              isVerified: false,
              requestId: result.requestId,
              status: "pending",
            },
          },
        })
      }

      return result
    } catch {
      return { success: false, error: "Failed to submit farm verification" }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        userProfile,
        signIn,
        signUp,
        signOut,
        updateProfile,
        verifyIdentity,
        submitFarmVerification,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
