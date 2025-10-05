import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  benefits: string[]
}

export const FeatureCard = ({ icon: Icon, title, description, benefits }: FeatureCardProps) => {
  if (!Icon) {
    console.error("[v0] FeatureCard received undefined icon")
    return null
  }

  return (
    <div className="bg-gradient-card p-8 rounded-xl shadow-soft border border-border hover:shadow-medium transition-all duration-300 group">
      <div className="bg-gradient-primary p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon size={32} className="text-primary-foreground" />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>

        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
