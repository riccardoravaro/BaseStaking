// require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes");
const ethers = require("ethers");
const BasicStakeABI = require("../contracts/artifacts/contracts/BaseStaking.sol/BaseStaking.json");
app.use(express.json());


const BasicStakeAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";
const provider =  new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
const contract = new ethers.Contract(
  BasicStakeAddress,
  BasicStakeABI.abi,
  provider
);

async function main (err) {
  const signer = provider.getSigner();
  routes(app, contract, signer);
  app.listen(process.env.PORT || 8082, () => {
    console.log("listening on port " + (process.env.PORT || 8082));
  });
};


main();