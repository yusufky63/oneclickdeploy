import React from 'react';
import { Copy, ExternalLink, X } from 'lucide-react';

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-b from-indigo-950/60 to-black/60 backdrop-blur-xl border border-indigo-500/30 rounded-2xl shadow-[0_10px_50px_rgba(99,102,241,0.15)] w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-white mb-6">
          Deployment History
        </h3>

        {deploymentHistory.length > 0 ? (
          <div className="overflow-auto max-h-[60vh] custom-scrollbar">
            <table className="w-full">
              <thead className="border-b border-indigo-600/30">
                <tr>
                  <th className="text-left p-3 text-sm font-medium text-gray-300">
                    Type
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-gray-300">
                    Network
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-gray-300">
                    Address
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-gray-300">
                    Date
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {deploymentHistory.map((record, index) => (
                  <tr
                    key={index}
                    className="border-b border-indigo-600/10 hover:bg-indigo-900/30"
                  >
                    <td className="p-3 text-sm text-gray-200">
                      {record.contractType}
                    </td>
                    <td className="p-3 text-sm text-gray-200">
                      {record.chainName}
                    </td>
                    <td className="p-3 text-sm text-gray-200">
                      <div className="flex items-center gap-1">
                        <span className="truncate max-w-[100px]">
                          {record.contractAddress}
                        </span>
                        <button
                          onClick={() =>
                            copyToClipboard(record.contractAddress)
                          }
                          className="text-indigo-400 hover:text-indigo-300"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="p-3 text-sm text-gray-200">
                      {formatDate(record.timestamp)}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() =>
                          openInExplorer(record.txHash, record.chainId)
                        }
                        className="text-indigo-400 hover:text-indigo-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <p>No deployment history yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistoryModal; 