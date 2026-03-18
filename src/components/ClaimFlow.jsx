export default function ClaimFlow({ step, disruption }) {
  return (
    <div className="claim-flow-container">
      {step === 0 && <p>Tap a disruption to simulate protection.</p>}
      {step === 1 && disruption && (
        <p>
          {disruption.icon} <strong>{disruption.name}</strong> detected.
        </p>
      )}
      {step === 2 && (
        <p>
          <span className="spinner" /> Checking eligibility...
        </p>
      )}
      {step === 3 && <p>✅ Claim approved! Processing payout...</p>}
      {step === 4 && disruption && (
        <p className="payout">💰 ₹{disruption.amount} credited to wallet</p>
      )}
    </div>
  );
}