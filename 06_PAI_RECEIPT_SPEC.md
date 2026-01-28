# PAI Submission Receipt — Cryptographic Specification (PAI-1.0)

**Status:** Canonical Specification  
**Scope:** Right to Engage (Pre-Execution)  
**Enforcement Level:** Constitutional (ICBC)

---

## Objective

The **PAI (Preliminary Access Inquiry) Submission Receipt** provides
**cryptographically verifiable, non-repudiable proof** that a sovereign or
institutional authority has formally acknowledged the **ICBC** and **TESL**
at a specific point in time **before** receiving restricted technical
documentation or any execution capability.

The PAI Receipt establishes **eligibility to engage**.  
It **never** authorizes execution.

---

## Constitutional Cross-Reference (Normative)

This specification is constitutionally binding under:

- **ICBC / TEOS Constitution:**  
  [`CONSTITUTION.md`](./CONSTITUTION.md)

- **Authorization & Execution Enforcement:**  
  [`docs/09_AUTHORIZATION_STAMP_SPEC.md`](./docs/09_AUTHORIZATION_STAMP_SPEC.md)

- **On-Chain Anchoring Contract (Normative Reference):**  
  [`contracts/PAIRegistry.contract.md`](./contracts/PAIRegistry.contract.md)

Any system issuing, accepting, or anchoring PAI Receipts **MUST** conform to
this specification.

---

## Canonical Integrity Pin (Document Hash)

This section pins the **canonical text version** of this document.

```text
Hash Algorithm: SHA-256
Hash Value (Hex): 571592d856dcc51999b3a766eb4ce1992c7921890376b9b963fce43bca13449e
````

> This hash is **public by design** and exists solely to guarantee document
> integrity. It is not a secret and MUST NOT be stored in `.env` or secret
> managers.

---

## Receipt Data Model (Canonical Fields)

All fields listed below are **mandatory** unless explicitly marked optional.
Missing or malformed fields invalidate the receipt.

| Field                  | Description                                                        |   |                       |
| ---------------------- | ------------------------------------------------------------------ | - | --------------------- |
| `receipt_version`      | Version identifier (e.g., `PAI-1.0`)                               |   |                       |
| `applicant_id`         | Canonical identifier of signatory (institution name + official ID) |   |                       |
| `applicant_pubkey`     | Public key of the signing authority                                |   |                       |
| `tesl_document_hash`   | `sha256:<hex>` of the signed TESL PDF                              |   |                       |
| `authority_chain_hash` | `sha256:<hex>` of the canonical Authority Chain document           |   |                       |
| `pai_form_hash`        | `sha256:<hex>` of the canonical PAI submission payload             |   |                       |
| `timestamp_utc`        | ISO-8601 UTC timestamp of signing                                  |   |                       |
| `jurisdiction_annex`   | `sha256:<hex>` or reference to annex (optional)                    |   |                       |
| `applicant_signature`  | Signature by applicant over `RECEIPT_HASH`                         |   |                       |
| `registrar_signature`  | Signature by registrar over (`RECEIPT_HASH                         |   | applicant_signature`) |

---

## Canonicalization Rules

1. Serialize the following fields into **canonical JSON**:

   * `receipt_version`
   * `applicant_id`
   * `applicant_pubkey`
   * `tesl_document_hash`
   * `authority_chain_hash`
   * `pai_form_hash`
   * `timestamp_utc`
   * `jurisdiction_annex` (if present)

2. Canonical JSON requirements:

   * Lexicographically sorted keys
   * UTF-8 encoding
   * No whitespace ambiguity
   * Deterministic ordering

---

## Receipt Hash Computation

Compute the receipt hash as follows:

```text
RECEIPT_HASH = SHA-256(canonical_json_string)
```

`RECEIPT_HASH` is the **single authoritative identifier** for the PAI Receipt
and is the value anchored on-chain.

---

## Signature Model

### Applicant Signature

```text
applicant_signature = Sign(applicant_private_key, RECEIPT_HASH)
```

### Registrar Signature

```text
registrar_signature = Sign(registrar_private_key, RECEIPT_HASH || applicant_signature)
```

**Normative requirements:**

* One cryptographic scheme system-wide (Ed25519 or ECDSA)
* Public keys MUST be:

  * Registered
  * Badge-verified
  * Revocation-tracked

---

## On-Chain Anchoring (Normative)

Upon acceptance, the registrar **MUST** anchor the receipt using the
**PAIRegistry** contract by emitting an immutable event containing:

* `RECEIPT_HASH`
* `applicant_pubkey`
* `registrar_pubkey`
* `anchored_at_chain_ts`
* `applicant_signature`
* `registrar_signature`
* `offchain_pointer` (CID or vault record ID)

The on-chain anchor provides **immutability, ordering, and timestamp proof**.
It does not replace off-chain verification.

---

## Off-Chain Storage Requirements

* The signed TESL PDF and canonical receipt JSON MUST be stored in encrypted,
  access-controlled storage governed by the Vault Registry.
* `offchain_pointer` MUST resolve to immutable content.
* Off-chain data MAY be private; the on-chain hash is sufficient for audit.

---

## Verification Procedure

To verify a PAI Receipt:

1. Fetch the on-chain `PAIReceiptCreated` event.
2. Extract `RECEIPT_HASH`.
3. Retrieve the canonical JSON via `offchain_pointer`.
4. Recompute SHA-256 and compare to `RECEIPT_HASH`.
5. Verify `applicant_signature`.
6. Verify `registrar_signature`.

Failure at any step invalidates the receipt.

---

## Relationship to Authorization Stamp

* **PAI Receipt** → proves the *right to engage*
* **Authorization Stamp** → proves the *right to execute*

A valid PAI Receipt **never** authorizes execution.

Execution authority is governed exclusively by:

```text
docs/09_AUTHORIZATION_STAMP_SPEC.md
```

---

## Non-Negotiable Rule

> A PAI Receipt establishes acknowledgement and eligibility only.
> It **never** authorizes execution.

Any execution without a valid Authorization Stamp is
**constitutionally null and void**.

*End of Canonical Specification*

```
