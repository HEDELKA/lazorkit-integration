// Lazorkit Configuration
export const LAZORKIT_CONFIG = {
  RPC_URL: process.env.NEXT_PUBLIC_SOLANA_RPC || 'https://api.devnet.solana.com',
  PORTAL_URL: process.env.NEXT_PUBLIC_PORTAL_URL || 'https://portal.lazor.sh',
  PAYMASTER_URL: process.env.NEXT_PUBLIC_PAYMASTER_URL || 'https://kora.devnet.lazorkit.com',
  NETWORK: (process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet') as 'devnet' | 'mainnet-beta',
} as const;

// USDC Mint Address (Devnet)
export const USDC_MINT = 'EPjFWaLb3odcccccccccccccccccccccccccccccccc';

// Demo recipient for transfers
export const DEMO_RECIPIENT = '2e1wdayaSvWtalrWCHAwhMkYbV5aEosCUhxQSKwqBv5c';
