import React from 'react';
import Image from 'next/image';

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
        className="relative w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg text-left transition-all duration-300 bg-indigo-900/30 border border-indigo-600/30 hover:bg-indigo-800/30 hover:border-indigo-500/40"
      >
        <div className="flex items-center">
          {selectedChainId ? (
            <>
              {availableChains.find(c => c.id === selectedChainId)?.imageUrl ? (
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-indigo-500/30 blur-sm rounded-full"></div>
                  <Image
                    src={availableChains.find(c => c.id === selectedChainId)?.imageUrl || ""}
                    alt=""
                    width={24}
                    height={24}
                    className="relative w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3 rounded-full ring-1 ring-indigo-500/50"
                  />
                </div>
              ) : (
                <div className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3 rounded-full bg-indigo-700/50 flex items-center justify-center">
                  <span className="text-xs text-indigo-200">
                    {(availableChains.find(c => c.id === selectedChainId)?.name || "").charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <span className="text-white text-sm sm:text-base font-medium">
                  {availableChains.find(c => c.id === selectedChainId)?.name}
                </span>
                <div className="text-xs text-indigo-400 hidden sm:block">Network ID: {selectedChainId}</div>
              </div>
            </>
          ) : (
            <div className="flex items-center text-indigo-300">
              <div className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3 rounded-full bg-indigo-700/30 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-sm sm:text-base">Select a network</span>
            </div>
          )}
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-indigo-900/50 text-indigo-300 border border-indigo-600/30 hidden sm:inline-block">
            {availableChains.length} Networks
          </span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 sm:h-5 w-4 sm:w-5 text-indigo-400" 
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
        <div className=" backdrop-blur-sm rounded-lg  border-indigo-600/30 ">
         
          <div className="grid grid-cols-3 xs:grid-cols-5 sm:grid-cols-5 md:grid-cols-5 gap-1 sm:gap-2 overflow-x-auto">
            {popularChains.map(chain => (
              <button
                key={chain.id}
                onClick={() => handleChainChange(chain.id)}
                className={`flex flex-col items-center justify-center p-2 sm:p-3 rounded-lg transition-all ${
                  selectedChainId === chain.id 
                    ? "bg-indigo-600/30 border border-indigo-500/50" 
                    : "hover:bg-indigo-800/30 border border-indigo-700/30 hover:border-indigo-600/50"
                }`}
              >
                <div className="relative mb-1 sm:mb-2">
                  {chain.imageUrl ? (
                    <>
                      <div className="absolute -inset-1 bg-indigo-500/20 blur-sm rounded-full"></div>
                      <Image
                        src={chain.imageUrl}
                        alt={chain.name}
                        width={28}
                        height={28}
                        className="relative rounded-full border border-indigo-500/30"
                      />
                    </>
                  ) : (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-700/50 flex items-center justify-center border border-indigo-500/30">
                      <span className="text-sm sm:text-md text-white">{chain.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <span className="text-[10px] sm:text-xs text-white text-center font-medium truncate w-full">{chain.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkSelectorButton; 