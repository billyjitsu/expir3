import React, { useEffect, useState } from "react";
import {
  useAccount,
  useContractRead,
  useContractWrite,
} from "wagmi";

//contract location
import { contractConfig, contractRecklessWriteConfig } from "../utils/constants";

// const contractAddress = '0x767a79d21Fd9eC7222379340d77c63FE758f4433';
// const mockTokenAddress = '0xB7DfFdb405688508e5Ddc593eBAaE64b25a9BB0C';

const modal = () => {
  const { address: testatorAddress } = useAccount();

  const [showModal, setShowModal] = useState(false);

  const [tokenAddress, setTokenAddress] = useState('');
  const [beneficiary, setBeneficiary] = useState('');
  const [amount, setAmount] = useState(0);
  const [tokenId, setTokenId] = useState(0);

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
    args: [
      tokenAddress,
      beneficiary,
      amount,
      tokenId,
    ],
  });

  const {
    data: legacyCountData
  } = useContractRead({
    ...contractConfig,
    functionName: "legacyCount",
    args: [
      testatorAddress,
    ],
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
    ...contractRecklessWriteConfig,
    functionName: "approve",
    args: [
      contractConfig.address,
      amount,
    ],
  });

  useEffect(() => {
    if (legacyCountData == undefined) return;
    setLegacyCount(legacyCountData?.toNumber());
  }, [legacyCountData])

  const handleSubmit = async () => {
    //should approve token first before adding legacy
    // we need to access the token contract ABIs for each token
    approveToken();
    await addLegacy();
    hide();
  }

  const show = () => {
    setShowModal(true);
  }

  const hide = () => {
    setShowModal(false);
  }

  const submit = () => {
    console.log("submit");
  }

  // console.log("He has legacies", checkLegacies);

  return (
    <>
      <button className="text-2xl font-semibold bg-black text-white py-3 px-16 self-start mx-5 mt-12 border-none rounded-full"
        onClick={show}>
        Add new beneficiary
      </button>
      {showModal &&
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/[0.5] flex justify-center text-center z-1">
          <div className="bg-white pt-2 pb-8 px-10 rounded-3xl h-fit text-black self-center">
            {legacyCount == 0 ?
              <h2 className=" text-xl font-bold p-5">Please add new beneficiary first</h2>
              :
              <h2 className=" text-xl font-bold p-5">Add new beneficiary</h2>
            }
            <div className="mb-4 flex flex-col">
              <label htmlFor="token" className="label mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 cursor-text text-sm self-start">Token Address</label>
              <input className="input border border-gray-400 appearance-none rounded-xl w-full px-3 py-3 pt-3 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600"
                id="token" type="text" autoFocus
                onChange={(e) => setTokenAddress(e.target.value)} />
            </div>
            <div className="mb-4 flex flex-col">
              <label htmlFor="beneficiary" className="label mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 cursor-text text-sm self-start">Beneficiary</label>
              <input className="input border border-gray-400 appearance-none rounded-xl w-full px-3 py-3 pt-3 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600" id="beneficiary" type="text"
                onChange={(e) => setBeneficiary(e.target.value)} />
            </div>
            <div className="mb-4 flex flex-col">
              <label htmlFor="amount" className="label mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 cursor-text text-sm self-start">Amount</label>
              <input className="input border border-gray-400 appearance-none rounded-xl w-full px-3 py-3 pt-3 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600" id="amount" type="text"
                onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="mb-4 flex flex-col">
              <label htmlFor="tokenId" className="label mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 cursor-text text-sm self-start">Token ID</label>
              <input className="input border border-gray-400 appearance-none rounded-xl w-full px-3 py-3 pt-3 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600" id="tokenId" type="text"
                onChange={(e) => setTokenId(e.target.value)} />
            </div>
            <button className="text-lg font-semibold bg-black text-white py-3 px-8 self-start mx-3 border-none rounded-full"
              onClick={() => handleSubmit()}>Submit</button>
            <button className="text-lg font-semibold bg-gray-200 py-3 px-8 self-start mx-3 border-none rounded-full"
              onClick={hide}>Close</button>
          </div>
        </div>
      }
    </>
  )
}

export default modal;
