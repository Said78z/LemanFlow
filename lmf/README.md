# LémanFlow (LMF)

Plateforme de micro-grants automatiques pour hackathons — Sui • zkLogin • Gasless UX.

## Arborescence

```
lmf/
├── contracts/        # Move modules (Sui)
├── server/           # Backend Fastify/TypeScript
├── app/              # Frontend Next.js (App Router)
├── docs/             # Rapport et Pitch deck (Markdown)
└── README.md
```

## Installation rapide

Prérequis: Node 18+, pnpm (ou npm), Sui CLI, Rust toolchain.

```
cd contracts && sui move build && sui move test
sui client publish --gas-budget 100000000
cd ../server && pnpm install && pnpm dev
cd ../app && pnpm install && pnpm dev
```

## Variables d'environnement

Créez `server/.env` d'après `server/.env.example`:

```
SUI_RPC_URL=
SPONSOR_PRIVATE_KEY=
ORG_PRIVATE_KEY=
PACKAGE_ID=
CONFIG_ID=
PORT=3001
```

- `SPONSOR_PRIVATE_KEY`: Ed25519 base64 pour sponsoriser les TX
- `ORG_PRIVATE_KEY`: PKCS8 ES256 (P-256) pour signer les QR
- `PACKAGE_ID`: package publié contenant `lmf::grants`

## Schéma ASCII

```
[ User (zkLogin) ] --QR--> [/qr/issue]         
       |                                
       v                                
   Next.js (app) --claim--> Fastify --sponsor--> Sui Devnet
                         ^
                         | TransactionBlock (moveCall lmf::grants)
```

## Contrats (Move)

- `Passport` (soulbound)
- `Mission` (fenêtre [start,end], poids)
- `GrantPool` (missions, anti double-claim)
- Entrées: `init_pool`, `create_mission`, `mint_passport`, `claim_attestation`, `distribute`

## Docs

- `docs/REPORT.md` (10p) et `docs/PITCH.md` (8 slides)

## Licence

Apache-2.0