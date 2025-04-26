"use client";

interface NFTFormProps {
  name: string;
  symbol: string;
  maxSupply: string;
  onChange: (field: string, value: string) => void;
  onUseDefaultData: () => void;
  defaultValues: {
    name: string;
    symbol: string;
    maxSupply: string;
  };
}

export default function NFTContractForm({
  name,
  symbol,
  maxSupply,
  onChange,
  onUseDefaultData,
  defaultValues,
}: NFTFormProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium mb-1 text-gray-300">
          ERC721 NFT Contract
        </h2>
        <button
          onClick={onUseDefaultData}
          className="text-xs px-2 py-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 rounded border border-indigo-600/30"
        >
          Use Default Data
        </button>
      </div>
      <p className="text-sm text-gray-300/80 mb-4">
        Deploy your own NFT collection with custom parameters
      </p>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              placeholder={defaultValues.name}
              value={name}
              onChange={(e) => onChange("name", e.target.value)}
              className="w-full px-3 py-2 text-gray-300 backdrop-blur-sm border border-indigo-600/20 rounded-md focus:outline-none focus:border-indigo-600/50"
            />
            <p className="text-xs text-gray-400">The name of your NFT collection</p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="nft-symbol"
              className="block text-sm font-medium text-gray-300"
            >
              Symbol
            </label>
            <input
              id="nft-symbol"
              type="text"
              placeholder={defaultValues.symbol}
              value={symbol}
              onChange={(e) => onChange("symbol", e.target.value)}
              className="w-full px-3 py-2 text-gray-300 backdrop-blur-sm border border-indigo-600/20 rounded-md focus:outline-none focus:border-indigo-600/50"
            />
            <p className="text-xs text-gray-400">A short identifier for your NFTs</p>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="nft-max-supply"
            className="block text-sm font-medium text-gray-300"
          >
            Max Supply
          </label>
          <input
            id="nft-max-supply"
            type="text"
            placeholder={defaultValues.maxSupply}
            value={maxSupply}
            onChange={(e) => onChange("maxSupply", e.target.value)}
            className="w-full px-3 py-2 text-gray-300 backdrop-blur-sm border border-indigo-600/20 rounded-md focus:outline-none focus:border-indigo-600/50"
          />
          <p className="text-xs text-gray-400">Maximum number of NFTs in your collection</p>
        </div>
      </div>
    </div>
  );
} 