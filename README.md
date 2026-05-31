# OneClick Deployer

OneClick Deployer is a no-code smart contract deployment tool for launching ERC-20 tokens, ERC-721 NFTs, and simple contract templates across supported EVM networks.

It focuses on a creator-friendly deployment flow: choose a contract type, configure fields, connect a wallet, deploy, and track the result.

## Contents

- Features
- Contract Types
- How It Works
- Supported Wallets
- Supported Networks
- Development

## Features

- No-code contract deployment UI.
- ERC-20 token launch configuration.
- ERC-721 NFT contract configuration.
- Multi-chain wallet connection and network selection.
- Deployment history, stats, and shareable deployment result flow.
- Supabase-backed persistence for app/deployment data.

## Contract Types

| Type | Typical fields |
| --- | --- |
| ERC-20 Token | Name, symbol, supply, decimals, owner/admin configuration. |
| ERC-721 NFT | Name, symbol, base URI/metadata, collection settings. |
| Simple contracts | Lightweight templates for quick EVM deployment experiments. |

## How It Works

1. Select a contract template.
2. Fill the required contract configuration.
3. Connect a supported wallet.
4. Confirm deployment transaction on the selected network.
5. Store and display deployment details for review and sharing.

## Supported Wallets

- ConnectKit-compatible wallets.
- Wagmi/Viem/Ethers compatible injected wallets.
- WalletConnect-compatible flows depending on runtime configuration.

## Supported Networks

The app is designed for EVM networks and can be configured for mainnets and testnets through wallet/network settings. Keep production and test deployment configuration separate.

| Layer | Tools |
| --- | --- |
| Frontend | Next.js, React, TypeScript, Tailwind CSS, Radix UI, Lucide React |
| Wallet/Web3 | ConnectKit, Wagmi, Viem, Ethers, Web3.js |
| Data | Supabase, React Query |
| UI Utilities | cmdk, class-variance-authority, tailwind-merge, Radix primitives |

## Development

### Requirements

- Node.js and npm.
- Wallet with test funds for non-production deployment testing.
- Supabase project/configuration when using persistence features.

### Installation

```bash
npm install
npm run dev
```

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Build for production. |
| `npm start` | Run the production server. |
| `npm run lint` | Run lint checks. |

## Environment Variables

Use local environment files for Supabase, wallet, RPC, and deployment-related configuration. Never commit private keys or production secrets.

## Status

- Repository: https://github.com/yusufky63/oneclickdeploy
- Live app: https://oneclickdeploy-flame.vercel.app
