/**
 * Centralized error handling middleware
 */

const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
  });
};

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  // Anthropic API errors
  if (err.status === 401) {
    return res.status(401).json({ error: 'Invalid API key. Check your ANTHROPIC_API_KEY.' });
  }
  if (err.status === 429) {
    return res.status(429).json({ error: 'AI rate limit reached. Please wait a moment.' });
  }
  if (err.status === 400) {
    return res.status(400).json({ error: 'Bad request: ' + err.message });
  }

  // Generic server error
  res.status(err.statusCode || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message || 'Something went wrong',
  });
};

module.exports = { notFoundHandler, errorHandler };
