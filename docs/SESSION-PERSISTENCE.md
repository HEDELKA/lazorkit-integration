# Session Persistence in Lazorkit

One of the challenges with WebAuthn/Passkeys is maintaining the user's connection across page refreshes or browser restarts. Lazorkit handles this via session tokens and local storage.

## 1. How Session Persistence Works

When a user authenticates via Passkey, Lazorkit generates a temporary session. To keep this session active:

1.  **Storage**: The session metadata is stored in `localStorage` or `sessionStorage`.
2.  **Hydration**: Upon page load, the SDK checks for a valid session.
3.  **Validation**: It verifies the session is still active and links it back to the Smart Wallet.

## 2. Implementation with `WalletProvider`

If you are using `@lazorkit/wallet`, persistence is enabled by default. However, you can configure the behavior:

```tsx
import { WalletProvider } from "@lazorkit/wallet";

export function Providers({ children }) {
  return (
    <WalletProvider
      autoConnect={true} // Automatically reconnects using stored session
      persistSession={true} // Enables localStorage persistence
    >
      {children}
    </WalletProvider>
  );
}
```

## 3. Manual Session Handling

If you are building a custom implementation using the core `@lazorkit/sdk`:

```typescript
// On app start
const session = lazorkit.getSession();
if (session && !session.isExpired()) {
  await lazorkit.resumeSession(session);
}
```

## 4. Security Considerations

- **Session Expiry**: Sessions should have a limited lifespan (e.g., 7 days).
- **Clearing Sessions**: Always call `disconnect()` when the user logs out to clear local storage.
- **Scope**: Passkeys are scoped to a domain. A session created on `app.example.com` cannot be resumed on `other.example.com`.

---

Part of the [Lazorkit Integration Series].
