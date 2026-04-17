"use client";

import { autoDiscover, SolanaClientConfig } from "@solana/client";
import { SolanaProvider } from "@solana/react-hooks";

const defaultConfig: SolanaClientConfig = {
    cluster: "devnet",
    rpc: "https://api.devnet.solana.com",
    websocket: "wss://api.devnet.solana.com",
    walletConnectors: autoDiscover(),
};

const SolProviders = ({children} : {children: React.ReactNode})=>{
    return (
        <SolanaProvider config={defaultConfig}>
{children}
        </SolanaProvider>
    )
}

export default SolProviders;