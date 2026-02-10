import { NavLink } from "react-router-dom";
import BaseLayout from "../../layouts/baselayout/BaseLayout";
import styles from "./Homepage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

export default function Homepage() {
  return (
    <BaseLayout>
      <div className={styles.mainContentContainer}>
        {/* flex column */}
        <div className={styles.topSection}>
          <div className={styles.tob}>
            <h3 className={styles.title}>Table of Contents</h3>
            <nav className={styles.tobLinksContainer}>
              <a href="#intro">1. &nbsp;&nbsp; Motor Vehicle Insurance Types</a>

              <a href="#MBI">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a.&nbsp;&nbsp;Mechanical
                Breakdown Insurance
              </a>

              <a href="#CI">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b.&nbsp;&nbsp;Car
                Insurance
              </a>
            </nav>
          </div>

          <div className={styles.promotionalImgtxtContainer}>
            <div className={styles.promotionalText}>
              <h3>Find the right insurance for you in minutes.</h3>
              <p>
                Use our AI-powered recommendation tool to discover the insurance
                policy that best matches your needs, budget, and lifestyle.
                Answer a few quick questions and get personalised policy
                suggestions instantly.
              </p>

              <NavLink
                to="/tools/insurance-recommendation-ai"
                className={styles.insuranceQuoteBtn}
              >
                Get an Insurance Recommendation Today!
              </NavLink>
            </div>

            <div className={styles.imageContainer}>
              <img
                src="/images/carousel/Toyota-5-seater-SUV.jpg"
                alt="Toyota 5 Seater SUV"
              />
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <section id="intro" className={styles.introSection}>
            <h1>Disclaimer: The content below is filler content.</h1>
            <h1>Motor Vehicle Insurance</h1>

            <p>There are 2 main types of Motor Vehicle Insurance:</p>

            <a href="#MBI">
              <FontAwesomeIcon
                icon={faAngleDoubleRight}
                className={styles.icon}
              />
              Mechanical Breakdown Insurance
            </a>

            <a href="#CI">
              <FontAwesomeIcon
                icon={faAngleDoubleRight}
                className={styles.icon}
              />
              Car Insurance
            </a>
          </section>

          <section id="MBI" className={styles.mbiSection}>
            <h2>Mechanical Breakdown Insurance</h2>
            <div className={styles.mbiInfo}>
              Mechanical Breakdown Insurance covers the cost of repairing your
              car if you have mechanical or electrical failure.
              <br />
              <br />
              Cover includes:
              <br />
              <br />
              <div className={styles.cover}>
                <FontAwesomeIcon
                  icon={faAngleDoubleRight}
                  className={styles.icon}
                />
                Comprehensive cover for mechanical and electrical breakdown
              </div>
              <div className={styles.cover}>
                <FontAwesomeIcon
                  icon={faAngleDoubleRight}
                  className={styles.icon}
                />
                Parts & labour
              </div>
              <div className={styles.cover}>
                <FontAwesomeIcon
                  icon={faAngleDoubleRight}
                  className={styles.icon}
                />
                AA Roadservice & 24/7 breakdown assistance
              </div>
              <div className={styles.cover}>
                <FontAwesomeIcon
                  icon={faAngleDoubleRight}
                  className={styles.icon}
                />
                Vehicle recovery and towing
              </div>
              <div className={styles.cover}>
                <FontAwesomeIcon
                  icon={faAngleDoubleRight}
                  className={styles.icon}
                />
                Accommodation & rental car costs for out of town breakdowns
              </div>
              <div className={styles.cover}>
                <FontAwesomeIcon
                  icon={faAngleDoubleRight}
                  className={styles.icon}
                />
                Generous claim limits that are set when you purchase your policy
              </div>
              <br />
              <br />
              <p>
                If you are getting Finance, your Mechanical Breakdown Insurance
                can be included in your loan.
                <br />
                You can get Mechanical Breakdown Insurance for any vehicle, even
                if you didn’t buy it at Turners (subject to underwriting
                criteria).
              </p>
            </div>
          </section>

          <section id="CI" className={styles.ciSection}>
            <h2>Car Insurance</h2>
            <div>
              We’ve got you covered from comprehensive, third party fire &
              theft, to third party property damage.
              <br />
              <br />
              Benefits include:
              <br />
              <br />
              <div className={styles.cover}>
                <FontAwesomeIcon
                  icon={faAngleDoubleRight}
                  className={styles.icon}
                />
                Replacement vehicle cover
              </div>
              <div className={styles.cover}>
                <FontAwesomeIcon
                  icon={faAngleDoubleRight}
                  className={styles.icon}
                />
                Keys & locks
              </div>
              <div className={styles.cover}>
                <FontAwesomeIcon
                  icon={faAngleDoubleRight}
                  className={styles.icon}
                />
                Emergency travel, accommodation & repairs
              </div>
              <div className={styles.cover}>
                <FontAwesomeIcon
                  icon={faAngleDoubleRight}
                  className={styles.icon}
                />
                Towing & storage
              </div>
              <div className={styles.cover}>
                <FontAwesomeIcon
                  icon={faAngleDoubleRight}
                  className={styles.icon}
                />
                Optional excess-free windscreen and window glass
              </div>
              <div className={styles.cover}>
                <FontAwesomeIcon
                  icon={faAngleDoubleRight}
                  className={styles.icon}
                />
                Optional AA Roadside Assistance cover
              </div>
            </div>
          </section>
        </div>
      </div>
    </BaseLayout>
  );
}
