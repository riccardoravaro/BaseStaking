const { run, ethers } = require("hardhat");

async function main() {
  await run("compile");

  const [owner] = await ethers.getSigners();

  // Deploy Staking token
  const StakingToken = await ethers.getContractFactory("StakingToken");
  const stoken = await StakingToken.deploy("StakingToken", "STT");

  // Deploy staking contract
  const BaseStaking = await ethers.getContractFactory("BaseStaking");

  const bcontract = await BaseStaking.deploy(stoken.address);
  console.log(bcontract.address);

  await stoken.connect(owner).approve(bcontract.address, ethers.utils.parseEther("100"));
  await bcontract.connect(owner).stake(ethers.utils.parseEther("10"));
  
  console.log("\n\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

