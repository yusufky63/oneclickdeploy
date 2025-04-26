import React, { useState, useEffect } from 'react';
import { Copy, ExternalLink, X, ChevronLeft, ChevronRight, Search, Calendar } from 'lucide-react';
import Image from 'next/image';
import { chains } from '@/types/chains';

interface DeploymentRecord {
  chainId: number;
  chainName: string;
  contractType: string;
  contractAddress: string;
  txHash: string;
  timestamp: number;
}

interface TransactionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  deploymentHistory: DeploymentRecord[];
  copyToClipboard: (text: string) => void;
  openInExplorer: (txHash: string, chainId: number) => void;
  formatDate: (timestamp: number) => string;
}

const TransactionHistoryModal: React.FC<TransactionHistoryModalProps> = ({
  isOpen,
  onClose,
  deploymentHistory,
  copyToClipboard,
  openInExplorer,
  formatDate
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<string>('all');
  const [isMobile, setIsMobile] = useState(false);
  
  const itemsPerPage = 10;
  
  // Check if viewport is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  if (!isOpen) return null;
  
  // Filter based on search term and filter type
  const filteredHistory = deploymentHistory.filter(record => {
    const matchesSearch = 
      record.contractAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.chainName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.contractType.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (filter === 'all') return matchesSearch;
    return matchesSearch && record.contractType.toLowerCase().includes(filter.toLowerCase());
  });
  
  // Pagination
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedHistory = filteredHistory.slice(startIndex, startIndex + itemsPerPage);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Function to get chain logo URL
  const getChainLogo = (chainId: number) => {
    const chain = chains.find(c => c.chainId === chainId);
    return chain?.imageUrl || null;
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
      <div className="bg-transparent backdrop-blur-xl border border-indigo-500/30 rounded-2xl shadow-[0_10px_50px_rgba(99,102,241,0.2)] w-full max-w-3xl p-3 sm:p-5 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/40 to-black/40 rounded-2xl -z-10"></div>
        
        <div className="flex justify-between items-center mb-3 sm:mb-5">
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Deployment History
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors bg-indigo-900/30 backdrop-blur-md rounded-full p-1.5"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
        
        <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400" />
            <input
              type="text"
              placeholder="Search deployments..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="w-full pl-8 sm:pl-10 py-2 px-3 bg-indigo-900/30 backdrop-blur-md border border-indigo-600/30 rounded-lg text-xs sm:text-sm text-gray-200 placeholder-indigo-400/80 focus:outline-none focus:border-indigo-500"
            />
          </div>
          
          <div className="flex overflow-x-auto hide-scrollbar">
            <button
              onClick={() => { setFilter('all'); setCurrentPage(1); }}
              className={`px-2 sm:px-3 py-1.5 sm:py-2 text-xs whitespace-nowrap rounded-l-lg border border-indigo-600/30 backdrop-blur-md transition-colors ${
                filter === 'all' 
                  ? 'bg-indigo-600/50 text-white' 
                  : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-900/50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => { setFilter('simple'); setCurrentPage(1); }}
              className={`px-2 sm:px-3 py-1.5 sm:py-2 text-xs whitespace-nowrap border-t border-b border-indigo-600/30 backdrop-blur-md transition-colors ${
                filter === 'simple' 
                  ? 'bg-indigo-600/50 text-white' 
                  : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-900/50'
              }`}
            >
              Simple
            </button>
            <button
              onClick={() => { setFilter('token'); setCurrentPage(1); }}
              className={`px-2 sm:px-3 py-1.5 sm:py-2 text-xs whitespace-nowrap border-t border-b border-indigo-600/30 backdrop-blur-md transition-colors ${
                filter === 'token' 
                  ? 'bg-indigo-600/50 text-white' 
                  : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-900/50'
              }`}
            >
              Token
            </button>
            <button
              onClick={() => { setFilter('nft'); setCurrentPage(1); }}
              className={`px-2 sm:px-3 py-1.5 sm:py-2 text-xs whitespace-nowrap rounded-r-lg border border-indigo-600/30 backdrop-blur-md transition-colors ${
                filter === 'nft' 
                  ? 'bg-indigo-600/50 text-white' 
                  : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-900/50'
              }`}
            >
              NFT
            </button>
          </div>
        </div>

        {deploymentHistory.length > 0 ? (
          <>
            <div className="overflow-auto max-h-[40vh] sm:max-h-[50vh] custom-scrollbar rounded-lg">
              <div className="min-w-full divide-y divide-indigo-800/30">
                {/* Mobile Design */}
                {isMobile ? (
                  <div className="space-y-2 p-2">
                    {paginatedHistory.map((record, index) => (
                      <div 
                        key={index}
                        className="bg-indigo-900/20 backdrop-blur-sm rounded-lg border border-indigo-500/20 p-3 space-y-2.5"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${
                              record.contractType.includes('Simple') 
                                ? 'bg-green-500/20 border border-green-500/40' : 
                              record.contractType.includes('Token') 
                                ? 'bg-blue-500/20 border border-blue-500/40' : 
                                'bg-purple-500/20 border border-purple-500/40'
                            }`}>
                              {record.contractType.includes('Simple') && 
                                <div className="h-2 w-2 rounded-full bg-green-400"></div>}
                              {record.contractType.includes('Token') && 
                                <div className="h-2 w-2 rounded-full bg-blue-400"></div>}
                              {record.contractType.includes('NFT') && 
                                <div className="h-2 w-2 rounded-full bg-purple-400"></div>}
                            </span>
                            <span className="text-xs font-medium text-gray-200">{record.contractType}</span>
                          </div>
                          <div className="flex items-center text-xs text-indigo-400">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(record.timestamp)}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {getChainLogo(record.chainId) ? (
                            <div className="relative flex-shrink-0 w-4 h-4 rounded-full overflow-hidden bg-indigo-900/40 border border-indigo-500/30">
                              <Image 
                                src={getChainLogo(record.chainId) || ''} 
                                alt={record.chainName}
                                fill
                                sizes="16px"
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-indigo-600/30 flex items-center justify-center text-xs text-indigo-300">
                              {record.chainName.charAt(0)}
                            </div>
                          )}
                          <span className="text-xs font-medium text-gray-300">{record.chainName}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="bg-indigo-900/30 backdrop-blur-sm px-2 py-1 rounded-md border border-indigo-500/30 flex items-center flex-grow mr-2">
                            <span className="truncate max-w-[140px] text-xs text-gray-300">
                              {record.contractAddress}
                            </span>
                            <button
                              onClick={() => copyToClipboard(record.contractAddress)}
                              className="ml-1.5 text-indigo-400 hover:text-indigo-300 transition-colors"
                              title="Copy address"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => openInExplorer(record.txHash, record.chainId)}
                            className="p-1.5 bg-indigo-900/30 backdrop-blur-sm rounded-md border border-indigo-500/30 text-indigo-400 hover:text-indigo-300 transition-colors"
                            title="View in Explorer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Desktop Design */
                  <>
                    {/* Header */}
                    <div className="bg-indigo-900/40 sticky top-0 backdrop-blur-md z-10">
                      <div className="grid grid-cols-10 px-4 py-3">
                        <div className="text-left text-xs font-medium text-indigo-300 col-span-3">Network</div>
                        <div className="text-left text-xs font-medium text-indigo-300 col-span-5">Contract Address</div>
                        <div className="text-right text-xs font-medium text-indigo-300 col-span-2">Actions</div>
                      </div>
                    </div>
                    
                    {/* Body */}
                    <div className="bg-indigo-900/10 backdrop-blur-sm divide-y divide-indigo-800/20">
                      {paginatedHistory.length > 0 ? (
                        paginatedHistory.map((record, index) => (
                          <div 
                            key={index} 
                            className="grid grid-cols-10 px-4 py-3 hover:bg-indigo-800/20 transition-colors"
                          >
                            <div className="text-sm text-gray-200 flex items-center col-span-3">
                              <span className={`inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full ${
                                record.contractType.includes('Simple') 
                                  ? 'bg-green-500/20 border border-green-500/40' : 
                                record.contractType.includes('Token') 
                                  ? 'bg-blue-500/20 border border-blue-500/40' : 
                                  'bg-purple-500/20 border border-purple-500/40'
                              }`}>
                                {record.contractType.includes('Simple') && 
                                  <div className="h-2.5 w-2.5 rounded-full bg-green-400"></div>}
                                {record.contractType.includes('Token') && 
                                  <div className="h-2.5 w-2.5 rounded-full bg-blue-400"></div>}
                                {record.contractType.includes('NFT') && 
                                  <div className="h-2.5 w-2.5 rounded-full bg-purple-400"></div>}
                              </span>
                              
                              <div className="flex items-center">
                                {getChainLogo(record.chainId) ? (
                                  <div className="relative w-5 h-5 mr-2 rounded-full overflow-hidden bg-indigo-900/40 border border-indigo-500/30">
                                    <Image 
                                      src={getChainLogo(record.chainId) || ''} 
                                      alt={record.chainName}
                                      fill
                                      sizes="20px"
                                      className="object-contain"
                                    />
                                  </div>
                                ) : (
                                  <div className="w-5 h-5 mr-2 rounded-full bg-indigo-600/30 flex items-center justify-center text-xs text-indigo-300">
                                    {record.chainName.charAt(0)}
                                  </div>
                                )}
                                {record.chainName}
                              </div>
                            </div>
                            
                            <div className="text-sm text-gray-200 flex items-center col-span-5">
                              <div className="bg-indigo-900/30 backdrop-blur-sm px-2 py-1 rounded-md border border-indigo-500/30 flex items-center">
                                <span className="truncate max-w-[180px]">
                                  {record.contractAddress}
                                </span>
                                <button
                                  onClick={() => copyToClipboard(record.contractAddress)}
                                  className="ml-2 text-indigo-400 hover:text-indigo-300 transition-colors"
                                  title="Copy address"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-end gap-3 col-span-2">
                              <span className="text-xs text-indigo-400">{formatDate(record.timestamp)}</span>
                              <button
                                onClick={() => openInExplorer(record.txHash, record.chainId)}
                                className="text-indigo-400 hover:text-indigo-300 transition-colors"
                                title="View in Explorer"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-5 text-center text-indigo-400 backdrop-blur-md">
                          No matching deployments found
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center mt-3 sm:mt-4 px-2 gap-2">
                <div className="text-xs text-indigo-400 order-2 sm:order-1">
                  Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredHistory.length)} of {filteredHistory.length}
                </div>
                <div className="flex items-center gap-1 order-1 sm:order-2">
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`p-1.5 rounded-md backdrop-blur-md ${
                      currentPage === 1 
                        ? 'text-indigo-600 cursor-not-allowed' 
                        : 'text-indigo-400 hover:bg-indigo-900/40 hover:text-indigo-300'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    // Mobile: Just show current, prev, next when there are many pages
                    if (isMobile && totalPages > 5) {
                      if (
                        pageNum === currentPage ||
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        pageNum === currentPage - 1 ||
                        pageNum === currentPage + 1
                      ) {
                        return (
                          <button
                            key={i}
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-6 h-6 sm:w-7 sm:h-7 text-xs rounded-md backdrop-blur-md ${
                              currentPage === pageNum 
                                ? 'bg-indigo-600/50 text-white' 
                                : 'text-indigo-300 hover:bg-indigo-900/40'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      }
                      // Show ellipsis for skipped pages (only one ellipsis in mobile view)
                      if (
                        (pageNum === 2 && currentPage > 3) ||
                        (pageNum === totalPages - 1 && currentPage < totalPages - 2 && !isMobile)
                      ) {
                        return <span key={i} className="text-indigo-500">...</span>;
                      }
                      return null;
                    }
                    
                    // Desktop: Show more page numbers
                    if (
                      pageNum === 1 || 
                      pageNum === totalPages || 
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={i}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-6 h-6 sm:w-7 sm:h-7 text-xs rounded-md backdrop-blur-md ${
                            currentPage === pageNum 
                              ? 'bg-indigo-600/50 text-white' 
                              : 'text-indigo-300 hover:bg-indigo-900/40'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                    // Show ellipsis for skipped pages
                    if (
                      (pageNum === 2 && currentPage > 3) || 
                      (pageNum === totalPages - 1 && currentPage < totalPages - 2)
                    ) {
                      return <span key={i} className="text-indigo-500">...</span>;
                    }
                    return null;
                  })}
                  
                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`p-1.5 rounded-md backdrop-blur-md ${
                      currentPage === totalPages 
                        ? 'text-indigo-600 cursor-not-allowed' 
                        : 'text-indigo-400 hover:bg-indigo-900/40 hover:text-indigo-300'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-transparent backdrop-blur-md rounded-lg p-6 sm:p-10 text-center border border-indigo-500/30">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-indigo-900/30 border border-indigo-600/30 mb-3 sm:mb-4">
              <Search className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400/70" />
            </div>
            <p className="text-indigo-300 mb-1 text-sm sm:text-base">No deployment history yet</p>
            <p className="text-indigo-400/70 text-xs sm:text-sm">Your deployments will appear here once you deploy a contract</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistoryModal; 