"use client";

import { createConfig, http } from "wagmi";
import { WagmiConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
// Comment out the unused import
// import { injected, walletConnect } from "wagmi/connectors";
import { injected } from "wagmi/connectors";
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

// Comment out the WalletConnect connector to prevent it from being used
// Create WalletConnect connector but do not use it
/* 
const walletConnectConnector = walletConnect({
  projectId: WALLETCONNECT_PROJECT_ID,
  showQrModal: false, // Explicitly disable QR modal
  metadata: {
    name: "OneClickDeploy",
    description: "Deploy smart contracts with one click",
    url: typeof window !== 'undefined' ? window.location.origin : "https://oneclickdeploy.xyz",
    icons: [typeof window !== 'undefined' ? `${window.location.origin}/logo.png` : "https://oneclickdeploy.xyz/logo.png"]
  }
});
*/

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
      injected()
    ],
    ssr: false,
  })
);

// WalletConnectionMonitor function
const WalletConnectionMonitor = () => {
  useEffect(() => {
    // Mobil cihaz kontrolü ekle
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    console.log("Device type:", isMobile ? "Mobile" : "Desktop");
    
    const checkProviderWithRetry = async () => {
      // Provider doğrudan kullanılabilir mi?
      if (typeof window !== 'undefined' && window.ethereum) {
        return true;
      }
      
      // Mobil cihazda WalletConnect için ilave bekleme
      if (isMobile) {
        console.log("Mobile device detected, using alternative connection method");
        // WalletConnect'in bağlantı kurması için biraz bekle
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Tekrar kontrol et
        return typeof window !== 'undefined' && !!window.ethereum;
      }
      
      return false;
    };
    
    checkProviderWithRetry().then(hasProvider => {
      if (hasProvider) {
        // On page load, do not trigger network change, only check accounts
        if (window.ethereum) {
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
      } else if (isMobile) {
        console.log("Mobile connection: Using WalletConnect fallback");
        // Mobile fallback strategy
      }
    });
  }, []);

  return null;
};

// Wallet connection provider
export function WalletProvider({ children }: { children: React.ReactNode }) {
  // Add this useEffect hook to forcefully close WalletConnect modals
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Completely remove WalletConnect from the page
    localStorage.removeItem('wagmi.store');
    localStorage.removeItem('wagmi.wallet');
    localStorage.removeItem('walletconnect');
    localStorage.removeItem('wagmi.connected');
    localStorage.removeItem('connectKit');
    sessionStorage.clear();
    
    // Even more aggressive approach - override WalletConnect functions
    const disableWalletConnect = () => {
      // Try to find WalletConnect modal elements
      const wcElements = document.querySelectorAll(
        '[data-wagmi-modal], [data-connectkit-modal], .wcm-overlay, .wcm-modal, .wcm-container, ' +
        '[class*="walletconnect"], [class*="WalletConnect"], [id*="walletconnect"], [id*="WalletConnect"]'
      );
      
      if (wcElements.length > 0) {
        console.log(`Found ${wcElements.length} WalletConnect-related elements, removing...`);
        wcElements.forEach(el => {
          if (el.parentNode) {
            console.log('Removing WalletConnect element:', el);
            el.parentNode.removeChild(el);
          }
        });
        
        // Also clear modal-related styles
        document.body.style.overflow = '';
        document.body.classList.remove(
          'wcm-scroll-lock', 'ck-body-no-scroll',
          'wcm-theme-dark', 'wcm-theme-light'
        );
        document.documentElement.classList.remove(
          'wcm-scroll-lock', 'ck-html-no-scroll'
        );
      }
    };
    
    // Run immediately
    disableWalletConnect();
    
    // Run whenever DOM changes
    const observer = new MutationObserver((mutations) => {
      let shouldCheck = false;
      
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // ELEMENT_NODE
            const element = node as Element;
            if (
              element.classList.contains('wcm-overlay') ||
              element.classList.contains('wcm-modal') ||
              element.classList.contains('ck-overlay') ||
              element.hasAttribute('data-wagmi-modal') ||
              element.hasAttribute('data-connectkit-modal')
            ) {
              shouldCheck = true;
            }
          }
        });
      });
      
      if (shouldCheck) {
        console.log('WalletConnect-related DOM changes detected, cleaning up...');
        disableWalletConnect();
      }
    });
    
    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });
    
    // Also set an interval as a fallback
    const checkInterval = setInterval(disableWalletConnect, 500);
    window.modalKillerInterval = checkInterval;
    
    // Clear all on unmount
    return () => {
      observer.disconnect();
      clearInterval(checkInterval);
    };
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <ConnectKitProvider
          mode="dark"
          theme="midnight"
          options={{
            hideNoWalletCTA: true,
            hideTooltips: false,
            embedGoogleFonts: true,
            bufferPolyfill: true,
            walletConnectCTA: "both", // This won't matter since we disabled WalletConnect
            avoidLayoutShift: true,
            disableSiweRedirect: true,
            initialChainId: 0,
          }}
          customTheme={{
            "--ck-border-radius": 12,
            "--ck-overlay-backdrop-filter": "blur(8px)",
            "--ck-connectbutton-color": "#000",
            "--ck-connectbutton-background": "transparent",
            "--ck-connectbutton-box-shadow": "none",
            "--ck-qr-dot-color": "transparent", // Make QR code invisible
            "--ck-qr-background": "transparent", // Make QR background invisible
            "--ck-qr-border-color": "transparent", // No border for QR
            "--ck-body-background": "#111",
            "--ck-body-color": "#fff",
            "--ck-body-color-muted": "rgba(255, 255, 255, 0.5)",
            "--ck-body-action-color": "#4F46E5",
          }}
          key="connectkit-provider"
        >
          <script dangerouslySetInnerHTML={{ 
            __html: `
              try {
                // Clear WalletConnect session on page load
                localStorage.removeItem('walletconnect');
                localStorage.removeItem('wagmi.wallet');
                localStorage.removeItem('wagmi.connected');
                localStorage.removeItem('connectKit');
                
                // Prevent automatic wallet connection
                setTimeout(() => {
                  if (typeof window !== 'undefined' && window.ethereum) {
                    const origEthereum = window.ethereum;
                    window.ethereum = new Proxy(origEthereum, {
                      get: function(target, prop) {
                        // Intercept connect related methods
                        if (prop === 'enable' || prop === 'request') {
                          const original = target[prop];
                          return function(...args) {
                            // Only allow explicit user requests
                            if (args[0]?.method === 'eth_requestAccounts') {
                              // Allow this because it's user-initiated
                              return original.apply(target, args);
                            }
                            if (args[0]?.method === 'eth_accounts') {
                              // Return empty for auto-connection attempts
                              if (!window.userInitiatedConnection) {
                                return Promise.resolve([]);
                              }
                              return original.apply(target, args);
                            }
                            return original.apply(target, args);
                          };
                        }
                        return target[prop];
                      }
                    });
                  }
                }, 100);
              } catch(e) {
                console.error('Error preventing auto wallet connection:', e);
              }
            `
          }} />
          <WalletConnectionMonitor />
          {children}
        </ConnectKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
} 