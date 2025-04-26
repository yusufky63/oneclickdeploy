"use client";

interface TokenFormProps {
  name: string;
  symbol: string;
  totalSupply: string;
  onChange: (field: string, value: string) => void;
  onUseDefaultData: () => void;
  defaultValues: {
    name: string;
    symbol: string;
    totalSupply: string;
  };
}

export default function TokenContractForm({
  name,
  symbol,
  totalSupply,
  onChange,
  onUseDefaultData,
  defaultValues,
}: TokenFormProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium mb-1 text-gray-300">
          ERC20 Token Contract
        </h2>
        <button
          onClick={onUseDefaultData}
          className="text-xs px-2 py-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 rounded border border-indigo-600/30"
        >
          Use Default Data
        </button>
      </div>
      <p className="text-sm text-gray-300/80 mb-4">
        Create your own custom ERC20 token with standard functionality
      </p>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              placeholder={defaultValues.name}
              value={name}
              onChange={(e) => onChange("name", e.target.value)}
              className="w-full px-3 py-2 text-gray-300 backdrop-blur-sm border border-indigo-600/20 rounded-md focus:outline-none focus:border-indigo-600/50"
            />
            <p className="text-xs text-gray-400">The full name of your token</p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="token-symbol"
              className="block text-sm font-medium text-gray-300"
            >
              Symbol
            </label>
            <input
              id="token-symbol"
              type="text"
              placeholder={defaultValues.symbol}
              value={symbol}
              onChange={(e) => onChange("symbol", e.target.value)}
              className="w-full px-3 py-2 text-gray-300 backdrop-blur-sm border border-indigo-600/20 rounded-md focus:outline-none focus:border-indigo-600/50"
            />
            <p className="text-xs text-gray-400">A short identifier for your token (typically 3-4 characters)</p>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="token-supply"
            className="block text-sm font-medium text-gray-300"
          >
            Total Supply
          </label>
          <input
            id="token-supply"
            type="text"
            placeholder={defaultValues.totalSupply}
            value={totalSupply}
            onChange={(e) => onChange("totalSupply", e.target.value)}
            className="w-full px-3 py-2 text-gray-300 backdrop-blur-sm border border-indigo-600/20 rounded-md focus:outline-none focus:border-indigo-600/50"
          />
          <p className="text-xs text-gray-400">
            The total amount of tokens to create.
          </p>
        </div>
      </div>
    </div>
  );
} 