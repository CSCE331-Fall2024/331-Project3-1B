const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');
const router = express.Router();

const { OAuth2Client } = require('google-auth-library');
const oauth2Client = new OAuth2Client()

app = express();

app.use(cors());

const PORT = 5173;

const CLIENT_ID = '951146386191-ahvp9rj7ivufakq78iiiaphs9ndj1au8.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:5173/manager';

const pool = new Pool({
    host: 'csce-315-db.engr.tamu.edu',
    user: 'team_1b',
    database: 'team_1b_db',
    password: 'deerling',
});

router.get('/', (req, res) => {
    res.send('google ouath home');
});

