# HRPortal Backend

## Description
Le backend de HRPortal est une API REST développée en Node.js avec Express.js et utilisant MongoDB comme base de données. Cette API gère l'authentification, la gestion des utilisateurs, des documents et des demandes RH.

## Technologies Utilisées
- **Node.js** avec **Express.js** pour la création de l'API.
- **MongoDB** pour le stockage des données.
- **JWT** pour l'authentification sécurisée.
- **bcrypt** pour le chiffrement des mots de passe.
- **Mongoose** pour la gestion des modèles de données.

## Installation
```sh
# Cloner le repository
git clone https://github.com/camelliakamli/HRPortal-backend.git
# Se déplacer dans le dossier du projet
cd backend

# Installer les dépendances
npm install 
```

## Configuration
Créer un fichier `.env` à la racine du projet et ajouter les variables suivantes :
```env
PORT=8800
DB_URL=********
JWT_SECRET_KEY=********  
```

## Lancer l'Application
```sh
npm start
```


