// src/components/WagmiProviderClient.tsx

'use client';

import React from 'react';
import { RainbowKitProvider, connectorsForWallets, ConnectButton } from '@rainbow-me/rainbowkit';
import { injectedWallet, /* walletConnectWallet,*/ metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';
import { WagmiConfig } from 'wagmi';
import { chains, wagmiConfig } from '@/lib/dapps/wagmiConfig';

const WagmiProviderClient: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains} initialChain={365}>
                {children}
            </RainbowKitProvider>
        </WagmiConfig>
    );
};

export default WagmiProviderClient;
