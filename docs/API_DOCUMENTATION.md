# 📡 Documentation API - Système de Réservation de Salles

**Projet:** Système de Réservation de Salles de Réunion - Collège La Cité
**Équipe:** Ruben, Jovani, Alicia S-C, Alicia T, Hermann
**Version:** 1.0.0
**Date:** Décembre 2025

---

## 📋 Table des matières

1. [Arborescence du Projet](#arborescence-du-projet)
2. [Introduction](#introduction)
3. [Authentification](#authentification)
4. [Routes d'Authentification](#routes-dauthentification)
5. [API Salles](#api-salles)
6. [API Réservations](#api-réservations)
7. [Routes Pages Admin](#routes-pages-admin)
8. [Routes Pages Utilisateur](#routes-pages-utilisateur)
9. [Exemples d'utilisation](#exemples-dutilisation)

---

## 📁 Arborescence du Projet

```
reservation-salles-reunions/
├── backend/                          # Application principale (Node.js + Express)
│   ├── config/
│   │   ├── database.js              # Configuration et initialisation SQLite
│   │   └── passport.js              # Configuration Passport.js (authentification)
│   │
│   ├── controllers/
│   │   ├── authController.js        # Contrôleur authentification (login, register, logout)
│   │   ├── sallesController.js      # Contrôleur salles (CRUD)
│   │   └── reservationsController.js # Contrôleur réservations (CRUD)
│   │
│   ├── middleware/
│   │   └── auth.js                  # Middlewares de protection (ensureAuthenticated, ensureAdmin)
│   │
│   ├── models/
│   │   ├── salle.js                 # Modèle Salle (requêtes BD)
│   │   └── reservation.js           # Modèle Reservation (requêtes BD)
│   │
│   ├── routes/
│   │   ├── index.js                 # Routes principales (accueil, dashboard)
│   │   ├── auth.js                  # Routes authentification
│   │   ├── salles.js                # Routes API salles
│   │   ├── reservations.js          # Routes API réservations
│   │   ├── admin.js                 # Routes administration
│   │   └── user.js                  # Routes utilisateur
│   │
│   ├── public/
│   │   ├── css/
│   │   │   └── style.css            # Styles globaux
│   │   └── js/
│   │       └── main.js              # JavaScript client
│   │
│   ├── views/
│   │   ├── home.hbs                 # Page d'accueil
│   │   ├── layouts/
│   │   │   └── main.hbs             # Layout principal (header, footer)
│   │   ├── partials/
│   │   │   ├── header.hbs           # En-tête
│   │   │   └── footer.hbs           # Pied de page
│   │   ├── auth/
│   │   │   ├── login.hbs            # Formulaire de connexion
│   │   │   └── register.hbs         # Formulaire d'inscription
│   │   ├── admin/
│   │   │   ├── dashboard.hbs        # Tableau de bord admin
│   │   │   ├── salles.hbs           # Liste des salles (admin)
│   │   │   ├── ajouter-salle.hbs    # Formulaire ajout salle
│   │   │   ├── modifier-salle.hbs   # Formulaire modification salle
│   │   │   └── reservations.hbs     # Gestion réservations (admin)
│   │   ├── user/
│   │   │   ├── dashboard.hbs        # Tableau de bord utilisateur
│   │   │   ├── salles.hbs           # Liste des salles disponibles
│   │   │   ├── salle-detail.hbs     # Détails d'une salle
│   │   │   └── mes-reservations.hbs # Mes réservations
│   │   └── errors/
│   │       ├── 403.hbs              # Erreur accès refusé
│   │       ├── 404.hbs              # Page non trouvée
│   │       └── 500.hbs              # Erreur serveur
│   │
│   ├── package.json                 # Dépendances et scripts npm
│   ├── server.js                    # Point d'entrée principal
│   └── .env                         # Variables d'environnement (non versionné)
│
├── docs/
│   └── API_DOCUMENTATION.md         # Cette documentation
│
└── README.md                        # Guide du projet

```

### Description des dossiers principaux

| Dossier | Rôle |
|---------|------|
| `config/` | Configuration de la base de données et de l'authentification |
| `controllers/` | Logique métier, traitements des requêtes |
| `middleware/` | Fonctions de protection et validation |
| `models/` | Interactions avec la base de données SQLite |
| `routes/` | Définition des endpoints et routage |
| `public/` | Fichiers statiques (CSS, JavaScript côté client) |
| `views/` | Templates Handlebars (pages HTML) |

---

## Introduction

### URL de base
```
http://localhost:3000
```

### Technologies
- **Backend:** Node.js + Express.js
- **Base de données:** SQLite3
- **Authentification:** Passport.js (Local Strategy)
- **Sessions:** Express-Session + SQLite Store
- **Template Engine:** Express-Handlebars

### Format de réponse
- **Pages HTML:** Rendues via Handlebars (.hbs)
- **API JSON:** Content-Type: application/json (quand Accept: application/json)

### Système d'authentification
L'application utilise des **sessions basées sur cookies**. Après connexion, le cookie de session est automatiquement envoyé avec chaque requête.

---

## Authentification

### Middleware de protection

| Middleware | Description | Accès autorisé |
|------------|-------------|----------------|
| `ensureGuest` | Accessible uniquement si NON connecté | Pages login/register |
| `ensureAuthenticated` | Requiert une session active | User ou Admin |
| `ensureAdmin` | Requiert session + role='admin' | Admin seulement |

### Rôles utilisateur

```javascript
// Table users
{
  id: INTEGER,
  nom: TEXT,
  prenom: TEXT,
  email: TEXT UNIQUE,
  password: TEXT,  // Hashé avec bcrypt (10 rounds)
  role: TEXT,      // 'user' ou 'admin' (default: 'user')
  created_at: DATETIME
}
```

---

## Routes d'Authentification

### 📌 GET /auth/login
**Description:** Affiche le formulaire de connexion

**Accès:** Public (ensureGuest - redirige si déjà connecté)

**Query Parameters:**
- `error=1` : Affiche un message d'erreur (identifiants incorrects)
- `registered=1` : Affiche un message de succès après inscription

**Réponse:** Page HTML `auth/login.hbs`

---

### 📌 POST /auth/login
**Description:** Authentifie un utilisateur

**Accès:** Public

**Body (application/x-www-form-urlencoded):**
```
email: string (requis)
password: string (requis)
```

**Success Response:**
- **Status:** 302 Redirect
- **Redirection:** `/dashboard`

**Error Response:**
- **Status:** 302 Redirect
- **Redirection:** `/auth/login?error=1`

**Exemple cURL:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -c cookies.txt \
  -d "email=admin@lacite.ca&password=Admin123!"
```

---

### 📌 GET /auth/register
**Description:** Affiche le formulaire d'inscription

**Accès:** Public (ensureGuest)

**Réponse:** Page HTML `auth/register.hbs`

---

### 📌 POST /auth/register
**Description:** Crée un nouveau compte utilisateur

**Accès:** Public

**Body (application/x-www-form-urlencoded):**
```
nom: string (requis)
prenom: string (requis)
email: string (requis, unique)
password: string (requis, min 6 caractères)
confirmPassword: string (requis, doit correspondre à password)
```

**Validations:**
- Tous les champs requis
- Email unique
- Mot de passe ≥ 6 caractères
- password === confirmPassword

**Success Response:**
- **Status:** 302 Redirect
- **Redirection:** `/auth/login?registered=1`

**Error Response:**
- **Status:** 200 (re-render du formulaire avec erreur)
- Messages d'erreur possibles:
  - "Tous les champs sont requis"
  - "Les mots de passe ne correspondent pas"
  - "Le mot de passe doit contenir au moins 6 caractères"
  - "Cet email est déjà utilisé"

**Exemple cURL:**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "nom=Martin&prenom=Sophie&email=sophie.martin@lacite.ca&password=Password123&confirmPassword=Password123"
```

---

### 📌 GET /auth/logout
**Description:** Déconnecte l'utilisateur actuel

**Accès:** Public

**Success Response:**
- **Status:** 302 Redirect
- **Redirection:** `/`

---

## API Salles

**Préfixe:** `/api/salles`

### Structure d'une Salle

```javascript
{
  id: INTEGER,
  nom: TEXT,
  capacite: INTEGER,
  equipements: TEXT,        // CSV: "Projecteur,Wifi,Tableau blanc"
  description: TEXT,
  disponible: BOOLEAN,      // 0 ou 1
  created_at: DATETIME
}
```

---

### 📌 GET /api/salles
**Description:** Récupère toutes les salles disponibles

**Accès:** Authentifié (user ou admin)

**Headers:**
```
Accept: application/json  // Pour recevoir du JSON au lieu d'HTML
```

**Response JSON (200):**
```json
{
  "salles": [
    {
      "id": 1,
      "nom": "Salle Apollo",
      "capacite": 50,
      "equipements": "Projecteur,Tableau blanc,Wifi,Système audio",
      "description": "Grande salle de conférence",
      "disponible": 1,
      "created_at": "2025-12-05 10:00:00"
    }
  ]
}
```

**Response HTML (200):**
- Rend la vue `user/salles.hbs`

**Exemple cURL:**
```bash
curl -X GET http://localhost:3000/api/salles \
  -H "Accept: application/json" \
  -b cookies.txt
```

---

### 📌 GET /api/salles/:id
**Description:** Récupère les détails d'une salle spécifique

**Accès:** Authentifié (user ou admin)

**URL Parameters:**
- `id` : INTEGER (ID de la salle)

**Headers:**
```
Accept: application/json  // Pour JSON
```

**Response JSON (200):**
```json
{
  "salle": {
    "id": 1,
    "nom": "Salle Apollo",
    "capacite": 50,
    "equipements": "Projecteur,Tableau blanc,Wifi,Système audio",
    "description": "Grande salle de conférence",
    "disponible": 1,
    "created_at": "2025-12-05 10:00:00"
  }
}
```

**Error Response (404):**
- Rend la vue `errors/404.hbs`

**Exemple cURL:**
```bash
curl -X GET http://localhost:3000/api/salles/1 \
  -H "Accept: application/json" \
  -b cookies.txt
```

---

### 📌 POST /api/salles
**Description:** Créer une nouvelle salle

**Accès:** Admin uniquement (ensureAdmin)

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "nom": "Salle Innovation",
  "capacite": 20,
  "equipements": "Écran tactile,Wifi,Caméra",
  "description": "Salle collaborative moderne"
}
```

**Success Response (201):**
```json
{
  "message": "Salle créée",
  "id": 6
}
```

**Error Response (400):**
```json
{
  "error": "Nom et capacité requis"
}
```

**Error Response (500):**
```json
{
  "error": "Erreur lors de la création"
}
```

**Exemple cURL:**
```bash
curl -X POST http://localhost:3000/api/salles \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -b cookies.txt \
  -d '{
    "nom": "Salle Innovation",
    "capacite": 20,
    "equipements": "Écran tactile,Wifi,Caméra",
    "description": "Salle collaborative moderne"
  }'
```

---

### 📌 PUT /api/salles/:id
**Description:** Modifier une salle existante

**Accès:** Admin uniquement

**URL Parameters:**
- `id` : INTEGER (ID de la salle)

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "nom": "Salle Apollo Rénovée",
  "capacite": 60,
  "equipements": "Projecteur 4K,Tableau blanc,Wifi,Système audio",
  "description": "Grande salle rénovée",
  "disponible": 1
}
```

**Success Response (200):**
```json
{
  "message": "Salle mise à jour"
}
```

**Error Response (500):**
```json
{
  "error": "Erreur lors de la modification"
}
```

**Exemple cURL:**
```bash
curl -X PUT http://localhost:3000/api/salles/1 \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "nom": "Salle Apollo Rénovée",
    "capacite": 60,
    "equipements": "Projecteur 4K,Tableau blanc,Wifi",
    "description": "Grande salle rénovée",
    "disponible": 1
  }'
```

---

### 📌 DELETE /api/salles/:id
**Description:** Supprimer une salle

**Accès:** Admin uniquement

**URL Parameters:**
- `id` : INTEGER (ID de la salle)

**Success Response (200):**
```json
{
  "message": "Salle supprimée"
}
```

**Error Response (500):**
```json
{
  "error": "Erreur lors de la suppression"
}
```

**Exemple cURL:**
```bash
curl -X DELETE http://localhost:3000/api/salles/6 \
  -b cookies.txt
```

---

## API Réservations

**Préfixe:** `/api/reservations`

### Structure d'une Réservation

```javascript
{
  id: INTEGER,
  user_id: INTEGER,         // FK → users.id
  salle_id: INTEGER,        // FK → salles.id
  date_debut: DATETIME,     // Format: 'YYYY-MM-DD HH:MM:SS'
  date_fin: DATETIME,
  motif: TEXT,
  statut: TEXT,             // 'active', 'annulee', 'terminee'
  created_at: DATETIME,

  // Données JOIN
  salle_nom: TEXT,
  capacite: INTEGER,
  user_nom: TEXT,
  user_prenom: TEXT,
  user_email: TEXT
}
```

---

### 📌 GET /reservations/mes-reservations
**Description:** Affiche les réservations de l'utilisateur connecté

**Accès:** Authentifié (user ou admin)

**Response HTML:** Rend `user/mes-reservations.hbs`

**Response JSON (avec Accept: application/json):**
```json
{
  "reservations": [
    {
      "id": 1,
      "user_id": 2,
      "salle_id": 1,
      "date_debut": "2025-12-10 09:00:00",
      "date_fin": "2025-12-10 11:00:00",
      "motif": "Réunion d'équipe",
      "statut": "active",
      "created_at": "2025-12-05 14:20:00",
      "salle_nom": "Salle Apollo",
      "capacite": 50
    }
  ]
}
```

---

### 📌 GET /reservations/salle/:salleId
**Description:** Récupère toutes les réservations actives d'une salle

**Accès:** Authentifié

**URL Parameters:**
- `salleId` : INTEGER (ID de la salle)

**Response JSON (200):**
```json
{
  "reservations": [
    {
      "id": 3,
      "user_id": 5,
      "salle_id": 1,
      "date_debut": "2025-12-12 14:00:00",
      "date_fin": "2025-12-12 16:00:00",
      "motif": "Présentation client",
      "statut": "active",
      "created_at": "2025-12-06 10:00:00"
    }
  ]
}
```

**Exemple cURL:**
```bash
curl -X GET http://localhost:3000/reservations/salle/1 \
  -b cookies.txt
```

---

### 📌 POST /reservations
**Description:** Créer une nouvelle réservation

**Accès:** Authentifié (user ou admin)

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "salle_id": 1,
  "date_debut": "2025-12-15 10:00:00",
  "date_fin": "2025-12-15 12:00:00",
  "motif": "Formation NodeJS"
}
```

**Validations:**
- `salle_id`, `date_debut`, `date_fin` requis
- `date_fin` > `date_debut`
- Pas de conflit avec d'autres réservations actives
- Le `user_id` est automatiquement extrait de `req.user.id`

**Success Response (201):**
```json
{
  "message": "Réservation créée",
  "id": 10
}
```

**Error Response (400):**
```json
{
  "error": "Salle, date de début et date de fin requis"
}
```

**Error Response (400 - Date invalide):**
```json
{
  "error": "La date de fin doit être après la date de début"
}
```

**Error Response (409 - Conflit):**
```json
{
  "error": "Salle déjà réservée pour ce créneau"
}
```

**Exemple cURL:**
```bash
curl -X POST http://localhost:3000/reservations \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "salle_id": 1,
    "date_debut": "2025-12-15 10:00:00",
    "date_fin": "2025-12-15 12:00:00",
    "motif": "Formation NodeJS"
  }'
```

---

### 📌 DELETE /reservations/:id
**Description:** Annuler une réservation (statut → 'annulee')

**Accès:** Authentifié (user peut annuler uniquement ses réservations)

**URL Parameters:**
- `id` : INTEGER (ID de la réservation)

**Note:** L'annulation vérifie que `user_id` correspond à l'utilisateur connecté

**Success Response (200):**
```json
{
  "message": "Réservation annulée"
}
```

**Error Response (404):**
```json
{
  "error": "Réservation non trouvée"
}
```

**Error Response (500):**
```json
{
  "error": "Erreur lors de l'annulation"
}
```

**Exemple cURL:**
```bash
curl -X DELETE http://localhost:3000/reservations/10 \
  -b cookies.txt
```

---

### 📌 GET /reservations/all
**Description:** Récupère TOUTES les réservations (tous utilisateurs)

**Accès:** Admin uniquement

**Response JSON (200):**
```json
{
  "reservations": [
    {
      "id": 1,
      "user_id": 2,
      "salle_id": 1,
      "date_debut": "2025-12-10 09:00:00",
      "date_fin": "2025-12-10 11:00:00",
      "motif": "Réunion d'équipe",
      "statut": "active",
      "created_at": "2025-12-05 14:20:00",
      "user_nom": "Martin",
      "user_prenom": "Sophie",
      "user_email": "sophie.martin@lacite.ca",
      "salle_nom": "Salle Apollo"
    }
  ]
}
```

**Exemple cURL:**
```bash
curl -X GET http://localhost:3000/reservations/all \
  -b cookies.txt
```

---

## Routes Pages Admin

**Préfixe:** `/admin`
**Middleware:** Toutes les routes nécessitent `ensureAdmin`

### 📌 GET /admin/salles
**Description:** Page de gestion des salles (liste TOUTES les salles, même non disponibles)

**Accès:** Admin uniquement

**Réponse:** Page HTML `admin/salles.hbs`

**Données passées:**
```javascript
{
  title: 'Gestion des Salles',
  salles: [...]  // Toutes les salles (disponible = 0 ou 1)
}
```

---

### 📌 GET /admin/salles/ajouter
**Description:** Formulaire d'ajout d'une nouvelle salle

**Accès:** Admin uniquement

**Réponse:** Page HTML `admin/ajouter-salle.hbs`

---

### 📌 GET /admin/salles/modifier/:id
**Description:** Formulaire de modification d'une salle

**Accès:** Admin uniquement

**URL Parameters:**
- `id` : INTEGER (ID de la salle)

**Réponse:** Page HTML `admin/modifier-salle.hbs`

**Error (404):** Rend `errors/404.hbs` si salle non trouvée

---

### 📌 GET /admin/reservations
**Description:** Page affichant toutes les réservations de tous les utilisateurs

**Accès:** Admin uniquement

**Réponse:** Page HTML `admin/reservations.hbs`

**Données passées:**
```javascript
{
  title: 'Toutes les réservations',
  reservations: [...]  // Toutes les réservations avec JOIN users + salles
}
```

---

## Routes Pages Utilisateur

**Préfixe:** `/user`
**Middleware:** Toutes les routes nécessitent `ensureAuthenticated`

### 📌 GET /user/salles
**Description:** Liste des salles disponibles (disponible = 1)

**Accès:** Authentifié (user ou admin)

**Réponse:** Page HTML `user/salles.hbs`

---

### 📌 GET /user/salles/:id
**Description:** Détails d'une salle + formulaire de réservation

**Accès:** Authentifié

**URL Parameters:**
- `id` : INTEGER (ID de la salle)

**Réponse:** Page HTML `user/salle-detail.hbs`

**Error (404):** Rend `errors/404.hbs` si salle non trouvée

---

### 📌 GET /user/mes-reservations
**Description:** Liste des réservations actives de l'utilisateur connecté

**Accès:** Authentifié

**Réponse:** Page HTML `user/mes-reservations.hbs`

---

## Exemples d'utilisation

### Scénario 1: Un utilisateur s'inscrit et réserve une salle

```bash
# 1. Inscription
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "nom=Tremblay&prenom=Marc&email=marc.tremblay@lacite.ca&password=Password123&confirmPassword=Password123"

# 2. Connexion
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -c cookies.txt \
  -d "email=marc.tremblay@lacite.ca&password=Password123"

# 3. Voir les salles disponibles
curl -X GET http://localhost:3000/api/salles \
  -H "Accept: application/json" \
  -b cookies.txt

# 4. Voir les détails de la salle #1
curl -X GET http://localhost:3000/api/salles/1 \
  -H "Accept: application/json" \
  -b cookies.txt

# 5. Vérifier les réservations existantes pour cette salle
curl -X GET http://localhost:3000/reservations/salle/1 \
  -b cookies.txt

# 6. Créer une réservation
curl -X POST http://localhost:3000/reservations \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "salle_id": 1,
    "date_debut": "2025-12-20 14:00:00",
    "date_fin": "2025-12-20 16:00:00",
    "motif": "Présentation de projet final"
  }'

# 7. Voir mes réservations
curl -X GET http://localhost:3000/reservations/mes-reservations \
  -H "Accept: application/json" \
  -b cookies.txt
```

---

### Scénario 2: Admin gère les salles

```bash
# 1. Connexion admin
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -c cookies.txt \
  -d "email=admin@lacite.ca&password=Admin123!"

# 2. Créer une nouvelle salle
curl -X POST http://localhost:3000/api/salles \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "nom": "Salle Futur",
    "capacite": 25,
    "equipements": "Projecteur,Wifi,Tableau blanc interactif",
    "description": "Nouvelle salle équipée"
  }'

# 3. Modifier la salle #2
curl -X PUT http://localhost:3000/api/salles/2 \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "nom": "Salle Innovation Pro",
    "capacite": 30,
    "equipements": "Écran 4K,Wifi,Caméra,Microphones",
    "description": "Salle améliorée pour visioconférences",
    "disponible": 1
  }'

# 4. Voir toutes les réservations
curl -X GET http://localhost:3000/reservations/all \
  -b cookies.txt

# 5. Supprimer une salle
curl -X DELETE http://localhost:3000/api/salles/6 \
  -b cookies.txt
```

---

### Scénario 3: Gestion des conflits de réservation

```bash
# Tenter de réserver un créneau déjà occupé
curl -X POST http://localhost:3000/reservations \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "salle_id": 1,
    "date_debut": "2025-12-20 14:30:00",
    "date_fin": "2025-12-20 15:30:00",
    "motif": "Test conflit"
  }'

# Réponse attendue (409):
# {
#   "error": "Salle déjà réservée pour ce créneau"
# }
```

---

## Logique de vérification des conflits

La méthode `Reservation.checkAvailability()` vérifie les chevauchements :

```sql
SELECT COUNT(*) as count FROM reservations
WHERE salle_id = ?
AND statut = 'active'
AND (
  (date_debut <= ? AND date_fin >= ?) OR   -- Nouvelle résa commence pendant une existante
  (date_debut <= ? AND date_fin >= ?) OR   -- Nouvelle résa finit pendant une existante
  (date_debut >= ? AND date_fin <= ?)      -- Nouvelle résa englobe une existante
)
```

**Retourne:** `true` si aucun conflit, `false` sinon

---

## Codes de statut HTTP

| Code | Signification | Utilisation |
|------|---------------|-------------|
| **200** | OK | Requête réussie |
| **201** | Created | Ressource créée (salle, réservation) |
| **302** | Redirect | Redirection après login/logout/register |
| **400** | Bad Request | Paramètres manquants ou invalides |
| **401** | Unauthorized | Session expirée ou non authentifié |
| **403** | Forbidden | Pas les droits (ex: user tente action admin) |
| **404** | Not Found | Ressource non trouvée |
| **409** | Conflict | Conflit (salle déjà réservée) |
| **500** | Server Error | Erreur base de données ou serveur |

---

## Notes importantes

### Sécurité
- Mots de passe hashés avec **bcrypt** (10 rounds)
- Sessions stockées dans SQLite (`sessions.db`)
- Middleware Helmet pour headers sécurisés
- CORS configuré
- Protection CSRF via sessions

### Sessions
- **Durée:** Configurable via `SESSION_SECRET` (.env)
- **Cookie:** `connect.sid`
- **Store:** SQLite (`connect-sqlite3`)

### Base de données
- **Fichier:** `database.db`
- **Tables:** `users`, `salles`, `reservations`
- **Initialisation:** `config/database.js` crée automatiquement les tables

---

## Comptes de test

### Administrateur
```
Email: admin@lacite.ca
Password: Admin123!
```

### Utilisateur standard
Créer via `/auth/register` ou:
```
Email: user@lacite.ca
Password: User123!
```

---

**Équipe de développement:**
- **Ruben:** Chef de projet + Authentification
- **Jovani:** Backend Salles + Base de données
- **Alicia S-C:** Backend Réservations
- **Alicia T:** Frontend Admin
- **Hermann:** Frontend User + UML

**Institution:** Collège La Cité
**Année:** 2025

---

**Fin de la documentation API** 🎓
