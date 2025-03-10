const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config({ path: `./.env/${process.env.ENV}.env` });

const app = express();
const port = 4000;

// Configurer la connexion à la base de données
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// Connecter à la base de données
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
        return;
    }
    console.log('Connecté à la base de données MySQL');
});

// Définir une route de base
app.get('/', (req, res) => {
    res.send('Hello API');
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur API en cours d'exécution sur le port ${port}`);
});