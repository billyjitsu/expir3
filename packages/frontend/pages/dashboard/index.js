import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useSigner,
} from "wagmi";
import Modal from "../../components/modal";
import CheckIn from "../../components/checkIn";
import LegacyList from "../../components/legacyList";

import React, { useState, useEffect } from "react";

//contract location
// import contractStuff from "../../contracts/contract.json";
import { contractConfig, contractAddress, contractAbi } from "../../utils/constants";

const index = () => {
  const { address, isConnected } = useAccount();
  const { data: signerData } = useSigner();
  const [loading, setLoading] = useState(false);
  const [legacyCount, setLegacyCount] = useState(0);

  // const contractAddress = '0x767a79d21Fd9eC7222379340d77c63FE758f4433';

  // Check If any Beneficiaries
  const { data: legacyCountData } = useContractRead({
    ...contractConfig,
    functionName: "legacyCount",
    args: [address],
  });

  // const { data: execListData } = useContractRead({
  //   ...contractConfig,
  //   functionName: "executionList",
  //   args: [321, 0],
  // });


  //test effect:
  useEffect(() => {
    console.log("LOGS");
    console.log("Legacy Count:", legacyCountData?.toString());
    // console.log("Execution Day:", execDay?.toString());
    // console.log("Execution List:", execListData.toString());
    // console.log("legacyNFTs:", nftData);
    console.log("___________");
  }, []);

  useEffect(() => {
    if (!legacyCountData) return;
    setLegacyCount(legacyCountData.toNumber())
  }, [legacyCountData])


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
            {address && legacyCount > 0 && <CheckIn />}

            <h2 className="text-3xl font-semibold self-start max-w-50">
              Register your beneficiary
            </h2>

            <p className="text-xl self-start mt-2 w-11/12 text-gray-400 border-b-2 border-gray-300 pb-3">
              Schedule automatic payouts to accounts of your choice as your will
              or as a fall back.
            </p>
            {/* <button
              onClick={() => checkIn?.()}
              className="bg-blue-600 hover:bg-blue-700 text-white text-bold rounded-full px-12 py-2 mt-6 sm:w-auto"
            >Check In</button> */}

            {/* <LegacyList /> */}
            <div className="grid grid-cols-6 grid-row-flow gap-4 w-full mx-auto mt-5 ml-5 justify-items-center">
              <h3 className="font-semibold">Token</h3>
              <h3 className="font-semibold">Beneficiary</h3>
              <h3 className="font-semibold">Amount</h3>
              <h3 className="font-semibold">Token ID</h3>
              <h3 className="font-semibold">Type</h3>
              <h3 className="font-semibold">Delete</h3>
            </div>

            {isConnected && address &&
              <LegacyList />
            }


            {/* TEST BUTTON */}
            {/* <button
              onClick={add}
              className="bg-gray-900 hover:bg-gray-800 rounded-full px-12 py-2 sm:w-auto text-white"
            >
              {" "}
              test{" "}
            </button>
            <button
              onClick={() => write?.([])}
              className="bg-gray-900 hover:bg-gray-800 rounded-full px-12 py-2 sm:w-auto text-white"
            >
              {" "}
              Checkin{" "}
            </button> */}
            {/* {error && (
              <div>
                An error occurred preparing the transaction: {error.message}
              </div>
            )} */}
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
