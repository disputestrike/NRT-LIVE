"use client";
import { useState } from "react";
export default function LeakModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const inp: React.CSSProperties = {
    width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid var(--border)",
    color:"var(--white)", fontFamily:"'DM Sans',sans-serif", fontSize:13,
    padding:"12px 16px", outline:"none", borderRadius:2, marginBottom:12
  };
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(4px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ background:"var(--black2)", border:"1px solid var(--border)", maxWidth:600, width:"90%", position:"relative", borderTop:"3px solid var(--orange)" }}>
        <button onClick={onClose} style={{ position:"absolute", top:16, right:16, background:"none", border:"1px solid var(--border)", color:"var(--white2)", fontSize:18, width:32, height:32, cursor:"pointer", borderRadius:2 }}>✕</button>
        <div style={{ padding:40 }}>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:"var(--orange)", marginBottom:12 }}>🔒 Secure Submission</div>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:36, lineHeight:1.1, marginBottom:8, letterSpacing:1 }}>SUBMIT A LEAK</h2>
          <p style={{ fontSize:13, color:"var(--white3)", marginBottom:24, paddingBottom:24, borderBottom:"1px solid var(--border2)" }}>All submissions encrypted · Identity never revealed · Reviewed within 24 hours</p>
          {sent ? (
            <div style={{ textAlign:"center", padding:"32px 0" }}>
              <div style={{ fontSize:48, marginBottom:16 }}>🔐</div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, color:"var(--green)", marginBottom:8 }}>SUBMISSION RECEIVED</div>
              <div style={{ fontSize:13, color:"var(--white3)" }}>Encrypted and secured. Our investigative team will review within 24 hours.</div>
            </div>
          ) : (
            <>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:0 }}>
                <input style={inp} placeholder="Your name (optional)" />
                <select style={{ ...inp, marginBottom:12 }}>
                  <option value="">Category...</option>
                  <option>Government / Corruption</option>
                  <option>Security / Military</option>
                  <option>Business / Finance</option>
                  <option>Celebrity / Entertainment</option>
                  <option>Sports</option>
                  <option>Other</option>
                </select>
              </div>
              <textarea style={{ ...inp, resize:"vertical", minHeight:120 }} placeholder="Describe the tip or paste information here..." />
              <button onClick={() => setSent(true)} style={{ background:"var(--orange)", color:"var(--black)", border:"none", fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", padding:"14px 32px", cursor:"pointer", borderRadius:2, transition:"all 0.2s" }}>
                🔒 Submit Securely
              </button>
              <div style={{ fontSize:11, color:"var(--white3)", marginTop:12 }}>🛡 <span style={{ color:"var(--green)" }}>End-to-end encrypted.</span> NRT never reveals sources. Nigerian whistleblower protections apply.</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
