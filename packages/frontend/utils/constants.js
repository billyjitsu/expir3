import contractStuff from "../contracts/contract.json";

export const contractAbi = contractStuff.abi;

export const contractAddress = '0x767a79d21Fd9eC7222379340d77c63FE758f4433';
export const mockTokenAddress = '0xB7DfFdb405688508e5Ddc593eBAaE64b25a9BB0C';

export const contractConfig = {
    address: contractAddress,
    abi: contractAbi,
    watch: true,
    chainId: 5
}

export const contractWriteConfig = {
    address: contractAddress,
    abi: contractAbi,
    mode: "recklesslyUnprepared",
}