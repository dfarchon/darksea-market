import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const beginBalance = await deployer.getBalance();
  console.log("begin balance:", (beginBalance.toString()));


  const DarkSeaMarketOffer = await ethers.getContractFactory('DarkSeaMarketOffer');
  const darkSeaMarketOffer = await DarkSeaMarketOffer.deploy();
  await darkSeaMarketOffer.deployed();

  console.log('darksea market offer:');
  console.log(darkSeaMarketOffer.address);

  const DarkSeaMarketList = await ethers.getContractFactory('DarkSeaMarketList');
  const darkSeaMarketList = await DarkSeaMarketList.deploy();
  await darkSeaMarketList.deployed();
  console.log('darksea market list:');
  console.log(darkSeaMarketList.address);
  const DarkSeaMarket = await ethers.getContractFactory('DarkSeaMarket',
    {
        libraries:{
            DarkSeaMarketOffer:darkSeaMarketOffer.address,
            DarkSeaMarketList: darkSeaMarketList.address
        }
    }
  );

  const darksea = await DarkSeaMarket.deploy();
  await darksea.deployed();
  console.log('darksea address:');
  console.log(darksea.address);

  const endBalance = await deployer.getBalance();
  console.log("end balance:", endBalance.toString());

  const cost = beginBalance.sub(endBalance);

  console.log('cost:',cost.toString(),' wei');
  const gweiAmount = ethers.utils.formatUnits(cost, 'gwei');
  console.log(gweiAmount,'gwei');
  const ethAmount = ethers.utils.formatUnits(cost);
  console.log(ethAmount,'eth');
  



  return;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
