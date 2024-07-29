import { RainbowKitProvider, connectorsForWallets, ConnectButton } from '@rainbow-me/rainbowkit';
import { injectedWallet, /* walletConnectWallet,*/ metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';
import {
  useAccount,
  configureChains,
  createConfig,
  WagmiConfig,
  useContractRead,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useContractEvent
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public'
import { sepolia, theta, thetaTestnet } from "@/lib/dapps/chains";

export const { chains, publicClient } = configureChains([thetaTestnet, theta, sepolia], [publicProvider()]);


export const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ projectId: "foodcheckAi", chains }),
      injectedWallet({ chains }),
      // walletConnectWallet({ projectId: projectID, chains }),
    ],
  },
]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

