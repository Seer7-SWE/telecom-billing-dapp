const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

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

  // Write minimal ABI to frontend
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
