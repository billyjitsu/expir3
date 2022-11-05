import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useContract,
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useProvider,
  useSigner,
} from "wagmi";
import Modal from "../../components/modal";
import React, { useState, useEffect } from "react";

//contract location
import contractStuff from "../../contracts/contract.json";

const index = () => {
  const { account, isConnected } = useAccount();
  const { data: signerData } = useSigner();
  const [loading, setLoading] = useState(false);

  const contractConfig = {
    addressOrName: "0xBEB62460cD1773DFa240Ae23cC1BC4C089FAA52B",
    contractInterface: contractStuff.abi,
  };
  // Not working
  const {
    data: addLegacy,
    write: add,
    isLoading: isAddLoading,
    isSuccess: isAddStarted,
    error: addError,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: '0xBEB62460cD1773DFa240Ae23cC1BC4C089FAA52B',
    abi: contractStuff.abi,
    functionName: "addLegacy",
    args: [
      "0x74b17BbA1F94141552F9697F16f29fc1Edb1AEf7",
      "0xe2b8651bF50913057fF47FC4f02A8e12146083B8",
      10,
      0,
    ],
  });

  // Group Click Function
  const addFunction = async () => {
    const tx = await add({
      args: [
        "0x74b17BbA1F94141552F9697F16f29fc1Edb1AEf7",
        "0xe2b8651bF50913057fF47FC4f02A8e12146083B8",
        10,
        0,
      ],
      //   overrides: {
      //   value: ethers.utils.parseEther(payment) ,
      // },
    });
  };

  const { config, error } = usePrepareContractWrite({
    address: '0xBEB62460cD1773DFa240Ae23cC1BC4C089FAA52B',
    abi:[{
      inputs: [],
      name: "checkIn",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },],
    functionName: "checkIn",
  });
  const { write } = useContractWrite(config);

  // Group Click Function
  const checkIn = async () => {
    const tx = await check();
  };

  // // Total Cubes Bought
  // const { data: upkeepData } = useContractRead({
  //   ...contractConfig,
  //   functionName: 'fakeUpkeep',
  //  // watch: true,
  //  // chainId: 5,
  // });

  // const checkStatus = async () => {

  //   console.log("upkeepData", upkeepData);
  // };

  //Using useContract only (instead of useContractWrite)
  // const addBenefit = useContract({
  //   ...contractConfig,
  //   signerOrProvider: signerData,
  // });

  //test effect:
  useEffect(() => {
    console.log("USE NETWORK");
    console.log("contractconfig", contractConfig); // array of supported chains
    // console.log("chainId:", chainId);
    // console.log("activeChain:", activeChain);
    // console.log("chainStuff:", chainStuff);
    console.log("___________");
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <header className="flex justify-between p-3">
        <h1 className="text-4xl font-bold">
          <a href="/">🔏 Expir3</a>
        </h1>
        <ConnectButton />
      </header>
      <div></div>
      <hr></hr>
      <main className="flex flex-col items-center justify-center grow mx-5">
        {isConnected ? (
          <>
            <h2 className="text-3xl font-semibold self-start max-w-50">
              Register your beneficiary
            </h2>
            <p className="text-xl self-start mt-2 w-11/12 text-gray-400 border-b-2 border-gray-300 pb-3">
              Schedule automatic payouts to accounts of your choice as your will
              or as a fall back.
            </p>
            <div className="grid grid-cols-5 grid-row-flow gap-4 w-full mx-auto mt-5 ml-5">
              <h3 className="font-semibold">Beneficiary</h3>
              <h3 className="font-semibold">Token</h3>
              <h3 className="font-semibold">Token ID</h3>
              <h3 className="font-semibold">Amount</h3>
              <h3 className="font-semibold">Delete</h3>
            </div>

            {/* TEST BUTTON */}
            <button
              onClick={add}
              className="bg-gray-900 hover:bg-gray-800 rounded-full px-12 py-2 sm:w-auto text-white"
            >
              {" "}
              test{" "}
            </button>
            <button
              onClick={() => write?.()}
              className="bg-gray-900 hover:bg-gray-800 rounded-full px-12 py-2 sm:w-auto text-white"
            >
              {" "}
              Checkin{" "}
            </button>
            {error && (
              <div>
                An error occurred preparing the transaction: {error.message}
              </div>
            )}
            {/* <button
              onClick={checkStatus}
              className="bg-gray-900 hover:bg-gray-800 rounded-full px-12 py-2 sm:w-auto text-white"
            >
              {" "}
              Read{" "}
            </button> */}

            {/* //////////// */}

            <Modal />
            {/* <button className="text-2xl font-semibold bg-black text-white p-3 self-start mx-5 mt-12 border-none rounded-md"
              onClick={() => setShowModal(true)}>
              <a href="/dashboard">Add new beneficiary</a>
            </button> */}
            {/* <div className="flex flex-row px-40">
              <div className="mt-16 max-w-sm mx-auto">
              </div>
              <div className="mt-16 mx-auto">
              </div>
            </div> */}
          </>
        ) : (
          <>
            <p>Please Connect Wallet</p>
          </>
        )}
        {/* <button className="text-2xl font-semibold bg-black text-white p-3 self-start mx-5 mt-12 border-none rounded-md">
          <a href="#">Register Now</a>
        </button> */}
      </main>
    </div>
  );
};

export default index;
