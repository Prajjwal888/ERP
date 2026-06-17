import express from 'express';
import axios from 'axios';

const router = express.Router();
const CHATBOT_URL = process.env.CHATBOT_URL || 'https://chatbot-backend-nbz3.onrender.com';
const PROXY_TIMEOUT = 30000;

const proxyTo = (method, path) => async (req, res) => {
    try {
        const { data } = await axios({ method, url: `${CHATBOT_URL}${path}`, data: req.body, timeout: PROXY_TIMEOUT });
        res.json(data);
    } catch (err) {
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
