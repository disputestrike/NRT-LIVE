"use client";
import { useState, useEffect } from "react";

const ITEMS = [
  { label:"BREAKING", text:"Senate passes Digital Media Regulation Act 67–42 amid nationwide protests" },
  { label:"ECONOMY",  text:"Naira falls to ₦1,420/USD — CBN emergency MPC session underway now" },
  { label:"SPORTS",   text:"Super Eagles squad named — Osimhen fit for AFCON qualifiers vs Benin" },
  { label:"MARKETS",  text:"Bitcoin ▲ $84,210 · DANGCEM ▲ ₦1,042 · Crude Oil ▲ $74.40/barrel" },
  { label:"LAGOS",    text:"Governor signs transport reform — BRT expansion to Epe and Badagry" },
  { label:"EPL",      text:"Arsenal 1–2 Man City (FT) — Haaland brace ends Gunners' 7-match run" },
];

export default function Ticker() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i+1) % ITEMS.length); setVisible(true); }, 350);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const item = ITEMS[idx];
  return (
    <div className="ticker-outer">
      <div className="ticker-badge">
        <span className="ticker-dot" />
        <span>LIVE</span>
      </div>
      <div style={{ flex:1, overflow:"hidden", padding:"0 16px", display:"flex", alignItems:"center", gap:10 }}>
        <span style={{ background:"var(--orange)", color:"white", fontSize:9, fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", padding:"2px 10px", borderRadius:20, flexShrink:0 }}>
          {item.label}
        </span>
        <span style={{ color:"#E0E0E0", fontSize:12, fontWeight:500, transition:"opacity 0.3s", opacity: visible ? 1 : 0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
          {item.text}
        </span>
      </div>
      <div style={{ display:"flex", gap:5, padding:"0 16px", flexShrink:0 }}>
        {ITEMS.map((_,i) => (
          <button key={i} onClick={() => { setIdx(i); setVisible(true); }} style={{ width:6, height:6, borderRadius:"50%", border:"none", cursor:"pointer", padding:0, background: i===idx ? "var(--orange)" : "rgba(255,255,255,0.25)", transition:"background 0.2s" }} />
        ))}
      </div>
    </div>
  );
}
