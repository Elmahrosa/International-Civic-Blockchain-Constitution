{
  "name": "teos-governance",
  "version": "1.0.0",
  "description": "TEOS Governance Proposal Validation Suite",
  "private": true,
  "scripts": {
    "test": "jest --coverage",
    "test:watch": "jest --watch",
    "clean": "rimraf coverage"
  },
  "dependencies": {
    "ajv": "^9.1.2"
  },
  "devDependencies": {
    "jest": "^29.7.0"
  },
  "jest": {
    "testEnvironment": "node",
    "verbose": true,
    "collectCoverage": true,
    "coverageDirectory": "./coverage",
    "testMatch": ["**/tests/**/*.test.js"]
  },
  "keywords": [
    "TEOS",
    "governance",
    "blockchain",
    "schema",
    "validation"
  ],
  "author": "TEOS Development Team",
  "license": "ISC"
}
