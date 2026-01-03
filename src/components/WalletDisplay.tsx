'use client';

import { useWallet } from '@lazorkit/wallet';
import { useEffect, useState } from 'react';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getAccount, getAssociatedTokenAddress } from '@solana/spl-token';
import { LAZORKIT_CONFIG, USDC_MINT } from '@/lib/config';
import Image from 'next/image';

export function WalletDisplay() {
  const { wallet, isConnected } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [usdcBalance, setUsdcBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchBalance = async () => {
    if (!wallet) return;
    setLoading(true);
    try {
      const connection = new Connection(LAZORKIT_CONFIG.RPC_URL);
      const pubkey = new PublicKey(wallet.smartWallet);
      
      const lamports = await connection.getBalance(pubkey);
      setBalance(lamports / LAMPORTS_PER_SOL);

      try {
        const usdcMint = new PublicKey(USDC_MINT);
        const ata = await getAssociatedTokenAddress(usdcMint, pubkey);
        const tokenAccount = await getAccount(connection, ata);
        setUsdcBalance(Number(tokenAccount.amount) / 1_000_000);
      } catch (tokenError) {
        setUsdcBalance(0);
      }
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (wallet) {
      navigator.clipboard.writeText(wallet.smartWallet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    if (isConnected && wallet) {
      fetchBalance();
      const interval = setInterval(fetchBalance, 30000);
      return () => clearInterval(interval);
    }
  }, [isConnected, wallet]);

  if (!isConnected || !wallet) return null;

  return (
    <div className="glass-card p-8 shimmer relative overflow-hidden group">
      <div className="relative z-10 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
              <Image 
                src="https://img.icons8.com/fluent-systems-regular/48/38bdf8/wallet.png" 
                alt="Wallet" 
                width={20} 
                height={20}
              />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Smart Portfolio</h2>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{wallet.platform || 'Web'} Device</p>
            </div>
          </div>
          <button 
            onClick={fetchBalance}
            disabled={loading}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50 group/refresh"
          >
            <Image 
              src="https://img.icons8.com/fluent-systems-regular/48/94a3b8/refresh.png" 
              alt="Refresh" 
              width={18} 
              height={18}
              className={`${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`}
            />
          </button>
        </div>

        {/* Address Card */}
        <div className="bg-black/20 rounded-2xl p-4 border border-white/5">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Your Smart Address</label>
          <div className="flex items-center justify-between gap-4">
            <code className="text-sm font-mono text-slate-300 truncate tracking-tight">
              {wallet.smartWallet}
            </code>
            <button 
              onClick={copyToClipboard}
              className="shrink-0 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              {copied ? (
                <Image src="https://img.icons8.com/fluent-systems-regular/48/4ade80/checkmark.png" alt="Copied" width={16} height={16} />
              ) : (
                <Image src="https://img.icons8.com/fluent-systems-regular/48/94a3b8/copy.png" alt="Copy" width={16} height={16} />
              )}
            </button>
          </div>
        </div>

        {/* Balances */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-accent/30 transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <Image src="https://cryptologos.cc/logos/solana-sol-logo.png" alt="SOL" width={16} height={16} className="opacity-80" />
              <span className="text-xs font-bold text-slate-400">Solana</span>
            </div>
            <div className="text-xl font-bold text-white tracking-tight">
              {balance !== null ? balance.toFixed(4) : '--'}
              <span className="text-xs ml-1 text-slate-500">SOL</span>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-accent/30 transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <Image src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png" alt="USDC" width={16} height={16} />
              <span className="text-xs font-bold text-slate-400">USDC</span>
            </div>
            <div className="text-xl font-bold text-white tracking-tight">
              {usdcBalance !== null ? usdcBalance.toFixed(2) : '--'}
              <span className="text-xs ml-1 text-slate-500">USDC</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
