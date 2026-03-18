import { useGigShield } from "../context/GigShieldContext";

export default function Claims() {
  const { claimHistory, setSelectedClaim } = useGigShield();

  if (claimHistory.length === 0) {
    return (
      <div className="container">
        <h2>📜 Claim History</h2>
        <div className="empty-state">
          <p>No claims yet. Your weather shield is protecting you! 🛡️</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>📜 Claim History ({claimHistory.length})</h2>

      <div className="claims-list">
        {claimHistory.map((item) => (
          <div
            key={item.id}
            className="claim-card"
            onClick={() => setSelectedClaim(item)}
          >
            <div className="claim-header">
              <span className="claim-icon">{item.icon || "🌧️"}</span>
              <div className="claim-info">
                <h3>{item.type}</h3>
                <p className="claim-date">{item.date}</p>
              </div>
            </div>
            <div className="claim-amount">₹{item.amount}</div>
            <div className={`claim-status ${item.status.toLowerCase()}`}>
              {item.status}
            </div>
          </div>
        ))}
      </div>

      <div className="claims-summary">
        <h3>📊 Summary</h3>
        <p>
          Total Claims: <strong>₹{claimHistory.reduce((sum, c) => sum + c.amount, 0)}</strong>
        </p>
        <p>Average per claim: <strong>₹{Math.round(claimHistory.reduce((sum, c) => sum + c.amount, 0) / claimHistory.length)}</strong></p>
      </div>
    </div>
  );
}