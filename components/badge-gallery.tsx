"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Shield, Star, Crown, Zap, Users } from "lucide-react"

export function BadgeGallery() {
  const badges = [
    {
      name: "Constitution Founder",
      icon: Shield,
      earned: true,
      description: "Signed the constitution",
      rarity: "Common",
    },
    {
      name: "Active Voter",
      icon: Star,
      earned: true,
      description: "Cast 10+ votes",
      rarity: "Common",
    },
    {
      name: "Treasury Contributor",
      icon: Award,
      earned: true,
      description: "Contributed 1000+ Pi",
      rarity: "Rare",
    },
    {
      name: "Governance Champion",
      icon: Crown,
      earned: false,
      description: "Lead 5 successful petitions",
      rarity: "Epic",
    },
    {
      name: "Early Adopter",
      icon: Zap,
      earned: false,
      description: "Joined within first 1000",
      rarity: "Legendary",
    },
    {
      name: "Community Builder",
      icon: Users,
      earned: false,
      description: "Referred 50+ members",
      rarity: "Rare",
    },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "border-muted-foreground/30 text-muted-foreground"
      case "Rare":
        return "border-accent/50 text-accent"
      case "Epic":
        return "border-primary/50 text-primary"
      case "Legendary":
        return "border-chart-5/50 text-chart-5"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Your Badges
          </CardTitle>
          <CardDescription>Recognition for civic participation</CardDescription>
          <div className="flex gap-4 text-sm pt-2">
            <span className="text-muted-foreground">
              Earned: <span className="text-accent font-semibold">3</span>
            </span>
            <span className="text-muted-foreground">
              Available: <span className="text-primary font-semibold">6</span>
            </span>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {badges.map((badge, idx) => {
          const Icon = badge.icon
          return (
            <Card
              key={idx}
              className={`${badge.earned ? "bg-card border-primary/20" : "bg-card/30 opacity-60 border-border/50"}`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center ${
                      badge.earned ? "bg-primary/20" : "bg-secondary/50"
                    }`}
                  >
                    <Icon className={`w-7 h-7 ${badge.earned ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <Badge variant="outline" className={`text-xs ${getRarityColor(badge.rarity)}`}>
                    {badge.rarity}
                  </Badge>
                </div>
                <div className="space-y-1 pt-2">
                  <CardTitle className="text-base">{badge.name}</CardTitle>
                  <CardDescription className="text-xs">{badge.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
