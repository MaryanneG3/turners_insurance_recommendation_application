import BaseLayout from "../../layouts/baselayout/BaseLayout";
import styles from "./InsuranceRecommendationAI.module.css";

const responseHistory = [
  "Hi! I'm Tina, your AI Insurance Policy Advisor. How can I help you today?",
  "Hi Tina! I would like to know more about the insurance policies.",
  "Sure! I can help you with that. What type of insurance are you looking for?",
  "I am looking for car insurance. I own a 2019 Toyota Corolla.",
  "Sure! I can help you with that. What type of insurance are you looking for? Sure! I can help you with that. What type of insurance are you looking for? Sure! I can help you with that. What type of insurance are you looking for? Sure! I can help you with that. What type of insurance are you looking for? Sure! I can help you with that. What type of insurance are you looking for?Sure! I can help you with that. What type of insurance are you looking for?",
];

function InsuranceRecommendationAI() {
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
                {responseHistory.map((response, index) =>
                  index % 2 === 0 ? (
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
            <input type="text" className={styles.userInput} />
            <input type="submit" value="Send" className={styles.submitButton} />
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export default InsuranceRecommendationAI;
