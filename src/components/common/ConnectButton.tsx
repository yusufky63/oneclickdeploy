"use client";

import { ConnectKitButton } from "connectkit";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useEffect, useState } from "react";

interface ConnectButtonProps {
  className?: string;
}

export function ConnectButton({ className = "" }: ConnectButtonProps) {
  // Add state to track provider status
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  
  // Check if Ethereum provider exists
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasProvider(!!window.ethereum);
    }
  }, []);

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, address, ensName }) => {
        // Enhanced connection status check - ÖNEMLI: WalletConnect hatası için geçici çözüm
        // Adres varsa bağlı kabul ediyoruz, isConnected false olsa bile
        const isReallyConnected = (isConnected || !!address) && hasProvider;
        
        // Address varsa ve show'a tıklandığında bağlantı modalını göstermek yerine, wallet disconnect'i göstersin
        const handleClick = () => {
          // Eğer adres varsa ama isConnected false ise, bu WalletConnect hatası demektir
          // Bu durumda yine de show'u çağıracağız, ama kullanıcıya bir mesaj gösterelim
          if (!!address && !isConnected && hasProvider) {
            console.log("WalletConnect sorunu: Adres var ama isConnected false");
            // Kullanıcıya bir mesaj göstermek isterseniz, bir alert veya toast ekleyebilirsiniz
          }
          if (typeof show === 'function') {
            show();
          }
        };
        
        return (
          <Button
            onClick={handleClick}
            className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-indigo-500/30 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-300 hover:text-indigo-200 transition-colors ${className}`}
            variant="ghost"
          >
            <Wallet className="w-3 h-3 sm:w-4 sm:h-4" />
            {isReallyConnected ? (
              <span className="text-xs sm:text-sm font-medium truncate max-w-28">
                {ensName || `${address?.slice(0, 6)}...${address?.slice(-4)}`}
              </span>
            ) : isConnecting ? (
              <span className="text-xs sm:text-sm font-medium">Connecting...</span>
            ) : (
              <span className="text-xs sm:text-sm font-medium">Connect Wallet</span>
            )}
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
} 