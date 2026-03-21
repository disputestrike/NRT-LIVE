"use client";
import { useState, useEffect } from "react";

const NAV = ["Live","Nigeria","Africa","Sports","Business","Entertainment","Money","Opinion"];

export default function Navbar({ onLeak }: { onLeak: () => void }) {
  const [time, setTime] = useState("");
  const [active, setActive] = useState("Live");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = String(now.getUTCHours() + 1).padStart(2,"0");
      const m = String(now.getUTCMinutes()).padStart(2,"0");
      const s = String(now.getUTCSeconds()).padStart(2,"0");
      setTime(`${h}:${m}:${s} WAT`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <nav style={{ background:"var(--black2)", borderBottom:"1px solid var(--border)", position:"sticky", top:0, zIndex:99 }}>
      <div style={{ maxWidth:1400, margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between", height:64 }}>
        {/* Logo */}
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:36, color:"var(--white)", letterSpacing:4, display:"flex", alignItems:"center", gap:4 }}>
          NRT<span style={{ color:"var(--orange)" }}>.</span>
          <span className="animate-pulse-dot" style={{ width:8, height:8, background:"var(--orange)", borderRadius:"50%", display:"inline-block", marginLeft:4, marginBottom:6 }} />
        </div>
        {/* Links */}
        <ul style={{ display:"flex", gap:0, listStyle:"none" }} className="hidden md:flex">
          {NAV.map(n => (
            <li key={n}>
              <button onClick={() => setActive(n)} style={{
                color: active === n ? "var(--orange)" : "var(--white2)",
                background: active === n ? "var(--orange-dim)" : "none",
                border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif",
                fontSize:12, fontWeight:600, letterSpacing:"1.5px", textTransform:"uppercase",
                padding:"8px 14px", borderRadius:4, transition:"all 0.2s"
              }}>{n}</button>
            </li>
          ))}
        </ul>
        {/* Right */}
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:"var(--white3)" }}>{time}</span>
          <button onClick={onLeak} style={{
            background:"var(--orange)", color:"var(--black)", border:"none",
            fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:700,
            letterSpacing:"1.5px", textTransform:"uppercase", padding:"8px 16px",
            borderRadius:4, cursor:"pointer", transition:"all 0.2s"
          }}>🔒 Submit Leak</button>
        </div>
      </div>
    </nav>
  );
}
