"use client";

import { useAccount, useConnect, useDisconnect, useSwitchChain, useChainId } from "wagmi";
import { injected } from "wagmi/connectors";
import { arcTestnet } from "@/lib/wagmi";

export function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const chainId = useChainId();

  const isWrongNetwork = isConnected && chainId !== arcTestnet.id;

  if (isConnected && isWrongNetwork) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-red-500">Wrong Network</span>
        <button
          onClick={() => switchChain({ chainId: arcTestnet.id })}
          style={{background: '#e53e3e'}}
          className="px-3 py-1 text-sm text-white rounded-xl hover:opacity-90">
          Switch to ARC
        </button>
      </div>
    );
  }

  if (isConnected) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-xs px-2 py-1 rounded-lg" style={{background: '#B67E7D20', color: '#2E6B46'}}>ARC Testnet</span>
        <span className="text-sm" style={{color: '#2E6B46'}}>
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
        <button
          onClick={() => disconnect()}
          style={{border: '1px solid #2E6B46', color: '#2E6B46'}}
          className="px-3 py-1 text-sm rounded-xl hover:bg-green-50">
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: injected() })}
      style={{background: '#2E6B46'}}
      className="px-4 py-2 text-sm text-white rounded-xl hover:opacity-90">
      Connect Wallet
    </button>
  );
}
