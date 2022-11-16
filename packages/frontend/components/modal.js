import React, { useEffect, useState } from "react";
import { useAccount, useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";
import { ethers } from "ethers";

//contract location
import {
  contractConfig,
  contractRecklessWriteConfig,
  ercTokenAbi,
  NFTABI,
} from "../utils/constants";

// const contractAddress = '0x767a79d21Fd9eC7222379340d77c63FE758f4433';
// const mockTokenAddress = '0xB7DfFdb405688508e5Ddc593eBAaE64b25a9BB0C';
// export const ERC721MockAddress = '0x316Cd70a2Bbf381A9b0fa326a76E5E6411bAa454';
// export const ERC1155MockAddress = '0xb9f1208fE950eD6b8Ed9202BFA694eaf934eaC64';

const modal = () => {
  const { address: testatorAddress } = useAccount();

  const [showModal, setShowModal] = useState(false);
  const [showMintingModal, setShowMintingModal] = useState(false);

  const [tokenAddress, setTokenAddress] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [amount, setAmount] = useState(0);
  const [tokenId, setTokenId] = useState(0);

  const [tokenStandard, setTokenStandard] = useState("ERC20");

  const [legacyCount, setLegacyCount] = useState(0);

  const {
    data: addLegacyData,
    write: addLegacy,
    isLoading: isAddLoading,
    isSuccess: isAddStarted,
    error: addError,
  } = useContractWrite({
    ...contractRecklessWriteConfig,
    functionName: "addLegacy",
    // args: [tokenAddress, beneficiary, ethers.utils.parseEther(amount.toString()), tokenId],
    args: [tokenAddress, beneficiary, amount, tokenId],
  });

  const { data: receipt, isSuccess: isLegacyMintingSuccess } = useWaitForTransaction({ hash: addLegacyData?.hash, });

  const { data: legacyCountData } = useContractRead({
    ...contractConfig,
    functionName: "legacyCount",
    args: [testatorAddress],
  });

  //approval for tokens
  // hardcoded to Mock Token
  const {
    data: approvalData,
    write: approveToken,
    isLoading: isApprovalLoading,
    isSuccess: isApprovalStarted,
    error: approvalError,
  } = useContractWrite({
    address: tokenAddress,
    abi: ercTokenAbi,
    functionName: "approve",
    args: [contractConfig.address, amount],
  });

  //for ERC721 NFT approval
  const {
    data: approvalNFTData,
    write: approveTokenNFT,
    error: approvalNFTError,
  } = useContractWrite({
    //address hardcoded for now (need stat variable)
    address: tokenAddress,
    abi: NFTABI,
    functionName: "setApprovalForAll",
    args: [contractConfig.address, true],
  });

  // //for ERC1155 NFT approval
  // const {
  //   data: approvalNFT1155Data,
  //   write: approveToken1155NFT,
  //   error: approvalNFT1155Error,
  // } = useContractWrite({
  //   //address hardcoded for now (need stat variable)
  //   address: "0xb9f1208fE950eD6b8Ed9202BFA694eaf934eaC64",
  //   abi: [
  //     {
  //       name: "setApprovalForAll",
  //       outputs: [],
  //       stateMutability: "nonpayable",
  //       type: "function",
  //     },
  //   ],
  //   functionName: "setApprovalForAll",
  //   args: [contractConfig.address, true],
  // });

  useEffect(() => {
    if (legacyCountData == undefined) return;
    setLegacyCount(legacyCountData?.toNumber());
  }, [legacyCountData]);


  const handleAmountChange = async (e) => {
    // if (tokenStandard == "ERC20") {
    //   setAmount(ethers.utils.parseEther(e.target.value))
    // } else 
    if (tokenStandard == "ERC721") {
      setAmount(1);
    } else {
      setAmount(e?.target.value);
    }
  }

  const handleTokenIdChange = async (e) => {
    if (tokenStandard == "ERC20") {
      setTokenId(0);
    } else {
      setTokenId(e?.target.value);
    }
  }

  const handleSubmit = async () => {
    //should approve token first before adding legacy
    // we need to access the token contract ABIs for each token
    /*need to check the tokenID to see if we need know which call*/

    if (tokenId == 0) {
      setAmount(ethers.utils.parseEther(amount.toString()));
      approveToken();
    } else {
      approveTokenNFT();
    }
    await addLegacy();
    //
    setTokenAddress("");
    setBeneficiary("");
    setAmount(1);
    setTokenId(0);
    setTokenAddress("ERC20");
    //
    hide();
    setShowMintingModal(true);
  };

  const show = () => {
    setShowModal(true);
  };

  const hide = () => {
    setShowModal(false);
  };

  const submit = () => {
    console.log("submit");
  };

  console.log("This is the transaction receipt", receipt)

  return (
    <>
      <button
        className="text-2xl font-semibold bg-black text-white py-3 px-16 self-start mx-5 mt-12 border-none rounded-full"
        onClick={show}
      >
        Add new beneficiary
      </button>
      {showModal && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/[0.5] flex justify-center text-center z-1">
          <div className="bg-white pt-2 pb-8 px-10 rounded-3xl h-fit text-black self-center">
            {legacyCount == 0 ? (
              <h2 className=" text-xl font-bold p-5">
                Please add new beneficiary first
              </h2>
            ) : (
              <h2 className=" text-xl font-bold p-5">Add new beneficiary</h2>
            )}
            <div className="mb-4 flex flex-col">
              <select onChange={(e) => { setTokenStandard(e.target.value) }}>
                <option value="ERC20">ERC20</option>
                <option value="ERC721">ERC721</option>
                <option value="ERC1155">ERC1155</option>
              </select>
            </div>
            <p className="text-gray-400 mb-4 text-xs">Select correct token type from dropdown above.</p>
            <div className="mb-4 flex flex-col">
              <label
                htmlFor="token"
                className="label mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 cursor-text text-sm self-start"
              >
                Token Address
              </label>
              <input
                className="input border border-gray-400 appearance-none rounded-xl w-full px-3 py-3 pt-3 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600"
                id="token"
                type="text"
                autoFocus
                onChange={(e) => setTokenAddress(e.target.value)}
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label
                htmlFor="beneficiary"
                className="label mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 cursor-text text-sm self-start"
              >
                Beneficiary
              </label>
              <input
                className="input border border-gray-400 appearance-none rounded-xl w-full px-3 py-3 pt-3 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600"
                id="beneficiary"
                type="text"
                onChange={(e) => setBeneficiary(e.target.value)}
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label
                htmlFor="amount"
                className="label mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 cursor-text text-sm self-start"
              >
                Amount
              </label>
              <input
                className="input border border-gray-400 appearance-none rounded-xl w-full px-3 py-3 pt-3 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600"
                id="amount"
                type="text"
                onChange={(e) => handleAmountChange(e)}
                disabled={tokenStandard == "ERC721"}
                placeholder="1 token by default for ERC721"
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label
                htmlFor="tokenId"
                className="label mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 cursor-text text-sm self-start"
              >
                Token ID
              </label>
              <input
                className="input border border-gray-400 appearance-none rounded-xl w-full px-3 py-3 pt-3 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600"
                id="tokenId"
                type="text"
                onChange={(e) => handleTokenIdChange(e)}
                disabled={tokenStandard == "ERC20"}
                placeholder="0 by default for ERC20"
              />
            </div>
            <p className="text-red-400 mb-6 text-xs">Disabled inputs are highlighted in red.</p>
            <button
              className="text-lg font-semibold bg-black text-white py-3 px-8 self-start mx-3 border-none rounded-full"
              onClick={() => handleSubmit()}
            >
              Submit
            </button>
            <button
              className="text-lg font-semibold bg-gray-200 py-3 px-8 self-start mx-3 border-none rounded-full"
              onClick={hide}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showMintingModal && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/[0.5] flex justify-center text-center z-1">
          <div className="bg-white pt-2 pb-8 px-10 rounded-3xl h-fit text-black self-center">
            {isLegacyMintingSuccess ? (
              <>
                <h2 className=" text-xl font-bold p-5">
                  Legacy successfully created!
                </h2>
                <a href={`https://goerli.etherscan.io/tx/${receipt.transactionHash}`}>
                  <button
                    className="text-lg font-semibold bg-gray-200 py-3 px-8 self-start mx-3 border-none rounded-full">
                    View Txn on Etherscan
                  </button>
                </a>
                <button
                  className="text-lg font-semibold bg-gray-200 py-3 px-8 self-start mx-3 border-none rounded-full"
                  onClick={() => { setShowMintingModal(false) }}
                >
                  Close
                </button>
              </>
            ) : (
              <h2 className=" text-xl font-bold p-5">
                Creating legacy...
              </h2>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default modal;
