import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Chain } from '@/types/chains';

interface ChainInfoLinksProps {
  chain: Chain | null;
}

export default function ChainInfoLinks({ chain }: ChainInfoLinksProps) {
  if (!chain || !chain.links) return null;

  const hasWebsite = chain.links.website;
  const hasBridges = chain.links.bridge && chain.links.bridge.length > 0;

  if (!hasWebsite && !hasBridges) return null;

  return (
    <div className="space-y-3">
      {hasWebsite && (
        <div className="p-3 rounded-lg border border-indigo-600/20 bg-indigo-900/20">
          <h4 className="text-sm font-medium text-indigo-300 mb-2">Website</h4>
          <a 
            href={chain.links.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 text-xs flex items-center"
          >
            <span className="break-all">{chain.links.website}</span>
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </div>
      )}

      {hasBridges && (
        <div className="p-3 rounded-lg border border-indigo-600/20 bg-indigo-900/20">
          <h4 className="text-sm font-medium text-indigo-300 mb-2">Bridge</h4>
          <div className="space-y-1">
            {chain.links.bridge?.map((url, index) => (
              <a 
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 text-xs flex items-center"
              >
                <span className="break-all">{url}</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 