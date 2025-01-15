import { useEffect, useState } from "react";
import BaseLayout from "../../layouts/baselayout/BaseLayout";
import styles from "./InsuranceRecommendationAI.module.css";

function InsuranceRecommendationAI() {
  const [sessionId, setSessionId] = useState(null);
  const [error, setError] = useState(null);
  const [responses, setResponses] = useState([]);

  // START CHAT HERE < -------------------------------------------------------
  const startChat = async () => {
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/tina/start-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt:
            "You are Tina, a car insurance policy advisor. You are having a conversation with a user who is interested in receiving an insurance policy recommendation. Start the conversation by introducing yourself and asking the user a good start up question with a yes or no answer to see if they want to discuss their insurance needs. Do not suggest answers.",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Failed to get intro response from Tina"
        );
      }

      const data = await response.json();

      setSessionId(data.sessionId);
      setResponses([{ type: "tina", text: data.tinasResponse }]);
    } catch (err) {
      console.error("Error starting interview:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    startChat();
  }, []);

  // HANDLE RESPONSES HERE < -------------------------------------------------------
  const handleResponse = async (userResponse) => {
    if (!userResponse.trim()) {
      alert("Please provide a valid response.");
      return;
    }

    setError(null);

    // Add user response as soon as user submits it - type: user text: userResponse
    setResponses((prevResponses) => [
      ...prevResponses,
      { type: "user", text: userResponse },
    ]);

    try {
      const response = await fetch(
        "http://localhost:3000/tina/process-response",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userResponse }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process user response.");
      }

      const data = await response.json();

      // Add Tina's response to the state
      setResponses((prevResponses) => [
        ...prevResponses,
        { type: "tina", text: data.tinasResponse },
      ]);
    } catch (error) {
      console.error("Error generating content: ", error);
      setError(error.message);
    }
  };

  return (
    <BaseLayout>
      <div className={styles.mainContainer}>
        <div className={styles.ChatBotContainer}>
          <h1 className={styles.chatbotHeading}>
            Chat with Tina - Your AI Insurance Policy Advisor
          </h1>
          <div className={styles.chatDisplayArea}>
            <div className={styles.scrollContainer}>
              <div className={styles.responseContainer}>
                {responses.map((response, index) => (
                  <div
                    key={index}
                    className={
                      response.type === "tina"
                        ? styles.AI_response
                        : styles.user_response
                    }
                  >
                    {response.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.userInputContainer}>
            <textarea
              rows="5"
              cols="30"
              className={styles.userInput}
              placeholder="Chat with Tina"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleResponse(e.target.value);
                  e.target.value = "";
                }
              }}
            />

            <button
              onClick={() => handleResponse("")}
              className={styles.submitButton}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export default InsuranceRecommendationAI;
