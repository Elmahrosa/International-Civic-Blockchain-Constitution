"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, PieChart } from "lucide-react"

export function TreasuryDashboard() {
  const treasuryData = [
    { category: "Infrastructure", amount: 45230, percentage: 35, color: "bg-chart-1", trend: "up" },
    { category: "Community Initiatives", amount: 32450, percentage: 25, color: "bg-chart-2", trend: "up" },
    { category: "Development Fund", amount: 25680, percentage: 20, color: "bg-chart-3", trend: "down" },
    { category: "Emergency Reserve", amount: 19420, percentage: 15, color: "bg-chart-4", trend: "up" },
    { category: "Research & Innovation", amount: 6480, percentage: 5, color: "bg-chart-5", trend: "up" },
  ]

  const totalTreasury = treasuryData.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="space-y-4">
      {/* Total Treasury */}
      <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
        <CardHeader>
          <CardDescription className="text-muted-foreground">Total Treasury Balance</CardDescription>
          <CardTitle className="text-3xl text-primary flex items-baseline gap-2">
            <DollarSign className="w-6 h-6" />
            {totalTreasury.toLocaleString()} Pi
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Treasury Allocation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-primary" />
            Treasury Allocation
          </CardTitle>
          <CardDescription>Color-coded governance dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {treasuryData.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="font-medium">{item.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground">{item.amount.toLocaleString()} Pi</span>
                  {item.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-accent" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-destructive" />
                  )}
                </div>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full ${item.color} transition-all duration-500`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground text-right">{item.percentage}%</div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Transactions</CardTitle>
          <CardDescription className="text-xs">Transparent audit trail</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { type: "Contribution", amount: 1250, from: "Community Pool", time: "2h ago" },
            { type: "Grant", amount: -3400, from: "Local Initiative", time: "5h ago" },
            { type: "Staking Reward", amount: 850, from: "Network", time: "1d ago" },
          ].map((tx, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <div>
                <p className="font-medium text-sm">{tx.type}</p>
                <p className="text-xs text-muted-foreground">
                  {tx.from} • {tx.time}
                </p>
              </div>
              <span className={`font-semibold ${tx.amount > 0 ? "text-accent" : "text-primary"}`}>
                {tx.amount > 0 ? "+" : ""}
                {tx.amount} Pi
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
