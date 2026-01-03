'use client';

import { useState, useCallback, useEffect } from 'react';
import { useWallet as useLazorkitWallet } from '@lazorkit/wallet';
import { WalletInfo, TransactionHistory } from '@/types';

export function useWalletState() {
  const lazorkitWallet = useLazorkitWallet();
  const [txHistory, setTxHistory] = useState<TransactionHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load transaction history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('tx-history');
    if (stored) {
      setTxHistory(JSON.parse(stored));
    }
  }, []);

  // Save transaction history to localStorage
  const addTransaction = useCallback((tx: TransactionHistory) => {
    setTxHistory((prev) => {
      const updated = [tx, ...prev];
      localStorage.setItem('tx-history', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return {
    ...lazorkitWallet,
    txHistory,
    addTransaction,
    isLoading,
    setIsLoading,
  };
}
