import { Phone, Mail, MapPin, Hash } from "lucide-react";

interface ContactInfoProps {
  variant?: "header" | "footer" | "card";
  className?: string;
}

export const ContactInfo = ({ variant = "footer", className = "" }: ContactInfoProps) => {
  const contactData = {
    email: "support@farmcred.com.ng",
    phone: "+2347069301804",
    address: "Funtua, Nigeria",
    portalCode: "830101",
  };

  if (variant === "header") {
    return (
      <div className={`flex items-center gap-4 text-sm ${className}`}>
        <div className="flex items-center gap-2">
          <Phone size={14} />
          <span>{contactData.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail size={14} />
          <span>{contactData.email}</span>
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Mail size={16} className="text-primary" />
          </div>
          <div>
            <div className="text-sm font-medium">Email Support</div>
            <div className="text-sm text-muted-foreground">{contactData.email}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Phone size={16} className="text-primary" />
          </div>
          <div>
            <div className="text-sm font-medium">Phone Support</div>
            <div className="text-sm text-muted-foreground">{contactData.phone}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <MapPin size={16} className="text-primary" />
          </div>
          <div>
            <div className="text-sm font-medium">Office Location</div>
            <div className="text-sm text-muted-foreground">{contactData.address}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Hash size={16} className="text-primary" />
          </div>
          <div>
            <div className="text-sm font-medium">Portal Code</div>
            <div className="text-sm text-muted-foreground">{contactData.portalCode}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`text-sm text-muted-foreground ${className}`}>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Mail size={14} />
          <span>{contactData.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={14} />
          <span>{contactData.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={14} />
          <span>{contactData.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <Hash size={14} />
          <span>Portal: {contactData.portalCode}</span>
        </div>
      </div>
    </div>
  );
};
