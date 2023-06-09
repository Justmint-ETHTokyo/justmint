require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const ethers = require("ethers");
const gasPrice = ethers.utils.formatUnits(
  ethers.utils.parseUnits("10", "gwei"),
  "wei"
);

module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "localhost",
  gasPrice: parseInt(gasPrice),
  paths: {
    artifacts: "./artifacts",
  },
  networks: {
    // localhost_fork: {
    //   chainId: 31337,
    //   forking: {
    //     url: process.env.MAINNET_RPC,
    //     blockNumber: 16024306,
    //   },
    //   url: "http://127.0.0.1:8545/",
    //   initialBaseFeePerGas: 0,
    //   loggingEnabled: true,
    //   gasPrice: parseInt(gasPrice)
    // },
    localhost: {
      chainId: 31337,
      url: "http://127.0.0.1:8545/",
      initialBaseFeePerGas: 0,
      loggingEnabled: true,
      gasPrice: parseInt(gasPrice),
    },
    // Test Network
    go: {
      chainId: 5,
      accounts: [process.env.WALLET_SECRET],
      url: process.env.GORIL_RPC,
      initialBaseFeePerGas: 0,
      loggingEnabled: true,
    },
    polygon_mumbai: {
      url: process.env.MUMBAI_RPC,
      accounts: [process.env.WALLET_SECRET],
      gasPrice: 5000000000,
      loggingEnabled: true,
      chainId: 80001,
    },
    polygon: {
      url: process.env.POLYGON_RPC,
      accounts: [process.env.WALLET_SECRET],
      loggingEnabled: true,
      chainId: 137,
    },
    sepolia: {
      chainId: 11155111,
      accounts: [process.env.WALLET_SECRET],
      url: process.env.SEPOLIA_RPC_URL_HTTP,
      initialBaseFeePerGas: 0,
      loggingEnabled: true,
    },
    zkevm: {
      chainId: 1442,
      accounts: [process.env.WALLET_SECRET],
      url: process.env.ZKEVM_RPC,
      loggingEnabled: true,
    },
    mantle: {
      chainId: 5001,
      accounts: [process.env.WALLET_SECRET],
      url: process.env.MANTLE_RPC,
      loggingEnabled: true,
    },
    linea: {
      chainId: 59140,
      accounts: [process.env.WALLET_SECRET],
      url: process.env.LINEA_RPC,
      loggingEnabled: true,
    },

    //polygon: {
    //  url: process.env.POLYGON_MAINNET_URL,
    //  accounts: [`0x${process.env.BWL_WALLET_SECRET}`]
    //}
    // Main Network
  },
};
