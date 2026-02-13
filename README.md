# Projet Firebase ( Auth + Messages Firestore)

Mini application web (HTML + JavaScript) qui permet de :
- créer un compte utilisateur,
- se connecter / se déconnecter,
- publier un message dans Firestore,
- afficher les messages uniquement quand l'utilisateur est connecté.

## Stack
- Firebase Authentication (email/mot de passe)
- Cloud Firestore
- JavaScript

## Fichiers
- `index.html` : interface utilisateur
- `app.js` : logique Firebase (auth + Firestore)

## Prérequis
- Un projet Firebase actif
- Authentication activée avec le provider **Email/Password**
- Firestore Database activée

## Lancer le projet
1. Clone le repo :
git clone <url du repo>
cd Projet-firebase


3. Ouvre le projet avec un serveur local 
Exemple avec VS Code + Live Server, ou tout autre serveur statique.

4. Vérifie la configuration Firebase dans `app.js` (`firebaseConfig`).

## Fonctionnement
- Si l'utilisateur est connecté :
  - le formulaire de publication est visible,
  - la section des messages est visible,
  - les messages sont chargés en temps réel (`onSnapshot`).
- Si l'utilisateur est déconnecté :
  - le formulaire de publication est masqué,
  - la section des messages est masquée,
  - l'écoute Firestore est arrêtée.
