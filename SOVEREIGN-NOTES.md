# 1) The best repo for `SOVEREIGN-NOTES.md`

## ✅ Put it in: **International-Civic-Blockchain-Constitution**

Reason: this repo is already framed as the **highest constitutional authority** for governance, rights, and sovereign DPI. That makes it the correct “single source of truth” location for founder-record decisions like *rights capacity vs equity*, *access caps*, *TESL anchoring*, and *non-binding ranges*. ([GitHub][1])

If you put `SOVEREIGN-NOTES.md` anywhere else, it becomes “a project note.”
Here, it becomes “a constitutional record.”

**Canonical pick:** `International-Civic-Blockchain-Constitution/SOVEREIGN-NOTES.md` ([GitHub][1])

---

# 2) How your repos currently structure into a sovereign stack

From the repo list, you already have a clear natural hierarchy:

## A) Governance / Authority Layer (Top of the chain)

* `International-Civic-Blockchain-Constitution` (constitutional governance) ([GitHub][1])
* `TEOS-FORGE` (governance standard for DPI) ([GitHub][1])
* `TEOS-Governance` ([GitHub][1])
* `TEOS-Compliance-Kit` ([GitHub][1])

## B) Enforcement + Evidence (Control layer)

* `TEOS-AI-Guard` (control / approval) ([GitHub][1])
* `TEOS-AI-Auditor` (audit / traceability) ([GitHub][1])
* `TEOS-Identity-Insight-AI` (identity intelligence module) ([GitHub][1])

## C) Execution + Integration (Runtime layer)

* `Teos-Sovereign-System` (execution backbone) ([GitHub][1])
* `TEOS-API-Sovereign` (API surface) ([GitHub][1])
* `Teos-Integration` (integration layer) ([GitHub][1])
* `TEOS-Global-Civic-Blockchain-Ecosystem` (ecosystem monorepo / catalog) ([GitHub][1])

## D) Portals + DApps (Product layer)

* `Teos-Pharaoh-Portal` (central gateway) ([GitHub][1])
* Bank / wallet / payment / vertical apps like:
  `Teos-Bankchain`, `Teos-Bankchain-Mobile`, `TEOS-Payment-Rail`, `Teos-Sovereign-Wallet`, `TeosPitaxi`, `Teos-Pi-Smart-City`, `salma-unity-care-hospital`, etc. ([GitHub][1])

This hierarchy supports your “Selling Rights, Not the Project” philosophy cleanly.

---

# 3) The main risk I see (and how to fix it fast)

## ⚠️ License inconsistency across repos

Your org list shows some repos explicitly using **Apache 2.0** or **MIT**, while your doctrine says the stack is governed by **TESL / constitutional authority**. Example: `Teos-Sovereign-Wallet` and `Teos-Bankchain` show Apache 2.0; multiple others show MIT. ([GitHub][1])

This creates confusion for institutions:

* “Is it sovereign-controlled or open-source?”
* “Which license is enforceable?”
* “Where is the canonical source?”

### ✅ Fix (recommended pattern)

1. Constitution repo = **canonical license + governance**
2. Every repo = a **short LICENSE/NOTICE** that points back to the constitution as canonical (and states any exceptions clearly)

This matches what you already wrote in TESL context: TESL governs TEOS ecosystem artifacts. ([GitHub][2])

---

# 4) What to do next (no confusion, one system)

## Step 1 — Create this file in the Constitution repo

**`International-Civic-Blockchain-Constitution/SOVEREIGN-NOTES.md`**

## Step 2 — Add a pointer in these repos (one line in README)

* `TEOS-FORGE` ([GitHub][1])
* `TEOS-Global-Civic-Blockchain-Ecosystem` ([GitHub][1])
* `Teos-Sovereign-System` ([GitHub][1])

Pointer text:

> “Founder record (canonical): `/SOVEREIGN-NOTES.md` in International-Civic-Blockchain-Constitution.”
