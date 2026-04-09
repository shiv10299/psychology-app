import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const TRAITS = [
  { label: 'Overthinking', color: 'var(--trait-overthinking)' },
  { label: 'Emotional Depth', color: 'var(--trait-emotional)' },
  { label: 'Logic & Reason', color: 'var(--trait-logic)' },
  { label: 'Social Energy', color: 'var(--trait-social)' },
  { label: 'Confidence', color: 'var(--trait-confidence)' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const orbRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!orbRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      orbRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="landing">
      <div className="landing__orb" ref={orbRef} />

      {/* Nav */}
      <nav className="landing__nav fade-in">
        <div className="landing__nav-logo">◈ PsycheInsight</div>
        <div className="landing__nav-links">
          <button className="btn btn-ghost landing__nav-btn" onClick={() => navigate('/docs')}>
            Explore Psychology
          </button>
          <button className="btn btn-ghost landing__nav-btn" onClick={() => navigate('/personality-quiz')}>
            Know Your Type
          </button>
          <button className="btn btn-outline landing__nav-btn" onClick={() => {
            document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' });
          }}>
            About
          </button>
        </div>
      </nav>

      <main className="landing__main">
        <div className="landing__badge fade-in">
          <span className="landing__badge-dot" />
          AI-Powered Psychology Platform
        </div>

        <h1 className="landing__title fade-in" style={{ animationDelay: '0.15s' }}>
          Who are you,<br />
          <em>really?</em>
        </h1>

        <p className="landing__subtitle fade-in" style={{ animationDelay: '0.3s' }}>
          Twenty carefully crafted questions. Five core dimensions. One surprisingly
          accurate portrait of your inner world — analyzed by AI that speaks like
          a psychologist, not a machine.
        </p>

        <div className="landing__traits fade-in" style={{ animationDelay: '0.45s' }}>
          {TRAITS.map((t) => (
            <span key={t.label} className="landing__trait-pill" style={{ '--pill-color': t.color }}>
              {t.label}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="landing__ctas fade-in" style={{ animationDelay: '0.6s' }}>
          <button className="btn btn-primary landing__cta" onClick={() => navigate('/quiz')}>
            Begin Assessment
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="btn btn-ghost landing__cta-secondary" onClick={() => navigate('/personality-quiz')}>
            Quick Personality Quiz
          </button>
        </div>

        <p className="landing__meta fade-in" style={{ animationDelay: '0.75s' }}>
          20 questions · ~5 minutes · No data stored
        </p>
      </main>

      {/* Feature cards */}
      <div className="landing__cards stagger">
        {[
          { icon: '◈', title: 'Personality Type', desc: '8 custom archetypes', onClick: () => navigate('/quiz') },
          { icon: '◉', title: 'Psychology Docs', desc: 'Deep research library', onClick: () => navigate('/docs') },
          { icon: '◎', title: 'AI Insight', desc: 'Personal interpretation', onClick: () => navigate('/quiz') },
          { icon: '◇', title: 'PsycheGuide', desc: 'Your AI companion', onClick: null },
        ].map((card) => (
          <div key={card.title} className="landing__card" onClick={card.onClick} style={{ cursor: card.onClick ? 'pointer' : 'default' }}>
            <span className="landing__card-icon">{card.icon}</span>
            <div>
              <div className="landing__card-title">{card.title}</div>
              <div className="landing__card-desc">{card.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* About Section */}
      <section id="about-section" className="landing__about fade-in">
        <div className="landing__about-inner">
          <div className="landing__about-badge">About PsycheInsight</div>
          <h2 className="landing__about-title">Built for the minds that never stop thinking</h2>
          <p className="landing__about-text">
            PsycheInsight is a psychology-first platform designed to help overthinkers, deep feelers,
            and curious minds understand themselves better. We combine evidence-based psychological
            frameworks with AI to give you insights that feel personal — not clinical.
          </p>
          <div className="landing__about-stats">
            <div className="landing__stat">
              <span className="landing__stat-num">8+</span>
              <span className="landing__stat-label">Personality Types</span>
            </div>
            <div className="landing__stat">
              <span className="landing__stat-num">20</span>
              <span className="landing__stat-label">Quiz Questions</span>
            </div>
            <div className="landing__stat">
              <span className="landing__stat-num">∞</span>
              <span className="landing__stat-label">AI Conversations</span>
            </div>
            <div className="landing__stat">
              <span className="landing__stat-num">5</span>
              <span className="landing__stat-label">Psych Dimensions</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
