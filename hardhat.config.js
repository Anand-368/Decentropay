require("@nomicfoundation/hardhat-toolbox");
const path = require("path");

// Load .env file explicitly from the root directory
const dotenv = require("dotenv");
const envPath = path.resolve(__dirname, ".env");
dotenv.config({ path: envPath });

// Validate required environment variables
const privateKey = process.env.PRIVATE_KEY?.trim();
const polygonRpc = process.env.POLYGON_AMOY_RPC?.trim();

if (!privateKey || privateKey === "") {
  console.warn("⚠️  WARNING: PRIVATE_KEY is not set in .env file. Deployments to polygonAmoy will fail.");
}

if (!polygonRpc || polygonRpc === "") {
  console.warn("⚠️  WARNING: POLYGON_AMOY_RPC is not set in .env file.");
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    polygonAmoy: {
      url: polygonRpc || "",
      accounts: privateKey && privateKey !== "" ? [privateKey] : []
    }
  }
};
