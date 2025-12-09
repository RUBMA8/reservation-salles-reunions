# 🔧 Guide Administrateur - Système de Réservation de Salles

**Projet:** Système de Réservation de Salles de Réunion - Collège La Cité
**Public cible:** Administrateurs système
**Version:** 1.0.0
**Date:** Décembre 2025

---

## 📋 Table des matières

1. [Introduction](#introduction)
2. [Accès administrateur](#accès-administrateur)
3. [Dashboard administrateur](#dashboard-administrateur)
4. [Gestion des salles](#gestion-des-salles)
5. [Ajouter une nouvelle salle](#ajouter-une-nouvelle-salle)
6. [Modifier une salle](#modifier-une-salle)
7. [Supprimer une salle](#supprimer-une-salle)
8. [Gérer la disponibilité](#gérer-la-disponibilité)
9. [Consulter toutes les réservations](#consulter-toutes-les-réservations)
10. [Scénarios d'administration](#scénarios-dadministration)
11. [API pour les administrateurs](#api-pour-les-administrateurs)
12. [Maintenance et dépannage](#maintenance-et-dépannage)

---

## Introduction

Ce guide est destiné aux **administrateurs** du Système de Réservation de Salles du Collège La Cité.

### Responsabilités de l'administrateur

En tant qu'administrateur, vous êtes responsable de :

✅ **Gestion des salles**
- Ajouter de nouvelles salles
- Modifier les informations des salles existantes
- Supprimer des salles obsolètes
- Gérer la disponibilité des salles

✅ **Supervision des réservations**
- Consulter toutes les réservations (tous utilisateurs)
- Identifier les conflits potentiels
- Annuler des réservations si nécessaire

✅ **Maintenance du système**
- Assurer le bon fonctionnement de l'application
- Résoudre les problèmes techniques
- Gérer les comptes utilisateurs (via base de données)

### Privilèges administrateur

Vous avez accès à :
- Toutes les fonctionnalités utilisateur standard
- Interface d'administration `/admin`
- API complète de gestion des salles
- Vue globale de toutes les réservations
- Droits de modification/suppression sur toutes les ressources

---

## Accès administrateur

### Compte administrateur par défaut

```
Email: admin@lacite.ca
Password: Admin123!
```

⚠️ **IMPORTANT :** Changez ce mot de passe après la première connexion !

### Se connecter en tant qu'administrateur

1. Accédez à l'application : `http://localhost:3000`
2. Cliquez sur **"Se connecter"**
3. Entrez vos identifiants administrateur
4. Vous serez redirigé vers le **Dashboard**

### Vérifier vos privilèges

Après connexion, vérifiez que vous avez le rôle administrateur :
- Le menu doit contenir des options "Admin"
- Vous devez pouvoir accéder à `/admin/salles`

Si vous ne voyez pas ces options, votre compte n'a pas le rôle `admin`.

---

## Dashboard administrateur

### Accéder au dashboard

- **URL :** `/admin/dashboard` ou `/dashboard` (si vous êtes admin)
- **Menu :** Cliquez sur "Dashboard" après connexion

### Informations affichées

Le dashboard admin affiche :

| Section | Description |
|---------|-------------|
| **Statistiques globales** | Nombre de salles, réservations actives, utilisateurs |
| **Réservations récentes** | Liste des dernières réservations créées |
| **Actions rapides** | Liens vers gestion des salles et réservations |
| **Alertes** | Conflits, erreurs, ou notifications importantes |

### Actions disponibles depuis le dashboard

- 🏢 **Gérer les salles** → `/admin/salles`
- 📅 **Voir toutes les réservations** → `/admin/reservations`
- ➕ **Ajouter une salle** → `/admin/salles/ajouter`

---

## Gestion des salles

### Accéder à la liste des salles

1. Dans le menu, cliquez sur **"Gestion des salles"** (Admin)
2. Ou accédez directement à `/admin/salles`

### Vue d'ensemble

Cette page affiche **TOUTES** les salles, y compris :
- Les salles disponibles (`disponible = 1`)
- Les salles non disponibles (`disponible = 0`)

### Informations affichées pour chaque salle

| Colonne | Description |
|---------|-------------|
| **ID** | Identifiant unique de la salle |
| **Nom** | Nom de la salle |
| **Capacité** | Nombre de places |
| **Équipements** | Liste des équipements (CSV) |
| **Description** | Description courte |
| **Statut** | Disponible / Non disponible |
| **Actions** | Modifier / Supprimer |

### Exemple d'affichage

```
╔═══════════════════════════════════════════════════════════════════╗
║  GESTION DES SALLES                                               ║
╠════╦═══════════════╦═══════════╦═══════════════════╦═══════════════╣
║ ID ║ Nom           ║ Capacité  ║ Équipements       ║ Actions       ║
╠════╬═══════════════╬═══════════╬═══════════════════╬═══════════════╣
║ 1  ║ Salle Apollo  ║ 50        ║ Projecteur, Wifi  ║ [✏️] [🗑️]    ║
║ 2  ║ Salle Innov.  ║ 20        ║ Écran, Caméra     ║ [✏️] [🗑️]    ║
║ 3  ║ Salle Test    ║ 10        ║ Tableau blanc     ║ [✏️] [🗑️]    ║
╚════╩═══════════════╩═══════════╩═══════════════════╩═══════════════╝

[➕ Ajouter une nouvelle salle]
```

### Trier et filtrer

**Tri par défaut :** Alphabétique par nom de salle

**Options de filtrage** (selon implémentation) :
- Salles disponibles uniquement
- Salles par capacité
- Salles par équipement

---

## Ajouter une nouvelle salle

### Méthode 1 : Via l'interface web

#### Étape 1 : Accéder au formulaire

1. Accédez à `/admin/salles`
2. Cliquez sur le bouton **"Ajouter une nouvelle salle"**
3. Vous serez redirigé vers `/admin/salles/ajouter`

#### Étape 2 : Remplir le formulaire

| Champ | Type | Requis | Description | Exemple |
|-------|------|--------|-------------|---------|
| **Nom** | Texte | ✅ Oui | Nom unique de la salle | Salle Futur |
| **Capacité** | Nombre | ✅ Oui | Nombre de places (> 0) | 25 |
| **Équipements** | Texte | ✅ Oui | Liste séparée par virgules | Projecteur,Wifi,Tableau blanc |
| **Description** | Texte long | ❌ Non | Description détaillée | Salle moderne pour formations |

**Note :** Le champ `disponible` est automatiquement mis à `1` (disponible) par défaut.

#### Étape 3 : Valider

1. Vérifiez que tous les champs obligatoires sont remplis
2. Cliquez sur le bouton **"Ajouter la salle"**
3. Le formulaire soumet les données à `POST /api/salles`

#### Résultat

✅ **Succès :**
- Message : "Salle créée avec succès"
- Redirection vers `/admin/salles`
- La nouvelle salle apparaît dans la liste

❌ **Erreur :**
- Message : "Nom et capacité requis" (si champs manquants)
- Le formulaire est ré-affiché avec les données saisies

---

### Méthode 2 : Via l'API (cURL)

Pour ajouter une salle via l'API :

```bash
curl -X POST http://localhost:3000/api/salles \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "nom": "Salle Horizon",
    "capacite": 30,
    "equipements": "Projecteur 4K,Wifi,Tableau interactif,Système audio",
    "description": "Grande salle équipée pour conférences"
  }'
```

**Réponse attendue :**
```json
{
  "message": "Salle créée",
  "id": 6
}
```

---

## Modifier une salle

### Méthode 1 : Via l'interface web

#### Étape 1 : Accéder au formulaire de modification

1. Accédez à `/admin/salles`
2. Trouvez la salle à modifier dans la liste
3. Cliquez sur l'icône **✏️ Modifier** (ou bouton "Modifier")
4. Vous serez redirigé vers `/admin/salles/modifier/:id`

#### Étape 2 : Modifier les informations

Le formulaire affiche les valeurs actuelles de la salle.

**Vous pouvez modifier :**
- Le nom de la salle
- La capacité
- Les équipements
- La description
- **La disponibilité** (disponible / non disponible)

#### Étape 3 : Enregistrer les modifications

1. Modifiez les champs souhaités
2. Cliquez sur le bouton **"Enregistrer les modifications"**
3. Le formulaire soumet les données à `PUT /api/salles/:id`

#### Résultat

✅ **Succès :**
- Message : "Salle mise à jour avec succès"
- Redirection vers `/admin/salles`
- Les modifications sont visibles dans la liste

❌ **Erreur :**
- Message d'erreur approprié
- Le formulaire est ré-affiché

---

### Méthode 2 : Via l'API

```bash
curl -X PUT http://localhost:3000/api/salles/1 \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "nom": "Salle Apollo - Rénovée",
    "capacite": 60,
    "equipements": "Projecteur 4K,Tableau blanc,Wifi premium,Système audio",
    "description": "Grande salle rénovée avec équipements premium",
    "disponible": 1
  }'
```

**Réponse attendue :**
```json
{
  "message": "Salle mise à jour"
}
```

---

## Supprimer une salle

### ⚠️ Avertissement

La suppression d'une salle est **irréversible** et peut :
- Affecter les réservations existantes
- Causer des erreurs si des réservations actives existent

**Recommandation :** Plutôt que de supprimer, préférez **désactiver** la salle en mettant `disponible = 0`.

---

### Méthode 1 : Via l'interface web

#### Étape 1 : Identifier la salle

1. Accédez à `/admin/salles`
2. Trouvez la salle à supprimer

#### Étape 2 : Supprimer

1. Cliquez sur l'icône **🗑️ Supprimer** (ou bouton "Supprimer")
2. Une fenêtre de confirmation apparaît :
   ```
   ⚠️ ATTENTION ⚠️

   Êtes-vous sûr de vouloir supprimer la salle "Salle Apollo" ?

   Cette action est irréversible !

   [Confirmer la suppression]  [Annuler]
   ```
3. Cliquez sur **"Confirmer la suppression"**

#### Résultat

✅ **Succès :**
- Message : "Salle supprimée avec succès"
- La salle disparaît de la liste

❌ **Erreur possible :**
- Si des réservations actives existent, la suppression peut être bloquée
- Message : "Impossible de supprimer cette salle (réservations actives)"

---

### Méthode 2 : Via l'API

```bash
curl -X DELETE http://localhost:3000/api/salles/6 \
  -b cookies.txt
```

**Réponse attendue :**
```json
{
  "message": "Salle supprimée"
}
```

---

## Gérer la disponibilité

### Rendre une salle indisponible

Au lieu de supprimer une salle, vous pouvez la rendre **temporairement indisponible** :

#### Via l'interface web

1. Accédez à `/admin/salles/modifier/:id`
2. Changez le statut à **"Non disponible"** (ou décochez "Disponible")
3. Enregistrez les modifications

#### Via l'API

```bash
curl -X PUT http://localhost:3000/api/salles/2 \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "nom": "Salle Innovation",
    "capacite": 20,
    "equipements": "Écran tactile,Wifi",
    "description": "En maintenance",
    "disponible": 0
  }'
```

### Effet sur les utilisateurs

Quand une salle est `disponible = 0` :
- ❌ Elle **n'apparaît PAS** dans la liste des salles pour les utilisateurs standards
- ❌ Les utilisateurs **ne peuvent PAS** la réserver
- ✅ Les **réservations existantes** restent valides
- ✅ Les **administrateurs** voient toujours la salle dans `/admin/salles`

### Réactiver une salle

Pour réactiver une salle :
1. Modifiez la salle
2. Mettez `disponible = 1`
3. Enregistrez

La salle redevient immédiatement réservable.

---

## Consulter toutes les réservations

### Accéder à la liste complète

1. Dans le menu admin, cliquez sur **"Toutes les réservations"**
2. Ou accédez à `/admin/reservations`

### Informations affichées

Pour chaque réservation, vous verrez :

| Colonne | Description |
|---------|-------------|
| **ID** | Identifiant unique |
| **Utilisateur** | Nom, prénom et email de l'utilisateur |
| **Salle** | Nom de la salle réservée |
| **Date et heure** | Date de début et de fin |
| **Motif** | Raison de la réservation |
| **Statut** | Active / Annulée / Terminée |
| **Créée le** | Date de création |

### Exemple d'affichage

```
╔═════════════════════════════════════════════════════════════════════════╗
║  TOUTES LES RÉSERVATIONS                                                ║
╠════╦════════════════╦═══════════════╦════════════════╦══════════════════╣
║ ID ║ Utilisateur    ║ Salle         ║ Date/Heure     ║ Statut           ║
╠════╬════════════════╬═══════════════╬════════════════╬══════════════════╣
║ 1  ║ Sophie Martin  ║ Salle Apollo  ║ 2025-12-10     ║ ✅ Active       ║
║    ║ sophie@la...   ║               ║ 09:00 - 11:00  ║                  ║
║────┼────────────────┼───────────────┼────────────────┼──────────────────║
║ 2  ║ Marc Tremblay  ║ Salle Innov.  ║ 2025-12-15     ║ ✅ Active       ║
║    ║ marc@laci...   ║               ║ 14:00 - 16:00  ║                  ║
║────┼────────────────┼───────────────┼────────────────┼──────────────────║
║ 3  ║ Jean Dupont    ║ Salle Apollo  ║ 2025-12-05     ║ ❌ Annulée      ║
║    ║ jean@laci...   ║               ║ 10:00 - 12:00  ║                  ║
╚════╩════════════════╩═══════════════╩════════════════╩══════════════════╝
```

### Filtrer les réservations

**Filtres disponibles** (selon implémentation) :
- Par statut (Active, Annulée, Terminée)
- Par salle
- Par utilisateur
- Par période (date de début / fin)

### Actions possibles

En tant qu'administrateur, vous pouvez :
- ✅ **Consulter** toutes les réservations
- ✅ **Annuler** une réservation d'un utilisateur (via API)
- ❌ **Modifier** une réservation (non implémenté - annuler et recréer)

---

## Scénarios d'administration

### Scénario 1 : Ajouter une nouvelle salle équipée

**Contexte :** Le Collège La Cité vient d'aménager une nouvelle salle de conférence.

**Tâche :** Ajouter la salle dans le système pour la rendre réservable.

**Étapes :**

1. **Connexion**
   - Se connecter avec le compte admin

2. **Accès à la gestion des salles**
   - Cliquer sur "Gestion des salles" (Admin)
   - Accéder à `/admin/salles`

3. **Création de la salle**
   - Cliquer sur "Ajouter une nouvelle salle"
   - Remplir le formulaire :
     - Nom : **Salle Horizon**
     - Capacité : **40**
     - Équipements : **Projecteur 4K,Wifi fibre,Tableau interactif,Système de visioconférence,Microphones sans fil**
     - Description : **Salle de conférence moderne équipée pour événements hybrides et présentations professionnelles**

4. **Validation**
   - Cliquer sur "Ajouter la salle"
   - Vérifier le message de confirmation

5. **Vérification**
   - Retourner sur `/admin/salles`
   - Confirmer que la "Salle Horizon" apparaît dans la liste
   - Se connecter avec un compte utilisateur et vérifier qu'elle est réservable

**Résultat :** La nouvelle salle est maintenant disponible pour tous les utilisateurs.

---

### Scénario 2 : Mettre une salle en maintenance

**Contexte :** La Salle Apollo doit subir des travaux de rénovation pendant 2 semaines.

**Tâche :** Rendre la salle temporairement indisponible.

**Étapes :**

1. **Identifier la salle**
   - Accéder à `/admin/salles`
   - Trouver "Salle Apollo" (ID : 1)

2. **Modifier la disponibilité**
   - Cliquer sur "Modifier" pour la Salle Apollo
   - Changer le statut à **"Non disponible"**
   - Modifier la description : **"Salle en rénovation jusqu'au 20 décembre 2025"**

3. **Enregistrer**
   - Cliquer sur "Enregistrer les modifications"

4. **Vérification**
   - Accéder à `/user/salles` (vue utilisateur)
   - Confirmer que la Salle Apollo n'apparaît plus dans la liste

5. **Réactivation (après les travaux)**
   - Modifier la salle
   - Remettre `disponible = 1`
   - Mettre à jour la description

**Résultat :** La salle est temporairement retirée du système de réservation.

---

### Scénario 3 : Résoudre un conflit de réservation

**Contexte :** Deux utilisateurs signalent avoir réservé la même salle au même moment.

**Tâche :** Identifier et résoudre le conflit.

**Étapes :**

1. **Consulter les réservations**
   - Accéder à `/admin/reservations`
   - Filtrer par salle concernée (ex: Salle Innovation)

2. **Identifier le conflit**
   - Vérifier les créneaux horaires
   - Exemple :
     - Réservation #5 : 2025-12-15, 14:00-16:00 (Sophie Martin)
     - Réservation #6 : 2025-12-15, 15:00-17:00 (Marc Tremblay)
   - Chevauchement détecté !

3. **Analyse**
   - Vérifier dans la base de données comment cela a pu arriver
   - Normalement, `checkAvailability()` devrait empêcher cela

4. **Résolution**
   - Contacter les deux utilisateurs
   - Proposer des solutions :
     - Option A : Marc utilise une autre salle
     - Option B : Sophie termine sa réservation à 15:00
     - Option C : Réserver une salle plus grande pour les deux

5. **Action dans le système**
   - Annuler une des réservations (via API ou base de données)
   - Créer une nouvelle réservation ajustée

**Résultat :** Le conflit est résolu et les deux utilisateurs ont des créneaux distincts.

---

### Scénario 4 : Migrer une salle (changement d'équipements)

**Contexte :** La Salle Innovation a été équipée de nouveaux matériels.

**Tâche :** Mettre à jour les informations de la salle.

**Étapes :**

1. **Accéder à la modification**
   - `/admin/salles`
   - Cliquer sur "Modifier" pour Salle Innovation

2. **Mettre à jour les informations**
   - Anciens équipements : "Écran tactile,Wifi,Caméra"
   - Nouveaux équipements : **"Écran tactile 4K,Wifi fibre,Caméra 4K,Système audio Bose,Éclairage LED"**
   - Augmenter la capacité : **20 → 25** (nouveaux sièges)
   - Mettre à jour la description

3. **Enregistrer**
   - Sauvegarder les modifications

4. **Communication**
   - Informer les utilisateurs des nouvelles capacités
   - (Envoyer un email ou afficher une annonce)

**Résultat :** Les utilisateurs voient les équipements mis à jour lors de la réservation.

---

## API pour les administrateurs

### Endpoints réservés aux admins

Seuls les administrateurs peuvent accéder à ces endpoints :

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| **POST** | `/api/salles` | Créer une nouvelle salle |
| **PUT** | `/api/salles/:id` | Modifier une salle |
| **DELETE** | `/api/salles/:id` | Supprimer une salle |
| **GET** | `/reservations/all` | Voir toutes les réservations (tous users) |

### Authentification

Pour utiliser l'API en tant qu'admin :

1. **Se connecter** et récupérer le cookie de session :
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -c cookies.txt \
  -d "email=admin@lacite.ca&password=Admin123!"
```

2. **Utiliser le cookie** dans les requêtes suivantes :
```bash
curl -X POST http://localhost:3000/api/salles \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"nom": "Nouvelle Salle", "capacite": 30, ...}'
```

### Gestion des erreurs

| Code | Signification | Action |
|------|---------------|--------|
| **403** | Forbidden - Pas admin | Vérifier vos privilèges |
| **400** | Bad Request | Vérifier les paramètres |
| **500** | Server Error | Vérifier les logs serveur |

---

## Maintenance et dépannage

### Accès à la base de données

La base de données SQLite se trouve dans :
```
backend/database.db
```

**Outils recommandés :**
- DB Browser for SQLite
- SQLite CLI

### Requêtes SQL utiles

#### Voir tous les administrateurs
```sql
SELECT id, nom, prenom, email, role FROM users WHERE role = 'admin';
```

#### Promouvoir un utilisateur en admin
```sql
UPDATE users SET role = 'admin' WHERE email = 'nouveau.admin@lacite.ca';
```

#### Rétrograder un admin en user
```sql
UPDATE users SET role = 'user' WHERE email = 'ancien.admin@lacite.ca';
```

#### Voir les salles non disponibles
```sql
SELECT * FROM salles WHERE disponible = 0;
```

#### Trouver les réservations en conflit (vérification manuelle)
```sql
SELECT r1.id AS res1, r2.id AS res2, r1.salle_id, r1.date_debut, r1.date_fin
FROM reservations r1
JOIN reservations r2 ON r1.salle_id = r2.salle_id
  AND r1.id < r2.id
  AND r1.statut = 'active'
  AND r2.statut = 'active'
  AND (
    (r1.date_debut <= r2.date_debut AND r1.date_fin >= r2.date_debut) OR
    (r1.date_debut <= r2.date_fin AND r1.date_fin >= r2.date_fin) OR
    (r1.date_debut >= r2.date_debut AND r1.date_fin <= r2.date_fin)
  );
```

#### Annuler toutes les réservations d'une salle
```sql
UPDATE reservations
SET statut = 'annulee'
WHERE salle_id = 3 AND statut = 'active';
```

### Logs serveur

Les logs du serveur Node.js affichent :
- Erreurs de base de données
- Tentatives de connexion
- Erreurs d'authentification
- Conflits de réservation

**Accéder aux logs :**
```bash
cd backend
npm run dev  # Mode développement avec logs détaillés
```

### Sauvegardes

**Sauvegarder la base de données :**
```bash
cp backend/database.db backend/database_backup_$(date +%Y%m%d).db
```

**Restaurer une sauvegarde :**
```bash
cp backend/database_backup_20251207.db backend/database.db
```

### Réinitialiser le mot de passe d'un utilisateur

**Méthode 1 : Via bcrypt (Node.js)**
```javascript
const bcrypt = require('bcrypt');
const newPassword = 'NewPassword123!';
const hash = bcrypt.hashSync(newPassword, 10);
console.log(hash);  // Copier ce hash
```

**Méthode 2 : SQL avec hash généré**
```sql
UPDATE users
SET password = '$2b$10$...'
WHERE email = 'utilisateur@lacite.ca';
```

### Problèmes courants

#### Problème : Sessions qui expirent trop rapidement

**Solution :** Modifier la durée de session dans `server.js` :
```javascript
session({
  cookie: { maxAge: 24 * 60 * 60 * 1000 }  // 24 heures
})
```

#### Problème : Impossible de créer une salle (erreur 403)

**Cause :** Votre compte n'a pas le rôle admin

**Solution :** Vérifier le rôle dans la base de données

#### Problème : Conflits de réservation non détectés

**Cause :** Bug dans `checkAvailability()` ou problème de timezone

**Solution :**
1. Vérifier les logs
2. Tester manuellement avec SQL
3. Vérifier le format des dates

---

## Sécurité

### Bonnes pratiques

✅ **À FAIRE :**
- Changer le mot de passe admin par défaut
- Utiliser HTTPS en production
- Sauvegarder régulièrement la base de données
- Limiter le nombre de comptes admin
- Auditer les logs régulièrement

❌ **À ÉVITER :**
- Partager les identifiants admin
- Donner le rôle admin à tous les utilisateurs
- Exposer la base de données publiquement
- Désactiver les validations de sécurité

### Variables d'environnement (.env)

Fichier `.env` à configurer :
```env
PORT=3000
SESSION_SECRET=votre_secret_unique_et_long
NODE_ENV=production
```

⚠️ **Ne JAMAIS** commiter le fichier `.env` dans Git !

---

## Support technique

### Contacts

**Équipe de développement :**
- **Ruben** (Chef de projet + Auth) : ruben@projet.lacite.ca
- **Jovani** (Backend Salles) : jovani@projet.lacite.ca
- **Alicia S-C** (Backend Réservations) : alicia.sc@projet.lacite.ca
- **Alicia T** (Frontend Admin) : alicia.t@projet.lacite.ca
- **Hermann** (Frontend User) : hermann@projet.lacite.ca

### Ressources

- **Documentation API :** `docs/API_DOCUMENTATION.md`
- **Guide utilisateur :** `docs/GUIDE_UTILISATEUR.md`
- **Code source :** `backend/`

---

## Annexe : Architecture technique

### Structure des fichiers

```
backend/
├── config/
│   ├── database.js       # Connexion SQLite
│   └── passport.js       # Stratégie d'auth
├── controllers/
│   ├── authController.js
│   ├── sallesController.js
│   └── reservationsController.js
├── middleware/
│   └── auth.js           # ensureAdmin, ensureAuthenticated
├── models/
│   ├── salle.js
│   └── reservation.js
├── routes/
│   ├── admin.js          # Routes admin (/admin/*)
│   ├── salles.js         # API salles (/api/salles)
│   └── reservations.js   # API réservations
├── views/
│   └── admin/
│       ├── salles.hbs
│       ├── ajouter-salle.hbs
│       ├── modifier-salle.hbs
│       └── reservations.hbs
├── database.db           # Base SQLite
└── server.js             # Point d'entrée
```

### Middleware de protection

```javascript
// Dans middleware/auth.js
exports.ensureAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'admin') {
    return next();
  }
  res.status(403).render('errors/403');
};
```

### Modèle Salle

```javascript
// Dans models/salle.js
class Salle {
  static getAll(callback)           // Users voient disponible=1
  static getAllAdmin(callback)      // Admin voit tout
  static getById(id, callback)
  static create(data, callback)
  static update(id, data, callback)
  static delete(id, callback)
}
```

---

**Équipe de développement :**
- Ruben (Chef de projet + Authentification)
- Jovani (Backend Salles + Base de données)
- Alicia S-C (Backend Réservations)
- Alicia T (Frontend Admin)
- Hermann (Frontend User + UML)

**Institution :** Collège La Cité
**Année :** 2025

---

**Fin du guide administrateur** 🎓

*Merci de maintenir le Système de Réservation de Salles du Collège La Cité !*
