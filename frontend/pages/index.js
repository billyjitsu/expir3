import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Expir3</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="p-3">
        <h1 className="text-4xl font-bold">🔏 Expir3</h1>
      </header>
      <hr></hr>
      <main className={styles.main}>
        <h2 className="text-3xl font-semibold self-start mx-5 max-w-50">
          Create your on Chain will
        </h2>
        <p className="text-xl self-start mx-5 mt-2 max-w-175 text-gray-400">
          Schedule automatic payouts to accounts of your choice as your will or
          as a fall back.
        </p>
        <button style={heroActionButton}>
          <a href="#">Create New/ Sign In</a>
        </button>
      </main>
    </div>
  );
}

const heroActionButton = {
  fontSize: "25px",
  fontWeight: "500",
  backgroundColor: "black",
  color: "white",
  padding: "10px 20px",
  alignSelf: "start",
  margin: "50px 20px 0 20px",
  borderRadius: "7px",
  border: "none",
};

/*
  Legacy: struct -- tracks
    - token (eg. USDC, ETH)
    - beneficiary (wallet to be bequeathed to)
    - amount (of the token to be sent)
    - tokenId (the type of token like ERC20, ERC721, ERC1155)

  executionDay: mapping -- checks the day of execution of legacy for a address

  executionList: mapping -- checks addresses to be executed on a day

  legacies: mapping -- checks arrays of Legacy struct for an address

  what is testator?

  AddLegacy: event -- new legacy added

  RemoveLegacy: event -- existing legacy removed

  NewExecutionDay: event -- moved execution day after check-in

  LegacyTransferFailed: event -- legacy transfer has failed

  Executed: event -- will has been carried out successfully

  getData(): internal function -- returns a day for mapping timestamp

  addLegacy(): external function -- lets Testator (msg.sender) to add new Legacy

  removeLegacy(): external function -- lets Testator remove existing Legacy

  checkIn(): external function -- lets Testator check in

  withdrawToken(): onlyOwner -- lets owner (testator) withdraw a particular token
*/
