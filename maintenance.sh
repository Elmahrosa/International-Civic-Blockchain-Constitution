#!/usr/bin/env bash
set -euo pipefail

# Dynamically determine owner and repo from git remote
REMOTE_URL="$(git config --get remote.origin.url)"
if [[ $REMOTE_URL =~ github.com[/:]([^/]+)/([^/]+) ]]; then
    OWNER="${BASH_REMATCH[1]}"
    REPO="${BASH_REMATCH[2]%.git}"
else
    echo "❌ Could not parse owner and repo from git remote 'origin'."
    echo "Please ensure 'origin' points to a GitHub repository."
    exit 1
fi
BRANCH="main"

cmd="${1:-}"
if [[ -z "$cmd" ]]; then
  echo "Usage: ./maintenance.sh open|close"
  exit 1
fi

# Must run inside repo to avoid permission issues
ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "$ROOT" ]]; then
  echo "❌ Not inside a git repo. cd into the repo first."
  exit 1
fi
cd "$ROOT"

# Ensure gh is authenticated
gh auth status >/dev/null || { echo "❌ gh not authenticated"; exit 1; }

mkdir -p .gh-backup

ts="$(date +%Y%m%d-%H%M%S)"

backup() {
  echo "== Backup branch protection =="
  gh api -H "Accept: application/vnd.github+json" \
    "repos/$OWNER/$REPO/branches/$BRANCH/protection" \
    > ".gh-backup/protection.$BRANCH.$ts.json" || true

  echo "== Backup repo rulesets (if any) =="
  gh api -H "Accept: application/vnd.github+json" \
    "repos/$OWNER/$REPO/rulesets" \
    > ".gh-backup/rulesets.$ts.json" || true

  echo "✅ Backups saved in .gh-backup/"
}

unlock_main() {
  echo "== Unlock branch (remove lock) =="
  # DELETE = unlock (official behavior)
  gh api -X DELETE -H "Accept: application/vnd.github+json" \
    "repos/$OWNER/$REPO/branches/$BRANCH/protection/lock" >/dev/null || true
  echo "✅ main unlocked (maintenance window)"
}

lock_main() {
  echo "== Lock branch (read-only) =="
  # PUT = lock
  gh api -X PUT -H "Accept: application/vnd.github+json" \
    "repos/$OWNER/$REPO/branches/$BRANCH/protection/lock" >/dev/null
  echo "✅ main locked again"
}

enable_admin_bypass() {
  echo "== Enable admin bypass for branch protection (temporary) =="
  # This flips enforcement so admins can push even if PR required.
  # Note: If you’re using Rulesets, this might not help unless ruleset also allows bypass.
  gh api -X PATCH -H "Accept: application/vnd.github+json" \
    "repos/$OWNER/$REPO/branches/$BRANCH/protection" \
    -f enforce_admins=false >/dev/null
  echo "✅ enforce_admins=false (admins can bypass during window)"
}

disable_admin_bypass() {
  echo "== Re-enable admin enforcement =="
  gh api -X PATCH -H "Accept: application/vnd.github+json" \
    "repos/$OWNER/$REPO/branches/$BRANCH/protection" \
    -f enforce_admins=true >/dev/null
  echo "✅ enforce_admins=true (admins must follow rules again)"
}

case "$cmd" in
  open)
    backup
    unlock_main
    enable_admin_bypass
    echo
    echo "🟡 Maintenance window OPEN."
    echo "Now you can push direct to main (admin bypass), but do it carefully."
    ;;
  close)
    disable_admin_bypass
    lock_main
    echo
    echo "🟢 Maintenance window CLOSED. Branch is protected + locked."
    ;;
  *)
    echo "Usage: ./maintenance.sh open|close"
    exit 1
    ;;
esac
