import contractStuff from "../contracts/contract.json";
import erc20abi from "../contracts/mockToken.json";

export const contractAbi = contractStuff.abi;
export const ercTokenAbi = erc20abi.abi;

//On Mumbai
export const contractAddress = '0xe3d2683A12f341220d2826a617C53c6aA0182f2C';
export const mockTokenAddress = '0xb2A6879Ebce0d76F7d4E29771a9b4035f165d74d';
export const ERC721MockAddress = '0x9AfFDF8A6b23f42d25EEFF5d79d2b3DEf5092D0E';
export const ERC1155MockAddress = '0xAB45D1cDDf5e32781071c94127c519510819B422';

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
