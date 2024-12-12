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

// Endpoint for starting the conversation with Tina is here <----------------------------------
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

// Endpoint for handling the responses from the user <---------------------------------

app.post("/process-response", async (req, res) => {
  const { userResponse } = req.body;
  const sessionId = Object.keys(session)[0]; // Retrieve the session ID (assuming single session for simplicity)

  try {
    // Check if this is the user's first response (to the opt-in question)
    const isFirstQuestion = !session[sessionId]?.hasAnsweredOptIn; // If the 'hasAnsweredOptIn' is not set, it's the first question

    // If the user says "no" to the opt-in question, end the conversation
    if (isFirstQuestion && userResponse.trim().toLowerCase() === "no") {
      const exitPrompt = `The user has indicated they do not wish to proceed with answering questions. Respond politely and let them know the conversation will end.`;
      const exitResponse = await model.generateContent(exitPrompt);
      const exitText = exitResponse.response.text();

      // Update session history and set the flag that the user has opted out
      session[sessionId].history.push({ UsersResponse: userResponse });
      session[sessionId].history.push({ TinasResponse: exitText });

      // Set the flag indicating the opt-in question has been answered
      session[sessionId].hasAnsweredOptIn = true;

      return res.json({ tinasResponse: exitText });
    }

    // Otherwise, continue with the rest of the conversation
    // Generate conversation history for context
    const historyContext = session[sessionId].history
      .map((entry) =>
        entry.TinasResponse
          ? `Tina: ${entry.TinasResponse}`
          : `User: ${entry.UsersResponse}`
      )
      .join("\n");

    // Dynamic prompt incorporating user's response and history
    const dynamicPrompt = `
      You are Tina, a friendly and knowledgeable AI insurance consultant. Here is the conversation so far:
      
      ${historyContext}

      Based on the user's most recent response: "${userResponse}", ask the next most relevant question to gather information about their vehicle or insurance needs. 
      
      Only ask one question at a time. Do not repeat questions or responses already provided. Focus on:
      - Vehicle type (e.g., car, truck, racing car)
      - Purpose of coverage (e.g., own vehicle, third party only)
      - Age of the vehicle (less than 10 years or older)
      - Avoid directly asking users what insurance product they want. Instead, ask questions that help determine the best product.
      - Ensure that questions are not repetitive and dynamically adjust based on the user's previous responses. Use the following categories to guide your questioning:
      - **Vehicle type** (e.g., car, truck, racing car)
      - **Purpose of coverage** (e.g., own vehicle, third party only)
      - **Age of the vehicle** (less than 10 years or older)

      - Example Questions:
        - "What kind of vehicle do you drive?"
        - "Do you need insurance to cover damage to your car or just liability to others?"
        - "How old is your vehicle?"

      - Example of what not to ask:
        - DO NOT ASK FOR license plate number or drivers license number
        - When is your birthday? (Instead just ask if they're over the required age for a policy)
        - DO NOT ASK FOR ZIP CODE OR PERSONAL INFORMATION

      **Recommendation:**
        - Based on the user's responses, recommend one or more of the following insurance products:
        
        1. **Mechanical Breakdown Insurance (MBI):** Covers repairs due to mechanical failure. Not available for trucks and racing cars.
        2. **Comprehensive Car Insurance:** Covers damages to both your vehicle and third-party vehicles. Only available for vehicles less than 10 years old.
        3. **Third Party Car Insurance:** Covers damages to other people's vehicles but not your own.

      - Explain your recommendation clearly, providing reasons based on the user's input. Example:
      - "Based on your responses, I recommend Comprehensive Car Insurance because it provides full coverage for both your vehicle and third-party damages. Since your vehicle is under 10 years old, it qualifies for this policy."
      - Be polite and offer to provide more details if needed.

    ### Follow these Business Rules:
      1. **Mechanical Breakdown Insurance (MBI):** Not available for trucks and racing cars.
      2. **Comprehensive Car Insurance:** Only available for vehicles less than 10 years old.

      Ensure your response is friendly, concise, and conversational. Example:
      - "Thanks for sharing! Can you tell me what kind of vehicle you drive?"
    `;

    const response = await model.generateContent(dynamicPrompt);
    const textResponse = response.response.text();

    // Update session history
    session[sessionId].history.push({ UsersResponse: userResponse });
    session[sessionId].history.push({ TinasResponse: textResponse });

    // Set the flag that the opt-in question has been answered
    session[sessionId].hasAnsweredOptIn = true;

    res.json({ tinasResponse: textResponse });
  } catch (err) {
    console.error("Error processing user response:", err);
    res.status(500).json({ error: "Error processing user response" });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
