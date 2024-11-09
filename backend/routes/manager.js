const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const router = express.Router();

// middle ware
router.use(cors());

// Configure the PostgreSQL pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: { rejectUnauthorized: false }
});

router.get('/', (req, res) => {
    res.send('manager home');
});

// get list of all employee data
router.get('/get_all_employees', (req, res) => {
    employees = []
    pool
        .query('SELECT * FROM employees;')
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
                employees.push(query_res.rows[i]);
            }
            res.json(employees);
        })
        .catch(err => {
            console.error('Error executing query', err.stack);
            res.status(500).send("Error getting employees")
        });
});

// get today's sales
router.get('/sales_today', (req, res) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add leading zero
    const day = String(currentDate.getDate()).padStart(2, '0');        // Add leading zero
    const formattedDate = `${year}-${month}-${day}`;
    const query = `SELECT * FROM sales_order_history 
                    WHERE date_time_ordered BETWEEN '${formattedDate} 00:00:00' AND '${formattedDate} 23:59:59'
                    ORDER BY date_time_ordered DESC LIMIT 5;`
    pool
        .query(query)
        .then(query_res => {
            res.json(query_res.rows);
        })
        .catch(err => {
            console.error('Error getting most recent 5 orders', err.stack)
            res.status(500).send('Error getting most recent 5 orders')
        });
});

module.exports = router;