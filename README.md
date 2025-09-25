💧 LémanFlow – Micro‑Grants Web3 avec zkLogin & NFTs Soulbound

Prototype open-source d’un système de micro-financement basé sur des passeports soulbound, des attestations on-chain et une distribution automatisée de micro‑grants, développé pour un hackathon autour de l’écosystème Sui.

🚀 Fonctionnalités principales

Connexion zkLogin (Google/Apple) sans wallet

NFT Soulbound : chaque utilisateur mint un passeport unique et non transférable

Collecte d’attestations via QR codes lors d'événements ou d’actions terrain

Distribution automatique de micro‑grants en fonction des contributions (poids des missions)

Expérience utilisateur fluide et 100% gasless (transactions sponsorisées)

Interface admin pour organiser les missions et distribuer les fonds

🔧 Stack technique
Composant	Techno
Smart Contract	Move (blockchain Sui)
Backend	Node.js + Fastify
Frontend	Next.js + TypeScript
Blockchain	Sui (zkLogin, Dynamic Fields)
🧱 Architecture du dépôt
repo/
├── sources/                # Smart contract Move
├── tests/                 # Tests unitaires Move
├── server/                # Backend Fastify (API QR / tx gasless)
├── app/                   # Frontend Next.js
├── docs/README.md         # Documentation technique
└── script_demo.md         # Script CLI complet pour test du PoC

🖥 Fonctionnalités utilisateur

🔐 /login : connexion via JWT zkLogin + mint du passeport

🎯 /missions : voir missions actives et attestations acquises

📷 /scan : scanner un QR code, prouver la mission, et recevoir une attestation

🛠 /admin : créer des missions, générer des QR codes signés, déclencher les distributions

📦 Installation & test local

Compiler & publier le smart contract sur Sui Devnet :

sui move build
sui move test
sui client publish --gas-budget 100000000


Configurer les variables d’environnement :

Backend : .env

Frontend : .env.local

Lancer les serveurs :

pnpm install
pnpm dev


Tester le flux complet :

Connexion → mint → scan QR → attestation → distribution

📚 Documentation

📖 script_demo.md
 – Guide CLI pas à pas

🧠 docs/README.md
 – Détails techniques et architecture

📄 Rapport PDF de présentation à générer (business + technique)

✨ Idées d’amélioration (V2+)

Badges rares & réputation

Gouvernance par les sponsors

Pools multiples et configurables

Intégration off-chain (e.g. Notion, Airtable, ORCIDs…)

📜 Licence

MIT – Utilisation libre avec attribution. Projet open-source dans un but éducatif et expérimental.
