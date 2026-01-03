import fs from "fs";

interface DApp {
  name: string;
  repo: string;
  articles: string[];
  status: string;
}

const dapps: DApp[] = JSON.parse(
  fs.readFileSync("public/data/connectedDApps.json", "utf8")
);

dapps.forEach((dapp) => {
  console.log(`🔍 Checking compliance for ${dapp.name}`);
  if (dapp.articles.includes("rights")) {
    console.log(`✅ ${dapp.name} aligns with constitutional rights`);
  } else {
    console.log(`⚠️ ${dapp.name} missing rights alignment`);
  }
});
