import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import  Input  from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { FarmCredLogo } from "../components/FarmCredLogo";
import { TrustBadge } from "../components/TrustBadge";
import { useToast } from "../hooks/use-toast";
import { 
  ArrowLeft, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Shield,
  CheckCircle,
  Copy,
  QrCode,
  AlertCircle
} from "lucide-react";

const MakePayment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("25000");
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock loan data
  const loanData = {
    loanId: "FL-2024-001",
    totalAmount: "₦250,000",
    paidAmount: "₦162,500",
    remainingAmount: "₦87,500",
    nextPaymentDue: "Dec 15, 2024",
    monthlyPayment: "₦25,000",
    interestRate: "12%",
    paymentsRemaining: 4
  };

  const paymentMethods = [
    {
      id: "bank-transfer",
      name: "Bank Transfer",
      icon: Building2,
      description: "Direct transfer to FarmCred account",
      processingTime: "Instant verification"
    },
    {
      id: "ussd",
      name: "USSD Code",
      icon: Smartphone,
      description: "Pay using your mobile phone",
      processingTime: "Instant"
    },
    {
      id: "card",
      name: "Debit Card",
      icon: CreditCard,
      description: "Pay with your ATM card",
      processingTime: "Instant"
    }
  ];

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
  };

  const handleProcessPayment = async () => {
    if (!selectedMethod) {
      toast({
        title: "Select Payment Method",
        description: "Please choose a payment method to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Payment Successful!",
        description: `₦${parseInt(paymentAmount).toLocaleString()} has been processed successfully.`,
      });
      
      setIsProcessing(false);
      
      // Redirect to dashboard after success
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }, 3000);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard.`,
    });
  };

  const renderPaymentDetails = () => {
    switch (selectedMethod) {
      case "bank-transfer":
        return (
          <Card className="p-6 bg-primary/5">
            <h3 className="font-semibold mb-4">Bank Transfer Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Bank Name</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">First Bank Nigeria</span>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard("First Bank Nigeria", "Bank name")}>
                    <Copy size={14} />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Account Number</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">2034567890</span>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard("2034567890", "Account number")}>
                    <Copy size={14} />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Account Name</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">FarmCred Payments</span>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard("FarmCred Payments", "Account name")}>
                    <Copy size={14} />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Reference</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{loanData.loanId}</span>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(loanData.loanId, "Reference")}>
                    <Copy size={14} />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-warning/10 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle size={16} className="text-warning mt-0.5" />
                <p className="text-sm text-warning">
                  Please use the reference number {loanData.loanId} when making the transfer to ensure proper crediting.
                </p>
              </div>
            </div>
          </Card>
        );
        
      case "ussd":
        return (
          <Card className="p-6 bg-success/5">
            <h3 className="font-semibold mb-4">USSD Payment</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">*737*50*{paymentAmount}*2034567890#</div>
                <Button variant="outline" onClick={() => copyToClipboard(`*737*50*${paymentAmount}*2034567890#`, "USSD code")}>
                  <Copy size={16} className="mr-2" />
                  Copy USSD Code
                </Button>
              </div>
              
              <div className="space-y-2 text-sm">
                <p><strong>Step 1:</strong> Dial the USSD code above</p>
                <p><strong>Step 2:</strong> Enter your PIN when prompted</p>
                <p><strong>Step 3:</strong> Confirm the payment details</p>
                <p><strong>Step 4:</strong> You'll receive SMS confirmation</p>
              </div>
            </div>
          </Card>
        );
        
      case "card":
        return (
          <Card className="p-6 bg-accent/5">
            <h3 className="font-semibold mb-4">Card Payment</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input id="cardName" placeholder="Name on card" />
              </div>
            </div>
          </Card>
        );
        
      default:
        return null;
    }
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
              <h1 className="text-xl font-semibold">Make Payment</h1>
              <p className="text-sm text-muted-foreground">Secure loan payment portal</p>
            </div>
          </div>
          
          <TrustBadge type="security" label="256-bit SSL" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Loan Summary */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Loan Summary</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Loan ID</div>
                  <div className="font-medium">{loanData.loanId}</div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Next Payment Due</div>
                  <div className="font-medium">{loanData.nextPaymentDue}</div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Monthly Payment</div>
                  <div className="font-medium">{loanData.monthlyPayment}</div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Remaining Balance</div>
                  <div className="font-medium">{loanData.remainingAmount}</div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Payment Progress</span>
                  <span>65% Complete</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </Card>

            {/* Payment Amount */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Payment Amount</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="amount">Amount (₦)</Label>
                  <Input
                    id="amount"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Minimum payment: ₦{loanData.monthlyPayment}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setPaymentAmount("25000")}
                  >
                    Monthly (₦25,000)
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setPaymentAmount("87500")}
                  >
                    Full Balance (₦87,500)
                  </Button>
                </div>
              </div>
            </Card>

            {/* Payment Methods */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedMethod === method.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => handlePaymentMethodSelect(method.id)}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <method.icon size={20} className="text-primary" />
                      <span className="font-medium">{method.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{method.description}</p>
                    <p className="text-xs text-success">{method.processingTime}</p>
                  </div>
                ))}
              </div>
              
              {renderPaymentDetails()}
            </Card>
          </div>

          {/* Payment Summary */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Payment Amount</span>
                  <span className="font-medium">₦{parseInt(paymentAmount || "0").toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Processing Fee</span>
                  <span className="font-medium">₦0</span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-bold text-lg">₦{parseInt(paymentAmount || "0").toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full mt-6" 
                size="lg"
                onClick={handleProcessPayment}
                disabled={isProcessing || !selectedMethod || !paymentAmount}
              >
                {isProcessing ? "Processing..." : "Process Payment"}
              </Button>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield size={20} className="text-success" />
                <h3 className="font-semibold">Secure Payment</h3>
              </div>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-success" />
                  <span>256-bit SSL encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-success" />
                  <span>PCI DSS compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-success" />
                  <span>Instant confirmation</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-3">Need Help?</h3>
              <div className="space-y-2 text-sm">
                <p>📞 Call: 0800-FARMCRED</p>
                <p>📧 Email: payments@farmcred.ng</p>
                <p>💬 WhatsApp: +234 800 123 4567</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakePayment;
