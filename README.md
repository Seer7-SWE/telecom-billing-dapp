# Telecom Billing DApp (Single-port SPA)

- One repo, one `package.json`.
- Vite serves React app at `http://localhost:5173`.
- Express backend is mounted as Vite middleware under `/api`.
- Hardhat for contracts (local chain recommended).

## Quickstart
1. `cp .env.example .env` and fill your keys/URIs.
2. Start a local chain: `npx hardhat node` (keep it running).
3. In a new terminal: `npm run deploy` (writes contract addresses to frontend config).
4. `npm run dev` → visit http://localhost:5173
