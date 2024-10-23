const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('The server is running!');
});

app.get('/home', (req, res) => {
    res.send('Welcome to home page!');
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});