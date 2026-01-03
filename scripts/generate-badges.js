const fs = require("fs");

const badges = [
  { label: "Governance", message: "TEOS_Constitution", color: "blue" },
  { label: "Pi_Network", message: "Constitutional_Rights", color: "gold" },
  { label: "Voting", message: "ERT_Token_Holders", color: "green" },
];

fs.writeFileSync("BADGES.md", badges.map(b =>
  `![${b.label}](https://img.shields.io/badge/${b.label}-${b.message}-${b.color})`
).join("\n"));
