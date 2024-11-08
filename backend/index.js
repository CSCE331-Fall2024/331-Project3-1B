const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

// Create express app
const app = express();

// middleware to allow access to frontend
app.use(cors());

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

const managerRouter = require('./routes/manager')

app.use("/manager", managerRouter);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});