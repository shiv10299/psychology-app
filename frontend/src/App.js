import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './styles/global.css';

import LandingPage from './pages/LandingPage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import ChatPage from './pages/ChatPage';
import DocsPage from './pages/DocsPage';
import PersonalityQuizPage from './pages/PersonalityQuizPage';
import PsycheGuide from './components/PsycheGuide';

function App() {
  return (
    <Router>
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
        {/* Global floating chatbot - visible on all pages */}
        <PsycheGuide />
      </div>
    </Router>
  );
}

export default App;
