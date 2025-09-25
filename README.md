💧 LémanFlow – Micro‑Grants Web3 avec zkLogin & NFTs Soulbound
LémanFlow est un prototype open‑source de micro‑financement décentralisé.
Il repose sur des passeports soulbound, des attestations on‑chain et une distribution automatisée de micro‑grants. Conçu pour un hackathon autour de l’écosystème Sui, il propose une expérience fluide et 100% gasless grâce à zkLogin et aux transactions sponsorisées.

🚀 Fonctionnalités principales
Connexion simplifiée avec zkLogin (Google/Apple), sans wallet natif.

NFT Soulbound : chaque utilisateur mint un passeport unique et intransférable.

Collecte d’attestations via QR codes scannés lors d’événements ou actions terrain.

Distribution automatisée de micro‑grants selon les contributions (pondération par mission).

Expérience utilisateur fluide et sans gas (transactions sponsorisées).

Interface admin pour organiser les missions, générer des QR codes et distribuer les fonds.

🔧 Stack technique
Composant	Technologie
Smart Contract	Move (blockchain Sui)
Backend	Node.js + Fastify
Frontend	Next.js + TypeScript
Blockchain	Sui (zkLogin, Dynamic Fields)
🧱 Architecture du dépôt
text
repo/
├── sources/                # Smart contracts Move
├── tests/                  # Tests unitaires Move
├── server/                 # Backend Fastify (API QR / tx gasless)
├── app/                    # Frontend Next.js
├── docs/README.md          # Documentation technique
└── script_demo.md          # Script CLI complet pour test du PoC
🖥 Fonctionnalités utilisateur
🔐 /login : connexion via JWT zkLogin + mint du passeport Soulbound

🎯 /missions : visualiser les missions actives et les attestations acquises

📷 /scan : scanner un QR code signé, prouver la mission et recevoir une attestation

🛠 /admin : créer des missions, générer des QR codes et distribuer automatiquement les fonds

📦 Installation & test local
1. Compiler & publier le smart contract sur Sui Devnet :

bash
sui move build
sui move test
sui client publish --gas-budget 100000000
2. Configurer les variables d’environnement :

server/.env → paramètres backend

app/.env.local → paramètres frontend

3. Lancer les serveurs :

bash
pnpm install
pnpm dev
4. Tester le flux complet :

Connexion (/login)

Mint du passeport Soulbound

Scan d’un QR code (/scan)

Attestation ajoutée sur le passeport

Distribution automatique des micro‑grants

📚 Documentation
📖 script_demo.md – Guide CLI pas à pas

🧠 docs/README.md – Détails techniques et architecture

Un rapport PDF de présentation (business + technique) reste à générer.

✨ Idées d’amélioration (V2+)
Badges rares & réputation évolutive

Gouvernance communautaire par les sponsors

Multiples pools et configuration avancée des micro‑grants

Intégration off‑chain (Notion, Airtable, ORCID, etc.)

📜 Licence
MIT – Utilisation libre avec attribution.
Projet open‑source à but éducatif et expérimental.
