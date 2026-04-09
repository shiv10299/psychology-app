import React, { useState, useRef, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { sendChatMessage } from '../services/api';
import './PsycheGuide.css';

const WELCOME_MSG = {
  id: 'welcome',
  role: 'assistant',
  content: "Hi! I'm PsycheGuide 👋 I can tell you about this app, or we can just talk about what's on your mind. What would you like?",
};

const QUICK_PROMPTS = [
  "What does this app do?",
  "How does the quiz work?",
  "I'm feeling overwhelmed",
  "What's my personality type?",
];

export default function PsycheGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MSG]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => uuidv4());
  const [showPrompts, setShowPrompts] = useState(true);
  const [unread, setUnread] = useState(0);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const historyRef = useRef([]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 100);
      setUnread(0);
    }
  }, [isOpen, messages]);

  const handleSend = useCallback(async (text) => {
    const msg = (text || input).trim();
    if (!msg || isLoading) return;

    setInput('');
    setShowPrompts(false);

    const userMsg = { id: uuidv4(), role: 'user', content: msg };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    historyRef.current.push({ role: 'user', content: msg });

    // App-aware system context
    const appProfile = {
      personalityType: 'App Guide',
      scores: {},
    };

    try {
      const { response } = await sendChatMessage(
        msg,
        sessionId,
        appProfile
      );
      const aiMsg = { id: uuidv4(), role: 'assistant', content: response };
      setMessages((prev) => [...prev, aiMsg]);
      historyRef.current.push({ role: 'assistant', content: response });
      if (!isOpen) setUnread((n) => n + 1);
    } catch {
      const errMsg = { id: uuidv4(), role: 'assistant', content: "Sorry, I couldn't connect right now. Try again in a moment." };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, sessionId, isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat window */}
      {isOpen && (
        <div className="psycheguide__window fade-in">
          {/* Header */}
          <div className="psycheguide__header">
            <div className="psycheguide__header-info">
              <div className="psycheguide__avatar">◈</div>
              <div>
                <div className="psycheguide__name">PsycheGuide</div>
                <div className="psycheguide__status">
                  <span className="psycheguide__status-dot" />
                  AI Companion
                </div>
              </div>
            </div>
            <button className="psycheguide__close" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          {/* Messages */}
          <div className="psycheguide__messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`psycheguide__msg psycheguide__msg--${msg.role}`}>
                {msg.role === 'assistant' && (
                  <div className="psycheguide__msg-avatar">◈</div>
                )}
                <div className="psycheguide__msg-bubble">{msg.content}</div>
              </div>
            ))}

            {/* Quick prompts */}
            {showPrompts && (
              <div className="psycheguide__prompts">
                {QUICK_PROMPTS.map((p) => (
                  <button
                    key={p}
                    className="psycheguide__prompt-btn"
                    onClick={() => handleSend(p)}
                    disabled={isLoading}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Typing */}
            {isLoading && (
              <div className="psycheguide__msg psycheguide__msg--assistant">
                <div className="psycheguide__msg-avatar">◈</div>
                <div className="psycheguide__typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="psycheguide__input-wrap">
            <input
              ref={inputRef}
              className="psycheguide__input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              disabled={isLoading}
              maxLength={500}
            />
            <button
              className="psycheguide__send"
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8l12-6-4 6 4 6-12-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button
        className={`psycheguide__fab ${isOpen ? 'psycheguide__fab--open' : ''}`}
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Open PsycheGuide"
      >
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
          </svg>
        ) : (
          <>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 2C6.477 2 2 5.36 2 10c0 1.7.54 3.28 1.46 4.6L2.5 19l4.54-1.1A9.3 9.3 0 0011 18c4.523 0 9-3.36 9-8S15.523 2 11 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
              <path d="M7 9h8M7 12h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            {unread > 0 && (
              <span className="psycheguide__badge">{unread}</span>
            )}
          </>
        )}
      </button>
    </>
  );
}
