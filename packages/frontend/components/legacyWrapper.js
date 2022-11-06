import React, { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { contractConfig } from "../utils/constants";
import LegacyData from "./legacyData";

const legacyWrapper = (props) => {
    const { position } = props;
    const { address, isConnected } = useAccount();
    const [nftId, setNftId] = useState(0);

    // Check If any Beneficiaries
    const { data } = useContractRead({
        ...contractConfig,
        functionName: "legacies",
        args: [address, position],
    });

    useEffect(() => {
        console.log(`Legacy[${position}]: ${data}`)
        setNftId(data);
    }, [data])

    return (
        <>
            {isConnected && address && nftId &&
                <LegacyData nftId={nftId} />

                //         < div className="grid grid-cols-5 grid-row-flow gap-4 w-full mx-auto mt-5 ml-5">
                //     {/* {renderListOfBeneficiaries(nftData)} */}
                //     <h3 className="truncate">{address}</h3>
                //     <h3 className="truncate">{address}</h3>
                //     <h3 className="truncate"></h3>
                //     <h3 className="truncate">{legaciesData?.toString()}</h3>
                // </div>
            }
        </>
    )
}

export default legacyWrapper;