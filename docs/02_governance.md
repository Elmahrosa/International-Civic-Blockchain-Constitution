# Pi Network Governance — International Civic Constitution

## Overview
This document explains how proposals, voting, execution, and dispute resolution work on Pi.

## Proposals
- Proposals are authored off-chain (Fireside Forum / hosted doc) and reference a canonical CID.
- A proposal is created on-chain in `ProposalVoting` by a ratified citizen.

## Voting
- Base vote: 1 per KYC ratified wallet.
- Staked weight: quadratic weighting via `sqrt(stake)` multiplied by reputation.
- Reputation: assigned at ratification (base 10) and adjustable by council.

## Execution
- Approved proposals are executed by admin or via connected execution modules (off-chain ops).
- Time locks and audit windows (e.g., 7 days) are recommended before critical executions.

## Disputes
- Local administrative appeal → Arbitration panel (neutral or consortium).
- Arbitration outcomes are anchored on-chain for public audit.

## Upgrades
- Admin multisig + timelock pattern recommended.
- Major constitutional amendments require a supermajority and a 30-day public comment period.
