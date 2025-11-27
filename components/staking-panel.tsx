"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Unlock, TrendingUp } from "lucide-react"
import { usePi } from "./pi-provider"

export function StakingPanel() {
  const [stakeAmount, setStakeAmount] = useState("")
  const { user, authenticate, isLoading } = usePi()

  const handleStake = async () => {
    if (!user) {
      await authenticate()
      return
    }

    const amount = Number.parseFloat(stakeAmount)
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount")
      return
    }

    try {
      if (typeof window !== "undefined" && (window as any).Pi) {
        // Create payment request via Pi SDK
        const payment = await (window as any).Pi.createPayment({
          amount: amount,
          memo: `CivicChain Staking: ${amount} Pi`,
          metadata: { type: "staking", amount: amount },
        })
        console.log("[v0] Staking payment created:", payment)
        alert(`Successfully staked ${amount} Pi tokens!`)
        setStakeAmount("")
      } else {
        // Demo mode
        console.log("[v0] Demo staking:", amount)
        alert(`Demo: Staked ${amount} Pi tokens`)
        setStakeAmount("")
      }
    } catch (err) {
      console.error("[v0] Staking error:", err)
      alert("Failed to stake tokens. Please try again.")
    }
  }

  return (
    <div className="space-y-4">
      {/* Staking Overview */}
      <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/30">
        <CardHeader>
          <CardDescription className="text-muted-foreground">Your Staked Balance</CardDescription>
          <CardTitle className="text-3xl text-accent flex items-baseline gap-2">
            <Lock className="w-6 h-6" />
            2,450 Pi
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span>Earning 12.5% APY in Pi tokens</span>
          </div>
        </CardHeader>
      </Card>

      {/* Stake New Tokens */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Stake Pi Tokens
          </CardTitle>
          <CardDescription>Support governance and earn Pi rewards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount to Stake</label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="0.00"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" size="sm" onClick={() => setStakeAmount("1000")}>
                Max
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Available: 5,780 Pi</p>
          </div>

          <div className="flex gap-2">
            <Button
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleStake}
              disabled={isLoading}
            >
              <Lock className="w-4 h-4 mr-2" />
              {user ? "Stake" : "Connect Pi Wallet"}
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent" disabled={!user}>
              <Unlock className="w-4 h-4 mr-2" />
              Unstake
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Staking Tiers */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Staking Tiers</CardTitle>
          <CardDescription className="text-xs">Unlock benefits as you stake more</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { tier: "Bronze", min: 100, apy: "8%", status: "achieved", benefits: "Basic governance rights" },
            { tier: "Silver", min: 1000, apy: "12%", status: "achieved", benefits: "Priority voting + 1.5x rewards" },
            { tier: "Gold", min: 5000, apy: "18%", status: "locked", benefits: "Proposal creation + 2x rewards" },
            { tier: "Platinum", min: 10000, apy: "25%", status: "locked", benefits: "Council seat + 3x rewards" },
          ].map((tier, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border ${
                tier.status === "achieved" ? "bg-primary/5 border-primary/30" : "bg-secondary/30 border-border/50"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{tier.tier}</span>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      tier.status === "achieved"
                        ? "border-accent text-accent"
                        : "border-muted-foreground/30 text-muted-foreground"
                    }`}
                  >
                    {tier.apy} APY
                  </Badge>
                </div>
                {tier.status === "achieved" && (
                  <Badge className="bg-accent text-accent-foreground text-xs">Active</Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Stake {tier.min}+ Pi • {tier.benefits}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Rewards History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Rewards</CardTitle>
          <CardDescription className="text-xs">Your staking earnings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { amount: 25.5, date: "Today", type: "Daily Reward" },
            { amount: 25.5, date: "Yesterday", type: "Daily Reward" },
            { amount: 178.5, date: "Last Week", type: "Weekly Bonus" },
          ].map((reward, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 bg-secondary/30 rounded">
              <div>
                <p className="text-sm font-medium">{reward.type}</p>
                <p className="text-xs text-muted-foreground">{reward.date}</p>
              </div>
              <span className="text-accent font-semibold">+{reward.amount} Pi</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
