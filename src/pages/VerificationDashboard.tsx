// src/pages/VerificationDashboard.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { CheckCircle2, Clock, AlertCircle } from "lucide-react"

type VerificationStep = {
  title: string
  status: "completed" | "pending" | "failed"
  progress: number
}

const steps: VerificationStep[] = [
  { title: "NIN Verification", status: "completed", progress: 100 },
  { title: "BVN Verification", status: "completed", progress: 100 },
  { title: "Cross Verification", status: "pending", progress: 60 },
  { title: "Farm Verification", status: "pending", progress: 30 },
]

const statusIcon = {
  completed: <CheckCircle2 className="text-green-500 w-5 h-5" />,
  pending: <Clock className="text-yellow-500 w-5 h-5" />,
  failed: <AlertCircle className="text-red-500 w-5 h-5" />,
}

export default function VerificationDashboard() {
  const overallProgress =
    steps.reduce((acc, step) => acc + step.progress, 0) / steps.length

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Verification Dashboard</h1>

        <Card className="mb-6 shadow-md">
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={overallProgress} className="h-3" />
            <p className="text-sm text-gray-600 mt-2">
              {Math.round(overallProgress)}% completed
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {steps.map((step, index) => (
            <Card
              key={index}
              className={cn(
                "shadow-sm transition hover:shadow-lg border-l-4",
                step.status === "completed" && "border-green-500",
                step.status === "pending" && "border-yellow-500",
                step.status === "failed" && "border-red-500"
              )}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">{step.title}</CardTitle>
                {statusIcon[step.status]}
              </CardHeader>
              <CardContent>
                <Progress value={step.progress} className="h-2" />
                <p className="text-sm text-gray-500 mt-2">
                  {step.status === "completed" && "Verification completed"}
                  {step.status === "pending" && "Verification in progress"}
                  {step.status === "failed" && "Verification failed"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
