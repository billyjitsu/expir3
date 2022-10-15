const hre = require("hardhat");

async function main() {
  
  const Web3 = await hre.ethers.getContractFactory("MockToken");
  const web3 = await Web3.deploy();

  await web3.deployed();

  console.log("Template Contract deployed to:", web3.address);
  const receipt = await web3.deployTransaction.wait();
  console.log("gasUsed:" , receipt.gasUsed);
 

  const Template = await hre.ethers.getContractFactory("Expir3");
  const contract = await Template.deploy(web3.address);

  await contract.deployed();

  console.log("Expir3 Contract deployed to:", contract.address);
  const receipt2 = await contract.deployTransaction.wait();
  console.log("gasUsed:" , receipt2.gasUsed);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
