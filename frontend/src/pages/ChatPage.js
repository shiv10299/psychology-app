import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sendChatMessage } from '../services/api';
import { v4 as uuidv4 } from 'uuid';
import './ChatPage.css';

const SUGGESTED_PROMPTS = [
  "Why do I keep overthinking every decision I make?",
  "How do I stop people-pleasing without feeling guilty?",
  "I feel stuck in my life. Where do I even start?",
  "Why do I feel lonely even when I'm around people?",
  "How can I trust my own instincts more?",
];

export default function ChatPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const userProfile = location.state?.userProfile || null;

  const [messages, setMessages] = useState([
    {
      id: 'initial',
      role: 'assistant',
      content: userProfile
        ? `I've read your profile — you're a **${userProfile.personalityType}**. That tells me a lot about how you think and feel. What's on your mind today?`
        : "Welcome. I'm here to help you understand yourself a little better. What's weighing on your mind?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId] = useState(() => uuidv4());

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatHistoryRef = useRef([]); // Track conversation history for API

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = useCallback(async (text) => {
    const message = (text || inputValue).trim();
    if (!message || isLoading) return;

    setError(null);
    setInputValue('');

    // Add user message immediately
    const userMsg = { id: uuidv4(), role: 'user', content: message, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    // Update local history for context
    chatHistoryRef.current.push({ role: 'user', content: message });

    try {
      const { response } = await sendChatMessage(message, sessionId, userProfile);

      const aiMsg = { id: uuidv4(), role: 'assistant', content: response, timestamp: new Date() };
      setMessages((prev) => [...prev, aiMsg]);
      chatHistoryRef.current.push({ role: 'assistant', content: response });
    } catch (err) {
      setError(err.message || 'Failed to get a response. Please try again.');
      // Remove user message on failure so they can retry
      setMessages((prev) => prev.filter((m) => m.id !== userMsg.id));
      chatHistoryRef.current.pop();
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [inputValue, isLoading, sessionId, userProfile]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Render markdown-like bold (**text**) in messages
  const renderContent = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) =>
      part.startsWith('**') && part.endsWith('**')
        ? <strong key={i}>{part.slice(2, -2)}</strong>
        : part
    );
  };

  return (
    <div className="chat">
      {/* Header */}
      <header className="chat__header">
        <button className="btn btn-ghost chat__back" onClick={() => navigate(-1)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>

        <div className="chat__header-center">
          <div className="chat__header-avatar">◈</div>
          <div>
            <div className="chat__header-title">Inner Guide</div>
            <div className="chat__header-status">
              <span className="chat__status-dot" />
              AI Psychologist · Active
            </div>
          </div>
        </div>

        {userProfile && (
          <div className="chat__profile-tag">
            {userProfile.personalityType}
          </div>
        )}
      </header>

      {/* Messages */}
      <div className="chat__messages">
        {/* Suggested prompts — only show before any user message */}
        {messages.length === 1 && (
          <div className="chat__suggestions fade-in">
            <p className="chat__suggestions-label">Try asking...</p>
            <div className="chat__suggestions-list">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  className="chat__suggestion-btn"
                  onClick={() => handleSend(prompt)}
                  disabled={isLoading}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message list */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat__message chat__message--${msg.role} fade-in`}
          >
            {msg.role === 'assistant' && (
              <div className="chat__message-avatar">◈</div>
            )}
            <div className="chat__message-body">
              <div className="chat__message-bubble">
                {renderContent(msg.content)}
              </div>
              <div className="chat__message-time">
                {formatTime(msg.timestamp)}
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="chat__message chat__message--assistant fade-in">
            <div className="chat__message-avatar">◈</div>
            <div className="chat__message-body">
              <div className="chat__typing">
                <span /><span /><span />
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="chat__error fade-in">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M7 4.5v3M7 9.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            {error}
            <button onClick={() => setError(null)}>✕</button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="chat__input-area">
        <div className="chat__input-wrapper">
          <textarea
            ref={inputRef}
            className="chat__input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Share what's on your mind..."
            rows={1}
            disabled={isLoading}
            maxLength={2000}
          />
          <button
            className="chat__send-btn"
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isLoading}
          >
            {isLoading ? (
              <span className="spinner" style={{ width: '16px', height: '16px' }} />
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 9l14-7-5 7 5 7-14-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>
        <p className="chat__input-hint">
          Press <kbd>Enter</kbd> to send · <kbd>Shift+Enter</kbd> for new line
        </p>
      </div>
    </div>
  );
}
