const express = require('express');
const router = express.Router();
const { analyzePersonality } = require('../controllers/insightController');

// POST /api/insight/analyze
router.post('/analyze', analyzePersonality);

module.exports = router;
