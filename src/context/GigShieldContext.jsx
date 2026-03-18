import React, { createContext, useState, useContext, useEffect } from "react";

const GigShieldContext = createContext();

export function GigShieldProvider({ children }) {
  const defaultPlans = [
    { id: 1, name: "Basic", price: 25, coverage: 500 },
    { id: 2, name: "Standard", price: 50, coverage: 1000 },
    { id: 3, name: "Premium", price: 100, coverage: 2500 },
  ];

  const [plans, setPlans] = useState(defaultPlans);
  const [userName] = useState("Dilshand");
  const [userPlan, setUserPlan] = useState(defaultPlans[0]);
  const [protectedAmount, setProtectedAmount] = useState(450);
  const [walletBalance, setWalletBalance] = useState(1200);

  const [claimHistory, setClaimHistory] = useState([
    {
      id: 1,
      type: "Rain",
      amount: 300,
      date: "2024-03-15",
      status: "Paid",
      icon: "🌧️",
      description: "Heavy rain caused a missed delivery",
    },
  ]);

  const [disruptionTypes] = useState([
    { id: "rain", name: "Rain", icon: "🌧️", amount: 300, description: "Heavy rain may impact deliveries." },
    { id: "heat", name: "Heatwave", icon: "🔥", amount: 150, description: "Extreme heat can slow down work." },
    { id: "road", name: "Road Block", icon: "🚧", amount: 200, description: "Road blockages can delay routes." },
    { id: "network", name: "Network Issue", icon: "📶", amount: 100, description: "Network interruptions may affect orders." },
  ]);

  const [risk, setRisk] = useState("Low");
  const [loading, setLoading] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);

  const [prediction, setPrediction] = useState({
    title: "High rain probability (80%) in next 2 hours",
    recommendation: "Pause work",
    level: "High",
  });

  const addClaim = (disruptionId) => {
    const disruption = disruptionTypes.find((d) => d.id === disruptionId);
    if (!disruption) return;

    const newClaim = {
      id: claimHistory.length + 1,
      type: disruption.name,
      amount: disruption.amount,
      date: new Date().toLocaleDateString(),
      status: "Paid",
      icon: disruption.icon,
      description: disruption.description,
    };

    setClaimHistory([newClaim, ...claimHistory]);
    setWalletBalance((prev) => prev + disruption.amount);
    setProtectedAmount((prev) => Math.min(prev + disruption.amount, userPlan.coverage));
  };

  const changeRisk = (level) => setRisk(level);

  const refreshPrediction = () => {
    const predictions = [
      {
        title: "High rain probability (80%) in next 2 hours",
        recommendation: "Pause work",
        level: "High",
      },
      {
        title: "Medium heat risk (60%) in next 3 hours",
        recommendation: "Stay hydrated and take breaks",
        level: "Medium",
      },
      {
        title: "Low network outage risk (25%)",
        recommendation: "Save progress frequently",
        level: "Low",
      },
      {
        title: "Moderate road block risk (45%) on main routes",
        recommendation: "Plan alternative route",
        level: "Medium",
      },
    ];

    const next = predictions[Math.floor(Math.random() * predictions.length)];
    setPrediction(next);
    setRisk(next.level);
  };

  // Persist state in localStorage
  useEffect(() => {
    const saved = localStorage.getItem("gigshield_mini_pro");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.walletBalance !== undefined) setWalletBalance(data.walletBalance);
        if (data.protectedAmount !== undefined) setProtectedAmount(data.protectedAmount);
        if (data.claimHistory) setClaimHistory(data.claimHistory);
        if (data.risk) setRisk(data.risk);
        if (data.prediction) setPrediction(data.prediction);
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "gigshield_mini_pro",
      JSON.stringify({ walletBalance, protectedAmount, claimHistory, risk, prediction })
    );
  }, [walletBalance, protectedAmount, claimHistory, risk, prediction]);

  const selectPlan = (planId) => {
    const plan = plans.find((p) => p.id === planId);
    if (plan) setUserPlan(plan);
  };

  return (
    <GigShieldContext.Provider
      value={{
        userName,
        userPlan,
        selectPlan,
        plans,
        walletBalance,
        protectedAmount,
        claimHistory,
        disruptionTypes,
        risk,
        loading,
        setLoading,
        addClaim,
        selectedClaim,
        setSelectedClaim,
        prediction,
        refreshPrediction,
        changeRisk,
      }}
    >
      {children}
    </GigShieldContext.Provider>
  );
}

export function useGigShield() {
  const context = useContext(GigShieldContext);
  if (!context) {
    throw new Error("useGigShield must be used within GigShieldProvider");
  }
  return context;
}
