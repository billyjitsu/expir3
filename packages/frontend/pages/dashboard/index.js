import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
// import Dropdown from "../../components/dropdown";
import Input from "../../components/input";
import CheckIn from "../../components/checkIn";
import Modal from "../../components/modal";
import React, { useState } from "react";

const index = () => {
  const { account, isConnected } = useAccount();

  

  return (
    <div className="h-screen flex flex-col">
      <header className="flex justify-between p-3">
        <h1 className="text-4xl font-bold"><a href="/">🔏 Expir3</a></h1>
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
