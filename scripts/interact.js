import { ethers } from "hardhat";

async function main() {
  const [admin, operator, user] = await ethers.getSigners();
  const telcoAddr = process.env.TELCO_ADDRESS;
  const Telco = await ethers.getContractFactory("TelcoBilling");
  const telco = Telco.attach(telcoAddr);

  const plans = await telco.nextPlanId();
  console.log("Plans count:", plans.toString());
}

main().catch(console.error);
