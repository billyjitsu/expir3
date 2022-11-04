import { useState } from "react";

const modal = () => {
  const [showModal, setShowModal] = useState(false);

  const show = () => {
    setShowModal(true);
  }

  const hide = () => {
    setShowModal(false);
  }

  const submit = () => {
    console.log("submit");
  }

  return (
    <>
      <button className="text-2xl font-semibold bg-black text-white p-3 self-start mx-5 mt-12 border-none rounded-md"
        onClick={show}>
        Add new beneficiary
      </button>
      {showModal &&
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/[0.5] flex justify-center text-center z-1">
          <div className="bg-white py-2 px-8 rounded-md h-fit text-black self-center">
            <div className="mb-4 flex flex-col">
              <label htmlFor="token" className="label mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 cursor-text text-sm self-start">Token Address</label>
              <input className="input border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-3 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600"
                id="token" type="text" autoFocus />
            </div>
            <div className="mb-4 flex flex-col">
              <label htmlFor="beneficiary" className="label mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 cursor-text text-sm self-start">Beneficiary</label>
              <input className="input border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-3 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600" id="beneficiary" type="text" />
            </div>
            <div className="mb-4 flex flex-col">
              <label htmlFor="amount" className="label mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 cursor-text text-sm self-start">Amount</label>
              <input className="input border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-3 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600" id="amount" type="text" />
            </div>
            <div className="mb-4 flex flex-col">
              <label htmlFor="tokenId" className="label mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 cursor-text text-sm self-start">Token ID</label>
              <input className="input border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-3 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600" id="tokenId" type="text" />
            </div>
            <button className="text-xl font-semibold bg-black text-white py-3 px-5 self-start mx-5 border-none rounded-md"
              onClick={submit}>Submit</button>
            <button className="text-xl font-semibold bg-gray-300 py-3 px-5 self-start mx-5 border-none rounded-md"
              onClick={hide}>Close</button>
          </div>
        </div>
      }
    </>
  )
}

export default modal;
