CHARTE DE COLLABORATION

## Système de Réservation de Salles de Réunion

**Projet académique - Collège La Cité**  
**Date de création :** 9 décembre 2024  
**Équipe :** 5 membres

## COMPOSITION DE L'ÉQUIPE

| **Membre** | **ID Étudiant** | **Rôle Principal** | **Branche Git** |
| --- | --- | --- | --- |
| Kouamé Yéliey Ruben-Marie Bouakaly | 2742806 | Chef de projet & Authentification | feature/auth |
| Jovani Clément | 2744714 | Backend Salles & Base de données | feature/api-salles |
| Alicia Terbouche | 2737141 | Frontend Gestion Admin | feature/frontend-admin |
| Alicia Serey-Cormier | 2738940 | Backend Réservations | feature/api-reservations |
| Hermann Blondel Njeutsa | 2741245 | Frontend Utilisateur & UML | feature/frontend-user |

## OBJECTIFS DU PROJET

### Objectifs Pédagogiques

- Démontrer la maîtrise du **travail collaboratif** avec Git/GitHub
- Appliquer les **bonnes pratiques** de développement logiciel
- Respecter une **architecture MVC** et des **conventions de code**
- Produire une **documentation complète** et professionnelle
- Livrer un **projet fonctionnel** testé et déployable

### Objectifs Techniques

- Système d'authentification sécurisé (Passport.js)
- API RESTful complète pour la gestion des salles et réservations
- Interface responsive et intuitive
- Base de données SQLite avec relations
- Protection des routes selon les rôles (user/admin)

## ARCHITECTURE GIT

### Structure des Branches

main (production - code stable uniquement)

└── develop (intégration - branche principale de travail)

├── feature/auth (Ruben)

├── feature/api-salles (Jovani)

├── feature/api-reservations (Alicia S-C.)

├── feature/frontend-admin (Alicia T.)

└── feature/frontend-user (Hermann)

### Rôle de Chaque Branche

**main**

- Code de production, stable et testé
- Merge uniquement depuis develop
- Protégée : pas de commit direct
- Merge final effectué par le chef de projet

**develop**

- Branche d'intégration
- Reçoit toutes les Pull Requests des features
- Tests d'intégration avant merge vers main
- Point de synchronisation de l'équipe

**feature/\***

- Une branche par fonctionnalité
- Développement isolé
- Merge vers develop via Pull Request
- Supprimée après merge réussi

## 📜 RÈGLES DE COLLABORATION

### RÈGLE 1 : Une Branche par Fonctionnalité

**Principe :**

- Chaque membre travaille **UNIQUEMENT** sur sa branche feature/
- **JAMAIS** de commit direct sur main ou develop

**Pourquoi ?**

- Évite les conflits pendant le développement
- Permet le travail en parallèle
- Facilite le code review
- Isole les bugs potentiels

**Comment créer sa branche :**

git checkout develop

git pull origin develop

git checkout -b feature/nom-fonctionnalite

git push -u origin feature/nom-fonctionnalite

### RÈGLE 2 : Commits Réguliers et Clairs

**Exigences :**

- **Minimum 4-5 commits** par personne sur la durée du projet
- Messages de commit en **français**
- Format standardisé : type(scope): message

**Types de Commits (si necessaire):**

| **Type** | **Usage** | **Exemple** |
| --- | --- | --- |
| feat | Nouvelle fonctionnalité | feat(auth): add login page |
| fix | Correction de bug | fix(salles): correct database query |
| docs | Documentation | docs(readme): update installation steps |
| style | Mise en forme CSS/code | style(css): improve button design |
| refactor | Refactorisation | refactor(api): simplify controller logic |
| test | Ajout de tests | test(auth): add login validation tests |
| chore | Tâches diverses | chore(deps): update dependencies |

**Exemples de Bons Messages :**

✅ feat(reservations): add booking form validation

✅ fix(auth): resolve password hashing issue

✅ docs(api): document reservation endpoints

✅ style(dashboard): improve mobile responsiveness

**Exemples de Mauvais Messages :**

❌ update

❌ fix bug

❌ changes

❌ WIP

**Fréquence des Commits :**

- Commit après chaque fonctionnalité complétée
- Commit avant de quitter pour la journée
- Commit avant chaque synchronisation avec develop

### RÈGLE 3 : Pull Requests Obligatoires

**Processus de Pull Request :**

- **Créer la PR sur GitHub**

- Base : develop
- Compare : feature/votre-branche
- Titre clair et descriptif
- Description détaillée des changements

- **Template de Description PR (si possible) :**

\## 📋 Résumé des changements

\[Description courte\]

\## ✅ Fonctionnalités ajoutées

\- \[ \] Fonctionnalité 1

\- \[ \] Fonctionnalité 2

\## 🧪 Tests effectués

\- \[ \] Tests manuels

\- \[ \] Tests d'intégration

\## 📸 Captures d'écran

\[Si applicable\]

\## 📝 Notes pour les reviewers

\[Points particuliers à vérifier\]

- **Review obligatoire**

- **Ruben est le reviewer**
- Le reviewer doit tester le code localement
- Vérifier : fonctionnalité, qualité code, documentation

- **Règles de Merge**

- ❌ **Interdiction** de merger sa propre PR
- ✅ Attendre l'approbation du reviewer
- ✅ Résoudre tous les commentaires avant merge
- ✅ Tester après le merge sur develop

### RÈGLE 4 : Synchronisation Régulière

**Avant de Commencer à Travailler:**

\# 1. Se placer sur develop

git checkout develop

\# 2. Récupérer les dernières modifications

git pull origin develop

\# 3. Retourner sur sa branche

git checkout feature/votre-branche

\# 4. Intégrer les modifications de develop

git merge develop

\# 5. Résoudre les conflits éventuels

\# \[voir Règle 5\]

\# 6. Pousser les modifications

git push origin feature/votre-branche

**Fréquence de Synchronisation :**

- **Avant chaque PR :** Synchroniser avec develop
- **Après chaque merge :** Mettre à jour sa branche

### 🛠️ RÈGLE 5 : Résolution de Conflits

**En Cas de Conflit :**

- **Ne JAMAIS forcer un push**

❌ git push -f origin feature/votre-branche

- **Process de Résolution :**

\# 1. Identifier les fichiers en conflit

git status

\# 2. Ouvrir les fichiers et résoudre manuellement

\# Chercher les marqueurs : &lt;<<<<<<, =======, &gt;>>>>>>

\# 3. Tester que tout fonctionne

npm run dev

\# 4. Ajouter les fichiers résolus

git add fichier-resolu.js

\# 5. Finaliser le merge

git commit -m "fix(merge): resolve conflicts with develop"

\# 6. Pousser

git push origin feature/votre-branche

- **Communication :**

- Prévenir l'équipe sur teams
- Demander de l'aide si nécessaire
- Documenter la résolution dans le commit

- **Prévention des Conflits :**

- Synchroniser régulièrement avec develop
- Ne pas modifier les fichiers des autres membres
- Communiquer avant de toucher à des fichiers partagés

## COMMUNICATION

### Canaux de Communication

| **Canal** | **Usage** | **Fréquence** |
| --- | --- | --- |
| **Teams** | Communication quotidienne, questions rapides | En continu |
| **GitHub Issues** | Signaler bugs, demander features | Au besoin |
| **Pull Requests** | Code review, discussions techniques | À chaque feature |
| **Réunions** | Synchronisation d'équipe | Le plus que possible |

### Planning des Réunions

- Kickoff du projet
- Setup Git pour tous
- Répartition finale des tâches
- Point d'avancement
- Résolution des blocages
- Coordination pour Dimanche et Lundi
- Session d'intégration sur develop
- Résolution des conflits ensemble
- Tests d'intégration
- Review finale
- Préparation de la livraison
- Répétition de la démo

## CHECKLIST AVANT MERGE

Avant de créer une Pull Request, vérifier :

### Code

- Le code fonctionne localement sans erreur
- Les commentaires inutiles sont supprimés
- Le code respecte les conventions de nommage
- Pas de code mort (fonctions non utilisées)

### Tests

- Fonctionnalité testée manuellement
- Cas d'erreur testés
- Compatible avec les autres fonctionnalités

### Documentation

- Commentaires ajoutés si logique complexe
- README mis à jour si nécessaire
- Documentation API mise à jour (si changement API)

### Git

- Synchronisé avec develop (pas de conflit)
- Messages de commit clairs
- Fichiers sensibles non commités (.env)

### Pull Request

- Titre et description clairs
- Reviewer assigné
- Labels ajoutés (feature, bug, docs, etc.)

## PRATIQUES INTERDITES

### ❌ À NE JAMAIS FAIRE

| **Action** | **Conséquence** | **Alternative** |
| --- | --- | --- |
| git push -f | Écrase l'historique, perte de code | Résoudre les conflits proprement |
| Commit sur main | Casse la production | Toujours passer par develop |
| Commit sur develop | Court-circuite le review | Créer une PR depuis feature |
| Modifier la branche d'un autre | Conflits, confusion | Communiquer et coordonner |
| Commit de fichiers sensibles | Fuite de sécurité | Utiliser .gitignore |
| Commit de node_modules/ | Repo trop lourd | .gitignore |
| Messages de commit vagues | Historique illisible | Format type(scope): message |

## RESSOURCES ET CONVENTIONS

### Conventions de Nommage

**Fichiers :**

- Controllers : nomController.js (camelCase)
- Models : NomModel.js (PascalCase)
- Routes : nom.js (lowercase)
- Vues : nom-vue.hbs (kebab-case)

**Variables JavaScript :**

// Variables et fonctions : camelCase

const userName = 'Ruben';

function getUserName() {}

// Classes : PascalCase

class UserController {}

// Constantes : UPPER_SNAKE_CASE

const MAX_LOGIN_ATTEMPTS = 5;

**Base de données :**

- Tables : pluriel, lowercase (users, salles, reservations)
- Colonnes : snake_case (user_id, date_debut)

## SIGNATURES

En participant à ce projet, chaque membre s'engage à respecter toutes les règles énoncées et à contribuer activement au succès du projet.

| **Nom** | **Rôle** | **Date** | **Signature** |
| --- | --- | --- | --- |
| Ruben Bouakaly | Chef de projet | 02/12/2024 | **_** |
| Jovani Clément | Backend Salles | 02/12/2024 | **_** |
| Alicia Terbouche | Frontend Admin | 02/12/2024 | **_** |
| Alicia Serey-Cormier | Backend Réservations | 02/12/2024 | **_** |
| Hermann Njeutsa | Frontend User | 02/12/2024 | **_** |

## Lien

**Repository GitHub :**  
<https://github.com/RUBMA8/reservation-salles-reunions>

**Version 1.0 - Décembre 2024**  
**Collège La Cité - Projet de Systèmes**
