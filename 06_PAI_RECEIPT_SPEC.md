# PAI Submission Receipt — cryptographic specification

**Objective:** Create an immutable, auditable receipt proving a sovereign official acknowledged the ICBC and TESL at a specific timestamp before receiving restricted technical docs.

## Receipt data model (canonical fields)

*   `receipt_version`: string (e.g., "PAI-1.0")
*   `applicant_id`: canonical identifier for signatory (organization name + official ID)
*   `applicant_pubkey`: public key of the signing authority
*   `tesl_document_hash`: SHA-256 hash of the signed TESL PDF (hex)
*   `authority_chain_hash`: SHA-256 of the canonical ICBC/AUTHORITY-CHAIN.md used for this submission (hex)
*   `pai_form_hash`: SHA-256 of canonical serialized PAI form data (canonical JSON)
*   `timestamp_utc`: ISO8601 UTC timestamp (e.g., 2026-01-28T15:04:05Z)
*   `jurisdiction_annex`: reference or hash to jurisdictional TESL annex (optional)
*   `pki_signature`: signature of the applicant over the concatenated canonical string (see below)
*   `registrar_signature`: signature of TEOS registrar (Governance) acknowledging receipt

## Canonicalization & hashing

*   Serialize fields (`applicant_id`, `tesl_document_hash`, `authority_chain_hash`, `pai_form_hash`, `timestamp_utc`, `jurisdiction_annex`) in a canonical JSON order (lexicographic keys).
*   Compute `RECEIPT_HASH = SHA-256(canonical_json_string)`. Store `RECEIPT_HASH` on-chain (or emit as an event) and include `RECEIPT_HASH` in the PAI response.

## Signature scheme & format

*   Use ECDSA or Ed25519 (choose one consistently across the system). Store public keys in Registry.
*   Applicant signs the canonical JSON => `applicant_signature`.
*   Registrar signs the concatenation `RECEIPT_HASH||applicant_signature` => `registrar_signature`.
*   Both signatures are stored as part of the on-chain event.

## On-chain anchoring

*   Emit an on-chain event (`PAIReceiptCreated`) with fields:
    * `RECEIPT_HASH`
    * `applicant_pubkey`
    * `registrar_pubkey`
    * `anchored_at_chain_ts`
    * `applicant_signature`
    * `registrar_signature`
    * `pointer_to_offchain_storage`
*   The event provides immutable proof of acceptance. (If Pi Network contract storage is used, include it per Pi contract storage limits.)

## Off-chain storage best practice

*   Store the full signed TESL PDF and canonical JSON in an encrypted off-chain repository under Vault Registry control.
*   Include the off-chain CID/URL in the on-chain receipt for retrieval by authorized auditors.

## Verification process

*   To verify receipt:
    1) fetch on-chain event  
    2) retrieve `RECEIPT_HASH`  
    3) fetch off-chain canonical JSON  
    4) compute SHA-256 and match  
    5) verify `applicant_signature` and `registrar_signature`

## Example canonical string (pseudocode)

*   `canonical_json = {"applicant_id":"Ministry of X","tesl_document_hash":"...","authority_chain_hash":"...","pai_form_hash":"...","timestamp_utc":"2026-01-28T15:04:05Z"}`
*   `RECEIPT_HASH = SHA256(canonical_json)`
*   `applicant_signature = Sign(applicant_privkey, RECEIPT_HASH)`
*   `registrar_signature = Sign(registrar_privkey, RECEIPT_HASH||applicant_signature)`

## Notes on timestamping

**Timestamp note:** `anchored_at_chain_ts` is the chain timestamp at anchoring time. If strict UTC is required, store `timestamp_utc` in the canonical JSON and rely on the on-chain anchor as an immutable ordering + time attestation.

*   Use NTP-synced UTC time for `timestamp_utc`, and emit on-chain timestamp via event; both applicant and registrar timestamps should be recorded to provide auditability.
