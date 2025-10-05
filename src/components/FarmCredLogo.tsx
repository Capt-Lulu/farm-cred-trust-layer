import { Leaf } from "lucide-react";

interface FarmCredLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const FarmCredLogo = ({ size = "md", className = "" }: FarmCredLogoProps) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl"
  };

  const iconSizes = {
    sm: 20,
    md: 28,
    lg: 40
  };

  return (
    <div className={`flex items-center gap-2 font-bold text-primary ${sizeClasses[size]} ${className}`}>
      <div className="bg-gradient-primary p-2 rounded-lg">
        <Leaf size={iconSizes[size]} className="text-primary-foreground" />
      </div>
      <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
        FarmCred
      </span>
    </div>
  );
};
