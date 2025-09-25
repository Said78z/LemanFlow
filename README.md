# 💧 LémanFlow – Micro‑Grants Web3 avec zkLogin & NFTs Soulbound

> Prototype open-source d’un système de micro-financement basé sur des **passeports soulbound**, des **attestations on-chain** et une **distribution automatisée de micro‑grants**, développé pour un hackathon autour de l’écosystème **Sui**.

---

## 🚀 Fonctionnalités principales

- 🔐 **Connexion zkLogin** (Google/Apple) sans wallet
- 🧾 **NFT Soulbound** : chaque utilisateur mint un passeport unique et non transférable
- 🧠 **Collecte d’attestations** via QR codes lors d’événements ou d’actions terrain
- 💸 **Distribution automatique de micro‑grants** basée sur les contributions
- ⚡ **Expérience utilisateur fluide et 100% gasless** (transactions sponsorisées)
- 🛠 **Interface admin** pour créer des missions, générer des QR et distribuer les fonds

---

## 🧱 Architecture du dépôt

```bash
repo/
├── sources/                # Smart contract Move
│   └── grants.move
├── tests/                  # Tests unitaires Move
│   └── grants_tests.move
├── server/                 # Backend Fastify (API QR / tx gasless)
│   ├── .env.example
│   └── src/index.ts
├── app/                    # Frontend Next.js (zkLogin + UI)
│   ├── hooks/useSui.ts
│   └── pages/
│       ├── login.tsx
│       ├── missions.tsx
│       ├── scan.tsx
│       └── admin.tsx
├── docs/
│   └── README.md           # Documentation technique
├── script_demo.md          # Script CLI pour test du PoC
└── README.md               # Présentation GitHub (ce fichier)

---

## 🔧 Stack technique

| Composant     | Techno                           |
|---------------|----------------------------------|
| Smart Contract| Move (blockchain Sui)            |
| Backend       | Node.js + Fastify                |
| Frontend      | Next.js + TypeScript             |
| Blockchain    | Sui (zkLogin, Dynamic Fields)    |
| Librairies    | @mysten/sui.js, ECDSA, pnpm      |

---

## 💡 Fonctionnalités principales du PoC

### 👤 Utilisateur
- Connexion via JWT zkLogin
- Mint d’un **Passeport Soulbound**
- Scan de QR codes pour recevoir des attestations
- Visualisation des missions actives
- Réception automatique de micro‑grants après vérification des contributions

### 🛠 Interface Admin
- Création de missions (ID, métadonnées, fenêtre temporelle, poids)
- Génération de QR codes signés (ECDSA P-256)
- Déclenchement de la distribution automatisée via le backend

---

## ⚙️ Installation & test local

### 1. Compiler et publier le smart contract Move

```bash
sui move build
sui move test
sui client publish --gas-budget 100000000
🔎 Notez bien les identifiants retournés :

PACKAGE_ID → identifiant du package publié

CONFIG_ID → identifiant de l’objet Config retourné par init_pool

2. Configurer les variables d’environnement
📄 .env (Backend – dans server/)
SUI_RPC_URL=https://fullnode.devnet.sui.io
PACKAGE_ID=<votre_package_id>
CONFIG_ID=<votre_config_id>
SPONSOR_PRIVATE_KEY=ed25519:<clé privée base64>
ORG_PRIVATE_KEY=p256:<clé privée base64>

📄 .env.local (Frontend – dans app/)
NEXT_PUBLIC_SUI_RPC_URL=https://fullnode.devnet.sui.io
NEXT_PUBLIC_PACKAGE_ID=<votre_package_id>
NEXT_PUBLIC_CONFIG_ID=<votre_config_id>

3. Installer les dépendances

Utilise pnpm (recommandé). Si tu ne l’as pas :

npm install -g pnpm

Backend
cd server/
pnpm install
pnpm dev

Frontend
cd app/
pnpm install
pnpm dev

4. Tester le flux complet (étapes principales)
✅ Étape 1 – Connexion via zkLogin

Générez un JWT depuis le zkLogin Playground (Google/Apple)

Allez sur /login, collez le JWT, puis cliquez sur "Mint Passport"

✅ Étape 2 – Création d’une mission (Admin)

Accédez à /admin

Remplissez les détails (ID mission, métadonnées, dates, poids)

Cliquez sur "Créer une mission"

Générez un QR code signé via /qr/issue

✅ Étape 3 – Participation utilisateur (scan QR)

Allez sur /scan

Remplissez les champs : passportId, missionId, signature du QR

Cliquez sur "Claim"

✅ Étape 4 – Distribution automatique

Toujours dans /admin, cliquez sur "Distribuer les micro‑grants"

Vérifiez que les utilisateurs reçoivent les récompenses

🧪 Exemples CLI utiles
Générer une clé P-256 pour signer les QR (ORG_PRIVATE_KEY)
openssl ecparam -name prime256v1 -genkey -noout -out org-key.pem
openssl pkcs8 -topk8 -inform PEM -outform DER -in org-key.pem -nocrypt | base64

Convertir une clé Ed25519 pour le sponsor (SPONSOR_PRIVATE_KEY)
sui keytool new --ed25519
# Récupérer la clé privée (base64) pour `.env`

🧩 Conseils de debug

✅ Vérifie toujours que PACKAGE_ID et CONFIG_ID sont bien à jour

✅ Assure-toi que les clés privées sont bien au format requis (ed25519: ou p256:)

✅ Si une transaction échoue, consulte les logs Fastify dans le backend

✅ Tu peux tester directement les endpoints avec Postman ou curl

Tu es prêt pour une démo fonctionnelle de bout en bout 🚀

Pour plus d’infos sur les endpoints et le contrat Move, consulte docs/README.md

---

## 📚 Documentation complémentaire

- [`script_demo.md`](./script_demo.md) – Guide CLI pour test complet
- [`docs/README.md`](./docs/README.md) – Détails techniques (contracts, API, frontend)
- Rapport de présentation (à générer en PDF)

---

## 🧩 Conseils de debug

✅ Vérifie toujours que `PACKAGE_ID` et `CONFIG_ID` sont à jour dans `.env`  
✅ Assure-toi que les clés privées sont bien formatées :  
- `ed25519:<clé>` pour le sponsor  
- `p256:<clé>` pour l'organisation  

✅ Utilise Postman pour tester les endpoints REST (`/qr/issue`, `/tx/claim`, etc.)  
✅ Consulte les logs du backend (`server/`) en cas d'erreur de transaction  
✅ Vérifie que Devnet est stable au moment des tests

---

## 📜 Licence

MIT – Utilisation libre. Ce projet est un prototype éducatif construit dans le cadre d’un hackathon.

---

## 💙 Crédits

Projet conçu pour l’écosystème **Sui**. Contributions bienvenues !
