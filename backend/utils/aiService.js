const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL = 'gemini-2.5-flash-lite';

const generatePersonalityInsight = async (scores, personalityType) => {
  const model = genAI.getGenerativeModel({ model: MODEL });

  const prompt = `You just analyzed someone's personality. Their type is "${personalityType}".
Their scores: ${JSON.stringify(scores)}

Write a SHORT, warm personality insight — like a close friend who truly gets them.

Rules:
- Max 4-5 sentences total
- No headers, no bullet points, no lists
- Talk directly to them using "you"
- Feel like a real person speaking, not a report
- If they overthink a lot, acknowledge that gently — make them feel understood, not analyzed
- End with one small, encouraging thought`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};

const generateChatResponse = async (conversationHistory, userMessage, userProfile = null) => {
  const model = genAI.getGenerativeModel({ model: MODEL });

  const profileContext = userProfile
    ? `The person you're talking to is a "${userProfile.personalityType}". Keep that in mind.`
    : '';

  let fullPrompt = `You are a warm, calm friend who understands psychology deeply. You don't give lectures — you just listen, reflect, and say the right thing at the right time.

${profileContext}

How you talk:
- Short responses only — 2 to 4 sentences max
- Never give a list or bullet points
- Sound like a real human, not a therapist or chatbot
- If someone is overthinking, gently help them slow down
- Always make them feel heard first, then offer a soft perspective
- Sometimes just ask one simple question to help them think
- Use casual, warm language — like texting a trusted friend

Conversation so far:
`;

  conversationHistory.forEach((msg) => {
    const role = msg.role === 'assistant' ? 'You' : 'Them';
    fullPrompt += `${role}: ${msg.content}\n`;
  });

  fullPrompt += `Them: ${userMessage}\nYou:`;

  const result = await model.generateContent(fullPrompt);
  return result.response.text();
};

const formatTraits = (scores) => {
  return Object.entries(scores)
    .map(([trait, score]) => `${trait}: ${score}/100`)
    .join(', ');
};

module.exports = { generatePersonalityInsight, generateChatResponse };