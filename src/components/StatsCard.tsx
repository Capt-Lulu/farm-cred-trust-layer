import type { LucideIcon } from "lucide-react"
import React from "react" // It's good practice to import React when using JSX

interface StatsCardProps {
  icon: LucideIcon
  title: string
  value: string
  description: string
  trend?: {
    value: string
    isPositive: boolean
  }
}

export const StatsCard = ({ icon: Icon, title, value, description, trend }: StatsCardProps) => {
  if (!Icon) {
    console.error("[v0] StatsCard received undefined icon")
    return null
  }

  return (
    <div className="bg-gradient-card p-6 rounded-xl shadow-soft border border-border hover:shadow-medium transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="bg-primary/10 p-3 rounded-lg">
          <Icon size={24} className="text-primary" />
        </div>
        {trend && (
          <span
            className={`text-sm font-medium px-2 py-1 rounded-full ${
              trend.isPositive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
            }`}
          >
            {trend.isPositive ? "+" : ""}
            {trend.value}
          </span>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-foreground">{value}</h3>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}