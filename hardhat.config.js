import { config as dotenv } from "dotenv";
dotenv();

export default {
  solidity: "0.8.24",
  networks: {
    hardhat: {},
    localhost: {
      url: process.env.RPC_URL || "http://127.0.0.1:8545"
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./tests",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
