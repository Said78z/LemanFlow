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
