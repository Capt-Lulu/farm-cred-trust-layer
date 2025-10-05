"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FarmCredLogo } from "@/components/FarmCredLogo"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Save, User, MapPin, Phone, Briefcase } from "lucide-react"

const ProfileEditor = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [profileData, setProfileData] = useState({
    fullName: "Musa Ibrahim",
    email: "musa.ibrahim@example.com",
    phone: "+234 803 123 4567",
    farmLocation: "Funtua, Katsina State",
    farmSize: "2.5",
    cropType: "Maize & Millet",
    farmingExperience: "8",
    cooperativeMembership: "Funtua Farmers Cooperative",
    bankName: "First Bank of Nigeria",
    accountNumber: "3012345678",
    bvn: "12345678901",
    nin: "12345678901",
    address: "No. 15 Farm Road, Funtua, Katsina State",
    nextOfKin: "Fatima Ibrahim",
    nextOfKinPhone: "+234 802 987 6543",
    emergencyContact: "Ahmad Ibrahim",
    emergencyContactPhone: "+234 805 456 7890",
  })

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveProfile = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      })

      navigate("/dashboard")
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5">
      {/* Header */}
      <div className="bg-background border-b border-border p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
              <ArrowLeft size={16} className="mr-2" />
              Back to Dashboard
            </Button>
            <div className="h-8 w-px bg-border"></div>
            <FarmCredLogo size="md" />
          </div>

          <Button onClick={handleSaveProfile} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
            <Save size={16} className="ml-2" />
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Edit Profile</h1>
          <p className="text-muted-foreground">Update your personal and farm information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <User size={20} className="text-primary" />
              <h2 className="text-lg font-semibold">Personal Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={profileData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={profileData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </Card>

          {/* Farm Information */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={20} className="text-primary" />
              <h2 className="text-lg font-semibold">Farm Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="farmLocation">Farm Location</Label>
                <Input
                  id="farmLocation"
                  value={profileData.farmLocation}
                  onChange={(e) => handleInputChange("farmLocation", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="farmSize">Farm Size (hectares)</Label>
                <Input
                  id="farmSize"
                  type="number"
                  step="0.1"
                  value={profileData.farmSize}
                  onChange={(e) => handleInputChange("farmSize", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="cropType">Primary Crops</Label>
                <Input
                  id="cropType"
                  value={profileData.cropType}
                  onChange={(e) => handleInputChange("cropType", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="farmingExperience">Farming Experience (years)</Label>
                <Input
                  id="farmingExperience"
                  type="number"
                  value={profileData.farmingExperience}
                  onChange={(e) => handleInputChange("farmingExperience", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="cooperativeMembership">Cooperative Membership</Label>
                <Input
                  id="cooperativeMembership"
                  value={profileData.cooperativeMembership}
                  onChange={(e) => handleInputChange("cooperativeMembership", e.target.value)}
                />
              </div>
            </div>
          </Card>

          {/* Banking Information */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase size={20} className="text-primary" />
              <h2 className="text-lg font-semibold">Banking Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="bankName">Bank Name</Label>
                <Select value={profileData.bankName} onValueChange={(value) => handleInputChange("bankName", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="First Bank of Nigeria">First Bank of Nigeria</SelectItem>
                    <SelectItem value="Zenith Bank">Zenith Bank</SelectItem>
                    <SelectItem value="GTBank">GTBank</SelectItem>
                    <SelectItem value="Access Bank">Access Bank</SelectItem>
                    <SelectItem value="UBA">UBA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  value={profileData.accountNumber}
                  onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="bvn">BVN (Bank Verification Number)</Label>
                <Input
                  id="bvn"
                  value={profileData.bvn}
                  onChange={(e) => handleInputChange("bvn", e.target.value)}
                  maxLength={11}
                  disabled
                />
                <p className="text-xs text-muted-foreground mt-1">BVN cannot be changed after verification</p>
              </div>

              <div>
                <Label htmlFor="nin">NIN (National Identity Number)</Label>
                <Input
                  id="nin"
                  value={profileData.nin}
                  onChange={(e) => handleInputChange("nin", e.target.value)}
                  maxLength={11}
                  disabled
                />
                <p className="text-xs text-muted-foreground mt-1">NIN cannot be changed after verification</p>
              </div>
            </div>
          </Card>

          {/* Emergency Contacts */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Phone size={20} className="text-primary" />
              <h2 className="text-lg font-semibold">Emergency Contacts</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="nextOfKin">Next of Kin</Label>
                <Input
                  id="nextOfKin"
                  value={profileData.nextOfKin}
                  onChange={(e) => handleInputChange("nextOfKin", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="nextOfKinPhone">Next of Kin Phone</Label>
                <Input
                  id="nextOfKinPhone"
                  value={profileData.nextOfKinPhone}
                  onChange={(e) => handleInputChange("nextOfKinPhone", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  value={profileData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
                <Input
                  id="emergencyContactPhone"
                  value={profileData.emergencyContactPhone}
                  onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSaveProfile} disabled={isLoading} size="lg">
            {isLoading ? "Saving Changes..." : "Save All Changes"}
            <Save size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProfileEditor
