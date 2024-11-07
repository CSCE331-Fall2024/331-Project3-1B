const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();

// Create express app
const app = express();

const PORT = process.env.PORT || 3001;

// Create pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

// Add process hook to shut down pool
process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});

app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.send('The server is running!');
});


app.get('/manager/get_all_employees', (req, res) => {
    employees = []
    pool
        .query('SELECT * FROM employees;')
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
                employees.push(query_res.rows[i]);
            }
            console.log(employees);
            res.send(employees);
        })
        .catch(err => {
            console.error('Error executing query', err.stack);
            res.status(500).send("Error getting employees")
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});