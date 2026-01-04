# 🧵 X (Twitter) Thread Template: Solana UX is Changing

Use this template to share your integration on social media. This is a great way to earn bonus points for "External Impact"!

---

### Tweet 1: The Hook

Solana UX is finally changing. 🚀

Say goodbye to seed phrases and browser extensions. I just integrated @lazorkit with Next.js to build a wallet experience that feels like a native app.

Here is how I did it using Passkeys & Gasless transfers... 👇

### Tweet 2: The Problem

Seed phrases are the biggest hurdle for Web3 adoption.

Users shouldn't have to write down 12 words to buy their first NFT or send USDC.

We need biometrics. We need simplicity.

### Tweet 3: Passkeys

With Lazorkit, I replaced seed phrases with **Passkeys** (WebAuthn).

🔒 FaceID / TouchID / Windows Hello
🧬 Hardware-level security
📱 No app install needed

The flow: Connect -> Scan -> Ready in <2 seconds.

### Tweet 4: Gasless Transfers

But what if the user has 0 SOL? No problem.

I implemented **Gasless Smart Wallets**. ⛽️

Using a @lazor-kit Paymaster, the transaction fees are sponsored. The user just signs, and the tx goes through. UX magic.

### Tweet 5: The Build

Setting it up was surprisingly easy with the Lazorkit SDK.

All you need is:
1️⃣ `connect({ feeMode: 'paymaster' })`
2️⃣ `signAndSendTransaction({ instructions, ... })`

### Tweet 6: Call to Action

Check out the full example repo and tutorials here:
[LINK TO YOUR REPO]

Let's build a simpler Solana together! 🏗️🧪

#Solana #Web3UX #Lazorkit #AccountAbstraction
