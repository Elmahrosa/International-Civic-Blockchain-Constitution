# Contributing to International Civic Blockchain Constitution

Thank you for contributing! This project follows an open RFC + PR process.

## How to contribute
1. Fork the repo and create a feature branch.
2. If your change is large (architecture, schema changes), open an RFC in `docs/rfcs/` with rationale.
3. Run schema validation: `node tools/validate-schema.js specs/schemas/*.jsonschema` (tool scaffold included).
4. Add tests where applicable (contracts / CLI).
5. Open a Pull Request against `main` with clear description and links to related RFC.

## Code style
- JSON schemas: draft-07
- Solidity: pragma ^0.8.x; use NatSpec for public functions.
- Docs: markdown, include examples and legal rationale.

## Security
- Report vulnerabilities to the `SECURITY.md` workflow before creating public PRs that change security-critical code.
# Code of Conduct
- Petition-first, badge-gated participation.
- Respect governance votes and audit trails.
- Zero tolerance for fraud or malicious proposals.

# Contributing
- Sign petition; obtain badge.
- Use `governance/proposal_schema.json` for proposals.
- Log changes in `audits/transparency_log.md`.
