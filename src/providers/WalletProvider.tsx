"use client";

import { createConfig, http } from "wagmi";
import { WagmiConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { injected } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { chains as supportedChains, Chain } from "@/types/chains";
import { Chain as WagmiChain, mainnet } from "wagmi/chains";

// React Query için client oluşturma
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  }
});

// Sabit WalletConnect Project ID (test için)
const WALLETCONNECT_PROJECT_ID = "c2b4ff7ce76613f93a7edea73a920703";

// Convert our chains format to Wagmi chain format
const convertToWagmiChains = () => {
  return supportedChains
    .filter((chain: Chain) => chain.enabled)
    .map((chain: Chain) => ({
      id: chain.chainId,
      name: chain.chainName,
      network: chain.chainName.toLowerCase().replace(/\s+/g, ''),
      nativeCurrency: {
        name: chain.nativeCurrency.name || chain.nativeCurrency.symbol,
        symbol: chain.nativeCurrency.symbol,
        decimals: chain.nativeCurrency.decimals
      },
      rpcUrls: {
        default: {
          http: [chain.rpcUrls[0]]
        },
        public: {
          http: [chain.rpcUrls[0]]
        }
      },
      blockExplorers: chain.blockExplorerUrls && chain.blockExplorerUrls.length > 0
        ? {
            default: {
              name: "Explorer",
              url: chain.blockExplorerUrls[0]
            }
          }
        : undefined
    } as WagmiChain));
};

// Get chains from our chains.ts file and ensure it has the correct format for wagmi
const convertedChains = convertToWagmiChains();
// We need at least one chain as the first element, using mainnet as fallback if no chains
const wagmiChains = convertedChains.length > 0 
  ? [convertedChains[0], ...convertedChains.slice(1)] as [WagmiChain, ...WagmiChain[]] 
  : [mainnet] as [typeof mainnet];

// Basitleştirilmiş Wagmi yapılandırması
const config = createConfig(
  getDefaultConfig({
    appName: "OneClickDeploy",
    walletConnectProjectId: WALLETCONNECT_PROJECT_ID,
    chains: wagmiChains,
    transports: Object.fromEntries(
      wagmiChains.map((chain) => [chain.id, http()])
    ),
    connectors: [
      injected()
    ],
    ssr: false,
  })
);

// Cüzdan bağlantı sağlayıcısı
export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <ConnectKitProvider
          mode="dark"
          options={{
            hideNoWalletCTA: false,
            hideTooltips: false,
            embedGoogleFonts: true,
            bufferPolyfill: true,
            walletConnectCTA: "both",
          }}
          
        >
          {children}
        </ConnectKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
} 