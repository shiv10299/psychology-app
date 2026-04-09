/**
 * Insight Controller
 * Handles quiz submission, scoring, and AI insight generation
 */

const { calculateScores } = require('../utils/scoringEngine');
const { generatePersonalityInsight } = require('../utils/aiService');

/**
 * POST /api/insight/analyze
 * Accepts quiz answers, calculates scores, generates AI insight
 */
const analyzePersonality = async (req, res, next) => {
  try {
    const { answers } = req.body;

    // ── Validation ──────────────────────────────────────────────────────────
    if (!answers) {
      return res.status(400).json({ error: 'answers field is required' });
    }
    if (!Array.isArray(answers)) {
      return res.status(400).json({ error: 'answers must be an array' });
    }
    if (answers.length !== 20) {
      return res.status(400).json({ error: `Expected 20 answers, received ${answers.length}` });
    }

    const validChoices = ['A', 'B', 'C'];
    const invalid = answers.find((a) => !validChoices.includes(a?.toUpperCase()));
    if (invalid !== undefined) {
      return res.status(400).json({ error: `Invalid answer value: "${invalid}". Must be A, B, or C` });
    }

    // ── Scoring ──────────────────────────────────────────────────────────────
    const { scores, personalityType, typeDescription } = calculateScores(answers);

    // ── AI Insight Generation ─────────────────────────────────────────────
    let aiInsight = null;
    try {
      aiInsight = await generatePersonalityInsight(scores, personalityType);
    } catch (aiError) {
      console.error('AI insight generation failed:', aiError.message);
      // Degrade gracefully — return results without AI insight
      aiInsight = null;
    }

    return res.status(200).json({
      success: true,
      result: {
        scores,
        personalityType,
        typeDescription,
        aiInsight,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { analyzePersonality };
