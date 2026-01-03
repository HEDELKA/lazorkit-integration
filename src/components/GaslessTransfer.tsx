"use client";

import { useWallet } from "@lazorkit/wallet";
import { useCallback, useState, useEffect } from "react";
import {
  Connection,
  PublicKey,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { LAZORKIT_CONFIG, DEMO_RECIPIENT } from "@/lib/config";
import { TransactionHistory } from "@/types";
import Image from "next/image";

interface TransferState {
  recipient: string;
  amount: string;
  isLoading: boolean;
  error: string | null;
  success: string | null;
  txHistory: TransactionHistory[];
}

export function GaslessTransfer() {
  const { wallet, signAndSendTransaction, isConnected } = useWallet();
  const [state, setState] = useState<TransferState>({
    recipient: DEMO_RECIPIENT,
    amount: "0.1",
    isLoading: false,
    error: null,
    success: null,
    txHistory: [],
  });

  useEffect(() => {
    const savedHistory = localStorage.getItem("tx-history");
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setState((prev) => ({ ...prev, txHistory: parsedHistory }));
      } catch (error) {
        console.error("Failed to parse tx history:", error);
      }
    }
  }, []);

  const handleTransfer = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!wallet || !signAndSendTransaction) {
        setState((prev) => ({ ...prev, error: "Wallet not connected" }));
        return;
      }

      if (!state.recipient || !state.amount) {
        setState((prev) => ({ ...prev, error: "Please fill in all fields" }));
        return;
      }

      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
        success: null,
      }));

      try {
        let recipientPubkey: PublicKey;
        try {
          recipientPubkey = new PublicKey(state.recipient);
        } catch {
          throw new Error("Invalid recipient address");
        }

        const lamports = Math.round(
          parseFloat(state.amount) * LAMPORTS_PER_SOL
        );
        if (lamports <= 0) {
          throw new Error("Amount must be greater than 0");
        }

        const instruction = SystemProgram.transfer({
          fromPubkey: new PublicKey(wallet.smartWallet),
          toPubkey: recipientPubkey,
          lamports,
        });

        const signature = await signAndSendTransaction({
          instructions: [instruction],
          transactionOptions: {
            feeToken: "USDC",
            computeUnitLimit: 200000,
            clusterSimulation: (LAZORKIT_CONFIG.NETWORK === "devnet"
              ? "devnet"
              : "mainnet") as "devnet" | "mainnet",
          },
        });

        const newTx: TransactionHistory = {
          signature,
          timestamp: Date.now(),
          type: "transfer",
          amount: parseFloat(state.amount),
          status: "pending",
        };

        setState((prev) => ({
          ...prev,
          txHistory: [newTx, ...prev.txHistory],
          success: `Transaction broadcasted successfully!`,
          recipient: DEMO_RECIPIENT,
          amount: "0.1",
        }));

        localStorage.setItem(
          "tx-history",
          JSON.stringify([newTx, ...state.txHistory])
        );

        setTimeout(() => checkTxStatus(signature), 5000);
      } catch (error) {
        const errorMsg =
          error instanceof Error ? error.message : "Transfer failed";
        setState((prev) => ({ ...prev, error: errorMsg }));
        console.error("Transfer error:", error);
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [
      wallet,
      signAndSendTransaction,
      state.recipient,
      state.amount,
      state.txHistory,
    ]
  );

  const checkTxStatus = async (signature: string) => {
    try {
      const connection = new Connection(LAZORKIT_CONFIG.RPC_URL);
      const status = await connection.getSignatureStatus(signature);

      setState((prev) => {
        const updatedHistory = prev.txHistory.map((tx): TransactionHistory =>
          tx.signature === signature
            ? {
                ...tx,
                status:
                  status.value?.confirmationStatus === "confirmed" ||
                  status.value?.confirmationStatus === "finalized"
                    ? "confirmed"
                    : status.value?.err
                    ? "failed"
                    : "pending",
              }
            : tx
        );
        localStorage.setItem("tx-history", JSON.stringify(updatedHistory));
        return { ...prev, txHistory: updatedHistory };
      });
    } catch (error) {
      console.error("Failed to check tx status:", error);
    }
  };

  if (!isConnected) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Transfer Form */}
      <div className="glass-card p-8 shimmer relative overflow-hidden group">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Image 
                src="https://img.icons8.com/fluent-systems-regular/48/38bdf8/airplane-take-off.png" 
                alt="Transfer" 
                width={20} 
                height={20}
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Gasless Transfer</h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Powered by Lazorkit Paymaster</p>
            </div>
          </div>

          <form onSubmit={handleTransfer} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Recipient Address</label>
              <input
                type="text"
                value={state.recipient}
                onChange={(e) => setState((prev) => ({ ...prev, recipient: e.target.value }))}
                placeholder="Solana address..."
                className="w-full px-4 py-3 bg-black/40 border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 font-mono text-sm text-slate-200 transition-all placeholder:text-slate-700"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Amount (SOL)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={state.amount}
                  onChange={(e) => setState((prev) => ({ ...prev, amount: e.target.value }))}
                  placeholder="0.1"
                  className="flex-1 px-4 py-3 bg-black/40 border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 text-slate-200 transition-all placeholder:text-slate-700"
                />
                {['0.1', '0.5', '1.0'].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setState((prev) => ({ ...prev, amount: val }))}
                    className="px-4 py-3 text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-slate-400 hover:text-white transition-all"
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {state.error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-1">
                <Image src="https://img.icons8.com/fluent-systems-regular/48/ef4444/info.png" alt="Error" width={16} height={16} />
                <p className="text-xs text-red-300 font-medium">{state.error}</p>
              </div>
            )}

            {state.success && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-1">
                <Image src="https://img.icons8.com/fluent-systems-regular/48/22c55e/ok.png" alt="Success" width={16} height={16} />
                <p className="text-xs text-green-300 font-medium">{state.success}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={state.isLoading}
              className="w-full relative shimmer overflow-hidden group bg-accent hover:bg-[#7dd3fc] disabled:bg-slate-800 py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-accent/20 active:scale-[0.98]"
            >
              <div className="relative flex items-center justify-center gap-2.5">
                {state.isLoading ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Image src="https://img.icons8.com/fluent-systems-regular/48/ffffff/rocket.png" alt="Send" width={20} height={20} />
                )}
                <span className="font-bold text-white tracking-tight">
                  {state.isLoading ? 'Processing via Paymaster...' : 'Execute Gasless Transfer'}
                </span>
              </div>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5">
             <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                <p className="text-[11px] font-medium text-slate-500">
                  Lazorkit Network Active • Gas sponsorship available
                </p>
             </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-2">Audit Trail / History</h4>
        <div className="glass-card min-h-[300px] max-h-[500px] overflow-y-auto p-2">
           {state.txHistory.length === 0 ? (
             <div className="h-[280px] flex flex-col items-center justify-center text-center opacity-40">
                <Image src="https://img.icons8.com/fluent-systems-regular/48/94a3b8/transaction-list.png" alt="Empty" width={48} height={48} className="mb-4" />
                <p className="text-sm font-medium text-slate-500 capitalize">History is currently empty</p>
             </div>
           ) : (
             <div className="space-y-2 p-2">
               {state.txHistory.map((tx, idx) => (
                 <div key={idx} className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-center justify-between group/tx hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center gap-4">
                       <div className={`p-2 rounded-lg ${
                         tx.status === 'confirmed' ? 'bg-green-500/10 text-green-500' : 
                         tx.status === 'failed' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'
                       }`}>
                          <Image 
                            src={`https://img.icons8.com/fluent-systems-regular/48/${
                              tx.status === 'confirmed' ? '22c55e' : tx.status === 'failed' ? 'ef4444' : 'eab308'
                            }/circled-chevron-right.png`} 
                            alt="Status" 
                            width={20} 
                            height={20} 
                          />
                       </div>
                       <div>
                          <p className="text-xs font-mono text-slate-300 group-hover/tx:text-white transition-colors">
                            {tx.signature.slice(0, 16)}...
                          </p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">
                            {new Date(tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • SOL Transfer
                          </p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-sm font-black text-white">{tx.amount} SOL</p>
                       <span className={`text-[9px] font-black uppercase tracking-widest ${
                          tx.status === 'confirmed' ? 'text-green-500' : 
                          tx.status === 'failed' ? 'text-red-500' : 'text-yellow-500'
                       }`}>
                          {tx.status}
                       </span>
                    </div>
                 </div>
               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
