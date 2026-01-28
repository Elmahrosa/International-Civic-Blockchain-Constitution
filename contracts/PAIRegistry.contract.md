# PAIRegistry — PAI Receipt Anchoring Contract (Normative Reference)

## Constitutional Binding

This contract specification is constitutionally binding under:

- [`CONSTITUTION.md`](../CONSTITUTION.md) — Article IX (Cryptographic Enforcement of Authority)
- [`06_PAI_RECEIPT_SPEC.md`](../06_PAI_RECEIPT_SPEC.md) — PAI Receipt (Right to Engage)
- [`docs/09_AUTHORIZATION_STAMP_SPEC.md`](../docs/09_AUTHORIZATION_STAMP_SPEC.md) — Authorization Stamp (Right to Execute)

Any implementation diverging from this specification is **constitutionally non-compliant**.

---

## Purpose

The **PAIRegistry** contract anchors a **PAI Submission Receipt** on-chain by emitting
an **immutable, timestamped event** that serves as proof that:

- A sovereign or institutional authority acknowledged the ICBC and TESL
- The acknowledgment occurred at a specific, verifiable time
- The receipt cannot be altered, replayed, or silently replaced

The contract emits a receipt anchor containing:

- `receipt_hash` (SHA-256 of canonical receipt JSON)
- Applicant public key
- Registrar public key
- Applicant signature
- Registrar signature
- Chain timestamp
- Off-chain storage pointer (CID / vault record ID)

> The on-chain record proves **existence and ordering only**.  
> Signature verification MAY occur off-chain by default, and MAY occur on-chain
> only if the target platform supports native verification primitives.

---

## Data Model

### State

- `registered[receipt_hash] → bool`  
  Tracks whether a receipt hash has already been anchored, preventing replay or duplication.

- `registrar_pubkey : PubKey`  
  The governance authority authorized to anchor receipts.

---

### Events

**PAIReceiptCreated**

| Field | Type | Description |
|---|---|---|
| `receipt_hash` | Hash32 | SHA-256 of canonical receipt JSON |
| `applicant_pubkey` | PubKey | Public key of applicant authority |
| `registrar_pubkey` | PubKey | Public key of registrar authority |
| `anchored_at_chain_ts` | UInt64 | Chain timestamp at anchoring |
| `offchain_pointer` | String | CID or vault record identifier |
| `applicant_signature` | Bytes | Applicant signature over `receipt_hash` |
| `registrar_signature` | Bytes | Registrar signature over (`receipt_hash || applicant_signature`) |

---

## Entrypoints

### `anchor_receipt(...)`

**Callable by:** Registrar only

**Required checks (MUST all pass):**

1. `receipt_hash != 0x000…000`
2. `registered[receipt_hash] == false`
3. Caller public key == `registrar_pubkey`

**Effects:**

- Store `registered[receipt_hash] = true`
- Emit `PAIReceiptCreated` event with all provided metadata

---

### `is_receipt_anchored(receipt_hash) → bool`

Returns whether the given receipt hash has already been anchored on-chain.

Used by:
- Auditors
- Execution systems
- Authorization Stamp validators

---

### `update_registrar(new_registrar_pubkey)`

**Callable by:** Current registrar only

Updates the registrar authority key.
This action MUST itself be governed by constitutional governance procedures.

---

## Verification Model

### Default Model (Recommended)

- Verification occurs **off-chain**:
  1. Fetch `PAIReceiptCreated` event
  2. Retrieve canonical JSON via `offchain_pointer`
  3. Recompute SHA-256 → compare to `receipt_hash`
  4. Verify applicant signature
  5. Verify registrar signature

- The on-chain event provides:
  - Immutability
  - Timestamp ordering
  - Public auditability

---

### Optional On-Chain Verification

If the target chain supports native signature verification:

The contract MAY additionally enforce:

- `verify(applicant_pubkey, receipt_hash, applicant_signature)`
- `verify(registrar_pubkey, receipt_hash || applicant_signature, registrar_signature)`

Failure MUST revert anchoring.

---

## Implementation Reference (Pseudo-Code)

> This pseudo-code is **platform-neutral** and provided for guidance only.

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
````

---

## Non-Negotiable Rule

> Anchoring a PAI Receipt **does not grant execution rights**.

Execution authority requires a valid **Authorization Stamp** as defined in
[`docs/09_AUTHORIZATION_STAMP_SPEC.md`](../docs/09_AUTHORIZATION_STAMP_SPEC.md).

*End of Normative Contract Specification*

`
