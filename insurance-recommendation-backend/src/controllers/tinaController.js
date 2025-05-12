const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const session = {};

const startChat = async (req, res) => {
  const { prompt } = req.body;

  try {
    const introductionResult = await model.generateContent(prompt);
    const introductionResponse = introductionResult.response.text();

    const sessionId = `session-${Date.now()}`;
    session[sessionId] = {
      history: [{ TinasResponse: introductionResponse }],
      hasAnsweredOptIn: false,
      questionCount: 0,
      recommendationGiven: false,
    };

    res.json({
      sessionId,
      tinasResponse: introductionResponse,
    });
  } catch (err) {
    console.error("Tina failed to start the conversation:", err);
    res.status(500).json({ error: "Error fetching response from Tina" });
  }
};

const processResponse = async (req, res) => {
  const { userResponse } = req.body;
  const sessionId = Object.keys(session)[0];

  try {
    const currentSession = session[sessionId];

    if (
      !currentSession.hasAnsweredOptIn &&
      userResponse.trim().toLowerCase() === "no"
    ) {
      const exitPrompt = `The user has declined to continue. Respond politely and end the chat.`;
      const exitResponse = await model.generateContent(exitPrompt);
      const exitText = exitResponse.response.text();

      currentSession.history.push(
        { UsersResponse: userResponse },
        { TinasResponse: exitText }
      );
      currentSession.hasAnsweredOptIn = true;

      return res.json({ tinasResponse: exitText });
    }

    currentSession.history.push({ UsersResponse: userResponse });
    currentSession.hasAnsweredOptIn = true;
    currentSession.questionCount++;

    const historyContext = currentSession.history
      .map((entry) =>
        entry.TinasResponse
          ? `Tina: ${entry.TinasResponse}`
          : `User: ${entry.UsersResponse}`
      )
      .join("\n");

    let dynamicPrompt;

    if (
      currentSession.questionCount >= 9 &&
      !currentSession.recommendationGiven
    ) {
      currentSession.recommendationGiven = true;
      dynamicPrompt = `You are Tina, a friendly and enthusiatic AI insurance advisor. Here is the full conversation so far:

${historyContext}

Based on the information collected, recommend an insurance policy that best suits the user's needs, explaining why you chose to suggest that particular policy. Use specific user responses to explain your reasoning. Your response should be detailed, friendly, and help the user understand why the recommendation fits them. If more clarity is needed, feel free to ask a follow-up question, but provide a preliminary recommendation first.`;
    } else {
      dynamicPrompt = `You are Tina, a friendly and knowledgeable AI insurance consultant. Here is the conversation so far:

      ${historyContext}

      Based on the user's latest response: "${userResponse}", ask the next most relevant question to learn more about their vehicle or insurance needs.

      Do not repeat any previous questions. Ensure the next question:
      - Focuses on vehicle type, coverage purpose, or age
      - Is unique based on the conversation
      - Avoids personal data (e.g., birthday, address)
      - Avoids asking the user to suggest a response
      - Do not ask the user what level of coverage they want. Use your judgment based on prior responses.

      Once sufficient information is collected (usually by 10 questions), begin providing a recommendation.

      Avoid greeting the user again when giving your recommendation. Instead, say something like "Based on our conversation, I recommend the following insurance policy..."
      `;
    }

    const response = await model.generateContent(dynamicPrompt);
    const textResponse = response.response.text();

    currentSession.history.push({ TinasResponse: textResponse });

    res.json({ tinasResponse: textResponse });
  } catch (err) {
    console.error("Error processing user response:", err);
    res.status(500).json({ error: "Error processing user response" });
  }
};

module.exports = { startChat, processResponse };
