import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PersonalityQuizPage.css';

const QUESTIONS = [
  {
    id: 1,
    text: "When you meet new people, you usually...",
    options: [
      { key: 'A', text: 'Talk easily and enjoy the interaction' },
      { key: 'B', text: 'Talk if needed but prefer listening' },
      { key: 'C', text: 'Stay quiet and observe people first' },
    ],
  },
  {
    id: 2,
    text: "When something goes wrong, your first reaction is...",
    options: [
      { key: 'A', text: 'Try to fix it immediately' },
      { key: 'B', text: 'Think deeply about why it happened' },
      { key: 'C', text: 'Feel emotionally affected and withdraw' },
    ],
  },
  {
    id: 3,
    text: "When talking to someone you like or admire, you...",
    options: [
      { key: 'A', text: 'Speak normally and confidently' },
      { key: 'B', text: 'Become slightly nervous but manage' },
      { key: 'C', text: 'Overthink and sometimes your mind goes blank' },
    ],
  },
  {
    id: 4,
    text: "In friendships and relationships you...",
    options: [
      { key: 'A', text: 'Keep things casual and light' },
      { key: 'B', text: 'Value loyalty and deep emotional connection' },
      { key: 'C', text: 'Care deeply but struggle to express it' },
    ],
  },
  {
    id: 5,
    text: "How often do you replay past conversations in your mind?",
    options: [
      { key: 'A', text: 'Rarely — I move on quickly' },
      { key: 'B', text: 'Sometimes, when it matters' },
      { key: 'C', text: 'Very often, especially with people I care about' },
    ],
  },
  {
    id: 6,
    text: "When making a big decision, you rely more on...",
    options: [
      { key: 'A', text: 'Logic and facts' },
      { key: 'B', text: 'Both logic and feelings together' },
      { key: 'C', text: 'Intuition and gut feeling' },
    ],
  },
  {
    id: 7,
    text: "After spending time in a social gathering, you feel...",
    options: [
      { key: 'A', text: 'Energized and happy' },
      { key: 'B', text: 'Neutral — depends on the people' },
      { key: 'C', text: 'Mentally drained and need alone time' },
    ],
  },
  {
    id: 8,
    text: "Which describes your inner world best?",
    options: [
      { key: 'A', text: 'Practical and realistic — I deal with what\'s in front of me' },
      { key: 'B', text: 'Emotional but thoughtful — I feel and then think' },
      { key: 'C', text: 'Deep thinker who questions everything' },
    ],
  },
  {
    id: 9,
    text: "In a group situation you are usually...",
    options: [
      { key: 'A', text: 'The one talking, leading, or entertaining' },
      { key: 'B', text: 'The one contributing ideas when needed' },
      { key: 'C', text: 'The quiet observer analyzing people' },
    ],
  },
  {
    id: 10,
    text: "Which feeling visits you most often?",
    options: [
      { key: 'A', text: 'Boredom — I need constant stimulation' },
      { key: 'B', text: 'Curiosity — I always want to understand more' },
      { key: 'C', text: 'Feeling misunderstood — few people really get me' },
    ],
  },
];

const PERSONALITY_RESULTS = {
  'Analytical Introvert': {
    desc: 'You observe the world deeply before engaging with it. Your mind is always processing beneath the surface — quiet outside, active inside.',
    strengths: ['Strategic thinking', 'Deep observation', 'Calm under pressure'],
    blindspots: ['Can seem distant', 'May overthink simple situations'],
    color: 'var(--trait-logic)',
  },
  'Emotional Leader': {
    desc: 'You have the rare combination of emotional depth and natural leadership. You lead with empathy first, strategy second.',
    strengths: ['High emotional intelligence', 'Inspires trust', 'Connects deeply'],
    blindspots: ['Can take on others\' emotions', 'Struggles to switch off'],
    color: 'var(--trait-emotional)',
  },
  'Social Connector': {
    desc: 'People naturally gravitate toward you. You make others feel seen and comfortable — a rare and powerful social gift.',
    strengths: ['Natural communicator', 'Builds genuine rapport', 'Energizes others'],
    blindspots: ['May avoid deep alone-time needed for growth', 'Can people-please'],
    color: 'var(--trait-social)',
  },
  'Deep Overthinker': {
    desc: 'You experience life more intensely than most people realize. Your mind never fully stops — and that\'s both your gift and your challenge.',
    strengths: ['Deep empathy', 'Pattern recognition', 'Thorough analysis'],
    blindspots: ['Decision paralysis', 'Mental exhaustion', 'Living in your head'],
    color: 'var(--trait-overthinking)',
  },
  'Balanced Realist': {
    desc: 'You combine practicality with emotional awareness. You don\'t overcomplicate things — you deal with reality while staying human.',
    strengths: ['Grounded thinking', 'Reliable and steady', 'Makes good decisions'],
    blindspots: ['May suppress deeper emotions', 'Can seem too logical sometimes'],
    color: 'var(--accent)',
  },
};

const derivePersonality = (answers) => {
  let scores = { introvert: 0, emotional: 0, social: 0, overthinker: 0, realist: 0 };

  const map = {
    1: { A: 'social', B: 'introvert', C: 'introvert' },
    2: { A: 'realist', B: 'overthinker', C: 'emotional' },
    3: { A: 'social', B: 'emotional', C: 'overthinker' },
    4: { A: 'realist', B: 'emotional', C: 'overthinker' },
    5: { A: 'realist', B: 'introvert', C: 'overthinker' },
    6: { A: 'realist', B: 'emotional', C: 'introvert' },
    7: { A: 'social', B: 'realist', C: 'introvert' },
    8: { A: 'realist', B: 'emotional', C: 'overthinker' },
    9: { A: 'social', B: 'realist', C: 'introvert' },
    10: { A: 'realist', B: 'introvert', C: 'overthinker' },
  };

  answers.forEach((ans, i) => {
    const trait = map[i + 1]?.[ans];
    if (trait) scores[trait]++;
  });

  // Determine type
  const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  const second = Object.entries(scores).sort((a, b) => b[1] - a[1])[1][0];

  if (top === 'emotional' && second === 'social') return 'Emotional Leader';
  if (top === 'social') return 'Social Connector';
  if (top === 'overthinker') return 'Deep Overthinker';
  if (top === 'introvert' && second !== 'social') return 'Analytical Introvert';
  return 'Balanced Realist';
};

export default function PersonalityQuizPage() {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [animating, setAnimating] = useState(false);

  const question = QUESTIONS[currentQ];
  const progress = Math.round(((currentQ) / QUESTIONS.length) * 100);

  const handleSelect = (key) => setSelected(key);

  const handleNext = () => {
    if (!selected || animating) return;
    const newAnswers = [...answers, selected];

    if (currentQ === QUESTIONS.length - 1) {
      const type = derivePersonality(newAnswers);
      setResult({ type, data: PERSONALITY_RESULTS[type] });
      return;
    }

    setAnimating(true);
    setTimeout(() => {
      setAnswers(newAnswers);
      setCurrentQ((p) => p + 1);
      setSelected(null);
      setAnimating(false);
    }, 280);
  };

  if (result) {
    return (
      <div className="pquiz page-center">
        <div className="pquiz__result fade-in">
          <div className="pquiz__result-badge" style={{ color: result.data.color, borderColor: `${result.data.color}44`, background: `${result.data.color}10` }}>
            Your Personality Type
          </div>
          <h1 className="pquiz__result-type" style={{ '--type-color': result.data.color }}>
            {result.type}
          </h1>
          <p className="pquiz__result-desc">{result.data.desc}</p>

          <div className="pquiz__result-grid">
            <div className="pquiz__result-card">
              <div className="pquiz__result-card-label">Strengths</div>
              {result.data.strengths.map((s) => (
                <div key={s} className="pquiz__result-item pquiz__result-item--strength">
                  <span>✓</span> {s}
                </div>
              ))}
            </div>
            <div className="pquiz__result-card">
              <div className="pquiz__result-card-label">Blind Spots</div>
              {result.data.blindspots.map((s) => (
                <div key={s} className="pquiz__result-item pquiz__result-item--blind">
                  <span>◌</span> {s}
                </div>
              ))}
            </div>
          </div>

          <div className="pquiz__result-actions">
            <button className="btn btn-primary" onClick={() => navigate('/quiz')}>
              Take Full Assessment
            </button>
            <button className="btn btn-ghost" onClick={() => navigate('/docs')}>
              Explore Psychology
            </button>
            <button className="btn btn-ghost" onClick={() => { setResult(null); setCurrentQ(0); setAnswers([]); setSelected(null); }}>
              Retake
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pquiz page-center">
      <div className="pquiz__container container">
        {/* Header */}
        <div className="pquiz__header fade-in">
          <button className="btn btn-ghost pquiz__back" onClick={() => navigate('/')}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
          <span className="pquiz__counter font-mono">{currentQ + 1} / {QUESTIONS.length}</span>
        </div>

        {/* Progress */}
        <div className="pquiz__progress">
          <div className="pquiz__progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Question */}
        <div className={`pquiz__card card ${animating ? 'pquiz__card--exit' : 'pquiz__card--enter'}`}>
          <p className="pquiz__q-num text-muted font-mono">Question {currentQ + 1}</p>
          <h2 className="pquiz__question">{question.text}</h2>

          <div className="pquiz__options">
            {question.options.map((opt) => (
              <button
                key={opt.key}
                className={`pquiz__option ${selected === opt.key ? 'pquiz__option--selected' : ''}`}
                onClick={() => handleSelect(opt.key)}
              >
                <span className="pquiz__option-key font-mono">{opt.key}</span>
                <span className="pquiz__option-text">{opt.text}</span>
              </button>
            ))}
          </div>

          <div className="pquiz__footer">
            <button className="btn btn-primary" onClick={handleNext} disabled={!selected}>
              {currentQ === QUESTIONS.length - 1 ? 'See My Type' : 'Next'}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
