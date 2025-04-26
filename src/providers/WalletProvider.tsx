"use client";

import { createConfig, http } from "wagmi";
import { WagmiConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { injected, walletConnect } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { chains as supportedChains, Chain } from "@/types/chains";
import { Chain as WagmiChain, mainnet } from "wagmi/chains";
import { useEffect } from "react";

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  }
});

// WalletConnect Project ID - Update with your project ID from WalletConnect Cloud
const WALLETCONNECT_PROJECT_ID = "ef0a0f6a5822f8ead6d4e9f06a16ead2";

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

// Create WalletConnect connector
const walletConnectConnector = walletConnect({
  projectId: WALLETCONNECT_PROJECT_ID,
  showQrModal: true,
  metadata: {
    name: "OneClickDeploy",
    description: "Deploy smart contracts with one click",
    url: typeof window !== 'undefined' ? window.location.origin : "https://oneclickdeploy.xyz",
    icons: [typeof window !== 'undefined' ? `${window.location.origin}/logo.png` : "https://oneclickdeploy.xyz/logo.png"]
  }
});

// Configure Wagmi with ConnectKit
const config = createConfig(
  getDefaultConfig({
    appName: "OneClickDeploy",
    walletConnectProjectId: WALLETCONNECT_PROJECT_ID,
    chains: wagmiChains,
    transports: Object.fromEntries(
      wagmiChains.map((chain) => [chain.id, http()])
    ),
    connectors: [
      injected(),
      walletConnectConnector
    ],
    ssr: false,
  })
);

// This component monitors wallet connection status and syncs it
const WalletConnectionMonitor = () => {
  useEffect(() => {
    // On page load, do not trigger network change, only check accounts
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: unknown) => {
          console.log("Initial accounts check:", accounts);
          const accountsArray = accounts as string[];
          if (accountsArray.length === 0) {
            console.log("No accounts connected, clearing any previous connection states");
            // You can clear localStorage or cached connection state here if needed
          } else {
            console.log("User already connected, but not triggering network change");
          }
        })
        .catch((error: unknown) => {
          console.error("Error checking initial accounts:", error);
        });
    }

    // Monitor ethereum provider events
    const handleAccountsChanged = (accounts: unknown) => {
      console.log("Accounts changed:", accounts);
      const accountsArray = accounts as string[];
      // Only trigger disconnect event if all accounts are removed
      if (accountsArray.length === 0) {
        console.log("All accounts disconnected, refreshing page state");
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('wallet-disconnected'));
        }
      } else {
        console.log("Account connected:", accountsArray[0]);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('wallet-connected', { 
            detail: { account: accountsArray[0] } 
          }));
        }
      }
    };

    const handleChainChanged = (chainId: string) => {
      console.log("Chain changed to:", chainId);
      // Do not reload the page, just log and dispatch a custom event
      // Wagmi and ConnectKit will handle the change automatically
      console.log("Network change detected, new chain ID:", parseInt(chainId, 16));
      if (typeof window !== 'undefined' && window.document) {
        const event = new CustomEvent('chainChanged', { 
          detail: { 
            chainId: parseInt(chainId, 16),
            userInitiated: true
          } 
        });
        window.document.dispatchEvent(event);
      }
    };

    // Check if ethereum provider actually exists and is functional
    const isEthereumProviderWorking = async (): Promise<boolean> => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          console.log("Ethereum provider check - accounts:", accounts);
          return true;
        } catch (error) {
          console.error("Ethereum provider is not working correctly:", error);
          return false;
        }
      }
      return false;
    };

    // Only add event listeners if provider is working
    if (typeof window !== 'undefined' && window.ethereum) {
      // Add event listeners
      ((window.ethereum as unknown) as {
        on: (event: 'accountsChanged', listener: (accounts: string[]) => void) => void;
      }).on('accountsChanged', handleAccountsChanged);
      
      ((window.ethereum as unknown) as {
        on: (event: 'chainChanged', listener: (chainId: string) => void) => void;
      }).on('chainChanged', handleChainChanged);
      
      // Initial provider check
      isEthereumProviderWorking().then((working) => {
        if (!working) {
          console.warn("Ethereum provider is not working correctly. Wallet connection may fail.");
          try {
            // Clear cached wallet connection data
            localStorage.removeItem('wagmi.store');
            localStorage.removeItem('wagmi.wallet');
            localStorage.removeItem('walletconnect');
            localStorage.removeItem('wagmi.connected');
            localStorage.removeItem('connectKit');
            console.log("Wallet connection cache cleared");
          } catch (e) {
            console.error("Failed to clear wallet connection cache:", e);
          }
        }
      });
      
      return () => {
        // Cleanup listeners with similar specific types
        if (window.ethereum) {
          ((window.ethereum as unknown) as {
            removeListener: (event: 'accountsChanged', listener: (accounts: string[]) => void) => void;
          }).removeListener('accountsChanged', handleAccountsChanged);
          
          ((window.ethereum as unknown) as {
            removeListener: (event: 'chainChanged', listener: (chainId: string) => void) => void;
          }).removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, []);

  return null;
};

// Wallet connection provider
export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <ConnectKitProvider
          mode="dark"
          theme="midnight"
          options={{
            hideNoWalletCTA: false,
            hideTooltips: false,
            embedGoogleFonts: true,
            bufferPolyfill: true,
            walletConnectCTA: "both",
            avoidLayoutShift: true,
            disableSiweRedirect: true,
          }}
          customTheme={{
            "--ck-border-radius": 12,
            "--ck-overlay-backdrop-filter": "blur(8px)",
          }}
          key="connectkit-provider"
        >
          <WalletConnectionMonitor />
          {children}
        </ConnectKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
} 