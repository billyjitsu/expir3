import React, { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { contractConfig } from "../utils/constants";

const legacyData = (props) => {
    const { nftId } = props;
    const { address, isConnected } = useAccount();
    const [legacy, setLegacy] = useState({});

    // Check If any Beneficiaries
    const { data } = useContractRead({
        ...contractConfig,
        functionName: "legacyNFTs",
        args: [nftId],
    });

    useEffect(() => {
        console.log(`LegacyNFTs[${nftId}]: ${data?.toString()}`)
        setLegacy(data);
    }, [data])

    return (
        <>
            {data &&
                <div className="grid grid-cols-5 grid-row-flow gap-4 w-full mx-auto mt-5 ml-5">
                    <h3 className="truncate">{legacy.token?.toString()}</h3>
                    <h3 className="truncate">{legacy.beneficiary?.toString()}</h3>
                    <h3 className="truncate">{legacy.amount?.toString()}</h3>
                    <h3 className="truncate">{legacy.tokenId?.toString()}</h3>
                </div>
            }
        </>
    )
}

export default legacyData;