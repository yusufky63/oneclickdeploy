"use client";

import { Check, Copy, ExternalLink, Twitter, X } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  contractAddress: string;
  txHash: string | null;
  contractType: string;
  chainName: string;
  copyToClipboard: (text: string) => void;
  openInExplorer: (txHash: string, chainId: number) => void;
  shareOnTwitter: (contractAddress: string, chainName: string, contractType: string) => void;
  chainId: number;
}

export default function SuccessModal({
  isOpen,
  onClose,
  contractAddress,
  txHash,
  contractType,
  chainName,
  copyToClipboard,
  openInExplorer,
  shareOnTwitter,
  chainId
}: SuccessModalProps) {
  if (!isOpen || !contractAddress) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="backdrop-blur-xl bg-transparent border border-indigo-500/20 rounded-2xl shadow-lg w-full max-w-md p-6 relative overflow-hidden">
        {/* Subtle glow effects */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-indigo-500/5 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-indigo-600/5 blur-3xl"></div>
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full p-1.5 z-10 backdrop-blur-sm"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center justify-center mb-5 relative z-10">
          <div className="w-20 h-20 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center mb-4 border border-indigo-500/20">
            <Check className="w-10 h-10 text-indigo-300" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Deployment Successful!
          </h3>
          <div className="text-indigo-200/90 text-center mt-1 px-4 py-2 bg-white/5 rounded-lg backdrop-blur-md">
            <p>Your contract has been successfully deployed to the blockchain and is now live!</p>
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          <div className="bg-white/5 backdrop-blur-lg p-4 rounded-lg border border-indigo-500/20 hover:border-indigo-500/30 transition-colors">
            <p className="text-xs text-indigo-300/80 mb-2 flex items-center">
              <span className="bg-indigo-500/10 p-1 rounded-full mr-2">
                <Check className="w-3 h-3 text-indigo-300" />
              </span>
              Contract Address
            </p>
            <div className="flex items-center justify-between">
              <p className="text-sm text-indigo-100 truncate mr-2">
                {contractAddress}
              </p>
              <button
                onClick={() => copyToClipboard(contractAddress)}
                className="text-indigo-300 hover:text-indigo-200 transition-colors bg-white/5 p-1.5 rounded-md hover:bg-white/10"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {txHash && (
            <div className="bg-white/5 backdrop-blur-lg p-4 rounded-lg border border-indigo-500/20 hover:border-indigo-500/30 transition-colors">
              <p className="text-xs text-indigo-300/80 mb-2 flex items-center">
                <span className="bg-indigo-500/10 p-1 rounded-full mr-2">
                  <Check className="w-3 h-3 text-indigo-300" />
                </span>
                Transaction Hash
              </p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-indigo-100 truncate mr-2">
                  {txHash}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(txHash)}
                    className="text-indigo-300 hover:text-indigo-200 transition-colors bg-white/5 p-1.5 rounded-md hover:bg-white/10"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (txHash) {
                        openInExplorer(txHash, chainId);
                      }
                    }}
                    className="text-indigo-300 hover:text-indigo-200 transition-colors bg-white/5 p-1.5 rounded-md hover:bg-white/10"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-indigo-500/10 mt-3">
            <p className="text-sm text-center text-indigo-300 mb-3 font-medium">
              Share your deployment
            </p>
            
            {/* Tweet Preview - Full contract address */}
            <div className="mb-4 bg-white/5 backdrop-blur-lg p-4 rounded-lg border border-indigo-500/20">
              <p className="text-xs text-indigo-300/80 mb-2">Tweet Preview</p>
              <div className="text-xs text-white bg-black/10 rounded-lg p-3 border border-indigo-500/10 backdrop-blur-sm">
                <p>🚀 Just deployed a {contractType} on {chainName} in seconds using @OneClickDeployer!</p>
                <p className="mt-2">⚡ No coding required</p>
                <p>💰 Low gas fees</p>
                <p className="mt-2">Try it yourself at oneclickdeploy.xyz</p>
                <p className="mt-2 break-all">Contract: {contractAddress}</p>
              </div>
            </div>
            
            <button
              onClick={() => shareOnTwitter(contractAddress, chainName, contractType)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#1DA1F2]/80 hover:bg-[#1DA1F2] text-white rounded-lg font-medium transition-all backdrop-blur-md"
            >
              <Twitter className="w-5 h-5" />
              Share on Twitter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 