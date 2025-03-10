const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Configure the database connection
const db = mysql.createConnection({
    host: process.env.URL,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: 'database',
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Define a route to fetch data from the database
app.get('/data', (req, res) => {
    const query = 'SELECT * FROM database';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
});

// Define a base route
app.get('/', (req, res) => {
    res.send('Hello API');
});

// Start the server
app.listen(port, () => {
    console.log(`API server running on port ${port}`);
});