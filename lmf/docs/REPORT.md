## LémanFlow (LMF) — Rapport technique

### Executive Summary
LMF automatise les micro-grants de hackathons via Sui, avec zkLogin, passeport soulbound et attestations QR.

### Architecture
- Frontend: Next.js (App Router), @mysten/sui.js
- Backend: Fastify/TS, QR signing (ES256), sponsoring Ed25519
- Blockchain: Sui Move, module `lmf::grants`

### Smart Contracts (Move)
- Structs: Passport, Mission, GrantPool; event Attested
- Entrées: init_pool, create_mission, mint_passport, claim_attestation, distribute
- Anti double-claim: table imbriquée claims[user][mission_id]
- Fenêtres temporelles: `clock::now_ms`

### Backend
- `/qr/issue`: signe `{mission_id, nonce, exp}` en ES256
- `/tx/claim`: construit TransactionBlock, renvoie txBytes ou exécute sponsorisé

### Frontend
- Pages: /login, /missions, /scan, /admin
- UX gasless: sponsoring côté serveur

### Sécurité
- Soulbound: pas d’API de transfert pour Passport (policy renforçable)
- Anti-replay: QR payload avec nonce+exp

### TAM/SAM/SOM
- Placeholders pour graphiques (à compléter)

### Roadmap
- MVP -> Pilotes -> Scale

### Annexes techniques
- Environnements, variables, commandes

