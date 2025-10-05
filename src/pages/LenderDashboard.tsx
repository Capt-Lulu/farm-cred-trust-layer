import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FarmCredLogo } from "@/components/FarmCredLogo";
import { StatsCard } from "@/components/StatsCard";
import { useState } from "react";
import { calculateFarmerCreditScore, exampleFarmerData } from "@/lib/creditScoring";
import { ContactInfo } from "@/components/ContactInfo";
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Shield,
  Filter,
  Download,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Bell,
  Settings,
  User
} from "lucide-react";

const LenderDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedRiskFilter, setSelectedRiskFilter] = useState("all");

  const lenderStats = [
    {
      icon: Users,
      title: "Total Applications",
      value: "2,456",
      description: "Loan applications received",
      trend: { value: "12%", isPositive: true }
    },
    {
      icon: DollarSign,
      title: "Portfolio Value",
      value: "₦2.4B",
      description: "Total loans disbursed",
      trend: { value: "18%", isPositive: true }
    },
    {
      icon: TrendingUp,
      title: "Approval Rate",
      value: "68%",
      description: "Applications approved",
      trend: { value: "5%", isPositive: true }
    },
    {
      icon: Shield,
      title: "Repayment Rate",
      value: "94%",
      description: "On-time repayments",
      trend: { value: "2%", isPositive: true }
    }
  ];

  // Generate sample applications with real credit scores
  const generateSampleApplications = () => {
    const sampleFarmers = [
      {
        name: "Musa Ibrahim",
        location: "Funtua, Katsina",
        loanAmount: 400000,
        farmSize: "2.5ha",
        cropType: "Maize",
        data: { ...exampleFarmerData, loanAmount: 400000 }
      },
      {
        name: "Fatima Sani",
        location: "Zaria, Kaduna", 
        loanAmount: 200000,
        farmSize: "1.8ha",
        cropType: "Rice",
        data: { 
          ...exampleFarmerData, 
          loanAmount: 200000,
          hectares: 1.8,
          cropTypes: ['Rice'],
          yieldHistory: [2500, 2800, 2600],
          cooperativeRating: 70,
          weatherRisk: 35
        }
      },
      {
        name: "Ahmad Usman",
        location: "Kano, Kano",
        loanAmount: 350000,
        farmSize: "3.2ha", 
        cropType: "Millet",
        data: {
          ...exampleFarmerData,
          loanAmount: 350000,
          hectares: 3.2,
          cropTypes: ['Millet', 'Soybeans'],
          cooperativeRating: 80
        }
      },
      {
        name: "Aisha Mohammed",
        location: "Kaduna, Kaduna",
        loanAmount: 150000,
        farmSize: "1.2ha",
        cropType: "Beans", 
        data: {
          ...exampleFarmerData,
          loanAmount: 150000,
          hectares: 1.2,
          cropTypes: ['Beans'],
          hasCollateral: false,
          yieldHistory: [2200, 2400, 2100],
          cooperativeRating: 65,
          weatherRisk: 40
        }
      },
      {
        name: "Ibrahim Garba",
        location: "Sokoto, Sokoto",
        loanAmount: 500000,
        farmSize: "4.1ha",
        cropType: "Onions",
        data: {
          ...exampleFarmerData,
          loanAmount: 500000,
          hectares: 4.1,
          cropTypes: ['Onions'],
          ninVerified: false,
          yieldHistory: [1800, 2000, 1900],
          cooperativeRating: 45,
          weatherRisk: 60
        }
      }
    ];

    return sampleFarmers.map((farmer, index) => {
      const creditResult = calculateFarmerCreditScore(farmer.data);
      return {
        id: `APP00${index + 1}`,
        farmerName: farmer.name,
        location: farmer.location,
        loanAmount: `₦${farmer.loanAmount.toLocaleString()}`,
        creditScore: creditResult.score,
        riskBand: creditResult.riskBand,
        status: index === 2 ? "approved" : index === 4 ? "rejected" : index === 1 ? "under_review" : "pending",
        appliedDate: new Date(Date.now() - (index + 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        farmSize: farmer.farmSize,
        cropType: farmer.cropType,
        recommendedAmount: `₦${creditResult.recommendedLoanAmount.toLocaleString()}`,
        interestRate: `${creditResult.interestRate}%`
      };
    });
  };

  const recentApplications = generateSampleApplications();

  const getRiskBadgeColor = (riskBand: string) => {
    switch (riskBand) {
      case "Green": return "bg-success/10 text-success border-success/20";
      case "Yellow": return "bg-warning/10 text-warning border-warning/20";
      case "Orange": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "Red": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-secondary/10 text-secondary border-secondary/20";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-success/10 text-success border-success/20";
      case "pending": return "bg-warning/10 text-warning border-warning/20";
      case "under_review": return "bg-primary/10 text-primary border-primary/20";
      case "rejected": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-secondary/10 text-secondary border-secondary/20";
    }
  };

  // Filter applications based on risk band and color coding
  const getFilteredApplications = () => {
    if (selectedRiskFilter === "all") return recentApplications;
    return recentApplications.filter(app => 
      app.riskBand.toLowerCase() === selectedRiskFilter.toLowerCase()
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5">
      {/* Header */}
      <div className="bg-background border-b border-border p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <FarmCredLogo size="md" />
            <div className="h-8 w-px bg-border"></div>
            <div>
              <h1 className="text-xl font-semibold">Financial Institution Portal</h1>
              <p className="text-sm text-muted-foreground">Loan Assessment & Management</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-success/10 rounded-full">
              <Shield size={14} className="text-success" />
              <span className="text-xs text-success font-medium">Secure Session</span>
            </div>
            <Button variant="ghost" size="icon">
              <Bell size={20} />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User size={16} className="text-primary-foreground" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium">First Bank Nigeria</div>
                <div className="text-xs text-muted-foreground">Loan Officer Portal</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Tab Navigation */}
        <div className="flex gap-6">
          {["Overview", "Loan Applications", "Portfolio", "Analytics"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab.toLowerCase().replace(/ /g, '-'))}
              className={`pb-2 border-b-2 font-medium transition-colors ${
                selectedTab === tab.toLowerCase().replace(/ /g, '-')
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
              {lenderStats.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Risk Distribution</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm flex items-center gap-2">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      Green (75-100) - Approve
                    </span>
                    <span className="text-sm font-medium">67%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm flex items-center gap-2">
                      <div className="w-3 h-3 bg-warning rounded-full"></div>
                      Yellow (55-74) - Review
                    </span>
                    <span className="text-sm font-medium">23%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      Orange (35-54) - High Risk
                    </span>
                    <span className="text-sm font-medium">7%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm flex items-center gap-2">
                      <div className="w-3 h-3 bg-destructive rounded-full"></div>
                      Red (0-34) - Reject
                    </span>
                    <span className="text-sm font-medium">3%</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">5 applications approved</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">12 pending review</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">3 require attention</p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Top Performing States</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Katsina</span>
                    <span className="text-sm font-medium">96% repayment</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Kano</span>
                    <span className="text-sm font-medium">94% repayment</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Kaduna</span>
                    <span className="text-sm font-medium">92% repayment</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Loan Applications Tab */}
        {selectedTab === "loan-applications" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Loan Applications</h2>
              <div className="flex gap-2">
                <select 
                  value={selectedRiskFilter}
                  onChange={(e) => setSelectedRiskFilter(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md text-sm bg-background"
                >
                  <option value="all">All Risk Levels</option>
                  <option value="green">Green (Low Risk - Approve)</option>
                  <option value="yellow">Yellow (Medium Risk - Review)</option>
                  <option value="orange">Orange (High Risk)</option>
                  <option value="red">Red (Very High Risk - Reject)</option>
                </select>
                <Button variant="outline" size="sm">
                  <Download size={16} className="mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Risk Band Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="p-4 border-l-4 border-l-success">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Green (Low Risk)</p>
                    <p className="text-2xl font-bold text-success">
                      {getFilteredApplications().filter(app => app.riskBand === 'Green').length}
                    </p>
                  </div>
                  <div className="text-success">75-100 Score</div>
                </div>
              </Card>
              
              <Card className="p-4 border-l-4 border-l-warning">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Yellow (Medium Risk)</p>
                    <p className="text-2xl font-bold text-warning">
                      {getFilteredApplications().filter(app => app.riskBand === 'Yellow').length}
                    </p>
                  </div>
                  <div className="text-warning">55-74 Score</div>
                </div>
              </Card>
              
              <Card className="p-4 border-l-4 border-l-orange-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Orange (High Risk)</p>
                    <p className="text-2xl font-bold text-orange-500">
                      {getFilteredApplications().filter(app => app.riskBand === 'Orange').length}
                    </p>
                  </div>
                  <div className="text-orange-500">35-54 Score</div>
                </div>
              </Card>
              
              <Card className="p-4 border-l-4 border-l-destructive">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Red (Very High Risk)</p>
                    <p className="text-2xl font-bold text-destructive">
                      {getFilteredApplications().filter(app => app.riskBand === 'Red').length}
                    </p>
                  </div>
                  <div className="text-destructive">0-34 Score</div>
                </div>
              </Card>
            </div>
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="text-left p-3">Farmer</th>
                      <th className="text-left p-3">Location</th>
                      <th className="text-left p-3">Loan Amount</th>
                      <th className="text-left p-3">Farm Size</th>
                      <th className="text-left p-3">Crop Type</th>
                      <th className="text-left p-3">Credit Score</th>
                      <th className="text-left p-3">Risk Band</th>
                      <th className="text-left p-3">Recommended</th>
                      <th className="text-left p-3">Interest Rate</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-left p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredApplications().map((app) => (
                      <tr key={app.id} className="border-b border-border hover:bg-secondary/50">
                        <td className="p-3">
                          <div>
                            <div className="font-medium">{app.farmerName}</div>
                            <div className="text-sm text-muted-foreground">{app.id}</div>
                          </div>
                        </td>
                        <td className="p-3 text-sm">{app.location}</td>
                        <td className="p-3 font-medium">{app.loanAmount}</td>
                        <td className="p-3 text-sm">{app.farmSize}</td>
                        <td className="p-3 text-sm">{app.cropType}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{app.creditScore}</span>
                            <div className="w-16 bg-secondary rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${app.creditScore}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge 
                            variant="outline"
                            className={getRiskBadgeColor(app.riskBand)}
                          >
                            {app.riskBand}
                          </Badge>
                        </td>
                        <td className="p-3 font-medium">{app.recommendedAmount}</td>
                        <td className="p-3 text-muted-foreground">{app.interestRate}</td>
                        <td className="p-3">
                          <Badge 
                            variant="outline"
                            className={getStatusBadgeColor(app.status)}
                          >
                            {app.status.replace('_', ' ')}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye size={14} />
                            </Button>
                            {app.status === "pending" && (
                              <>
                                <Button variant="ghost" size="sm" className="text-success">
                                  <CheckCircle size={14} />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-destructive">
                                  <XCircle size={14} />
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Portfolio Tab */}
        {selectedTab === "portfolio" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Loan Portfolio Management</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Active Loans</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Active</span>
                    <span className="font-medium">1,245</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total Value</span>
                    <span className="font-medium">₦1.8B</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg. Loan Size</span>
                    <span className="font-medium">₦145,000</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Performance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">On-time Payments</span>
                    <span className="font-medium text-success">94%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Late Payments</span>
                    <span className="font-medium text-warning">4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Defaults</span>
                    <span className="font-medium text-destructive">2%</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Risk Distribution</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-success">Green Risk</span>
                    <span className="font-medium">67%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-warning">Yellow Risk</span>
                    <span className="font-medium">23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-destructive">High Risk</span>
                    <span className="font-medium">10%</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {selectedTab === "analytics" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Lending Analytics</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Monthly Disbursements</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">January 2024</span>
                    <span className="font-medium">₦245M</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">February 2024</span>
                    <span className="font-medium">₦312M</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">March 2024</span>
                    <span className="font-medium">₦278M</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">State Performance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Katsina State</span>
                    <span className="font-medium text-success">96% repayment</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Kano State</span>
                    <span className="font-medium text-success">94% repayment</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Kaduna State</span>
                    <span className="font-medium text-success">92% repayment</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Sokoto State</span>
                    <span className="font-medium text-warning">88% repayment</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Kebbi State</span>
                    <span className="font-medium text-warning">85% repayment</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
        
        {/* Contact Support Section */}
        <Card className="p-6 mt-6">
          <h2 className="text-lg font-semibold mb-4">Contact Support</h2>
          <ContactInfo variant="card" />
        </Card>
      </div>
    </div>
  );
};

export default LenderDashboard;
