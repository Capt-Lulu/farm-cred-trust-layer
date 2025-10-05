export interface Agent {
  id: string
  name: string
  email: string
  phone: string
  certificationId: string
  location: {
    state: string
    lga: string
    coordinates: {
      latitude: number
      longitude: number
    }
  }
  specializations: string[]
  rating: number
  totalVerifications: number
  isActive: boolean
  profilePhoto?: string
}

export interface VerificationRequest {
  id: string
  farmerId: string
  farmerName: string
  farmerPhone: string
  farmLocation: {
    latitude: number
    longitude: number
    address: string
  }
  farmPhotos: string[]
  farmType: string
  farmSize: string
  requestedAt: Date
  status: "pending" | "assigned" | "in_progress" | "completed" | "rejected"
  assignedAgent?: Agent
  scheduledVisit?: Date
  verificationReport?: VerificationReport
  priority: "low" | "medium" | "high"
}

export interface VerificationReport {
  id: string
  agentId: string
  requestId: string
  visitDate: Date
  farmExists: boolean
  farmSizeAccurate: boolean
  farmTypeAccurate: boolean
  locationAccurate: boolean
  additionalNotes: string
  verificationPhotos: string[]
  gpsCoordinates: {
    latitude: number
    longitude: number
  }
  recommendation: "approve" | "reject" | "requires_additional_info"
  confidenceScore: number // 0-100
  createdAt: Date
}

class AgentVerificationService {
  private readonly API_BASE_URL = "https://api.farmcred.com/v1"
  private readonly API_KEY = "reactkey"

  // Submit farm for agent verification
  async submitForVerification(farmData: {
    farmerId: string
    farmerName: string
    farmerPhone: string
    farmLocation: { latitude: number; longitude: number; address: string }
    farmPhotos: File[]
    farmType: string
    farmSize: string
  }): Promise<{ success: boolean; requestId?: string; error?: string }> {
    try {
      console.log("[v0] Submitting farm for agent verification")

      // Upload photos first
      const photoUrls = await this.uploadFarmPhotos(farmData.farmPhotos)

      const request: Omit<VerificationRequest, "id" | "requestedAt" | "status" | "priority"> = {
        farmerId: farmData.farmerId,
        farmerName: farmData.farmerName,
        farmerPhone: farmData.farmerPhone,
        farmLocation: farmData.farmLocation,
        farmPhotos: photoUrls,
        farmType: farmData.farmType,
        farmSize: farmData.farmSize,
      }

      const response = await fetch(`${this.API_BASE_URL}/verification/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.API_KEY}`,
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const result = await response.json()
      console.log("[v0] Verification request submitted successfully:", result.requestId)

      return {
        success: true,
        requestId: result.requestId,
      }
    } catch (error) {
      console.log("[v0] Error submitting verification request:", error)

      // For demo purposes, simulate successful submission
      if (process.env.NODE_ENV === "development") {
        const mockRequestId = `VR-${Date.now()}`
        console.log("[v0] Simulated verification request ID:", mockRequestId)

        return {
          success: true,
          requestId: mockRequestId,
        }
      }

      return {
        success: false,
        error: "Failed to submit verification request. Please try again.",
      }
    }
  }

  // Get verification status
  async getVerificationStatus(requestId: string): Promise<VerificationRequest | null> {
    try {
      console.log("[v0] Checking verification status for request:", requestId)

      const response = await fetch(`${this.API_BASE_URL}/verification/${requestId}`, {
        headers: {
          Authorization: `Bearer ${this.API_KEY}`,
        },
      })

      if (!response.ok) {
        if (response.status === 404) {
          return null
        }
        throw new Error(`API error: ${response.status}`)
      }

      const request = await response.json()
      return request
    } catch (error) {
      console.log("[v0] Error checking verification status:", error)

      // For demo purposes, simulate verification progress
      if (process.env.NODE_ENV === "development") {
        return this.simulateVerificationProgress(requestId)
      }

      return null
    }
  }

  // Find available agents in area
  async findAgentsInArea(latitude: number, longitude: number, radiusKm = 50): Promise<Agent[]> {
    try {
      console.log("[v0] Finding agents in area:", { latitude, longitude, radiusKm })

      const response = await fetch(`${this.API_BASE_URL}/agents/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.API_KEY}`,
        },
        body: JSON.stringify({
          latitude,
          longitude,
          radiusKm,
          isActive: true,
        }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const agents = await response.json()
      return agents
    } catch (error) {
      console.log("[v0] Error finding agents:", error)

      // For demo purposes, return mock agents
      if (process.env.NODE_ENV === "development") {
        return this.getMockAgents(latitude, longitude)
      }

      return []
    }
  }

  // Upload farm photos
  private async uploadFarmPhotos(photos: File[]): Promise<string[]> {
    const uploadPromises = photos.map(async (photo) => {
      const formData = new FormData()
      formData.append("photo", photo)

      try {
        const response = await fetch(`${this.API_BASE_URL}/upload/farm-photo`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.API_KEY}`,
          },
          body: formData,
        })

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.status}`)
        }

        const result = await response.json()
        return result.url
      } catch (error) {
        console.log("[v0] Photo upload error:", error)
        // Return placeholder URL for demo
        return URL.createObjectURL(photo)
      }
    })

    return Promise.all(uploadPromises)
  }

  // Calculate distance between two coordinates
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371 // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1)
    const dLon = this.toRadians(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180)
  }

  // Demo simulation methods
  private simulateVerificationProgress(requestId: string): VerificationRequest {
    const statuses: VerificationRequest["status"][] = ["pending", "assigned", "in_progress", "completed"]
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

    const mockAgent: Agent = {
      id: "AGT-001",
      name: "Adebayo Ogundimu",
      email: "adebayo.ogundimu@farmcred.com",
      phone: "+2348123456789",
      certificationId: "NAERLS-2024-001",
      location: {
        state: "Lagos",
        lga: "Ikorodu",
        coordinates: { latitude: 6.6018, longitude: 3.5106 },
      },
      specializations: ["Crop Farming", "Livestock", "Farm Management"],
      rating: 4.8,
      totalVerifications: 156,
      isActive: true,
    }

    return {
      id: requestId,
      farmerId: "farmer-123",
      farmerName: "John Doe",
      farmerPhone: "+2348012345678",
      farmLocation: {
        latitude: 6.5244,
        longitude: 3.3792,
        address: "Lagos, Nigeria",
      },
      farmPhotos: [],
      farmType: "crop",
      farmSize: "1-5",
      requestedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      status: randomStatus,
      assignedAgent: randomStatus !== "pending" ? mockAgent : undefined,
      scheduledVisit: randomStatus === "assigned" ? new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) : undefined,
      priority: "medium",
    }
  }

  private getMockAgents(latitude: number, longitude: number): Agent[] {
    return [
      {
        id: "AGT-001",
        name: "Adebayo Ogundimu",
        email: "adebayo.ogundimu@farmcred.com",
        phone: "+2348123456789",
        certificationId: "NAERLS-2024-001",
        location: {
          state: "Lagos",
          lga: "Ikorodu",
          coordinates: { latitude: latitude + 0.1, longitude: longitude + 0.1 },
        },
        specializations: ["Crop Farming", "Livestock", "Farm Management"],
        rating: 4.8,
        totalVerifications: 156,
        isActive: true,
      },
      {
        id: "AGT-002",
        name: "Fatima Abdullahi",
        email: "fatima.abdullahi@farmcred.com",
        phone: "+2348234567890",
        certificationId: "NAERLS-2024-002",
        location: {
          state: "Lagos",
          lga: "Alimosho",
          coordinates: { latitude: latitude - 0.05, longitude: longitude + 0.15 },
        },
        specializations: ["Poultry", "Aquaculture", "Organic Farming"],
        rating: 4.9,
        totalVerifications: 203,
        isActive: true,
      },
      {
        id: "AGT-003",
        name: "Chinedu Okwu",
        email: "chinedu.okwu@farmcred.com",
        phone: "+2348345678901",
        certificationId: "NAERLS-2024-003",
        location: {
          state: "Lagos",
          lga: "Ikeja",
          coordinates: { latitude: latitude + 0.08, longitude: longitude - 0.12 },
        },
        specializations: ["Mixed Farming", "Irrigation Systems", "Soil Management"],
        rating: 4.7,
        totalVerifications: 89,
        isActive: true,
      },
    ]
  }
}

export const agentVerificationService = new AgentVerificationService()
