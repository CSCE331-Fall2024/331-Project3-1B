const express = require('express');
const cors = require('cors');
const { Translate } = require('@google-cloud/translate').v2;
require('dotenv').config();
const router = express.Router();
router.use(cors());
router.use(express.json());



// Initialize Translation API client with API key
const translate = new Translate({
    key: process.env.GOOGLE_TRANSLATE_API_KEY, 
});



router.get('/test', (req, res) => {
    res.send('Google Translate API server');
});

// Endpoint for text translation
router.post('/text', async (req, res) => {
    const { text, targetLanguage } = req.body;

    try {
        const [translation] = await translate.translate(text, targetLanguage);
        res.json({ translatedText: translation });
    } catch (error) {
        console.error('Error translating text:', error);
        res.status(500).json({ error: 'Translation failed.' });
    }
});

module.exports = router;