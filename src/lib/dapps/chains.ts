export const theta = {
    id: 361,
    name: 'Theta Mainnet',
    network: 'theta',
    nativeCurrency: {
      decimals: 18,
      name: 'TFUEL',
      symbol: 'TFUEL',
    },
    rpcUrls: {
      public: { http: ['https://eth-rpc-api.thetatoken.org'] },
      default: { http: ['https://eth-rpc-api.thetatoken.org'] },
    },
    blockExplorers: {
      etherscan: { name: 'Theta Explorer', url: 'https://explorer.thetatoken.org/' },
      default: { name: 'Theta Explorer', url: 'https://explorer.thetatoken.org/' },
    },
  };
  
  export const thetaTestnet = {
    id: 365,
    name: 'Theta Testnet',
    network: 'theta',
    nativeCurrency: {
      decimals: 18,
      name: 'TFUEL',
      symbol: 'TFUEL',
    },
    rpcUrls: {
      public: { http: [' https://eth-rpc-api-testnet.thetatoken.org/rpc'] },
      default: { http: [' https://eth-rpc-api-testnet.thetatoken.org/rpc'] },
    },
    blockExplorers: {
      etherscan: { name: 'Theta Explorer', url: 'https://testnet-explorer.thetatoken.org/' },
      default: { name: 'Theta Explorer', url: 'https://testnet-explorer.thetatoken.org/' },
    },
  };
  
  
  export const sepolia = {
    id: 11155111,
    name: 'Sepolia',
    network: 'sepolia',
    nativeCurrency: {
      decimals: 18,
      name: 'Sepolia Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      public: { http: ['https://sepolia.infura.io/v3/22206d86398a42babb62eb33c1382a83'] },
      default: { http: ['https://sepolia.infura.io/v3/22206d86398a42babb62eb33c1382a83'] },
    },
    blockExplorers: {
      etherscan: { name: 'Etherscan', url: 'https://sepolia.etherscan.io' },
      default: { name: 'Etherscan', url: 'https://sepolia.etherscan.io' },
    },
  };
  
  