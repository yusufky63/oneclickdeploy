"use client";

import { ConnectKitButton } from "connectkit";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

interface ConnectButtonProps {
  className?: string;
}

export function ConnectButton({ className = "" }: ConnectButtonProps) {

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, address, ensName }) => {
        return (
          <Button
            onClick={show}
            className={`flex items-center gap-2 text-indigo-400 bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-600/30 shadow-[0_4px_20px_rgba(79,70,229,0.15)] rounded-xl ${className}`}
            variant="ghost"
          >
            <Wallet className="w-4 h-4" />
            {isConnected ? (
              <span className="truncate max-w-28">
                {ensName || `${address?.slice(0, 6)}...${address?.slice(-4)}`}
              </span>
            ) : isConnecting ? (
              "Connecting..."
            ) : (
              "Connect Wallet"
            )}
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
} 