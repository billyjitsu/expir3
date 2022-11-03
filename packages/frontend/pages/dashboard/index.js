import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import React from "react";

const index = () => {
  const { account, isConnected } = useAccount();

  return (
    <div className={""}>
      <header className="flex justify-between p-3">
        <h1 className="text-4xl font-bold">🔏 Expir3</h1>
        <ConnectButton />
      </header>
      <div></div>
      <hr></hr>
      <main className={""}>
        {isConnected ? (
          <>
            <h2 className="text-3xl font-semibold self-start mx-5 max-w-50">
              Register your beneficiary
            </h2>
            <p className="text-xl self-start mx-5 mt-2 max-w-175 text-gray-400">
              Schedule automatic payouts to accounts of your choice as your will
              or as a fall back.
            </p>{" "}
          </>
        ) : (
          <>
            {" "}
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
