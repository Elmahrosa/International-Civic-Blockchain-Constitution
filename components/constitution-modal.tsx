"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Pyramid, Shield, Globe, Scale, ExternalLink } from "lucide-react"
import { usePi } from "./pi-provider"

interface ConstitutionModalProps {
  onSign: () => void
}

export function ConstitutionModal({ onSign }: ConstitutionModalProps) {
  const [agreed, setAgreed] = useState(false)
  const { authenticate, isLoading, user } = usePi()

  const petitionUrl =
    "https://www.change.org/p/join-the-movement-sign-the-petition-to-regulate-digital-currencies-in-egypt?recruiter=41912740&recruited_by_id=d23ade40-5e55-0130-269d-3c764e0455b2&utm_source=share_petition&utm_campaign=share_petition&utm_term=share_petition&utm_medium=copylink&utm_content=cl_sharecopy_490544923_en-US%3A4"
  const githubUrl = "https://github.com/Elmahrosa/International-Civic-Blockchain-Constitution"

  const handleSign = async () => {
    if (!user) {
      // Authenticate with Pi Network first
      await authenticate()
    }
    onSign()
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-primary/30 bg-card">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <Pyramid className="w-12 h-12 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl sm:text-3xl text-primary mb-2">
              International Civic Blockchain Constitution
            </CardTitle>
            <CardDescription className="text-base">Elmahrosa Civic Ledger • Pi Network</CardDescription>
          </div>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Constitution Repository
          </a>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-accent mb-1">Petition-First Entry Required</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  No contributor enters without signing the civic petition. This is the foundation of our governance.
                </p>
                <a
                  href={petitionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                >
                  Sign the Official Petition
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Constitutional Principles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-center gap-2 p-4 bg-secondary/50 rounded-lg">
              <Globe className="w-8 h-8 text-accent" />
              <h3 className="font-semibold text-sm">Global Unity</h3>
              <p className="text-xs text-muted-foreground">Connecting citizens worldwide</p>
            </div>
            <div className="flex flex-col items-center text-center gap-2 p-4 bg-secondary/50 rounded-lg">
              <Scale className="w-8 h-8 text-primary" />
              <h3 className="font-semibold text-sm">Fair Governance</h3>
              <p className="text-xs text-muted-foreground">Transparent decision making</p>
            </div>
            <div className="flex flex-col items-center text-center gap-2 p-4 bg-secondary/50 rounded-lg">
              <Shield className="w-8 h-8 text-accent" />
              <h3 className="font-semibold text-sm">Civic Rights</h3>
              <p className="text-xs text-muted-foreground">Protected by blockchain</p>
            </div>
          </div>

          {/* Constitution Text */}
          <ScrollArea className="h-[300px] rounded-lg border border-border p-4 bg-secondary/30">
            <div className="space-y-4 text-sm leading-relaxed">
              <h3 className="font-bold text-primary text-base">Preamble</h3>
              <p className="text-muted-foreground">
                We, the global citizens of Earth, united through blockchain technology and anchored by the eternal
                wisdom of Egypt—the mythic hub of humanity's digital resurrection—do hereby establish this International
                Civic Blockchain Constitution upon the Pi Network.
              </p>

              <h3 className="font-bold text-primary text-base mt-4">Article I: Petition-First Entry</h3>
              <p className="text-muted-foreground">
                Every citizen shall sign the official petition and authenticate via Pi Network as their first act of
                participation, committing to transparent governance, collective decision-making, and the advancement of
                human dignity through decentralized systems.
              </p>

              <h3 className="font-bold text-primary text-base mt-4">Article II: Treasury Transparency</h3>
              <p className="text-muted-foreground">
                All Pi token contributions shall be recorded on an immutable ledger, displayed through color-coded
                dashboards, ensuring full accountability and real-time audit capability for every transaction in the
                vault registry.
              </p>

              <h3 className="font-bold text-primary text-base mt-4">Article III: Badge Recognition</h3>
              <p className="text-muted-foreground">
                Contributors shall earn badges (Citizen, Validator, Founder) through automated logic tied to their Pi
                wallets, recognizing civic participation, governance contributions, and community leadership.
              </p>

              <h3 className="font-bold text-primary text-base mt-4">Article IV: Staking & Rewards</h3>
              <p className="text-muted-foreground">
                Citizens may stake Pi tokens to support governance initiatives and earn civic-first rewards,
                incentivizing long-term commitment to democratic participation on the Pi Network blockchain.
              </p>

              <h3 className="font-bold text-primary text-base mt-4">Article V: Global Onboarding</h3>
              <p className="text-muted-foreground">
                This framework shall scale from local petitions to international governance, welcoming all nations and
                peoples into a unified civic blockchain ecosystem. Egypt serves as the mythic hub and coordinating
                authority.
              </p>

              <h3 className="font-bold text-primary text-base mt-4">Motto</h3>
              <p className="text-muted-foreground font-semibold">
                "Sign With It" — every action begins with civic petition and badge verification.
              </p>
            </div>
          </ScrollArea>

          {/* Agreement Checkbox */}
          <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <Checkbox
              id="agree"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked === true)}
              className="mt-1"
            />
            <label htmlFor="agree" className="text-sm leading-relaxed cursor-pointer flex-1">
              I have read and agree to uphold the International Civic Blockchain Constitution. I commit to transparent
              governance, civic participation, and the advancement of humanity through decentralized technology.
            </label>
          </div>

          {/* Sign Button */}
          <Button
            onClick={handleSign}
            disabled={!agreed || isLoading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base font-semibold"
          >
            {isLoading
              ? "Authenticating..."
              : user
                ? "Sign Constitution & Enter CivicChain"
                : "Connect Pi Wallet & Sign"}
          </Button>

          <div className="text-center text-xs text-muted-foreground">
            <p>Powered by Pi Network • Mobile-First Blockchain</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
