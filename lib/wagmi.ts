import { createConfig, http } from "wagmi";
import { defineChain } from "viem";

export const arcTestnet = defineChain({
  id: 1313161555,
  name: "ARC Testnet",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.archetypenet.io"] },
  },
  blockExplorers: {
    default: { name: "ARC Explorer", url: "https://explorer.archetypenet.io" },
  },
  testnet: true,
});

export const config = createConfig({
  chains: [arcTestnet],
  transports: {
    [arcTestnet.id]: http(),
  },
});
