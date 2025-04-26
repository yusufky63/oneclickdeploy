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
import { Check, Twitter, Copy, ExternalLink, Clock, X, BarChart } from "lucide-react";
import GridBackground from "@/components/common/Grid-Background";
import { ConnectButton } from "@/components/common/ConnectButton";
import NetworkSelector from "@/components/common/NetworkSelector";
import NetworkSelectorButton from "@/components/common/NetworkSelectorButton";
import GlobalStyles from "../components/common/GlobalStyles";
import TransactionHistoryModal from "../components/common/TransactionHistoryModal";
import Image from "next/image";
import { incrementDeploymentCount } from "@/lib/supabase";
import DeploymentCounter from "@/components/common/DeploymentCounter";
import Link from "next/link";

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

  // Simple Contract Form Data
  const [simpleContractFormData, setSimpleContractFormData] = useState({
    name: "",
    symbol: "",
  });

  // Token Contract Form Data
  const [tokenContractFormData, setTokenContractFormData] = useState({
    name: "",
    symbol: "",
    initialSupply: "1000000",
  });

  // NFT Contract Form Data
  const [nftContractFormData, setNftContractFormData] = useState({
    name: "",
    symbol: "",
    baseURI: "https://api.example.com/metadata/",
  });

  // Varsayılan değerler tanımla
  const defaultValues = {
    simple: {
      name: "Simple Demo Contract",
      symbol: "SDC",
    },
    token: {
      name: "My Token",
      symbol: "MTK",
      initialSupply: "1000000", // 1 milyon token
    },
    nft: {
      name: "My NFT Collection",
      symbol: "MNFT",
      baseURI: "https://api.example.com/metadata/",
    },
  };

  // Varsayılan değerleri uygulama fonksiyonları
  const useSimpleContractDefaults = () => {
    setSimpleContractFormData(defaultValues.simple);
  };

  const useTokenContractDefaults = () => {
    setTokenContractFormData(defaultValues.token);
  };

  const useNFTContractDefaults = () => {
    setNftContractFormData(defaultValues.nft);
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
  const { address, isConnected: walletIsConnected } = useAccount();

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

  // Handle chain selection
  const handleChainChange = async (chainId: number) => {
    setSelectedChainId(chainId);

    // Always try to switch the wallet's network to match the selected chain
    if (walletIsConnected) {
      try {
        console.log(`Switching wallet to chain ID: ${chainId}`);
        await switchChain({ chainId });
        console.log("Chain switched successfully");
      } catch (error) {
        console.error("Error switching chain:", error);
        // Still update the UI selection even if wallet switch fails
        // This allows users to see their selection and try again
      }
    }
  };

  // Auto-switch network when wallet connects or changes network
  useEffect(() => {
    // If we have a selected chain and the wallet is connected but on a different chain
    if (
      selectedChainId &&
      walletIsConnected &&
      config?.state?.chainId !== selectedChainId
    ) {
      handleChainChange(selectedChainId);
    } else if (
      walletIsConnected &&
      config?.state?.chainId &&
      !selectedChainId
    ) {
      // If wallet is connected but no chain is selected, use the wallet's chain
      setSelectedChainId(config.state.chainId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletIsConnected, config?.state?.chainId, selectedChainId, switchChain]);

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
    // Shorten the contract address for better readability
    const shortAddress = `${contractAddress.slice(
      0,
      6
    )}...${contractAddress.slice(-4)}`;

    // Create a more engaging message with emojis and call-to-action
    const text = `🚀 Just deployed a ${contractType} on ${chainName} in seconds using @OneClickDeployer! 
    
⚡ No coding required
💰 Low gas fees

Try it yourself at oneclickdeploy.xyz

Contract: ${shortAddress}`;

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
    try {
      if (!walletIsConnected) {
        console.log("Wallet not connected");
        // Set an error in deployment state to show in UI
      setDeploymentState((prev) => ({
        ...prev,
          error: "Please connect your wallet first",
        }));

        // Find and click the ConnectButton
        setTimeout(() => {
          // Try to find the ConnectKitButton
          const connectKitButton = document.querySelector(
            "[data-connectkit-button]"
          );
          if (connectKitButton instanceof HTMLElement) {
            connectKitButton.click();
            console.log("ConnectKit button clicked");
          } else {
            // Try various other selectors as fallbacks
            const buttonSelectors = [
              "button[variant='ghost']",
              ".flex.items-center.gap-2.text-indigo-400",
              "button:has(svg.w-4.h-4)",
              "button",
            ];

            for (const selector of buttonSelectors) {
              try {
                const button = document.querySelector(selector);
                if (button instanceof HTMLElement) {
                  button.click();
                  console.log(
                    `Found and clicked button with selector: ${selector}`
                  );
                  break;
                }
              } catch (e) {
                console.log(`Error with selector ${selector}:`, e);
              }
            }
          }
        }, 100);
      return;
    }

      // Set loading state at the beginning of deployment
      setDeploymentState((prev) => ({
        ...prev,
        isDeploying: true,
        error: null,
      }));

      // Properly type the ethereum object
      if (!window.ethereum) {
        console.log("Ethereum provider not available");
      setDeploymentState((prev) => ({
        ...prev,
        isDeploying: false,
          error: "Ethereum provider not available",
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

      const platformAddress = "0xEAa823AB4C4eE00283d8ed7be713ddf8A5ba0Fac";
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
          tokenContractFormData.initialSupply || "1000000",
          18
        );

        console.log("Deploying Token Contract with params:", {
          name: tokenContractFormData.name || defaultValues.token.name,
          symbol: tokenContractFormData.symbol || defaultValues.token.symbol,
          initialSupply:
            tokenContractFormData.initialSupply ||
            defaultValues.token.initialSupply,
          feeReceiver: platformAddress,
          feeRequired,
          feeAmount: ethers.formatEther(feeAmount),
        });

        contract = await contractFactory.deploy(
          tokenContractFormData.name || defaultValues.token.name,
          tokenContractFormData.symbol || defaultValues.token.symbol,
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
          name: nftContractFormData.name || defaultValues.nft.name,
          symbol: nftContractFormData.symbol || defaultValues.nft.symbol,
          baseURI: nftContractFormData.baseURI || defaultValues.nft.baseURI,
          maxSupply: "10000", // Default max supply
          feeReceiver: platformAddress,
          feeRequired,
          feeAmount: ethers.formatEther(feeAmount),
        });

        contract = await contractFactory.deploy(
          nftContractFormData.name || defaultValues.nft.name,
          nftContractFormData.symbol || defaultValues.nft.symbol,
          nftContractFormData.baseURI || defaultValues.nft.baseURI,
          "10000", // Max supply
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
      setDeploymentState((prev) => ({
        ...prev,
        isDeploying: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
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
                    onClick={() => setNetworkModalOpen(true)}
                    handleChainChange={handleChainChange}
                    chains={chains}
                            />
                          </div>
                  </div>
            </div>

            <div className="backdrop-blur-xl border border-indigo-500/20 rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-2 sm:p-3 md:p-4">
                <div className="overflow-hidden rounded-xl shadow-xl border border-indigo-500/30 mb-3 sm:mb-4 md:mb-6 backdrop-blur-md">
              <div className="grid grid-cols-3 relative">
                <button
                  onClick={() => setActiveTab("simple")}
                      className={`py-1.5 sm:py-2 md:py-4 px-1 sm:px-2 md:px-4 text-xs sm:text-sm md:text-base font-semibold transition-colors ${
                    activeTab === "simple"
                          ? "text-white bg-indigo-500/30 backdrop-blur-md"
                          : "text-indigo-300 hover:bg-indigo-600/20"
                  }`}
                >
                  Simple Contract
                </button>
                <button
                  onClick={() => setActiveTab("token")}
                      className={`py-1.5 sm:py-2 md:py-4 px-1 sm:px-2 md:px-4 text-xs sm:text-sm md:text-base font-semibold transition-colors ${
                    activeTab === "token"
                          ? "text-white bg-indigo-500/30 backdrop-blur-md"
                          : "text-indigo-300 hover:bg-indigo-600/20"
                  }`}
                >
                  Token Contract
                </button>
                <button
                  onClick={() => setActiveTab("nft")}
                      className={`py-1.5 sm:py-2 md:py-4 px-1 sm:px-2 md:px-4 text-xs sm:text-sm md:text-base font-semibold transition-colors ${
                    activeTab === "nft"
                          ? "text-white bg-indigo-500/30 backdrop-blur-md"
                          : "text-indigo-300 hover:bg-indigo-600/20"
                  }`}
                >
                  NFT Contract
                </button>
              </div>
            </div>

                <div className="backdrop-blur-lg rounded-xl p-2 sm:p-3 md:p-5 border border-indigo-500/20 ">
              {activeTab === "simple" && (
                <div>
                      <div className="flex justify-between items-center mb-3 sm:mb-4">
                        <h2 className="text-base sm:text-lg font-medium text-gray-300">
                    Simple Contract
                  </h2>
                        <button
                          onClick={useSimpleContractDefaults}
                          className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 rounded border border-indigo-600/30"
                        >
                          Use Default Data
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-300/80 mb-3 sm:mb-4">
                        Deploy a basic smart contract with a custom name.
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="simple-name"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Contract Name
                      </label>
                      <input
                        id="simple-name"
                        type="text"
                            placeholder={defaultValues.simple.name}
                        value={simpleContractFormData.name}
                        onChange={(e) =>
                          setSimpleContractFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                            className="w-full px-3 py-2 text-gray-300 backdrop-blur-sm border border-indigo-600/20 rounded-md focus:outline-none focus:border-indigo-600/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                            htmlFor="simple-symbol"
                        className="block text-sm font-medium text-gray-300"
                      >
                            Contract Symbol
                      </label>
                      <input
                            id="simple-symbol"
                        type="text"
                            placeholder={defaultValues.simple.symbol}
                            value={simpleContractFormData.symbol}
                        onChange={(e) =>
                          setSimpleContractFormData((prev) => ({
                            ...prev,
                                symbol: e.target.value,
                          }))
                        }
                            className="w-full px-3 py-2 text-gray-300 backdrop-blur-sm border border-indigo-600/20 rounded-md focus:outline-none focus:border-indigo-600/50"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "token" && (
                <div>
                      <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium mb-1 text-gray-300">
                    Token Contract
                  </h2>
                        <button
                          onClick={useTokenContractDefaults}
                          className="text-xs px-2 py-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 rounded border border-indigo-600/30"
                        >
                          Use Default Data
                        </button>
                      </div>
                  <p className="text-sm text-gray-300/80 mb-4">
                        Deploy an ERC-20 token with custom name, symbol and
                        supply.
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="token-name"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Token Name
                      </label>
                      <input
                        id="token-name"
                        type="text"
                            placeholder={defaultValues.token.name}
                        value={tokenContractFormData.name}
                        onChange={(e) =>
                          setTokenContractFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                            className="w-full px-3 py-2 text-gray-300 backdrop-blur-sm border border-indigo-600/20 rounded-md focus:outline-none focus:border-indigo-600/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="token-symbol"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Token Symbol
                      </label>
                      <input
                        id="token-symbol"
                        type="text"
                            placeholder={defaultValues.token.symbol}
                        value={tokenContractFormData.symbol}
                        onChange={(e) =>
                          setTokenContractFormData((prev) => ({
                            ...prev,
                            symbol: e.target.value,
                          }))
                        }
                            className="w-full px-3 py-2 text-gray-300 backdrop-blur-sm border border-indigo-600/20 rounded-md focus:outline-none focus:border-indigo-600/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="token-supply"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Initial Supply
                      </label>
                      <input
                        id="token-supply"
                        type="text"
                            placeholder={defaultValues.token.initialSupply}
                        value={tokenContractFormData.initialSupply}
                        onChange={(e) =>
                          setTokenContractFormData((prev) => ({
                            ...prev,
                            initialSupply: e.target.value,
                          }))
                        }
                            className="w-full px-3 py-2 text-gray-300 backdrop-blur-sm border border-indigo-600/20 rounded-md focus:outline-none focus:border-indigo-600/50"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "nft" && (
                <div>
                      <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium mb-1 text-gray-300">
                    NFT Contract
                  </h2>
                        <button
                          onClick={useNFTContractDefaults}
                          className="text-xs px-2 py-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 rounded border border-indigo-600/30"
                        >
                          Use Default Data
                        </button>
                      </div>
                  <p className="text-sm text-gray-300/80 mb-4">
                    Deploy an ERC-721 NFT collection with custom properties.
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="nft-name"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Collection Name
                      </label>
                      <input
                        id="nft-name"
                        type="text"
                            placeholder={defaultValues.nft.name}
                        value={nftContractFormData.name}
                        onChange={(e) =>
                          setNftContractFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                            className="w-full px-3 py-2 text-gray-300 backdrop-blur-sm border border-indigo-600/20 rounded-md focus:outline-none focus:border-indigo-600/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="nft-symbol"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Collection Symbol
                      </label>
                      <input
                        id="nft-symbol"
                        type="text"
                            placeholder={defaultValues.nft.symbol}
                        value={nftContractFormData.symbol}
                        onChange={(e) =>
                          setNftContractFormData((prev) => ({
                            ...prev,
                            symbol: e.target.value,
                          }))
                        }
                            className="w-full px-3 py-2 text-gray-300 backdrop-blur-sm border border-indigo-600/20 rounded-md focus:outline-none focus:border-indigo-600/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="nft-baseuri"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Base URI
                      </label>
                      <input
                        id="nft-baseuri"
                        type="text"
                            placeholder={defaultValues.nft.baseURI}
                        value={nftContractFormData.baseURI}
                        onChange={(e) =>
                          setNftContractFormData((prev) => ({
                            ...prev,
                            baseURI: e.target.value,
                          }))
                        }
                            className="w-full px-3 py-2 text-white backdrop-blur-sm border border-indigo-600/20 rounded-md focus:outline-none focus:border-indigo-600/50"
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                    className="w-full mt-6 py-4 px-4 rounded-xl font-semibold text-sm sm:text-base text-white backdrop-blur-md border border-indigo-500/40 shadow-[0_4px_20px_rgba(79,70,229,0.15)] bg-gradient-to-r from-indigo-500/20 to-indigo-600/20 hover:from-indigo-500/30 hover:to-indigo-600/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    onClick={handleDeployContract}
                disabled={deploymentState.isDeploying}
              >
                    {deploymentState.isDeploying ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Deploying...</span>
                      </div>
                    ) : (
                      `Deploy ${
                      activeTab === "simple"
                        ? "Simple Contract"
                        : activeTab === "token"
                        ? "Token Contract"
                        : "NFT Contract"
                      }`
                    )}
              </button>

                  {/* Error message display */}
                  {deploymentState.error && (
                    <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                      <p className="text-red-300 text-sm text-center">
                        {deploymentState.error}
                      </p>
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
              <Link href="/deployment-stats" className="flex items-center gap-1 text-indigo-300 hover:text-indigo-200 transition-colors text-sm font-bold">
                <BarChart className="w-4 h-4" />
                <span>View Stats</span>
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

      {/* Success Modal - More modern and transparent */}
      {isSuccessModalOpen && deploymentState.contractAddress && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-indigo-950/60 to-black/60 backdrop-blur-xl border border-indigo-500/30 rounded-2xl shadow-[0_10px_50px_rgba(99,102,241,0.15)] w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-indigo-300" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Deployment Successful!
              </h3>
              <p className="text-indigo-200/90 text-center mt-2">
                Your contract has been successfully deployed to the blockchain
            </p>
          </div>

            <div className="space-y-4">
              <div className="bg-indigo-900/20 backdrop-blur-md p-3 rounded-lg border border-indigo-500/20">
                <p className="text-xs text-indigo-300/80 mb-1">
                  Contract Address
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-indigo-100 truncate mr-2">
                    {deploymentState.contractAddress}
                  </p>
                  <button
                    onClick={() =>
                      copyToClipboard(deploymentState.contractAddress!)
                    }
                    className="text-indigo-300 hover:text-indigo-200 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
        </div>
      </div>

              {deploymentState.txHash && (
                <div className="bg-indigo-900/20 backdrop-blur-md p-3 rounded-lg border border-indigo-500/20">
                  <p className="text-xs text-indigo-300/80 mb-1">
                    Transaction Hash
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-indigo-100 truncate mr-2">
                      {deploymentState.txHash}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard(deploymentState.txHash!)}
                        className="text-indigo-300 hover:text-indigo-200 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          const chainId =
                            selectedChainId || config.state.chainId;
                          if (chainId && deploymentState.txHash) {
                            openInExplorer(deploymentState.txHash, chainId);
                          }
                        }}
                        className="text-indigo-300 hover:text-indigo-200 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-indigo-500/20 mt-2">
                <p className="text-sm text-center text-indigo-300/80 mb-3">
                  Share your deployment
                </p>
                <button
                  onClick={() => {
                    const chainName =
                      chains.find(
                        (c) =>
                          c.chainId ===
                          (selectedChainId || config.state.chainId)
                      )?.chainName || "blockchain";
                    const contractType =
                      activeTab === "simple"
                        ? "Simple Contract"
                        : activeTab === "token"
                        ? "Token Contract"
                        : "NFT Contract";

                    shareOnTwitter(
                      deploymentState.contractAddress!,
                      chainName,
                      contractType
                    );
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#1DA1F2]/90 hover:bg-[#1a94e0] text-white rounded-lg font-medium transition-colors backdrop-blur-sm"
                >
                  <Twitter className="w-5 h-5" />
                  Share on Twitter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
