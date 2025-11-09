#!/bin/bash
echo "🚨 Petition-first onboarding 🚨"
echo "Checking petition registry..."
if ! grep -q "PET-0001" registry/petitions.json; then
  echo "❌ Petition not signed. Please sign first."
  exit 1
fi
echo "✅ Petition verified. Badge assignment required."
