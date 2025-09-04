.env 
# Blockchain
RPC_URL=http://127.0.0.1:8545
ADMIN_PRIVATE_KEY=0xYOUR_ADMIN_PK_FROM_HARDHAT
OPERATOR_PRIVATE_KEY=0xYOUR_OPERATOR_PK_FROM_HARDHAT

# Deployed addresses (scripts/deploy.js will also write frontend/src/config/contracts.local.json)
TELCO_ADDRESS=0x0000000000000000000000000000000000000000
USDC_ADDRESS=0x0000000000000000000000000000000000000000

# Database
MONGO_URI=mongodb://127.0.0.1:27017/telco

# App
PORT=5173

deploy.js 
import { ethers } from "hardhat";
import fs from "node:fs";
import path from "node:path";

async function main() {
  const [admin, operator, user] = await ethers.getSigners();

  // Deploy MockUSDC
  const Mock = await ethers.getContractFactory("MockUSDC");
  const usdc = await Mock.connect(admin).deploy();
  await usdc.waitForDeployment();
  const usdcAddress = await usdc.getAddress();

  // Mint some to accounts (6 decimals)
  const toUnits = (n) => ethers.parseUnits(n, 6);
  await (await usdc.mint(admin.address, toUnits("1000000"))).wait();
  await (await usdc.mint(operator.address, toUnits("1000000"))).wait();
  await (await usdc.mint(user.address, toUnits("1000000"))).wait();

  // Deploy TelcoBilling
  const Telco = await ethers.getContractFactory("TelcoBilling");
  const telco = await Telco.deploy(usdcAddress, admin.address, operator.address);
  await telco.waitForDeployment();
  const telcoAddress = await telco.getAddress();

  console.log("MockUSDC:", usdcAddress);
  console.log("TelcoBilling:", telcoAddress);

  // Create 2 sample plans (admin)
  // pricePerUnit = $0.01 per unit -> 0.01 * 1e6 = 10000
  await (await telco.connect(admin).createPlan("Prepaid Basic", 0, 10_000n, 0n, 30)).wait();
  await (await telco.connect(admin).createPlan("Postpaid Pro", 1, 8_000n, 0n, 0)).wait();

  // Write addresses to frontend config
  const outDir = path.resolve("frontend/src/config");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(
    path.join(outDir, "contracts.local.json"),
    JSON.stringify(
      { TELCO_ADDRESS: telcoAddress, USDC_ADDRESS: usdcAddress, CHAIN: "localhost" },
      null,
      2
    ),
    "utf-8"
  );

  // Write minimal ABI to frontend (so UI can interact)
  const telcoArtifactPath = path.resolve("artifacts/contracts/TelcoBilling.sol/TelcoBilling.json");
  const telcoArtifact = JSON.parse(fs.readFileSync(telcoArtifactPath, "utf-8"));
  const abiOut = path.resolve("frontend/src/abi/TelcoBilling.json");
  fs.writeFileSync(abiOut, JSON.stringify(telcoArtifact.abi, null, 2), "utf-8");

  console.log("Wrote frontend config & ABI.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});



SELVAMANI RAJENDRAN@LAPTOP-NLP7NN7D MINGW64 ~/Projects/telecom-billing-dapp
$ npm run dev

> telecom-billing-dapp@1.0.0 dev
> vite

(node:23692) [MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option: useNewUrlParser has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
(Use `node --trace-warnings ...` to show where the warning was created)
(node:23692) [MONGODB DRIVER] Warning: useUnifiedTopology is a deprecated option: useUnifiedTopology has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
✅ MongoDB connected: mongodb://127.0.0.1:27017/telco
✅ Backend initialized inside Vite middleware

  VITE v7.1.4  ready in 1060 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.43:5173/
  ➜  press h + enter to show help
(node:23692) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
(node:23692) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.

