"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

export function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="flex items-center gap-3">
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
