import express from 'express';
import axios from 'axios';

const router = express.Router();
const CHATBOT_URL = process.env.CHATBOT_URL || 'https://chatbot-backend-nbz3.onrender.com';
// Render free tier sleeps idle services — a cold start takes ~60s and a heavy
// LLM query another ~25s, so the proxy must wait longer than that.
const PROXY_TIMEOUT = 120000;

const proxyTo = (method, path) => async (req, res) => {
    try {
        const { data } = await axios({ method, url: `${CHATBOT_URL}${path}`, data: req.body, timeout: PROXY_TIMEOUT });
        res.json(data);
    } catch (err) {
        if (err.code === 'ECONNABORTED') {
            return res.status(504).json({ error: 'Chatbot is waking up, please try again.' });
        }
        const status = err.response?.status || 503;
        const message = err.response?.data?.error || 'Chatbot service is unavailable';
        res.status(status).json({ error: message });
    }
};

router.post('/chat',      proxyTo('post', '/chat'));
router.post('/ingest',    proxyTo('post', '/ingest'));
router.post('/ingest-all', proxyTo('post', '/ingest-all'));
router.get('/health',     proxyTo('get',  '/health'));

export default router;
