# 🌌 Astrodex — Backend

> API REST Node.js / Express pour l'application mobile Astrodex.

🌐 **API déployée** : [astrodex-backend.vercel.app](https://astrodex-backend.vercel.app)

---

## 📋 Description

Serveur backend de l'application Astrodex. Gère l'authentification utilisateur, les profils, les équipements d'observation, le catalogue d'astres et les uploads médias via Cloudinary. Déployé sur Vercel avec une base de données MongoDB Atlas.

---

## ✨ Fonctionnalités

- **Authentification** — inscription / connexion utilisateur avec tokens
- **Profil utilisateur** — gestion du profil et upload de photo via Cloudinary
- **Équipement d'observation** — sélection du matériel (œil nu, jumelles, télescope) avec filtrage des astres accessibles
- **Catalogue d'astres** — stockage et exposition des données astronomiques
- **Uploads médias** — photos de profil et photos d'astres hébergées sur Cloudinary
- **Intégration données externes** — proxy et mise en cache des données NASA API et OpenWeather

---

## 🛠️ Stack Technique

| Couche | Technologie |
|--------|-------------|
| Runtime | Node.js |
| Framework | Express.js |
| Base de données | MongoDB Atlas + Mongoose |
| Stockage médias | Cloudinary |
| Déploiement | Vercel |
| Gestion dépendances | Yarn |

---

## 🚀 Installation & Lancement

### Prérequis
- Node.js ≥ 18
- Yarn
- Un compte MongoDB Atlas
- Un compte Cloudinary

### Installation
```bash
git clone https://github.com/Maxime-Maguet/astrodex-backend.git
cd astrodex-backend
yarn install
```

### Configuration

Créer un fichier `.env` à la racine :
```env
CONNECTION_STRING=votre_uri_mongodb
CLOUDINARY_URL=votre_url_cloudinary
OPENWEATHER_API_KEY=votre_clé_openweather
INFONASA_API_KEY=votre_clé_nasa
```

### Lancement
```bash
# Développement
yarn dev

# Production
yarn start
```

---

## 📁 Architecture du projet
```
astrodex-backend/
├── bin/         # Configuration du serveur HTTP
├── data/        # Données statiques / seeds
├── models/      # Schémas Mongoose (User, Astre...)
├── modules/     # Modules utilitaires (cloudinary, auth...)
├── public/      # Fichiers statiques
├── routes/      # Routes Express (users, astres...)
├── app.js       # Configuration Express
└── vercel.json  # Configuration déploiement Vercel
```

---

## 🔗 Liens

- 📱 Frontend : [astrodex-frontend](https://github.com/Maxime-Maguet/astrodex-frontend)
- 🌐 API en production : [astrodex-backend.vercel.app](https://astrodex-backend.vercel.app)

---

## 👥 Équipe

Projet développé dans le cadre du bootcamp **La Capsule** (2026).  
Lead développeur & porteur du projet : **Maxime Maguet**

---

## 📄 Licence

MIT
