"use client";

interface TabSelectorProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TabSelector({ activeTab, setActiveTab }: TabSelectorProps) {
  return (
    <div className="overflow-hidden rounded-xl shadow-xl border border-indigo-500/30 mb-3 sm:mb-4 md:mb-6 backdrop-blur-md">
      <div className="grid grid-cols-3 relative">
        <button
          onClick={() => setActiveTab("simple")}
          className={`py-3 sm:py-3.5 md:py-4 px-1 sm:px-2 md:px-4 text-xs sm:text-sm md:text-base font-semibold transition-colors ${
            activeTab === "simple"
              ? "text-white bg-indigo-500/30 backdrop-blur-md"
              : "text-indigo-300 hover:bg-indigo-600/20"
          }`}
        >
          Simple Contract
        </button>
        <button
          onClick={() => setActiveTab("token")}
          className={`py-3 sm:py-3.5 md:py-4 px-1 sm:px-2 md:px-4 text-xs sm:text-sm md:text-base font-semibold transition-colors ${
            activeTab === "token"
              ? "text-white bg-indigo-500/30 backdrop-blur-md"
              : "text-indigo-300 hover:bg-indigo-600/20"
          }`}
        >
          Token Contract
        </button>
        <button
          onClick={() => setActiveTab("nft")}
          className={`py-3 sm:py-3.5 md:py-4 px-1 sm:px-2 md:px-4 text-xs sm:text-sm md:text-base font-semibold transition-colors ${
            activeTab === "nft"
              ? "text-white bg-indigo-500/30 backdrop-blur-md"
              : "text-indigo-300 hover:bg-indigo-600/20"
          }`}
        >
          NFT Contract
        </button>
      </div>
    </div>
  );
} 