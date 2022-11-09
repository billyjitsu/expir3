import React, { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { contractConfig } from "../utils/constants";

const legacyData = (props) => {
    const { nftId } = props;
    const { address, isConnected } = useAccount();
    const [legacy, setLegacy] = useState({});
    const [tokenType, setTokenType] = useState('');

    // Check If any Beneficiaries
    const { data } = useContractRead({
        ...contractConfig,
        functionName: "legacyNFTs",
        args: [nftId],
    });

    useEffect(() => {
        // console.log(`LegacyNFTs[${nftId}]: ${data?.toString()}`)
        setLegacy(data);
        const amount = data.amount?.toNumber();
        const tokenId = data.tokenId?.toNumber();
        if (tokenId === 0) setTokenType('ERC20')
        else {
            if (amount === 0) setTokenType('ERC721')
            else setTokenType('ERC1155')
        }
    }, [data])

    return (
        <>
            {data &&
                <div className="grid grid-cols-6 grid-row-flow gap-4 w-full mx-auto mt-5 ml-5">
                    <h3 className="truncate">{legacy.token?.toString()}</h3>
                    <h3 className="truncate">{legacy.beneficiary?.toString()}</h3>
                    <h3 className="justify-self-center">{legacy.amount?.toString()}</h3>
                    <h3 className="justify-self-center">{legacy.tokenId?.toString()}</h3>
                    <h3 className="justify-self-center">{tokenType}</h3>
                    <button className="justify-self-center text-white bg-black hover:bg-red-500 text-bold rounded-full px-6 sm:w-auto">X</button>
                </div>
            }
        </>
    )
}

export default legacyData;