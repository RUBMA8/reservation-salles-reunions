# Système de Réservation de Salles de Réunion

## Équipe
- **2742806** : Kouamé Yéliey Ruben-Marie Bouakaly - Chef de projet & Authentification
- **2744714** : Jovani Clément - Backend Salles & Base de données
- **2737141** : Alicia Terbouche - Frontend Gestion Admin
- **2738940** : Alicia Serey-Cormier - Backend Réservations
- **2741245** : Hermann Blondel Njeutsa - Frontend Utilisateur & UML

## Technologies
- **Backend:** Node.js, Express.js
- **Template Engine:** Express-Handlebars
- **Authentification:** Passport.js + Express-Session
- **Base de données:** SQLite3
- **Sécurité:** Helmet, Bcrypt
- **Autres:** CORS, Compression

## Installation

### Prérequis
- Node.js v18+ 
- npm

### Étapes

1. Cloner le dépôt:
```bash
git clone https://github.com/votre-username/reservation-salles-reunions.git
cd reservation-salles-reunions
```

2. Installer les dépendances:
```bash
cd backend
npm install
```

3. Configurer les variables d'environnement:
```bash
cp .env.example .env
# Éditer .env avec vos valeurs
```

4. Démarrer le serveur:
```bash
npm run dev
```

5. Ouvrir dans le navigateur:
```
http://localhost:3000
```

## Structure du projet
```
reservation-salles-reunions/
├── backend/
│   ├── config/          # Configuration (DB, Passport)
│   ├── controllers/     # Logique métier
│   ├── middleware/      # Middleware (auth, validation)
│   ├── models/          # Modèles de données
│   ├── routes/          # Routes Express
│   ├── views/           # Templates Handlebars
│   ├── public/          # Fichiers statiques
│   └── server.js        # Point d'entrée
├── docs/                # Documentation
└── README.md
```

## Fonctionnalités

### Version 1.0 (MVP)
- ✅ Authentification utilisateur (login/register)
- ✅ Consultation des salles disponibles
- ✅ Réservation de salles
- ✅ Gestion des réservations (consulter, annuler)
- ✅ Administration des salles (CRUD)

## Comptes de test

**Administrateur:**
- Email: admin@lacite.ca
- Mot de passe: Admin123!

**Utilisateur:**
- Email: user@lacite.ca
- Mot de passe: User123!

## Documentation

- [Guide d'utilisation](docs/GUIDE_UTILISATION.md)
- [Documentation API](docs/API_DOCUMENTATION.md)
- [Diagrammes UML](docs/UML_DIAGRAMMES.pdf)
- [Charte de collaboration](docs/CHARTE_COLLABORATION.md)

## Contribution

Voir [CHARTE_COLLABORATION.md](docs/CHARTE_COLLABORATION.md) pour les règles de contribution.

## License

Ce projet est réalisé dans le cadre d'un cours au Collège La Cité.
