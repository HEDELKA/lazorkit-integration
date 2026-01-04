# Lazorkit Integration Examples

A collection of production-ready examples and guides for integrating the Lazorkit SDK on Solana.

## 📂 Documentation

Detailed guides and tutorials for various use cases:

- [**Tutorial 1: Passkey Setup**](./docs/TUTORIAL-1-PASSKEY-SETUP.md) — Learn how to implement biometric authentication using Passkeys on Solana.
- [**Tutorial 2: Gasless Transfers**](./docs/TUTORIAL-2-GASLESS-TRANSFER.md) — Step-by-step guide to sponsoring user transactions with a Paymaster.

## 🚀 Examples

| Example            | Framework | Description                                                           | Path                                                                 |
| :----------------- | :-------- | :-------------------------------------------------------------------- | :------------------------------------------------------------------- |
| **Passkey Wallet** | Next.js   | A complete starter kit featuring Passkey login and gasless transfers. | [`examples/nextjs-passkey-wallet`](./examples/nextjs-passkey-wallet) |

## 🛠 Getting Started

To run the Next.js example locally:

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd lazorkit-integration
   ```

2. **Navigate to the example:**

   ```bash
   cd examples/nextjs-passkey-wallet
   ```

3. **Configure Environment:**
   Copy `.env.example` to `.env.local` and fill in your RPC and Paymaster URLs.

4. **Install & Run:**
   ```bash
   npm install
   npm run dev
   ```

---

Built with [Lazorkit SDK](https://github.com/lazorkit/lazorkit-sdk).
