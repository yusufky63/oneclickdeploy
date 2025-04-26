"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useConfig, useAccount, useSwitchChain } from "wagmi";
import { ethers } from "ethers";
import { chains } from "@/types/chains";
import {
  SimpleContractABI,
  SimpleContractBytecode,
} from "@/contracts/SimpleContract";
import { SimpleTokenABI, SimpleTokenBytecode } from "@/contracts/SimpleToken";
import { SimpleNFTABI, SimpleNFTBytecode } from "@/contracts/SimpleNFT";
import { DeploymentState } from "@/types/contracts";
import { Twitter, ExternalLink, Clock, BarChart } from "lucide-react";
import GridBackground from "@/components/ui/Grid-Background";
import { ConnectButton } from "@/components/common/ConnectButton";
import NetworkSelector from "@/components/common/NetworkSelector";
import NetworkSelectorButton from "@/components/common/NetworkSelectorButton";
import GlobalStyles from "../components/common/GlobalStyles";
import TransactionHistoryModal from "../components/common/TransactionHistoryModal";
import Image from "next/image";
import { incrementDeploymentCount } from "@/lib/supabase";
import DeploymentCounter from "@/components/common/DeploymentCounter";
import Link from "next/link";
import SuccessModal from "@/components/common/SuccessModal";
import TabSelector from "@/components/common/TabSelector";
import SimpleContractForm from "@/components/forms/SimpleContractForm";
import TokenContractForm from "@/components/forms/TokenContractForm";
import NFTContractForm from "@/components/forms/NFTContractForm";
import ChainInfoBar from "@/components/common/ChainInfoBar";

interface DeploymentRecord {
  chainId: number;
  chainName: string;
  contractType: string;
  contractAddress: string;
  txHash: string;
  timestamp: number;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("simple");
  const [selectedChainId, setSelectedChainId] = useState<number | null>(null);
  const [availableChains, setAvailableChains] = useState<
    Array<{
      id: number;
      name: string;
      imageUrl?: string;
    }>
  >([]);

  // Form state'lerini birleştir (Simple Contract form alanı kaldırıldı)
  const [contractFormData, setContractFormData] = useState({
    // Simple Contract form verileri
    simple: {
      name: "",
      message: "",
    },
    // Token Contract form verileri
    token: {
      name: "",
      symbol: "",
      initialSupply: "1000000",
    },
    // NFT Contract form verileri
    nft: {
      name: "",
      symbol: "",
      maxSupply: "100",
    },
  });

  // Varsayılan değerler tanımla
  const defaultValues = {
    simple: {
      name: "My Simple Contract",
      message: "Hello, Blockchain!",
    },
    token: {
      name: "OneClickDeploy Token",
      symbol: "OCDT",
      initialSupply: "1000000", // 1 milyon token
    },
    nft: {
      name: "OneClickDeploy NFT Collection",
      symbol: "OCDNFT",
      maxSupply: "100",
    },
  };

  // Varsayılan değerleri uygulama fonksiyonları
  const applyDefaultValues = (type: "simple" | "token" | "nft") => {
    setContractFormData((prev) => ({
      ...prev,
      [type]: defaultValues[type],
    }));
  };

  // Deployment State
  const [deploymentState, setDeploymentState] = useState<DeploymentState>({
    selectedChain: null,
    isDeploying: false,
    txHash: null,
    contractAddress: null,
    error: null,
  });

  // Wagmi hooks for wallet and network
  const { address, isConnected: wagmiIsConnected } = useAccount();

  // Added additional verification to ensure wallet connection status is consistent
  // WalletConnect hatası nedeniyle geçici çözüm: Adres varsa bağlı kabul et
  const walletIsConnected =
    (wagmiIsConnected || !!address) &&
    typeof window !== "undefined" &&
    !!window.ethereum;

  // Log wallet status for debugging
  useEffect(() => {
    const hasProvider = typeof window !== "undefined" && !!window.ethereum;

    console.log("Wallet connection status:", {
      wagmiIsConnected,
      address,
      walletIsConnected,
      hasProvider,
      isWindowEthereumUndefined:
        typeof window !== "undefined" && typeof window.ethereum === "undefined",
    });

    // Try to reload provider if it's not detected
    if (wagmiIsConnected && !hasProvider && typeof window !== "undefined") {
      console.log(
        "Provider not detected despite wallet being connected. Attempting to refresh connection."
      );

      // Force re-connection if provider is missing but wallet claims to be connected
      if (window.ethereum === undefined) {
        console.log(
          "window.ethereum is undefined despite connection. This may be a wallet extension issue."
        );
      }
    }
  }, [wagmiIsConnected, address, walletIsConnected]);

  const config = useConfig();
  const { switchChain } = useSwitchChain();

  // Populate available chains on component mount
  useEffect(() => {
    // Extract available chains from the chains array
    const chainOptions = chains.map((chain) => ({
      id: chain.chainId,
      name: chain.chainName,
      imageUrl: chain.imageUrl,
    }));

    setAvailableChains(chainOptions);

    // Set default chain ID from wallet if connected
    if (config?.state?.chainId) {
      setSelectedChainId(config.state.chainId);
    }
  }, [config?.state?.chainId]);

  // Clear error message when wallet connects
  useEffect(() => {
    if (
      walletIsConnected &&
      deploymentState.error === "Please connect your wallet first"
    ) {
      setDeploymentState((prev) => ({
        ...prev,
        error: null,
      }));
    }
  }, [walletIsConnected, deploymentState.error]);

  // Auto-switch network when wallet connects or changes network
  useEffect(() => {
    // Ağ otomatik değişikliği devre dışı bırakıldı
    // Kullanıcı sadece bağlandığında veya manuel ağ değişikliği yaptığında çalışacak

    // Ağ değişikliği olayını dinle ve state'i uygun şekilde güncelle
    const handleChainChangedEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ chainId: number; userInitiated?: boolean }>;
      console.log("Ağ değişikliği yakalandı:", customEvent.detail.chainId);

      // Kullanıcı tarafından başlatılan bir ağ değişikliği ise veya ilk bağlantı ise
      if (customEvent.detail.userInitiated) {
        console.log("Kullanıcı tarafından başlatılan ağ değişikliği");
        // Yeni ağ ID'sini state'e yansıt
        setSelectedChainId(customEvent.detail.chainId);

        // Geçici çözüm: Cüzdan bağlantı state'ini temizle
        // Bu, bağlantı sorunlarını önlemeye yardımcı olur
        setDeploymentState((prev) => ({
          ...prev,
          error: null,
        }));
      }
    };

    // Event listener ekle
    if (typeof window !== "undefined") {
      document.addEventListener("chainChanged", handleChainChangedEvent);

      // Cleanup
      return () => {
        document.removeEventListener("chainChanged", handleChainChangedEvent);
      };
    }
  }, []);

  // Seperate effect to handle wallet connection
  useEffect(() => {
    // Cüzdan ilk kez bağlandığında, ağı otomatik değiştirmeden cüzdan ağını seçili olarak ayarla
    if (walletIsConnected && config?.state?.chainId && !selectedChainId) {
      console.log("Cüzdan bağlı ve ağ seçili değil, cüzdan ağını kullan:", config.state.chainId);
      setSelectedChainId(config.state.chainId);
    }
  }, [walletIsConnected, config?.state?.chainId, selectedChainId]);

  // Log current configuration
  console.log("Wallet status:", {
    address,
    walletIsConnected,
    configChain: config?.state?.chainId,
    selectedChainId,
  });

  // Modal state
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Transaction history state
  const [deploymentHistory, setDeploymentHistory] = useState<
    DeploymentRecord[]
  >([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Load transaction history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("deploymentHistory");
    if (savedHistory) {
      try {
        setDeploymentHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse deployment history", e);
      }
    }
  }, []);

  // Save transaction history to localStorage when it changes
  useEffect(() => {
    if (deploymentHistory.length > 0) {
      localStorage.setItem(
        "deploymentHistory",
        JSON.stringify(deploymentHistory)
      );
    }
  }, [deploymentHistory]);

  // Function to add a new deployment to history
  const addToDeploymentHistory = (
    chainId: number,
    chainName: string,
    contractType: string,
    contractAddress: string,
    txHash: string
  ) => {
    const newRecord: DeploymentRecord = {
      chainId,
      chainName,
      contractType,
      contractAddress,
      txHash,
      timestamp: Date.now(),
    };

    setDeploymentHistory((prev) => [newRecord, ...prev].slice(0, 10)); // Keep only the last 10 deployments
  };

  // Function to copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Copied to clipboard!"))
      .catch((err) => console.error("Failed to copy: ", err));
  };

  // Function to share on Twitter with more engaging message
  const shareOnTwitter = (
    contractAddress: string,
    chainName: string,
    contractType: string
  ) => {
    // Create a more engaging message with emojis and call-to-action
    const text = `🚀 Just deployed a ${contractType} on ${chainName} in seconds using @OneClickDeployer! 
    
⚡ No coding required
💰 Low gas fees

Try it yourself at oneclickdeploy.xyz

Contract: ${contractAddress}`;

    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}`;
    window.open(url, "_blank");
  };

  // Function to open block explorer for a transaction
  const openInExplorer = (txHash: string, chainId: number) => {
    const chain = chains.find((c) => c.chainId === chainId);
    if (
      chain &&
      chain.blockExplorerUrls &&
      chain.blockExplorerUrls.length > 0
    ) {
      window.open(`${chain.blockExplorerUrls[0]}/tx/${txHash}`, "_blank");
    }
  };

  // Function to format date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const handleDeployContract = async () => {
    // Enhanced wallet connection check using all available signals
    const isWalletReady =
      walletIsConnected &&
      !!address &&
      typeof window !== "undefined" &&
      !!window.ethereum;

    if (!isWalletReady) {
      console.log("Wallet not connected or ready");
      let errorMessage = "Please connect your wallet first";

      // Check if provider is missing despite wallet claiming to be connected
      if (
        wagmiIsConnected &&
        (!window.ethereum || typeof window.ethereum === "undefined")
      ) {
        errorMessage =
          "Could not detect Ethereum provider, please refresh the page";
      }

      setDeploymentState((prev) => ({
        ...prev,
        error: errorMessage,
      }));

      // Only open connect modal if not connected at all
      if (!wagmiIsConnected && !address) {
        // Use the same approach as in NetworkSelectorButton
        if (typeof window !== "undefined") {
          // Try to access connectKit global
          if (
            window.connectKit &&
            typeof window.connectKit.openConnectModal === "function"
          ) {
            window.connectKit.openConnectModal();
          } else {
            // Fallback to clicking the connect button
            const connectKitButton = document.querySelector(
              "[data-connectkit-button]"
            );
            if (connectKitButton instanceof HTMLElement) {
              connectKitButton.click();
            }
          }
        }
      }

      // Return early to prevent network modal from opening
      return;
    }

    // Set loading state at the beginning of deployment
    setDeploymentState((prev) => ({
      ...prev,
      isDeploying: true,
      error: null,
    }));

    try {
      // Ensure ethereum provider is available and ready
      if (!window.ethereum || !window.ethereum.isConnected()) {
        console.log("Ethereum provider not available or not connected");
        setDeploymentState((prev) => ({
          ...prev,
          isDeploying: false,
          error: "Ethereum provider not available or disconnected",
        }));
        return;
      }

      const provider = new ethers.BrowserProvider(
        window.ethereum as ethers.Eip1193Provider
      );
      const signer = await provider.getSigner();
      console.log("Current signer:", signer.address);

      if (
        !selectedChainId ||
        !chains.find((c) => c.chainId === selectedChainId)
      ) {
        console.log("No valid chain selected");
        return;
      }

      console.log(
        "Selected chain:",
        chains.find((c) => c.chainId === selectedChainId)?.chainName
      );
      const currentChain = chains.find((c) => c.chainId === selectedChainId);

      if (!currentChain) {
        throw new Error(
          "Unsupported network. Please select a supported network."
        );
      }

      console.log("Target deployment chain:", currentChain.chainName);

      // Get fee information from chain
      const feeRequired = currentChain.isRequireFees || false;
      const feeAmount = currentChain.isFeeValue
        ? ethers.parseEther(currentChain.isFeeValue.toString())
        : ethers.parseEther("0.000045"); // Default 0.000045 ETH fee

      const platformAddress = "0x78672c2Eda56A8f789A4cA0CcbABCd08730d22dc";
      const deploymentValue = feeRequired ? feeAmount : ethers.parseEther("0");
      console.log(
        "Deployment value:",
        ethers.formatEther(deploymentValue),
        "ETH"
      );

      let contractFactory;
      let contract;
      let contractType;

      // Deploy the appropriate contract based on active tab
      if (activeTab === "simple") {
        console.log("Creating Simple Contract factory...");
        contractFactory = new ethers.ContractFactory(
          SimpleContractABI,
          SimpleContractBytecode,
          signer
        );

        console.log("Deploying Simple Contract with params:", {
          feeReceiver: platformAddress,
          feeRequired,
          feeAmount: ethers.formatEther(feeAmount),
        });

        contract = await contractFactory.deploy(
          platformAddress,
          feeRequired,
          feeAmount,
          { value: deploymentValue }
        );

        contractType = "Simple Contract";
      } else if (activeTab === "token") {
        console.log("Creating Token Contract factory...");
        contractFactory = new ethers.ContractFactory(
          SimpleTokenABI,
          SimpleTokenBytecode,
          signer
        );

        const initialSupply = ethers.parseUnits(
          contractFormData.token.initialSupply || "1000000",
          18
        );

        console.log("Deploying Token Contract with params:", {
          name: contractFormData.token.name || defaultValues.token.name,
          symbol: contractFormData.token.symbol || defaultValues.token.symbol,
          initialSupply:
            contractFormData.token.initialSupply ||
            defaultValues.token.initialSupply,
          feeReceiver: platformAddress,
          feeRequired,
          feeAmount: ethers.formatEther(feeAmount),
        });

        contract = await contractFactory.deploy(
          contractFormData.token.name || defaultValues.token.name,
          contractFormData.token.symbol || defaultValues.token.symbol,
          initialSupply,
          platformAddress,
          feeRequired,
          feeAmount,
          { value: deploymentValue }
        );

        contractType = "Token Contract";
      } else if (activeTab === "nft") {
        console.log("Creating NFT Contract factory...");
        contractFactory = new ethers.ContractFactory(
          SimpleNFTABI,
          SimpleNFTBytecode,
          signer
        );

        console.log("Deploying NFT Contract with params:", {
          name: contractFormData.nft.name || defaultValues.nft.name,
          symbol: contractFormData.nft.symbol || defaultValues.nft.symbol,
          maxSupply:
            contractFormData.nft.maxSupply || defaultValues.nft.maxSupply,
          feeReceiver: platformAddress,
          feeRequired,
          feeAmount: ethers.formatEther(feeAmount),
        });

        contract = await contractFactory.deploy(
          contractFormData.nft.name || defaultValues.nft.name,
          contractFormData.nft.symbol || defaultValues.nft.symbol,
          contractFormData.nft.maxSupply || defaultValues.nft.maxSupply,
          platformAddress,
          feeRequired,
          feeAmount,
          { value: deploymentValue }
        );

        contractType = "NFT Contract";
      } else {
        throw new Error("Invalid contract type selected");
      }

      console.log("Contract deployment initiated, waiting for confirmation...");
      await contract.waitForDeployment();
      console.log("Contract deployed successfully!");

      const contractAddress =
        typeof contract.target === "string"
          ? contract.target
          : contract.target.toString();
      console.log("Contract address:", contractAddress);

      const deployTx = contract.deploymentTransaction();
      const txHash = deployTx ? deployTx.hash : null;
      console.log("Transaction hash:", txHash);

      // Add to history and open success modal
      if (contractAddress && txHash) {
        addToDeploymentHistory(
          selectedChainId,
          currentChain.chainName,
          contractType,
          contractAddress,
          txHash
        );

        setDeploymentState((prev) => ({
          ...prev,
          isDeploying: false,
          txHash,
          contractAddress,
          error: null,
        }));

        // Open success modal
        setIsSuccessModalOpen(true);

        // Increment deployment count in Supabase
        incrementDeploymentCount(selectedChainId, currentChain.chainName);
      } else {
        throw new Error("Failed to get contract address or transaction hash");
      }

      console.log("Deployment completed successfully");
    } catch (error) {
      console.error("Deploy error:", error);

      // Simplify error messages for common cases
      let userFriendlyMessage = "An error occurred";

      // Check for user rejection errors
      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();

        // User rejected transaction
        if (
          errorMessage.includes("user denied") ||
          errorMessage.includes("user rejected") ||
          errorMessage.includes("rejected by user") ||
          errorMessage.includes("action_rejected") ||
          errorMessage.includes("ethers-user-denied") ||
          errorMessage.includes("code 4001")
        ) {
          userFriendlyMessage = "Transaction rejected by wallet";
        }
        // Gas fee errors
        else if (
          errorMessage.includes("insufficient funds") ||
          (errorMessage.includes("gas") && errorMessage.includes("exceed"))
        ) {
          userFriendlyMessage = "Insufficient balance or gas limit error";
        }
        // Network errors
        else if (
          errorMessage.includes("network") ||
          errorMessage.includes("connection") ||
          errorMessage.includes("disconnected")
        ) {
          userFriendlyMessage =
            "Network connection error, please check your wallet is connected to the correct network";
        }
        // Provider errors
        else if (errorMessage.includes("provider")) {
          userFriendlyMessage =
            "Wallet provider error, please reconnect your wallet";
        }
      }

      setDeploymentState((prev) => ({
        ...prev,
        isDeploying: false,
        error: userFriendlyMessage,
      }));
    }
  };

  const [networkModalOpen, setNetworkModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNetworkTab, setActiveNetworkTab] = useState("all");

  // Filter chains by search query
  const filteredChains = useMemo(() => {
    if (!searchQuery) return availableChains;
    const query = searchQuery.toLowerCase();
    return availableChains.filter((chain) =>
      chain.name.toLowerCase().includes(query)
    );
  }, [availableChains, searchQuery]);

  // Handle chain selection
  const handleChainChange = async (chainId: number) => {
    setSelectedChainId(chainId);

    // Enhanced wallet connection check
    const isWalletConnected =
      walletIsConnected && !!address && !!window.ethereum;

    // Only switch the wallet's network when explicitly requested by the user
    // through a UI interaction (like clicking a network in the dropdown)
    if (isWalletConnected) {
      try {
        console.log(`Switching wallet to chain ID: ${chainId}`);
        await switchChain({ chainId });
        console.log("Chain switched successfully");
        
        // Dispatch a custom event to indicate this was a user-initiated chain change
        if (typeof window !== 'undefined' && window.document) {
          const event = new CustomEvent('chainChanged', { 
            detail: { 
              chainId: chainId,
              userInitiated: true
            } 
          });
          window.document.dispatchEvent(event);
        }
      } catch (error) {
        console.error("Error switching chain:", error);
        // Still update the UI selection even if wallet switch fails
        // This allows users to see their selection and try again
      }
    }
  };

  return (
    <div className="dark">
      <GlobalStyles />

      <div className="min-h-screen text-gray-100 relative overflow-hidden flex items-start sm:items-center justify-center bg-gradient-to-br from-indigo-950 to-black">
        <div className="fixed inset-0 opacity-40 pointer-events-none z-0">
          <GridBackground theme="dark" />
        </div>

        <div className="fixed top-[-50%] left-[-10%] w-[80%] h-[80%] rounded-full bg-indigo-500/10 blur-3xl pointer-events-none z-0"></div>
        <div className="fixed bottom-[-50%] right-[-20%] w-[80%] h-[80%] rounded-full bg-indigo-600/5 blur-3xl pointer-events-none z-0"></div>

        <div className="w-full max-w-4xl mx-auto z-10 px-4 pt-4 sm:py-8 flex flex-col">
          <div className="flex justify-between items-center mb-4 sm:mb-8 mt-2 sm:mt-0">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="OneClick Deployer Logo"
                width={80}
                height={80}
                className="mr-2 sm:mr-3 w-16 h-16 sm:w-auto sm:h-auto"
              />
              <div className="hidden sm:block">
                <h2 className="text-xl font-bold text-white">
                  OneClick Deployer
                </h2>
                <p className="text-xs text-indigo-300">Deploy in seconds</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <DeploymentCounter />
              <button
                onClick={() => setIsHistoryOpen(true)}
                className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-indigo-500/30 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-300 hover:text-indigo-200 transition-colors"
              >
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-medium">History</span>
              </button>
              <ConnectButton />
            </div>
          </div>

          <div className="text-center mb-4 sm:mb-8">
            <h1 className="text-xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-300 mb-1 sm:mb-3">
              Blockchain Contract Deployer
            </h1>

            <p className="text-sm sm:text-lg text-indigo-200/90">
              Instantly deploy ERC20, ERC721 and custom contracts without coding
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="backdrop-blur-xl border border-indigo-500/40 rounded-xl overflow-hidden shadow-[0_10px_30px_-15px_rgba(79,70,229,0.3)] transition-all ">
              <div className="p-2 sm:p-3 md:p-5">
                <div className="relative">
                  <NetworkSelectorButton
                    selectedChainId={selectedChainId}
                    availableChains={availableChains}
                    onClick={() => {
                      // Enhanced wallet connection check
                      const hasAddress = !!address;
                      const hasProvider =
                        typeof window !== "undefined" && !!window.ethereum;
                      // WalletConnect hatası nedeniyle geçici çözüm
                      const isWalletConnected =
                        (wagmiIsConnected || hasAddress) && hasProvider;

                      console.log("Network selector wallet check:", {
                        wagmiIsConnected,
                        hasAddress,
                        hasProvider,
                        manuallyConnected: hasAddress && hasProvider,
                      });

                      if (isWalletConnected) {
                        setNetworkModalOpen(true);
                      } else {
                        // If wallet not connected, show error and prompt to connect wallet
                        const errorMessage = !wagmiIsConnected
                          ? "Please connect your wallet first"
                          : !hasAddress
                          ? "Could not detect wallet address, please reconnect"
                          : "Could not detect Ethereum provider, please refresh the page";

                        setDeploymentState((prev) => ({
                          ...prev,
                          error: errorMessage,
                        }));

                        // Try to open wallet connect modal
                        if (typeof window !== "undefined") {
                          // Attempt to access the global connectKit object if available
                          if (
                            window.connectKit &&
                            typeof window.connectKit.openConnectModal ===
                              "function"
                          ) {
                            window.connectKit.openConnectModal();
                          } else {
                            // Fallback to clicking the connect button
                            const connectKitButton = document.querySelector(
                              "[data-connectkit-button]"
                            );
                            if (connectKitButton instanceof HTMLElement) {
                              connectKitButton.click();
                            }
                          }
                        }
                      }
                    }}
                    handleChainChange={handleChainChange}
                    chains={chains}
                  />
                </div>
                
                {/* Add ChainInfoBar component to display faucet links and chain details */}
                {selectedChainId && (
                  <ChainInfoBar selectedChain={chains.find(chain => chain.chainId === selectedChainId) || null} />
                )}
              </div>
            </div>

            <div className="backdrop-blur-xl border border-indigo-500/20 rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-2 sm:p-3 md:p-4">
                <TabSelector
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />

                <div className="backdrop-blur-lg rounded-xl p-2 sm:p-3 md:p-5 border border-indigo-500/20 ">
                  {activeTab === "simple" && (
                    <SimpleContractForm onDeploy={handleDeployContract} />
                  )}

                  {activeTab === "token" && (
                    <TokenContractForm
                      name={contractFormData.token.name}
                      symbol={contractFormData.token.symbol}
                      totalSupply={contractFormData.token.initialSupply}
                      onChange={(field, value) => {
                        setContractFormData((prev) => ({
                          ...prev,
                          token: {
                            ...prev.token,
                            [field]: value,
                          },
                        }));
                      }}
                      onUseDefaultData={() => applyDefaultValues("token")}
                      defaultValues={{
                        name: defaultValues.token.name,
                        symbol: defaultValues.token.symbol,
                        totalSupply: defaultValues.token.initialSupply,
                      }}
                    />
                  )}

                  {activeTab === "nft" && (
                    <NFTContractForm
                      name={contractFormData.nft.name}
                      symbol={contractFormData.nft.symbol}
                      maxSupply={contractFormData.nft.maxSupply}
                      onChange={(field, value) => {
                        setContractFormData((prev) => ({
                          ...prev,
                          nft: {
                            ...prev.nft,
                            [field]: value,
                          },
                        }));
                      }}
                      onUseDefaultData={() => applyDefaultValues("nft")}
                      defaultValues={{
                        name: defaultValues.nft.name,
                        symbol: defaultValues.nft.symbol,
                        maxSupply: defaultValues.nft.maxSupply,
                      }}
                    />
                  )}

                  <button
                    className="w-full mt-6 py-4 rounded-md shadow-xl backdrop-blur-md font-medium text-indigo-400 bg-indigo-900/20 border border-indigo-800/40 hover:bg-indigo-800/50 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none"
                    onClick={handleDeployContract}
                    disabled={deploymentState.isDeploying}
                  >
                    {deploymentState.isDeploying ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-indigo-300 border-t-transparent rounded-full animate-spin"></div>
                        <span>Deploying...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <span>
                          {activeTab === "simple"
                            ? "Deploy Contract"
                            : activeTab === "token"
                            ? "Deploy Token"
                            : "Deploy NFT"}
                        </span>
                      </div>
                    )}
                  </button>

                  {/* Error message display */}
                  {deploymentState.error && (
                    <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                      <p className="text-red-300 text-sm text-center">
                        {deploymentState.error}
                      </p>
                      {/* WalletConnect sorunu için yardım mesajı */}
                      {deploymentState.error ===
                        "Please connect your wallet first" &&
                        address && (
                          <p className="text-red-300 text-xs text-center mt-2">
                            ⚠️ WalletConnect sorunu tespit edildi. Sayfayı
                            yenileyip tekrar deneyin veya farklı bir cüzdan
                            kullanmayı deneyin.
                          </p>
                        )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <span className="flex justify-center items-center gap-2">
              <Twitter className="w-5 h-5" />
              <a
                href="https://x.com/1ClickDeployer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-300 hover:text-indigo-200 transition-colors text-sm font-bold"
              >
                Follow us on X
              </a>
              <span className="mx-1 text-indigo-500/40">|</span>
              <Link
                href="/deployment-stats"
                className="flex items-center gap-1 text-indigo-300 hover:text-indigo-200 transition-colors text-sm font-bold"
              >
                <BarChart className="w-4 h-4" />
                <span>View Stats</span>
              </Link>
              <span className="mx-1 text-indigo-500/40">|</span>
              <Link
                href="/how-it-works"
                className="flex items-center gap-1 text-indigo-300 hover:text-indigo-200 transition-colors text-sm font-bold"
              >
                <ExternalLink className="w-4 h-4" />
                <span>How it Works</span>
              </Link>
            </span>
          </div>
        </div>
      </div>

      <NetworkSelector
        isOpen={networkModalOpen}
        onClose={() => setNetworkModalOpen(false)}
        selectedChainId={selectedChainId}
        filteredChains={filteredChains}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeNetworkTab={activeNetworkTab}
        setActiveNetworkTab={setActiveNetworkTab}
        handleChainChange={handleChainChange}
        chains={chains}
      />

      {/* Success Modal Component */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        contractAddress={deploymentState.contractAddress || ""}
        txHash={deploymentState.txHash}
        contractType={
          activeTab === "simple"
            ? "Simple Contract"
            : activeTab === "token"
            ? "Token Contract"
            : "NFT Contract"
        }
        chainName={
          chains.find(
            (c) => c.chainId === (selectedChainId || config.state.chainId)
          )?.chainName || "blockchain"
        }
        chainId={selectedChainId || config.state.chainId || 1}
        copyToClipboard={copyToClipboard}
        openInExplorer={openInExplorer}
        shareOnTwitter={shareOnTwitter}
      />

      {/* Replace the Transaction History Modal with the imported component */}
      <TransactionHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        deploymentHistory={deploymentHistory}
        copyToClipboard={copyToClipboard}
        openInExplorer={openInExplorer}
        formatDate={formatDate}
      />
    </div>
  );
}
