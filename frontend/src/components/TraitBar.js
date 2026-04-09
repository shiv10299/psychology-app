import React, { useEffect, useRef, useState } from 'react';
import './TraitBar.css';

const TRAIT_CONFIG = {
  overthinking: {
    label: 'Overthinking',
    color: 'var(--trait-overthinking)',
    icon: '◌',
    description: 'Depth of analytical rumination',
  },
  emotional: {
    label: 'Emotional Depth',
    color: 'var(--trait-emotional)',
    icon: '◉',
    description: 'Sensitivity and feeling-based processing',
  },
  logic: {
    label: 'Logic & Reason',
    color: 'var(--trait-logic)',
    icon: '◈',
    description: 'Systematic, evidence-based thinking',
  },
  social_energy: {
    label: 'Social Energy',
    color: 'var(--trait-social)',
    icon: '◎',
    description: 'Extraversion and people orientation',
  },
  confidence: {
    label: 'Confidence',
    color: 'var(--trait-confidence)',
    icon: '◇',
    description: 'Self-trust and decisiveness',
  },
};

/**
 * Animated trait score bar with label and percentage
 */
export default function TraitBar({ trait, score, delay = 0 }) {
  const config = TRAIT_CONFIG[trait] || {
    label: trait,
    color: 'var(--accent)',
    icon: '◆',
    description: '',
  };

  const [displayScore, setDisplayScore] = useState(0);
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const animRef = useRef(null);

  // Animate bar fill and counter on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 900;
      const start = performance.now();

      const animate = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * score);

        setDisplayScore(current);
        setAnimatedWidth(eased * score);

        if (progress < 1) {
          animRef.current = requestAnimationFrame(animate);
        }
      };

      animRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [score, delay]);

  const intensity = score >= 70 ? 'high' : score >= 40 ? 'mid' : 'low';

  return (
    <div className={`trait-bar trait-bar--${intensity}`}>
      <div className="trait-bar__header">
        <div className="trait-bar__label-group">
          <span className="trait-bar__icon" style={{ color: config.color }}>
            {config.icon}
          </span>
          <div>
            <div className="trait-bar__label">{config.label}</div>
            <div className="trait-bar__desc">{config.description}</div>
          </div>
        </div>
        <div className="trait-bar__score" style={{ color: config.color }}>
          {displayScore}
          <span className="trait-bar__score-max">/100</span>
        </div>
      </div>

      <div className="trait-bar__track">
        <div
          className="trait-bar__fill"
          style={{
            width: `${animatedWidth}%`,
            background: `linear-gradient(90deg, ${config.color}99, ${config.color})`,
          }}
        />
      </div>
    </div>
  );
}

// Export config for use in other components
export { TRAIT_CONFIG };
