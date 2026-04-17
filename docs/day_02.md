# Day 2

Solana wallet integration using `@solana/client`, `@solana/react-hooks`, and `@solana/kit` in a Next.js App Router project.

## Packages installed

- `@solana/client` — Solana runtime: RPC, wallet connectors, transaction helpers
- `@solana/react-hooks` — React hooks and provider built on top of `@solana/client`
- `@solana/kit` — Low-level utilities (`address`, `lamports`, etc.)

## Files created

### `src/providers/SolProviders.tsx`

Wraps the app with `SolanaProvider`. Uses `autoDiscover()` from `@solana/client` so any installed Wallet Standard browser extension is automatically detected — no hardcoded wallet list needed.

```tsx
const defaultConfig: SolanaClientConfig = {
  cluster: "devnet",
  rpc: "https://api.devnet.solana.com",
  websocket: "wss://api.devnet.solana.com",
  walletConnectors: autoDiscover(),
};
```

`SolProviders` is imported in `src/app/layout.tsx` to wrap the entire app.

### `src/components/Solana/ConnectWallet.tsx`

Dropdown button to connect and disconnect wallets.

- Uses `useWalletConnection()` — a single hook that returns `{ connectors, connect, disconnect, wallet, status }`
- `connectors` is a live array of only the wallets actually installed in the browser (powered by `autoDiscover()`)
- Renders each connector by `connector.name` and calls `connect(connector.id)`
- Shows truncated address when connected, disconnect button in the dropdown

Key decision: switched from three separate hooks (`useConnectWallet`, `useDisconnectWallet`, `useWallet`) + hardcoded connector IDs to `useWalletConnection` so the UI reflects what the user actually has installed.

### `src/components/Solana/SolTransferCard.tsx`

Form to send SOL to any address.

- Uses `useSolTransfer()` for `{ send, isSending, signature }`
- Validates destination address with `address()` from `@solana/kit`
- Converts SOL input to lamports via `BigInt`
- On success, shows a link to Solana Explorer (devnet)
- Error handling inspects `err.transactionPlanResult` to surface the real failure reason instead of the generic message

```ts
if (err != null && typeof err === "object" && "transactionPlanResult" in err) {
  // extract actual cause from transactionPlanResult
}
```

### `src/lib/helpers.ts`

Utility for truncating wallet addresses in the UI (`truncateWalletAddress`).

## Key concepts

| Concept | Detail |
|---|---|
| `autoDiscover()` | Scans `window` for Wallet Standard extensions at runtime |
| `useWalletConnection` | Single hook for connector list, connect, disconnect, and wallet state |
| `useSolTransfer` | Handles blockhash refresh, fee payer resolution, and signing internally |
| `transactionPlanResult` | The real error detail when a `@solana/kit` transaction plan fails — `err.message` is only the generic wrapper |

## Debugging note

A `"transaction plan failed to execute"` error can be transient (stale blockhash, devnet RPC hiccup). If it resolves on retry, no fix is needed. If it persists, inspect `err.transactionPlanResult` for the actual cause (e.g. insufficient funds, wrong cluster).
