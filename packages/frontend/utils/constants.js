import contractStuff from "../contracts/contract.json";

export const contractAbi = contractStuff.abi;

export const contractAddress = '0x1b1aEdF10181EC818CB16290e5e5Bf186A308383';
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