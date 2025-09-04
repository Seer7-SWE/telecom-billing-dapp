import { ethers } from "ethers";
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
dotenv.config();

let provider, adminWallet, operatorWallet, telco;

export function getContracts() {
  return { provider, adminWallet, operatorWallet, telco };
}

export async function initEthers() {
  const rpcUrl = process.env.RPC_URL || "http://127.0.0.1:8545";
  provider = new ethers.JsonRpcProvider(rpcUrl);

  const adminPK = process.env.ADMIN_PRIVATE_KEY;
  const operatorPK = process.env.OPERATOR_PRIVATE_KEY;
  if (!adminPK || !operatorPK) {
    console.warn("[ETH] Missing ADMIN_PRIVATE_KEY or OPERATOR_PRIVATE_KEY in .env (backend write calls may fail).");
  }
  adminWallet = adminPK ? new ethers.Wallet(adminPK, provider) : null;
  operatorWallet = operatorPK ? new ethers.Wallet(operatorPK, provider) : null;

  // Read deployed addresses and ABI
  const cfgPath = path.resolve("frontend/src/config/contracts.local.json");
  const abiPath = path.resolve("frontend/src/abi/TelcoBilling.json");
  if (!fs.existsSync(cfgPath) || !fs.existsSync(abiPath)) {
    console.warn("[ETH] Missing contracts.local.json or ABI. Run `npm run deploy` after starting hardhat node.");
    return;
  }
  const { TELCO_ADDRESS } = JSON.parse(fs.readFileSync(cfgPath, "utf-8"));
  const ABI = JSON.parse(fs.readFileSync(abiPath, "utf-8"));

  telco = new ethers.Contract(TELCO_ADDRESS, ABI, provider);
  console.log("[ETH] TelcoBilling at", TELCO_ADDRESS);
}
