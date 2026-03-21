"use client";
import { useState, useEffect } from "react";

const LINKS = ["Live","Nigeria","Africa","Sports","Business","Entertainment","Money","Tech","Opinion","World"];

export default function Navbar({ onLeak }: { onLeak: () => void }) {
  const [time, setTime] = useState("");
  const [active, setActive] = useState("Live");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = String(d.getUTCHours() + 1).padStart(2,"0");
      const m = String(d.getUTCMinutes()).padStart(2,"0");
      const s = String(d.getUTCSeconds()).padStart(2,"0");
      setTime(`${h}:${m}:${s} WAT`);
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);

  return (
    <nav className="top-nav">
      <div className="top-nav-inner">
        <div className="nrt-logo">NRT<span>.</span></div>
        <div className="nav-divider" />
        <div className="nav-links">
          {LINKS.map(l => (
            <span key={l} className={`nav-link${active===l?" active":""}`} onClick={() => setActive(l)}>{l}</span>
          ))}
        </div>
        <div className="nav-right">
          <div className="nav-search">
            <span>🔍</span><span>Search NRT</span>
          </div>
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"var(--gray-text)", display:"none" }}>{time}</span>
          <button className="btn-leak" onClick={onLeak}>🔒 Submit Leak</button>
          <button className="btn-live">Subscribe</button>
        </div>
      </div>
    </nav>
  );
}
