import { useState, useEffect, useCallback, useRef } from "react";

const TN_DISTRICTS = [
  { id:"ariyalur",        name:"Ariyalur",        lat:11.1403,lon:79.0781,flood:false,safe:true  },
  { id:"chengalpattu",   name:"Chengalpattu",     lat:12.6921,lon:79.9764,flood:true, safe:false },
  { id:"chennai",        name:"Chennai",          lat:13.0827,lon:80.2707,flood:true, safe:false },
  { id:"coimbatore",     name:"Coimbatore",       lat:11.0168,lon:76.9558,flood:false,safe:true  },
  { id:"cuddalore",      name:"Cuddalore",        lat:11.7447,lon:79.7689,flood:true, safe:false },
  { id:"dharmapuri",     name:"Dharmapuri",       lat:12.1357,lon:78.1602,flood:false,safe:true  },
  { id:"dindigul",       name:"Dindigul",         lat:10.3624,lon:77.9695,flood:false,safe:true  },
  { id:"erode",          name:"Erode",            lat:11.341, lon:77.7172,flood:false,safe:true  },
  { id:"kallakurichi",   name:"Kallakurichi",     lat:11.7378,lon:78.9625,flood:false,safe:true  },
  { id:"kancheepuram",   name:"Kancheepuram",     lat:12.8185,lon:79.6947,flood:true, safe:false },
  { id:"karur",          name:"Karur",            lat:10.9601,lon:78.0766,flood:false,safe:true  },
  { id:"krishnagiri",    name:"Krishnagiri",      lat:12.5186,lon:78.2137,flood:false,safe:true  },
  { id:"madurai",        name:"Madurai",          lat:9.9252, lon:78.1198,flood:false,safe:false },
  { id:"mayiladuthurai", name:"Mayiladuthurai",   lat:11.1035,lon:79.6519,flood:true, safe:false },
  { id:"nagapattinam",   name:"Nagapattinam",     lat:10.7672,lon:79.8449,flood:true, safe:false },
  { id:"namakkal",       name:"Namakkal",         lat:11.2189,lon:78.1675,flood:false,safe:true  },
  { id:"nilgiris",       name:"Nilgiris",         lat:11.4916,lon:76.7337,flood:false,safe:true  },
  { id:"perambalur",     name:"Perambalur",       lat:11.2335,lon:78.8801,flood:false,safe:true  },
  { id:"pudukkottai",    name:"Pudukkottai",      lat:10.3797,lon:78.8204,flood:false,safe:true  },
  { id:"ramanathapuram", name:"Ramanathapuram",   lat:9.3639, lon:78.8395,flood:true, safe:false },
  { id:"ranipet",        name:"Ranipet",          lat:12.9229,lon:79.3331,flood:false,safe:true  },
  { id:"salem",          name:"Salem",            lat:11.6643,lon:78.146, flood:false,safe:true  },
  { id:"sivaganga",      name:"Sivaganga",        lat:9.8479, lon:78.4801,flood:false,safe:true  },
  { id:"tenkasi",        name:"Tenkasi",          lat:8.9597, lon:77.3154,flood:false,safe:true  },
  { id:"thanjavur",      name:"Thanjavur",        lat:10.7902,lon:79.1378,flood:true, safe:false },
  { id:"theni",          name:"Theni",            lat:10.0104,lon:77.4767,flood:false,safe:true  },
  { id:"thoothukudi",    name:"Thoothukudi",      lat:8.7642, lon:78.1348,flood:true, safe:false },
  { id:"tiruchirappalli",name:"Tiruchirappalli",  lat:10.7905,lon:78.7047,flood:false,safe:false },
  { id:"tirunelveli",    name:"Tirunelveli",      lat:8.7139, lon:77.7567,flood:false,safe:false },
  { id:"tirupathur",     name:"Tirupathur",       lat:12.496, lon:78.5728,flood:false,safe:true  },
  { id:"tiruppur",       name:"Tiruppur",         lat:11.1085,lon:77.3411,flood:false,safe:true  },
  { id:"tiruvallur",     name:"Tiruvallur",       lat:13.1435,lon:79.9083,flood:true, safe:false },
  { id:"tiruvannamalai", name:"Tiruvannamalai",   lat:12.2253,lon:79.0747,flood:false,safe:true  },
  { id:"tiruvarur",      name:"Tiruvarur",        lat:10.7711,lon:79.6367,flood:true, safe:false },
  { id:"vellore",        name:"Vellore",          lat:12.9165,lon:79.1325,flood:false,safe:true  },
  { id:"viluppuram",     name:"Viluppuram",       lat:11.9401,lon:79.4861,flood:false,safe:false },
  { id:"virudhunagar",   name:"Virudhunagar",     lat:9.5851, lon:77.9524,flood:false,safe:true  },
  { id:"kanniyakumari",  name:"Kanniyakumari",    lat:8.0883, lon:77.5385,flood:true, safe:false },
];

const PLANS = [
  { id:"basic",   name:"Basic Shield", weeklyBase:20, color:"#2ed573", icon:"🛡️",
    payout:{rain:500,heat:700,storm:600,curfew:400,pollution:350},
    features:["Rain & Flood cover","Heat disruption cover","₹500 max rain payout","24hr claim processing"] },
  { id:"premium", name:"Pro Shield",   weeklyBase:40, color:"#7c8cf8", icon:"⚡",
    payout:{rain:850,heat:1200,storm:1050,curfew:800,pollution:700},
    features:["All Basic features","Storm & Wind cover","Curfew disruption cover","Zero-touch instant payout"] },
  { id:"elite",   name:"Elite Shield", weeklyBase:70, color:"#ffa502", icon:"👑",
    payout:{rain:1500,heat:2000,storm:1800,curfew:1500,pollution:1200},
    features:["All Pro features","₹2000 max heat payout","Accident cover","Income guarantee"] },
];

const PLATFORMS = ["Swiggy","Zomato","Amazon","Zepto","Blinkit","Dunzo","Porter","BigBasket","Other"];

const TRIGGERS = [
  { type:"rain",      icon:"🌧️", label:"Heavy Rain",   color:"#7c8cf8", desc:"Cannot deliver safely"  },
  { type:"heat",      icon:"🔥", label:"Extreme Heat",  color:"#ff6b6b", desc:"Unsafe outdoor work"    },
  { type:"storm",     icon:"⛈️", label:"Severe Storm",  color:"#ffa502", desc:"High wind & lightning"  },
  { type:"curfew",    icon:"🚫", label:"Curfew",        color:"#a29bfe", desc:"No movement allowed"    },
  { type:"pollution", icon:"🌫️", label:"Pollution",     color:"#74b9ff", desc:"AQI outdoor restriction" },
];

const CLAIM_STEPS = [
  { id:"detect",  label:"Detecting Disruption", icon:"📡", ms:1400 },
  { id:"verify",  label:"Verifying Identity",   icon:"🔐", ms:1200 },
  { id:"fraud",   label:"Fraud Check",          icon:"🛡️", ms:1600 },
  { id:"approve", label:"Approving Claim",      icon:"✅", ms:1000 },
  { id:"credit",  label:"Crediting Payout",     icon:"💰", ms:900  },
];

// ── Weather ──
function genWeather(d) {
  const s = d.lat*100+d.lon;
  const r = o => Math.sin((s+o)*127.1)*0.5+0.5;
  const coastal = ["chennai","nagapattinam","cuddalore","ramanathapuram","thoothukudi","tirunelveli","kanniyakumari","mayiladuthurai","tiruvarur"].includes(d.id);
  const hilly   = ["nilgiris","theni","coimbatore","dindigul"].includes(d.id);
  const south   = d.lat < 10;
  const delta   = ["thanjavur","tiruvarur","nagapattinam","mayiladuthurai"].includes(d.id);
  const rain  = Math.min(1,Math.max(0,(coastal?0.52:hilly?0.42:delta?0.48:0.22)+r(1)*0.5-0.15));
  const heat  = Math.min(1,Math.max(0,(south?0.78:hilly?0.18:0.52)+r(2)*0.4-0.12));
  const storm = Math.min(1,Math.max(0,(coastal?0.58:delta?0.45:0.22)+r(3)*0.45-0.1));
  const aqi   = Math.round((d.flood?80:40)+r(7)*60);
  const temp  = Math.round(hilly?16+r(4)*12:south?33+r(4)*9:28+r(4)*10);
  const hum   = Math.round(coastal||delta?72+r(5)*22:38+r(5)*35);
  const wind  = Math.round(coastal?16+r(6)*22:7+r(6)*16);
  let cond="Partly Cloudy";
  if(storm>0.68) cond="Thunderstorm";
  else if(rain>0.72) cond="Heavy Rain";
  else if(rain>0.5)  cond="Moderate Rain";
  else if(heat>0.8)  cond="Extreme Heat";
  else if(heat>0.62) cond="Hot & Sunny";
  else if(hilly)     cond="Cool & Misty";
  else if(delta)     cond="Humid & Overcast";
  return { temp, humidity:hum, wind, condition:cond, rain, heat, storm, aqi };
}

// ── Risk ──
function overallRisk(w) {
  if(!w) return {level:"LOADING",score:0,color:"#555",bg:"rgba(80,80,80,0.1)"};
  const score = Math.round((w.rain*0.4+w.heat*0.35+w.storm*0.25)*100);
  if(score>=66) return {level:"HIGH",  score,color:"#ff4757",bg:"rgba(255,71,87,0.12)"};
  if(score>=38) return {level:"MEDIUM",score,color:"#ffa502",bg:"rgba(255,165,2,0.12)"};
  return              {level:"LOW",   score,color:"#2ed573",bg:"rgba(46,213,115,0.12)"};
}
const rainRisk  = v => v>=0.72?{l:"Severe",  c:"#ff4757"}:v>=0.48?{l:"Moderate",c:"#ffa502"}:{l:"Low",     c:"#2ed573"};
const heatRisk  = v => v>=0.78?{l:"Extreme", c:"#ff4757"}:v>=0.5 ?{l:"High",    c:"#ffa502"}:{l:"Bearable",c:"#2ed573"};
const stormRisk = v => v>=0.65?{l:"Danger",  c:"#ff4757"}:v>=0.4 ?{l:"Watch",   c:"#ffa502"}:{l:"Clear",   c:"#2ed573"};

// ── Premium Engine ──
function calcPremium(plan, dist, w) {
  if(!plan||!dist||!w) return null;
  let m=1.0; const reasons=[],savings=[];
  if(dist.flood)      { m+=0.25; reasons.push({label:"Flood-prone area",      delta:"+25%",color:"#ff4757"}); }
  if(w.rain>0.70)     { m+=0.20; reasons.push({label:`Heavy rain (${Math.round(w.rain*100)}%)`,delta:"+20%",color:"#ff6b6b"}); }
  else if(w.rain<0.25){ m-=0.10; savings.push({label:"Low rain forecast",      delta:"-10%",color:"#2ed573"}); }
  if(w.heat>0.75)     { m+=0.15; reasons.push({label:`Extreme heat (${w.temp}°C)`,delta:"+15%",color:"#ffa502"}); }
  if(w.storm>0.65)    { m+=0.20; reasons.push({label:"High storm risk",        delta:"+20%",color:"#ff4757"}); }
  if(w.aqi>100)       { m+=0.10; reasons.push({label:`Poor AQI (${w.aqi})`,   delta:"+10%",color:"#a29bfe"}); }
  if(dist.safe)       { m-=0.20; savings.push({label:"✅ Safe Zone Discount",  delta:"-20%",color:"#2ed573"}); }
  const sc=Math.round((w.rain*0.4+w.heat*0.35+w.storm*0.25)*100);
  if(sc<30)           { m-=0.10; savings.push({label:"Low overall risk",       delta:"-10%",color:"#2ed573"}); }
  m=Math.max(0.7,Math.min(2.0,m));
  return {base:plan.weeklyBase, finalPremium:Math.round(plan.weeklyBase*m), multiplier:m, reasons, savings, score:sc};
}

// ── UI Atoms ──
const css = `
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
  ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:#222236;border-radius:2px;}
  .wrap{max-width:1200px;margin:0 auto;padding:0 20px;}
  @media(max-width:640px){
    .wrap{padding:0 12px;}
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
  return <span style={{display:"inline-flex",alignItems:"center",padding:"2px 9px",borderRadius:20,background:color+"20",color,fontSize:10,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",border:`1px solid ${color}40`}}>{children}</span>;
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
      <label style={{fontSize:11,color:"#666",fontWeight:700,letterSpacing:"0.07em"}}>{label}{required&&<span style={{color:"#ff4757"}}> *</span>}</label>
      <input value={value} onChange={e=>onChange(e.target.value)} type={type} placeholder={placeholder} style={{padding:"11px 14px",borderRadius:11,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"#eee",fontSize:13}}/>
    </div>
  );
}

function FSelect({label,value,onChange,options,required}) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      <label style={{fontSize:11,color:"#666",fontWeight:700,letterSpacing:"0.07em"}}>{label}{required&&<span style={{color:"#ff4757"}}> *</span>}</label>
      <select value={value} onChange={e=>onChange(e.target.value)} style={{padding:"11px 14px",borderRadius:11,background:"rgba(15,15,26,0.95)",border:"1px solid rgba(255,255,255,0.1)",color:value?"#eee":"#555",fontSize:13}}>
        <option value="">Select...</option>
        {options.map(o=><option key={o.value||o} value={o.value||o}>{o.label||o}</option>)}
      </select>
    </div>
  );
}

// ── Register ──
function RegisterScreen({onDone}) {
  const [form,setForm]=useState({name:"",phone:"",email:"",district:"",platform:"",workArea:""});
  const [step,setStep]=useState(1);
  const [errs,setErrs]=useState({});
  const set=k=>v=>setForm(p=>({...p,[k]:v}));

  const v1=()=>{
    const e={};
    if(!form.name.trim()) e.name="Required";
    if(!/^\d{10}$/.test(form.phone)) e.phone="10-digit number";
    if(!form.email.includes("@")) e.email="Valid email required";
    setErrs(e); return !Object.keys(e).length;
  };
  const v2=()=>{
    const e={};
    if(!form.district) e.district="Select district";
    if(!form.platform) e.platform="Select platform";
    if(!form.workArea.trim()) e.workArea="Enter work area";
    setErrs(e); return !Object.keys(e).length;
  };
  const next=()=>{ if(step===1&&v1()) setStep(2); else if(step===2&&v2()) setStep(3); };
  const distObj=TN_DISTRICTS.find(d=>d.id===form.district);

  return (
    <div style={{minHeight:"100vh",background:"#080810",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px 16px",fontFamily:"'DM Sans',sans-serif"}}>
      <style>{css}</style>
      <div style={{width:"100%",maxWidth:520,animation:"slideUp 0.4s ease"}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{fontSize:36,marginBottom:8}}>🛡️</div>
          <div style={{fontSize:22,fontWeight:800,color:"#fff",letterSpacing:"-0.02em"}}>GigShield <span style={{color:"#7c8cf8"}}>AI</span></div>
          <div style={{fontSize:11,color:"#444",marginTop:3,letterSpacing:"0.09em"}}>GIG WORKER INSURANCE PLATFORM</div>
        </div>

        {/* Steps */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",width:"100%",maxWidth:260}}>
          {[1,2,3].map((s,i)=>(
            <div key={s} style={{display:"flex",alignItems:"center"}}>
              <div style={{width:30,height:30,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:step>=s?"#7c8cf8":"rgba(255,255,255,0.06)",color:step>=s?"#fff":"#444",fontSize:14,fontWeight:700,transition:"all 0.3s"}}>{step>s?"✓":s}</div>
              {i<2&&<div style={{width:70,height:2,background:step>s?"#7c8cf8":"rgba(255,255,255,0.06)",margin:"0 8px",transition:"all 0.3s"}}/>}
            </div>
          ))}
        </div>

        <Card>
          {step===1&&(
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div><div style={{fontSize:16,fontWeight:800,color:"#fff"}}>👤 Personal Details</div><div style={{fontSize:12,color:"#555",marginTop:2}}>Tell us about yourself</div></div>
              <FInput label="FULL NAME" value={form.name} onChange={set("name")} placeholder="e.g. Arjun Ramesh" required/>
              {errs.name&&<div style={{fontSize:11,color:"#ff4757",marginTop:-8}}>{errs.name}</div>}
              <FInput label="PHONE NUMBER" value={form.phone} onChange={set("phone")} type="tel" placeholder="10-digit mobile number" required/>
              {errs.phone&&<div style={{fontSize:11,color:"#ff4757",marginTop:-8}}>{errs.phone}</div>}
              <FInput label="EMAIL" value={form.email} onChange={set("email")} type="email" placeholder="your@email.com" required/>
              {errs.email&&<div style={{fontSize:11,color:"#ff4757",marginTop:-8}}>{errs.email}</div>}
            </div>
          )}

          {step===2&&(
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div><div style={{fontSize:16,fontWeight:800,color:"#fff"}}>🏍️ Work Details</div><div style={{fontSize:12,color:"#555",marginTop:2}}>Used for risk & premium calculation</div></div>
              <FSelect label="YOUR DISTRICT" value={form.district} onChange={set("district")} options={TN_DISTRICTS.map(d=>({value:d.id,label:d.name+(d.safe?" ✅":d.flood?" ⚠️":"")}))} required/>
              {errs.district&&<div style={{fontSize:11,color:"#ff4757",marginTop:-8}}>{errs.district}</div>}
              {distObj&&(
                <div style={{padding:"10px 12px",borderRadius:10,background:distObj.safe?"rgba(46,213,115,0.07)":"rgba(255,71,87,0.07)",border:`1px solid ${distObj.safe?"rgba(46,213,115,0.2)":"rgba(255,71,87,0.2)"}`}}>
                  <div style={{fontSize:11,fontWeight:700,color:distObj.safe?"#2ed573":"#ff4757"}}>{distObj.safe?"✅ Safe Zone — 20% premium discount!":"⚠️ Flood-prone — higher risk premium applies"}</div>
                </div>
              )}
              <FSelect label="DELIVERY PLATFORM" value={form.platform} onChange={set("platform")} options={PLATFORMS} required/>
              {errs.platform&&<div style={{fontSize:11,color:"#ff4757",marginTop:-8}}>{errs.platform}</div>}
              <FInput label="PRIMARY WORK AREA / ZONE" value={form.workArea} onChange={set("workArea")} placeholder="e.g. T.Nagar, Anna Nagar" required/>
              {errs.workArea&&<div style={{fontSize:11,color:"#ff4757",marginTop:-8}}>{errs.workArea}</div>}
            </div>
          )}

          {step===3&&(
            <div style={{display:"flex",flexDirection:"column",gap:14,alignItems:"center",textAlign:"center"}}>
              <div style={{fontSize:48}}>🎉</div>
              <div style={{fontSize:18,fontWeight:800,color:"#fff"}}>Registration Complete!</div>
              <div style={{fontSize:13,color:"#888",lineHeight:1.6}}>Welcome, <span style={{color:"#7c8cf8",fontWeight:700}}>{form.name}</span>!<br/>Now select your insurance plan.</div>
              <div style={{width:"100%",padding:"12px 14px",borderRadius:12,background:"rgba(124,140,248,0.08)",border:"1px solid rgba(124,140,248,0.2)"}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,textAlign:"left"}}>
                  {[{l:"Name",v:form.name},{l:"Phone",v:form.phone},{l:"Platform",v:form.platform},{l:"District",v:TN_DISTRICTS.find(d=>d.id===form.district)?.name},{l:"Work Area",v:form.workArea},{l:"Zone",v:distObj?.safe?"✅ Safe":"⚠️ Risk"}].map(r=>(
                    <div key={r.l}><div style={{fontSize:9,color:"#555",letterSpacing:"0.07em"}}>{r.l.toUpperCase()}</div><div style={{fontSize:12,fontWeight:700,color:"#ddd",marginTop:1}}>{r.v}</div></div>
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

        <div style={{textAlign:"center",marginTop:16,fontSize:11,color:"#333"}}>Already registered? <span onClick={()=>onDone(null)} style={{color:"#7c8cf8",cursor:"pointer",fontWeight:700}}>Skip →</span></div>
      </div>
    </div>
  );
}

// ── Plan Screen ──
function PlanScreen({user,weather,onSelect}) {
  const [sel,setSel]=useState(null);
  const dist=TN_DISTRICTS.find(d=>d.id===user?.district);
  const w=dist?weather[dist.id]:null;
  const selPlan=PLANS.find(p=>p.id===sel);
  const calc=selPlan&&dist&&w?calcPremium(selPlan,dist,w):null;

  return (
    <div style={{minHeight:"100vh",background:"#080810",padding:"24px 0 40px",fontFamily:"'DM Sans',sans-serif",width:"100%"}}>
      <style>{css}</style>
      <div style={{maxWidth:900,margin:"0 auto",padding:"0 16px",animation:"slideUp 0.35s ease"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:13,color:"#7c8cf8",fontWeight:700,letterSpacing:"0.1em"}}>STEP 2 OF 2</div>
          <div style={{fontSize:20,fontWeight:800,color:"#fff",marginTop:6}}>Choose Your Plan</div>
          <div style={{fontSize:12,color:"#555",marginTop:3}}>Weekly billing · Cancel anytime</div>
        </div>

        {calc&&(
          <div style={{marginBottom:16,padding:"14px 16px",borderRadius:14,background:"linear-gradient(135deg,rgba(124,140,248,0.1),rgba(167,139,250,0.05))",border:"1px solid rgba(124,140,248,0.25)"}}>
            <div style={{fontSize:10,color:"#7c8cf8",fontWeight:700,letterSpacing:"0.08em",marginBottom:8}}>⚙️ AI PREMIUM CALCULATION FOR {selPlan.name.toUpperCase()}</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div><div style={{fontSize:11,color:"#888"}}>Base: ₹{calc.base}/week</div><div style={{fontSize:11,color:"#888"}}>Multiplier: {calc.multiplier.toFixed(2)}x</div></div>
              <div style={{fontSize:22,fontWeight:800,color:"#fff",fontFamily:"monospace"}}>₹{calc.finalPremium}<span style={{fontSize:12,color:"#666"}}>/wk</span></div>
            </div>
            {calc.reasons.map((r,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:11,color:r.color,marginBottom:3}}><span>▲ {r.label}</span><span style={{fontWeight:700,fontFamily:"monospace"}}>{r.delta}</span></div>)}
            {calc.savings.map((s,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:11,color:s.color,marginBottom:3}}><span>▼ {s.label}</span><span style={{fontWeight:700,fontFamily:"monospace"}}>{s.delta}</span></div>)}
          </div>
        )}

        <div className="plan-grid" style={{display:"grid",gridTemplateColumns:"1fr",gap:12}}>
          {PLANS.map(plan=>{
            const c2=dist&&w?calcPremium(plan,dist,w):null;
            const isSel=sel===plan.id;
            return (
              <div key={plan.id} onClick={()=>setSel(plan.id)} style={{padding:"18px",borderRadius:16,cursor:"pointer",background:isSel?`linear-gradient(135deg,${plan.color}18,${plan.color}08)`:"rgba(255,255,255,0.03)",border:`2px solid ${isSel?plan.color:"rgba(255,255,255,0.07)"}`,transform:isSel?"scale(1.01)":"scale(1)",transition:"all 0.25s",boxShadow:isSel?`0 0 20px ${plan.color}22`:"none"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{fontSize:20}}>{plan.icon}</span>
                      <span style={{fontSize:15,fontWeight:800,color:isSel?plan.color:"#ddd"}}>{plan.name}</span>
                      {plan.id==="premium"&&<span style={{fontSize:9,background:plan.color+"22",color:plan.color,padding:"2px 7px",borderRadius:6,fontWeight:700}}>POPULAR</span>}
                    </div>
                    <div style={{marginTop:6}}>
                      <span style={{fontSize:22,fontWeight:800,color:"#fff",fontFamily:"monospace"}}>₹{c2?c2.finalPremium:plan.weeklyBase}</span>
                      <span style={{fontSize:11,color:"#555"}}>/week</span>
                      {c2&&c2.finalPremium!==plan.weeklyBase&&<span style={{fontSize:10,color:"#888",marginLeft:6,textDecoration:"line-through"}}>₹{plan.weeklyBase}</span>}
                    </div>
                  </div>
                  <div style={{width:22,height:22,borderRadius:"50%",border:`2px solid ${isSel?plan.color:"rgba(255,255,255,0.15)"}`,display:"flex",alignItems:"center",justifyContent:"center",background:isSel?plan.color:"transparent"}}>
                    {isSel&&<span style={{fontSize:11,color:"#fff"}}>✓</span>}
                  </div>
                </div>
                <div style={{height:1,background:"rgba(255,255,255,0.05)",margin:"12px 0"}}/>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                  {plan.features.map((f,i)=><div key={i} style={{fontSize:11,color:"#777",display:"flex",alignItems:"center",gap:5}}><span style={{color:plan.color}}>✓</span>{f}</div>)}
                </div>
                <div style={{marginTop:12,display:"flex",gap:8,flexWrap:"wrap"}}>
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
      <div style={{background:"linear-gradient(160deg,#0f0f1a,#12121f)",border:"1px solid rgba(124,140,248,0.3)",borderRadius:24,padding:"28px 24px",maxWidth:400,width:"100%",boxShadow:"0 0 60px rgba(124,140,248,0.12),0 20px 80px rgba(0,0,0,0.6)"}}>
        <div style={{textAlign:"center",marginBottom:22}}>
          <div style={{fontSize:30,marginBottom:6}}>{trig.icon}</div>
          <div style={{fontSize:16,fontWeight:700,color:"#f0f0ff"}}>{trig.label} Detected</div>
          <div style={{fontSize:11,color:"#555",marginTop:3}}>Zero-touch claim processing</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:9}}>
          {CLAIM_STEPS.map((s,i)=>{
            const st=i<step?"done":i===step?"active":"pending";
            return (
              <div key={s.id} style={{display:"flex",alignItems:"center",gap:11,padding:"10px 12px",borderRadius:11,background:st==="active"?"rgba(124,140,248,0.1)":st==="done"?"rgba(46,213,115,0.06)":"rgba(255,255,255,0.02)",border:`1px solid ${st==="active"?"rgba(124,140,248,0.28)":st==="done"?"rgba(46,213,115,0.18)":"rgba(255,255,255,0.04)"}`,transition:"all 0.4s"}}>
                <div style={{fontSize:17,width:26,textAlign:"center"}}>{st==="done"?"✅":st==="active"?"⏳":s.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:600,color:st==="pending"?"#444":"#eee"}}>{s.label}</div>
                  {st==="active"&&<div style={{fontSize:10,color:"#7c8cf8",marginTop:2}}>Processing...</div>}
                  {st==="done"&&s.id==="fraud"&&<div style={{fontSize:10,color:"#2ed573",marginTop:2}}>No anomalies ✓</div>}
                </div>
                {st==="active"&&<div style={{width:15,height:15,borderRadius:"50%",border:"2px solid rgba(124,140,248,0.2)",borderTop:"2px solid #7c8cf8",animation:"spin 0.7s linear infinite"}}/>}
              </div>
            );
          })}
        </div>
        {done&&(
          <div style={{marginTop:20,padding:"18px",borderRadius:14,background:"rgba(46,213,115,0.09)",border:"1px solid rgba(46,213,115,0.22)",textAlign:"center"}}>
            <div style={{fontSize:28,marginBottom:5}}>🎉</div>
            <div style={{fontSize:14,fontWeight:700,color:"#2ed573"}}>Claim Approved!</div>
            <div style={{fontSize:26,fontWeight:800,color:"#fff",margin:"6px 0",fontFamily:"monospace"}}>+₹{amount}</div>
            <div style={{fontSize:11,color:"#555",marginBottom:14}}>Instantly credited to your wallet</div>
            <button onClick={onDone} style={{padding:"10px 0",width:"100%",borderRadius:10,background:"#2ed573",color:"#0a0a0f",border:"none",fontWeight:800,fontSize:14,cursor:"pointer"}}>Done ✓</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main App ──
export default function GigShieldAI() {
  const [screen,setScreen]=useState("register");
  const [user,setUser]=useState(null);
  const [activePlan,setActivePlan]=useState(null);
  const [tab,setTab]=useState("dashboard");
  const [weather,setWeather]=useState({});
  const [gpsState,setGpsState]=useState("idle");
  const [userDist,setUserDist]=useState(null);
  const [search,setSearch]=useState("");
  const [claims,setClaims]=useState([
    {type:"rain",amount:850,district:"Chennai",time:"Today 08:14"},
    {type:"heat",amount:1200,district:"Madurai",time:"Yesterday 13:30"},
  ]);
  const [wallet,setWallet]=useState(5840);
  const [modal,setModal]=useState(null);
  const [cooldown,setCooldown]=useState(0);
  const [fraudAlert,setFraudAlert]=useState(false);
  const cdRef=useRef(null);

  useEffect(()=>{
    const w={};
    TN_DISTRICTS.forEach(d=>{w[d.id]=genWeather(d);});
    setWeather(w);
  },[]);

  const handleRegister=formData=>{
    if(!formData){setScreen("app");return;}
    setUser(formData);
    const d=TN_DISTRICTS.find(d=>d.id===formData.district);
    if(d) setUserDist(d);
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
      let best=TN_DISTRICTS[0],minD=Infinity;
      TN_DISTRICTS.forEach(d=>{const dist=Math.hypot(d.lat-la,d.lon-lo);if(dist<minD){minD=dist;best=d;}});
      setUserDist(best);setGpsState("found");
    },()=>setGpsState("error"),{timeout:8000});
  },[]);

  const fire=useCallback(type=>{
    if(cooldown>0){setFraudAlert(true);setTimeout(()=>setFraudAlert(false),3500);return;}
    setModal(type);
  },[cooldown]);

  const onDone=useCallback(()=>{
    const plan=activePlan||PLANS[1];
    const amount=plan.payout[modal]||500;
    const district=userDist?.name||user?.district||"Tamil Nadu";
    setClaims(p=>[...p,{type:modal,amount,district,time:new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}]);
    setWallet(b=>b+amount);
    setModal(null);
    setCooldown(30);
    cdRef.current=setInterval(()=>setCooldown(c=>{if(c<=1){clearInterval(cdRef.current);return 0;}return c-1;}),1000);
  },[modal,activePlan,userDist,user]);

  if(screen==="register") return <RegisterScreen onDone={handleRegister}/>;
  if(screen==="plan") return <PlanScreen user={user} weather={weather} onSelect={handlePlan}/>;

  const plan=activePlan||PLANS[1];
  const uw=userDist?weather[userDist.id]:null;
  const ur=overallRisk(uw);
  const distObj=userDist||(user?.district?TN_DISTRICTS.find(d=>d.id===user.district):null);
  const filtered=TN_DISTRICTS.filter(d=>d.name.toLowerCase().includes(search.toLowerCase()));
  const counts={HIGH:0,MEDIUM:0,LOW:0};
  TN_DISTRICTS.forEach(d=>{const l=overallRisk(weather[d.id]).level;if(counts[l]!==undefined)counts[l]++;});

  const TABS=[
    {id:"dashboard",label:"Home",   icon:"⚡"},
    {id:"premium",  label:"Premium",icon:"⚙️"},
    {id:"risk",     label:"TN Risk",icon:"🗺️"},
    {id:"claims",   label:"Claims", icon:"📋"},
    {id:"admin",    label:"Admin",  icon:"🔧"},
  ];

  return (
    <div style={{minHeight:"100vh",width:"100%",background:"#080810",color:"#f0f0ff",fontFamily:"'DM Sans','Segoe UI',sans-serif"}}>
      <style>{css}</style>

      {/* ── Header ── */}
      <div style={{background:"rgba(8,8,16,0.97)",backdropFilter:"blur(20px)",position:"sticky",top:0,zIndex:100,borderBottom:"1px solid rgba(255,255,255,0.06)",width:"100%"}}>
        {/* Ticker */}
        <div style={{background:"rgba(124,140,248,0.07)",borderBottom:"1px solid rgba(124,140,248,0.08)",overflow:"hidden",height:25}}>
          <div style={{display:"flex",gap:34,animation:"ticker 26s linear infinite",alignItems:"center",height:"100%",width:"max-content"}}>
            {["📍 GPS Detection Active",`🛡️ ${plan.name} Active`,`⚙️ ₹${distObj?calcPremium(plan,distObj,weather[distObj.id])?.finalPremium||plan.weeklyBase:plan.weeklyBase}/wk`,
              `🌧️ ${counts.HIGH} HIGH-risk districts`,"✅ Zero-touch claims enabled","💰 ₹2.1L paid this week","🛡️ 1,284 TN workers",
              "📍 GPS Detection Active",`🛡️ ${plan.name} Active`,`⚙️ ₹${plan.weeklyBase}/wk base`
            ].map((t,i)=><span key={i} style={{fontSize:10,color:"#7c8cf8",fontWeight:600,whiteSpace:"nowrap",letterSpacing:"0.04em"}}>{t}</span>)}
          </div>
        </div>
        {/* Nav */}
        <div style={{maxWidth:1200,margin:"0 auto",padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:24}}>🛡️</span>
              <span style={{fontSize:22,fontWeight:900,letterSpacing:"-0.02em",color:"#fff"}}>GigShield <span style={{color:"#7c8cf8"}}>AI</span></span>
              <span style={{fontSize:12,color:plan.color,fontWeight:700,background:plan.color+"15",padding:"3px 8px",borderRadius:8}}>{plan.icon} {plan.name.toUpperCase()}</span>
            </div>
            <div style={{fontSize:9,color:"#3a3a5a",marginTop:1}}>{user?.name||"WORKER"} · {user?.platform||"PLATFORM"} · TN</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:12,color:"#444",fontWeight:600}}>Wallet</div>
              <div style={{fontSize:20,fontWeight:900,color:"#2ed573",fontFamily:"monospace"}}>₹{wallet.toLocaleString()}</div>
            </div>
            <div style={{width:42,height:42,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:`linear-gradient(135deg,${plan.color},#a78bfa)`,fontSize:14,fontWeight:900,color:"#fff"}}>
              {user?.name?.slice(0,2).toUpperCase()||"GW"}
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",padding:"0 20px 10px",gap:4}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"8px 2px",borderRadius:9,border:"none",cursor:"pointer",background:tab===t.id?"rgba(124,140,248,0.13)":"transparent",color:tab===t.id?"#7c8cf8":"#3a3a5a",fontSize:12,fontWeight:700,letterSpacing:"0.04em",borderBottom:tab===t.id?"2px solid #7c8cf8":"2px solid transparent",transition:"all 0.2s"}}>
              <div style={{fontSize:16,marginBottom:2}}>{t.icon}</div>{t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{maxWidth:1200,margin:"0 auto",padding:"16px 20px 100px",animation:"slideUp 0.35s ease"}}>

        {/* DASHBOARD */}
        {tab==="dashboard"&&(
          <div className="dash-grid">
            {/* Left col */}
            <div style={{display:"flex",flexDirection:"column",gap:13}}>
              {/* Worker card */}
              <Card glow={plan.color} style={{background:`linear-gradient(135deg,${plan.color}12,${plan.color}05)`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div>
                    <Pill color="#2ed573">● Active</Pill>
                    <div style={{fontSize:18,fontWeight:800,color:"#fff",marginTop:8}}>{user?.name||"Gig Worker"}</div>
                    <div style={{fontSize:11,color:"#555",marginTop:2}}>{user?.platform||"Platform"} · {user?.workArea||"TN"}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:10,color:"#444"}}>Active Plan</div>
                    <div style={{fontSize:13,fontWeight:800,color:plan.color}}>{plan.icon} {plan.name}</div>
                    <div style={{fontSize:10,color:"#3a3a5a",marginTop:2}}>₹{distObj&&weather[distObj.id]?calcPremium(plan,distObj,weather[distObj.id])?.finalPremium||plan.weeklyBase:plan.weeklyBase}/wk</div>
                  </div>
                </div>
                <div style={{height:1,background:"rgba(255,255,255,0.05)",margin:"12px 0"}}/>
                <div style={{display:"flex",justifyContent:"space-around"}}>
                  {[{l:"Claims",v:claims.length,c:"#7c8cf8"},{l:"Paid Out",v:`₹${claims.reduce((s,c)=>s+c.amount,0).toLocaleString()}`,c:"#2ed573"},{l:"District",v:distObj?.name?.split(" ")[0]||"—",c:plan.color}].map(s=>(
                    <div key={s.l} style={{textAlign:"center"}}>
                      <div style={{fontSize:15,fontWeight:800,color:s.c,fontFamily:"monospace"}}>{s.v}</div>
                      <div style={{fontSize:10,color:"#555",marginTop:1}}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* GPS card */}
              <Card glow={gpsState==="found"?"#2ed573":"#7c8cf8"}>
                <div style={{fontSize:10,color:"#444",letterSpacing:"0.09em",fontWeight:700,marginBottom:13}}>📍 YOUR DISTRICT RISK</div>
                {gpsState==="idle"&&(
                  <div style={{textAlign:"center",padding:"8px 0"}}>
                    <div style={{fontSize:34,marginBottom:10}}>🗺️</div>
                    <div style={{fontSize:13,color:"#777",marginBottom:14}}>Detect your district for live risk analysis</div>
                    <button onClick={detectGPS} style={{padding:"12px 20px",borderRadius:12,background:"rgba(124,140,248,0.13)",border:"1px solid rgba(124,140,248,0.28)",color:"#7c8cf8",fontWeight:700,fontSize:13,cursor:"pointer",width:"100%"}}>🛰️ Use My GPS Location</button>
                    {user?.district&&(
                      <button onClick={()=>{setUserDist(TN_DISTRICTS.find(d=>d.id===user.district));setGpsState("found");}} style={{marginTop:10,padding:"10px 20px",borderRadius:12,background:"rgba(46,213,115,0.08)",border:"1px solid rgba(46,213,115,0.2)",color:"#2ed573",fontWeight:700,fontSize:12,cursor:"pointer",width:"100%"}}>
                        Use Registered District ({TN_DISTRICTS.find(d=>d.id===user.district)?.name})
                      </button>
                    )}
                  </div>
                )}
                {gpsState==="detecting"&&(
                  <div style={{textAlign:"center",padding:"18px 0"}}>
                    <div style={{width:38,height:38,borderRadius:"50%",border:"3px solid rgba(124,140,248,0.2)",borderTop:"3px solid #7c8cf8",animation:"spin 0.8s linear infinite",margin:"0 auto 12px"}}/>
                    <div style={{fontSize:13,color:"#666",animation:"pulse 1.4s ease infinite"}}>Detecting your location...</div>
                  </div>
                )}
                {gpsState==="error"&&(
                  <>
                    <div style={{padding:"10px 12px",borderRadius:10,background:"rgba(255,71,87,0.07)",border:"1px solid rgba(255,71,87,0.18)",marginBottom:12,fontSize:12,color:"#ff4757"}}>📵 GPS unavailable — select below</div>
                    <select onChange={e=>{const d=TN_DISTRICTS.find(d=>d.id===e.target.value);if(d){setUserDist(d);setGpsState("found");}}} style={{width:"100%",padding:"11px 12px",borderRadius:11,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",color:"#aaa",fontSize:13}}>
                      <option value="">Select your district...</option>
                      {TN_DISTRICTS.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                  </>
                )}
                {gpsState==="found"&&userDist&&uw&&(
                  <>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                      <div>
                        <div style={{fontSize:18,fontWeight:800,color:"#fff"}}>📍 {userDist.name}</div>
                        <div style={{fontSize:11,color:"#555"}}>{uw.condition} · {uw.temp}°C · AQI {uw.aqi}</div>
                      </div>
                      <div style={{padding:"8px 12px",borderRadius:11,background:ur.bg,border:`1px solid ${ur.color}44`}}>
                        <div style={{fontSize:13,fontWeight:800,color:ur.color}}>{ur.level}</div>
                        <div style={{fontSize:9,color:ur.color+"88",textAlign:"center"}}>{ur.score}/100</div>
                      </div>
                    </div>
                    {[{l:"🌧️ Rain",v:uw.rain,fn:rainRisk},{l:"🔥 Heat",v:uw.heat,fn:heatRisk},{l:"⛈️ Storm",v:uw.storm,fn:stormRisk},{l:"🌫️ AQI",v:uw.aqi/200,fn:v=>v>0.5?{l:"Poor",c:"#a29bfe"}:v>0.3?{l:"Moderate",c:"#ffa502"}:{l:"Good",c:"#2ed573"}}].map(row=>{
                      const rk=row.fn(row.v);
                      return (
                        <div key={row.l} style={{marginBottom:10}}>
                          <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                            <span style={{fontSize:11,color:"#777"}}>{row.l}</span>
                            <span style={{fontSize:11,fontWeight:700,color:rk.c}}>{rk.l}</span>
                          </div>
                          <Bar pct={row.v*100} color={rk.c} glow={row.v>0.65}/>
                        </div>
                      );
                    })}
                    {userDist.safe&&(
                      <div style={{padding:"10px 12px",borderRadius:10,background:"rgba(46,213,115,0.08)",border:"1px solid rgba(46,213,115,0.2)",marginTop:4}}>
                        <div style={{fontSize:12,fontWeight:700,color:"#2ed573"}}>✅ Safe Zone — 20% premium discount applied!</div>
                      </div>
                    )}
                    <button onClick={()=>{setGpsState("idle");setUserDist(null);}} style={{marginTop:12,width:"100%",padding:"8px",borderRadius:10,background:"transparent",border:"1px solid rgba(255,255,255,0.06)",color:"#3a3a5a",cursor:"pointer",fontSize:11}}>Change District</button>
                  </>
                )}
              </Card>

              {fraudAlert&&(
                <div style={{padding:"13px 15px",borderRadius:13,background:"rgba(255,71,87,0.09)",border:"1px solid rgba(255,71,87,0.28)",animation:"glow 1s ease infinite",display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontSize:20}}>🚨</span>
                  <div>
                    <div style={{fontSize:13,fontWeight:700,color:"#ff4757"}}>Suspicious Activity Detected</div>
                    <div style={{fontSize:11,color:"#ff475788"}}>Cooldown active. Wait {cooldown}s before next claim.</div>
                  </div>
                </div>
              )}
            </div>

            {/* Right col */}
            <div style={{display:"flex",flexDirection:"column",gap:13}}>
              <Card>
                <div style={{fontSize:10,color:"#3a3a5a",letterSpacing:"0.09em",fontWeight:700,marginBottom:13}}>⚡ ZERO-TOUCH CLAIM TRIGGERS</div>
                <div className="trig-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
                  {TRIGGERS.map(trig=>(
                    <button key={trig.type} onClick={()=>fire(trig.type)} style={{padding:"13px 10px",borderRadius:13,background:cooldown>0?"rgba(255,255,255,0.02)":`${trig.color}18`,border:`1px solid ${cooldown>0?"rgba(255,255,255,0.04)":trig.color+"40"}`,color:cooldown>0?"#2a2a3f":"#fff",cursor:cooldown>0?"not-allowed":"pointer",textAlign:"center",transition:"all 0.2s"}}>
                      <div style={{fontSize:22,marginBottom:5}}>{trig.icon}</div>
                      <div style={{fontSize:11,fontWeight:700}}>{trig.label}</div>
                      <div style={{fontSize:10,color:cooldown>0?"#2a2a3f":trig.color,marginTop:3}}>{trig.desc}</div>
                      <div style={{fontSize:10,color:cooldown>0?"#222":trig.color,marginTop:3,fontFamily:"monospace",fontWeight:700}}>
                        {cooldown>0?`${cooldown}s`:`₹${plan.payout[trig.type]}`}
                      </div>
                    </button>
                  ))}
                </div>
                {cooldown>0&&(
                  <div style={{marginTop:11}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                      <span style={{fontSize:10,color:"#3a3a5a"}}>Cooldown Timer</span>
                      <span style={{fontSize:10,color:"#ffa502",fontFamily:"monospace"}}>{cooldown}s</span>
                    </div>
                    <Bar pct={(30-cooldown)/30*100} color="#ffa502"/>
                  </div>
                )}
              </Card>
            </div>
          </div>
        )}

        {/* PREMIUM */}
        {tab==="premium"&&(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16,alignItems:"start"}}>
            <div style={{display:"flex",flexDirection:"column",gap:13}}>
              <div>
                <div style={{fontSize:16,fontWeight:800,color:"#fff"}}>⚙️ Dynamic Premium Engine</div>
                <div style={{fontSize:11,color:"#444",marginTop:2}}>AI-calculated weekly premium based on your risk</div>
              </div>
              {distObj&&weather[distObj.id]?(()=>{
                const calc=calcPremium(plan,distObj,weather[distObj.id]);
                if(!calc) return null;
                const dist2=distObj;
                return (
                  <Card glow={dist2.safe?"#2ed573":"#ffa502"}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                      <div>
                        <div style={{fontSize:10,color:"#555",letterSpacing:"0.09em",fontWeight:700}}>⚙️ YOUR WEEKLY PREMIUM</div>
                        <div style={{fontSize:28,fontWeight:800,color:"#fff",fontFamily:"monospace",marginTop:5}}>₹{calc.finalPremium}<span style={{fontSize:13,color:"#555",fontWeight:400}}>/week</span></div>
                        {calc.finalPremium!==calc.base&&<div style={{fontSize:11,color:"#888",textDecoration:"line-through"}}>Base: ₹{calc.base}/week</div>}
                      </div>
                      <Pill color={dist2.safe?"#2ed573":"#ffa502"}>{dist2.safe?"✅ Safe Zone":"⚠️ Risk Zone"}</Pill>
                    </div>
                    {calc.reasons.map((r,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 10px",borderRadius:9,background:"rgba(255,71,87,0.06)",border:"1px solid rgba(255,71,87,0.15)",marginBottom:6}}><span style={{fontSize:11,color:r.color}}>▲ {r.label}</span><span style={{fontSize:11,fontWeight:700,color:r.color,fontFamily:"monospace"}}>{r.delta}</span></div>)}
                    {calc.savings.map((s,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 10px",borderRadius:9,background:"rgba(46,213,115,0.06)",border:"1px solid rgba(46,213,115,0.15)",marginBottom:6}}><span style={{fontSize:11,color:s.color}}>▼ {s.label}</span><span style={{fontSize:11,fontWeight:700,color:s.color,fontFamily:"monospace"}}>{s.delta}</span></div>)}
                  </Card>
                );
              })():(
                <Card><div style={{textAlign:"center",padding:20,color:"#555",fontSize:13}}>Set your district on Home tab first</div></Card>
              )}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:13}}>
              <div style={{fontSize:10,color:"#3a3a5a",fontWeight:700,letterSpacing:"0.08em"}}>ALL PLANS COMPARISON</div>
              {PLANS.map(p=>{
                const calc2=distObj&&weather[distObj.id]?calcPremium(p,distObj,weather[distObj.id]):null;
                const isA=p.id===plan.id;
                return (
                  <Card key={p.id} glow={isA?p.color:null} style={{border:`1px solid ${isA?p.color+"44":"rgba(255,255,255,0.07)"}`}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <span style={{fontSize:18}}>{p.icon}</span>
                        <span style={{fontSize:14,fontWeight:800,color:isA?p.color:"#ddd"}}>{p.name}</span>
                        {isA&&<Pill color={p.color}>Active</Pill>}
                      </div>
                      <div><span style={{fontSize:20,fontWeight:800,color:"#fff",fontFamily:"monospace"}}>₹{calc2?calc2.finalPremium:p.weeklyBase}</span><span style={{fontSize:11,color:"#555"}}>/wk</span></div>
                    </div>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                      {Object.entries(p.payout).map(([k,v])=><span key={k} style={{fontSize:10,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",padding:"3px 8px",borderRadius:8,color:"#888"}}>{k==="rain"?"🌧️":k==="heat"?"🔥":k==="storm"?"⛈️":k==="curfew"?"🚫":"🌫️"}₹{v}</span>)}
                    </div>
                    {!isA&&<button onClick={()=>setActivePlan(p)} style={{marginTop:12,width:"100%",padding:"9px",borderRadius:10,background:`${p.color}15`,border:`1px solid ${p.color}33`,color:p.color,cursor:"pointer",fontSize:12,fontWeight:700}}>Switch to {p.name}</button>}
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* TN RISK */}
        {tab==="risk"&&(
          <div style={{display:"flex",flexDirection:"column",gap:13}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><div style={{fontSize:16,fontWeight:800,color:"#fff"}}>🗺️ Tamil Nadu Risk Panel</div><div style={{fontSize:11,color:"#444",marginTop:2}}>All 38 districts · tap for details</div></div>
              <Pill color="#7c8cf8">38 Districts</Pill>
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
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search district..." style={{width:"100%",padding:"10px 14px 10px 36px",borderRadius:11,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",color:"#ccc",fontSize:13}}/>
              <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:14}}>🔍</span>
            </div>
            <div className="dist-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {filtered.map(d=>{
                const w=weather[d.id];
                const rk=overallRisk(w);
                const isU=userDist?.id===d.id;
                const c2=w?calcPremium(plan,d,w):null;
                return (
                  <div key={d.id} style={{padding:"12px 14px",borderRadius:13,background:isU?"linear-gradient(135deg,rgba(124,140,248,0.13),rgba(167,139,250,0.06))":"rgba(255,255,255,0.03)",border:`1px solid ${isU?"rgba(124,140,248,0.3)":"rgba(255,255,255,0.06)"}`,transition:"all 0.2s"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                      <div>
                        <div style={{fontSize:13,fontWeight:700,color:isU?"#a78bfa":"#ddd",display:"flex",alignItems:"center",gap:5}}>
                          {isU&&"📍"}{d.name}
                          {d.safe&&<span style={{fontSize:9,color:"#2ed573",background:"rgba(46,213,115,0.12)",padding:"1px 5px",borderRadius:5}}>✅</span>}
                          {d.flood&&<span style={{fontSize:9,color:"#ff4757",background:"rgba(255,71,87,0.12)",padding:"1px 5px",borderRadius:5}}>⚠️</span>}
                        </div>
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
                  <div style={{fontSize:11,color:"#444",marginTop:3}}>{claims.length} claims · All auto-approved</div>
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
                        <div>
                          <div style={{fontSize:12,fontWeight:700,color:"#ddd"}}>{trig.label}</div>
                          <div style={{fontSize:10,color:"#444",marginTop:2}}>📍 {c.district} · {c.time}</div>
                        </div>
                      </div>
                      <div style={{textAlign:"right"}}>
                        <div style={{fontSize:14,fontWeight:800,color:"#2ed573",fontFamily:"monospace"}}>+₹{c.amount}</div>
                        <Pill color="#2ed573">Auto-Approved</Pill>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* ADMIN */}
        {tab==="admin"&&(
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:"#2ed573",boxShadow:"0 0 7px #2ed573"}}/>
              <span style={{fontSize:12,color:"#2ed573",fontWeight:700,letterSpacing:"0.1em"}}>ADMIN CONTROL PANEL</span>
            </div>
            <div className="admin-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:10}}>
              {[
                {l:"Total Claims",v:claims.length,icon:"📋",c:"#7c8cf8"},
                {l:"Total Payouts",v:`₹${claims.reduce((s,c)=>s+c.amount,0).toLocaleString()}`,icon:"💸",c:"#2ed573"},
                {l:"Fraud Blocked",v:0,icon:"🚨",c:"#ff4757"},
                {l:"Active Users",v:1284,icon:"👥",c:"#ffa502"},
              ].map(s=>(
                <Card key={s.l} glow={s.c} style={{padding:"14px 15px"}}>
                  <div style={{fontSize:20,marginBottom:6}}>{s.icon}</div>
                  <div style={{fontSize:20,fontWeight:800,color:s.c,fontFamily:"monospace"}}>{s.v}</div>
                  <div style={{fontSize:10,color:"#555",marginTop:2}}>{s.l}</div>
                </Card>
              ))}
            </div>
            <Card>
              <div style={{fontSize:11,fontWeight:700,color:"#444",marginBottom:12,letterSpacing:"0.08em"}}>RECENT CLAIMS</div>
              {claims.length===0&&<div style={{textAlign:"center",color:"#333",fontSize:12,padding:16}}>No claims yet</div>}
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:8}}>
                {[...claims].reverse().map((c,i)=>{
                  const trig=TRIGGERS.find(t=>t.type===c.type)||TRIGGERS[0];
                  return (
                    <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 11px",borderRadius:10,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
                      <div><div style={{fontSize:12,fontWeight:600,color:"#ddd"}}>{trig.icon} {trig.label} · {c.district}</div><div style={{fontSize:10,color:"#444"}}>{c.time}</div></div>
                      <div style={{fontSize:12,fontWeight:700,color:"#2ed573",fontFamily:"monospace"}}>+₹{c.amount}</div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

      </div>

      {modal&&<ClaimModal type={modal} amount={plan.payout[modal]||500} onDone={onDone}/>}
    </div>
  );
}