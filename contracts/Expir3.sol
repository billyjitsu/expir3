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
    // 1 token only at this time / array?
    address public token;
   // address public WETH;  // WETH 0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6
   // address public USDC;  // USDC 0xD87Ba7A50B2E7E660f678A895E4B72E7CB4CCd9C
   // address public USDT;  // USDT 0xe583769738b6dd4E7CAF8451050d1948BE717679
   // address public DAI;   // DAI  0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844
   

    //Deadmans switch - Timestamp checkin
    mapping(address => uint256) public lastCheckin;
    // store a mapping of addresses so no longer using msg.sender to execute
    mapping (uint256 => address[]) public executionDate;

    //Position in the execution Date Mapping
    mapping (address => uint256) public position;
   
    // map who you want to benefit
    mapping (address => address) public recipients;
    mapping (address => address[]) public massRecipients;

    // map how much  -- mapping of a mapping  / creata struct
    mapping (address => uint256) public amounts;
    mapping (address => uint256[]) public multiAmounts;

    // map token type -- mapping of a mapping  / create a struct
    mapping (address => address[]) public tokens;

    // map address to deadmans signal?  if it passes?
    // mapping (address => boolean) pubic deadSwitch;

    //Events
    event WalletRegistered(address _register, address _reciever, uint256 _amount, uint256 _time);

    //for future to add more token support on the fly or register tokens
    constructor(address _token){
        //token = IERC20(_token);
        token = _token;  // make this dynamic?
    }
    
    //need to interface the token contracts
    // need front end to approve this contract

    // push the tokens in an array
    //register you wallet and set beneficiary
    function register(address _recipients, uint256 _amounts, address _tokens) external {
        //must set allowance per token
        //approve tokenContract

        //Set who recieves token
        massRecipients[msg.sender].push(_recipients); 
        //Set amount to recipient
        multiAmounts[msg.sender].push(_amounts);
        //Set the token you want to send
        tokens[msg.sender].push(_tokens);


        // turn on deadmans lock
        // demo deadmans lock - another quick mapping
        //  lastCheckin[msg.sender] = block.timestamp + 15 seconds; 

        // if I have an execution date, dont' add another
        if (lastCheckin[msg.sender] == 0) {
            uint256 temp = getDay(block.timestamp - 1 days); // set it for the future - if set current day.. will execute same day
            lastCheckin[msg.sender] = temp; 
        
            position[msg.sender] = executionDate[temp].length;
            executionDate[temp].push(msg.sender);
        }
    
        //event registers
       // emit WalletRegistered(msg.sender, recipients[msg.sender], amounts[msg.sender], lastCheckin[msg.sender]);
    }
     

    

       //bypass the chainlink keeprs for now to test
       // this logic will go in the keepers
    function executeManually() public {
        //check if true
        // will need a way to scan through all scanners
    //    require( block.timestamp > lastCheckin[msg.sender], "Not Dead");  <<< verify the check

        // how would this work in a long list? look through the mapping length?
        //transfer funds based on the length of recipients - doesn't account for token balances after though
        for(uint256 i = 0; i < massRecipients[msg.sender].length; i++) {
         require(IERC20(tokens[msg.sender][i]).transferFrom(msg.sender, massRecipients[msg.sender][i], multiAmounts[msg.sender][i]), "Transfer to escrow failed!");
        }

        //delete the mapping
    }

    /*

       //bypass the chainlink keeprs for now to test
       // this logic will go in the keepers
    function executeManually() public {
        //check if true
        require( block.timestamp > lastCheckin[msg.sender], "Not Dead");

        // how would this work in a long list? look through the mapping length?
        //transfer funds 
         require(token.transferFrom(msg.sender, recipients[msg.sender], amounts[msg.sender]), "Transfer to escrow failed!");
    }
    */


    // renew deadman's lock - hourly, daily, yearly.. etc
    function checkIn() public {
        // check block.timestamp;

        //delete old position
        uint256 oldDate = getLastSeen(msg.sender);
        uint256 oldPosition = position[msg.sender];
        delete executionDate[oldDate][oldPosition];  

        // renew that mapping 
        uint256 temp = getDay(block.timestamp);
        lastCheckin[msg.sender] = getDay(block.timestamp - 1 days);  //update mapping of days  set to yesterady = 364 days
        position[msg.sender] = executionDate[temp].length;
        executionDate[temp].push(msg.sender);

    }

    function cancelAll() public {
        //need to revoke approvals on contracts
        for (uint256 i=0; i < massRecipients[msg.sender].length; i++) {
            delete massRecipients[msg.sender][i];
            delete multiAmounts[msg.sender][i];
            delete tokens[msg.sender][i];
        }
        uint256 tempPos = position[msg.sender];
        uint256 tempCheck = lastCheckin[msg.sender];
        delete executionDate[tempCheck][tempPos];
        delete lastCheckin[msg.sender];
    }


    /// @notice Returns the time (in seconds since the epoch) at which the owner was last seen, or zero if never seen.
    function getLastSeen(address _address) public view returns (uint256) {
        return lastCheckin[_address];
    }

    function getDay(uint256 date ) public  pure returns(uint256) {
        //365 days of the year
        uint256 second = date % (365 days) ;
        uint256 dayOfYear = second / 24 hours;
        return dayOfYear;
    }

    //Called by Chainlink Keepers to check if work needs to be done
 //   function checkUpkeep(bytes calldata /*checkData */) external override returns (bool upkeepNeeded, bytes memory) {
        // check to see if the person has checked in.  Timestamp is lesser than  Checkin + time chosen
       //possible grace period
       // upkeepNeeded = (beneficiary != address(0)) && (block.timestamp - lastTimeStamp) > interval;

    //uint256 tempDay = getDay(block.timestamp);
    //bool status =  executionDate[tempDay].length > 0;

 //   }

    //Called by Chainlink Keepers to handle work
 //   function performUpkeep(bytes calldata) external override {
      //  lastTimeStamp = block.timestamp;
      //  require(address(this).balance > amount);
      //  beneficiary.transfer(amount);

      //check balances make sure there is enough so we don't revert

      // delete today's mapping
//    }

 
    //function to pull out token
    function withdrawToken(IERC20 _tokenAddress) public onlyOwner {
       // require( _tokenAddress.transfer(msg.sender,  _tokenAddress.balanceOf(address(this))), "Unable to transfer");
        require( _tokenAddress.transfer(msg.sender,  _tokenAddress.balanceOf(msg.sender)), "Unable to transfer");
    }
}