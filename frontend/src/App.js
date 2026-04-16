import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import './styles/global.css';

import LandingPage from './pages/LandingPage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import ChatPage from './pages/ChatPage';
import DocsPage from './pages/DocsPage';
import PersonalityQuizPage from './pages/PersonalityQuizPage';
import PsycheGuide from './components/PsycheGuide';

function AppContent() {
  const location = useLocation();
  const hideChatbot = location.pathname === '/chat';

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/personality-quiz" element={<PersonalityQuizPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!hideChatbot && <PsycheGuide />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
