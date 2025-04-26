interface Window {
  connectKit?: {
    openConnectModal: () => void;
    [key: string]: unknown;
  };
  ethereum?: {
    isConnected: () => boolean;
    request: (args: { method: string; params?: Array<unknown> }) => Promise<unknown>;
    [key: string]: unknown;
  };
}

// This allows JSX comments to be properly typed
declare namespace JSX {
  interface IntrinsicElements {
    // Support comment nodes in JSX
    'comment': React.DetailedHTMLProps<React.HTMLAttributes<HTMLUnknownElement>, HTMLUnknownElement>;
  }
} 