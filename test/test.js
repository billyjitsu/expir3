const {loadFixture,} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
  
  
  describe("Expir3", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshopt in every test.
    async function beforeEachFunction() {
  
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();
  
      //variables
      const allowedAmount = 10;
    //  const royalty = "500";

   
      const TempToken = await hre.ethers.getContractFactory("MockToken");
      const temptoken = await TempToken.deploy();
      console.log ("deployed token");
  
      const Template = await hre.ethers.getContractFactory("Expir3");
      const contract = await Template.deploy(temptoken.address);
      console.log("deployed contract");
  
      return {
        temptoken,
        contract,
        owner,
        otherAccount,
        allowedAmount,
      };
    }
 
    describe("Deployment", function () {
      it("Should set the right owner", async function () {
        const { contract, owner } = await loadFixture(beforeEachFunction);
  
        expect(await contract.owner()).to.equal(owner.address);
      });
  
      //Try to transfer ownership
      it("Should Transfer Ownership", async function () {
        const { contract, owner, otherAccount } = await loadFixture(
          beforeEachFunction
        );
        await contract.transferOwnership(otherAccount.address);
        expect(await contract.owner()).to.equal(otherAccount.address);
      });
    });
  
  
  
    describe("Check In", function () {

        it("Register and execute", async function () {
            const { temptoken, contract, owner, otherAccount , allowedAmount} = await loadFixture(
              beforeEachFunction
            );
         
            //should turn on deadmans switch here
            //select recipients and amount
              await contract.register(otherAccount.address, allowedAmount);
              // approve contract
              await temptoken.approve(contract.address, allowedAmount);

              //execute 
              await contract.executeManually();

            expect(await temptoken.balanceOf(otherAccount.address)).to.equal(allowedAmount);
          });
    });
  

  
    /*
    describe("Withdrawal", function () {
      it("Should fail if Non-Owner tries to withdraw", async function () {
        const { contract, otherAccount } = await loadFixture(beforeEachFunction);
  
        await expect(
          contract.connect(otherAccount).withdraw()
        ).to.be.revertedWith("Ownable: caller is not the owner");
      });

      *
  
      /*
      it("Should Withdraw to addresses", async function () {
        const { contract, owner, publicPrice } = await loadFixture(
          beforeEachFunction
        );
  
        for (let i = 0; i < 55; i++) {
          await contract.mint(1, { value: publicPrice });
        }
        let total = publicPrice * 55;
  
        // await expect( contract.withdraw().to.changeEtherBalances([owner], [-total] ));
        //not working
      });
    });
    */
  });
  