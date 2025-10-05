import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FarmCredLogo } from "@/components/FarmCredLogo";
import { TrustBadge } from "@/components/TrustBadge";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Eye, Server, Smartphone, AlertTriangle, CheckCircle, Key } from "lucide-react";

const Security = () => {
  const securityFeatures = [
    {
      icon: Lock,
      title: "256-bit SSL Encryption",
      description: "All data transmission is protected with bank-grade encryption standards."
    },
    {
      icon: Shield,
      title: "Multi-Factor Authentication",
      description: "Additional security layers including biometric and SMS verification."
    },
    {
      icon: Server,
      title: "Secure Cloud Infrastructure",
      description: "Data stored in tier-1 data centers with 24/7 monitoring and redundancy."
    },
    {
      icon: Eye,
      title: "Regular Security Audits",
      description: "Independent third-party security assessments and penetration testing."
    },
    {
      icon: Key,
      title: "Access Controls",
      description: "Role-based permissions and principle of least privilege access."
    },
    {
      icon: AlertTriangle,
      title: "Fraud Detection",
      description: "AI-powered monitoring for suspicious activities and fraud prevention."
    }
  ];

  const securityPractices = [
    "End-to-end encryption for all sensitive data",
    "Regular security training for all employees",
    "Incident response team available 24/7",
    "Compliance with international security standards",
    "Automated backup and disaster recovery",
    "Continuous monitoring and threat detection"
  ];

  const userTips = [
    {
      title: "Use Strong Passwords",
      description: "Create unique passwords with a mix of letters, numbers, and symbols."
    },
    {
      title: "Enable Two-Factor Authentication",
      description: "Add an extra layer of security with SMS or app-based verification."
    },
    {
      title: "Keep Information Updated",
      description: "Regularly review and update your profile and contact information."
    },
    {
      title: "Monitor Account Activity",
      description: "Check your account regularly for any unauthorized activities."
    },
    {
      title: "Use Secure Networks",
      description: "Avoid public Wi-Fi for sensitive transactions; use secure networks."
    },
    {
      title: "Report Suspicious Activity",
      description: "Contact us immediately if you notice anything unusual in your account."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5">
      {/* Header */}
      <div className="bg-background border-b border-border p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <FarmCredLogo size="md" />
          </div>
          <Link to="/contact">
            <Button>Contact Security Team</Button>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">Security & Trust</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your security is our top priority. Learn how we protect your data and 
            maintain the highest standards of security across our platform.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <TrustBadge type="security" label="ISO 27001 Certified" />
            <TrustBadge type="verified" label="SOC 2 Compliant" />
            <TrustBadge type="rating" label="Bank-grade Security" />
          </div>
        </div>

        {/* Security Features */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Security Features</h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive protection at every level of our platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="p-6">
                <div className="bg-primary/10 p-4 rounded-full w-fit mx-auto mb-4">
                  <feature.icon size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-center mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground text-center">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Security Standards */}
        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="p-8">
            <CardHeader>
              <CardTitle className="text-2xl">Security Standards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We adhere to the highest international security standards and best practices:
              </p>
              <div className="space-y-3">
                {securityPractices.map((practice, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
                    <span className="text-sm">{practice}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="p-8">
            <CardHeader>
              <CardTitle className="text-2xl">Compliance & Certifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">ISO 27001 Information Security</h4>
                  <p className="text-sm text-muted-foreground">
                    International standard for information security management systems
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">SOC 2 Type II</h4>
                  <p className="text-sm text-muted-foreground">
                    Independent audit of security, availability, and confidentiality
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">Nigerian Data Protection Regulation</h4>
                  <p className="text-sm text-muted-foreground">
                    Full compliance with local data protection requirements
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">PCI DSS Compliance</h4>
                  <p className="text-sm text-muted-foreground">
                    Secure payment card processing standards
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Security Tips */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Keep Your Account Secure</h2>
            <p className="text-lg text-muted-foreground">
              Follow these best practices to maximize your account security
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userTips.map((tip, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-green-500/10 p-2 rounded-full">
                    <Smartphone size={20} className="text-green-500" />
                  </div>
                  <h3 className="font-semibold">{tip.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{tip.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Incident Response */}
        <Card className="p-8 bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <AlertTriangle className="text-red-500" size={32} />
              Security Incident Response
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              If you suspect a security incident or notice suspicious activity:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-red-500/10 p-4 rounded-full w-fit mx-auto mb-3">
                  <span className="text-red-500 font-bold text-lg">1</span>
                </div>
                <h4 className="font-semibold mb-2">Don't Panic</h4>
                <p className="text-sm text-muted-foreground">
                  Stay calm and secure your account immediately
                </p>
              </div>
              <div className="text-center">
                <div className="bg-red-500/10 p-4 rounded-full w-fit mx-auto mb-3">
                  <span className="text-red-500 font-bold text-lg">2</span>
                </div>
                <h4 className="font-semibold mb-2">Change Password</h4>
                <p className="text-sm text-muted-foreground">
                  Immediately change your password and enable 2FA
                </p>
              </div>
              <div className="text-center">
                <div className="bg-red-500/10 p-4 rounded-full w-fit mx-auto mb-3">
                  <span className="text-red-500 font-bold text-lg">3</span>
                </div>
                <h4 className="font-semibold mb-2">Contact Us</h4>
                <p className="text-sm text-muted-foreground">
                  Report the incident to our security team
                </p>
              </div>
            </div>
            <div className="text-center pt-4">
              <Button className="bg-red-500 hover:bg-red-600">
                Report Security Incident
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center space-y-6 py-12 bg-primary/5 rounded-xl">
          <h2 className="text-3xl font-bold">Questions About Security?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our security team is available 24/7 to address any concerns or questions 
            you may have about platform security.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg">Contact Security Team</Button>
            </Link>
            <Button variant="outline" size="lg">
              Security Documentation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
