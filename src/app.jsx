import { useState, useEffect, useCallback, useRef } from "react";

// ─── INDIA DATA ───────────────────────────────────────────────────────────────
const INDIA_DATA = {
  "Tamil Nadu": [
    {id:"tn-ariyalur",name:"Ariyalur",lat:11.14,lon:79.08,flood:false,safe:true},
    {id:"tn-chengalpattu",name:"Chengalpattu",lat:12.69,lon:79.98,flood:true,safe:false},
    {id:"tn-chennai",name:"Chennai",lat:13.08,lon:80.27,flood:true,safe:false},
    {id:"tn-coimbatore",name:"Coimbatore",lat:11.02,lon:76.96,flood:false,safe:true},
    {id:"tn-cuddalore",name:"Cuddalore",lat:11.74,lon:79.77,flood:true,safe:false},
    {id:"tn-dharmapuri",name:"Dharmapuri",lat:12.14,lon:78.16,flood:false,safe:true},
    {id:"tn-dindigul",name:"Dindigul",lat:10.36,lon:77.97,flood:false,safe:true},
    {id:"tn-erode",name:"Erode",lat:11.34,lon:77.72,flood:false,safe:true},
    {id:"tn-madurai",name:"Madurai",lat:9.93,lon:78.12,flood:false,safe:false},
    {id:"tn-nagapattinam",name:"Nagapattinam",lat:10.77,lon:79.84,flood:true,safe:false},
    {id:"tn-namakkal",name:"Namakkal",lat:11.22,lon:78.17,flood:false,safe:true},
    {id:"tn-nilgiris",name:"Nilgiris",lat:11.49,lon:76.73,flood:false,safe:true},
    {id:"tn-salem",name:"Salem",lat:11.66,lon:78.15,flood:false,safe:true},
    {id:"tn-thanjavur",name:"Thanjavur",lat:10.79,lon:79.14,flood:true,safe:false},
    {id:"tn-tiruchirappalli",name:"Tiruchirappalli",lat:10.79,lon:78.70,flood:false,safe:false},
    {id:"tn-tirunelveli",name:"Tirunelveli",lat:8.71,lon:77.76,flood:false,safe:false},
    {id:"tn-tiruppur",name:"Tiruppur",lat:11.11,lon:77.34,flood:false,safe:true},
    {id:"tn-tiruvallur",name:"Tiruvallur",lat:13.14,lon:79.91,flood:true,safe:false},
    {id:"tn-vellore",name:"Vellore",lat:12.92,lon:79.13,flood:false,safe:true},
    {id:"tn-kanniyakumari",name:"Kanniyakumari",lat:8.09,lon:77.54,flood:true,safe:false},
  ],
  "Karnataka": [
    {id:"ka-bangalore",name:"Bengaluru Urban",lat:12.97,lon:77.59,flood:false,safe:true},
    {id:"ka-belagavi",name:"Belagavi",lat:15.85,lon:74.50,flood:true,safe:false},
    {id:"ka-mysore",name:"Mysuru",lat:12.30,lon:76.65,flood:false,safe:true},
    {id:"ka-dharwad",name:"Dharwad",lat:15.46,lon:75.01,flood:false,safe:true},
    {id:"ka-dakshina-kannada",name:"Dakshina Kannada",lat:12.84,lon:75.25,flood:true,safe:false},
    {id:"ka-hassan",name:"Hassan",lat:13.00,lon:76.10,flood:false,safe:true},
    {id:"ka-kodagu",name:"Kodagu",lat:12.42,lon:75.74,flood:true,safe:false},
    {id:"ka-shimoga",name:"Shivamogga",lat:13.93,lon:75.56,flood:true,safe:false},
    {id:"ka-tumkur",name:"Tumakuru",lat:13.34,lon:77.10,flood:false,safe:true},
    {id:"ka-udupi",name:"Udupi",lat:13.34,lon:74.74,flood:true,safe:false},
  ],
  "Maharashtra": [
    {id:"mh-mumbai",name:"Mumbai",lat:19.08,lon:72.88,flood:true,safe:false},
    {id:"mh-pune",name:"Pune",lat:18.52,lon:73.86,flood:false,safe:true},
    {id:"mh-nagpur",name:"Nagpur",lat:21.15,lon:79.09,flood:false,safe:true},
    {id:"mh-thane",name:"Thane",lat:19.22,lon:72.98,flood:true,safe:false},
    {id:"mh-nashik",name:"Nashik",lat:19.99,lon:73.79,flood:false,safe:true},
    {id:"mh-kolhapur",name:"Kolhapur",lat:16.70,lon:74.24,flood:true,safe:false},
    {id:"mh-aurangabad",name:"Chhatrapati Sambhajinagar",lat:19.88,lon:75.32,flood:false,safe:true},
    {id:"mh-solapur",name:"Solapur",lat:17.68,lon:75.90,flood:false,safe:true},
  ],
  "Delhi": [
    {id:"dl-new-delhi",name:"New Delhi",lat:28.61,lon:77.21,flood:false,safe:true},
    {id:"dl-north",name:"North Delhi",lat:28.73,lon:77.21,flood:false,safe:true},
    {id:"dl-south",name:"South Delhi",lat:28.53,lon:77.22,flood:false,safe:true},
    {id:"dl-east",name:"East Delhi",lat:28.67,lon:77.30,flood:true,safe:false},
    {id:"dl-west",name:"West Delhi",lat:28.65,lon:77.10,flood:false,safe:true},
    {id:"dl-central",name:"Central Delhi",lat:28.65,lon:77.23,flood:false,safe:false},
  ],
  "Telangana": [
    {id:"tg-hyderabad",name:"Hyderabad",lat:17.39,lon:78.49,flood:false,safe:true},
    {id:"tg-warangal",name:"Warangal Urban",lat:17.99,lon:79.59,flood:false,safe:true},
    {id:"tg-karimnagar",name:"Karimnagar",lat:18.44,lon:79.13,flood:false,safe:true},
    {id:"tg-nizamabad",name:"Nizamabad",lat:18.67,lon:78.10,flood:false,safe:true},
    {id:"tg-khammam",name:"Khammam",lat:17.25,lon:80.15,flood:true,safe:false},
    {id:"tg-nalgonda",name:"Nalgonda",lat:17.05,lon:79.27,flood:false,safe:true},
    {id:"tg-medak",name:"Medak",lat:18.05,lon:78.27,flood:false,safe:true},
  ],
  "Kerala": [
    {id:"kl-thiruvananthapuram",name:"Thiruvananthapuram",lat:8.52,lon:76.94,flood:false,safe:true},
    {id:"kl-ernakulam",name:"Ernakulam",lat:10.02,lon:76.31,flood:true,safe:false},
    {id:"kl-kozhikode",name:"Kozhikode",lat:11.25,lon:75.78,flood:false,safe:true},
    {id:"kl-thrissur",name:"Thrissur",lat:10.53,lon:76.22,flood:true,safe:false},
    {id:"kl-alappuzha",name:"Alappuzha",lat:9.49,lon:76.33,flood:true,safe:false},
    {id:"kl-wayanad",name:"Wayanad",lat:11.61,lon:76.08,flood:true,safe:false},
  ],
};

const STATE_LIST = Object.keys(INDIA_DATA).sort();

// ── 🔥 ORIGINAL FEATURE 1: STREAK SCORING SYSTEM ─────────────────────────────
function calcStreakBonus(streak, claimsThisMonth) {
  let discount = 0;
  let tier = "New Worker";
  let color = "#888";
  let badge = "🆕";
  if (streak >= 90) { discount = 30; tier = "Champion"; color = "#ffd700"; badge = "👑"; }
  else if (streak >= 60) { discount = 25; tier = "Elite";    color = "#7c8cf8"; badge = "⭐"; }
  else if (streak >= 30) { discount = 15; tier = "Trusted";  color = "#2ed573"; badge = "✅"; }
  else if (streak >= 14) { discount = 10; tier = "Rising";   color = "#ffa502"; badge = "📈"; }
  else                   { discount = 0;  tier = "New";      color = "#888";    badge = "🆕"; }
  if (claimsThisMonth > 3) { discount = Math.max(0, discount - 10); }
  return { discount, tier, color, badge };
}

// ── 🔥 ORIGINAL FEATURE 2: TOMORROW'S FORECAST ───────────────────────────────
function getTomorrowForecast(weather) {
  if (!weather) return null;
  // Simulate slight variation for tomorrow
  const variation = 0.08;
  const tRain  = Math.min(1, weather.rain  + (Math.random() * variation * 2 - variation));
  const tHeat  = Math.min(1, weather.heat  + (Math.random() * variation * 2 - variation));
  const tStorm = Math.min(1, weather.storm + (Math.random() * variation * 2 - variation));
  const score  = Math.round((tRain*0.4 + tHeat*0.35 + tStorm*0.25) * 100);
  let advice = "", icon = "", color = "#2ed573", workAdvice = "";
  if (tRain > 0.70) {
    advice = `${Math.round(tRain*100)}% rain probability tomorrow. High disruption expected.`;
    icon = "🌧️"; color = "#ff4757";
    workAdvice = "Consider resting. If you work, rain claim pre-approved.";
  } else if (tHeat > 0.78) {
    advice = `Extreme heat forecast at ${Math.round(weather.temp+2)}°C tomorrow.`;
    icon = "🔥"; color = "#ff6b6b";
    workAdvice = "Work early morning only. Heat claim pre-approved after 12PM.";
  } else if (tStorm > 0.65) {
    advice = `Storm warning for tomorrow. Wind speeds may exceed ${weather.wind+5} km/h.`;
    icon = "⛈️"; color = "#ffa502";
    workAdvice = "Monitor updates. Storm claim ready if conditions worsen.";
  } else {
    advice = "Tomorrow looks clear. Good conditions for deliveries.";
    icon = "☀️"; color = "#2ed573";
    workAdvice = "Safe to work. Lower premium applies tomorrow.";
  }
  return { tRain, tHeat, tStorm, score, advice, icon, color, workAdvice };
}

const PLANS = [
  { id:"basic",   name:"Basic",   weeklyBase:20, color:"#2ed573", icon:"🛡️",
    payout:{rain:500,heat:700,storm:600,curfew:400,pollution:350},
    features:["Rain & Flood cover","Heat disruption cover","24hr claim processing","SMS alerts"] },
  { id:"premium", name:"Pro",     weeklyBase:40, color:"#7c8cf8", icon:"⚡",
    payout:{rain:850,heat:1200,storm:1050,curfew:800,pollution:700},
    features:["All Basic features","Storm & Wind cover","Zero-touch instant payout","Streak rewards"] },
  { id:"elite",   name:"Elite",   weeklyBase:70, color:"#ffa502", icon:"👑",
    payout:{rain:1500,heat:2000,storm:1800,curfew:1500,pollution:1200},
    features:["All Pro features","Income guarantee","Accident cover","Priority support"] },
];

const PLATFORMS = ["Swiggy","Zomato","Amazon","Zepto","Blinkit","Dunzo","Porter","BigBasket","Other"];

const TRIGGERS = [
  { type:"rain",      icon:"🌧️", label:"Heavy Rain",   color:"#7c8cf8", desc:"Cannot deliver safely"   },
  { type:"heat",      icon:"🔥", label:"Extreme Heat",  color:"#ff6b6b", desc:"Unsafe outdoor work"     },
  { type:"storm",     icon:"⛈️", label:"Severe Storm",  color:"#ffa502", desc:"High wind & lightning"   },
  { type:"curfew",    icon:"🚫", label:"Curfew",        color:"#a29bfe", desc:"No movement allowed"     },
  { type:"pollution", icon:"🌫️", label:"Pollution",     color:"#74b9ff", desc:"AQI outdoor restriction" },
];

const CLAIM_STEPS = [
  { id:"detect",  label:"Detecting Disruption", icon:"📡", ms:1200 },
  { id:"verify",  label:"Verifying Identity",   icon:"🔐", ms:1000 },
  { id:"fraud",   label:"Fraud Check",          icon:"🛡️", ms:1400 },
  { id:"approve", label:"Approving Claim",      icon:"✅", ms:800  },
  { id:"credit",  label:"Crediting Payout",     icon:"💰", ms:700  },
];

function genWeather(d) {
  const s = d.lat*100+d.lon;
  const r = o => Math.sin((s+o)*127.1)*0.5+0.5;
  const coastal = d.lat<22&&(d.lon<76||d.lon>79.5);
  const hilly   = d.lat>27||(d.lon<77&&d.lat<14);
  const south   = d.lat<12;
  const north   = d.lat>27;
  const rain  = Math.min(1,Math.max(0,(coastal?0.52:hilly?0.42:south?0.45:0.25)+r(1)*0.5-0.15));
  const heat  = Math.min(1,Math.max(0,(south?0.75:north?0.70:hilly?0.18:0.50)+r(2)*0.4-0.12));
  const storm = Math.min(1,Math.max(0,(coastal?0.55:0.22)+r(3)*0.45-0.1));
  const aqi   = Math.round((d.flood?80:north?90:40)+r(7)*60);
  const temp  = Math.round(hilly?14+r(4)*14:south?32+r(4)*10:north?28+r(4)*14:28+r(4)*10);
  const hum   = Math.round(coastal?72+r(5)*22:38+r(5)*35);
  const wind  = Math.round(coastal?16+r(6)*22:7+r(6)*16);
  let cond="Partly Cloudy";
  if(storm>0.68) cond="Thunderstorm";
  else if(rain>0.72) cond="Heavy Rain";
  else if(rain>0.5) cond="Moderate Rain";
  else if(heat>0.8) cond="Extreme Heat";
  else if(heat>0.65) cond="Hot & Sunny";
  else if(hilly) cond="Cool & Misty";
  return {temp,humidity:hum,wind,condition:cond,rain,heat,storm,aqi};
}

function overallRisk(w) {
  if(!w) return {level:"LOADING",score:0,color:"#555",bg:"rgba(80,80,80,0.1)"};
  const score=Math.round((w.rain*0.4+w.heat*0.35+w.storm*0.25)*100);
  if(score>=66) return {level:"HIGH",  score,color:"#ff4757",bg:"rgba(255,71,87,0.12)"};
  if(score>=38) return {level:"MEDIUM",score,color:"#ffa502",bg:"rgba(255,165,2,0.12)"};
  return              {level:"LOW",   score,color:"#2ed573",bg:"rgba(46,213,115,0.12)"};
}
const rainRisk  = v=>v>=0.72?{l:"Severe",c:"#ff4757"}:v>=0.48?{l:"Moderate",c:"#ffa502"}:{l:"Low",c:"#2ed573"};
const heatRisk  = v=>v>=0.78?{l:"Extreme",c:"#ff4757"}:v>=0.5?{l:"High",c:"#ffa502"}:{l:"Bearable",c:"#2ed573"};
const stormRisk = v=>v>=0.65?{l:"Danger",c:"#ff4757"}:v>=0.4?{l:"Watch",c:"#ffa502"}:{l:"Clear",c:"#2ed573"};

function calcPremium(plan, dist, w, streak=0, claimsThisMonth=0) {
  if(!plan||!dist||!w) return null;
  let m=1.0; const reasons=[],savings=[];
  if(dist.flood)       {m+=0.25;reasons.push({label:"Flood-prone area",delta:"+25%",color:"#ff4757"});}
  if(w.rain>0.70)      {m+=0.20;reasons.push({label:`Heavy rain (${Math.round(w.rain*100)}%)`,delta:"+20%",color:"#ff6b6b"});}
  else if(w.rain<0.25) {m-=0.10;savings.push({label:"Low rain forecast",delta:"-10%",color:"#2ed573"});}
  if(w.heat>0.75)      {m+=0.15;reasons.push({label:`Extreme heat (${w.temp}°C)`,delta:"+15%",color:"#ffa502"});}
  if(w.storm>0.65)     {m+=0.20;reasons.push({label:"High storm risk",delta:"+20%",color:"#ff4757"});}
  if(w.aqi>100)        {m+=0.10;reasons.push({label:`Poor AQI (${w.aqi})`,delta:"+10%",color:"#a29bfe"});}
  if(dist.safe)        {m-=0.20;savings.push({label:"✅ Safe Zone Discount",delta:"-20%",color:"#2ed573"});}
  // 🔥 STREAK DISCOUNT
  const sb=calcStreakBonus(streak,claimsThisMonth);
  if(sb.discount>0) {
    m-=sb.discount/100;
    savings.push({label:`${sb.badge} ${sb.tier} Worker Loyalty (${streak} days)`,delta:`-${sb.discount}%`,color:sb.color});
  }
  if(claimsThisMonth>3){m+=0.20;reasons.push({label:"High claim frequency",delta:"+20%",color:"#ff4757"});}
  const sc=Math.round((w.rain*0.4+w.heat*0.35+w.storm*0.25)*100);
  m=Math.max(0.5,Math.min(2.0,m));
  return {base:plan.weeklyBase,finalPremium:Math.round(plan.weeklyBase*m),multiplier:m,reasons,savings,score:sc};
}

const css=`
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Space+Mono:wght@700&display=swap');
  html,body,#root{margin:0;padding:0;width:100%;min-height:100vh;background:#080810;}
  *{box-sizing:border-box;}
  input,select{font-family:'DM Sans',sans-serif;}
  input:focus,select:focus{outline:none;border-color:rgba(124,140,248,0.45)!important;}
  @keyframes spin{to{transform:rotate(360deg);}}
  @keyframes slideUp{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
  @keyframes glow{0%,100%{box-shadow:0 0 10px rgba(255,71,87,0.3);}50%{box-shadow:0 0 24px rgba(255,71,87,0.65);}}
  @keyframes ticker{from{transform:translateX(0);}to{transform:translateX(-50%);}}
  @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.35;}}
  @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
  ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:#222236;border-radius:2px;}
  @media(max-width:640px){
    .dash-grid{display:flex!important;flex-direction:column!important;}
    .trig-grid{grid-template-columns:1fr 1fr!important;}
    .plan-grid{grid-template-columns:1fr!important;}
    .dist-grid{grid-template-columns:1fr 1fr!important;}
  }
  @media(min-width:900px){
    .dash-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:start;}
    .trig-grid{grid-template-columns:repeat(5,1fr)!important;}
    .plan-grid{grid-template-columns:repeat(3,1fr)!important;}
    .dist-grid{grid-template-columns:repeat(3,1fr)!important;}
    .admin-grid{grid-template-columns:repeat(4,1fr)!important;}
  }
`;

function Pill({children,color="#2ed573"}) {
  return <span style={{display:"inline-flex",alignItems:"center",padding:"2px 9px",borderRadius:20,background:color+"20",color,fontSize:11,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",border:`1px solid ${color}40`}}>{children}</span>;
}
function Card({children,style={},glow}) {
  return <div style={{background:"linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))",border:"1px solid rgba(255,255,255,0.08)",borderRadius:16,padding:"18px 20px",boxShadow:glow?`0 0 26px ${glow}30,0 4px 20px rgba(0,0,0,0.4)`:"0 4px 18px rgba(0,0,0,0.3)",backdropFilter:"blur(12px)",transition:"all 0.3s",...style}}>{children}</div>;
}
function Bar({pct,color="#7c8cf8",glow,thin}) {
  return <div style={{height:thin?4:6,background:"rgba(255,255,255,0.06)",borderRadius:99,overflow:"hidden"}}><div style={{height:"100%",width:`${Math.min(pct,100)}%`,background:color,borderRadius:99,transition:"width 0.9s cubic-bezier(0.4,0,0.2,1)",boxShadow:glow?`0 0 8px ${color}`:"none"}}/></div>;
}
function FInput({label,value,onChange,type="text",placeholder,required}) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      <label style={{fontSize:12,color:"#666",fontWeight:700,letterSpacing:"0.07em"}}>{label}{required&&<span style={{color:"#ff4757"}}> *</span>}</label>
      <input value={value} onChange={e=>onChange(e.target.value)} type={type} placeholder={placeholder} style={{padding:"12px 14px",borderRadius:11,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"#eee",fontSize:14}}/>
    </div>
  );
}
function FSelect({label,value,onChange,options,required}) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      <label style={{fontSize:12,color:"#666",fontWeight:700,letterSpacing:"0.07em"}}>{label}{required&&<span style={{color:"#ff4757"}}> *</span>}</label>
      <select value={value} onChange={e=>onChange(e.target.value)} style={{padding:"12px 14px",borderRadius:11,background:"rgba(15,15,26,0.95)",border:"1px solid rgba(255,255,255,0.1)",color:value?"#eee":"#555",fontSize:14}}>
        <option value="">Select...</option>
        {options.map(o=><option key={o.value||o} value={o.value||o}>{o.label||o}</option>)}
      </select>
    </div>
  );
}

// ── Register ──
function RegisterScreen({onDone}) {
  const [form,setForm]=useState({name:"",phone:"",email:"",state:"",district:"",platform:"",workArea:"",streak:"45",claimsThisMonth:"1"});
  const [step,setStep]=useState(1);
  const [errs,setErrs]=useState({});
  const set=k=>v=>setForm(p=>({...p,[k]:v,...(k==="state"?{district:""}:{})}));
  const allDistricts=Object.values(INDIA_DATA).flat();
  const districts=form.state?(INDIA_DATA[form.state]||[]):[];
  const distObj=districts.find(d=>d.id===form.district);
  const v1=()=>{const e={};if(!form.name.trim())e.name="Required";if(!/^\d{10}$/.test(form.phone))e.phone="10-digit number";if(!form.email.includes("@"))e.email="Valid email";setErrs(e);return!Object.keys(e).length;};
  const v2=()=>{const e={};if(!form.state)e.state="Select state";if(!form.district)e.district="Select district";if(!form.platform)e.platform="Select platform";if(!form.workArea.trim())e.workArea="Required";setErrs(e);return!Object.keys(e).length;};
  const next=()=>{if(step===1&&v1())setStep(2);else if(step===2&&v2())setStep(3);};
  const streak=parseInt(form.streak)||0;
  const sb=calcStreakBonus(streak,parseInt(form.claimsThisMonth)||0);

  return (
    <div style={{minHeight:"100vh",background:"#080810",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px 16px",fontFamily:"'DM Sans',sans-serif"}}>
      <style>{css}</style>
      <div style={{width:"100%",maxWidth:520,animation:"slideUp 0.4s ease"}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{fontSize:40,marginBottom:8}}>⚡</div>
          <div style={{fontSize:26,fontWeight:900,color:"#fff",letterSpacing:"-0.03em"}}>Zero<span style={{color:"#7c8cf8"}}>Wait</span></div>
          <div style={{fontSize:12,color:"#444",marginTop:3,letterSpacing:"0.12em"}}>INSTANT PARAMETRIC INSURANCE · GIG WORKERS</div>
        </div>

        <div style={{display:"flex",alignItems:"center",marginBottom:24}}>
          {[1,2,3].map((s,i)=>(
            <div key={s} style={{display:"flex",alignItems:"center",flex:1}}>
              <div style={{width:28,height:28,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:step>=s?"#7c8cf8":"rgba(255,255,255,0.06)",color:step>=s?"#fff":"#444",fontSize:12,fontWeight:700,flexShrink:0,transition:"all 0.3s"}}>{step>s?"✓":s}</div>
              {i<2&&<div style={{flex:1,height:2,background:step>s?"#7c8cf8":"rgba(255,255,255,0.06)",margin:"0 4px",transition:"all 0.3s"}}/>}
            </div>
          ))}
        </div>

        <Card>
          {step===1&&(
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div><div style={{fontSize:17,fontWeight:800,color:"#fff"}}>👤 Personal Details</div><div style={{fontSize:13,color:"#555",marginTop:2}}>Your information</div></div>
              <FInput label="FULL NAME" value={form.name} onChange={set("name")} placeholder="e.g. Arjun Ramesh" required/>
              {errs.name&&<div style={{fontSize:12,color:"#ff4757",marginTop:-8}}>{errs.name}</div>}
              <FInput label="PHONE NUMBER" value={form.phone} onChange={set("phone")} type="tel" placeholder="10-digit number" required/>
              {errs.phone&&<div style={{fontSize:12,color:"#ff4757",marginTop:-8}}>{errs.phone}</div>}
              <FInput label="EMAIL" value={form.email} onChange={set("email")} type="email" placeholder="your@email.com" required/>
              {errs.email&&<div style={{fontSize:12,color:"#ff4757",marginTop:-8}}>{errs.email}</div>}
            </div>
          )}

          {step===2&&(
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div><div style={{fontSize:17,fontWeight:800,color:"#fff"}}>📍 Location & Work</div><div style={{fontSize:13,color:"#555",marginTop:2}}>For risk & premium calculation</div></div>
              <FSelect label="SELECT STATE" value={form.state} onChange={v=>setForm(p=>({...p,state:v,district:""}))} options={STATE_LIST.map(s=>({value:s,label:`${s} (${INDIA_DATA[s].length} districts)`}))} required/>
              {errs.state&&<div style={{fontSize:12,color:"#ff4757",marginTop:-8}}>{errs.state}</div>}
              {form.state&&(
                <>
                  <FSelect label="SELECT DISTRICT" value={form.district} onChange={set("district")} options={districts.map(d=>({value:d.id,label:d.name+(d.safe?" ✅":d.flood?" ⚠️":"")}))} required/>
                  {errs.district&&<div style={{fontSize:12,color:"#ff4757",marginTop:-8}}>{errs.district}</div>}
                  {distObj&&<div style={{padding:"10px 12px",borderRadius:10,background:distObj.safe?"rgba(46,213,115,0.07)":"rgba(255,71,87,0.07)",border:`1px solid ${distObj.safe?"rgba(46,213,115,0.2)":"rgba(255,71,87,0.2)"}`}}><div style={{fontSize:12,fontWeight:700,color:distObj.safe?"#2ed573":"#ff4757"}}>{distObj.safe?"✅ Safe Zone — 20% discount!":"⚠️ Flood-prone — higher premium"}</div></div>}
                </>
              )}
              <FSelect label="DELIVERY PLATFORM" value={form.platform} onChange={set("platform")} options={PLATFORMS} required/>
              {errs.platform&&<div style={{fontSize:12,color:"#ff4757",marginTop:-8}}>{errs.platform}</div>}
              <FInput label="WORK AREA / ZONE" value={form.workArea} onChange={set("workArea")} placeholder="e.g. T.Nagar, Koramangala" required/>
              {errs.workArea&&<div style={{fontSize:12,color:"#ff4757",marginTop:-8}}>{errs.workArea}</div>}

              {/* 🔥 STREAK INPUT */}
              <div style={{padding:"14px",borderRadius:12,background:"rgba(124,140,248,0.07)",border:"1px solid rgba(124,140,248,0.2)"}}>
                <div style={{fontSize:12,color:"#7c8cf8",fontWeight:700,marginBottom:10}}>🔥 YOUR DELIVERY STREAK</div>
                <FInput label="CONSECUTIVE DELIVERY DAYS" value={form.streak} onChange={set("streak")} type="number" placeholder="e.g. 45"/>
                <div style={{marginTop:10,display:"flex",alignItems:"center",gap:10}}>
                  <div style={{fontSize:24}}>{sb.badge}</div>
                  <div>
                    <div style={{fontSize:13,fontWeight:700,color:sb.color}}>{sb.tier} Worker</div>
                    <div style={{fontSize:11,color:"#666"}}>{sb.discount>0?`${sb.discount}% loyalty discount earned!`:"Start delivering to earn discounts"}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step===3&&(
            <div style={{display:"flex",flexDirection:"column",gap:14,alignItems:"center",textAlign:"center"}}>
              <div style={{fontSize:48}}>🎉</div>
              <div style={{fontSize:20,fontWeight:800,color:"#fff"}}>You're all set!</div>
              <div style={{fontSize:14,color:"#888",lineHeight:1.6}}>Welcome, <span style={{color:"#7c8cf8",fontWeight:700}}>{form.name}</span>!<br/>Your ZeroWait protection starts now.</div>
              <div style={{width:"100%",padding:"14px",borderRadius:12,background:"rgba(124,140,248,0.08)",border:"1px solid rgba(124,140,248,0.2)"}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,textAlign:"left"}}>
                  {[{l:"Name",v:form.name},{l:"Platform",v:form.platform},{l:"State",v:form.state},{l:"District",v:districts.find(d=>d.id===form.district)?.name},{l:"Work Area",v:form.workArea},{l:"Streak",v:`${form.streak} days · ${sb.badge} ${sb.tier}`}].map(r=>(
                    <div key={r.l}><div style={{fontSize:9,color:"#555",letterSpacing:"0.07em"}}>{r.l.toUpperCase()}</div><div style={{fontSize:12,fontWeight:700,color:"#ddd",marginTop:1}}>{r.v||"—"}</div></div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div style={{display:"flex",gap:10,marginTop:18}}>
            {step>1&&step<3&&<button onClick={()=>setStep(s=>s-1)} style={{flex:1,padding:"12px",borderRadius:12,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",color:"#666",cursor:"pointer",fontSize:13,fontWeight:600}}>← Back</button>}
            <button onClick={step===3?()=>onDone(form):next} style={{flex:1,padding:"12px",borderRadius:12,background:"linear-gradient(135deg,#7c8cf8,#a78bfa)",border:"none",color:"#fff",cursor:"pointer",fontSize:14,fontWeight:700}}>
              {step===3?"Choose My Plan →":"Next →"}
            </button>
          </div>
        </Card>
        <div style={{textAlign:"center",marginTop:14,fontSize:11,color:"#333"}}>Already registered? <span onClick={()=>onDone(null)} style={{color:"#7c8cf8",cursor:"pointer",fontWeight:700}}>Skip →</span></div>
      </div>
    </div>
  );
}

// ── Plan Screen ──
function PlanScreen({user,weather,onSelect}) {
  const [sel,setSel]=useState(null);
  const allDistricts=Object.values(INDIA_DATA).flat();
  const dist=allDistricts.find(d=>d.id===user?.district);
  const w=dist?weather[dist.id]:null;
  const streak=parseInt(user?.streak)||0;
  const claims=parseInt(user?.claimsThisMonth)||0;
  const selPlan=PLANS.find(p=>p.id===sel);
  const calc=selPlan&&dist&&w?calcPremium(selPlan,dist,w,streak,claims):null;
  const sb=calcStreakBonus(streak,claims);

  return (
    <div style={{minHeight:"100vh",background:"#080810",padding:"24px 0 40px",fontFamily:"'DM Sans',sans-serif",width:"100%"}}>
      <style>{css}</style>
      <div style={{maxWidth:900,margin:"0 auto",padding:"0 16px",animation:"slideUp 0.35s ease"}}>
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={{fontSize:13,color:"#7c8cf8",fontWeight:700,letterSpacing:"0.1em"}}>STEP 2 OF 2</div>
          <div style={{fontSize:22,fontWeight:800,color:"#fff",marginTop:6}}>Choose Your Plan</div>
          <div style={{fontSize:12,color:"#555",marginTop:3}}>Weekly billing · {user?.state} · {sb.badge} {sb.tier} Worker</div>
        </div>

        {/* Streak Banner */}
        {sb.discount>0&&(
          <div style={{marginBottom:16,padding:"14px 16px",borderRadius:14,background:`linear-gradient(135deg,${sb.color}15,${sb.color}05)`,border:`1px solid ${sb.color}40`,display:"flex",alignItems:"center",gap:14}}>
            <div style={{fontSize:36}}>{sb.badge}</div>
            <div>
              <div style={{fontSize:14,fontWeight:800,color:sb.color}}>{sb.tier} Worker — {streak} Day Streak!</div>
              <div style={{fontSize:12,color:"#888",marginTop:2}}>Your loyalty earns you a <span style={{color:sb.color,fontWeight:700}}>{sb.discount}% discount</span> on all plans. Keep delivering! 🚀</div>
            </div>
          </div>
        )}

        {calc&&(
          <div style={{marginBottom:16,padding:"14px 16px",borderRadius:14,background:"linear-gradient(135deg,rgba(124,140,248,0.1),rgba(167,139,250,0.05))",border:"1px solid rgba(124,140,248,0.25)"}}>
            <div style={{fontSize:10,color:"#7c8cf8",fontWeight:700,letterSpacing:"0.08em",marginBottom:8}}>⚙️ AI PREMIUM — {selPlan.name} · {dist?.name}, {user?.state}</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div style={{fontSize:12,color:"#888"}}>Base ₹{calc.base}/wk · Multiplier {calc.multiplier.toFixed(2)}x</div>
              <div style={{fontSize:26,fontWeight:800,color:"#fff",fontFamily:"monospace"}}>₹{calc.finalPremium}<span style={{fontSize:13,color:"#666"}}>/wk</span></div>
            </div>
            {calc.reasons.map((r,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:12,color:r.color,marginBottom:2}}><span>▲ {r.label}</span><span style={{fontWeight:700,fontFamily:"monospace"}}>{r.delta}</span></div>)}
            {calc.savings.map((s,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:12,color:s.color,marginBottom:2}}><span>▼ {s.label}</span><span style={{fontWeight:700,fontFamily:"monospace"}}>{s.delta}</span></div>)}
          </div>
        )}

        <div className="plan-grid" style={{display:"grid",gridTemplateColumns:"1fr",gap:12}}>
          {PLANS.map(plan=>{
            const c2=dist&&w?calcPremium(plan,dist,w,streak,claims):null;
            const isSel=sel===plan.id;
            return (
              <div key={plan.id} onClick={()=>setSel(plan.id)} style={{padding:"18px",borderRadius:16,cursor:"pointer",background:isSel?`linear-gradient(135deg,${plan.color}18,${plan.color}08)`:"rgba(255,255,255,0.03)",border:`2px solid ${isSel?plan.color:"rgba(255,255,255,0.07)"}`,transform:isSel?"scale(1.01)":"scale(1)",transition:"all 0.25s",boxShadow:isSel?`0 0 20px ${plan.color}22`:"none"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{fontSize:20}}>{plan.icon}</span>
                      <span style={{fontSize:16,fontWeight:800,color:isSel?plan.color:"#ddd"}}>{plan.name}</span>
                      {plan.id==="premium"&&<span style={{fontSize:9,background:plan.color+"22",color:plan.color,padding:"2px 7px",borderRadius:6,fontWeight:700}}>POPULAR</span>}
                    </div>
                    <div style={{marginTop:6,display:"flex",alignItems:"baseline",gap:6}}>
                      <span style={{fontSize:26,fontWeight:800,color:"#fff",fontFamily:"monospace"}}>₹{c2?c2.finalPremium:plan.weeklyBase}</span>
                      <span style={{fontSize:12,color:"#555"}}>/week</span>
                      {c2&&c2.finalPremium!==plan.weeklyBase&&<span style={{fontSize:11,color:"#888",textDecoration:"line-through"}}>₹{plan.weeklyBase}</span>}
                    </div>
                  </div>
                  <div style={{width:22,height:22,borderRadius:"50%",border:`2px solid ${isSel?plan.color:"rgba(255,255,255,0.15)"}`,display:"flex",alignItems:"center",justifyContent:"center",background:isSel?plan.color:"transparent"}}>
                    {isSel&&<span style={{fontSize:11,color:"#fff"}}>✓</span>}
                  </div>
                </div>
                <div style={{height:1,background:"rgba(255,255,255,0.05)",margin:"12px 0"}}/>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:12}}>
                  {plan.features.map((f,i)=><div key={i} style={{fontSize:11,color:"#777",display:"flex",alignItems:"center",gap:5}}><span style={{color:plan.color}}>✓</span>{f}</div>)}
                </div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {Object.entries(plan.payout).map(([k,v])=>(
                    <span key={k} style={{fontSize:10,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",padding:"3px 8px",borderRadius:8,color:"#888"}}>
                      {k==="rain"?"🌧️":k==="heat"?"🔥":k==="storm"?"⛈️":k==="curfew"?"🚫":"🌫️"} ₹{v}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={()=>sel&&onSelect(sel)} style={{marginTop:20,width:"100%",padding:"14px",borderRadius:14,background:sel?"linear-gradient(135deg,#7c8cf8,#a78bfa)":"rgba(255,255,255,0.05)",border:"none",color:sel?"#fff":"#333",cursor:sel?"pointer":"not-allowed",fontSize:15,fontWeight:800,transition:"all 0.3s"}}>
          {sel?`Activate ${PLANS.find(p=>p.id===sel)?.name} →`:"Select a plan to continue"}
        </button>
      </div>
    </div>
  );
}

// ── Claim Modal ──
function ClaimModal({type,amount,onDone}) {
  const [step,setStep]=useState(0);
  const [done,setDone]=useState(false);
  useEffect(()=>{
    if(step>=CLAIM_STEPS.length){setDone(true);return;}
    const t=setTimeout(()=>setStep(s=>s+1),CLAIM_STEPS[step].ms);
    return()=>clearTimeout(t);
  },[step]);
  const trig=TRIGGERS.find(t=>t.type===type)||TRIGGERS[0];
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,backdropFilter:"blur(10px)",padding:20}}>
      <div style={{background:"linear-gradient(160deg,#0f0f1a,#12121f)",border:"1px solid rgba(124,140,248,0.3)",borderRadius:24,padding:"28px 24px",maxWidth:420,width:"100%",boxShadow:"0 0 60px rgba(124,140,248,0.12)"}}>
        <div style={{textAlign:"center",marginBottom:22}}>
          <div style={{fontSize:32,marginBottom:6}}>{trig.icon}</div>
          <div style={{fontSize:17,fontWeight:700,color:"#f0f0ff"}}>{trig.label} Detected</div>
          <div style={{fontSize:12,color:"#555",marginTop:3}}>⚡ ZeroWait processing — no manual claim needed</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:9}}>
          {CLAIM_STEPS.map((s,i)=>{
            const st=i<step?"done":i===step?"active":"pending";
            return (
              <div key={s.id} style={{display:"flex",alignItems:"center",gap:11,padding:"10px 12px",borderRadius:11,background:st==="active"?"rgba(124,140,248,0.1)":st==="done"?"rgba(46,213,115,0.06)":"rgba(255,255,255,0.02)",border:`1px solid ${st==="active"?"rgba(124,140,248,0.28)":st==="done"?"rgba(46,213,115,0.18)":"rgba(255,255,255,0.04)"}`,transition:"all 0.4s"}}>
                <div style={{fontSize:17,width:26,textAlign:"center"}}>{st==="done"?"✅":st==="active"?"⏳":s.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600,color:st==="pending"?"#444":"#eee"}}>{s.label}</div>
                  {st==="active"&&<div style={{fontSize:11,color:"#7c8cf8",marginTop:2}}>Processing...</div>}
                  {st==="done"&&s.id==="fraud"&&<div style={{fontSize:11,color:"#2ed573",marginTop:2}}>No anomalies ✓</div>}
                </div>
                {st==="active"&&<div style={{width:15,height:15,borderRadius:"50%",border:"2px solid rgba(124,140,248,0.2)",borderTop:"2px solid #7c8cf8",animation:"spin 0.7s linear infinite"}}/>}
              </div>
            );
          })}
        </div>
        {done&&(
          <div style={{marginTop:20,padding:"18px",borderRadius:14,background:"rgba(46,213,115,0.09)",border:"1px solid rgba(46,213,115,0.22)",textAlign:"center"}}>
            <div style={{fontSize:30,marginBottom:5}}>🎉</div>
            <div style={{fontSize:15,fontWeight:700,color:"#2ed573"}}>Claim Approved!</div>
            <div style={{fontSize:28,fontWeight:800,color:"#fff",margin:"6px 0",fontFamily:"monospace"}}>+₹{amount}</div>
            <div style={{fontSize:12,color:"#555",marginBottom:14}}>Zero wait. Instantly in your wallet.</div>
            <button onClick={onDone} style={{padding:"11px 0",width:"100%",borderRadius:10,background:"#2ed573",color:"#0a0a0f",border:"none",fontWeight:800,fontSize:15,cursor:"pointer"}}>Done ✓</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── 🔥 STREAK CARD COMPONENT ──────────────────────────────────────────────────
function StreakCard({streak,claimsThisMonth,plan,distObj,weather}) {
  const sb=calcStreakBonus(streak,claimsThisMonth);
  const milestones=[{days:14,label:"Rising",badge:"📈"},{days:30,label:"Trusted",badge:"✅"},{days:60,label:"Elite",badge:"⭐"},{days:90,label:"Champion",badge:"👑"}];
  const nextMilestone=milestones.find(m=>m.days>streak);
  const calc=plan&&distObj&&weather[distObj?.id]?calcPremium(plan,distObj,weather[distObj.id],streak,claimsThisMonth):null;

  return (
    <Card glow={sb.color} style={{background:`linear-gradient(135deg,${sb.color}10,${sb.color}04)`}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
        <div>
          <div style={{fontSize:11,color:"#555",letterSpacing:"0.09em",fontWeight:700}}>🔥 DELIVERY STREAK SCORE</div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginTop:8}}>
            <div style={{fontSize:36}}>{sb.badge}</div>
            <div>
              <div style={{fontSize:22,fontWeight:800,color:sb.color,fontFamily:"monospace"}}>{streak} Days</div>
              <div style={{fontSize:13,fontWeight:700,color:sb.color}}>{sb.tier} Worker</div>
            </div>
          </div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:11,color:"#555"}}>Loyalty Discount</div>
          <div style={{fontSize:28,fontWeight:800,color:sb.discount>0?sb.color:"#555",fontFamily:"monospace"}}>{sb.discount}%</div>
          {calc&&<div style={{fontSize:12,color:"#2ed573",fontFamily:"monospace",marginTop:2}}>₹{calc.finalPremium}/wk</div>}
        </div>
      </div>

      {/* Progress to next milestone */}
      {nextMilestone&&(
        <div style={{marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <span style={{fontSize:11,color:"#666"}}>Progress to {nextMilestone.badge} {nextMilestone.label}</span>
            <span style={{fontSize:11,color:sb.color,fontFamily:"monospace"}}>{streak}/{nextMilestone.days} days</span>
          </div>
          <Bar pct={(streak/nextMilestone.days)*100} color={sb.color} glow={streak/nextMilestone.days>0.8}/>
          <div style={{fontSize:11,color:"#555",marginTop:4}}>{nextMilestone.days-streak} more days to unlock {nextMilestone.badge} status</div>
        </div>
      )}
      {!nextMilestone&&<div style={{padding:"10px",borderRadius:10,background:"rgba(255,215,0,0.08)",border:"1px solid rgba(255,215,0,0.2)",marginBottom:14,textAlign:"center"}}><div style={{fontSize:13,fontWeight:700,color:"#ffd700"}}>👑 Maximum tier reached! You're a Champion!</div></div>}

      {/* Milestone badges */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
        {milestones.map(m=>{
          const unlocked=streak>=m.days;
          return (
            <div key={m.days} style={{textAlign:"center",padding:"10px 6px",borderRadius:10,background:unlocked?"rgba(124,140,248,0.1)":"rgba(255,255,255,0.02)",border:`1px solid ${unlocked?"rgba(124,140,248,0.3)":"rgba(255,255,255,0.05)"}`}}>
              <div style={{fontSize:18,filter:unlocked?"none":"grayscale(1) opacity(0.3)"}}>{m.badge}</div>
              <div style={{fontSize:9,color:unlocked?"#ddd":"#444",marginTop:3,fontWeight:700}}>{m.label}</div>
              <div style={{fontSize:9,color:unlocked?"#7c8cf8":"#333",fontFamily:"monospace"}}>{m.days}d</div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

// ── 🔥 TOMORROW FORECAST CARD ──────────────────────────────────────────────────
function TomorrowCard({weather,distObj,plan,streak,claimsThisMonth}) {
  const w=distObj?weather[distObj.id]:null;
  const forecast=w?getTomorrowForecast(w):null;
  if(!distObj||!forecast) return (
    <Card>
      <div style={{fontSize:11,color:"#555",letterSpacing:"0.09em",fontWeight:700,marginBottom:10}}>📅 TOMORROW'S FORECAST</div>
      <div style={{textAlign:"center",padding:"20px 0",color:"#444",fontSize:13}}>Set your district to see tomorrow's risk forecast</div>
    </Card>
  );
  const tomorrowCalc=plan?calcPremium(plan,distObj,{...w,rain:forecast.tRain,heat:forecast.tHeat,storm:forecast.tStorm,aqi:w.aqi},streak,claimsThisMonth):null;

  return (
    <Card glow={forecast.color} style={{border:`1px solid ${forecast.color}33`}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
        <div>
          <div style={{fontSize:11,color:"#555",letterSpacing:"0.09em",fontWeight:700}}>📅 TOMORROW'S FORECAST</div>
          <div style={{fontSize:30,marginTop:6}}>{forecast.icon}</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{padding:"8px 12px",borderRadius:10,background:forecast.color+"18",border:`1px solid ${forecast.color}44`}}>
            <div style={{fontSize:14,fontWeight:800,color:forecast.color}}>{forecast.score >= 66?"HIGH RISK":forecast.score>=38?"MEDIUM RISK":"LOW RISK"}</div>
            <div style={{fontSize:10,color:forecast.color+"88"}}>{forecast.score}/100</div>
          </div>
        </div>
      </div>

      <div style={{fontSize:14,color:"#ccc",lineHeight:1.6,marginBottom:14}}>{forecast.advice}</div>

      <div style={{padding:"12px 14px",borderRadius:12,background:"rgba(124,140,248,0.07)",border:"1px solid rgba(124,140,248,0.18)",marginBottom:14}}>
        <div style={{fontSize:11,color:"#7c8cf8",fontWeight:700,marginBottom:5}}>💡 AI WORK ADVICE</div>
        <div style={{fontSize:13,color:"#bbb",lineHeight:1.5}}>{forecast.workAdvice}</div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
        {[{l:"🌧️ Rain",v:forecast.tRain,fn:rainRisk},{l:"🔥 Heat",v:forecast.tHeat,fn:heatRisk},{l:"⛈️ Storm",v:forecast.tStorm,fn:stormRisk}].map(row=>{
          const rk=row.fn(row.v);
          return (
            <div key={row.l} style={{padding:"10px 8px",borderRadius:10,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",textAlign:"center"}}>
              <div style={{fontSize:11,color:"#666",marginBottom:4}}>{row.l}</div>
              <div style={{fontSize:13,fontWeight:700,color:rk.c}}>{Math.round(row.v*100)}%</div>
              <div style={{fontSize:10,color:rk.c}}>{rk.l}</div>
            </div>
          );
        })}
      </div>

      {tomorrowCalc&&(
        <div style={{padding:"10px 12px",borderRadius:10,background:"rgba(46,213,115,0.07)",border:"1px solid rgba(46,213,115,0.2)"}}>
          <div style={{fontSize:11,color:"#2ed573",fontWeight:700}}>💰 Tomorrow's Premium: <span style={{fontFamily:"monospace"}}>₹{tomorrowCalc.finalPremium}/week</span></div>
          <div style={{fontSize:11,color:"#555",marginTop:2}}>Pre-calculated based on tomorrow's forecast</div>
        </div>
      )}
    </Card>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function ZeroWait() {
  const [screen,setScreen]=useState("register");
  const [user,setUser]=useState(null);
  const [activePlan,setActivePlan]=useState(null);
  const [tab,setTab]=useState("dashboard");
  const [weather,setWeather]=useState({});
  const [gpsState,setGpsState]=useState("idle");
  const [userDist,setUserDist]=useState(null);
  const [selectedState,setSelectedState]=useState("");
  const [search,setSearch]=useState("");
  const [claims,setClaims]=useState([
    {type:"rain",amount:850,district:"Chennai",state:"Tamil Nadu",time:"Today 08:14"},
    {type:"heat",amount:1200,district:"Madurai",state:"Tamil Nadu",time:"Yesterday 13:30"},
  ]);
  const [wallet,setWallet]=useState(5840);
  const [modal,setModal]=useState(null);
  const [cooldown,setCooldown]=useState(0);
  const [fraudAlert,setFraudAlert]=useState(false);
  const cdRef=useRef(null);
  const allDistricts=Object.values(INDIA_DATA).flat();

  useEffect(()=>{
    const w={};
    allDistricts.forEach(d=>{w[d.id]=genWeather(d);});
    setWeather(w);
  },[]);

  const handleRegister=formData=>{
    if(!formData){setScreen("app");return;}
    setUser(formData);
    const d=allDistricts.find(d=>d.id===formData.district);
    if(d){setUserDist(d);setSelectedState(formData.state);}
    setScreen("plan");
  };

  const handlePlan=planId=>{
    setActivePlan(PLANS.find(p=>p.id===planId));
    setScreen("app");
  };

  const detectGPS=useCallback(()=>{
    setGpsState("detecting");
    if(!navigator.geolocation){setGpsState("error");return;}
    navigator.geolocation.getCurrentPosition(pos=>{
      const{latitude:la,longitude:lo}=pos.coords;
      let best=allDistricts[0],minD=Infinity;
      allDistricts.forEach(d=>{const dist=Math.hypot(d.lat-la,d.lon-lo);if(dist<minD){minD=dist;best=d;}});
      setUserDist(best);
      const st=Object.entries(INDIA_DATA).find(([,ds])=>ds.some(d=>d.id===best.id))?.[0]||"";
      setSelectedState(st);
      setGpsState("found");
    },()=>setGpsState("error"),{timeout:8000});
  },[]);

  const fire=useCallback(type=>{
    if(cooldown>0){setFraudAlert(true);setTimeout(()=>setFraudAlert(false),3500);return;}
    setModal(type);
  },[cooldown]);

  const onDone=useCallback(()=>{
    const plan=activePlan||PLANS[1];
    const amount=plan.payout[modal]||500;
    setClaims(p=>[...p,{type:modal,amount,district:userDist?.name||"Unknown",state:selectedState||"",time:new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}]);
    setWallet(b=>b+amount);
    setModal(null);
    setCooldown(30);
    cdRef.current=setInterval(()=>setCooldown(c=>{if(c<=1){clearInterval(cdRef.current);return 0;}return c-1;}),1000);
  },[modal,activePlan,userDist,selectedState]);

  if(screen==="register") return <RegisterScreen onDone={handleRegister}/>;
  if(screen==="plan") return <PlanScreen user={user} weather={weather} onSelect={handlePlan}/>;

  const plan=activePlan||PLANS[1];
  const uw=userDist?weather[userDist.id]:null;
  const ur=overallRisk(uw);
  const distObj=userDist||(user?.district?allDistricts.find(d=>d.id===user.district):null);
  const streak=parseInt(user?.streak)||45;
  const claimsThisMonth=parseInt(user?.claimsThisMonth)||1;
  const sb=calcStreakBonus(streak,claimsThisMonth);
  const panelState=selectedState||user?.state||STATE_LIST[0];
  const panelDistricts=(INDIA_DATA[panelState]||[]).filter(d=>d.name.toLowerCase().includes(search.toLowerCase()));
  const counts={HIGH:0,MEDIUM:0,LOW:0};
  (INDIA_DATA[panelState]||[]).forEach(d=>{const l=overallRisk(weather[d.id]).level;if(counts[l]!==undefined)counts[l]++;});

  const TABS=[
    {id:"dashboard",label:"Home",   icon:"⚡"},
    {id:"streak",   label:"Streak", icon:"🔥"},
    {id:"forecast", label:"Tomorrow",icon:"📅"},
    {id:"premium",  label:"Premium",icon:"⚙️"},
    {id:"risk",     label:"Risk",   icon:"🗺️"},
    {id:"claims",   label:"Claims", icon:"📋"},
  ];

  return (
    <div style={{minHeight:"100vh",width:"100%",background:"#080810",color:"#f0f0ff",fontFamily:"'DM Sans','Segoe UI',sans-serif"}}>
      <style>{css}</style>

      {/* Header */}
      <div style={{background:"rgba(8,8,16,0.97)",backdropFilter:"blur(20px)",position:"sticky",top:0,zIndex:100,borderBottom:"1px solid rgba(255,255,255,0.06)",width:"100%"}}>
        <div style={{background:"rgba(124,140,248,0.07)",borderBottom:"1px solid rgba(124,140,248,0.08)",overflow:"hidden",height:25}}>
          <div style={{display:"flex",gap:34,animation:"ticker 28s linear infinite",alignItems:"center",height:"100%",width:"max-content"}}>
            {[`⚡ ZeroWait — Zero Wait Insurance`,`${sb.badge} ${user?.name||"Worker"} · ${sb.tier} · ${streak}d streak`,`💰 ${sb.discount}% loyalty discount active`,
              `🗺️ ${STATE_LIST.length} States covered`,"✅ Zero-touch claims enabled","📅 Tomorrow's forecast available",
              `⚡ ZeroWait — Zero Wait Insurance`,`${sb.badge} ${streak}d streak`,`💰 ${sb.discount}% loyalty discount`
            ].map((t,i)=><span key={i} style={{fontSize:10,color:"#7c8cf8",fontWeight:600,whiteSpace:"nowrap",letterSpacing:"0.04em"}}>{t}</span>)}
          </div>
        </div>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:9}}>
              <span style={{fontSize:22}}>⚡</span>
              <span style={{fontSize:22,fontWeight:900,letterSpacing:"-0.03em",color:"#fff"}}>Zero<span style={{color:"#7c8cf8"}}>Wait</span></span>
              <span style={{fontSize:11,color:plan.color,fontWeight:700,background:plan.color+"15",padding:"2px 8px",borderRadius:6}}>{plan.icon} {plan.name}</span>
              <span style={{fontSize:11,color:sb.color,fontWeight:700,background:sb.color+"15",padding:"2px 8px",borderRadius:6}}>{sb.badge} {sb.tier}</span>
            </div>
            <div style={{fontSize:12,color:"#3a3a5a",marginTop:2}}>{user?.name||"WORKER"} · {user?.platform||"PLATFORM"} · {user?.state||"INDIA"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:13,color:"#ddd"}}>Wallet</div>
              <div style={{fontSize:19,fontWeight:900,color:"#fff",fontFamily:"monospace"}}>₹{wallet.toLocaleString()}</div>
            </div>
            <div style={{width:38,height:38,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:`linear-gradient(135deg,${sb.color},#a78bfa)`,fontSize:14,fontWeight:800,color:"#fff"}}>
              {user?.name?.slice(0,2).toUpperCase()||"GW"}
            </div>
          </div>
        </div>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",padding:"0 20px 10px",gap:3}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"7px 2px",borderRadius:9,border:"none",cursor:"pointer",background:tab===t.id?"rgba(124,140,248,0.13)":"transparent",color:tab===t.id?"#7c8cf8":"#3a3a5a",fontSize:11,fontWeight:700,borderBottom:tab===t.id?"2px solid #7c8cf8":"2px solid transparent",transition:"all 0.2s"}}>
              <div style={{fontSize:14,marginBottom:2}}>{t.icon}</div>{t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"16px 20px 100px",animation:"slideUp 0.35s ease"}}>

        {/* DASHBOARD */}
        {tab==="dashboard"&&(
          <div className="dash-grid">
            <div style={{display:"flex",flexDirection:"column",gap:13}}>
              {/* Worker Card */}
              <Card glow={sb.color} style={{background:`linear-gradient(135deg,${sb.color}12,${sb.color}05)`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      <Pill color="#2ed573">● Active</Pill>
                      <Pill color={sb.color}>{sb.badge} {sb.tier}</Pill>
                    </div>
                    <div style={{fontSize:20,fontWeight:800,color:"#fff",marginTop:8}}>{user?.name||"Gig Worker"}</div>
                    <div style={{fontSize:13,color:"#555",marginTop:2}}>{user?.platform||"Platform"} · {user?.workArea||"India"}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:11,color:"#444"}}>Plan · Streak</div>
                    <div style={{fontSize:14,fontWeight:800,color:plan.color}}>{plan.icon} {plan.name}</div>
                    <div style={{fontSize:13,fontWeight:700,color:sb.color,marginTop:2}}>🔥 {streak} day streak</div>
                    <div style={{fontSize:11,color:"#2ed573",marginTop:1}}>-{sb.discount}% loyalty discount</div>
                  </div>
                </div>
                <div style={{height:1,background:"rgba(255,255,255,0.05)",margin:"12px 0"}}/>
                <div style={{display:"flex",justifyContent:"space-around"}}>
                  {[{l:"Claims",v:claims.length,c:"#7c8cf8"},{l:"Earned",v:`₹${claims.reduce((s,c)=>s+c.amount,0).toLocaleString()}`,c:"#2ed573"},{l:"Discount",v:`${sb.discount}%`,c:sb.color}].map(s=>(
                    <div key={s.l} style={{textAlign:"center"}}>
                      <div style={{fontSize:17,fontWeight:800,color:s.c,fontFamily:"monospace"}}>{s.v}</div>
                      <div style={{fontSize:11,color:"#555",marginTop:1}}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* GPS */}
              <Card glow={gpsState==="found"?"#2ed573":"#7c8cf8"}>
                <div style={{fontSize:11,color:"#444",letterSpacing:"0.09em",fontWeight:700,marginBottom:12}}>📍 YOUR DISTRICT RISK</div>
                {gpsState==="idle"&&(
                  <div style={{textAlign:"center",padding:"8px 0"}}>
                    <div style={{fontSize:32,marginBottom:10}}>🗺️</div>
                    <div style={{fontSize:14,color:"#777",marginBottom:14}}>Detect your district for live risk analysis</div>
                    <button onClick={detectGPS} style={{padding:"11px 20px",borderRadius:12,background:"rgba(124,140,248,0.13)",border:"1px solid rgba(124,140,248,0.28)",color:"#7c8cf8",fontWeight:700,fontSize:14,cursor:"pointer",width:"100%"}}>🛰️ Use My GPS Location</button>
                    {user?.district&&<button onClick={()=>{const d=allDistricts.find(d=>d.id===user.district);if(d){setUserDist(d);setGpsState("found");}}} style={{marginTop:10,padding:"10px 20px",borderRadius:12,background:"rgba(46,213,115,0.08)",border:"1px solid rgba(46,213,115,0.2)",color:"#2ed573",fontWeight:700,fontSize:13,cursor:"pointer",width:"100%"}}>
                      Use Registered: {allDistricts.find(d=>d.id===user.district)?.name}, {user.state}
                    </button>}
                  </div>
                )}
                {gpsState==="detecting"&&<div style={{textAlign:"center",padding:"18px 0"}}><div style={{width:36,height:36,borderRadius:"50%",border:"3px solid rgba(124,140,248,0.2)",borderTop:"3px solid #7c8cf8",animation:"spin 0.8s linear infinite",margin:"0 auto 12px"}}/><div style={{fontSize:14,color:"#666",animation:"pulse 1.4s ease infinite"}}>Detecting...</div></div>}
                {gpsState==="error"&&(
                  <div style={{display:"flex",flexDirection:"column",gap:10}}>
                    <div style={{padding:"10px 12px",borderRadius:10,background:"rgba(255,71,87,0.07)",border:"1px solid rgba(255,71,87,0.18)",fontSize:13,color:"#ff4757"}}>📵 GPS unavailable — select manually</div>
                    <select onChange={e=>setSelectedState(e.target.value)} value={selectedState} style={{padding:"11px 13px",borderRadius:11,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",color:"#aaa",fontSize:14}}>
                      <option value="">Select State...</option>
                      {STATE_LIST.map(s=><option key={s} value={s}>{s}</option>)}
                    </select>
                    {selectedState&&<select onChange={e=>{const d=allDistricts.find(d=>d.id===e.target.value);if(d){setUserDist(d);setGpsState("found");}}} style={{padding:"11px 13px",borderRadius:11,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",color:"#aaa",fontSize:14}}>
                      <option value="">Select District...</option>
                      {(INDIA_DATA[selectedState]||[]).map(d=><option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>}
                  </div>
                )}
                {gpsState==="found"&&userDist&&uw&&(
                  <>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                      <div><div style={{fontSize:19,fontWeight:800,color:"#fff"}}>📍 {userDist.name}</div><div style={{fontSize:12,color:"#555"}}>{selectedState} · {uw.condition} · {uw.temp}°C</div></div>
                      <div style={{padding:"9px 12px",borderRadius:11,background:ur.bg,border:`1px solid ${ur.color}44`}}><div style={{fontSize:14,fontWeight:800,color:ur.color}}>{ur.level}</div><div style={{fontSize:10,color:ur.color+"88",textAlign:"center"}}>{ur.score}/100</div></div>
                    </div>
                    {[{l:"🌧️ Rain",v:uw.rain,fn:rainRisk},{l:"🔥 Heat",v:uw.heat,fn:heatRisk},{l:"⛈️ Storm",v:uw.storm,fn:stormRisk}].map(row=>{
                      const rk=row.fn(row.v);
                      return <div key={row.l} style={{marginBottom:9}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:12,color:"#777"}}>{row.l}</span><span style={{fontSize:12,fontWeight:700,color:rk.c}}>{rk.l}</span></div><Bar pct={row.v*100} color={rk.c} glow={row.v>0.65}/></div>;
                    })}
                    {userDist.safe&&<div style={{padding:"9px 12px",borderRadius:10,background:"rgba(46,213,115,0.08)",border:"1px solid rgba(46,213,115,0.2)",marginTop:4}}><div style={{fontSize:13,fontWeight:700,color:"#2ed573"}}>✅ Safe Zone — 20% discount applied!</div></div>}
                    <button onClick={()=>{setGpsState("idle");setUserDist(null);}} style={{marginTop:11,width:"100%",padding:"9px",borderRadius:10,background:"transparent",border:"1px solid rgba(255,255,255,0.06)",color:"#3a3a5a",cursor:"pointer",fontSize:12}}>Change District</button>
                  </>
                )}
              </Card>

              {fraudAlert&&<div style={{padding:"13px 15px",borderRadius:13,background:"rgba(255,71,87,0.09)",border:"1px solid rgba(255,71,87,0.28)",animation:"glow 1s ease infinite",display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:20}}>🚨</span><div><div style={{fontSize:14,fontWeight:700,color:"#ff4757"}}>Suspicious Activity</div><div style={{fontSize:12,color:"#ff475788"}}>Wait {cooldown}s before next claim.</div></div></div>}

              <Card style={{background:"linear-gradient(135deg,rgba(124,140,248,0.1),rgba(167,139,250,0.05))",border:"1px solid rgba(124,140,248,0.2)"}}>
                <div style={{fontSize:11,color:"#7c8cf8",letterSpacing:"0.09em",fontWeight:700,marginBottom:10}}>🤖 AI ADVISOR</div>
                <div style={{fontSize:13,color:"#bbb",lineHeight:1.7}}>
                  {distObj?.safe?`✅ Safe Zone in ${distObj.name}. With your ${streak}-day streak, you're saving ${sb.discount}% on premiums. Keep going!`
                    :distObj?.flood?`⚠️ ${distObj.name} is flood-prone. Your ${sb.tier} status saves ${sb.discount}% despite the risk. Plan covers ₹${plan.payout.rain} rain events.`
                    :`📍 Set your district for personalized advice. Your ${streak}-day streak already earns you ${sb.discount}% loyalty discount!`}
                </div>
              </Card>
            </div>

            {/* Right */}
            <div style={{display:"flex",flexDirection:"column",gap:13}}>
              <Card>
                <div style={{fontSize:11,color:"#3a3a5a",letterSpacing:"0.09em",fontWeight:700,marginBottom:13}}>⚡ ZERO-TOUCH TRIGGERS</div>
                <div className="trig-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
                  {TRIGGERS.map(trig=>(
                    <button key={trig.type} onClick={()=>fire(trig.type)} style={{padding:"13px 10px",borderRadius:13,background:cooldown>0?"rgba(255,255,255,0.02)":`${trig.color}18`,border:`1px solid ${cooldown>0?"rgba(255,255,255,0.04)":trig.color+"40"}`,color:cooldown>0?"#2a2a3f":"#fff",cursor:cooldown>0?"not-allowed":"pointer",textAlign:"center",transition:"all 0.2s"}}>
                      <div style={{fontSize:22,marginBottom:5}}>{trig.icon}</div>
                      <div style={{fontSize:12,fontWeight:700}}>{trig.label}</div>
                      <div style={{fontSize:10,color:cooldown>0?"#2a2a3f":trig.color,marginTop:3}}>{trig.desc}</div>
                      <div style={{fontSize:11,color:cooldown>0?"#222":trig.color,marginTop:3,fontFamily:"monospace",fontWeight:700}}>{cooldown>0?`${cooldown}s`:`₹${plan.payout[trig.type]}`}</div>
                    </button>
                  ))}
                </div>
                {cooldown>0&&<div style={{marginTop:11}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontSize:11,color:"#3a3a5a"}}>Cooldown</span><span style={{fontSize:11,color:"#ffa502",fontFamily:"monospace"}}>{cooldown}s</span></div><Bar pct={(30-cooldown)/30*100} color="#ffa502"/></div>}
              </Card>

              {/* Mini Streak Preview */}
              <Card glow={sb.color} style={{background:`linear-gradient(135deg,${sb.color}10,${sb.color}04)`}}>
                <div style={{fontSize:11,color:"#555",letterSpacing:"0.09em",fontWeight:700,marginBottom:10}}>🔥 STREAK SNAPSHOT</div>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
                  <div style={{fontSize:36}}>{sb.badge}</div>
                  <div>
                    <div style={{fontSize:18,fontWeight:800,color:sb.color,fontFamily:"monospace"}}>{streak} Days</div>
                    <div style={{fontSize:12,color:sb.color}}>{sb.tier} · -{sb.discount}% premium</div>
                  </div>
                </div>
                <Bar pct={streak<90?(streak/90)*100:100} color={sb.color} glow/>
                <button onClick={()=>setTab("streak")} style={{marginTop:12,width:"100%",padding:"9px",borderRadius:10,background:sb.color+"15",border:`1px solid ${sb.color}33`,color:sb.color,cursor:"pointer",fontSize:12,fontWeight:700}}>View Full Streak Dashboard →</button>
              </Card>

              {/* Mini Forecast Preview */}
              {distObj&&weather[distObj.id]&&(()=>{
                const forecast=getTomorrowForecast(weather[distObj.id]);
                return forecast?(
                  <Card glow={forecast.color} style={{border:`1px solid ${forecast.color}33`}}>
                    <div style={{fontSize:11,color:"#555",letterSpacing:"0.09em",fontWeight:700,marginBottom:10}}>📅 TOMORROW PREVIEW</div>
                    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                      <div style={{fontSize:30}}>{forecast.icon}</div>
                      <div>
                        <div style={{fontSize:14,fontWeight:800,color:forecast.color}}>{forecast.score>=66?"HIGH RISK":forecast.score>=38?"MEDIUM RISK":"SAFE TO WORK"}</div>
                        <div style={{fontSize:12,color:"#888",marginTop:2}}>{forecast.advice.slice(0,55)}...</div>
                      </div>
                    </div>
                    <button onClick={()=>setTab("forecast")} style={{width:"100%",padding:"9px",borderRadius:10,background:forecast.color+"15",border:`1px solid ${forecast.color}33`,color:forecast.color,cursor:"pointer",fontSize:12,fontWeight:700}}>See Full Forecast →</button>
                  </Card>
                ):null;
              })()}

              <Card>
                <div style={{fontSize:11,color:"#3a3a5a",letterSpacing:"0.09em",fontWeight:700,marginBottom:13}}>📊 PLATFORM STATS</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  {[{label:"Workers",value:"1,284",icon:"👷",color:"#7c8cf8"},{label:"Claims Today",value:"247",icon:"📋",color:"#2ed573"},{label:"Paid Out",value:"₹1.8L",icon:"💸",color:"#ffa502"},{label:"Avg Response",value:"4.2s",icon:"⚡",color:"#ff6b6b"}].map(s=>(
                    <div key={s.label} style={{padding:"11px",borderRadius:11,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)"}}>
                      <div style={{fontSize:18,marginBottom:5}}>{s.icon}</div>
                      <div style={{fontSize:17,fontWeight:800,color:s.color,fontFamily:"monospace"}}>{s.value}</div>
                      <div style={{fontSize:10,color:"#555",marginTop:3}}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* 🔥 STREAK TAB */}
        {tab==="streak"&&(
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div><div style={{fontSize:18,fontWeight:800,color:"#fff"}}>🔥 Delivery Streak Dashboard</div><div style={{fontSize:13,color:"#555",marginTop:2}}>The longer you deliver, the less you pay — only on ZeroWait</div></div>
            <StreakCard streak={streak} claimsThisMonth={claimsThisMonth} plan={plan} distObj={distObj} weather={weather}/>
            <Card>
              <div style={{fontSize:11,color:"#555",letterSpacing:"0.09em",fontWeight:700,marginBottom:14}}>💡 HOW STREAK REWARDS WORK</div>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {[
                  {range:"0–13 days",discount:"0%",label:"New Worker",badge:"🆕",color:"#888"},
                  {range:"14–29 days",discount:"10%",label:"Rising Worker",badge:"📈",color:"#ffa502"},
                  {range:"30–59 days",discount:"15%",label:"Trusted Worker",badge:"✅",color:"#2ed573"},
                  {range:"60–89 days",discount:"25%",label:"Elite Worker",badge:"⭐",color:"#7c8cf8"},
                  {range:"90+ days",discount:"30%",label:"Champion Worker",badge:"👑",color:"#ffd700"},
                ].map(r=>{
                  const isActive=calcStreakBonus(streak,claimsThisMonth).tier===r.label.split(" ")[0];
                  return (
                    <div key={r.range} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",borderRadius:12,background:isActive?r.color+"15":"rgba(255,255,255,0.02)",border:`1px solid ${isActive?r.color+"40":"rgba(255,255,255,0.05)"}`}}>
                      <div style={{display:"flex",alignItems:"center",gap:12}}>
                        <span style={{fontSize:22}}>{r.badge}</span>
                        <div><div style={{fontSize:13,fontWeight:700,color:isActive?r.color:"#888"}}>{r.label}</div><div style={{fontSize:11,color:"#555"}}>{r.range}</div></div>
                      </div>
                      <div style={{textAlign:"right"}}>
                        <div style={{fontSize:16,fontWeight:800,color:isActive?r.color:"#666",fontFamily:"monospace"}}>{r.discount} off</div>
                        {isActive&&<div style={{fontSize:10,color:r.color}}>← Your tier</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        {/* 🔥 TOMORROW FORECAST TAB */}
        {tab==="forecast"&&(
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div><div style={{fontSize:18,fontWeight:800,color:"#fff"}}>📅 Tomorrow's Risk Forecast</div><div style={{fontSize:13,color:"#555",marginTop:2}}>Plan your workday before it starts — only on ZeroWait</div></div>
            <TomorrowCard weather={weather} distObj={distObj} plan={plan} streak={streak} claimsThisMonth={claimsThisMonth}/>
            <Card style={{background:"linear-gradient(135deg,rgba(124,140,248,0.08),rgba(124,140,248,0.02))",border:"1px solid rgba(124,140,248,0.2)"}}>
              <div style={{fontSize:11,color:"#7c8cf8",fontWeight:700,letterSpacing:"0.09em",marginBottom:10}}>💡 WHY TOMORROW'S FORECAST MATTERS</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {["Plan your route before risky weather hits","Pre-approved claims mean instant payout if you work anyway","Your streak is protected even if you choose to rest","Lower-risk days = lower premium automatically applied"].map((t,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:10,fontSize:13,color:"#bbb"}}>
                    <span style={{color:"#7c8cf8",fontSize:16}}>✓</span>{t}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* PREMIUM */}
        {tab==="premium"&&(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16,alignItems:"start"}}>
            <div style={{display:"flex",flexDirection:"column",gap:13}}>
              <div><div style={{fontSize:17,fontWeight:800,color:"#fff"}}>⚙️ Dynamic Premium Engine</div><div style={{fontSize:12,color:"#444",marginTop:2}}>7 factors · streak-adjusted · district-aware</div></div>
              {distObj&&weather[distObj.id]?(()=>{
                const calc=calcPremium(plan,distObj,weather[distObj.id],streak,claimsThisMonth);
                if(!calc) return null;
                return (
                  <Card glow={distObj.safe?"#2ed573":"#ffa502"}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                      <div>
                        <div style={{fontSize:10,color:"#555",letterSpacing:"0.09em",fontWeight:700}}>YOUR WEEKLY PREMIUM</div>
                        <div style={{fontSize:30,fontWeight:800,color:"#fff",fontFamily:"monospace",marginTop:5}}>₹{calc.finalPremium}<span style={{fontSize:13,color:"#555",fontWeight:400}}>/week</span></div>
                        {calc.finalPremium!==calc.base&&<div style={{fontSize:11,color:"#888",textDecoration:"line-through"}}>Base: ₹{calc.base}/week</div>}
                      </div>
                      <Pill color={distObj.safe?"#2ed573":"#ffa502"}>{distObj.safe?"✅ Safe":"⚠️ Risk"}</Pill>
                    </div>
                    {calc.reasons.map((r,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 10px",borderRadius:9,background:"rgba(255,71,87,0.06)",border:"1px solid rgba(255,71,87,0.15)",marginBottom:5}}><span style={{fontSize:12,color:r.color}}>▲ {r.label}</span><span style={{fontSize:12,fontWeight:700,color:r.color,fontFamily:"monospace"}}>{r.delta}</span></div>)}
                    {calc.savings.map((s,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 10px",borderRadius:9,background:"rgba(46,213,115,0.06)",border:"1px solid rgba(46,213,115,0.15)",marginBottom:5}}><span style={{fontSize:12,color:s.color}}>▼ {s.label}</span><span style={{fontSize:12,fontWeight:700,color:s.color,fontFamily:"monospace"}}>{s.delta}</span></div>)}
                  </Card>
                );
              })():<Card><div style={{textAlign:"center",padding:20,color:"#555",fontSize:13}}>Set your district on Home tab first</div></Card>}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:13}}>
              <div style={{fontSize:10,color:"#3a3a5a",fontWeight:700,letterSpacing:"0.08em"}}>ALL PLANS</div>
              {PLANS.map(p=>{
                const c2=distObj&&weather[distObj.id]?calcPremium(p,distObj,weather[distObj.id],streak,claimsThisMonth):null;
                const isA=p.id===plan.id;
                return (
                  <Card key={p.id} glow={isA?p.color:null} style={{border:`1px solid ${isA?p.color+"44":"rgba(255,255,255,0.07)"}`}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:18}}>{p.icon}</span><span style={{fontSize:14,fontWeight:800,color:isA?p.color:"#ddd"}}>{p.name}</span>{isA&&<Pill color={p.color}>Active</Pill>}</div>
                      <div><span style={{fontSize:20,fontWeight:800,color:"#fff",fontFamily:"monospace"}}>₹{c2?c2.finalPremium:p.weeklyBase}</span><span style={{fontSize:11,color:"#555"}}>/wk</span></div>
                    </div>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                      {Object.entries(p.payout).map(([k,v])=><span key={k} style={{fontSize:10,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",padding:"3px 8px",borderRadius:8,color:"#888"}}>{k==="rain"?"🌧️":k==="heat"?"🔥":k==="storm"?"⛈️":k==="curfew"?"🚫":"🌫️"}₹{v}</span>)}
                    </div>
                    {!isA&&<button onClick={()=>setActivePlan(p)} style={{marginTop:10,width:"100%",padding:"9px",borderRadius:10,background:`${p.color}15`,border:`1px solid ${p.color}33`,color:p.color,cursor:"pointer",fontSize:12,fontWeight:700}}>Switch to {p.name}</button>}
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* RISK PANEL */}
        {tab==="risk"&&(
          <div style={{display:"flex",flexDirection:"column",gap:13}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
              <div><div style={{fontSize:17,fontWeight:800,color:"#fff"}}>🗺️ India Risk Panel</div><div style={{fontSize:12,color:"#444",marginTop:2}}>{panelDistricts.length} districts · {panelState}</div></div>
            </div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <span style={{fontSize:12,color:"#666",fontWeight:700,whiteSpace:"nowrap"}}>📍 State:</span>
              <select value={panelState} onChange={e=>setSelectedState(e.target.value)} style={{flex:1,padding:"10px 13px",borderRadius:11,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(124,140,248,0.3)",color:"#7c8cf8",fontSize:14,fontWeight:700}}>
                {STATE_LIST.map(s=><option key={s} value={s}>{s} ({INDIA_DATA[s].length} districts)</option>)}
              </select>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
              {[["HIGH","#ff4757"],["MEDIUM","#ffa502"],["LOW","#2ed573"]].map(([l,c])=>(
                <div key={l} style={{textAlign:"center",padding:"10px 6px",borderRadius:12,background:c+"12",border:`1px solid ${c}30`}}>
                  <div style={{fontSize:20,fontWeight:800,color:c,fontFamily:"monospace"}}>{counts[l]}</div>
                  <div style={{fontSize:9,color:c+"99",fontWeight:700}}>{l} RISK</div>
                </div>
              ))}
            </div>
            <div style={{position:"relative"}}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={`Search in ${panelState}...`} style={{width:"100%",padding:"10px 14px 10px 36px",borderRadius:11,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",color:"#ccc",fontSize:13}}/>
              <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:14}}>🔍</span>
            </div>
            <div className="dist-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {panelDistricts.map(d=>{
                const w=weather[d.id];
                const rk=overallRisk(w);
                const isU=userDist?.id===d.id;
                const c2=w?calcPremium(plan,d,w,streak,claimsThisMonth):null;
                return (
                  <div key={d.id} style={{padding:"12px 14px",borderRadius:13,background:isU?"linear-gradient(135deg,rgba(124,140,248,0.13),rgba(167,139,250,0.06))":"rgba(255,255,255,0.03)",border:`1px solid ${isU?"rgba(124,140,248,0.3)":"rgba(255,255,255,0.06)"}`,transition:"all 0.2s"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                      <div>
                        <div style={{fontSize:13,fontWeight:700,color:isU?"#a78bfa":"#ddd",display:"flex",alignItems:"center",gap:5}}>{isU&&"📍"}{d.name}{d.safe&&<span style={{fontSize:9,color:"#2ed573",background:"rgba(46,213,115,0.12)",padding:"1px 5px",borderRadius:5}}>✅</span>}{d.flood&&<span style={{fontSize:9,color:"#ff4757",background:"rgba(255,71,87,0.12)",padding:"1px 5px",borderRadius:5}}>⚠️</span>}</div>
                        {w&&<div style={{fontSize:10,color:"#444",marginTop:1}}>{w.condition} · {w.temp}°C</div>}
                      </div>
                      <div style={{textAlign:"right"}}>
                        <Pill color={rk.color}>{rk.level}</Pill>
                        {c2&&<div style={{fontSize:10,color:"#555",marginTop:3,fontFamily:"monospace"}}>₹{c2.finalPremium}/wk</div>}
                      </div>
                    </div>
                    {w&&<Bar pct={rk.score} color={rk.color} glow={rk.level==="HIGH"} thin/>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CLAIMS */}
        {tab==="claims"&&(
          <div style={{display:"flex",flexDirection:"column",gap:13}}>
            <Card style={{background:"linear-gradient(135deg,rgba(46,213,115,0.09),rgba(46,213,115,0.02))",border:"1px solid rgba(46,213,115,0.16)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:10,color:"#2ed573",letterSpacing:"0.1em",fontWeight:700}}>WALLET BALANCE</div>
                  <div style={{fontSize:30,fontWeight:800,color:"#fff",fontFamily:"monospace",marginTop:5}}>₹{wallet.toLocaleString()}</div>
                  <div style={{fontSize:11,color:"#444",marginTop:3}}>{claims.length} claims · All zero-wait approved</div>
                </div>
                <div style={{fontSize:42}}>💳</div>
              </div>
            </Card>
            <div style={{fontSize:10,fontWeight:700,color:"#3a3a5a",letterSpacing:"0.08em"}}>CLAIM HISTORY</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:10}}>
              {[...claims].reverse().map((c,i)=>{
                const trig=TRIGGERS.find(t=>t.type===c.type)||TRIGGERS[0];
                return (
                  <Card key={i} style={{padding:"12px 14px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <div style={{width:36,height:36,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,background:trig.color+"18",border:`1px solid ${trig.color}33`}}>{trig.icon}</div>
                        <div><div style={{fontSize:12,fontWeight:700,color:"#ddd"}}>{trig.label}</div><div style={{fontSize:10,color:"#444",marginTop:2}}>📍 {c.district}{c.state?`, ${c.state}`:""} · {c.time}</div></div>
                      </div>
                      <div style={{textAlign:"right"}}>
                        <div style={{fontSize:14,fontWeight:800,color:"#2ed573",fontFamily:"monospace"}}>+₹{c.amount}</div>
                        <Pill color="#2ed573">Zero-Wait ✓</Pill>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {modal&&<ClaimModal type={modal} amount={plan.payout[modal]||500} onDone={onDone}/>}
    </div>
  );
}