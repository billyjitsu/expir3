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


## Details

Connect your wallet and "Add new beneficiary"
On the model pop up you will fill in the following

`Token Address` - (ERC20, ERC1155 or ERC721) That you want to send to the beneficiary.

`Beneficiary` - Set the address of where you want the above asset sent to.  Starts with 0x..

`Amount` - For ERC20 and ERC1155 tokens, set how many tokens.  For ERC721 set amount to 1

`Token ID`- For ERC20 tokens it is set to 0.  For ERC1155 and ERC721 tokens, token 1 and above specific to your NFT. 


Upon approving and submitting the beneficiary, you must `check in yearly` to keep the assets in current wallet or the Chainling Automation will execute the transaction

You can remove all beneficiaries with the `remove beneficiaries` button that will clear out all beneficiaries and execution data.


## Issues

Currently working on being to remove indivial beneficiaries
Drop down options for existing tokens in wallet

