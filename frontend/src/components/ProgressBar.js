import React from 'react';
import './ProgressBar.css';

/**
 * ProgressBar component
 * Shows segmented quiz progress with a smooth fill indicator
 */
export default function ProgressBar({ current, total, answered }) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="progress-bar" role="progressbar" aria-valuenow={current} aria-valuemax={total}>
      <div className="progress-bar__track">
        <div
          className="progress-bar__fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="progress-bar__label">
        {percentage}% complete
      </span>
    </div>
  );
}
