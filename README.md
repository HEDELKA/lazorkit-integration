# ⚡️ Lazorkit Integration: 10x Solana UX

> **A production-ready starter template featuring Biometric Passkeys & Gasless Transactions.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://lazorkit.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue?style=for-the-badge)](./tsconfig.json)

## 🎯 Project Overview

This repository demonstrates how to implement **Account Abstraction** on Solana using the Lazorkit SDK. It solves the two biggest UX hurdles in Web3: **Seed Phrases** and **Gas Fees**.

### Key Features

- **🔐 Biometric Authentication**: WebAuthn-based wallet creation (FaceID/TouchID). No seed phrases.
- **⛽️ Gasless Transactions**: Sponsored USDC transfers via Lazorkit Paymaster.
- **🏗️ Production Architecture**: Modular Next.js 14 setup with strict TypeScript.
- **💾 Session Persistence**: Secure cross-device session management.

---

## 📂 Navigation

This repository is organized into documentation and working examples.

### 📘 Documentation (Deep Dives)

Theory, architecture, and step-by-step guides.

- [**Tutorial 1: Passkey Setup**](./docs/TUTORIAL-1-PASSKEY-SETUP.md) — How to replace seed phrases with biometrics.
- [**Tutorial 2: Gasless Transfers**](./docs/TUTORIAL-2-GASLESS-TRANSFER.md) — How to implement sponsored transactions.
- [**Session Persistence**](./docs/SESSION-PERSISTENCE.md) — Managing user sessions.

### 🚀 Working Examples (Code)

Full, runnable applications demonstrating the concepts.

| Example            | Tech Stack               | Description                                                                              | Link                                              |
| :----------------- | :----------------------- | :--------------------------------------------------------------------------------------- | :------------------------------------------------ |
| **Next.js Wallet** | Next.js 14, Tailwind, TS | **Full Starter Kit.** Includes Passkey auth, Wallet UI, and Gasless transfer components. | [**View Code**](./examples/nextjs-passkey-wallet) |

---

## 🧱 Project Structure

We follow a modular monorepo-style structure for clarity:

```text
lazorkit-integration/
├── docs/                      # 📚 Tutorials & Concepts
│   ├── TUTORIAL-1...
│   └── TUTORIAL-2...
├── examples/                  # 💻 Runnable Projects
│   └── nextjs-passkey-wallet/ # <-- MAIN STARTER KIT
│       ├── src/
│       │   ├── components/    # Reusable UI (ConnectButton, etc.)
│       │   ├── hooks/         # Logic (useWalletState)
│       │   └── lib/           # Config & SDK init
│       └── ...
└── README.md                  # 📍 You are here

```

## ⚡️ Quick Start

To run the Next.js starter locally:

1. **Clone the repo:**

```bash
git clone https://github.com/HEDELKA/lazorkit-integration.git
```

2. **Navigate to the example:**

```bash
cd lazorkit-integration/examples/nextjs-passkey-wallet
```

3. **Install & Run:**

```bash
npm install
npm run dev
```

---

_Built for the Superteam Vietnam Bounty._
