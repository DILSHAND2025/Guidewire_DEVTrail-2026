import { useGigShield } from "../context/GigShieldContext";
import "../styles/modal.css";

export default function ClaimModal() {
  const { selectedClaim, setSelectedClaim } = useGigShield();

  if (!selectedClaim) return null;

  return (
    <div className="modal-overlay" onClick={() => setSelectedClaim(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Claim Details</h2>
          <button
            className="modal-close"
            onClick={() => setSelectedClaim(null)}
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="detail-row">
            <span className="label">Type:</span>
            <span className="value">
              {selectedClaim.icon} {selectedClaim.type}
            </span>
          </div>

          <div className="detail-row">
            <span className="label">Amount:</span>
            <span className="value amount">₹{selectedClaim.amount}</span>
          </div>

          <div className="detail-row">
            <span className="label">Date:</span>
            <span className="value">{selectedClaim.date}</span>
          </div>

          <div className="detail-row">
            <span className="label">Status:</span>
            <span className={`value status ${selectedClaim.status.toLowerCase()}`}>
              {selectedClaim.status}
            </span>
          </div>

          <div className="claim-description">
            <h3>Claim Summary</h3>
            <p>
              Your {selectedClaim.type.toLowerCase()} claim has been
              processed and approved. The amount has been credited to your GigShield
              account and can be used to offset your next premium payment.
            </p>
            {selectedClaim.description && (
              <p><strong>Reason:</strong> {selectedClaim.description}</p>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            onClick={() => setSelectedClaim(null)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
