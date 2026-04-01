import { useState, useEffect, useCallback, useRef } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const CITIES = [
  { id: "chennai", name: "Chennai", lat: 13.0827, lon: 80.2707, emoji: "🌊" },
  { id: "mumbai", name: "Mumbai", lat: 19.076, lon: 72.8777, emoji: "🌆" },
  { id: "delhi", name: "Delhi", lat: 28.6139, lon: 77.209, emoji: "🏛️" },
  { id: "bangalore", name: "Bengaluru", lat: 12.9716, lon: 77.5946, emoji: "🌿" },
  { id: "hyderabad", name: "Hyderabad", lat: 17.385, lon: 78.4867, emoji: "🕌" },
  { id: "kolkata", name: "Kolkata", lat: 22.5726, lon: 88.3639, emoji: "🎨" },
];

const CLAIM_STEPS = [
  { id: "detect", label: "Detecting Disruption", icon: "📡", duration: 1400 },
  { id: "verify", label: "Verifying Identity", icon: "🔐", duration: 1200 },
  { id: "fraud", label: "Fraud Check", icon: "🛡️", duration: 1600 },
  { id: "approve", label: "Approving Claim", icon: "✅", duration: 1000 },
  { id: "credit", label: "Crediting Payout", icon: "💰", duration: 900 },
];

const WORKER = {
  name: "Arjun Ramesh",
  id: "GW-9812-TN",
  platform: "Swiggy",
  city: "Chennai",
  plan: "GigShield Pro",
  coverage: "₹12,000/month",
  avatar: "AR",
  rating: 4.8,
  deliveries: 2847,
  joinDate: "Jan 2024",
};

// ─── Mock weather fetch ───────────────────────────────────────────────────────
async function fetchWeatherMock(city) {
  await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));
  const conditions = {
    chennai: { temp: 37, humidity: 88, condition: "Thunderstorm", wind: 22, rain: 0.9, heat: 0.85 },
    mumbai: { temp: 33, humidity: 76, condition: "Heavy Rain", wind: 18, rain: 0.75, heat: 0.6 },
    delhi: { temp: 44, humidity: 22, condition: "Extreme Heat", wind: 8, rain: 0.05, heat: 0.97 },
    bangalore: { temp: 27, humidity: 65, condition: "Partly Cloudy", wind: 12, rain: 0.2, heat: 0.25 },
    hyderabad: { temp: 39, humidity: 55, condition: "Hot & Sunny", wind: 10, rain: 0.1, heat: 0.78 },
    kolkata: { temp: 34, humidity: 82, condition: "Drizzle", wind: 14, rain: 0.45, heat: 0.55 },
  };
  return conditions[city.id] || { temp: 30, humidity: 60, condition: "Clear", wind: 10, rain: 0.1, heat: 0.3 };
}

function getRiskLevel(weather) {
  if (!weather) return { level: "loading", score: 0, color: "#666", bg: "#1a1a2e" };
  const score = Math.round((weather.rain * 0.55 + weather.heat * 0.45) * 100);
  if (score >= 70) return { level: "HIGH", score, color: "#ff4757", bg: "rgba(255,71,87,0.12)" };
  if (score >= 40) return { level: "MEDIUM", score, color: "#ffa502", bg: "rgba(255,165,2,0.12)" };
  return { level: "LOW", score, color: "#2ed573", bg: "rgba(46,213,115,0.12)" };
}

// ─── Subcomponents ────────────────────────────────────────────────────────────

function Pill({ children, color = "#2ed573" }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "3px 10px", borderRadius: 20,
      background: color + "22", color, fontSize: 11, fontWeight: 700,
      letterSpacing: "0.06em", textTransform: "uppercase", border: `1px solid ${color}44`
    }}>{children}</span>
  );
}

function Card({ children, style = {}, glow }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16, padding: "20px 22px",
      boxShadow: glow ? `0 0 30px ${glow}33, 0 4px 24px rgba(0,0,0,0.4)` : "0 4px 24px rgba(0,0,0,0.3)",
      backdropFilter: "blur(12px)",
      transition: "all 0.3s ease",
      ...style
    }}>{children}</div>
  );
}

function StatChip({ label, value, sub, color = "#7c8cf8" }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 22, fontWeight: 800, color, fontFamily: "'Space Mono', monospace" }}>{value}</div>
      <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{label}</div>
      {sub && <div style={{ fontSize: 10, color: "#555", marginTop: 1 }}>{sub}</div>}
    </div>
  );
}

function ProgressBar({ pct, color = "#7c8cf8", animated }) {
  return (
    <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
      <div style={{
        height: "100%", width: `${pct}%`, background: color,
        borderRadius: 99, transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: animated ? `0 0 10px ${color}` : "none"
      }} />
    </div>
  );
}

function ClaimFlowModal({ onClose, disruption }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone] = useState(false);
  const [fraudFlag, setFraudFlag] = useState(false);

  useEffect(() => {
    if (currentStep >= CLAIM_STEPS.length) { setDone(true); return; }
    const t = setTimeout(() => {
      setCurrentStep((s) => s + 1);
    }, CLAIM_STEPS[currentStep]?.duration || 1000);
    return () => clearTimeout(t);
  }, [currentStep]);

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, backdropFilter: "blur(8px)", padding: 20
    }}>
      <div style={{
        background: "linear-gradient(160deg, #0f0f1a 0%, #12121f 100%)",
        border: "1px solid rgba(124,140,248,0.3)", borderRadius: 24,
        padding: "32px 28px", maxWidth: 420, width: "100%",
        boxShadow: "0 0 60px rgba(124,140,248,0.15), 0 20px 80px rgba(0,0,0,0.6)"
      }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>
            {disruption === "rain" ? "🌧️" : "🔥"}
          </div>
          <div style={{ fontSize: 17, fontWeight: 700, color: "#f0f0ff" }}>
            {disruption === "rain" ? "Heavy Rain" : "Extreme Heat"} Detected
          </div>
          <div style={{ fontSize: 12, color: "#777", marginTop: 4 }}>Auto-claim processing initiated</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {CLAIM_STEPS.map((step, i) => {
            const state = i < currentStep ? "done" : i === currentStep ? "active" : "pending";
            return (
              <div key={step.id} style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "12px 14px", borderRadius: 12,
                background: state === "active" ? "rgba(124,140,248,0.1)" : state === "done" ? "rgba(46,213,115,0.06)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${state === "active" ? "rgba(124,140,248,0.3)" : state === "done" ? "rgba(46,213,115,0.2)" : "rgba(255,255,255,0.04)"}`,
                transition: "all 0.4s ease"
              }}>
                <div style={{ fontSize: 20, width: 32, textAlign: "center" }}>
                  {state === "done" ? "✅" : state === "active" ? "⏳" : step.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: state === "pending" ? "#555" : "#eee" }}>
                    {step.label}
                  </div>
                  {state === "active" && (
                    <div style={{ fontSize: 11, color: "#7c8cf8", marginTop: 3 }}>
                      Processing...
                    </div>
                  )}
                  {state === "done" && step.id === "fraud" && (
                    <div style={{ fontSize: 11, color: "#2ed573", marginTop: 3 }}>No anomalies detected</div>
                  )}
                </div>
                {state === "active" && (
                  <div style={{
                    width: 18, height: 18, borderRadius: "50%",
                    border: "2px solid rgba(124,140,248,0.2)",
                    borderTop: "2px solid #7c8cf8",
                    animation: "spin 0.7s linear infinite"
                  }} />
                )}
              </div>
            );
          })}
        </div>

        {done && (
          <div style={{
            marginTop: 24, padding: "20px", borderRadius: 14,
            background: "linear-gradient(135deg, rgba(46,213,115,0.1), rgba(46,213,115,0.05))",
            border: "1px solid rgba(46,213,115,0.25)", textAlign: "center"
          }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#2ed573" }}>Claim Approved!</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#fff", margin: "8px 0", fontFamily: "'Space Mono', monospace" }}>
              +₹{disruption === "rain" ? "850" : "1,200"}
            </div>
            <div style={{ fontSize: 12, color: "#888" }}>Credited to GigShield Wallet</div>
            <button onClick={onClose} style={{
              marginTop: 16, padding: "10px 28px", borderRadius: 10,
              background: "#2ed573", color: "#0a0a0f", border: "none",
              fontWeight: 700, fontSize: 14, cursor: "pointer", width: "100%"
            }}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

function CityRiskCard({ city, weather, risk, loading }) {
  return (
    <Card style={{ padding: "14px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#eee" }}>{city.emoji} {city.name}</div>
          <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>
            {loading ? "Fetching..." : weather?.condition}
          </div>
        </div>
        {!loading && risk && (
          <Pill color={risk.color}>{risk.level}</Pill>
        )}
      </div>
      {!loading && weather && (
        <div style={{ marginTop: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: "#666" }}>Risk Score</span>
            <span style={{ fontSize: 11, color: risk?.color, fontWeight: 700, fontFamily: "monospace" }}>{risk?.score}%</span>
          </div>
          <ProgressBar pct={risk?.score} color={risk?.color} animated={risk?.level === "HIGH"} />
          <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
            <span style={{ fontSize: 10, color: "#666" }}>🌡️ {weather.temp}°C</span>
            <span style={{ fontSize: 10, color: "#666" }}>💧 {weather.humidity}%</span>
            <span style={{ fontSize: 10, color: "#666" }}>💨 {weather.wind} km/h</span>
          </div>
        </div>
      )}
    </Card>
  );
}

function AdminDashboard({ claims }) {
  const totalPayout = claims.reduce((s, c) => s + (c.amount || 0), 0);
  const fraudAlerts = claims.filter((c) => c.fraud).length;
  const approvedClaims = claims.filter((c) => c.status === "approved");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2ed573", boxShadow: "0 0 8px #2ed573" }} />
        <span style={{ fontSize: 13, color: "#2ed573", fontWeight: 700, letterSpacing: "0.1em" }}>ADMIN CONTROL PANEL</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
        {[
          { label: "Total Claims", value: claims.length, icon: "📋", color: "#7c8cf8" },
          { label: "Total Payouts", value: `₹${totalPayout.toLocaleString()}`, icon: "💸", color: "#2ed573" },
          { label: "Fraud Alerts", value: fraudAlerts, icon: "🚨", color: "#ff4757" },
          { label: "Active Users", value: 1284, icon: "👥", color: "#ffa502" },
        ].map((stat) => (
          <Card key={stat.label} glow={stat.color} style={{ padding: "16px 18px" }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{stat.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: stat.color, fontFamily: "monospace" }}>{stat.value}</div>
            <div style={{ fontSize: 11, color: "#666", marginTop: 3 }}>{stat.label}</div>
          </Card>
        ))}
      </div>

      <Card>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#888", marginBottom: 14, letterSpacing: "0.08em" }}>RECENT ACTIVITY</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {claims.slice(-4).reverse().map((c, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 12px", borderRadius: 10,
              background: c.fraud ? "rgba(255,71,87,0.06)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${c.fraud ? "rgba(255,71,87,0.2)" : "rgba(255,255,255,0.05)"}`
            }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#ddd" }}>
                  {c.type === "rain" ? "🌧️" : "🔥"} {c.type === "rain" ? "Rain" : "Heat"} Claim
                </div>
                <div style={{ fontSize: 10, color: "#555" }}>{c.time}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: c.fraud ? "#ff4757" : "#2ed573", fontFamily: "monospace" }}>
                  {c.fraud ? "BLOCKED" : `+₹${c.amount}`}
                </div>
                <div style={{ fontSize: 10, color: "#555" }}>{c.fraud ? "Suspicious" : "Approved"}</div>
              </div>
            </div>
          ))}
          {claims.length === 0 && (
            <div style={{ textAlign: "center", color: "#444", fontSize: 12, padding: 20 }}>No claims yet</div>
          )}
        </div>
      </Card>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function GigShieldAI() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [cityWeather, setCityWeather] = useState({});
  const [loadingCities, setLoadingCities] = useState({});
  const [claims, setClaims] = useState([
    { type: "rain", amount: 850, status: "approved", time: "Today 08:14", fraud: false },
    { type: "heat", amount: 1200, status: "approved", time: "Yesterday 13:30", fraud: false },
  ]);
  const [viewport, setViewport] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = viewport.width < 768;
  const isTablet = viewport.width >= 768 && viewport.width < 1024;
  const isDesktop = viewport.width >= 1024;

  // Force full viewport width to avoid white margins on desktop while maintaining mobile fit.
  const maxAppWidth = "100%";
  const contentPadding = isMobile ? "16px 8px 100px" : "22px 12px 100px";
  const panelGridColumns = isMobile ? "1fr" : "1fr 1fr";
  const [walletBalance, setWalletBalance] = useState(5840);
  const [claimModal, setClaimModal] = useState(null);
  const [cooldown, setCooldown] = useState(0);
  const [fraudAlert, setFraudAlert] = useState(false);
  const [homeWeather, setHomeWeather] = useState(null);
  const [loadingHome, setLoadingHome] = useState(true);
  const cooldownRef = useRef(null);

  // Load home city weather
  useEffect(() => {
    fetchWeatherMock(CITIES[0]).then((w) => {
      setHomeWeather(w);
      setLoadingHome(false);
    });
  }, []);

  // Load risk panel cities
  useEffect(() => {
    if (activeTab !== "risk") return;
    CITIES.forEach((city) => {
      if (cityWeather[city.id]) return;
      setLoadingCities((p) => ({ ...p, [city.id]: true }));
      fetchWeatherMock(city).then((w) => {
        setCityWeather((p) => ({ ...p, [city.id]: w }));
        setLoadingCities((p) => ({ ...p, [city.id]: false }));
      });
    });
  }, [activeTab]);

  const triggerClaim = useCallback((type) => {
    if (cooldown > 0) {
      setFraudAlert(true);
      setTimeout(() => setFraudAlert(false), 3500);
      return;
    }
    setClaimModal(type);
  }, [cooldown]);

  const handleClaimClose = useCallback((type) => {
    const amount = type === "rain" ? 850 : 1200;
    const newClaim = {
      type, amount, status: "approved", fraud: false,
      time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
    };
    setClaims((p) => [...p, newClaim]);
    setWalletBalance((b) => b + amount);
    setClaimModal(null);
    // Start cooldown
    setCooldown(30);
    cooldownRef.current = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) { clearInterval(cooldownRef.current); return 0; }
        return c - 1;
      });
    }, 1000);
  }, []);

  const homeRisk = getRiskLevel(homeWeather);

  const TABS = [
    { id: "dashboard", label: "Dashboard", icon: "⚡" },
    { id: "risk", label: "Risk Panel", icon: "🌐" },
    { id: "claims", label: "Claims", icon: "📋" },
    { id: "admin", label: "Admin", icon: "🔧" },
  ];

  return (
    <div style={{
      minHeight: "100vh", background: "#080810",
      color: "#f0f0ff", fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      maxWidth: maxAppWidth, width: "100%", margin: 0, position: "relative"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
        @keyframes slideUp { from{opacity:0;transform:translateY(16px);} to{opacity:1;transform:translateY(0);} }
        @keyframes glow { 0%,100%{box-shadow:0 0 12px rgba(255,71,87,0.3);} 50%{box-shadow:0 0 28px rgba(255,71,87,0.7);} }
        @keyframes ticker { from{transform:translateX(0);} to{transform:translateX(-50%);} }
        ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-track{background:transparent;} ::-webkit-scrollbar-thumb{background:#2a2a3f;border-radius:2px;}
      `}</style>

      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, rgba(8,8,16,0.98) 0%, rgba(8,8,16,0.9) 100%)",
        backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 100,
        borderBottom: "1px solid rgba(255,255,255,0.06)"
      }}>
        {/* Ticker */}
        <div style={{
          background: "rgba(124,140,248,0.08)", borderBottom: "1px solid rgba(124,140,248,0.1)",
          overflow: "hidden", height: 28
        }}>
          <div style={{
            display: "flex", gap: 40, animation: "ticker 22s linear infinite",
            alignItems: "center", height: "100%", width: "max-content"
          }}>
            {["🌧️ Chennai: High Rain Risk", "🔥 Delhi: Extreme Heat Alert", "✅ 247 claims processed today",
              "💰 ₹2.1L paid out this week", "🛡️ 1,284 workers protected", "📡 AI Engine: Active",
              "🌧️ Chennai: High Rain Risk", "🔥 Delhi: Extreme Heat Alert", "✅ 247 claims processed today"
            ].map((t, i) => (
              <span key={i} style={{ fontSize: 10, color: "#7c8cf8", fontWeight: 600, whiteSpace: "nowrap", letterSpacing: "0.05em" }}>{t}</span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>🛡️</span>
              <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em", color: "#fff" }}>GigShield <span style={{ color: "#7c8cf8" }}>AI</span></span>
            </div>
            <div style={{ fontSize: 10, color: "#555", marginTop: 2, letterSpacing: "0.1em" }}>PARAMETRIC INSURANCE ENGINE</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "#666" }}>Wallet</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#2ed573", fontFamily: "'Space Mono', monospace" }}>₹{walletBalance.toLocaleString()}</div>
            </div>
            <div style={{
              width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center",
              justifyContent: "center", background: "linear-gradient(135deg, #7c8cf8, #a78bfa)",
              fontSize: 13, fontWeight: 800, color: "#fff"
            }}>{WORKER.avatar}</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", padding: "0 16px 12px", gap: 6 }}>
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              flex: 1, padding: "8px 4px", borderRadius: 10, border: "none", cursor: "pointer",
              background: activeTab === tab.id ? "rgba(124,140,248,0.15)" : "transparent",
              color: activeTab === tab.id ? "#7c8cf8" : "#555",
              fontSize: 10, fontWeight: 700, letterSpacing: "0.05em",
              borderBottom: activeTab === tab.id ? "2px solid #7c8cf8" : "2px solid transparent",
              transition: "all 0.2s"
            }}>
              <div style={{ fontSize: 14, marginBottom: 2 }}>{tab.icon}</div>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ position: "fixed", top: 12, right: 12, zIndex: 105, fontSize: 10, color: "#bbb", background: "rgba(0,0,0,0.45)", padding: "4px 8px", borderRadius: 8, textAlign: "right" }}>
        {viewport.width} x {viewport.height} px ({isMobile ? "Mobile" : isTablet ? "Tablet" : "Desktop"})
      </div>

      {/* Content */}
      <div style={{ padding: contentPadding, display: "flex", flexDirection: "column", gap: 16, animation: "slideUp 0.4s ease" }}>

        {/* ── DASHBOARD TAB ── */}
        {activeTab === "dashboard" && (
          <>
            {/* Worker Card */}
            <Card glow="#7c8cf8" style={{
              background: "linear-gradient(135deg, rgba(124,140,248,0.12) 0%, rgba(167,139,250,0.06) 100%)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <Pill color="#2ed573">● Active</Pill>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginTop: 10 }}>{WORKER.name}</div>
                  <div style={{ fontSize: 12, color: "#777", marginTop: 3 }}>{WORKER.id} · {WORKER.platform}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: "#666" }}>Plan</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#7c8cf8" }}>{WORKER.plan}</div>
                  <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{WORKER.coverage}</div>
                </div>
              </div>
              <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "16px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <StatChip label="Rating" value={WORKER.rating} color="#ffa502" />
                <StatChip label="Deliveries" value={WORKER.deliveries.toLocaleString()} color="#7c8cf8" />
                <StatChip label="Since" value={WORKER.joinDate} color="#a78bfa" />
              </div>
            </Card>

            {/* AI Risk Engine */}
            <Card glow={homeRisk.color}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 11, color: "#555", letterSpacing: "0.1em", fontWeight: 700 }}>AI RISK ENGINE</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#eee", marginTop: 4 }}>Chennai, Tamil Nadu</div>
                </div>
                <div style={{
                  padding: "6px 14px", borderRadius: 10, background: homeRisk.bg,
                  border: `1px solid ${homeRisk.color}44`
                }}>
                  <div style={{ fontSize: 11, color: homeRisk.color, fontWeight: 800, letterSpacing: "0.06em" }}>
                    {loadingHome ? "..." : homeRisk.level} RISK
                  </div>
                </div>
              </div>

              {loadingHome ? (
                <div style={{ textAlign: "center", padding: 20, color: "#555" }}>Fetching weather data...</div>
              ) : (
                <>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: "#888" }}>Risk Score</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: homeRisk.color, fontFamily: "monospace" }}>{homeRisk.score}/100</span>
                    </div>
                    <ProgressBar pct={homeRisk.score} color={homeRisk.color} animated />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: panelGridColumns, gap: 10, marginBottom: 16 }}>
                    {[
                      { label: "🌧️ Rain Probability", value: `${Math.round(homeWeather.rain * 100)}%`, color: "#7c8cf8" },
                      { label: "🔥 Heat Index", value: `${Math.round(homeWeather.heat * 100)}%`, color: "#ff6b6b" },
                      { label: "🌡️ Temperature", value: `${homeWeather.temp}°C`, color: "#ffa502" },
                      { label: "💨 Wind Speed", value: `${homeWeather.wind} km/h`, color: "#2ed573" },
                    ].map((item) => (
                      <div key={item.label} style={{
                        padding: "10px 12px", borderRadius: 10,
                        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)"
                      }}>
                        <div style={{ fontSize: 10, color: "#666", marginBottom: 4 }}>{item.label}</div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: item.color, fontFamily: "monospace" }}>{item.value}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    padding: "12px 14px", borderRadius: 12,
                    background: "rgba(124,140,248,0.06)", border: "1px solid rgba(124,140,248,0.15)"
                  }}>
                    <div style={{ fontSize: 10, color: "#7c8cf8", fontWeight: 700, letterSpacing: "0.08em", marginBottom: 4 }}>🤖 AI PREDICTION</div>
                    <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.5 }}>
                      {homeWeather.rain > 0.7
                        ? `${Math.round(homeWeather.rain * 100)}% chance of heavy rain in next 3 hours. High disruption risk for delivery operations.`
                        : homeWeather.heat > 0.75
                        ? `Extreme heat advisory active. ${Math.round(homeWeather.heat * 100)}% heat stress index. Claim eligible if temp exceeds 42°C.`
                        : "Conditions are manageable. Monitor for updates. No immediate claim trigger expected."}
                    </div>
                  </div>
                </>
              )}
            </Card>

            {/* Fraud Alert */}
            {fraudAlert && (
              <div style={{
                padding: "14px 16px", borderRadius: 14,
                background: "rgba(255,71,87,0.1)", border: "1px solid rgba(255,71,87,0.3)",
                animation: "glow 1s ease infinite", display: "flex", alignItems: "center", gap: 10
              }}>
                <span style={{ fontSize: 20 }}>🚨</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#ff4757" }}>Suspicious Activity Detected</div>
                  <div style={{ fontSize: 11, color: "#ff475799" }}>Cooldown active. Please wait {cooldown}s before next claim.</div>
                </div>
              </div>
            )}

            {/* Simulate Disruption */}
            <Card>
              <div style={{ fontSize: 11, color: "#555", letterSpacing: "0.1em", fontWeight: 700, marginBottom: 16 }}>SIMULATE DISRUPTION</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { type: "rain", label: "Trigger Rain Claim", icon: "🌧️", color: "#7c8cf8", amount: "₹850" },
                  { type: "heat", label: "Trigger Heat Claim", icon: "🔥", color: "#ff6b6b", amount: "₹1,200" },
                ].map((btn) => (
                  <button key={btn.type} onClick={() => triggerClaim(btn.type)} style={{
                    padding: "16px 12px", borderRadius: 14,
                    background: cooldown > 0 ? "rgba(255,255,255,0.03)" : `${btn.color}1a`,
                    border: `1px solid ${cooldown > 0 ? "rgba(255,255,255,0.06)" : btn.color + "44"}`,
                    color: cooldown > 0 ? "#444" : "#fff", cursor: cooldown > 0 ? "not-allowed" : "pointer",
                    textAlign: "center", transition: "all 0.2s"
                  }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{btn.icon}</div>
                    <div style={{ fontSize: 12, fontWeight: 700 }}>{btn.label}</div>
                    <div style={{ fontSize: 11, color: cooldown > 0 ? "#333" : btn.color, marginTop: 4, fontFamily: "monospace" }}>
                      {cooldown > 0 ? `Cooldown ${cooldown}s` : btn.amount + " payout"}
                    </div>
                  </button>
                ))}
              </div>
              {cooldown > 0 && (
                <div style={{ marginTop: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: "#555" }}>Cooldown Timer</span>
                    <span style={{ fontSize: 11, color: "#ffa502", fontFamily: "monospace" }}>{cooldown}s</span>
                  </div>
                  <ProgressBar pct={(30 - cooldown) / 30 * 100} color="#ffa502" />
                </div>
              )}
            </Card>
          </>
        )}

        {/* ── RISK PANEL TAB ── */}
        {activeTab === "risk" && (
          <>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 4 }}>🌐 Live India Risk Panel</div>
              <div style={{ fontSize: 12, color: "#666" }}>Real-time weather risk across major cities</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {CITIES.map((city) => (
                <CityRiskCard
                  key={city.id} city={city}
                  weather={cityWeather[city.id]}
                  risk={cityWeather[city.id] ? getRiskLevel(cityWeather[city.id]) : null}
                  loading={loadingCities[city.id] || !cityWeather[city.id]}
                />
              ))}
            </div>
          </>
        )}

        {/* ── CLAIMS TAB ── */}
        {activeTab === "claims" && (
          <>
            <Card style={{ background: "linear-gradient(135deg, rgba(46,213,115,0.1), rgba(46,213,115,0.04))", border: "1px solid rgba(46,213,115,0.2)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 11, color: "#2ed573", letterSpacing: "0.1em", fontWeight: 700 }}>WALLET BALANCE</div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: "#fff", fontFamily: "'Space Mono', monospace", marginTop: 6 }}>₹{walletBalance.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>Total earned via GigShield claims</div>
                </div>
                <div style={{ fontSize: 48 }}>💳</div>
              </div>
            </Card>

            <div style={{ fontSize: 12, fontWeight: 700, color: "#666", letterSpacing: "0.08em" }}>CLAIM HISTORY</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[...claims].reverse().map((claim, i) => (
                <Card key={i} style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: 20,
                        background: claim.type === "rain" ? "rgba(124,140,248,0.1)" : "rgba(255,107,107,0.1)"
                      }}>
                        {claim.type === "rain" ? "🌧️" : "🔥"}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#eee" }}>
                          {claim.type === "rain" ? "Heavy Rain Disruption" : "Extreme Heat Disruption"}
                        </div>
                        <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{claim.time}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 15, fontWeight: 800, color: "#2ed573", fontFamily: "monospace" }}>+₹{claim.amount}</div>
                      <Pill color="#2ed573">Approved</Pill>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* ── ADMIN TAB ── */}
        {activeTab === "admin" && <AdminDashboard claims={claims} />}
      </div>

      {/* Claim Modal */}
      {claimModal && (
        <ClaimFlowModal
          disruption={claimModal}
          onClose={() => handleClaimClose(claimModal)}
        />
      )}
    </div>
  );
}