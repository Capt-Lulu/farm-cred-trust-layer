"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FarmCredLogo } from "@/components/FarmCredLogo"
import { StatsCard } from "@/components/StatsCard"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { nigeriaStates, type State, type LocalGovernment, type Ward } from "@/data/nigeriaData"
import {
  Users,
  MapPin,
  TrendingUp,
  Award,
  Calendar,
  Download,
  Filter,
  Plus,
  Edit,
  Eye,
  Settings,
  ChevronRight,
  Building2,
  Shield,
  LogOut,
} from "lucide-react"

const CooperativeDashboard = () => {
  const { user, userProfile, signOut } = useAuth()
  const [selectedTab, setSelectedTab] = useState("overview")
  const [selectedState, setSelectedState] = useState<State | null>(null)
  const [selectedLGA, setSelectedLGA] = useState<LocalGovernment | null>(null)
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null)

  const handleSignOut = async () => {
    await signOut()
  }

  const cooperativeStats = [
    {
      icon: Users,
      title: "Total Members",
      value: "1,245",
      description: "Active cooperative members",
      trend: { value: "12%", isPositive: true },
    },
    {
      icon: MapPin,
      title: "Total Farm Area",
      value: "2,850 ha",
      description: "Verified farmland",
      trend: { value: "8%", isPositive: true },
    },
    {
      icon: TrendingUp,
      title: "Average Yield",
      value: "3.2 t/ha",
      description: "Current season",
      trend: { value: "15%", isPositive: true },
    },
    {
      icon: Award,
      title: "Success Rate",
      value: "89%",
      description: "Loan repayment rate",
      trend: { value: "5%", isPositive: true },
    },
  ]

  const recentMembers = [
    {
      id: "F001",
      name: "Musa Ibrahim",
      phone: "+234 803 123 4567",
      location: "Funtua, Katsina",
      farmSize: "2.5 ha",
      cropType: "Maize",
      joinDate: "2024-01-15",
      creditScore: 750,
      status: "verified",
    },
    {
      id: "F002",
      name: "Fatima Sani",
      phone: "+234 802 987 6543",
      location: "Zaria, Kaduna",
      farmSize: "1.8 ha",
      cropType: "Rice",
      joinDate: "2024-02-03",
      creditScore: 680,
      status: "pending",
    },
    {
      id: "F003",
      name: "Ahmad Usman",
      phone: "+234 805 456 7890",
      location: "Kano, Kano",
      farmSize: "3.2 ha",
      cropType: "Millet",
      joinDate: "2024-01-28",
      creditScore: 720,
      status: "verified",
    },
  ]

  const upcomingEvents = [
    {
      date: "Dec 15",
      title: "Financial Literacy Workshop",
      time: "10:00 AM",
      attendees: 45,
    },
    {
      date: "Dec 18",
      title: "Seed Distribution Program",
      time: "2:00 PM",
      attendees: 120,
    },
    {
      date: "Dec 22",
      title: "Cooperative Annual Meeting",
      time: "9:00 AM",
      attendees: 300,
    },
  ]

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-success/10 text-success"
      case "pending":
        return "bg-warning/10 text-warning"
      case "rejected":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-secondary/10 text-secondary"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5">
      {/* Header */}
      <div className="bg-background border-b border-border p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <FarmCredLogo size="md" />
            <div className="h-8 w-px bg-border"></div>
            <div>
              <h1 className="text-xl font-semibold">Cooperative Portal</h1>
              <p className="text-sm text-muted-foreground">Secure cooperative management system</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 px-3 py-2 bg-secondary/20 rounded-lg">
              <div className="text-right">
                <p className="text-sm font-medium">{userProfile?.fullName || user?.email}</p>
                <p className="text-xs text-muted-foreground">
                  {userProfile?.cooperativeData?.cooperativeName || "Cooperative User"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
              <Shield size={14} className="text-primary" />
              <span className="text-xs text-primary font-medium">Verified Session</span>
            </div>
            <Button variant="outline" size="sm">
              <Plus size={16} className="mr-2" />
              Add Cooperative
            </Button>
            <Button variant="outline" size="sm">
              <Settings size={16} className="mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <Shield className="text-primary" size={20} />
            <div>
              <h2 className="font-semibold text-primary">Welcome to Your Secure Cooperative Portal</h2>
              <p className="text-sm text-muted-foreground">
                Manage your cooperative members, track activities, and access comprehensive analytics with bank-grade
                security.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Tab Navigation */}
        <div className="flex gap-6">
          {["Overview", "Members", "States & LGAs", "Training", "Reports"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-"))}
              className={`pb-2 border-b-2 font-medium transition-colors ${
                selectedTab === tab.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {selectedTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {cooperativeStats.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">New cooperative registered</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Member training completed</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Executive meeting held</p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Crop Distribution</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Maize</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: "45%" }}></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Rice</span>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "30%" }}></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Soybeans</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: "25%" }}></div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
                <div className="space-y-4">
                  {upcomingEvents.slice(0, 3).map((event, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div>
                        <div className="text-sm font-medium">{event.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {event.date} • {event.time}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {event.attendees}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent" size="sm">
                  <Calendar size={14} className="mr-2" />
                  View All Events
                </Button>
              </Card>
            </div>
          </div>
        )}

        {/* Members Tab */}
        {selectedTab === "members" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Cooperative Members</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter size={16} className="mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download size={16} className="mr-2" />
                  Export
                </Button>
                <Button size="sm">
                  <Plus size={16} className="mr-2" />
                  Add Member
                </Button>
              </div>
            </div>

            <Card className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="text-left p-3">Member</th>
                    <th className="text-left p-3">Contact</th>
                    <th className="text-left p-3">Location</th>
                    <th className="text-left p-3">Farm Details</th>
                    <th className="text-left p-3">Credit Score</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentMembers.map((member) => (
                    <tr key={member.id} className="border-b border-border hover:bg-secondary/50">
                      <td className="p-3">
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.id}</div>
                        </div>
                      </td>
                      <td className="p-3 text-sm">{member.phone}</td>
                      <td className="p-3 text-sm">{member.location}</td>
                      <td className="p-3">
                        <div className="text-sm">
                          <div>{member.cropType}</div>
                          <div className="text-muted-foreground">{member.farmSize}</div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{member.creditScore}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge className={getStatusBadgeColor(member.status)}>{member.status}</Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye size={14} />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        )}

        {/* States & LGAs Tab */}
        {selectedTab === "states-&-lgas" && (
          <div className="space-y-6">
            {!selectedState && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Nigerian States</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {nigeriaStates.map((state) => (
                    <Card
                      key={state.id}
                      className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedState(state)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Building2 className="text-primary" size={20} />
                          <div>
                            <h3 className="font-medium">{state.name}</h3>
                            <p className="text-sm text-muted-foreground">{state.localGovernments.length} LGAs</p>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-muted-foreground" />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {selectedState && !selectedLGA && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedState(null)}>
                    ← Back to States
                  </Button>
                  <span className="text-muted-foreground">|</span>
                  <h2 className="text-xl font-semibold">{selectedState.name} - Local Governments</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedState.localGovernments.map((lga) => (
                    <Card
                      key={lga.id}
                      className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedLGA(lga)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <MapPin className="text-primary" size={20} />
                          <div>
                            <h3 className="font-medium">{lga.name}</h3>
                            <p className="text-sm text-muted-foreground">{lga.wards.length} Wards</p>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-muted-foreground" />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {selectedLGA && !selectedWard && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedLGA(null)}>
                    ← Back to {selectedState?.name}
                  </Button>
                  <span className="text-muted-foreground">|</span>
                  <h2 className="text-xl font-semibold">{selectedLGA.name} - Wards</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedLGA.wards.map((ward) => (
                    <Card
                      key={ward.id}
                      className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedWard(ward)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Users className="text-primary" size={20} />
                          <div>
                            <h3 className="font-medium">{ward.name}</h3>
                            <p className="text-sm text-muted-foreground">{ward.cooperatives.length} Cooperatives</p>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-muted-foreground" />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {selectedWard && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedWard(null)}>
                    ← Back to {selectedLGA?.name}
                  </Button>
                  <span className="text-muted-foreground">|</span>
                  <h2 className="text-xl font-semibold">{selectedWard.name} - Cooperatives</h2>
                </div>
                <div className="space-y-4">
                  {selectedWard.cooperatives.map((cooperative) => (
                    <Card key={cooperative.id} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{cooperative.name}</h3>
                          <p className="text-muted-foreground">{cooperative.address}</p>
                          <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                            <span>Members: {cooperative.memberCount}</span>
                            <span>Est. {cooperative.establishedYear}</span>
                            <span>Reg: {cooperative.registrationNumber}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye size={14} className="mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit size={14} className="mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-3">Executive Committee</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-sm text-muted-foreground">Chairman:</span>
                            <p className="font-medium">{cooperative.executiveCommittee.chairman}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Secretary:</span>
                            <p className="font-medium">{cooperative.executiveCommittee.secretary}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Treasurer:</span>
                            <p className="font-medium">{cooperative.executiveCommittee.treasurer}</p>
                          </div>
                          {cooperative.executiveCommittee.publicRelationsOfficer && (
                            <div>
                              <span className="text-sm text-muted-foreground">PRO:</span>
                              <p className="font-medium">{cooperative.executiveCommittee.publicRelationsOfficer}</p>
                            </div>
                          )}
                        </div>

                        <div className="border-t pt-4 mt-4">
                          <h4 className="font-medium mb-3">Physical Agents</h4>
                          <div className="space-y-3">
                            {cooperative.agents.map((agent) => (
                              <div key={agent.id} className="p-3 bg-secondary/20 rounded-lg">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium">{agent.name}</p>
                                    <p className="text-sm text-muted-foreground">{agent.phone}</p>
                                    <p className="text-sm text-muted-foreground">{agent.email}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-xs text-muted-foreground">Address:</p>
                                    <p className="text-sm">{agent.address}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Training Tab */}
        {selectedTab === "training" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Training Programs</h2>
              <Button size="sm">
                <Plus size={16} className="mr-2" />
                Schedule Training
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">Financial Literacy</h3>
                <p className="text-sm text-muted-foreground mb-4">Basic financial management and loan understanding</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>2 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Participants:</span>
                    <span>45 farmers</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Next Session:</span>
                    <span>Dec 15, 2024</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent" size="sm">
                  View Details
                </Button>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">Modern Farming Techniques</h3>
                <p className="text-sm text-muted-foreground mb-4">Advanced agricultural practices and technology</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>3 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Participants:</span>
                    <span>32 farmers</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Next Session:</span>
                    <span>Dec 20, 2024</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent" size="sm">
                  View Details
                </Button>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">Cooperative Management</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Leadership and governance for cooperative executives
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>1 day</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Participants:</span>
                    <span>15 executives</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Next Session:</span>
                    <span>Dec 25, 2024</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent" size="sm">
                  View Details
                </Button>
              </Card>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {selectedTab === "reports" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Reports & Analytics</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download size={16} className="mr-2" />
                  Export Report
                </Button>
                <Button size="sm">Generate Report</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Membership Growth</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Q1 2024</span>
                    <span className="font-medium">+156 members</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: "65%" }}></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Q2 2024</span>
                    <span className="font-medium">+203 members</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Q3 2024</span>
                    <span className="font-medium">+189 members</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">State Distribution</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Katsina State</span>
                    <span className="font-medium">456 cooperatives</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Kano State</span>
                    <span className="font-medium">389 cooperatives</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Kaduna State</span>
                    <span className="font-medium">334 cooperatives</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Sokoto State</span>
                    <span className="font-medium">278 cooperatives</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Kebbi State</span>
                    <span className="font-medium">234 cooperatives</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CooperativeDashboard
