"use client";

import React, { useState } from "react";
import { ExternalLink, Droplet, Info } from "lucide-react";
import { Chain } from "@/types/chains";
import Image from "next/image";

interface ChainInfoBarProps {
  selectedChain: Chain | null;
}

export default function ChainInfoBar({ selectedChain }: ChainInfoBarProps) {
  const [showFaucets, setShowFaucets] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  if (!selectedChain) return null;

  const hasFaucets = selectedChain.links?.faucet && selectedChain.links.faucet.length > 0;
  const hasLinks = selectedChain.links && (selectedChain.links.website || hasFaucets || (selectedChain.links.bridge && selectedChain.links.bridge.length > 0));
  
  // Don't show anything if there are no links or if it's a mainnet (no faucets needed)
  if (!hasLinks || (selectedChain.isMainnet && !selectedChain.links?.website && !selectedChain.links?.bridge)) return null;

  return (
    <div className="my-2 px-3 py-2 rounded-xl border border-indigo-500/30 bg-indigo-900/20 backdrop-blur-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {selectedChain.imageUrl && (
            <div className="mr-2 relative">
              <div className="absolute -inset-0.5 bg-indigo-500/20 blur-sm rounded-full"></div>
              <Image
                src={selectedChain.imageUrl}
                alt={selectedChain.chainName}
                width={20}
                height={20}
                className="relative rounded-full border border-indigo-500/30"
              />
            </div>
          )}
          <span className="text-sm font-medium text-indigo-200">
            {selectedChain.chainName} Resources
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Only show faucet button for testnets */}
          {!selectedChain.isMainnet && hasFaucets && (
            <button
              onClick={() => setShowFaucets(!showFaucets)}
              className={`flex items-center gap-1 px-2 py-1 text-xs ${showFaucets ? "text-indigo-200 bg-indigo-700/60" : "text-indigo-300 bg-indigo-800/40"} rounded-md hover:bg-indigo-700/50 border border-indigo-600/30`}
            >
              <Droplet className="w-3 h-3" />
              <span>Faucets</span>
            </button>
          )}
          
          <button
            onClick={() => setShowInfoModal(!showInfoModal)}
            className={`flex items-center gap-1 px-2 py-1 text-xs ${showInfoModal ? "text-indigo-200 bg-indigo-700/60" : "text-indigo-300 bg-indigo-800/40"} rounded-md hover:bg-indigo-700/50 border border-indigo-600/30`}
          >
            <Info className="w-3 h-3" />
            <span>Details</span>
          </button>
        </div>
      </div>

      {/* Display both sections if they're active */}
      {(showFaucets || showInfoModal) && (
        <div className="mt-3 pt-2 border-t border-indigo-600/30">
          {/* Faucet Links Section */}
          {showFaucets && hasFaucets && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-indigo-300 mb-2">
                Available Faucets
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedChain.links?.faucet?.map((faucet, index) => (
                  <a 
                    key={index}
                    href={faucet} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-xs text-indigo-400 hover:text-indigo-300 transition-colors p-2 bg-indigo-900/30 rounded-md border border-indigo-600/20"
                  >
                    <ExternalLink className="w-3 h-3 mr-1.5 flex-shrink-0" />
                    <span className="truncate">
                      {new URL(faucet).hostname.replace("www.", "")}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Details Section */}
          {showInfoModal && (
            <div className={showFaucets ? "border-t border-indigo-600/30 pt-3" : ""}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedChain.links?.website && (
                  <div>
                    <h4 className="text-xs font-medium text-indigo-300 mb-1">Official Website</h4>
                    <a 
                      href={selectedChain.links.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      <span className="truncate">{new URL(selectedChain.links.website).hostname}</span>
                    </a>
                  </div>
                )}

                {selectedChain.links?.bridge && selectedChain.links.bridge.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium text-indigo-300 mb-1">Bridges</h4>
                    <div className="space-y-1">
                      {selectedChain.links.bridge.map((bridge, index) => (
                        <a 
                          key={index}
                          href={bridge} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          <span className="truncate">{new URL(bridge).hostname.replace("www.", "")}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-3">
                <h4 className="text-xs font-medium text-indigo-300 mb-1">RPC Endpoints</h4>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-1">
                  {selectedChain.rpcUrls.slice(0, 2).map((url, index) => (
                    <div key={index} className="text-xs text-indigo-400 truncate">
                      {url}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3">
                <h4 className="text-xs font-medium text-indigo-300 mb-1">Block Explorer</h4>
                {selectedChain.blockExplorerUrls.map((url, index) => (
                  <a 
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    <span className="truncate">{url}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 