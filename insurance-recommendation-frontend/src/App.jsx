import { Routes, Route } from "react-router-dom";
import "./App.css";
import InsuranceQuote from "./pages/insurancePremiumCalculator/InsuranceQuote";
import InsuranceRecommendationAI from "./pages/insuranceRecommendationAI/InsuranceRecommendationAI";
import Homepage from "./pages/homepage/Homepage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route
        path="/tools/insurance-quote-estimation-calculator"
        element={<InsuranceQuote />}
      />
      <Route
        path="/tools/insurance-recommendation-ai"
        element={<InsuranceRecommendationAI />}
      />
    </Routes>
  );
}

export default App;
