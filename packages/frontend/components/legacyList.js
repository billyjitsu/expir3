import React, { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { contractConfig } from "../utils/constants";
import LegacyWrapper from "./legacyWrapper";

const legacyList = () => {
    const { address, isConnected } = useAccount();
    const [legacies, setLegacies] = useState([]);

    // Check If any Beneficiaries
    const { data } = useContractRead({
        ...contractConfig,
        functionName: "legacies", // should be "legacyAmount"
        args: [address, 0],
    });

    useEffect(() => {
        if (data)
            console.log(`LegacyAmount: ${data.toString()}`)
        else console.log(`LegacyAmount: Nothing yet`)
        // Hardcoded until contract is re-deployed
        // setLegacies(Array.from(Array(data).keys()));
        setLegacies(Array.from(Array(1).keys()));
    }, [data])

    useEffect(() => {
        console.log(`Legacies: ${JSON.stringify(legacies)}`)
    }, [legacies])

    return (
        <>
            {legacies.length > 0 &&
                legacies.map((v, i) => <LegacyWrapper position={v} id={i} />)
            }
        </>
    )
}

export default legacyList;