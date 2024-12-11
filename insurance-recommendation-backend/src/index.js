const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI("AIzaSyAFlQKQFc9XRAGJ69p5Hol_Bo6z0LqXzUU");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// In-memory state for interview progress
const session = {};

// Endpoint for starting the conversation with Tina
app.post("/start-chat", async (req, res) => {
  const { prompt } = req.body;

  try {
    const introductionPrompt = prompt;
    const introductionResult = await model.generateContent(introductionPrompt);
    const introductionResponse = introductionResult.response.text();

    const sessionId = `session-${Date.now()}`;
    session[sessionId] = {
      history: [{ TinasResponse: introductionResponse }, { UsersResponse: "" }],
    };

    res.json({
      sessionId,
      tinasResponse: introductionResponse,
    });
  } catch (err) {
    console.error(
      "Tina failed to start the conversation. Tina is getting fired today.",
      err
    );
    res.status(500).json({ error: "Error fetching response from Tina" });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
