import Head from "next/head";
import Landing from "../pages/landing";

export default function Home() {
  return (
    <>
      <Head>
        <title>Expir3</title>
        <meta name="description" content="Expir3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Landing />
    </>
  );
}
