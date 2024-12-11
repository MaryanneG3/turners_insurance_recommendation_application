import { useEffect, useState } from "react";
import BaseLayout from "../../layouts/baselayout/BaseLayout";
import styles from "./InsuranceRecommendationAI.module.css";

function InsuranceRecommendationAI() {
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [error, setError] = useState(null);
  const [responses, setResponses] = useState([]);

  const startChat = async () => {
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/start-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt:
            "You are Tina, a car insurance policy advisor. You are having a conversation with a user who is interested in receiving an insurance policy recommendation. Start the conversation by introducting yourself and asking the user a good start up question to get the conversation going about their insurance needs.",
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
      setResponses([data.tinasResponse]);
      setInterviewStarted(true);
    } catch (err) {
      console.error("Error starting interview:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    startChat();
  }, []);

  const handleResponse = async (userResponse) => {
    if (!userResponse.trim()) {
      alert("Please provide a valid response.");
      return;
    }

    setError(null);

    try {
      const response = await fetch("http://localhost:3000/process-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userResponse }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process user response.");
      }

      const data = await response.json();
      console.log(data);
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
                {responses.map((response, index) =>
                  response ? (
                    <div className={styles.AI_response} key={index}>
                      {response}
                    </div>
                  ) : (
                    <div className={styles.user_response} key={index}>
                      {response}
                    </div>
                  )
                )}
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

            <button onClick={handleResponse} className={styles.submitButton}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export default InsuranceRecommendationAI;
