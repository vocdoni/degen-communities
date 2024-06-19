import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-foundry";
import { HardhatUserConfig } from "hardhat/config";
import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.PRIVATE_KEY) {
  throw new Error("Please set your PRIVATE_KEY in a .env file");
}

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v6',
  },
  networks: {
    degen: {
      url: process.env.DEGEN_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    baseSepolia: {
      url: process.env.BASE_SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    base: {
      url: process.env.BASE_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};

export default config;