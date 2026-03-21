"use client";
import { useState, useEffect } from "react";

const ITEMS = [
  { label: "BREAKING", text: "Senate passes Digital Media Regulation Act 67–42 amid nationwide protests" },
  { label: "ECONOMY", text: "Naira falls to ₦1,420/USD — CBN emergency MPC session underway" },
  { label: "SPORTS", text: "Super Eagles squad named — Osimhen fit for AFCON qualifiers" },
  { label: "MARKETS", text: "Bitcoin ▲ $84,210 · DANGCEM ▲ ₦1,042 · Crude Oil ▲ $74.40" },
  { label: "LAGOS", text: "Governor signs landmark transport reform — BRT expansion to Epe, Badagry corridors" },
  { label: "SPORTS", text: "Arsenal 1–2 Man City (FT) — Haaland brace ends Gunners' 7-match winning run" },
];

export default function Ticker() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % ITEMS.length);
        setVisible(true);
      }, 400);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const item = ITEMS[idx];
  return (
    <div className="ticker-outer">
      <div className="ticker-badge">
        <span>⚡ LIVE</span>
      </div>
      <div style={{ flex:1, overflow:"hidden", padding:"0 16px", display:"flex", alignItems:"center", gap:12 }}>
        <span style={{ background:"var(--orange)", color:"white", fontSize:9, fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", padding:"2px 8px", borderRadius:2, flexShrink:0 }}>
          {item.label}
        </span>
        <span style={{
          color:"#E5E5E5", fontSize:12, fontWeight:500,
          transition:"opacity 0.3s", opacity: visible ? 1 : 0,
          whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"
        }}>
          {item.text}
        </span>
      </div>
      <div style={{ display:"flex", gap:6, padding:"0 16px", flexShrink:0 }}>
        {ITEMS.map((_, i) => (
          <span key={i} onClick={() => setIdx(i)} style={{
            width:6, height:6, borderRadius:"50%", cursor:"pointer",
            background: i === idx ? "var(--orange)" : "rgba(255,255,255,0.2)"
          }} />
        ))}
      </div>
    </div>
  );
}
