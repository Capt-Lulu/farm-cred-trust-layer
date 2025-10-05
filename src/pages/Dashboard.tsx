"use client"

import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { FarmCredLogo } from "../components/FarmCredLogo"
import { TrustBadge } from "../components/TrustBadge"
import { StatsCard } from "../components/StatsCard"
import { calculateFarmerCreditScore, exampleFarmerData } from "../lib/creditScoring"
import { useToast } from "../hooks/use-toast"
import { useNavigate } from "react-router-dom"
import {
  User,
  MapPin,
  CreditCard,
  Shield,
  Download,
  Plus,
  TrendingUp,
  Leaf,
  DollarSign,
  Calendar,
  Bell,
  CheckCircle,
} from "lucide-react"

const Dashboard = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  // Calculate actual credit score using the scoring algorithm
  const creditResult = calculateFarmerCreditScore(exampleFarmerData)

  const farmerData = {
    name: "Musa Ibrahim",
    location: "Funtua, Katsina State",
    farmSize: "2.5 hectares",
    cropType: "Maize & Millet",
    creditScore: creditResult.score,
    riskBand: creditResult.riskBand,
    activeLoan: "₦250,000",
    nextPayment: "Dec 15, 2024",
    farmerId: "KT-FT-105401226", // Katsina-Funtua-105401226
    subscores: creditResult.subscores,
  }

  const handleApplyForLoan = () => {
    navigate("/loan-application")
  }

  const handleUpdateFarmData = () => {
    toast({
      title: "Farm Data Update",
      description: "Opening farm data update form...",
    })
    // Navigate to farm data update page
  }

  const handleEditProfile = () => {
    navigate("/profile-editor")
    toast({
      title: "Profile Editor",
      description: "Opening profile editor...",
    })
  }

  const handleCreditScore = () => {
    toast({
      title: "Credit Score Details",
      description: "Showing detailed credit score breakdown...",
    })
    // Navigate to credit score details
  }

  const handleMakePayment = () => {
    navigate("/make-payment")
  }

  const handleAddAsset = () => {
    toast({
      title: "Asset Registration",
      description: "Opening asset registration form...",
    })
    // Simulate asset registration
    setTimeout(() => {
      toast({
        title: "Registration Form Ready",
        description: "Add new farm equipment, livestock, or land assets.",
      })
    }, 1500)
  }

  const handleDownloadCertificate = () => {
    toast({
      title: "Certificate Download",
      description: "Generating collateral certificate PDF...",
    })
    // Simulate certificate generation
    setTimeout(() => {
      toast({
        title: "Download Ready",
        description: "Collateral certificate has been generated successfully.",
      })
    }, 2500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5">
      {/* Header */}
      <div className="bg-background border-b border-border p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <FarmCredLogo size="md" />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-success/10 rounded-full">
              <Shield size={14} className="text-success" />
              <span className="text-xs text-success font-medium">Verified Account</span>
            </div>
            <Button variant="ghost" size="icon">
              <Bell size={20} />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User size={16} className="text-primary-foreground" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium">{farmerData.name}</div>
                <div className="text-xs text-muted-foreground">Verified Farmer</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-hero p-6 rounded-xl text-primary-foreground">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Welcome back, {farmerData.name}!</h1>
              <p className="opacity-90 mb-4">Your farm profile is verified and ready for lending</p>
              <div className="flex flex-wrap gap-2">
                <TrustBadge type="verified" label="NIN Verified" className="bg-white/20 text-white border-white/30" />
                <TrustBadge type="security" label="BVN Linked" className="bg-white/20 text-white border-white/30" />
                <TrustBadge
                  type="rating"
                  label={`Credit Score: ${farmerData.creditScore}`}
                  className="bg-white/20 text-white border-white/30"
                />
              </div>
            </div>
            <div className="text-right">
              <div className="text-right">
                <div className="text-xs text-white/80 mb-1">Farmer ID</div>
                <div className="font-mono text-sm bg-white/20 px-3 py-1 rounded border border-white/30">
                  {farmerData.farmerId}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            icon={DollarSign}
            title="Credit Limit"
            value="₦500,000"
            description="Available for borrowing"
            trend={{ value: "15%", isPositive: true }}
          />
          <div onClick={handleCreditScore} className="cursor-pointer">
            <StatsCard
              icon={TrendingUp}
              title="Credit Score"
              value={`${farmerData.creditScore}/100`}
              description={`${farmerData.riskBand} rating`}
              trend={{ value: "25 pts", isPositive: true }}
            />
          </div>
          <StatsCard icon={Leaf} title="Farm Assets" value={farmerData.farmSize} description="Verified farmland" />
          <StatsCard icon={Calendar} title="Loan Term" value="12 months" description="Current active loan" />
        </div>

        {/* Credit Score Details Modal/Section */}
        <Card className="p-6 bg-gradient-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Credit Score Breakdown</h2>
            <TrustBadge type="verified" label={`${farmerData.creditScore}/100 ${farmerData.riskBand}`} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">18</div>
              <div className="text-xs text-muted-foreground">Identity (20)</div>
              <div className="w-full bg-secondary rounded-full h-2 mt-1">
                <div className="bg-primary h-2 rounded-full" style={{ width: "90%" }}></div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-success">22</div>
              <div className="text-xs text-muted-foreground">Assets (25)</div>
              <div className="w-full bg-secondary rounded-full h-2 mt-1">
                <div className="bg-success h-2 rounded-full" style={{ width: "88%" }}></div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-accent">20</div>
              <div className="text-xs text-muted-foreground">History (25)</div>
              <div className="w-full bg-secondary rounded-full h-2 mt-1">
                <div className="bg-accent h-2 rounded-full" style={{ width: "80%" }}></div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-warning">12</div>
              <div className="text-xs text-muted-foreground">Trust (15)</div>
              <div className="w-full bg-secondary rounded-full h-2 mt-1">
                <div className="bg-warning h-2 rounded-full" style={{ width: "80%" }}></div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-destructive">11</div>
              <div className="text-xs text-muted-foreground">Capacity (15)</div>
              <div className="w-full bg-secondary rounded-full h-2 mt-1">
                <div className="bg-destructive h-2 rounded-full" style={{ width: "73%" }}></div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-success/10 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-success" />
              <span className="text-sm font-medium text-success">Green Risk Band - Qualified for Loans</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Your credit score qualifies you for loans up to ₦500,000 at 12% interest rate.
            </p>
          </div>
        </Card>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Loan */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Active Loan</h2>
                <TrustBadge type="verified" label="On Track" />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Loan Amount</span>
                  <span className="font-semibold">{farmerData.activeLoan}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Next Payment</span>
                  <span className="font-semibold">{farmerData.nextPayment}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Payment Amount</span>
                  <span className="font-semibold">₦25,000</span>
                </div>

                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: "65%" }}></div>
                </div>
                <span className="text-sm text-muted-foreground">65% paid</span>

                <Button className="w-full mt-4" onClick={handleMakePayment}>
                  Make Payment
                </Button>
                </div>
            </Card>

            {/* Farm Assets */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Farm Assets</h2>
                <Button variant="outline" size="sm" onClick={handleAddAsset}>
                  <Plus size={16} className="mr-2" />
                  Add Asset
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{farmerData.location}</h3>
                    <p className="text-sm text-muted-foreground">
                      {farmerData.farmSize} • {farmerData.cropType}
                    </p>
                  </div>
                  <TrustBadge type="verified" label="GPS Verified" />
                </div>

                <Button variant="outline" className="w-full bg-transparent" onClick={handleDownloadCertificate}>
                  <Download size={16} className="mr-2" />
                  Download Collateral Certificate
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleApplyForLoan}>
                  <CreditCard size={16} className="mr-2" />
                  Apply for Loan
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={handleUpdateFarmData}
                >
                  <Shield size={16} className="mr-2" />
                  Update Farm Data
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleEditProfile}>
                  <User size={16} className="mr-2" />
                  Edit Profile
                </Button>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Payment received</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Farm data updated</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Credit score improved</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard