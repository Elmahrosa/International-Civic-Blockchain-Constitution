# TEOS / GovStack Interoperability Compliance

## Overview
This document details how TEOS modules map to GovStack building blocks to support
international Digital Public Infrastructure (DPI) alignment.

## Mapped Modules

### 1. Identity (eID Block)
TEOS implements a Self-Sovereign Identity (SSI) approach aligned with GovStack eID principles.
- Standards: W3C DID & Verifiable Credentials; OpenID Connect (OIDC)
- Privacy: Zero PII on-chain; personal data remains off-chain in sovereign or user-controlled stores
- Role of ledger: Cryptographic trust anchor for proof references only

### 2. Data Exchange (Information Mediator)
The `Nilex` module provides secure inter-agency data exchange patterns.
- Transport: HTTPS with Mutual TLS (mTLS)
- Audit: Immutable audit hashes for non-repudiation
- Consent: Governed by ICBC-compliant authorization and institutional controls

### 3. Registries
TEOS provides registry mutation auditability via cryptographic anchors and controlled authority flow.
Authoritative records remain off-chain.

## Exclusions (Pilot Phase)
- Payments (GovStack Payments block) is out of scope for this constitutional pilot phase.

## Evidence Artifacts
- Machine-readable mapping: `govstack-mapping.yaml`
- Notes: `govstack-compliance-notes.md`

---
This is a living document subject to institutional review.
