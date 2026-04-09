import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzePersonality } from '../services/api';
import { questions } from '../data/questions';
import ProgressBar from '../components/ProgressBar';
import './QuizPage.css';

const TOTAL = questions.length; // 20

export default function QuizPage() {
  const navigate = useNavigate();

  // answers[i] = 'A' | 'B' | 'C' | null — indexed, never appended
  const [answers, setAnswers] = useState(Array(TOTAL).fill(null));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [direction, setDirection] = useState('forward'); // 'forward' | 'backward'

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === TOTAL - 1;
  const answeredCount = answers.filter(Boolean).length;

  // Sync selected option when navigating back
  useEffect(() => {
    setSelectedOption(answers[currentIndex] || null);
  }, [currentIndex, answers]);

  const handleOptionSelect = useCallback((option) => {
    if (isTransitioning) return;
    setSelectedOption(option);
  }, [isTransitioning]);

  const handleNext = useCallback(async () => {
    if (!selectedOption || isTransitioning) return;
    setError(null);

    // Save answer at current index (not pushed)
    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedOption;
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Submit quiz
      setIsSubmitting(true);
      try {
        const result = await analyzePersonality(newAnswers);
        navigate('/result', { state: { result }, replace: true });
      } catch (err) {
        setError(err.message || 'Analysis failed. Please try again.');
        setIsSubmitting(false);
      }
      return;
    }

    // Transition to next question
    setDirection('forward');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsTransitioning(false);
    }, 300);
  }, [selectedOption, answers, currentIndex, isLastQuestion, isTransitioning, navigate]);

  const handleBack = useCallback(() => {
    if (currentIndex === 0 || isTransitioning) return;
    setDirection('backward');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => prev - 1);
      setIsTransitioning(false);
    }, 300);
  }, [currentIndex, isTransitioning]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '1' || e.key === 'a' || e.key === 'A') handleOptionSelect('A');
      if (e.key === '2' || e.key === 'b' || e.key === 'B') handleOptionSelect('B');
      if (e.key === '3' || e.key === 'c' || e.key === 'C') handleOptionSelect('C');
      if (e.key === 'Enter' && selectedOption) handleNext();
      if (e.key === 'Backspace' && currentIndex > 0) handleBack();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleOptionSelect, handleNext, handleBack, selectedOption, currentIndex]);

  if (isSubmitting) {
    return (
      <div className="quiz-loading page-center">
        <div className="quiz-loading__orb" />
        <div className="quiz-loading__content fade-in">
          <div className="quiz-loading__spinner">
            <div className="quiz-loading__ring" />
            <span className="quiz-loading__icon">◈</span>
          </div>
          <h2>Analyzing your mind...</h2>
          <p>Our AI is weaving together your psychological portrait.</p>
          <div className="quiz-loading__dots">
            <span /><span /><span />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz page-center">
      <div className="quiz__container container">
        {/* Progress */}
        <div className="quiz__header fade-in">
          <button
            className="btn btn-ghost quiz__back-btn"
            onClick={handleBack}
            disabled={currentIndex === 0}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>

          <div className="quiz__counter">
            <span className="quiz__counter-current font-mono">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="quiz__counter-sep"> / </span>
            <span className="quiz__counter-total font-mono">{TOTAL}</span>
          </div>
        </div>

        <ProgressBar current={currentIndex + 1} total={TOTAL} answered={answeredCount} />

        {/* Question card */}
        <div
          className={`quiz__card card ${isTransitioning ? `quiz__card--exit-${direction}` : 'quiz__card--enter'}`}
          key={currentIndex}
        >
          <div className="quiz__question-meta">
            <span className="quiz__question-num text-muted font-mono">
              Question {currentIndex + 1}
            </span>
          </div>

          <h2 className="quiz__question-text">{currentQuestion.text}</h2>

          <div className="quiz__options">
            {Object.entries(currentQuestion.options).map(([key, text]) => (
              <button
                key={key}
                className={`quiz__option ${selectedOption === key ? 'quiz__option--selected' : ''}`}
                onClick={() => handleOptionSelect(key)}
                disabled={isTransitioning}
              >
                <span className="quiz__option-key font-mono">{key}</span>
                <span className="quiz__option-text">{text}</span>
                <span className="quiz__option-check">
                  {selectedOption === key && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
              </button>
            ))}
          </div>

          {/* Error message */}
          {error && (
            <div className="quiz__error fade-in">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 5v3.5M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {error}
            </div>
          )}

          {/* Footer */}
          <div className="quiz__footer">
            <span className="quiz__keyboard-hint text-muted">
              Press <kbd>A</kbd>, <kbd>B</kbd>, <kbd>C</kbd> to select · <kbd>Enter</kbd> to continue
            </span>
            <button
              className="btn btn-primary"
              onClick={handleNext}
              disabled={!selectedOption || isTransitioning}
            >
              {isLastQuestion ? 'Reveal My Profile' : 'Continue'}
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
