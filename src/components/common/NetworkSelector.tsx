import React from 'react';
import { Check, Search, X } from 'lucide-react';
import Image from 'next/image';

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
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-lg flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-5xl bg-indigo-950/40 backdrop-blur-xl border border-indigo-600/30 rounded-xl shadow-2xl"
        style={{
          animation: 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          transformOrigin: 'center',
          maxHeight: '85vh',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-indigo-600/30">
          <h3 className="text-xl font-medium text-white">Network Selector</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-indigo-800/50 text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Search */}
        <div className="p-4 border-b border-indigo-600/30">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search network..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-indigo-900/30 text-white rounded-lg border border-indigo-500/50 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/50 placeholder-indigo-300/60"
              autoFocus
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-indigo-600/30">
          {["All", "Popular", "Superchain", "Mainnet", "Testnet"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveNetworkTab(tab.toLowerCase())}
              className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${
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
            <div className="p-4">
              <div className="flex items-center mb-3">
                <span className="text-sm font-medium text-indigo-300">#Popular Networks</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
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
                      onClick={() => {
                        handleChainChange(chain.id);
                        onClose();
                        setSearchQuery("");
                      }}
                      className={`flex items-center p-4 rounded-lg transition-all border ${
                        selectedChainId === chain.id 
                          ? "bg-indigo-600/20 border-indigo-500/50 shadow-lg shadow-indigo-500/10" 
                          : "hover:bg-indigo-800/30 border-indigo-700/30 hover:border-indigo-600/50"
                      }`}
                    >
                      <div className="flex-shrink-0 mr-3 relative">
                        {chain.imageUrl ? (
                          <>
                            <div className="absolute -inset-0.5 bg-indigo-500/20 blur-sm rounded-full"></div>
                            <Image
                              src={chain.imageUrl}
                              alt={chain.name}
                              width={40}
                              height={40}
                              className="relative rounded-full border border-indigo-500/30"
                            />
                          </>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-indigo-700/50 flex items-center justify-center border border-indigo-500/30">
                            <span className="text-sm text-white">{chain.name.charAt(0)}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium text-white">
                          {chain.name}
                        </div>
                        <div className="text-xs text-indigo-400 mt-0.5">
                          Chain ID: {chain.id}
                        </div>
                      </div>
                      {selectedChainId === chain.id && (
                        <div className="ml-2 p-1 rounded-full bg-indigo-500/20">
                          <Check className="h-4 w-4 text-indigo-300" />
                        </div>
                      )}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Superchain Networks Section */}
          {(activeNetworkTab === "all" || activeNetworkTab === "superchain") && (
            <div className="p-4">
              <div className="flex items-center mb-3">
                <span className="text-sm font-medium text-indigo-300">#Superchain Networks</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
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
                      onClick={() => {
                        handleChainChange(chain.id);
                        onClose();
                        setSearchQuery("");
                      }}
                      className={`flex items-center p-4 rounded-lg transition-all border ${
                        selectedChainId === chain.id 
                          ? "bg-indigo-600/20 border-indigo-500/50 shadow-lg shadow-indigo-500/10" 
                          : "hover:bg-indigo-800/30 border-indigo-700/30 hover:border-indigo-600/50"
                      }`}
                    >
                      <div className="flex-shrink-0 mr-3 relative">
                        {chain.imageUrl ? (
                          <>
                            <div className="absolute -inset-0.5 bg-indigo-500/20 blur-sm rounded-full"></div>
                            <Image
                              src={chain.imageUrl}
                              alt={chain.name}
                              width={40}
                              height={40}
                              className="relative rounded-full border border-indigo-500/30"
                            />
                          </>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-indigo-700/50 flex items-center justify-center border border-indigo-500/30">
                            <span className="text-sm text-white">{chain.name.charAt(0)}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium text-white">
                          {chain.name}
                        </div>
                        <div className="text-xs text-indigo-400 mt-0.5">
                          Chain ID: {chain.id}
                        </div>
                      </div>
                      {selectedChainId === chain.id && (
                        <div className="ml-2 p-1 rounded-full bg-indigo-500/20">
                          <Check className="h-4 w-4 text-indigo-300" />
                        </div>
                      )}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Mainnet Networks Section */}
          {(activeNetworkTab === "all" || activeNetworkTab === "mainnet") && (
            <div className="p-4">
              <div className="flex items-center mb-3">
                <span className="text-sm font-medium text-indigo-300">#Mainnet Networks</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
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
                      onClick={() => {
                        handleChainChange(chain.id);
                        onClose();
                        setSearchQuery("");
                      }}
                      className={`flex items-center p-4 rounded-lg transition-all border ${
                        selectedChainId === chain.id 
                          ? "bg-indigo-600/20 border-indigo-500/50 shadow-lg shadow-indigo-500/10" 
                          : "hover:bg-indigo-800/30 border-indigo-700/30 hover:border-indigo-600/50"
                      }`}
                    >
                      <div className="flex-shrink-0 mr-3 relative">
                        {chain.imageUrl ? (
                          <>
                            <div className="absolute -inset-0.5 bg-indigo-500/20 blur-sm rounded-full"></div>
                            <Image
                              src={chain.imageUrl}
                              alt={chain.name}
                              width={40}
                              height={40}
                              className="relative rounded-full border border-indigo-500/30"
                            />
                          </>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-indigo-700/50 flex items-center justify-center border border-indigo-500/30">
                            <span className="text-sm text-white">{chain.name.charAt(0)}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium text-white">
                          {chain.name}
                        </div>
                        <div className="text-xs text-indigo-400 mt-0.5">
                          Chain ID: {chain.id}
                        </div>
                      </div>
                      {selectedChainId === chain.id && (
                        <div className="ml-2 p-1 rounded-full bg-indigo-500/20">
                          <Check className="h-4 w-4 text-indigo-300" />
                        </div>
                      )}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Testnet Networks Section */}
          {(activeNetworkTab === "all" || activeNetworkTab === "testnet") && (
            <div className="p-4">
              <div className="flex items-center mb-3">
                <span className="text-sm font-medium text-indigo-300">#Testnet Networks</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
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
                      onClick={() => {
                        handleChainChange(chain.id);
                        onClose();
                        setSearchQuery("");
                      }}
                      className={`flex items-center p-4 rounded-lg transition-all border ${
                        selectedChainId === chain.id 
                          ? "bg-indigo-600/20 border-indigo-500/50 shadow-lg shadow-indigo-500/10" 
                          : "hover:bg-indigo-800/30 border-indigo-700/30 hover:border-indigo-600/50"
                      }`}
                    >
                      <div className="flex-shrink-0 mr-3 relative">
                        {chain.imageUrl ? (
                          <>
                            <div className="absolute -inset-0.5 bg-indigo-500/20 blur-sm rounded-full"></div>
                            <Image
                              src={chain.imageUrl}
                              alt={chain.name}
                              width={40}
                              height={40}
                              className="relative rounded-full border border-indigo-500/30"
                            />
                          </>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-indigo-700/50 flex items-center justify-center border border-indigo-500/30">
                            <span className="text-sm text-white">{chain.name.charAt(0)}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium text-white">
                          {chain.name}
                        </div>
                        <div className="text-xs text-indigo-400 mt-0.5">
                          Chain ID: {chain.id}
                        </div>
                      </div>
                      {selectedChainId === chain.id && (
                        <div className="ml-2 p-1 rounded-full bg-indigo-500/20">
                          <Check className="h-4 w-4 text-indigo-300" />
                        </div>
                      )}
                      {chain.id === 42170 && (
                        <div className="ml-2 px-1.5 py-0.5 bg-amber-500/30 text-amber-300 text-[10px] rounded-full inline-block border border-amber-500/30">
                          New
                        </div>
                      )}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {filteredChains.filter(chain => 
            searchQuery ? chain.name.toLowerCase().includes(searchQuery.toLowerCase()) : true
          ).length === 0 && (
            <div className="py-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-900/50 mb-4 border border-indigo-600/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-indigo-200 text-base mb-3">No networks match your search</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 text-sm text-indigo-200 bg-indigo-800/50 rounded-lg hover:bg-indigo-700/50 transition-colors border border-indigo-600/40"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkSelector; 