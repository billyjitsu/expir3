import contractStuff from "../contracts/contract.json";
import erc20abi from "../contracts/mockToken.json";

export const contractAbi = contractStuff.abi;
export const ercTokenAbi = erc20abi.abi;

export const contractAddress = '0x48825bB786e993F6A6d6101e0ebaff48C3BAAb63';
export const mockTokenAddress = '0xB7DfFdb405688508e5Ddc593eBAaE64b25a9BB0C';
export const ERC721MockAddress = '0x316Cd70a2Bbf381A9b0fa326a76E5E6411bAa454';
export const ERC1155MockAddress = '0xb9f1208fE950eD6b8Ed9202BFA694eaf934eaC64';

export const contractConfig = {
    address: contractAddress,
    abi: contractAbi,
    watch: true,
    chainId: 5
}

export const contractRecklessWriteConfig = {
    address: contractAddress,
    abi: contractAbi,
    mode: "recklesslyUnprepared",
}

export const contractWriteConfig = {
    address: contractAddress,
    abi: contractAbi,
}

export const NFTABI = 
    [
        {
          name: "setApprovalForAll",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
    ]
