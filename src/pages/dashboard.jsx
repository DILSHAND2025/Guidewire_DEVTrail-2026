import { useState, useEffect } from "react";
import Card from "../components/card";
import ProgressBar from "../components/progressBar";
import ClaimFlow from "../components/ClaimFlow";
import { useGigShield } from "../context/GigShieldContext";

export default function Dashboard() {
  const [step, setStep] = useState(0);
  const [currentDisruption, setCurrentDisruption] = useState(null);

  const {
    userName,
    userPlan,
    walletBalance,
    protectedAmount,
    disruptionTypes,
    risk,
    prediction,
    loading,
    setLoading,
    addClaim,
    refreshPrediction,
    changeRisk,
  } = useGigShield();

  useEffect(() => {
    // Refresh the AI prediction when dashboard loads
    refreshPrediction();
  }, []);

  const simulateDisruption = (disruptionId) => {
    const disruption = disruptionTypes.find((d) => d.id === disruptionId);
    if (!disruption) return;

    setLoading(true);
    changeRisk("High");
    setCurrentDisruption(disruption);
    setStep(1);

    setTimeout(() => setStep(2), 1200);
    setTimeout(() => setStep(3), 2600);
    setTimeout(() => {
      setStep(4);
      addClaim(disruptionId);
      setLoading(false);
    }, 4200);

    setTimeout(() => {
      setStep(0);
      changeRisk("Low");
      setCurrentDisruption(null);
    }, 5600);
  };

  return (
    <div className="container">
      <h2>Hi {userName} 👋</h2>
      <p className="subheading">GigShield Mini Pro</p>

      <Card>
        <div className="card-row">
          <div>
            <h3>Plan</h3>
            <p className="card-value">₹{userPlan.price}/week</p>
            <p className="card-small">Coverage: ₹{userPlan.coverage}</p>
            <p className="card-small">
              Status: <span className="status active">Active</span>
            </p>
          </div>
          <div className="risk-card">
            <p className="risk-label">Risk Level</p>
            <span className={`risk-pill ${risk.toLowerCase()}`}>{risk}</span>
          </div>
        </div>
      </Card>

      <Card>
        <div className="prediction-card">
          <div>
            <h4>AI Prediction</h4>
            <p className="prediction-text">{prediction.title}</p>
            <p className="prediction-suggestion">Recommended: {prediction.recommendation}</p>
          </div>
          <button className="btn btn-secondary small" onClick={refreshPrediction}>
            Refresh
          </button>
        </div>
      </Card>

      <Card>
        <h4>💼 Wallet</h4>
        <p className="wallet-balance">₹{walletBalance}</p>
        <ProgressBar value={Math.min((protectedAmount / userPlan.coverage) * 100, 100)} />
        <p className="amount-display">₹{protectedAmount} / ₹{userPlan.coverage} Protected</p>
      </Card>

      <Card>
        <h4>🚨 Disruptions</h4>
        <p className="disruption-note">Tap to simulate a protection payout</p>
        <div className="disruption-grid">
          {disruptionTypes.map((disruption) => (
            <button
              key={disruption.id}
              className="disruption-btn"
              onClick={() => simulateDisruption(disruption.id)}
              disabled={step > 0 || loading}
            >
              <span className="disruption-icon">{disruption.icon}</span>
              <div className="disruption-info">
                <div className="disruption-name">{disruption.name}</div>
                <div className="disruption-amount">₹{disruption.amount}</div>
              </div>
            </button>
          ))}
        </div>
      </Card>

      <ClaimFlow step={step} disruption={currentDisruption} />
    </div>
  );
}