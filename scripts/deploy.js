// scripts/deploy.js
// Usage: node scripts/deploy.js --network=testnet --key=./keyfile.json
const fs = require('fs');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));

// Replace with real pi-sdk import if available
// const Pi = require('pi-sdk');
async function deployFile(piClient, filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  // placeholder for actual pi deploy call
  const name = path.basename(filePath);
  console.log(`Deploying ${name}...`);
  // simulate contractId as hash of filename
  const contractId = "pi://" + Buffer.from(name).toString('hex').slice(0,12);
  // real: const res = await piClient.deploy({ code, metadata: {...} });
  console.log(`✅ ${name} -> ${contractId}`);
  return contractId;
}

async function main() {
  const network = argv.network || 'testnet';
  const keyfile = argv.key || process.env.PI_KEY || null;

  console.log(`Starting Pi deploy to ${network}`);
  // const pi = new Pi({ network, key: keyfile });
  const contractPaths = [
    './contracts/CivicConstitution.pi',
    './contracts/ProposalVoting.pi',
    './contracts/UBIDistribution.pi'
  ];

  const deployed = {};
  for (const p of contractPaths) {
    if (!fs.existsSync(p)) {
      console.error(`Missing file: ${p}`);
      process.exit(1);
    }
    deployed[p] = await deployFile(null, p);
  }

  // output mapping
  fs.writeFileSync('./deployments.json', JSON.stringify({ network, deployed, deployedAt: new Date().toISOString() }, null, 2));
  console.log('Deployment mappings written to deployments.json');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
