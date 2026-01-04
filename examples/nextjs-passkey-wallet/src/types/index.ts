// Wallet Types
export interface WalletInfo {
  credentialId: string;
  passkeyPubkey: number[];
  smartWallet: string;
  walletDevice: string;
  platform: string;
  accountName?: string;
}

// Transaction Types
export interface TransactionHistory {
  signature: string;
  timestamp: number;
  type: 'transfer' | 'sign';
  amount?: number;
  status: 'pending' | 'confirmed' | 'failed';
}

// Transfer Types
export interface TransferPayload {
  recipient: string;
  amount: number;
  token: 'SOL' | 'USDC';
  gasless?: boolean;
}
