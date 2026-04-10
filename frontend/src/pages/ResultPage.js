import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TraitBar from '../components/TraitBar';
import './ResultPage.css';

const PERSONALITY_COLORS = {
  'Deep Overthinker':     { primary: 'var(--trait-overthinking)', bg: 'rgba(167, 139, 250, 0.07)' },
  'Emotional Strategist': { primary: 'var(--trait-emotional)',    bg: 'rgba(244, 114, 182, 0.07)' },
  'Silent Analyzer':      { primary: 'var(--trait-logic)',        bg: 'rgba(96, 165, 250, 0.07)'  },
  'Balanced Leader':      { primary: 'var(--accent)',             bg: 'rgba(201, 169, 110, 0.07)' },
  'Empathic Connector':   { primary: 'var(--trait-emotional)',    bg: 'rgba(244, 114, 182, 0.07)' },
  'Rational Architect':   { primary: 'var(--trait-logic)',        bg: 'rgba(96, 165, 250, 0.07)'  },
  'Confident Pathfinder': { primary: 'var(--trait-confidence)',   bg: 'rgba(251, 191, 36, 0.07)'  },
  'Reflective Wanderer':  { primary: 'var(--trait-overthinking)', bg: 'rgba(167, 139, 250, 0.07)' },
  'Complex Individualist':{ primary: 'var(--accent)',             bg: 'rgba(201, 169, 110, 0.07)' },
};

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const insightRef = useRef(null);

  const result = location.state?.result;

  // Guard: redirect if no result in state
  useEffect(() => {
    if (!result) {
      navigate('/', { replace: true });
    }
  }, [result, navigate]);

  if (!result) return null;

  const { scores, personalityType, typeDescription, aiInsight } = result;
  const typeTheme = PERSONALITY_COLORS[personalityType] || PERSONALITY_COLORS['Complex Individualist'];

  const handleScrollToInsight = () => {
    insightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // eslint-disable-next-line no-unused-vars
  const dominantTrait = scores
    ? Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0]
    : null;

  return (
    <div className="result">
      {/* Atmospheric background */}
      <div
        className="result__bg-orb"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${typeTheme.bg} 0%, transparent 60%)` }}
      />

      <div className="result__container container">

        {/* ── Hero Section ─────────────────────────────────────────────────── */}
        <section className="result__hero fade-in">
          <div className="result__badge" style={{ color: typeTheme.primary, borderColor: `${typeTheme.primary}33`, background: `${typeTheme.primary}10` }}>
            Personality Profile
          </div>

          <h1 className="result__type-name" style={{ '--type-color': typeTheme.primary }}>
            {personalityType}
          </h1>

          <p className="result__type-desc">{typeDescription}</p>

          {aiInsight && (
            <button
              className="btn btn-outline result__scroll-btn"
              style={{ '--btn-color': typeTheme.primary, borderColor: `${typeTheme.primary}40`, color: typeTheme.primary }}
              onClick={handleScrollToInsight}
            >
              Read Your Full Insight
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </section>

        <div className="result__divider" />

        {/* ── Trait Scores ──────────────────────────────────────────────── */}
        <section className="result__traits fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="result__section-header">
            <h3>Psychological Dimensions</h3>
            <p>How you score across five core personality axes</p>
          </div>

          <div className="result__traits-card card">
            {scores && Object.entries(scores).map(([trait, score], i) => (
              <TraitBar
                key={trait}
                trait={trait}
                score={score}
                delay={i * 120}
              />
            ))}
          </div>
        </section>

        {/* ── AI Insight ────────────────────────────────────────────────── */}
        {aiInsight ? (
          <section
            className="result__insight fade-in"
            style={{ animationDelay: '0.4s' }}
            ref={insightRef}
          >
            <div className="result__section-header">
              <h3>Your Psychological Portrait</h3>
              <p>AI-generated insight tailored to your unique profile</p>
            </div>

            <div className="result__insight-card card">
              <div className="result__insight-header">
                <div
                  className="result__insight-icon"
                  style={{ color: typeTheme.primary, borderColor: `${typeTheme.primary}33` }}
                >
                  ◈
                </div>
                <div>
                  <div className="result__insight-label">Deep Analysis</div>
                  <div className="result__insight-sublabel">Powered by Claude AI</div>
                </div>
              </div>

              <div className="result__insight-text">
                {aiInsight.split('\n\n').map((para, i) => (
                  para.trim() && (
                    <p key={i} className="result__insight-para" style={{ animationDelay: `${0.5 + i * 0.1}s` }}>
                      {para}
                    </p>
                  )
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="result__insight-fallback fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="card result__no-insight">
              <span>◌</span>
              <p>AI insight unavailable — check your API key configuration.</p>
            </div>
          </section>
        )}

        {/* ── Actions ───────────────────────────────────────────────────── */}
        <section className="result__actions fade-in" style={{ animationDelay: '0.6s' }}>
          <button
            className="btn btn-primary result__chat-btn"
            onClick={() => navigate('/chat', { state: { userProfile: { personalityType, scores } } })}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2C5.134 2 2 4.91 2 8.5c0 1.37.432 2.645 1.17 3.7L2.5 15.5l3.63-.88A7.25 7.25 0 009 15c3.866 0 7-2.91 7-6.5S12.866 2 9 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            Talk to Your Inner Guide
          </button>

          <button
            className="btn btn-ghost"
            onClick={() => navigate('/quiz')}
          >
            Retake Quiz
          </button>

          <button
            className="btn btn-ghost"
            onClick={() => navigate('/')}
          >
            Home
          </button>
        </section>

      </div>
    </div>
  );
}
