# Next.js Passkey Wallet Starter

This is a complete Next.js 14 application demonstrating Lazorkit SDK integration.

## 🛠 Features implemented

- Passkey Login Component (`src/components/ConnectButton.tsx`)
- Gasless Transfer Component (`src/components/GaslessTransfer.tsx`)
- Wallet Display (`src/components/WalletDisplay.tsx`)

## 🚀 How to Run

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Setup Environment:**
   Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

   _Note: Default values point to Solana Devnet._

3. **Run Development Server:**
   ```bash
   npm run dev
   ```

## 🏗 Key Files

- `src/lib/config.ts`: Network and RPC configuration.
- `src/app/layout.tsx`: Lazorkit Provider setup.
