import { Shield, CheckCircle, Star } from "lucide-react";

interface TrustBadgeProps {
  type: "verified" | "security" | "rating";
  label: string;
  value?: string;
  className?: string;
}

export const TrustBadge = ({ type, label, value, className = "" }: TrustBadgeProps) => {
  const badgeConfig = {
    verified: {
      icon: CheckCircle,
      bgColor: "bg-success/10",
      textColor: "text-success",
      iconColor: "text-success"
    },
    security: {
      icon: Shield,
      bgColor: "bg-primary/10",
      textColor: "text-primary",
      iconColor: "text-primary"
    },
    rating: {
      icon: Star,
      bgColor: "bg-accent/10",
      textColor: "text-accent",
      iconColor: "text-accent"
    }
  };

  const config = badgeConfig[type];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bgColor} ${className}`}>
      <Icon size={16} className={config.iconColor} />
      <span className={`text-sm font-medium ${config.textColor}`}>
        {label}
        {value && <span className="ml-1">{value}</span>}
      </span>
    </div>
  );
};
