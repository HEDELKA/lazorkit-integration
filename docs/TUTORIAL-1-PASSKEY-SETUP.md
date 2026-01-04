# Tutorial 1: Passkey Setup with Lazorkit

This guide explains how to replace traditional seed phrases with modern biometric authentication (Passkeys) using the Lazorkit SDK on Solana.

## Prerequisites

- Lazorkit SDK installed (`npm install @lazorkit/sdk`)
- A Solana RPC provider (Devnet or Mainnet)

## 1. Initialize Lazorkit

First, initialize the SDK with your configuration:

```typescript
import { Lazorkit } from "@lazorkit/sdk";

const lazorkit = new Lazorkit({
  network: "devnet",
  rpcUrl: process.env.NEXT_PUBLIC_SOLANA_RPC_URL,
});
```

## 2. Register a Passkey

To create a new wallet, the user needs to register a Passkey on their device:

```typescript
const registerPasskey = async (username: string) => {
  const account = await lazorkit.createAccount({
    username,
    displayName: username,
  });

  console.log("Wallet created:", account.publicKey.toBase58());
  return account;
};
```

## 3. Authenticate with Passkey

Existing users can log in using their Passkey:

```typescript
const loginWithPasskey = async () => {
  const account = await lazorkit.login();
  console.log("Logged in as:", account.publicKey.toBase58());
};
```

## 4. Why Passkeys?

- **No Seed Phrases**: Users don't need to write down 12 words.
- **Biometric Security**: Uses FaceID, TouchID, or Windows Hello.
- **Cross-Device**: Passkeys can be synced via iCloud or Google Password Manager.

---

For a full implementation, check the [Next.js Example](../examples/nextjs-passkey-wallet).
