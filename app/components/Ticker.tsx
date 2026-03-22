"use client";
import { useState, useEffect } from "react";

type TickerItem = { label: string; text: string };

const DEFAULT: TickerItem[] = [
  { label:"BREAKING", text:"Senate passes Digital Media Regulation Act 67–42 amid nationwide protests" },
  { label:"ECONOMY",  text:"Naira falls to ₦1,420/USD — CBN emergency MPC session underway" },
  { label:"SPORTS",   text:"Super Eagles squad named — Osimhen confirmed fit for AFCON qualifiers" },
  { label:"MARKETS",  text:"Bitcoin ▲ $84,210 · DANGCEM ▲ ₦1,042 · Crude Oil ▲ $74.40" },
  { label:"NIGERIA",  text:"Lagos fuel scarcity enters Day 3 — NNPC promises 72-hour resolution" },
  { label:"AFRICA",   text:"Tyla wins two Grammys — first African artist in history to achieve feat" },
];

export default function Ticker() {
  const [items, setItems] = useState<TickerItem[]>(DEFAULT);
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  // Poll /api/refresh every 60 seconds for live ticker updates
  useEffect(() => {
    const fetchRefresh = async () => {
      try {
        const res = await fetch("/api/refresh", { cache:"no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.ticker?.length) setItems(data.ticker);
        }
      } catch { /* keep defaults */ }
    };
    fetchRefresh();
    const poll = setInterval(fetchRefresh, 60_000);
    return () => clearInterval(poll);
  }, []);

  // Rotate items every 5 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i+1) % items.length); setVisible(true); }, 350);
    }, 5000);
    return () => clearInterval(id);
  }, [items.length]);

  const item = items[idx];
  return (
    <div className="ticker-outer">
      <div className="ticker-badge">
        <span className="ticker-dot" />
        <span>LIVE</span>
      </div>
      <div style={{ flex:1, overflow:"hidden", padding:"0 16px", display:"flex", alignItems:"center", gap:10 }}>
        <span style={{ background:"var(--orange)", color:"white", fontSize:9, fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", padding:"2px 10px", borderRadius:2, flexShrink:0 }}>
          {item.label}
        </span>
        <span style={{ color:"#E0E0E0", fontSize:13, fontWeight:400, fontFamily:"'Inter',Helvetica,Arial,sans-serif", transition:"opacity 0.3s", opacity:visible?1:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
          {item.text}
        </span>
      </div>
      <div style={{ display:"flex", gap:5, padding:"0 16px", flexShrink:0 }}>
        {items.map((_,i) => (
          <button key={i} onClick={() => { setIdx(i); setVisible(true); }}
            style={{ width:6, height:6, borderRadius:"50%", border:"none", cursor:"pointer", padding:0, background:i===idx?"var(--orange)":"rgba(255,255,255,0.25)", transition:"background 0.2s" }} />
        ))}
      </div>
    </div>
  );
}
