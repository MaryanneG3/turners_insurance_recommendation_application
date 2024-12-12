import { useState } from "react";
import BaseLayout from "../../layouts/baselayout/BaseLayout";
import styles from "./InsuranceQuote.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";

function InsuranceQuote() {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState(null);
  const [annualPremiums, setAP] = useState([]);

  const predictionEndpoint =
    "https://turners-vehicle-recognition.cognitiveservices.azure.com/";
  const predictionKey =
    "3QwkxGV2tYNHj8nJuWVQp237iUQ4qUai24DW0jNLu4nsMiLZdZcXJQQJ99AKACL93NaXJ3w3AAAIACOGnIcS";
  const projectId = "09beff9f-ef9e-47d6-a384-83c277fb30e4";
  const iterationName = "Iteration3";
  const finalURL = `${predictionEndpoint}/customvision/v3.0/Prediction/${projectId}/classify/iterations/${iterationName}/image`;

  // handle file input
  const handleFileInput = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
      sendToPredictionAPI(file);
    }
  };

  // DRAG and DROP Handling
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file && file.type.startsWith("image/")) {
      // Ensure it's an image file
      setImage(URL.createObjectURL(file));
      sendToPredictionAPI(file);
    } else {
      console.error("Only image files are allowed.");
    }
  };

  const handleDrag = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy"; // Indicate a copy operation
  };

  // send image to api
  const sendToPredictionAPI = async (file) => {
    try {
      const res = await fetch(finalURL, {
        method: "POST",
        headers: {
          "Prediction-Key": predictionKey,
          "Content-Type": "application/octet-stream",
        },
        body: file,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await res.json();
      setResults(data.predictions);
      console.log(data.predictions);
      getVehicleType(data.predictions);
    } catch (err) {
      console.error("Error calling Custom Vision API: ", err);
      setResults(null);
    }
  };

  // determine vehicle type

  const getVehicleType = (results) => {
    console.log(results);
    let categoryIdentified = false;

    results.forEach((vehicle) => {
      if (categoryIdentified) return;

      switch (true) {
        case vehicle.tagName === "SUV" && vehicle.probability > 0.8:
          console.log("Your vehicle is classified as an SUV");
          fetchInsurancePremium(vehicle.tagName);
          categoryIdentified = true;
          break;

        case vehicle.tagName === "Sedan" && vehicle.probability > 0.8:
          console.log("Your vehicle is classified as a Sedan");
          fetchInsurancePremium(vehicle.tagName);
          categoryIdentified = true;
          break;

        case vehicle.tagName === "Van" && vehicle.probability > 0.8:
          console.log("Your vehicle is classified as a Van");
          fetchInsurancePremium(vehicle.tagName);
          categoryIdentified = true;
          break;

        case vehicle.tagName === "Ute" && vehicle.probability > 0.8:
          console.log("Your vehicle is classified as a Ute");
          fetchInsurancePremium(vehicle.tagName);
          categoryIdentified = true;
          break;

        default:
          console.log("Error identifying category. Have a cry.");
          break;
      }
    });
  };

  const fetchInsurancePremium = async (vehicleCatergory) => {
    console.log("Passed to Fetch Insurance Premium function");
    try {
      const res = await fetch(`http://localhost:4000/${vehicleCatergory}`);
      const data = await res.json();
      console.log(`Vehicle data successfully fetched from backend: ${data}`);
      setAP(data);
    } catch (e) {
      console.error(`Error fetching Inusrance Premiums: ${e}`);
    }
  };

  return (
    <BaseLayout>
      <div className={styles.mainContainer}>
        <div
          className={styles.leftSection}
          onDrop={handleDrop}
          onDragOver={handleDrag}
        >
          <div className={styles.imageContainer}>
            {image ? (
              <img
                src={image}
                alt="Uploaded User Vehicle"
                className={styles.previewImg}
              />
            ) : (
              <div className={styles.uploadImgPrompt}>
                <FontAwesomeIcon
                  icon={faCloudArrowDown}
                  className={styles.uploadIcon}
                />
                <p>Drag and Drop your vehicle image here, or click to upload</p>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              className={styles.hiddenInput}
              id="fileInput"
              onChange={handleFileInput}
            />

            <label htmlFor="fileInput" className={styles.customButton}>
              Choose file to upload
            </label>
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.insurancePremiumAmount}>
            {annualPremiums.map((ap) => (
              <div key={ap.VehicleID} className={styles.apCont2}>
                <h3>Your vehicle is classified as a {ap.category}</h3>
                <div className={styles.cont3}>
                  <p>
                    Annual Insurance Premium:
                    <span>
                      $ {ap.annualPremiumStart} - $ {ap.annualPremiumEnd}
                    </span>
                  </p>
                </div>
                <div className={styles.cont3}>
                  <p>
                    Monthly Insurance Premium:
                    <span>
                      $ {ap.annualPremiumStart / 12} - ${" "}
                      {(ap.annualPremiumEnd / 12).toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.predictionResultsCont}>
            <h3>Prediction Results</h3>
            {results ? (
              <ul>
                {results.map((prediction, index) => (
                  <li key={index} className={styles.list}>
                    <h5>{prediction.tagName}</h5>
                    <h5 className={styles.resultPercentage}>
                      {(prediction.probability * 100).toFixed(2)}%
                    </h5>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Upload an image to get predictions.</p>
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export default InsuranceQuote;
