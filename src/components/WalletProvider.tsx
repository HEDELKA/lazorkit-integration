'use client';

import React from 'react';
import { LazorkitProvider } from '@lazorkit/wallet';
import { LAZORKIT_CONFIG } from '@/lib/config';

export function WalletProvider({ children }: { children: React.ReactNode }) {
  if (typeof window === 'undefined') {
    return <>{children}</>;
  }

  return (
    <LazorkitProvider
      rpcUrl={LAZORKIT_CONFIG.RPC_URL}
      portalUrl={LAZORKIT_CONFIG.PORTAL_URL}
      paymasterConfig={{
        paymasterUrl: LAZORKIT_CONFIG.PAYMASTER_URL,
      }}
    >
      {children}
    </LazorkitProvider>
  );
}
