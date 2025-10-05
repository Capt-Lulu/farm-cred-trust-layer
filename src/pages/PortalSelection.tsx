import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FarmCredLogo } from "@/components/FarmCredLogo";
import { TrustBadge } from "@/components/TrustBadge";
import { ContactInfo } from "@/components/ContactInfo";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Users, Building2, Briefcase, Shield } from "lucide-react";

const PortalSelection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePortalAccess = (route: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate(route);
  };

  const portals = [
    {
      id: "farmers",
      title: "Farmers Portal",
      description: "Secure access to credit profiles, loan applications, and farm management",
      icon: Users,
      route: "/dashboard",
      color: "bg-green-500",
      security: "NIN + BVN + Biometric"
    },
    {
      id: "cooperatives",
      title: "Cooperatives Portal", 
      description: "Secure management of cooperative members and administrative data",
      icon: Building2,
      route: "/cooperative",
      color: "bg-blue-500",
      security: "Multi-factor Authentication"
    },
    {
      id: "financial",
      title: "Financial Institutions Portal",
      description: "Secure access to loan applications and credit assessments",
      icon: Briefcase,
      route: "/lender",
      color: "bg-purple-500",
      security: "Bank-grade Encryption"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5">
      {/* Header */}
      <div className="bg-background border-b border-border p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <FarmCredLogo size="lg" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Select Your Portal</h1>
          <p className="text-lg text-muted-foreground">
            Choose your secure portal to access your dashboard
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <TrustBadge type="security" label="256-bit SSL" />
            <TrustBadge type="verified" label="Multi-factor Auth" />
            <TrustBadge type="rating" label="Bank-grade Security" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portals.map((portal) => (
            <Card key={portal.id} className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className={`w-16 h-16 ${portal.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                <portal.icon size={32} className="text-white" />
              </div>
              
              <h2 className="text-xl font-semibold mb-4">{portal.title}</h2>
              <p className="text-muted-foreground mb-6">{portal.description}</p>
              
              <div className="mb-6 p-3 bg-secondary/20 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield size={16} className="text-primary" />
                  <span>Security: {portal.security}</span>
                </div>
              </div>
              
              <Button 
                onClick={() => handlePortalAccess(portal.route)}
                className="w-full"
                size="lg"
              >
                Secure Access
              </Button>
            </Card>
          ))}
        </div>

        {/* Contact Information Footer */}
        <div className="text-center mt-12 pt-8 border-t border-border">
          <Card className="p-6 bg-secondary/20">
            <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
            <ContactInfo variant="card" className="max-w-2xl mx-auto" />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PortalSelection;
