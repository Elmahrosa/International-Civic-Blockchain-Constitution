# Appendix — PoCE ↔ GovStack Technical Linkage
**Binding Technical Appendix for Institutional Review**

---

## 1. Purpose of This Appendix

This appendix establishes a formal and auditable linkage between:

- TEOS — Proof of Civic Effectiveness (PoCE)
- GovStack Alignment Mapping (Machine-Readable YAML)

Its purpose is to demonstrate that TEOS token usage is strictly bounded by GovStack-aligned DPI functions
and does not introduce financial, speculative, or non-compliant behavior.

This document is normative for the pilot phase.

---

## 2. Governing Documents (Hierarchy of Authority)

The following documents apply in descending order of authority:

1. International Civic Blockchain Constitution (ICBC)
2. TEOS — Proof of Civic Effectiveness (PoCE) (`docs/token/TEOS_TOKEN_POCE.md`)
3. GovStack Alignment Mapping (`docs/compliance/govstack-mapping.yaml`)
4. GovStack Compliance Notes (`docs/compliance/govstack-compliance-notes.md`)

Any conflict is resolved in favor of higher-order documents.

---

## 3. Functional Binding Matrix (PoCE ↔ GovStack)

### 3.1 Identity (GovStack eID Block)
**Binding Rule:** TEOS token possession acts only as an eligibility marker. Identity attributes remain off-chain.

Mapped to: `mapping.identity` (YAML)

### 3.2 Data Exchange (Information Mediator)
**Binding Rule:** TEOS events may generate audit hashes only. No personal or sectoral data is written to the ledger.

Mapped to: `mapping.data_exchange` (YAML)

### 3.3 Registries
**Binding Rule:** Registries reference state changes, not personal records. Authoritative records remain off-chain.

Mapped to: `mapping.registries` (YAML)

### 3.4 Payments (Explicitly Out of Scope)
**Binding Rule:** Any monetary use is constitutionally prohibited during pilot.

Mapped to: `mapping.payments.status: out_of_scope_pilot` (YAML)

---

## 4. Non-Extension Clause (Critical)

No functionality may be added unless all of the following are updated:
1) ICBC amendment
2) PoCE update
3) GovStack mapping update
4) Public compliance notes update

Absent these steps, any extension is null and void.

---

**Appendix Status:** Normative  
**Applies To:** Constitutional Pilot Phase  
**Issuer:** Elmahrosa International  
**Year:** 2026
