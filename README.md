# Expir3

Set beneficiaries to the assets in your wallet.  ERC-20, ERC-115 or ERC-721 tokens will automatically transfer upon death or loss of keys.

Use it was a living will or as a backup for a lost private keys, trust that your assests are not lost forever in your wallet


## Technologies

This project is built with the following open source libraries, frameworks and languages. User choice of framework used, available in plain js or typescript.
| Tech | Description |
| --------------------------------------------- | ------------------------------------------------------------------ |
| ------ | ------ React Frontend Environment ------ |
| [Next JS](https://nextjs.org/) | React Framework |
| ------ | ------ CSS Framework ------ |
| [Tailwind](https://tailwindcss.com/) | A utility-first CSS framework |
| ------ | ------ Ethereum Development Environment ------ |
| [Hardhat](https://hardhat.org/) | Ethereum development environment for professionals |
| ------ | ------ Included Libraries ------ |
| [WAGMI](https://wagmi.sh/) | A set of React Hooks for Web3 |
| [RainbowKit](https://www.rainbowkit.com/docs/introduction) | RainbowKit is a React library that makes it easy to add wallet connection to your dapp. |
| [ChainlinkAutomation] |(https://automation.chain.link/) Automatic Execution service for your smart contracts
| [QuickNode] |(https://www.quicknode.com/) The RPC provider used to deploy and connect our contract to the front end DAPP


## Details

Connect your wallet and "Add new beneficiary"
On the model pop up you will fill in the following

`Token Address` - (ERC20, ERC1155 or ERC721) That you want to send to the beneficiary.

`Beneficiary` - Set the address of where you want the above asset sent to.  Starts with 0x..

`Amount` - For ERC20 and ERC1155 tokens, set how many tokens.  For ERC721 set amount to 1

`Token ID`- For ERC20 tokens it is set to 0.  For ERC1155 and ERC721 tokens, token 1 and above specific to your NFT. 


Upon approving and submitting the beneficiary, you must `check in yearly` to keep the assets in current wallet or the Chainling Automation will execute the transaction

When you set the beneficiary, an NFT with the details is sent the wallet address letting them know about the details.  When the contract executes or the beneficiary is removed the NFT will be burned.

You can remove all beneficiaries with the `remove beneficiaries` button that will clear out beneficiaries and execution data.


## To Work on

Drop down options for existing tokens in wallet (Pull wallet assets)
Give a grace period before execution
Send a reminder to email/calendar when check in date is coming up

