# PAIRegistry — On-Chain Receipt Anchoring Contract (Platform-Neutral)

## Purpose
Anchor a **PAI Submission Receipt** on-chain by emitting an immutable event that includes:
- `receipt_hash` (SHA-256 of canonical receipt JSON)
- applicant + registrar public keys
- signatures (applicant + registrar)
- chain timestamp
- off-chain pointer (CID / vault record ID)

This contract is designed so that **signature verification may be performed off-chain** (default),
or on-chain **only if** the target chain supports signature verification primitives.

---

## Data

### State
- `registered[receipt_hash] -> bool`
  - Tracks whether a specific receipt hash has already been anchored to prevent replay/duplicates.
- `registrar_pubkey` (PubKey)
  - The governance authority public key authorized to call `anchor_receipt`.

### Events
`PAIReceiptCreated` fields:
- `receipt_hash` (Hash32)
- `applicant_pubkey` (PubKey)
- `registrar_pubkey` (PubKey)
- `anchored_at_chain_ts` (UInt64)
- `offchain_pointer` (String)
- `applicant_signature` (Bytes)
- `registrar_signature` (Bytes)

---

## Entrypoints

### anchor_receipt(...)
Callable by **Registrar only**.

Checks:
1) `receipt_hash != 0` (valid hash)
2) `registered[receipt_hash] == false` (prevents duplicate anchoring)
3) Store `registered[receipt_hash] = true`
4) Emit `PAIReceiptCreated(...)` with all provided metadata

### is_receipt_anchored(receipt_hash) -> bool
Returns `registered[receipt_hash]`. Used by clients to verify if a specific receipt exists on-chain.

### update_registrar(new_registrar_pubkey)
Callable by current registrar only.
Updates the `registrar_pubkey` state to a new governance address.

---

## Verification Model

### Default (Recommended MVP)
- **Off-chain verification**:
  - Auditor fetches the on-chain event (`PAIReceiptCreated`)
  - Fetches the off-chain canonical JSON using `offchain_pointer`
  - Recomputes SHA-256 to verify it matches `receipt_hash`
  - Verifies `applicant_signature` and `registrar_signature` off-chain using standard crypto libs
- **On-chain event** serves as the **immutable timestamped anchor** and proof of existence

### Optional (On-chain verification)
If the underlying chain supports native signature verification primitives:
- Require verification inside `anchor_receipt` before emitting the event:
  - `verify(applicant_pubkey, receipt_hash, applicant_signature)` MUST PASS
  - `verify(registrar_pubkey, receipt_hash || applicant_signature, registrar_signature)` MUST PASS

---

## Implementation Reference (Pseudo-Contract)

Below is a language-agnostic pseudo-code implementation intended for developer guidance. It is **not** platform-specific code.

```text
CONTRACT PAIRegistry

STATE:
  registrar_pubkey : PubKey
  registered : Map<Hash32, Bool>

EVENT PAIReceiptCreated(
  receipt_hash: Hash32,
  applicant_pubkey: PubKey,
  registrar_pubkey: PubKey,
  anchored_at_chain_ts: UInt64,
  offchain_pointer: String,
  applicant_signature: Bytes,
  registrar_signature: Bytes
)

FUNCTION only_registrar(caller_pubkey):
  ASSERT caller_pubkey == registrar_pubkey

ENTRYPOINT anchor_receipt(
  caller_pubkey: PubKey,
  receipt_hash: Hash32,
  applicant_pubkey: PubKey,
  offchain_pointer: String,
  applicant_signature: Bytes,
  registrar_signature: Bytes
):
  only_registrar(caller_pubkey)

  ASSERT receipt_hash != 0x000...000
  ASSERT registered[receipt_hash] != true

  registered[receipt_hash] = true

  ts = CHAIN_TIMESTAMP()

  EMIT PAIReceiptCreated(
    receipt_hash,
    applicant_pubkey,
    registrar_pubkey,
    ts,
    offchain_pointer,
    applicant_signature,
    registrar_signature
  )

ENTRYPOINT is_receipt_anchored(receipt_hash: Hash32) -> Bool:
  RETURN registered[receipt_hash] == true

ENTRYPOINT update_registrar(caller_pubkey: PubKey, new_registrar_pubkey: PubKey):
  only_registrar(caller_pubkey)
  registrar_pubkey = new_registrar_pubkey
