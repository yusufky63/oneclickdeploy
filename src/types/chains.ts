export interface NativeCurrency {
  name?: string;
  symbol: string;
  decimals: number;
}

export interface ChainLinks {
  website?: string;
  faucet?: string[];
  bridge?: string[];
}

export interface ChainFeatures {
  GM?: boolean;
  Deployer?: boolean;
  Counter?: boolean;
  ScoreMint?: boolean;
  TokenDeployer?: boolean;
  MultiSender?: boolean;
  NFTPass?: boolean;
  [key: string]: boolean | undefined;
}

export interface ChainContracts {
  GM?: string;
  Counter?: string;
  ScoreMint?: string;
  NFTPass?: string;
  MultiSender?: string;
  multicall3?: string;
}

export interface Chain {
  isRequireFees: boolean;
  isPopular: boolean;
  isSuperchain: boolean;
  isMainnet: boolean;
  enabled: boolean;
  features: {
    GM?: boolean;
    Deployer?: boolean;
    Counter?: boolean;
    ScoreMint?: boolean;
    TokenDeployer?: boolean;
    MultiSender?: boolean;
    NFTPass?: boolean;
    [key: string]: boolean | undefined;
  };
  chainId: number;
  chainName: string;
  nativeCurrency: {
    name?: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
  imageUrl: string;
  contracts?: {
    GM?: string;
    Counter?: string;
    ScoreMint?: string;
    NFTPass?: string;
    MultiSender?: string;
    multicall3?: string;
  };
  links?: {
    website?: string;
    faucet?: string[];
    bridge?: string[];
  };
  isNew?: boolean;
  isNFTPass?: boolean;
  isContractCorrupted?: boolean;
  explorerType?: 'etherscan' | 'routerscan' | 'blockscout';
  isFeeValue?: number;
}

export const SupportedChains: Record<string, Chain> = {
    base: {
        isRequireFees: true,
        isPopular: false,
        isSuperchain: true,
        
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 8453,
        chainName: "Base",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: [
          "https://mainnet.base.org",
          `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
        ],
        blockExplorerUrls: ["https://basescan.org"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/base.png",
        contracts: {
          GM: "0x10c54D44Dc4a77A8B1EEE460122F20a48FbdAE0f",
          Counter: "0x74514d3f1EfA8F31fDd51E69A6ae3e3B03fB1Acb",
          ScoreMint: "0x37Ab08CCE32F4A0BfbCcc0D63DdDDcB261C6625e",
        },
      },
      ink: {
        isRequireFees: true,
    
        isPopular: false,
        isSuperchain: true,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 57073,
        chainName: "Ink",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: [
          "https://rpc-gel.inkonchain.com",
          `https://ink-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
        ],
        
        blockExplorerUrls: ["https://explorer.inkonchain.com/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/kraken.png",
        contracts: {
          GM: "0xe72463F43F8530746f49537092724FA6e23DeEbB",
          Counter: "0x4C128D5942e7CcA0ce9027B3369772DA69852563",
          ScoreMint: "0x1290B4f2a419A316467b580a088453a233e9ADCc",
        },
      },
      optimism: {
        isRequireFees: true,
        isPopular: false,
        isSuperchain: true,
        
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 10,
        chainName: "Optimism",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: [
          "https://mainnet.optimism.io",
          `https://opt-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
        ],
  
        blockExplorerUrls: ["https://optimistic.etherscan.io"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/optimism.png",
        contracts: {
          GM: "0x764520AAd3C1714FeA37F883F1b9A0BB2e5D6c4E",
          Counter: "0xA05B4bF7c8664DaF2f43B2B6687382662850B52b",
          ScoreMint: "0x696c36cC66BD9Fba617aD9b9e1991837a960Ac5b",
        },
      },
      lisk: {
        isRequireFees: true,
        isPopular: false,
        isSuperchain: true,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 1135,
        chainName: "Lisk",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.api.lisk.com"],
        blockExplorerUrls: ["https://blockscout.lisk.com"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/lisk.png",
        contracts: {
          GM: "0x39AC01cB5a0dC809BC5be5d0b4B41C93F93ee407",
          Counter: "0x896258276E68B5f94F92DE870A6387414040c1BE",
          ScoreMint: "0x5C03D6DDFE8A748a22Ce8802eaB77cF911288E59",
        },
      },
      zora: {
        isPopular: false,
        isRequireFees: true,
        isSuperchain: true,
        
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 7777777,
        chainName: "Zora",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: [
          "https://rpc.zora.energy/",
    
          `https://zora-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
        ],
        blockExplorerUrls: ["https://explorer.zora.energy/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/zora.png",
        contracts: {
          GM: "0x314AB8D20087E87Af000EAc5f63bEb2d60Dbf03F",
          Counter: "0x9eedab4aAaB781A4967023c6B9f6d03a61D1093f",
          ScoreMint: "0x83C32D80c6eD522FB6dDd21133FdD0290ba47c82",
        },
      },
      cyber: {
        isRequireFees: true,
        isPopular: false,
        isSuperchain: true,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 7560,
        chainName: "Cyber",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://cyber.alt.technology/"],
        blockExplorerUrls: ["https://cyberscan.co/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/cyber.png",
        contracts: {
          GM: "0x632176D769aB950bb27cA00fDa81cfcb1886d082",
          Counter: "0xcD2ADE9312372852Bd2bEB957c02321616b81a26",
          ScoreMint: "0xd6b8a48Ff976E9c534B2ff8B8ba8bB8557be984b",
        },
      },
      mode: {
        isPopular: false,
        isRequireFees: true,
        isSuperchain: true,
        
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 34443,
        chainName: "Mode",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://mainnet.mode.network"],
        blockExplorerUrls: ["https://explorer.mode.network/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/mode.png",
        contracts: {
          GM: "0x4C128D5942e7CcA0ce9027B3369772DA69852563",
          Counter: "0x238DD945e50d3948EcCfEa9deCd77a59453e2299",
          ScoreMint: "0xe72463F43F8530746f49537092724FA6e23DeEbB",
        },
      },
      linea: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 59144,
        chainName: "Linea",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.linea.build"],
  
        blockExplorerUrls: ["https://lineascan.build/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/linea.png",
        contracts: {
          GM: "0x0F40f77c36aD1BF776EBa580d869a7C6C6A0334a",
          Counter: "0x86603290Eea49184dfbc0b3F0b5e447A796347fb",
          ScoreMint: "0x4f94909a4CF43A9c678488D7F2b095980065f5Ae",
        },
      },
      soneium: {
        isRequireFees: true,
    
        isPopular: true,
        isSuperchain: true,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 1868,
        chainName: "Soneium",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.soneium.org"],

        blockExplorerUrls: ["https://soneium.blockscout.com"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/soneium.png",
        contracts: {
          GM: "0xECF3365559FfE5fdBE1953df0A01244e234e4453",
          Counter: "0x4C128D5942e7CcA0ce9027B3369772DA69852563",
          ScoreMint: "0xd6b8a48Ff976E9c534B2ff8B8ba8bB8557be984b",
        },
      },
      arbitrum: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 42161,
        chainName: "Arbitrum",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://arb1.arbitrum.io/rpc"],
  
        blockExplorerUrls: ["https://arbiscan.io"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/arbitrum.png",
        contracts: {
          GM: "0x1536Ee5bcdce23F2949195Ffb78B01Eed15Cf3C5",
          Counter: "0xC0ca2f40CD590C6e3A9fdeDC362fcEE8552794eB",
          ScoreMint: "0x5878Ea5A72120A92821f77b2b6765eF46613F960",
        },
      },
      scroll: {
        isRequireFees: true,
    
        isPopular: false,
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 534352,
        chainName: "Scroll",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.scroll.io"],
  
        blockExplorerUrls: ["https://scrollscan.com/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/scroll.png",
        contracts: {
          GM: "0xc3d1e728dC0e0E9af9eC831a961Fb2C3De6C4B5f",
          Counter: "0xa7C27b74d1bbB6DaE3Ea8b2a329cAe2107B0D846",
          ScoreMint: "0x9e51CEc330a43dC7CBDc9c074c7199527F9FB8ed",
        },
      },
      unichain: {
        isPopular: true,
        isRequireFees: true,
    
        isSuperchain: true,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 130,
        chainName: "Unichain",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://mainnet.unichain.org"],
  
        blockExplorerUrls: ["https://uniscan.xyz/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/unichain.png",
        contracts: {
          GM: "0xd6b8a48Ff976E9c534B2ff8B8ba8bB8557be984b",
          Counter: "0xcD2ADE9312372852Bd2bEB957c02321616b81a26",
        },
      },
      bob: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: true,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 60808,
        chainName: "Bob",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.gobob.xyz"],

        blockExplorerUrls: ["https://explorer-bob-mainnet-0.t.conduit.xyz/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/bob.png",
        contracts: {
          GM: "0xd6b8a48Ff976E9c534B2ff8B8ba8bB8557be984b",
          Counter: "0x121054012f06809d98598397fA50f709957613e8",
        },
      },
      rari: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 1380012617,
        chainName: "Rari",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://mainnet.rpc.rarichain.org/http"],
  
        blockExplorerUrls: ["https://mainnet.explorer.rarichain.org/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/rari.png",
        contracts: {
          GM: "0xd6b8a48Ff976E9c534B2ff8B8ba8bB8557be984b",
          Counter: "0xfcF1E3e7890559c56013457e7073791ed27060a1",
        },
      },
      mint: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: true,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 185,
        chainName: "Mint",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.mintchain.io"],
        blockExplorerUrls: ["https://explorer.mintchain.io"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/mint.png",
        contracts: {
          GM: "0xd6b8a48Ff976E9c534B2ff8B8ba8bB8557be984b",
          Counter: "0xfcF1E3e7890559c56013457e7073791ed27060a1",
        },
      },
      blast: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 81457,
        chainName: "Blast",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.blast.io"],
        blockExplorerUrls: ["https://explorer.blast.io"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/blast.png",
        contracts: {
          GM: "0xb5C26aC4d32F7Cd705447d478A4E65830A2Bb3a8",
          Counter: "0x0f8cf161794e6b26F68265e0fc0b5f8439861dc6",
        },
      },
      taiko: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: false,
          ScoreMint: true,
          TokenDeployer: false,
        },
        chainId: 167000,
        chainName: "Taiko",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.taiko.xyz"],
        blockExplorerUrls: ["https://taikoscan.io/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/taiko.png",
        contracts: {
          GM: "0xd6b8a48Ff976E9c534B2ff8B8ba8bB8557be984b",
        },
      },
      worldchain: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: true,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 480,
        chainName: "Worldchain",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://480.rpc.thirdweb.com"],
        blockExplorerUrls: ["https://worldscan.org/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/world.png",
        contracts: {
          GM: "0xd6b8a48Ff976E9c534B2ff8B8ba8bB8557be984b",
          Counter: "0xfcF1E3e7890559c56013457e7073791ed27060a1",
        },
      },
      redstone: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: true,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 690,
        chainName: "Redstone",
        nativeCurrency: {
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.redstonechain.com"],
        blockExplorerUrls: ["https://explorer.redstone.xyz"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/redstone.png",
        contracts: {
          GM: "0xd6b8a48Ff976E9c534B2ff8B8ba8bB8557be984b",
          Counter: "0xfcF1E3e7890559c56013457e7073791ed27060a1",
        },
      },
      sonic: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 146,
        chainName: "Sonic",
        nativeCurrency: {
          name: "Sonic",
          symbol: "S",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.soniclabs.com"],
        blockExplorerUrls: ["https://146.routescan.io/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/sonic.png",
        contracts: {
          GM: "0xd6b8a48Ff976E9c534B2ff8B8ba8bB8557be984b",
          Counter: "0xcD2ADE9312372852Bd2bEB957c02321616b81a26",
        },
      },
      fraxtal: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 252,
        chainName: "Fraxtal",
        nativeCurrency: {
          symbol: "frxETH",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.frax.com"],
        blockExplorerUrls: ["https://fraxscan.com/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/fraxtal.png",
        contracts: {
          GM: "0xd6b8a48Ff976E9c534B2ff8B8ba8bB8557be984b",
        },
      },
      kroma: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 255,
        chainName: "Kroma",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://kroma.drpc.org"],
        blockExplorerUrls: ["https://explorer.kroma.network/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/kroma.png",
        contracts: {
          GM: "0xd6b8a48Ff976E9c534B2ff8B8ba8bB8557be984b",
          Counter: "0xfcF1E3e7890559c56013457e7073791ed27060a1",
        },
      },
      mantle: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 5000,
        chainName: "Mantle",
        nativeCurrency: {
          name: "MANTLE",
          symbol: "MNT",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.mantle.xyz"],
        blockExplorerUrls: ["https://explorer.mantle.xyz/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/mantle.png",
        contracts: {
          GM: "0xd6b8a48Ff976E9c534B2ff8B8ba8bB8557be984b",
          Counter: "0x1290B4f2a419A316467b580a088453a233e9ADCc",
        },
      },
      degen: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: false,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 666666666,
        chainName: "Degen",
        nativeCurrency: {
          name: "DEGEN",
          symbol: "DEGEN",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.degen.tips"],
        blockExplorerUrls: ["https://explorer.degen.tips/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/degen.png",
        contracts: {
          GM: "0xd6b8a48Ff976E9c534B2ff8B8ba8bB8557be984b",
          Counter: "0xECF3365559FfE5fdBE1953df0A01244e234e4453",
        },
      },
      orderly: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: true,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 291,
        chainName: "Orderly",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.orderly.network"],
        blockExplorerUrls: ["https://explorer.orderly.network/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/orderly.png",
        contracts: {
          GM: "0xd6b8a48Ff976E9c534B2ff8B8ba8bB8557be984b",
          Counter: "0xfcF1E3e7890559c56013457e7073791ed27060a1",
        },
      },
      sei: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 1329,
        chainName: "Sei",
        nativeCurrency: {
          name: "Sei",
          symbol: "SEI",
          decimals: 18,
        },
        rpcUrls: ["https://evm-rpc.sei-apis.com"],
        blockExplorerUrls: ["https://seitrace.com/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/sei.png",
        contracts: {
          GM: "0x632176D769aB950bb27cA00fDa81cfcb1886d082",
          Counter: "0xb4c9fcB1721Ea65dc26C92e7666E36f2FDdeA9Ce",
        },
      },
      xlayer: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 196,
        chainName: "Xlayer",
        nativeCurrency: {
          name: "OKB",
          symbol: "OKB",
          decimals: 18,
        },
        rpcUrls: ["https://xlayerrpc.okx.com"],
        blockExplorerUrls: ["https://explorer.xlayer.xyz/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/xlayer.png",
        contracts: {
          GM: "0x1290B4f2a419A316467b580a088453a233e9ADCc",
        },
      },
      avalanche: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 43114,
        chainName: "Avalanche",
        nativeCurrency: {
          name: "AVAX",
          symbol: "AVAX",
          decimals: 18,
        },
        rpcUrls: [
          "https://avalanche-c-chain-rpc.publicnode.com",
          "https://avalanche.drpc.org",
        ],
        blockExplorerUrls: ["https://snowtrace.io/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/avalanche.png",
        contracts: {
          GM: "0xd6b8a48ff976e9c534b2ff8b8ba8bb8557be984b",
          Counter: "0xcD2ADE9312372852Bd2bEB957c02321616b81a26",
        },
      },
      swell: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: true,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 1923,
        chainName: "Swell",
        nativeCurrency: {
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://swell-mainnet.alt.technology"],
        blockExplorerUrls: ["https://explorer.swellnetwork.io/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/swell.png",
        contracts: {
          GM: "0xd6b8a48Ff976E9c534B2ff8B8ba8bB8557be984b",
          Counter: "0x121054012f06809d98598397fA50f709957613e8",
        },
      },
      celo: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: true,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 42220,
        chainName: "Celo",
        nativeCurrency: {
          name: "CELO",
          symbol: "CELO",
          decimals: 18,
        },
        rpcUrls: ["https://forno.celo.org"],
        blockExplorerUrls: ["https://celoscan.io/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/celo.png",
        contracts: {
          GM: "0xd6b8a48Ff976E9c534B2ff8B8ba8bB8557be984b",
          Counter: "0x632176D769aB950bb27cA00fDa81cfcb1886d082",
        },
      },
      metal: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: true,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 1750,
        chainName: "Metal L2",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.metall2.com"],
        blockExplorerUrls: ["https://explorer.metall2.com/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/metal.png",
        contracts: {
          GM: "0xd6b8a48Ff976E9c534B2ff8B8ba8bB8557be984b",
          Counter: "0xfcF1E3e7890559c56013457e7073791ed27060a1",
        },
      },
      arena: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: true,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 7897,
        chainName: "Arena",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.arena-z.gg"],
        blockExplorerUrls: ["https://explorer.arena-z.gg/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/arena.png",
        contracts: {
          GM: "0xd6b8a48Ff976E9c534B2ff8B8ba8bB8557be984b",
          Counter: "0xfcF1E3e7890559c56013457e7073791ed27060a1",
        },
      },
      superseed: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: true,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 5330,
        chainName: "Superseed",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://mainnet.superseed.xyz"],
        blockExplorerUrls: ["https://explorer.superseed.xyz/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/superseed.png",
        contracts: {
          GM: "0xd6b8a48Ff976E9c534B2ff8B8ba8bB8557be984b",
          Counter: "0x121054012f06809d98598397fA50f709957613e8",
        },
      },
      zksync: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 324,
        chainName: "Zksync",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://mainnet.era.zksync.io"],
        blockExplorerUrls: ["https://explorer.zksync.io/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/zksync.png",
        contracts: {
          GM: "0x81d9f0c1b4931720337768ec5b5379131f4d9aeb",
          multicall3: "0xF9cda624FBC7e059355ce98a31693d299FACd963",
        },
      },
    
      monad: {
        links: {
          website: "https://monad.xyz/",
          faucet: [
            "https://faucet.monad.xyz/",
            "https://zkcodex.com/onchain/faucet",
            "https://www.gas.zip/faucet/monad",
            "https://thirdweb.com/monad-testnet",
            "https://www.fau.gg/faucet",
            "https://faucet.quicknode.com/monad/testnet",
            "https://faucet.trade/monad-testnet-mon-faucet",
          ],
        },
        isFeeValue: 0.000045,
        isRequireFees: true,
        isPopular: true,
        isSuperchain: false,
        isMainnet: false,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: true,
          TokenDeployer: true,
        },
        chainId: 10143,
        chainName: "Monad Testnet",
        nativeCurrency: {
          name: "Monad",
          symbol: "MON",
          decimals: 18,
        },
        rpcUrls: [
          "https://10143.rpc.thirdweb.com",
          "https://testnet-rpc.monad.xyz",
          `https://monad-testnet.g.alchemy.com/v2/6hAsuhqJZ4ecT3Ld2GAy8W0RUeFPFmyl`,
          "https://monad-testnet.drpc.org",
        ],
        blockExplorerUrls: ["https://testnet.monadexplorer.com"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/monad.png",
        
      },
    
      somnia: {
        links: {
          website: "https://testnet.somnia.network/",
          faucet: [
            "https://testnet.somnia.network/",
            "https://thirdweb.com/somnia-shannon-testnet",
            "https://www.gas.zip/faucet/somnia",
          ],
        },
        isRequireFees: false,
        isPopular: true,
        isSuperchain: false,
        isContractCorrupted: true,
        isMainnet: false,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 50312,
        chainName: "Somnia Testnet",
        nativeCurrency: {
          name: "STT",
          symbol: "STT",
          decimals: 18,
        },
        rpcUrls: [
          "https://dream-rpc.somnia.network/",
          "https://50312.rpc.thirdweb.com/",
          "https://rpc.ankr.com/somnia_testnet",
        ],
        blockExplorerUrls: ["https://shannon-explorer.somnia.network/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/somnia.png",
        contracts: {
          Counter: "0x44Eb59F5D0670d069B0188fBA0CB67c99b6B2DEB",
          GM: "0xd6b8a48Ff976E9c534B2ff8B8ba8bB8557be984b",
        },
      },
      alpha0: {
        isPopular: false,
        isRequireFees: false,
        isSuperchain: false,
        isMainnet: false,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 420120000,
        chainName: "Interop Devnet 0",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://interop-alpha-0.optimism.io"],
        blockExplorerUrls: ["https://optimism-interop-alpha-0.blockscout.com"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/optimism.png",
      },
    
      alpha1: {
        isPopular: false,
        isRequireFees: false,
        isSuperchain: false,
        isMainnet: false,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 420120001,
        chainName: "Interop Devnet 1",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://interop-alpha-1.optimism.io"],
        blockExplorerUrls: ["https://optimism-interop-alpha-1.blockscout.com"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/optimism.png",
      },
    
      lens: {
        isRequireFees: false,
        isPopular: false,
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 232,
        chainName: "Lens",
        nativeCurrency: {
          name: "GHO",
          symbol: "GHO",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.lens.xyz"],
        blockExplorerUrls: ["https://explorer.lens.xyz"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/lens.png",
        contracts: {
          multicall3: "0xC9A7A3762cC1073b40B19f7A333c046ce464e8Db",
        },
      },
      ethereum: {
        isPopular: false,
        isRequireFees: true,
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 1,
        chainName: "Ethereum",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: [
          "https://eth.drpc.org",
          "https://ethereum-rpc.publicnode.com",
          `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
        ],
        blockExplorerUrls: ["https://etherscan.io/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/ethereum.png",
        contracts: {
          GM: "0x40387e9A4Dce91a8e417e5190C5886D9AB8260F8",
          // Counter: "0x25529e0d5D13FD05D89BF9c2B99e83FFd1031492",
        },
      },
      polygon: {
        isPopular: false,
        isRequireFees: true,
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 137,
        chainName: "Polygon",
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18,
        },
        rpcUrls: [
          "https://rpc.ankr.com/polygon",
          "https://polygon.llamarpc.com",
    
          "https://polygon-rpc.com",
        ],
        blockExplorerUrls: ["https://polygonscan.com/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/polygon.png",
        contracts: {
          GM: "0xe72463F43F8530746f49537092724FA6e23DeEbB",
          Counter: "0xcD2ADE9312372852Bd2bEB957c02321616b81a26",
        },
      },
    
      polygonzkevm: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 1101,
        chainName: "Polygon zkEVM",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: [
          "https://zkevm-rpc.com",
          "https://polygon-zkevm.drpc.org",
          `https://polygonzkevm.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
        ],
        blockExplorerUrls: ["https://zkevm.polygonscan.com/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/polygon.png",
        contracts: {
          Counter: "0x121054012f06809d98598397fA50f709957613e8",
          GM: "0xECF3365559FfE5fdBE1953df0A01244e234e4453",
        },
      },
    
      berachain: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 80094,
        chainName: "Berachain",
        nativeCurrency: {
          name: "BERA",
          symbol: "BERA",
          decimals: 18,
        },
        rpcUrls: [
          "https://rpc.berachain.com",
    
          "https://berachain.drpc.org",
    
          "https://berachain-rpc.publicnode.com",
        ],
        blockExplorerUrls: ["https://berascan.com/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/berachain.png",
        contracts: {
          GM: "0xd6b8a48Ff976E9c534B2ff8B8ba8bB8557be984b",
          Counter: "0x1290B4f2a419A316467b580a088453a233e9ADCc",
        },
      },
      zetachain: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 7000,
        chainName: "ZetaChain",
        nativeCurrency: {
          name: "Zeta",
          symbol: "ZETA",
          decimals: 18,
        },
        rpcUrls: [
          "https://zetachain-evm.blockpi.network/v1/rpc/public",
          "https://zetachain-mainnet.public.blastapi.io",
          "https://zeta-chain.drpc.org",
          "https://7000.rpc.thirdweb.com",
        ],
        blockExplorerUrls: ["https://explorer.zetachain.com"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/zetachain.png",
      },
      polynomial: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: true,
        isMainnet: true,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 8008,
        chainName: "Polynomial",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.polynomial.fi"],
        blockExplorerUrls: ["https://explorer.polynomial.xyz"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/polynomial.png",
      },
    
      gnosis: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 100,
        chainName: "Gnosis",
        nativeCurrency: {
          name: "XDAI",
          symbol: "XDAI",
          decimals: 18,
        },
        rpcUrls: [
          "https://rpc.gnosischain.com",
          "https://gnosis.drpc.org",
          "https://gnosis-rpc.publicnode.com",
        ],
        blockExplorerUrls: ["https://gnosisscan.io/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/gnosis.png",
      },
      metis: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 1088,
        chainName: "Metis",
        nativeCurrency: {
          name: "METIS",
          symbol: "METIS",
          decimals: 18,
        },
        rpcUrls: [
          "https://metis-mainnet.public.blastapi.io",
          "https://metis.drpc.org",
          "https://metis-andromeda.rpc.thirdweb.com",
        ],
        blockExplorerUrls: ["https://explorer.metis.io/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/metis.png",
      },
      opbnb: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 204,
        chainName: "OPBNB",
        nativeCurrency: {
          name: "BNB",
          symbol: "BNB",
          decimals: 18,
        },
        rpcUrls: ["https://1rpc.io/opbnb"],
        blockExplorerUrls: ["https://opbnb.bscscan.com/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/bnb.png",
        contracts: {
          GM: "0xd6b8a48Ff976E9c534B2ff8B8ba8bB8557be984b",
          Counter: "0x1290B4f2a419A316467b580a088453a233e9ADCc",
        },
      },
      bnb: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 56,
        chainName: "BNB Smart Chain",
        nativeCurrency: {
          name: "BNB",
          symbol: "BNB",
          decimals: 18,
        },
        rpcUrls: [
          "https://bsc-mainnet.public.blastapi.io",
          "https://bsc-rpc.publicnode.com",
          "https://bsc-rpc.bnbchain.org",
          "https://bsc-rpc.drpc.org",
        ],
        blockExplorerUrls: ["https://bscscan.com/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/bnb.png",
      },
      abstract: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: false,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 2741,
        chainName: "Abstract",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://api.mainnet.abs.xyz", "https://abstract.drpc.org"],
        blockExplorerUrls: ["https://abscan.org/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/abstract.png",
      },
      // ancient8: {
      //   isPopular: false,
      //   isRequireFees: true,
    
      //   isSuperchain: false,
      //   isMainnet: true,
      //   enabled: true,
      //   features: {
      //     GM: false,
      //     Deployer: true,
      //     Counter: false,
      //     ScoreMint: false,
      //     TokenDeployer: false,
      //   },
      //   chainId: 888888888,
      //   chainName: "Ancient8",
      //   nativeCurrency: {
      //     name: "ETH",
      //     symbol: "ETH",
      //     decimals: 18,
      //   },
      //   rpcUrls: ["https://rpc.ancient8.gg"],
      //   blockExplorerUrls: ["https://scan.ancient8.gg/"],
      //   imageUrl:
      //     "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/ancient8.png",
      // },
      swanchain: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: true,
        isMainnet: true,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 254,
        chainName: "Swan Chain",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: [
          "https://mainnet-rpc.swanchain.org",
          "https://mainnet-rpc-01.swanchain.org",
        ],
        blockExplorerUrls: ["https://swanscan.io/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/swanchain.png",
      },
      corn: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 21000000,
        chainName: "Corn",
        nativeCurrency: {
          name: "BTCN",
          symbol: "BTCN",
          decimals: 18,
        },
        rpcUrls: ["https://mainnet.corn-rpc.com"],
        blockExplorerUrls: ["https://maizenet-explorer.usecorn.com"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/corn.png",
      },
      beam: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 4337,
        chainName: "Beam",
        nativeCurrency: {
          name: "BEAM",
          symbol: "BEAM",
          decimals: 18,
        },
        rpcUrls: [
          "https://build.onbeam.com/rpc",
          "https://subnets.avax.network/beam/mainnet/rpc",
        ],
        blockExplorerUrls: ["https://subnets.avax.network/beam"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/beam.png",
      },
      bobabnb: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 56288,
        chainName: "Boba BNB",
        nativeCurrency: {
          name: "BOBA",
          symbol: "BOBA",
          decimals: 18,
        },
        rpcUrls: ["https://bnb.boba.network"],
        blockExplorerUrls: ["https://bobascan.com/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/bobabnb.png",
      },
      nibiru: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 6900,
        chainName: "Nibiru",
        nativeCurrency: {
          name: "NIBI",
          symbol: "NIBI",
          decimals: 18,
        },
        rpcUrls: ["https://evm-rpc.nibiru.fi"],
        blockExplorerUrls: ["https://nibiscan.io/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/nibiru.png",
      },
      omni: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 166,
        chainName: "Omni",
        nativeCurrency: {
          name: "OMNI",
          symbol: "OMNI",
          decimals: 18,
        },
        rpcUrls: ["https://mainnet.omni.network"],
        blockExplorerUrls: ["https://omniscan.network/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/omni.png",
      },
      forma: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 984122,
        chainName: "Forma",
        nativeCurrency: {
          name: "TIA",
          symbol: "TIA",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.forma.art"],
        blockExplorerUrls: ["https://explorer.forma.art/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/forma.png",
      },
      vana: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 1480,
        chainName: "Vana",
        nativeCurrency: {
          name: "VANA",
          symbol: "VANA",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.vana.org", "https://evm-rpc-vana.j-node.net"],
        blockExplorerUrls: ["https://vanascan.io/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/vana.png",
      },
      story: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 1514,
        chainName: "Story",
        nativeCurrency: {
          name: "IP",
          symbol: "IP",
          decimals: 18,
        },
        rpcUrls: [
          "https://mainnet.storyrpc.io",
          "https://evmrpc.story.nodestake.org",
        ],
        blockExplorerUrls: ["https://www.storyscan.io/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/story.png",
      },
      hyperliquid: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 999,
        chainName: "HyperLiquid EVM",
        nativeCurrency: {
          name: "HYPE",
          symbol: "HYPE",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.hyperliquid.xyz/evm", "https://rpc.hypurrscan.io"],
        blockExplorerUrls: ["https://hyperliquid.cloud.blockscout.com/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/hyperliquid.png",
      },
      apechain: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 33139,
        chainName: "ApeChain",
        nativeCurrency: {
          name: "APE",
          symbol: "APE",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.apechain.com"],
        blockExplorerUrls: ["https://apescan.io/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/apechain.png",
      },
      morph: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 2818,
        chainName: "Morph",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.morphl2.io", "https://rpc-quicknode.morphl2.io"],
        blockExplorerUrls: ["https://explorer.morphl2.io/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/morph.png",
      },
    
      race: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: true,
        isMainnet: true,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 6805,
        chainName: "Race",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://racemainnet.io/"],
        blockExplorerUrls: ["https://racescan.io/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/race.png",
      },
      zircuit: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 48900,
        chainName: "Zircuit Mainnet",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://mainnet.zircuit.com"],
        blockExplorerUrls: ["https://explorer.zircuit.com/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/zircuit.png",
      },
      superposition: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 55244,
        chainName: "Superposition",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.superposition.so"],
        blockExplorerUrls: ["https://explorer.superposition.so/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/superposition.png",
        contracts: {
          GM: "0xd6b8a48Ff976E9c534B2ff8B8ba8bB8557be984b",
        },
      },
      flare: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 14,
        chainName: "Flare Mainnet",
        nativeCurrency: {
          name: "FLR",
          symbol: "FLR",
          decimals: 18,
        },
        rpcUrls: ["https://flare-api.flare.network/ext/C/rpc"],
        blockExplorerUrls: ["https://14.routescan.io/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/flare.png",
      },
      funki: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 33979,
        chainName: "Funki Mainnet",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://rpc-mainnet.funkichain.com/"],
        blockExplorerUrls: ["https://funkiscan.io/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/funki.png",
      },
      redbelly: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 151,
        chainName: "Redbelly",
        nativeCurrency: {
          name: "RBNT",
          symbol: "RBNT",
          decimals: 18,
        },
        rpcUrls: ["https://governors.mainnet.redbelly.network"],
        blockExplorerUrls: ["explorer"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/redbelly.png",
      },
      opsepolia: {
        isPopular: false,
        isRequireFees: false,
        isNFTPass: true,
        isSuperchain: false,
        isMainnet: false,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
          NFTPass: true,
        },
        chainId: 11155420,
        chainName: "OP Sepolia",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: [
          "https://sepolia.optimism.io",
          "https://optimism-sepolia.drpc.org",
        ],
        blockExplorerUrls: ["https://optimism-sepolia.blockscout.com/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/optimism.png",
        contracts: {
          NFTPass: "0xd6b8a48Ff976E9c534B2ff8B8ba8bB8557be984b",
        },
      },
      basesepolia: {
        isPopular: false,
        isRequireFees: false,
        isNFTPass: true,
        isSuperchain: false,
        isMainnet: false,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
          MultiSender: true,
          NFTPass: true,
        },
        chainId: 84532,
        chainName: "Base Sepolia ",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: [
          "https://sepolia.base.org",
          "https://base-sepolia-rpc.publicnode.com",
        ],
        blockExplorerUrls: ["https://base-sepolia.blockscout.com/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/base.png",
        contracts: {
          MultiSender: "0x632176D769aB950bb27cA00fDa81cfcb1886d082",
          NFTPass: "0x07080d12B4AEf233aEa98871c8E36FdD8ecd0528",
        },
      },
      gravity: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 1625,
        chainName: "Gravity Alpha",
        nativeCurrency: {
          name: "G",
          symbol: "G",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.gravity.xyz", "https://rpc.ankr.com/gravity"],
        blockExplorerUrls: ["https://explorer.gravity.xyz/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/gravity.png",
      },
      moonriver: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 1285,
        chainName: "Moonriver",
        nativeCurrency: {
          name: "MOVR",
          symbol: "MOVR",
          decimals: 18,
        },
        rpcUrls: [
          "https://moonriver.drpc.org",
          "https://moonriver-rpc.publicnode.com",
        ],
        blockExplorerUrls: ["https://moonriver.moonscan.io/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/moonriver.png",
      },
      pulse: {
        isPopular: false,
        isRequireFees: true,
    
        isSuperchain: false,
        isMainnet: true,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 369,
        chainName: "PulseChain",
        nativeCurrency: {
          name: "PLS",
          symbol: "PLS",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.pulsechain.com"],
        blockExplorerUrls: ["https://otter.pulsechain.com/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/pulse.png",
      },
    
      megaeth: {
        links: {
          website: "https://megaeth.com/",
          faucet: ["https://faucet.megaeth.com/"],
        },
        isPopular: true,
        isRequireFees: false,
        isSuperchain: false,
        isMainnet: false,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 6342,
        chainName: "MegaETH Testnet",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: [
          "https://carrot.megaeth.com/rpc",
          "https://6342.rpc.thirdweb.com/",
        ],
        blockExplorerUrls: ["https://megaexplorer.xyz"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/megaeth.png",
        contracts: {
          Counter: "0x632176D769aB950bb27cA00fDa81cfcb1886d082",
          GM: "0xECF3365559FfE5fdBE1953df0A01244e234e4453",
        },
      },
    
      fluent: {
        isNew: false,
        isRequireFees: false,
        isPopular: false,
        isSuperchain: false,
        isMainnet: false,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 20993,
        chainName: "Fluent Developer",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.dev.gblend.xyz"],
        blockExplorerUrls: ["https://blockscout.dev.gblend.xyz/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/fluent.png",
      },
    
      sahara: {
        links: {
          website: "https://saharalabs.ai/",
          faucet: ["https://faucet.saharalabs.ai/"],
        },
        isNew: false,
        isRequireFees: false,
        isPopular: false,
        isSuperchain: false,
        isMainnet: false,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 313313,
        chainName: "Sahara AI Testnet",
        nativeCurrency: {
          name: "SAH",
          symbol: "SAH",
          decimals: 18,
        },
        rpcUrls: ["https://testnet.saharalabs.ai"],
        blockExplorerUrls: ["https://explorer2.saharaa.info"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/sahara.png",
        contracts: {
          GM: "0x1290B4f2a419A316467b580a088453a233e9ADCc",
          Counter: "0xfcF1E3e7890559c56013457e7073791ed27060a1",
        },
      },
    
      og: {
        links: {
          website: "https://0g.ai/",
          faucet: [
            "https://hub.0g.ai/faucet",
            "https://thirdweb.com/0g-newton-testnet",
          ],
        },
        isNew: false,
        isRequireFees: false,
        isPopular: true,
        isSuperchain: false,
        isMainnet: false,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 16600,
        chainName: "0G Newton",
        nativeCurrency: {
          name: "A0GI",
          symbol: "A0GI",
          decimals: 18,
        },
        rpcUrls: ["https://evmrpc-testnet.0g.ai", "https://16600.rpc.thirdweb.com"],
        blockExplorerUrls: ["https://chainscan-newton.0g.ai"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/og.png",
      },
    
      recall: {
        isNew: true,
        isRequireFees: false,
        isPopular: true,
        isSuperchain: false,
        isMainnet: false,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 2481632,
        chainName: "Recall",
        nativeCurrency: {
          name: "RECALL",
          symbol: "RECALL",
          decimals: 18,
        },
        rpcUrls: ["https://evm.testnet.recall.chain.love"],
        blockExplorerUrls: ["https://explorer.testnet.recall.network/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/recall.png",
      },
    
      rise: {
        links: {
          website: "https://portal.risechain.com/",
          faucet: [
            "https://portal.risechain.com/",
            "https://www.gas.zip/faucet/rise",
          ],
        },
        isNew: true,
        isRequireFees: true,
        isPopular: true,
        isSuperchain: false,
        isMainnet: false,
        enabled: true,
        features: {
          GM: true,
          Deployer: true,
          Counter: true,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 11155931,
        chainName: "Rise Testnet",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://testnet.riselabs.xyz/"],
        blockExplorerUrls: ["https://explorer.testnet.riselabs.xyz/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/rise.png",
        contracts: {
          GM: "0x1290B4f2a419A316467b580a088453a233e9ADCc",
          Counter: "0xd6b8a48Ff976E9c534B2ff8B8ba8bB8557be984b",
        },
      },
    
      chainbase: {
        links: {
          website: "https://chainbase.com/",
          bridge: ["https://testnet.bridge.chainbase.com/"],
        },
        isNew: true,
        isRequireFees: true,
        isPopular: true,
        isSuperchain: false,
        isMainnet: false,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 2233,
        chainName: "Chainbase Testnet",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://testnet.s.chainbase.com"],
        blockExplorerUrls: ["https://testnet.explorer.chainbase.com/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/chainbase.png",
        contracts: {
          GM: "0xd6b8a48Ff976E9c534B2ff8B8ba8bB8557be984b",
          Counter: "0x1290B4f2a419A316467b580a088453a233e9ADCc",
        },
      },
    
      //   Ağ URL adresi
      // https://rpc.testnet.humanity.org
      // Zincir Kimliği
      // 1942999413
      // Ağ adı
      // Humanity Testnet
      // Blok Gezgini URL Adresi
      // https://explorer.testnet.humanity.org
    
      humanityprotocol: {
        links: {
          website: "https://humanity.org/",
          faucet: ["https://faucet.humanity.org/"],
        },
        isNew: true,
        isRequireFees: false,
        isPopular: true,
        isSuperchain: false,
        isMainnet: false,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 1942999413,
        chainName: "Humanity Testnet",
        nativeCurrency: {
          name: "tHP",
          symbol: "tHP",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.testnet.humanity.org"],
        blockExplorerUrls: ["https://explorer.testnet.humanity.org/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/humanityprotocol.png",
      },
    
      //   Para Birimi Sembolü
      // NEX
    
      // Ağ URL adresi
      // https://rpc.nexus.xyz/http
      // Zincir Kimliği
      // 393
      // Ağ adı
      // Nexus Devnet
      // Blok Gezgini URL Adresi
      // https://explorer.nexus.xyz
    
      nexus: {
        links: {
          website: "https://app.nexus.xyz/",
          faucet: ["https://app.nexus.xyz/"],
        },
        isNew: true,
        isRequireFees: false,
        isPopular: true,
        isSuperchain: false,
        isMainnet: false,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 393,
        chainName: "Nexus Devnet",
        nativeCurrency: {
          name: "NEX",
          symbol: "NEX",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.nexus.xyz/http"],
        blockExplorerUrls: ["https://explorer.nexus.xyz"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/nexus.png",
      },
    
      seismicdevnet: {
        links: {
          website: "https://www.seismic.systems/",
          faucet: ["https://faucet-2.seismicdev.net/"],
        },
        isNew: true,
        isRequireFees: true,
        isPopular: true,
        isSuperchain: false,
        isMainnet: false,
        enabled: true,
        isContractCorrupted: true,
    
        features: {
          GM: true,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 5124,
        chainName: "Seismic Devnet",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://node-2.seismicdev.net/rpc"],
        blockExplorerUrls: ["https://explorer-2.seismicdev.net"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/seismic.png",
       
      },
    
      kiteai: {
        links: {
          website: "https://gokite.ai/",
          faucet: ["https://faucet.gokite.ai/"],
        },
        isNew: true,
        isRequireFees: false,
        isPopular: true,
        isSuperchain: false,
        isMainnet: false,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
          ScoreMint: false,
          TokenDeployer: false,
        },
        chainId: 2368,
        chainName: "KiteAI Testnet",
        nativeCurrency: {
          name: "KITE",
          symbol: "KITE",
          decimals: 18,
        },
        rpcUrls: ["https://rpc-testnet.gokite.ai/"],
        blockExplorerUrls: ["https://testnet.kitescan.ai/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/kite.png",
      },
    
      //   Para Birimi Sembolü
      // VG
      // Bu token sembolü, girilen ağ adı veya zincir kimliği ile uyumlu değil. Pek çok popüler token benzer sembolleri kullanır ve dolandırıcılar, karşılığında daha değerli bir token gönderecekleri yönünde sizi kandırmak için bunları kullanabilirler. Devam etmeden önce her şeyi doğrulayın.
    
      // Ağ URL adresi
      // https://rpc-vanguard.vanarchain.com
      // Zincir Kimliği
      // 78600
      // Ağ adı
      // Vanguard
      // Blok Gezgini URL Adresi
      // https://explorer-vanguard.vanarchain.com/
    
      vanarchain: {
        links: {
          website: "https://vanarchain.com/",
          faucet: ["https://faucet.vanarchain.com/"],
        },
        isNew: true,
        isRequireFees: false,
        isPopular: true,
        isSuperchain: false,
        isMainnet: false,
        enabled: true,
        features: {
          GM: false,
          Deployer: true,
          Counter: false,
        },
        chainId: 78600,
        chainName: "Vanar Vanguard",
        nativeCurrency: {
          name: "VG",
          symbol: "VG",
          decimals: 18,
        },
        rpcUrls: ["https://rpc-vanguard.vanarchain.com"],
        blockExplorerUrls: ["https://explorer-vanguard.vanarchain.com/"],
        imageUrl:
          "https://raw.githubusercontent.com/zkcodex/zkCodex-Assets/refs/heads/main/Icons/vanarchain.png",
      },
};

// Convert SupportedChains object to an array of chain objects with id and testnet fields
export const chains = Object.entries(SupportedChains).map(([key, value]) => ({
  ...value,
  id: value.chainId,
  name: value.chainName,
  testnet: value.isMainnet === false,
  enabled: value.enabled !== false,
  key,
}));

export function getChainById(id: number): Chain | undefined {
  return chains.find((chain) => chain.id === id);
}

export function getTestnets(): Chain[] {
  return chains.filter((chain) => !chain.isMainnet);
}

export function getMainnets(): Chain[] {
  return chains.filter((chain) => chain.isMainnet);
}

export function getSupportedChainsForFeature(feature: string): string[] {
  return chains
    .filter((chain) =>
      Object.keys(chain.features || {}).some(
        (f) => f.toLowerCase() === feature.toLowerCase() && chain.features[f]
      )
    )
    .map((chain) => chain.chainName);
}

export function isFeatureSupported(chainId: number, feature: string): boolean {
  const chain = chains.find((chain) => chain.id === chainId);
  if (!chain || !chain.features) return false;
  return Object.keys(chain.features).some(
    (f) => f.toLowerCase() === feature.toLowerCase() && chain.features[f]
  );
}

export function getDefaultChain(): Chain {
  return chains[0];
}

export function isChainEnabled(chainId: number): boolean {
  const chain = chains.find((chain) => chain.id === chainId);
  return !!(chain && chain.enabled);
} 