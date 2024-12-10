import BaseLayout from "../../layouts/baselayout/BaseLayout";
import styles from "./InsuranceRecommendationAI.module.css";

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
                <div className={styles.AI_response}>
                  <p>
                    Hi! I'm Tina, your AI Insurance Policy Advisor. How can I
                    help you today?
                  </p>
                </div>

                <div className={styles.user_response}>
                  <p>
                    Hi Tina! I would like to know more about the insurance
                    policies.
                  </p>
                </div>

                <div className={styles.AI_response}>
                  <p>
                    Sure! I can help you with that. What type of insurance are
                    you looking for?
                  </p>
                </div>

                <div className={styles.user_response}>
                  <p>
                    I am looking for car insurance. I own a 2019 Toyota Corolla.
                  </p>
                </div>
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
