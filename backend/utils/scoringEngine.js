const QUESTION_SCORE_MAP = [
  { A: { logic: 3, confidence: 2 }, B: { overthinking: 3, emotional: 1 }, C: { emotional: 3, social_energy: 1 } },
  { A: { social_energy: 4 }, B: { social_energy: 2, logic: 1 }, C: { overthinking: 2, emotional: 2 } },
  { A: { confidence: 4 }, B: { overthinking: 3, emotional: 2 }, C: { emotional: 3, logic: 1 } },
  { A: { logic: 4, confidence: 1 }, B: { emotional: 3, social_energy: 1 }, C: { overthinking: 4 } },
  { A: { confidence: 3, logic: 2 }, B: { emotional: 4 }, C: { overthinking: 3, social_energy: -1 } },
  { A: { social_energy: 4 }, B: { emotional: 3, logic: 1 }, C: { social_energy: -2, emotional: 2, overthinking: 1 } },
  { A: { emotional: 4 }, B: { logic: 3, overthinking: 1 }, C: { confidence: 3, social_energy: 1 } },
  { A: { logic: 3, confidence: 2 }, B: { overthinking: 4 }, C: { social_energy: 3, emotional: 1 } },
  { A: { overthinking: 4, emotional: 2 }, B: { logic: 3 }, C: { confidence: 3, social_energy: 1 } },
  { A: { overthinking: 3, emotional: 2 }, B: { logic: 4, confidence: 1 }, C: { social_energy: 3, emotional: 1 } },
  { A: { logic: 3, confidence: 2 }, B: { emotional: 4 }, C: { overthinking: 2, emotional: 2 } },
  { A: { confidence: 4 }, B: { logic: 3, overthinking: 1 }, C: { overthinking: 3, emotional: 1 } },
  { A: { social_energy: -2, emotional: 2, overthinking: 1 }, B: { social_energy: 4 }, C: { logic: 3, confidence: 1 } },
  { A: { emotional: 4 }, B: { logic: 3 }, C: { social_energy: 3, confidence: 1 } },
  { A: { overthinking: 4, emotional: 1 }, B: { logic: 3, confidence: 2 }, C: { emotional: 3, confidence: 1 } },
  { A: { emotional: 3, social_energy: 2 }, B: { logic: 3, overthinking: 1 }, C: { confidence: 3, social_energy: 1 } },
  { A: { confidence: 3, logic: 2 }, B: { emotional: 4 }, C: { social_energy: 4 } },
  { A: { emotional: 4, overthinking: 1 }, B: { logic: 4 }, C: { confidence: 3, social_energy: 1 } },
  { A: { overthinking: 3, emotional: 2 }, B: { confidence: -2, social_energy: -1, overthinking: 2 }, C: { logic: 3, confidence: 2 } },
  { A: { confidence: 4 }, B: { overthinking: 3, emotional: 2 }, C: { logic: 3, emotional: 1 } },
];

const TRAIT_KEYS = ['overthinking', 'emotional', 'logic', 'social_energy', 'confidence'];

const PERSONALITY_TYPES = [
  { name: 'Deep Overthinker', description: 'A profound mind that processes everything deeply — sometimes too deeply.', detect: (s) => s.overthinking >= 60 && s.emotional >= 50 },
  { name: 'Emotional Strategist', description: 'You lead with feeling but never lose sight of the bigger picture.', detect: (s) => s.emotional >= 60 && s.logic >= 45 },
  { name: 'Silent Analyzer', description: 'Quiet on the outside, a storm of observation on the inside.', detect: (s) => s.logic >= 60 && s.social_energy <= 45 },
  { name: 'Balanced Leader', description: 'Rare and powerful — you bridge logic and empathy with natural authority.', detect: (s) => s.confidence >= 60 && s.logic >= 50 && s.emotional >= 45 },
  { name: 'Empathic Connector', description: 'Your superpower is making people feel genuinely seen and understood.', detect: (s) => s.emotional >= 65 && s.social_energy >= 55 },
  { name: 'Rational Architect', description: 'You build mental frameworks for everything and trust data over gut.', detect: (s) => s.logic >= 65 && s.overthinking <= 45 },
  { name: 'Confident Pathfinder', description: 'You move through uncertainty with a rare, grounded self-trust.', detect: (s) => s.confidence >= 65 && s.overthinking <= 40 },
  { name: 'Reflective Wanderer', description: 'A soul that questions everything — including the questions themselves.', detect: (s) => s.overthinking >= 55 && s.logic >= 50 && s.emotional >= 50 },
];

const DEFAULT_TYPE = { name: 'Complex Individualist', description: 'You defy simple categorization — a rich, multidimensional person.' };

const calculateScores = (answers) => {
  if (!Array.isArray(answers) || answers.length !== 20) throw new Error('Exactly 20 answers required');

  const raw = Object.fromEntries(TRAIT_KEYS.map((k) => [k, 0]));
  const maxPossible = Object.fromEntries(TRAIT_KEYS.map((k) => [k, 0]));

  answers.forEach((answer, index) => {
    const mapping = QUESTION_SCORE_MAP[index];
    const choice = answer?.toUpperCase();
    if (!mapping || !mapping[choice]) return;
    Object.entries(mapping[choice]).forEach(([trait, delta]) => {
      if (raw[trait] !== undefined) raw[trait] += delta;
    });
  });

  QUESTION_SCORE_MAP.forEach((qMap) => {
    TRAIT_KEYS.forEach((trait) => {
      const maxDelta = Math.max(...[qMap.A, qMap.B, qMap.C].map((opt) => opt?.[trait] || 0));
      maxPossible[trait] += maxDelta;
    });
  });

  const scores = {};
  TRAIT_KEYS.forEach((trait) => {
    const ceiling = maxPossible[trait] || 1;
    scores[trait] = Math.min(100, Math.max(0, Math.round((Math.max(0, raw[trait]) / ceiling) * 100)));
  });

  const matched = PERSONALITY_TYPES.find((type) => type.detect(scores));
  const personalityType = matched?.name || DEFAULT_TYPE.name;
  const typeDescription = matched?.description || DEFAULT_TYPE.description;

  return { scores, personalityType, typeDescription };
};

module.exports = { calculateScores };