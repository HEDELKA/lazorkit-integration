'use client';

import { useWallet } from '@lazorkit/wallet';
import { useState } from 'react';
import Image from 'next/image';

/**
 * ConnectButton component that handles Passkey-based authentication.
 * Manages the connection state and displays biometric authentication prompts.
 */
export function ConnectButton() {
  const { connect, disconnect, isConnected, isConnecting, wallet } = useWallet();
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    try {
      setError(null);
      await connect({ feeMode: 'paymaster' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed');
      console.error('Connection error:', err);
    }
  };

  const handleDisconnect = async () => {
    try {
      setError(null);
      await disconnect();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Disconnect failed');
    }
  };

  if (isConnected && wallet) {
    return (
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Connected Wallet</span>
          <span className="text-sm font-mono text-slate-300">
            {wallet.smartWallet.slice(0, 4)}...{wallet.smartWallet.slice(-4)}
          </span>
        </div>
        <button
          onClick={handleDisconnect}
          className="group relative flex items-center justify-center p-2 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-all duration-300"
          title="Disconnect Wallet"
        >
          <Image 
            src="https://img.icons8.com/?id=gH60rKrZnbX9&format=png&size=48&color=FA5252" 
            alt="Logout" 
            width={20} 
            height={20}
            className="opacity-70 group-hover:opacity-100 transition-opacity"
          />
        </button>
      </div>
    );
  }

  return (
    <div className="relative group">
      {error && (
        <div className="absolute bottom-full mb-3 right-0 w-64 p-3 glass-card bg-red-950/20 border-red-500/30 text-xs text-red-200 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex gap-2 items-start">
            <span className="shrink-0">⚠️</span>
            <p>{error}</p>
          </div>
        </div>
      )}
      
      <button
        onClick={handleConnect}
        disabled={isConnecting}
        className="relative shimmer px-6 py-2.5 rounded-xl bg-accent hover:bg-[#7dd3fc] disabled:bg-slate-800 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-accent/20 active:scale-95 group"
      >
        <div className="relative flex items-center gap-2.5">
          {isConnecting ? (
            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Image 
              src="https://img.icons8.com/?id=PU4roiu8ELp5&format=png&size=48&color=ffffff" 
              alt="Passkey" 
              width={18} 
              height={18}
            />
          )}
          <span className="text-sm font-bold text-white tracking-tight">
            {isConnecting ? 'Authenticating...' : 'Connect Wallet'}
          </span>
        </div>
      </button>

      {isConnecting && (
        <div className="absolute top-full mt-3 right-0 w-64 p-4 glass-card border-accent/20 text-center animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col items-center gap-3">
             <div className="relative h-10 w-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping" />
                <Image 
                  src="https://img.icons8.com/?id=3RlCu6GGhMC3&format=png&size=48&color=38bdf8" 
                  alt="Biometric" 
                  width={24} 
                  height={24}
                />
             </div>
             <p className="text-[11px] font-medium text-slate-300 leading-relaxed">
               Waiting for biometric authentication on your device...
             </p>
          </div>
        </div>
      )}
    </div>
  );
}
