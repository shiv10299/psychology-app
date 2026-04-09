/**
 * API Service
 * Centralized Axios instance and API call functions
 */

import axios from 'axios';

// Base Axios instance with default config
const api = axios.create({
  baseURL: '/api',
  timeout: 45000, // 45s — AI calls can take time
  headers: { 'Content-Type': 'application/json' },
});

// Response interceptor for global error normalization
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.message ||
      'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

/**
 * Submit quiz answers and get personality analysis + AI insight
 * @param {string[]} answers - Array of 20 answers ('A', 'B', or 'C')
 * @returns {Promise<{ scores, personalityType, typeDescription, aiInsight }>}
 */
export const analyzePersonality = async (answers) => {
  const { data } = await api.post('/insight/analyze', { answers });
  return data.result;
};

/**
 * Send a chat message and get AI response
 * @param {string} message - User message
 * @param {string} sessionId - Unique session identifier
 * @param {Object|null} userProfile - Optional personality context
 * @returns {Promise<{ response, sessionId, messageCount }>}
 */
export const sendChatMessage = async (message, sessionId, userProfile = null) => {
  const { data } = await api.post('/chat/message', {
    message,
    sessionId,
    userProfile,
  });
  return data;
};

/**
 * Clear a chat session
 * @param {string} sessionId
 */
export const clearChatSession = async (sessionId) => {
  await api.delete(`/chat/session/${sessionId}`);
};

export default api;
