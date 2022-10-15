// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// AutomationCompatible.sol imports the functions from both ./AutomationBase.sol and
// ./interfaces/AutomationCompatibleInterface.sol
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";

// deathwish
// testam3nt
// Inh3rit
//contract Expir3 is AutomationCompatibleInterface, Ownable { 
contract Expir3 is Ownable { 

    IERC20 public token;
   

    /// @dev The unix timestamp at which the address was last seen.
    mapping(address => uint256) public lastCheckin;

    // map who you want to benefit
    mapping (address => address) public recipients;
    // map how much  -- mapping of a mapping  / creata struct
    mapping (address => uint256) public amounts;

    // map address to deadmans
    // mapping (address => boolean) pubic deadSwitch;

    //for future to add more token support on the fly
    constructor(address _token){
        token = IERC20(_token);
    }

    //need to interface the token contracts

    //register you wallet and set beneficiary
    function register(address _recipients, uint256 _amount) public {
        //must set allowance per token
        //approve tokenContract
        //should turn on deadmans switch here

        //select recipients (1 for now)
        recipients[msg.sender] = _recipients;

        // turn on deadmans lock

        //how much
        amounts[msg.sender] = _amount;

        //event registers
       
    }

       //bypass the chainlink keeprs for now to test
    function executeManually() public {
        //check if true
       // require( deadmans lock);

        //transfer funds 
         require(token.transferFrom(msg.sender, recipients[msg.sender], amounts[msg.sender]), "Transfer to escrow failed!");
    }


    // renew deadman's lock - hourly, daily, yearly.. etc
    function checkIn() public {
        // check block.timestamp;
        // renew that mapping 
        lastCheckin[msg.sender] = block.timestamp + 2 minutes;  
    }



    /// @notice Returns the time (in seconds since the epoch) at which the owner was last seen, or zero if never seen.
    function getLastSeen(address owner) external view returns (uint256) {
        return lastCheckin[owner];
    }

    function _updateLastSeen() internal {
        lastCheckin[msg.sender] = block.timestamp;
    }

    //Called by Chainlink Keepers to check if work needs to be done
 //   function checkUpkeep(bytes calldata /*checkData */) external override returns (bool upkeepNeeded, bytes memory) {
        // check to see if the person has checked in.  Timestamp is lesser than  Checkin + time chosen
       //possible grace period
       // upkeepNeeded = (beneficiary != address(0)) && (block.timestamp - lastTimeStamp) > interval;
 //   }

    //Called by Chainlink Keepers to handle work
 //   function performUpkeep(bytes calldata) external override {
      //  lastTimeStamp = block.timestamp;
      //  require(address(this).balance > amount);
      //  beneficiary.transfer(amount);

      //check balances make sure there is enough so we don't revert
//    }

 
    //function to pull out token
    function withdrawToken(IERC20 _tokenAddress) public onlyOwner {
       // require( _tokenAddress.transfer(msg.sender,  _tokenAddress.balanceOf(address(this))), "Unable to transfer");
        require( _tokenAddress.transfer(msg.sender,  _tokenAddress.balanceOf(msg.sender)), "Unable to transfer");
    }
}