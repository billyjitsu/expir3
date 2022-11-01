import "../styles/globals.css";
import {
  WagmiConfig,
  createClient,
  configureChains,
  chain,
  defaultChains,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider, webSocketProvider } = configureChains(
  [chain.polygonMumbai, chain.polygon],
  [publicProvider()]
);

const client = createClient({
  autoConnect: false,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}

export default MyApp;
