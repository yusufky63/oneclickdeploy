# OneClick Deployer

<div align="center">
  <img src="/public/logo.png" alt="OneClick Deployer Logo" width="150" />
  <h3>Deploy smart contracts with just one click.</h3>
</div>

OneClick Deployer is a user-friendly platform that allows you to deploy smart contracts to the blockchain quickly, without any coding knowledge. Perfect for developers, entrepreneurs, and blockchain enthusiasts who want to launch tokens or NFT collections without writing Solidity code.

## 📌 Contents

- [Features](#-features)
- [Screenshots](#-screenshots)
- [Contract Types](#️-contract-types)
- [How It Works](#-how-it-works)
- [Supported Wallets](#-supported-wallets)
- [Supported Networks](#-supported-networks)
- [Development](#-development)
- [Troubleshooting](#-troubleshooting)
- [Technologies](#-technologies)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## 🚀 Features

- **One-Click Deployment**: Deploy ERC20 tokens, ERC721 NFTs, and custom smart contracts in seconds
- **No Coding Required**: Easily create contracts with a user-friendly interface
- **Multi-Blockchain Support**: Deploy to Ethereum, Polygon, Arbitrum, Optimism, BNB Chain, and other popular blockchains
- **Mobile Wallet Support**: Connect from mobile devices via WalletConnect
- **Contract Customization**: Set token name, symbol, supply, and other parameters
- **Transaction History**: View and manage all your deployment transactions
- **Deployment Statistics**: View global deployment counts across all chains
- **Instant Sharing**: Share your deployed contracts on social media
- **Low Fees**: Complete your transactions with minimal gas fees

## 📷 Screenshots

<div align="center">
  <i>Add screenshots of your application here</i>
  <p>Visit <a href="https://oneclickdeploy.xyz">oneclickdeploy.xyz</a> to see the platform in action</p>
</div>

## 🛠️ Contract Types

1. **Simple Contract** 
   - A basic "Hello World" style smart contract
   - Useful for learning and testing deployment
   - No complex features, just a minimal contract

2. **Token Contract (ERC20)**
   - Customizable ERC20 standard token
   - Set name, symbol, and initial supply
   - Create your own cryptocurrency in seconds

3. **NFT Contract (ERC721)**
   - Customizable ERC721 standard NFT collection
   - Define collection name, symbol, and max supply
   - Launch your NFT project without coding

## 🔍 How It Works

1. **Connect Wallet** - Connect your Web3 wallet (MetaMask, WalletConnect, etc.)
2. **Select Network** - Choose your target blockchain network
3. **Choose Contract Type** - Select from simple contract, token, or NFT
4. **Customize Parameters** - Set name, symbol, supply, etc. based on contract type
5. **Deploy** - Click the deploy button and confirm the transaction in your wallet
6. **View & Share** - Once deployed, view your contract details and share with others

The deployment process uses ethers.js to interact with the blockchain and charges a minimal platform fee for each deployment, which can be adjusted per network.

## 📱 Supported Wallets

- **MetaMask** - Browser extension and mobile app
- **WalletConnect** - For mobile wallets like Trust Wallet and OKX Wallet
- **Coinbase Wallet** - For Coinbase users
- **Trust Wallet** - Mobile wallet
- **Rainbow** - iOS and Android wallet
- **And many more** EVM-compatible wallets

Mobile wallet support is enhanced with special provider detection to work around common issues with WalletConnect on mobile browsers.

## 🌐 Supported Networks

### Mainnets
- Ethereum
- Polygon
- Arbitrum
- Optimism
- BNB Chain
- Avalanche
- Base
- Linea
- Scroll

### Testnets
- Monad Testnet
- Somnia Testnet
...


Each network comes with faucet links and chain information to help users obtain test tokens when needed.

## 💻 Development

### Requirements

- Node.js v18 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mini-contract-deployer.git
cd mini-contract-deployer

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Building for Production

```bash
# Create a production build
npm run build

# Start the production server
npm start
```

## 🐛 Troubleshooting

### Common Issues

- **"Connect Wallet" button still shows after connecting on mobile** - This has been fixed with enhanced wallet detection for mobile browsers and WalletConnect
- **"Could not detect Ethereum provider" error on mobile** - The application now uses a robust provider detection system for mobile devices
- **Transaction rejection errors** - Check that you have sufficient funds for the transaction including gas fees
- **Network switching issues** - Some wallets may require manual network switching

For OKX Wallet and other mobile wallets, special fallback mechanisms have been implemented to ensure smooth operation.

## 🧑‍💻 Technologies

- **Next.js 13 App Router** - Modern React framework with server components
- **TypeScript** - For type safety and better developer experience
- **Tailwind CSS** - For responsive and beautiful UI components
- **ethers.js** - For blockchain interactions and contract deployment
- **wagmi** - React hooks for Ethereum
- **ConnectKit** - For wallet connection UI
- **WalletConnect** - For connecting mobile wallets
- **Supabase** - For tracking deployment statistics

## 👥 Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

MIT

## 📞 Contact

- Twitter: [@1ClickDeployer](https://x.com/1ClickDeployer)
- Website: [oneclickdeploy.xyz](https://oneclickdeploy.xyz)
- Email: contact@oneclickdeploy.xyz
