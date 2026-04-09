const express = require('express');
const router = express.Router();
const { sendMessage, clearSession } = require('../controllers/chatController');

// POST /api/chat/message
router.post('/message', sendMessage);

// DELETE /api/chat/session/:sessionId
router.delete('/session/:sessionId', clearSession);

module.exports = router;
