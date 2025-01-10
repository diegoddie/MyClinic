import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type LucideIcon } from 'lucide-react'

interface OverviewCardProps {
  title: string
  value: number
  icon: LucideIcon
}

export function OverviewCard({ title, value, icon: Icon }: OverviewCardProps) {
  return (
    <Card className="flex-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <Icon className="h-5 w-5 md:h-6 md:w-6" />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-secondary">{value}</div>
      </CardContent>
    </Card>
  )
}

