import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import  Input from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { FarmCredLogo } from "../components/FarmCredLogo";
import { TrustBadge } from "../components/TrustBadge";
import { useToast } from "../hooks/use-toast";
import { calculateFarmerCreditScore, exampleFarmerData } from "../lib/creditScoring";
import { 
  ArrowLeft, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";

const LoanApplication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    loanAmount: "",
    loanPurpose: "",
    repaymentPeriod: "",
    cropType: "",
    expectedYield: "",
    marketPrice: "",
    additionalInfo: ""
  });

  // Calculate credit score for loan recommendations
  const creditResult = calculateFarmerCreditScore(exampleFarmerData);
  const maxLoanAmount = creditResult.recommendedLoanAmount;
  const interestRate = creditResult.interestRate;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.loanAmount || !formData.loanPurpose || !formData.repaymentPeriod) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Check if loan amount exceeds recommendation
    const requestedAmount = parseInt(formData.loanAmount.replace(/,/g, ''));
    if (requestedAmount > maxLoanAmount) {
      toast({
        title: "Amount Exceeds Limit",
        description: `Based on your credit score, we recommend a maximum of ₦${maxLoanAmount.toLocaleString()}`,
        variant: "destructive"
      });
      return;
    }

    // Submit application
    toast({
      title: "Application Submitted!",
      description: "Your loan application has been submitted for review. You'll receive an update within 24 hours.",
    });

    // Redirect to dashboard after a delay
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  const calculateMonthlyPayment = () => {
    const amount = parseInt(formData.loanAmount.replace(/,/g, '')) || 0;
    const months = parseInt(formData.repaymentPeriod) || 12;
    const monthlyRate = (interestRate / 100) / 12;
    
    if (amount && months && monthlyRate) {
      const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                            (Math.pow(1 + monthlyRate, months) - 1);
      return monthlyPayment.toLocaleString();
    }
    return "0";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5">
      {/* Header */}
      <div className="bg-background border-b border-border p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft size={20} />
            </Button>
            <FarmCredLogo size="md" />
            <div className="h-8 w-px bg-border"></div>
            <div>
              <h1 className="text-xl font-semibold">Loan Application</h1>
              <p className="text-sm text-muted-foreground">Apply for agricultural financing</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Credit Score Summary */}
        <Card className="p-6 bg-gradient-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Your Credit Profile</h2>
            <TrustBadge type="verified" label={`${creditResult.score}/100 ${creditResult.riskBand}`} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-success/10 rounded-lg">
              <DollarSign className="mx-auto mb-2 text-success" size={24} />
              <div className="text-2xl font-bold text-success">₦{maxLoanAmount.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Max Loan Amount</div>
            </div>
            
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <TrendingUp className="mx-auto mb-2 text-primary" size={24} />
              <div className="text-2xl font-bold text-primary">{interestRate}%</div>
              <div className="text-sm text-muted-foreground">Interest Rate</div>
            </div>
            
            <div className="text-center p-4 bg-accent/10 rounded-lg">
              <Calendar className="mx-auto mb-2 text-accent" size={24} />
              <div className="text-2xl font-bold text-accent">24 hrs</div>
              <div className="text-sm text-muted-foreground">Processing Time</div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Application Form */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">Loan Application Form</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="loanAmount">Loan Amount (₦) *</Label>
                    <Input
                      id="loanAmount"
                      placeholder="e.g., 250,000"
                      value={formData.loanAmount}
                      onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Maximum: ₦{maxLoanAmount.toLocaleString()}
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="repaymentPeriod">Repayment Period (Months) *</Label>
                    <Select onValueChange={(value) => handleInputChange("repaymentPeriod", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="12">12 months</SelectItem>
                        <SelectItem value="18">18 months</SelectItem>
                        <SelectItem value="24">24 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="loanPurpose">Loan Purpose *</Label>
                  <Select onValueChange={(value) => handleInputChange("loanPurpose", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seeds">Seeds & Seedlings</SelectItem>
                      <SelectItem value="fertilizer">Fertilizer & Chemicals</SelectItem>
                      <SelectItem value="equipment">Farm Equipment</SelectItem>
                      <SelectItem value="livestock">Livestock Purchase</SelectItem>
                      <SelectItem value="irrigation">Irrigation System</SelectItem>
                      <SelectItem value="processing">Processing Equipment</SelectItem>
                      <SelectItem value="working-capital">Working Capital</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cropType">Primary Crop</Label>
                    <Input
                      id="cropType"
                      placeholder="e.g., Maize, Rice, Soybeans"
                      value={formData.cropType}
                      onChange={(e) => handleInputChange("cropType", e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="expectedYield">Expected Yield (kg/ha)</Label>
                    <Input
                      id="expectedYield"
                      placeholder="e.g., 3000"
                      value={formData.expectedYield}
                      onChange={(e) => handleInputChange("expectedYield", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="marketPrice">Expected Market Price (₦/kg)</Label>
                  <Input
                    id="marketPrice"
                    placeholder="e.g., 180"
                    value={formData.marketPrice}
                    onChange={(e) => handleInputChange("marketPrice", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    placeholder="Any additional details about your farming operation or loan request..."
                    value={formData.additionalInfo}
                    onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Submit Application
                </Button>
              </form>
            </Card>
          </div>

          {/* Loan Summary */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Loan Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Requested Amount</span>
                  <span className="font-medium">₦{formData.loanAmount || "0"}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Interest Rate</span>
                  <span className="font-medium">{interestRate}% per annum</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Repayment Period</span>
                  <span className="font-medium">{formData.repaymentPeriod || "0"} months</span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Monthly Payment</span>
                    <span className="font-bold">₦{calculateMonthlyPayment()}</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Required Documents</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-success" />
                  <span className="text-sm">NIN Verification</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-success" />
                  <span className="text-sm">BVN Verification</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-success" />
                  <span className="text-sm">Farm GPS Coordinates</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <AlertCircle size={16} className="text-warning" />
                  <span className="text-sm">Cooperative Endorsement</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-2">
                <Info size={16} className="text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm mb-1">Processing Timeline</h4>
                  <p className="text-xs text-muted-foreground">
                    Applications are typically processed within 24-48 hours. 
                    You'll receive SMS and email updates on your application status.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanApplication;
