import contractStuff from "../contracts/contract.json";

export const contractAbi = contractStuff.abi;

export const contractAddress = '0x7b6036Af84b4A640388e601d7990e864de78a1E0';
export const mockTokenAddress = '0xB7DfFdb405688508e5Ddc593eBAaE64b25a9BB0C';

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