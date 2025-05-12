const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// In-memory state for interview progress
const interviews = {}; // Tracks questions count and history for each session

// Endpoint for starting the interview and generating the first question
const startInterview = async (req, res) => {
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ error: "Role is required" });
  }

  try {
    const validationPrompt = `
  I am validating job roles. Please confirm if "${role}" is a recognized job role.
  Respond ONLY with "Valid" or "Invalid". No additional text.
`;

    const validationResult = await model.generateContent(validationPrompt);
    console.log("Validation result:", validationResult);
    const validationResponse = validationResult.response.text().trim();

    if (validationResponse.toLowerCase() !== "valid") {
      return res.status(400).json({
        error: `"${role}" is not a valid role. Please enter a valid role.`,
      });
    }

    const sessionId = `session-${Date.now()}`;
    interviews[sessionId] = {
      role,
      questionsAsked: 1,
      history: [{ question: "Tell me about yourself." }],
    };

    res.json({
      sessionId,
      question: "Tell me about yourself.",
    });
  } catch (err) {
    console.error("Error validating role:", err);
    res.status(500).json({ error: "Failed to validate the role." });
  }
};

const generateNextQuestion = async (req, res) => {
  const { sessionId, userResponse } = req.body;

  if (!sessionId || !userResponse) {
    return res
      .status(400)
      .json({ error: "Session ID and user response are required" });
  }

  const session = interviews[sessionId];
  if (!session) {
    return res.status(400).json({ error: "Invalid session ID" });
  }

  if (session.questionsAsked >= 6) {
    // Automatically notify that the interview is complete
    return res.json({
      message: "The interview has concluded. Thank you!",
      session,
      complete: true, // Added flag for frontend
    });
  }

  try {
    const prompt = `
      Act as a job interviewer for the role of ${session.role}.
      Based on the user's response "${userResponse}", generate the next interview question.
      Do not repeat the same question and avoid hardcoded questions.
      Focus on job-specific skills, experiences, and scenarios.
      The interview should be over in 6 questions.
      Question ${session.questionsAsked + 1}/6:
    `;

    const result = await model.generateContent(prompt);
    const nextQuestion = result.response.text();

    session.questionsAsked += 1;
    session.history.push({ question: nextQuestion });

    res.json({ question: nextQuestion, complete: false });
  } catch (err) {
    console.error("Error generating next question:", err);
    res.status(500).json({ error: "Failed to generate the next question" });
  }
};

// Endpoint for ending the interview and generating feedback
const endInterview = async (req, res) => {
  const { sessionId, responses } = req.body;

  if (!sessionId || !responses || responses.length === 0) {
    return res
      .status(400)
      .json({ error: "Session ID and responses are required" });
  }

  const session = interviews[sessionId];
  if (!session) {
    return res.status(400).json({ error: "Invalid session ID" });
  }

  try {
    const allResponses = responses
      .map((r) => `Question: ${r.question}\nAnswer: ${r.answer}`)
      .join("\n");

    const feedbackPrompt = `
      Act as a job interviewer for the role of ${session.role}.
      Here are the user's responses:\n${allResponses}.
      Provide feedback on how well the user answered the questions and suggest how they can improve their responses.
    `;

    const result = await model.generateContent(feedbackPrompt);
    res.json({ feedback: result.response.text() });
  } catch (err) {
    console.error("Error generating feedback:", err);
    res.status(500).json({ error: "Failed to generate feedback" });
  }
};

module.exports = { startInterview, generateNextQuestion, endInterview };
