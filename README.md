# 🛡 GigShield Mini Pro

**GigShield Mini Pro** is a mobile-first React web application that simulates an **AI-powered parametric insurance platform** designed for gig economy workers such as delivery partners.

The platform demonstrates how real-time disruptions (like rain, heat, roadblocks, or network failures) can automatically trigger **instant claim approval and payouts**, without any manual intervention.

---

# 🚀 Problem Statement

Gig workers face unpredictable disruptions that directly impact their earnings:

* 🌧 Heavy rain
* 🔥 Extreme heat
* 🚧 Roadblocks
* ⚡ Network issues

### ⚠️ Current Challenges:

* Manual claim processes
* Delayed payouts
* No real-time insurance support
* Not suitable for daily/weekly earners

---

# 💡 Solution

GigShield Mini Pro introduces a **parametric, AI-driven insurance system** that:

* Detects disruptions automatically
* Evaluates eligibility instantly
* Approves claims without manual input
* Credits payouts in real-time

👉 No paperwork. No delays. Just instant protection.

---

# ✨ Core Features

## 📊 Dashboard

* User: Dilshand
* Weekly Plan: ₹25/week
* Coverage: ₹500
* Status: Active
* Dynamic Risk Indicator:

  * 🟢 Low
  * 🟠 Medium
  * 🔴 High

---

## 🤖 AI Risk Prediction

* Predicts upcoming disruptions
* Example:

  > “High rain probability (80%) in next 2 hours”
* Smart suggestions:

  > “Pause work due to high risk”

---

## 🌦 Disruption Simulation

Simulate real-world scenarios:

| Event           | Payout |
| --------------- | ------ |
| 🌧 Rain         | ₹300   |
| 🔥 Heatwave     | ₹150   |
| 🚧 Roadblock    | ₹200   |
| ⚡ Network Issue | ₹100   |

---

## ⚡ Automated Claim Flow

1. Disruption detected
2. Eligibility validation
3. Claim approved
4. Payout credited

---

## 💰 Wallet System

* Displays current balance
* Automatically updates after payout

---

## 📈 Earnings Tracker

* Tracks protected income
* Visual progress bar (capped at 100%)

---

## 📜 Claim History

* View all past claims
* Includes:

  * Type
  * Amount
  * Status
  * Timestamp

---

## 🧭 Navigation

* Home (Dashboard)
* Claims (History)

---

# 🎨 UI/UX Design

* Mobile-first layout (optimized for 375px)
* Clean fintech-style interface
* Card-based UI components
* Smooth transitions and feedback

### 🎯 Color System:

* 🟢 Green → Safe / Success
* 🟠 Orange → Warning
* 🔴 Red → Risk / Alert

---

# 🔄 Application Flow

Disruption → Detection → Claim Approval → Payout → History Update

---

# 🧠 System Architecture (High-Level)

## 🔹 Frontend Layer

* React-based mobile UI
* Displays dashboard, alerts, and claim flow

## 🔹 Backend Layer (Conceptual)

* Event processing engine
* Claim validation logic
* Fraud detection system

## 🔹 AI Layer

* Risk prediction model
* Behavioral anomaly detection
* Fraud scoring system

## 🔹 External Data Sources

* Weather APIs
* Traffic data
* Government alerts

## 🔹 Payment Layer

* Instant payout system (simulated)
* Wallet updates

---

# 🔄 End-to-End Flow

1. External data detects disruption
2. AI validates event
3. User activity is analyzed
4. Fraud detection assigns risk score
5. Claim is processed:

   * Approved instantly (high confidence)
   * Flagged (low confidence)
6. Payout credited
7. Claim recorded

---

# 🛡 Adversarial Defense & Anti-Spoofing Strategy

## 🚨 Threat Scenario: Market Crash Attack

A fraud ring attempts to:

* Spoof GPS locations
* Trigger fake disruptions
* Drain system funds via mass payouts

---

## 🎯 Defense Philosophy

**“Trust but Verify”**

* Trust genuine workers
* Verify with multi-layer signals
* Avoid false positives

---

## 🧠 Multi-Layer Fraud Detection

### 📍 Location Validation

* GPS + network location cross-check
* Detect impossible movement patterns

---

### 🚴 Behavioral Analysis

* Analyze user activity patterns
* Detect abnormal behavior

---

### 🌐 Cluster Detection

* Identify group fraud activity
* Detect synchronized claims

---

### ⏱ Time-Based Detection

* Identify sudden claim spikes
* Detect repeated patterns

---

### 📡 External Verification

* Match claims with real-world data
* Reject invalid disruptions

---

## ⚖️ Fairness Model

* Confidence scoring system:

  * High → instant payout
  * Medium → delay
  * Low → review

* Partial payouts for uncertain cases

* Trust score per user

---

## 🚩 Fraud Scoring

| Factor             | Weight |
| ------------------ | ------ |
| GPS anomaly        | High   |
| Behavior deviation | Medium |
| Cluster activity   | High   |
| External mismatch  | High   |

---

## 🔒 Mass Attack Defense

* Rate limiting payouts
* Temporary strict verification
* Manual audit mode

---

# 📊 Outcome

* ✅ Genuine users get instant payouts
* 🚫 Fraud is detected and blocked
* ⚖️ Fair system maintained

---

# 🛠 Tech Stack

* ⚛️ React.js
* 🧭 React Router
* 🎨 CSS
* 🧠 React Hooks

---

# 📦 Installation

```bash
git clone https://github.com/your-username/gigshield-mini-pro.git
cd gigshield-mini-pro
npm install
npm run dev
```

---

# 📁 Project Structure

```
src/
 ├── components/
 ├── pages/
 ├── App.jsx
 ├── main.jsx
 ├── App.css
```

---

# 🎥 Demo

👉 


# 📸 Demo website link 

👉 http://localhost:5173/



# 💡 Future Enhancements

* 🌍 Real-time weather API
* 📍 GPS-based validation
* 🔐 Authentication system
* 🤖 Advanced ML models
* 📊 Admin dashboard
* 💳 UPI payout integration



# 🏆 Hackathon Impact

GigShield Mini Pro demonstrates:

* Real-time insurance automation
* Zero manual claims
* Instant payouts
* Fraud-resistant architecture
* Financial protection for gig workers


# ⭐ Conclusion

GigShield Mini Pro showcases how **AI + parametric insurance + automation** can transform traditional systems into a **fast, scalable, and secure solution** for the gig economy.
