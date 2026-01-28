# Authorization Stamp — Cryptographic Authority Chain Specification

## Purpose

The **Authorization Stamp** is the cryptographic mechanism that enforces the
**TEOS Sovereign Authority Chain**.

It provides machine-verifiable proof that a requested action:

1. Originated from a valid authority level
2. Passed all required governance and safety layers
3. Was explicitly approved by human institutional authority
4. Is compliant with the ICBC and TESL constraints

**No execution may occur without a valid Authorization Stamp.**

---

## Constitutional Principle

> **Authority flows downward only.**  
> Execution never creates authority.

The Authorization Stamp is the **only acceptable proof** that an action has
lawfully traversed the Authority Chain:

**ICBC → Governance → Safety → Execution**

---

## Scope of Use

Authorization Stamps are REQUIRED for:

- Treasury movements (vault actions)
- Policy execution
- Governance changes
- AI-assisted or automated actions
- Any action affecting sovereign data, funds, or rights

They are NOT required for:
- Read-only queries
- Public data access
- Non-mutating audit views

---

## Authorization Stamp Data Model (Canonical)

### Required Fields

| Field | Description |
|---|---|
| `stamp_version` | Version string (e.g., `AUTH-1.0`) |
| `action_id` | Unique identifier for the requested action |
| `action_type` | Enumerated action class (e.g., `VAULT_TRANSFER`) |
| `request_hash` | SHA-256 hash of canonical action payload |
| `authority_chain_hash` | SHA-256 hash of canonical AUTHORITY-CHAIN.md |
| `pai_receipt_hash` | Hash of associated PAI Receipt (if applicable) |
| `initiator_pubkey` | Public key of initiating authority |
| `governance_signature` | Signature from Governance layer |
| `safety_signature` | Signature from AI Guard / Safety layer |
| `execution_scope` | Explicit scope allowed (what *can* be executed) |
| `issued_at_utc` | ISO-8601 UTC timestamp |
| `expiry_utc` | Expiry timestamp (optional but recommended) |

---

## Canonicalization & Hashing

1. Serialize all required fields into canonical JSON
   - Lexicographic key order
   - UTF-8 encoding
2. Compute:


