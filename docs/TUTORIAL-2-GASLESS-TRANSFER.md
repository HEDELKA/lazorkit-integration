# Tutorial 2: Gasless Transfers (Sponsored Transactions)

This tutorial demonstrates how to implement gasless (sponsored) transactions using Lazorkit's Smart Wallet and a Paymaster.

## 1. Setup Paymaster

You need a Paymaster URL from a provider like Lazor or your own implementation:

```typescript
const PAYMASTER_URL = process.env.NEXT_PUBLIC_PAYMASTER_URL;
```

## 2. Concept: Smart Wallet

When using Lazorkit, users operate via a **Smart Wallet (PDA)**. This allows a third party (Paymaster) to pay the transaction fees in SOL.

## 3. Implementation: Transfer USDC

Here is how to send USDC without the user needing SOL for gas:

```typescript
import { createTransferInstruction } from "@solana/spl-token";

const sendGaslessUSDC = async (recipient: string, amount: number) => {
  const transaction = await lazorkit.createSponsoredTransaction({
    instructions: [
      // Your SPL Token transfer instructions here
    ],
    paymasterUrl: PAYMASTER_URL,
  });

  const signature = await lazorkit.sendTransaction(transaction);
  console.log("Transaction successful:", signature);
};
```

## 4. Implementation: Transfer SOL

Sending SOL is also possible since the transaction fee is covered by the Paymaster:

```typescript
const sendGaslessSOL = async (recipient: string, amount: number) => {
  const tx = await lazorkit.createSponsoredTransaction({
    instructions: [
      SystemProgram.transfer({
        fromPubkey: userSmartWallet,
        toPubkey: new PublicKey(recipient),
        lamports: amount * LAMPORTS_PER_SOL,
      }),
    ],
    paymasterUrl: PAYMASTER_URL,
  });

  return await lazorkit.sendTransaction(tx);
};
```

## Benefits

- **Zero Friction**: New users can receive and send tokens immediately without buying SOL.
- **Business Logic**: You can decide to sponsor certain actions (e.g., first 10 transfers).

---

Check the implementation in [GaslessTransfer.tsx](../examples/nextjs-passkey-wallet/src/components/GaslessTransfer.tsx).
