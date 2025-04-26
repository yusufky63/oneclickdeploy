import React, { useState } from 'react';
import { Check, Search, X } from 'lucide-react';
import Image from 'next/image';
import ChainInfoLinks from './ChainInfoLinks';
import { Chain } from '@/types/chains';

interface ChainData {
  id: number;
  name: string;
  imageUrl?: string;
  chainId?: number;
}

interface ChainInfo {
  chainId: number;
  isPopular?: boolean;
  isSuperchain?: boolean;
  isMainnet?: boolean;
  [key: string]: unknown;
}

interface NetworkSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedChainId: number | null;
  filteredChains: Array<ChainData>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeNetworkTab: string;
  setActiveNetworkTab: (tab: string) => void;
  handleChainChange: (chainId: number) => void;
  chains: ChainInfo[]; // Replaced any[] with ChainInfo[]
}

const NetworkSelector: React.FC<NetworkSelectorProps> = ({
  isOpen,
  onClose,
  selectedChainId,
  filteredChains,
  searchQuery,
  setSearchQuery,
  activeNetworkTab,
  setActiveNetworkTab,
  handleChainChange,
  chains
}) => {
  const [selectedChainForInfo, setSelectedChainForInfo] = useState<Chain | null>(null);

  if (!isOpen) return null;

  const handleNetworkSelect = (chainId: number) => {
    handleChainChange(chainId);
    onClose();
    setSearchQuery("");
  };

  const handleNetworkInfo = (e: React.MouseEvent, chain: ChainData) => {
    e.stopPropagation();
    // Find the full chain object with links
    const fullChainInfo = chains.find(c => c.chainId === chain.id) as unknown as Chain;
    setSelectedChainForInfo(fullChainInfo || null);
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-lg flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-6xl bg-indigo-950/40 backdrop-blur-xl border border-indigo-600/30 rounded-xl shadow-2xl"
        style={{
          animation: 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          transformOrigin: 'center',
          maxHeight: '85vh',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-2 sm:p-3 md:p-5 border-b border-indigo-600/30">
          <h3 className="text-base sm:text-lg md:text-xl font-medium text-white">
            {selectedChainForInfo ? 
              `${selectedChainForInfo.chainName} Information` : 
              'Network Selector'}
          </h3>
          <button
            onClick={() => {
              if (selectedChainForInfo) {
                setSelectedChainForInfo(null);
              } else {
                onClose();
              }
            }}
            className="p-1 sm:p-1.5 rounded-full hover:bg-indigo-800/50 text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {selectedChainForInfo ? (
          <div className="p-4 sm:p-6">
            <div className="flex items-center mb-4">
              <div className="mr-3 relative">
                {selectedChainForInfo.imageUrl ? (
                  <>
                    <div className="absolute -inset-1 bg-indigo-500/20 blur-sm rounded-full"></div>
                    <Image
                      src={selectedChainForInfo.imageUrl}
                      alt={selectedChainForInfo.chainName}
                      width={40}
                      height={40}
                      className="relative rounded-full border border-indigo-500/30"
                    />
                  </>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-indigo-700/50 flex items-center justify-center border border-indigo-500/30">
                    <span className="text-lg text-white">{selectedChainForInfo.chainName.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">{selectedChainForInfo.chainName}</h3>
                <p className="text-sm text-indigo-300">Chain ID: {selectedChainForInfo.chainId}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg border border-indigo-600/20 bg-indigo-900/20">
                  <h4 className="text-sm font-medium text-indigo-300 mb-2">Native Currency</h4>
                  <p className="text-sm text-white">
                    {selectedChainForInfo.nativeCurrency.name || selectedChainForInfo.nativeCurrency.symbol} ({selectedChainForInfo.nativeCurrency.symbol})
                  </p>
                  <p className="text-xs text-indigo-400 mt-1">
                    Decimals: {selectedChainForInfo.nativeCurrency.decimals}
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-indigo-600/20 bg-indigo-900/20">
                  <h4 className="text-sm font-medium text-indigo-300 mb-2">Network Type</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedChainForInfo.isMainnet ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-800/30 text-green-400 border border-green-700/30">
                        Mainnet
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-800/30 text-blue-400 border border-blue-700/30">
                        Testnet
                      </span>
                    )}
                    
                    {selectedChainForInfo.isSuperchain && (
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-800/30 text-purple-400 border border-purple-700/30">
                        Superchain
                      </span>
                    )}
                    
                    {selectedChainForInfo.isPopular && (
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-800/30 text-yellow-400 border border-yellow-700/30">
                        Popular
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-indigo-600/20 bg-indigo-900/20">
                <h4 className="text-sm font-medium text-indigo-300 mb-2">RPC Endpoints</h4>
                <div className="space-y-1 text-xs">
                  {selectedChainForInfo.rpcUrls.map((url, index) => (
                    <div key={index} className="text-indigo-300 break-all">
                      {url}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg border border-indigo-600/20 bg-indigo-900/20">
                <h4 className="text-sm font-medium text-indigo-300 mb-2">Block Explorer</h4>
                <div className="space-y-1">
                  {selectedChainForInfo.blockExplorerUrls.map((url, index) => (
                    <a 
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 text-xs flex items-center"
                    >
                      <span className="break-all">{url}</span>
                      <X className="w-3 h-3 ml-1 rotate-45" />
                    </a>
                  ))}
                </div>
              </div>

              <ChainInfoLinks chain={selectedChainForInfo} />

              <button
                onClick={() => handleNetworkSelect(selectedChainForInfo.chainId)}
                className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                Select This Network
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Search */}
            <div className="p-2 sm:p-3 md:p-4 border-b border-indigo-600/30">
              <div className="relative">
                <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 h-3 w-3 sm:h-4 sm:w-4" />
                <input
                  type="text"
                  placeholder="Search network..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 md:py-3 bg-indigo-900/30 text-white rounded-lg border border-indigo-500/50 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/50 placeholder-indigo-300/60 text-xs sm:text-sm"
                  autoFocus
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-indigo-600/30 overflow-x-auto custom-scrollbar-x">
              {["All", "Popular", "Superchain", "Mainnet", "Testnet"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveNetworkTab(tab.toLowerCase())}
                  className={`min-w-[60px] sm:min-w-[80px] flex-1 py-1 sm:py-2 md:py-3 text-[10px] sm:text-xs md:text-sm font-medium transition-colors border-b-2 ${
                    activeNetworkTab === tab.toLowerCase()
                      ? "text-indigo-300 border-indigo-400"
                      : "text-gray-400 border-transparent hover:text-indigo-300 hover:border-indigo-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Network lists */}
            <div className="overflow-y-auto custom-scrollbar" style={{ maxHeight: 'calc(85vh - 180px)' }}>
              {/* Popular Networks Section */}
              {(activeNetworkTab === "all" || activeNetworkTab === "popular") && (
                <div className="p-2 sm:p-3 md:p-4">
                  <div className="flex items-center mb-1 sm:mb-2 md:mb-3">
                    <span className="text-[10px] xs:text-xs sm:text-sm font-medium text-indigo-300">📌 Popular Networks</span>
                  </div>
                  <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                    {filteredChains
                      .filter(chain => {
                        const foundChain = chains.find(c => c.chainId === chain.id);
                        return foundChain && 
                          foundChain.isPopular && 
                          (searchQuery ? chain.name.toLowerCase().includes(searchQuery.toLowerCase()) : true);
                      })
                      .map((chain) => (
                        <button
                          key={chain.id}
                          onClick={() => handleNetworkSelect(chain.id)}
                          className={`flex items-center p-2 sm:p-3 md:p-4 rounded-lg transition-all border ${
                            selectedChainId === chain.id 
                              ? "bg-indigo-600/20 border-indigo-500/50 shadow-lg shadow-indigo-500/10" 
                              : "hover:bg-indigo-800/30 border-indigo-700/30 hover:border-indigo-600/50"
                          }`}
                        >
                          <div className="flex-shrink-0 mr-2 sm:mr-3 relative">
                            {chain.imageUrl ? (
                              <>
                                <div className="absolute -inset-0.5 bg-indigo-500/20 blur-sm rounded-full"></div>
                                <Image
                                  src={chain.imageUrl}
                                  alt={chain.name}
                                  width={28}
                                  height={28}
                                  className="relative rounded-full border border-indigo-500/30 w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9"
                                />
                              </>
                            ) : (
                              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-indigo-700/50 flex items-center justify-center border border-indigo-500/30">
                                <span className="text-xs sm:text-sm text-white">{chain.name.charAt(0)}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <div className="text-xs sm:text-sm font-medium text-white truncate max-w-[80px] sm:max-w-[100px]">
                              {chain.name}
                            </div>
                            <div className="text-[10px] text-indigo-400 mt-0.5 hidden sm:block">
                              Chain ID: {chain.id}
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {chains.find(c => c.chainId === chain.id) && chains.find(c => c.chainId === chain.id)?.links ? (
                              <span
                                onClick={(e) => handleNetworkInfo(e, chain)}
                                className="p-0.5 sm:p-1 rounded-full bg-indigo-800/40 hover:bg-indigo-700/50 text-indigo-300 cursor-pointer flex items-center justify-center"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 sm:h-4 sm:w-4">
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <line x1="12" y1="16" x2="12" y2="12"></line>
                                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                </svg>
                              </span>
                            ) : null}
                            {selectedChainId === chain.id && (
                              <div className="p-0.5 sm:p-1 rounded-full bg-indigo-500/20">
                                <Check className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-300" />
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {/* Superchain Networks Section */}
              {(activeNetworkTab === "all" || activeNetworkTab === "superchain") && (
                <div className="p-2 sm:p-3 md:p-4">
                  <div className="flex items-center mb-1 sm:mb-2 md:mb-3">
                    <span className="text-[10px] xs:text-xs sm:text-sm font-medium text-indigo-300">⚡ Superchain Networks</span>
                  </div>
                  <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                    {filteredChains
                      .filter(chain => {
                        const foundChain = chains.find(c => c.chainId === chain.id);
                        return foundChain && 
                          foundChain.isSuperchain && 
                          (searchQuery ? chain.name.toLowerCase().includes(searchQuery.toLowerCase()) : true);
                      })
                      .map((chain) => (
                        <button
                          key={chain.id}
                          onClick={() => handleNetworkSelect(chain.id)}
                          className={`flex items-center p-2 sm:p-3 md:p-4 rounded-lg transition-all border ${
                            selectedChainId === chain.id 
                              ? "bg-indigo-600/20 border-indigo-500/50 shadow-lg shadow-indigo-500/10" 
                              : "hover:bg-indigo-800/30 border-indigo-700/30 hover:border-indigo-600/50"
                          }`}
                        >
                          <div className="flex-shrink-0 mr-2 sm:mr-3 relative">
                            {chain.imageUrl ? (
                              <>
                                <div className="absolute -inset-0.5 bg-indigo-500/20 blur-sm rounded-full"></div>
                                <Image
                                  src={chain.imageUrl}
                                  alt={chain.name}
                                  width={28}
                                  height={28}
                                  className="relative rounded-full border border-indigo-500/30 w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9"
                                />
                              </>
                            ) : (
                              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-indigo-700/50 flex items-center justify-center border border-indigo-500/30">
                                <span className="text-xs sm:text-sm text-white">{chain.name.charAt(0)}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <div className="text-xs sm:text-sm font-medium text-white truncate max-w-[80px] sm:max-w-[100px]">
                              {chain.name}
                            </div>
                            <div className="text-[10px] text-indigo-400 mt-0.5 hidden sm:block">
                              Chain ID: {chain.id}
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {chains.find(c => c.chainId === chain.id) && chains.find(c => c.chainId === chain.id)?.links ? (
                              <span
                                onClick={(e) => handleNetworkInfo(e, chain)}
                                className="p-0.5 sm:p-1 rounded-full bg-indigo-800/40 hover:bg-indigo-700/50 text-indigo-300 cursor-pointer flex items-center justify-center"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 sm:h-4 sm:w-4">
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <line x1="12" y1="16" x2="12" y2="12"></line>
                                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                </svg>
                              </span>
                            ) : null}
                            {selectedChainId === chain.id && (
                              <div className="p-0.5 sm:p-1 rounded-full bg-indigo-500/20">
                                <Check className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-300" />
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {/* Mainnet Networks Section */}
              {(activeNetworkTab === "all" || activeNetworkTab === "mainnet") && (
                <div className="p-2 sm:p-3 md:p-4">
                  <div className="flex items-center mb-1 sm:mb-2 md:mb-3">
                    <span className="text-[10px] xs:text-xs sm:text-sm font-medium text-indigo-300">🌐 Mainnet Networks</span>
                  </div>
                  <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                    {filteredChains
                      .filter(chain => {
                        const foundChain = chains.find(c => c.chainId === chain.id);
                        return foundChain && 
                          foundChain.isMainnet && 
                          !foundChain.isPopular && 
                          !foundChain.isSuperchain && 
                          (searchQuery ? chain.name.toLowerCase().includes(searchQuery.toLowerCase()) : true);
                      })
                      .map((chain) => (
                        <button
                          key={chain.id}
                          onClick={() => handleNetworkSelect(chain.id)}
                          className={`flex items-center p-2 sm:p-3 md:p-4 rounded-lg transition-all border ${
                            selectedChainId === chain.id 
                              ? "bg-indigo-600/20 border-indigo-500/50 shadow-lg shadow-indigo-500/10" 
                              : "hover:bg-indigo-800/30 border-indigo-700/30 hover:border-indigo-600/50"
                          }`}
                        >
                          <div className="flex-shrink-0 mr-2 sm:mr-3 relative">
                            {chain.imageUrl ? (
                              <>
                                <div className="absolute -inset-0.5 bg-indigo-500/20 blur-sm rounded-full"></div>
                                <Image
                                  src={chain.imageUrl}
                                  alt={chain.name}
                                  width={28}
                                  height={28}
                                  className="relative rounded-full border border-indigo-500/30 w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9"
                                />
                              </>
                            ) : (
                              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-indigo-700/50 flex items-center justify-center border border-indigo-500/30">
                                <span className="text-xs sm:text-sm text-white">{chain.name.charAt(0)}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <div className="text-xs sm:text-sm font-medium text-white truncate max-w-[80px] sm:max-w-[100px]">
                              {chain.name}
                            </div>
                            <div className="text-[10px] text-indigo-400 mt-0.5 hidden sm:block">
                              Chain ID: {chain.id}
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {chains.find(c => c.chainId === chain.id) && chains.find(c => c.chainId === chain.id)?.links ? (
                              <span
                                onClick={(e) => handleNetworkInfo(e, chain)}
                                className="p-0.5 sm:p-1 rounded-full bg-indigo-800/40 hover:bg-indigo-700/50 text-indigo-300 cursor-pointer flex items-center justify-center"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 sm:h-4 sm:w-4">
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <line x1="12" y1="16" x2="12" y2="12"></line>
                                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                </svg>
                              </span>
                            ) : null}
                            {selectedChainId === chain.id && (
                              <div className="p-0.5 sm:p-1 rounded-full bg-indigo-500/20">
                                <Check className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-300" />
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {/* Testnet Networks Section */}
              {(activeNetworkTab === "all" || activeNetworkTab === "testnet") && (
                <div className="p-2 sm:p-3 md:p-4">
                  <div className="flex items-center mb-1 sm:mb-2 md:mb-3">
                    <span className="text-[10px] xs:text-xs sm:text-sm font-medium text-indigo-300">🧪 Testnet Networks</span>
                  </div>
                  <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                    {filteredChains
                      .filter(chain => {
                        const foundChain = chains.find(c => c.chainId === chain.id);
                        return foundChain && 
                          !foundChain.isMainnet && 
                          (searchQuery ? chain.name.toLowerCase().includes(searchQuery.toLowerCase()) : true);
                      })
                      .map((chain) => (
                        <button
                          key={chain.id}
                          onClick={() => handleNetworkSelect(chain.id)}
                          className={`flex items-center p-2 sm:p-3 md:p-4 rounded-lg transition-all border ${
                            selectedChainId === chain.id 
                              ? "bg-indigo-600/20 border-indigo-500/50 shadow-lg shadow-indigo-500/10" 
                              : "hover:bg-indigo-800/30 border-indigo-700/30 hover:border-indigo-600/50"
                          }`}
                        >
                          <div className="flex-shrink-0 mr-2 sm:mr-3 relative">
                            {chain.imageUrl ? (
                              <>
                                <div className="absolute -inset-0.5 bg-indigo-500/20 blur-sm rounded-full"></div>
                                <Image
                                  src={chain.imageUrl}
                                  alt={chain.name}
                                  width={28}
                                  height={28}
                                  className="relative rounded-full border border-indigo-500/30 w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9"
                                />
                              </>
                            ) : (
                              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-indigo-700/50 flex items-center justify-center border border-indigo-500/30">
                                <span className="text-xs sm:text-sm text-white">{chain.name.charAt(0)}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <div className="text-xs sm:text-sm font-medium text-white truncate max-w-[80px] sm:max-w-[100px]">
                              {chain.name}
                            </div>
                            <div className="text-[10px] text-indigo-400 mt-0.5 hidden sm:block">
                              Chain ID: {chain.id}
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {chains.find(c => c.chainId === chain.id) && chains.find(c => c.chainId === chain.id)?.links ? (
                              <span
                                onClick={(e) => handleNetworkInfo(e, chain)}
                                className="p-0.5 sm:p-1 rounded-full bg-indigo-800/40 hover:bg-indigo-700/50 text-indigo-300 cursor-pointer flex items-center justify-center"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 sm:h-4 sm:w-4">
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <line x1="12" y1="16" x2="12" y2="12"></line>
                                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                </svg>
                              </span>
                            ) : null}
                            {selectedChainId === chain.id && (
                              <div className="p-0.5 sm:p-1 rounded-full bg-indigo-500/20">
                                <Check className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-300" />
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {/* No Results */}
              {filteredChains.filter(chain => 
                searchQuery ? chain.name.toLowerCase().includes(searchQuery.toLowerCase()) : true
              ).length === 0 && (
                <div className="py-6 sm:py-10 text-center px-4">
                  <div className="inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-indigo-900/50 mb-3 sm:mb-4 border border-indigo-600/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 sm:h-8 w-6 sm:w-8 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-indigo-200 text-sm sm:text-base mb-2 sm:mb-3">No networks match your search</p>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-indigo-200 bg-indigo-800/50 rounded-lg hover:bg-indigo-700/50 transition-colors border border-indigo-600/40"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NetworkSelector; 