import React from 'react';

interface ChainData {
  id: number;
  name: string;
  imageUrl?: string;
}

// chains tipini any yerine belirgin bir tip olarak tanımlayalım
interface ChainInfo {
  chainId: number;
  chainName: string;
  isPopular?: boolean;
  isMainnet?: boolean;
  isSuperchain?: boolean;
  blockExplorerUrls?: string[];
  isFeeValue?: number;
  isRequireFees?: boolean;
  [key: string]: unknown; // Diğer olası özellikler için unknown kullanıyoruz
}

interface NetworkSelectorButtonProps {
  selectedChainId: number | null;
  availableChains: ChainData[];
  onClick: () => void;
  handleChainChange: (chainId: number) => void;
  chains: ChainInfo[]; 
}

const NetworkSelectorButton: React.FC<NetworkSelectorButtonProps> = ({
  selectedChainId,
  availableChains,
  onClick,
  handleChainChange,
  chains
}) => {
  // Popüler zincirleri bulma
  const popularChains = availableChains
    .filter(chain => {
      const foundChain = chains.find(c => c.chainId === chain.id);
      return foundChain && foundChain.isPopular;
    })
    .slice(0, 5); // İlk 5 popüler zincir

  return (
    <div className="space-y-3">
      <button
        onClick={onClick}
        className="relative w-full flex items-center justify-between px-4 py-3.5 rounded-lg text-left transition-all duration-300 bg-indigo-900/30 border border-indigo-600/30 hover:bg-indigo-800/30 hover:border-indigo-500/40"
      >
        <div className="flex items-center">
          {selectedChainId ? (
            <>
              {availableChains.find(c => c.id === selectedChainId)?.imageUrl ? (
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-indigo-500/30 blur-sm rounded-full"></div>
                  <img
                    src={availableChains.find(c => c.id === selectedChainId)?.imageUrl}
                    alt=""
                    className="relative w-6 h-6 mr-3 rounded-full ring-1 ring-indigo-500/50"
                  />
                </div>
              ) : (
                <div className="w-6 h-6 mr-3 rounded-full bg-indigo-700/50 flex items-center justify-center">
                  <span className="text-xs text-indigo-200">
                    {(availableChains.find(c => c.id === selectedChainId)?.name || "").charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <span className="text-white font-medium">
                  {availableChains.find(c => c.id === selectedChainId)?.name}
                </span>
                <div className="text-xs text-indigo-400">Network ID: {selectedChainId}</div>
              </div>
            </>
          ) : (
            <div className="flex items-center text-indigo-300">
              <div className="w-6 h-6 mr-3 rounded-full bg-indigo-700/30 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span>Select a blockchain network</span>
            </div>
          )}
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-xs px-2 py-0.5 rounded-full bg-indigo-900/50 text-indigo-300 border border-indigo-600/30">
            {availableChains.length} Networks
          </span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-indigo-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Popüler ağlar için hızlı seçim - Dikey düzende */}
      {popularChains.length > 0 && (
        <div className="bg-indigo-950/40 backdrop-blur-sm rounded-lg border border-indigo-600/30 p-3">
          <div className="flex items-center mb-3">
            <span className="text-sm text-indigo-300 font-medium">Popular Networks</span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {popularChains.map(chain => (
              <button
                key={chain.id}
                onClick={() => handleChainChange(chain.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${
                  selectedChainId === chain.id 
                    ? "bg-indigo-600/30 border border-indigo-500/50" 
                    : "hover:bg-indigo-800/30 border border-indigo-700/30 hover:border-indigo-600/50"
                }`}
              >
                <div className="relative mb-2">
                  {chain.imageUrl ? (
                    <>
                      <div className="absolute -inset-1 bg-indigo-500/20 blur-sm rounded-full"></div>
                      <img
                        src={chain.imageUrl}
                        alt={chain.name}
                        className="relative w-8 h-8 rounded-full border border-indigo-500/30"
                      />
                    </>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-700/50 flex items-center justify-center border border-indigo-500/30">
                      <span className="text-md text-white">{chain.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <span className="text-xs text-white text-center font-medium">{chain.name}</span>
                <span className="text-[10px] text-indigo-400 mt-0.5">ID: {chain.id}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkSelectorButton; 