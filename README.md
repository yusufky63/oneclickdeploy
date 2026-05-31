# OneClick Deployer

OneClick Deployer is a no-code smart contract deployment tool for launching ERC-20 tokens, ERC-721 NFTs, and simple contracts across supported chains.

## Snapshot

- **Category:** No-code smart contract deployment
- **Status:** Public repository
- **Live:** https://oneclickdeploy-flame.vercel.app
- **Repository:** https://github.com/yusufky63/oneclickdeploy
- **Portfolio:** https://codexsha.dev

## Product Scope

OneClick Deployer is documented here as a product repository, not just a code dump. The goal of this README is to make the product purpose, runtime surface, and development path clear for future review and maintenance.

## Core Capabilities

- No-code ERC-20 and ERC-721 deployment
- Multi-chain wallet connection
- Deployment history and statistics
- Shareable contract launch flow
- Supported wallet and network documentation

## Existing README Coverage Preserved

This refresh keeps the important project-specific areas from the previous documentation:

- Contents
- Features
- Screenshots
- Contract Types
- How It Works
- Supported Wallets
- Supported Networks
- Development

## Tech Stack

- Next.js
- TypeScript
- Ethers
- Wagmi
- Viem
- Supabase
- ConnectKit
- Radix UI
- Web3.js

## Repository Map

| Path | Purpose |
| --- | --- |
| src/app/ | App routes and deployment flows |
| src/components/ | Contract form and wallet UI |
| src/lib/ | Contract deployment/Web3 helpers |
| public/ | Logo and browser assets |

## Local Development

| Command | Purpose |
| --- | --- |
| npm run dev | Run local dev server |
| npm run build | Build production app |
| npm run start | Start production server |
| npm run lint | Run lint checks |

## Environment Notes

Use local environment files for secrets and deployment-specific values. Do not commit real keys.

- Supabase credentials
- Wallet connector configuration
- RPC/provider URLs

## Operational Notes

- Keep this README aligned with the live product and portfolio copy.
- Prefer small, documented changes over large undocumented rewrites.
- This keeps the useful contract/network focus from the old README while making setup and ownership clearer.

## Maintainer

Built by Yusuf / Codexsha.

- GitHub: https://github.com/yusufky63
- X: https://x.com/codexsha
- Telegram: https://t.me/codexsha
