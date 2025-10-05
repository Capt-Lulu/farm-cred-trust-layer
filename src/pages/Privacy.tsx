import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FarmCredLogo } from "@/components/FarmCredLogo";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Eye, Lock, Users } from "lucide-react";

const Privacy = () => {
  const privacyPrinciples = [
    {
      icon: Shield,
      title: "Data Protection",
      description: "We use industry-standard encryption and security measures to protect your personal information."
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "We clearly explain what data we collect, how we use it, and who we share it with."
    },
    {
      icon: Lock,
      title: "Data Minimization",
      description: "We only collect the minimum data necessary to provide our services effectively."
    },
    {
      icon: Users,
      title: "User Control",
      description: "You have control over your data and can request access, correction, or deletion at any time."
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
            <Button>Contact Us</Button>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">
            Last updated: December 2024
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            At FarmCred, we take your privacy seriously. This policy explains how we collect, 
            use, and protect your personal information.
          </p>
        </div>

        {/* Privacy Principles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {privacyPrinciples.map((principle, index) => (
            <Card key={index} className="p-6 text-center">
              <div className="bg-primary/10 p-4 rounded-full w-fit mx-auto mb-4">
                <principle.icon size={32} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{principle.title}</h3>
              <p className="text-sm text-muted-foreground">{principle.description}</p>
            </Card>
          ))}
        </div>

        {/* Privacy Policy Content */}
        <div className="space-y-8">
          <Card className="p-8">
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Personal Information</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Name, address, phone number, and email address</li>
                  <li>National Identification Number (NIN) and Bank Verification Number (BVN)</li>
                  <li>Agricultural and financial information for credit assessment</li>
                  <li>Biometric data for identity verification</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Usage Information</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Device information and IP address</li>
                  <li>Log data and usage patterns</li>
                  <li>Location data (with your consent)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="p-8">
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>To provide and improve our credit assessment services</li>
                <li>To verify your identity and prevent fraud</li>
                <li>To communicate with you about your account and services</li>
                <li>To comply with legal and regulatory requirements</li>
                <li>To develop and improve our platform and services</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="p-8">
            <CardHeader>
              <CardTitle>Information Sharing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We do not sell your personal information. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>With partner financial institutions for loan processing</li>
                <li>With cooperatives for verification purposes (with your consent)</li>
                <li>With service providers who assist in our operations</li>
                <li>When required by law or to protect our rights</li>
                <li>With your explicit consent for specific purposes</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="p-8">
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>256-bit SSL encryption for all data transmission</li>
                <li>Secure data centers with 24/7 monitoring</li>
                <li>Regular security audits and penetration testing</li>
                <li>Multi-factor authentication for account access</li>
                <li>Employee training on data protection best practices</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="p-8">
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Access: Request a copy of your personal data</li>
                <li>Correction: Update or correct inaccurate information</li>
                <li>Deletion: Request deletion of your data (subject to legal requirements)</li>
                <li>Portability: Request transfer of your data to another service</li>
                <li>Objection: Object to processing for marketing purposes</li>
                <li>Withdraw consent: Withdraw consent for specific data processing</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="p-8">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have questions about this privacy policy or want to exercise your rights, contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>Email: privacy@farmcred.ng</p>
                <p>Phone: +234 803 123 4567</p>
                <p>Address: Victoria Island, Lagos, Nigeria</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4 py-8">
          <h2 className="text-2xl font-bold">Questions About Privacy?</h2>
          <p className="text-muted-foreground">
            We're here to help you understand how we protect your data.
          </p>
          <Link to="/contact">
            <Button>Contact Privacy Team</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
