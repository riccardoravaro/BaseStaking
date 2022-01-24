import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import "@nomiclabs/hardhat-waffle";
import 'hardhat-abi-exporter';

import dotenv from 'dotenv';
import fs from 'fs-extra';
import { task } from "hardhat/config";
if(fs.existsSync(__dirname+'/.env')) {
  const result = dotenv.config();
  if (result.error) {
    throw result.error;
  }
}

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const { ethers } = await import("hardhat"); // hardhat import not allowed during configuration

  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

let settings = {
  optimizer: {
    enabled: true,
    runs: 200
  }
}

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  solidity: {
    compilers: [
      { version: "0.8.6", settings }
    ],
    overrides: {
    }
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    },

    // Ethereum Rinkeby
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts: { mnemonic: (process.env.RINKEBY_MNEMONIC) },
      gas: 2100000,
      gasPrice: 8000000000
    }
    
  },
  typechain: {
    outDir: 'types',
    target: 'ethers-v5',
    alwaysGenerateOverloads: false,
  },
};
