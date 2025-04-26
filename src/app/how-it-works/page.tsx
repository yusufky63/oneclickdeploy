"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Copy } from "lucide-react";
import GridBackground from "@/components/common/Grid-Background";

// Sample code blocks
const contractSamples = {
  simpleContract: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleContract {
    constructor(address payable _feeReceiver, bool _feeRequired, uint256 _feeAmount) payable {
        if (_feeRequired) {
            require(msg.value >= _feeAmount, "Fee amount too low");
            require(_feeReceiver != address(0), "Invalid fee receiver address");
            
            (bool success, ) = _feeReceiver.call{value: msg.value}("");
            require(success, "Fee transfer failed");
        }
    }
}`,
  tokenContract: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleToken {
    string public name;
    string public symbol;
    uint8 public decimals = 18;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balances;
    
    constructor(
        string memory _name, 
        string memory _symbol, 
        uint256 _initialSupply, 
        address payable _feeReceiver, 
        bool _feeRequired, 
        uint256 _feeAmount
    ) payable {
        name = _name;
        symbol = _symbol;
        totalSupply = _initialSupply * 10**decimals;
        balances[msg.sender] = totalSupply;
        
        if (_feeRequired) {
            require(msg.value >= _feeAmount, "Fee amount too low");
            require(_feeReceiver != address(0), "Invalid fee receiver address");
            
            (bool success, ) = _feeReceiver.call{value: msg.value}("");
            require(success, "Fee transfer failed");
        }
    }
}`,
  nftContract: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleNFT {
    string public name;
    string public symbol;
    string public baseURI;
    uint256 public maxSupply;
    uint256 public totalSupply;
    
    mapping(uint256 => address) public ownerOf;
    
    constructor(
        string memory _name, 
        string memory _symbol, 
        string memory _baseURI, 
        uint256 _maxSupply, 
        address payable _feeReceiver,
        bool _feeRequired,
        uint256 _feeAmount
    ) payable {
        name = _name;
        symbol = _symbol;
        baseURI = _baseURI;
        maxSupply = _maxSupply;
        totalSupply = 0;
        
        if (_feeRequired) {
            require(msg.value >= _feeAmount, "Fee amount too low");
            require(_feeReceiver != address(0), "Invalid fee receiver address");
            
            (bool success, ) = _feeReceiver.call{value: msg.value}("");
            require(success, "Fee transfer failed");
        }
    }
    
    function mint() public {
        require(totalSupply < maxSupply, "Max supply reached");
        totalSupply++;
        ownerOf[totalSupply] = msg.sender;
    }
}`
};

export default function HowItWorks() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen text-gray-100 relative overflow-hidden bg-gradient-to-br from-indigo-950 to-black">
      {/* Background Elements */}
      <div className="fixed inset-0 opacity-40 pointer-events-none z-0">
        <GridBackground theme="dark" />
      </div>
      <div className="fixed top-[-50%] left-[-10%] w-[80%] h-[80%] rounded-full bg-indigo-500/10 blur-3xl pointer-events-none z-0"></div>
      <div className="fixed bottom-[-50%] right-[-20%] w-[80%] h-[80%] rounded-full bg-indigo-600/5 blur-3xl pointer-events-none z-0"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-300">How It Works</h1>
        <p className="text-indigo-300 mb-6">Learn how the OneClick Deployer helps you deploy contracts without coding</p>

        <div className="space-y-8">
          {/* Introduction */}
          <div className="backdrop-blur-md bg-indigo-900/20 rounded-lg p-6 border border-indigo-500/30">
            <h2 className="text-xl font-semibold mb-4">Introduction</h2>
            <p className="text-indigo-200 mb-4">
              OneClick Deployer allows you to deploy three types of Ethereum smart contracts without writing code:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-indigo-300">
              <li><strong className="text-white">Simple Contract</strong> - A basic smart contract that handles deployment fees</li>
              <li><strong className="text-white">Token Contract (ERC20)</strong> - A simple ERC20 token with customizable supply</li>
              <li><strong className="text-white">NFT Contract (ERC721)</strong> - A basic NFT contract with minting capabilities</li>
            </ul>
            <div className="mt-6 p-4 bg-indigo-900/40 rounded border border-indigo-600/30">
              <h3 className="text-lg font-medium mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1 text-indigo-300">
                <li>Deploy to 50+ EVM networks including Ethereum, Polygon, Arbitrum, and testnets</li>
                <li>No coding required - just fill in basic information</li>
                <li>Low gas fees optimization</li>
                <li>Track deployments across all chains</li>
                <li>Instantly verify and share your contract</li>
              </ul>
            </div>
          </div>

          {/* Deployment Process */}
          <div className="backdrop-blur-md bg-indigo-900/20 rounded-lg p-6 border border-indigo-500/30">
            <h2 className="text-xl font-semibold mb-4">Deployment Process</h2>
            <ol className="list-decimal pl-6 space-y-4">
              <li className="text-indigo-200">
                <h3 className="font-medium text-white">Connect Your Wallet</h3>
                <p>Click the &quot;Connect Wallet&quot; button to connect your Web3 wallet (MetaMask, WalletConnect, etc.)</p>
              </li>
              <li className="text-indigo-200">
                <h3 className="font-medium text-white">Select Network</h3>
                <p>Choose the blockchain network you want to deploy to from the dropdown menu</p>
              </li>
              <li className="text-indigo-200">
                <h3 className="font-medium text-white">Choose Contract Type</h3>
                <p>Select the type of contract you want to deploy (Simple, Token, or NFT)</p>
              </li>
              <li className="text-indigo-200">
                <h3 className="font-medium text-white">Configure Parameters</h3>
                <p>Fill in the required parameters (name, symbol, supply, etc.) or use the default values</p>
              </li>
              <li className="text-indigo-200">
                <h3 className="font-medium text-white">Deploy</h3>
                <p>Click the &quot;Deploy&quot; button and confirm the transaction in your wallet</p>
              </li>
              <li className="text-indigo-200">
                <h3 className="font-medium text-white">View Results</h3>
                <p>After deployment, you&apos;ll receive the contract address and transaction hash</p>
              </li>
            </ol>
          </div>

          {/* Contract Code Samples */}
          <div className="backdrop-blur-md bg-indigo-900/20 rounded-lg overflow-hidden border border-indigo-500/30">
            <div className="p-4 border-b border-indigo-700/30">
              <h2 className="text-xl font-semibold">Smart Contract Code</h2>
              <p className="text-indigo-300 text-sm mt-1">View the actual code that will be deployed</p>
            </div>
            
            {/* Simple Contract */}
            <div className="p-6 border-b border-indigo-700/20">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-white">Simple Contract</h3>
                <button 
                  onClick={() => copyToClipboard(contractSamples.simpleContract)}
                  className="flex items-center gap-1 text-xs px-2 py-1 bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-300 rounded"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </button>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-indigo-100 text-xs">
                  <code>{contractSamples.simpleContract}</code>
                </pre>
              </div>
            </div>
            
            {/* Token Contract */}
            <div className="p-6 border-b border-indigo-700/20">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-white">Token Contract (ERC20)</h3>
                <button 
                  onClick={() => copyToClipboard(contractSamples.tokenContract)}
                  className="flex items-center gap-1 text-xs px-2 py-1 bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-300 rounded"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </button>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-indigo-100 text-xs">
                  <code>{contractSamples.tokenContract}</code>
                </pre>
              </div>
            </div>
            
            {/* NFT Contract */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-white">NFT Contract (ERC721)</h3>
                <button 
                  onClick={() => copyToClipboard(contractSamples.nftContract)}
                  className="flex items-center gap-1 text-xs px-2 py-1 bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-300 rounded"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </button>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-indigo-100 text-xs">
                  <code>{contractSamples.nftContract}</code>
                </pre>
              </div>
              <div className="mt-4 text-xs text-indigo-400">
                <p>Note: These contracts are simple examples with basic functionality.</p>
              </div>
            </div>
          </div>
          
       
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/" className="px-4 py-2 bg-indigo-600/30 hover:bg-indigo-600/40 rounded-lg text-indigo-200 transition-colors">
            Back to Deployer
          </Link>
        </div>
      </div>
    </div>
  );
} 