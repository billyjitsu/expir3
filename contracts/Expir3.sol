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
// Inh3ritance /Inh3rit
//contract Expir3 is AutomationCompatibleInterface, Ownable { 
contract Expir3 is Ownable { 

    IERC20 public token;
    uint256 public amount;

    /// @dev The unix timestamp at which the address was last seen.
    mapping(address => uint256) public lastCheckin;

    // map who you want to benefit

    constructor(address _token){
        token = IERC20(_token);
    }

    //need to interface the token contracts

    //register you wallet and set beneficiary
    function register() public {
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer to escrow failed!");
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
       // require(token.transfer(msg.sender, token.balanceOf(address(this))), "Unable to transfer");
        require(token.transfer(msg.sender, token.balanceOf(msg.sender)), "Unable to transfer");
    }
}