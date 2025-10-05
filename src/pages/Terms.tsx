import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FarmCredLogo } from "@/components/FarmCredLogo";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
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
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          <p className="text-lg text-muted-foreground">
            Last updated: December 2024
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These terms govern your use of FarmCred's platform and services. 
            Please read them carefully before using our services.
          </p>
        </div>

        {/* Terms Content */}
        <div className="space-y-8">
          <Card className="p-8">
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                By accessing and using the FarmCred platform, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not 
                use this service.
              </p>
              <p className="text-muted-foreground">
                These terms apply to all users of the platform, including farmers, cooperatives, and 
                financial institutions.
              </p>
            </CardContent>
          </Card>

          <Card className="p-8">
            <CardHeader>
              <CardTitle>2. Platform Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                FarmCred provides a technology platform that:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Facilitates credit assessment for agricultural purposes</li>
                <li>Connects farmers with financial institutions and cooperatives</li>
                <li>Provides trust-based scoring algorithms</li>
                <li>Offers agricultural and financial education resources</li>
                <li>Enables secure data management and verification</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="p-8">
            <CardHeader>
              <CardTitle>3. User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">Account Security</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Use strong passwords and enable two-factor authentication</li>
              </ul>
              
              <h4 className="font-semibold">Information Accuracy</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Provide accurate and complete information</li>
                <li>Update your profile when circumstances change</li>
                <li>Do not misrepresent your agricultural activities or financial status</li>
              </ul>

              <h4 className="font-semibold">Prohibited Uses</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Using the platform for fraudulent activities</li>
                <li>Sharing false or misleading information</li>
                <li>Attempting to circumvent security measures</li>
                <li>Using the platform to harm other users</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="p-8">
            <CardHeader>
              <CardTitle>4. Credit Assessment and Scoring</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Our credit scoring system uses various factors including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Agricultural history and farming practices</li>
                <li>Community verification and recommendations</li>
                <li>Financial behavior and payment history</li>
                <li>Educational and training participation</li>
              </ul>
              <p className="text-muted-foreground">
                Credit scores are indicative and do not guarantee loan approval. Final lending decisions 
                rest with individual financial institutions.
              </p>
            </CardContent>
          </Card>

          <Card className="p-8">
            <CardHeader>
              <CardTitle>5. Data Usage and Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Your privacy is important to us. Our data practices are governed by our Privacy Policy, 
                which forms part of these terms. Key points include:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>We collect only necessary information for our services</li>
                <li>Your data is protected with industry-standard security</li>
                <li>We do not sell your personal information</li>
                <li>You have rights to access, correct, and delete your data</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="p-8">
            <CardHeader>
              <CardTitle>6. Financial Transactions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                FarmCred facilitates connections between users and financial institutions but does not:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Directly provide loans or credit</li>
                <li>Guarantee loan approval or terms</li>
                <li>Act as a financial institution or bank</li>
                <li>Take responsibility for lending decisions</li>
              </ul>
              <p className="text-muted-foreground">
                All loan agreements are between you and the lending institution.
              </p>
            </CardContent>
          </Card>

          <Card className="p-8">
            <CardHeader>
              <CardTitle>7. Platform Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We strive to maintain platform availability but cannot guarantee:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Uninterrupted access to the platform</li>
                <li>Error-free operation at all times</li>
                <li>Compatibility with all devices or software</li>
                <li>Availability during maintenance periods</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="p-8">
            <CardHeader>
              <CardTitle>8. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                FarmCred's liability is limited to the fullest extent permitted by law. We are not liable for:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Indirect, incidental, or consequential damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Actions or decisions of third-party lenders</li>
                <li>Technical issues beyond our reasonable control</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="p-8">
            <CardHeader>
              <CardTitle>9. Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Either party may terminate this agreement:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>At any time with reasonable notice</li>
                <li>Immediately for breach of terms</li>
                <li>For fraudulent or illegal activities</li>
              </ul>
              <p className="text-muted-foreground">
                Upon termination, certain provisions will survive, including data retention, 
                liability limitations, and dispute resolution.
              </p>
            </CardContent>
          </Card>

          <Card className="p-8">
            <CardHeader>
              <CardTitle>10. Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                For questions about these terms, contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>Email: legal@farmcred.ng</p>
                <p>Phone: +234 803 123 4567</p>
                <p>Address: Victoria Island, Lagos, Nigeria</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4 py-8">
          <h2 className="text-2xl font-bold">Questions About Our Terms?</h2>
          <p className="text-muted-foreground">
            Our legal team is available to help clarify any terms or conditions.
          </p>
          <Link to="/contact">
            <Button>Contact Legal Team</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Terms;
