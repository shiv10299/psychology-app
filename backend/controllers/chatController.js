const { generateChatResponse } = require('../utils/aiService');

const sessions = new Map();
const MAX_HISTORY_LENGTH = 20;
const SESSION_TTL_MS = 60 * 60 * 1000;

const sendMessage = async (req, res, next) => {
  try {
    const { message, sessionId, userProfile } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'message field is required' });
    }
    if (message.trim().length === 0) {
      return res.status(400).json({ error: 'message cannot be empty' });
    }
    if (message.length > 2000) {
      return res.status(400).json({ error: 'message too long (max 2000 characters)' });
    }
    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId is required' });
    }

    if (!sessions.has(sessionId)) {
      sessions.set(sessionId, {
        history: [],
        userProfile: userProfile || null,
        createdAt: Date.now(),
      });
    }

    const session = sessions.get(sessionId);

    const response = await generateChatResponse(
      session.history,
      message.trim(),
      session.userProfile
    );

    session.history.push({ role: 'user', content: message.trim() });
    session.history.push({ role: 'assistant', content: response });

    if (session.history.length > MAX_HISTORY_LENGTH * 2) {
      session.history = session.history.slice(-MAX_HISTORY_LENGTH * 2);
    }

    return res.status(200).json({
      success: true,
      response,
      sessionId,
      messageCount: session.history.length / 2,
    });
  } catch (error) {
    next(error);
  }
};

const clearSession = (req, res) => {
  const { sessionId } = req.params;
  sessions.delete(sessionId);
  res.json({ success: true, message: 'Session cleared' });
};

module.exports = { sendMessage, clearSession };