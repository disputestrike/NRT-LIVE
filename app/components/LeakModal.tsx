"use client";
import { useState } from "react";
export default function LeakModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.8)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }} onClick={onClose}>
      <div style={{ background:"white", maxWidth:560, width:"100%", position:"relative", borderTop:"4px solid var(--orange)", borderRadius:3 }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position:"absolute", top:12, right:12, background:"var(--gray-bg)", border:"none", width:30, height:30, borderRadius:"50%", cursor:"pointer", fontSize:16 }}>✕</button>
        <div style={{ padding:32 }}>
          {sent ? (
            <div style={{ textAlign:"center", padding:"20px 0" }}>
              <div style={{ fontSize:48, marginBottom:12 }}>🔐</div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:26, color:"var(--green)", marginBottom:8 }}>Submission Received</div>
              <div style={{ fontSize:13, color:"var(--gray-text)" }}>Encrypted and secured. Our investigative team reviews within 24 hours.</div>
              <button onClick={onClose} style={{ marginTop:20, background:"var(--orange)", color:"white", border:"none", padding:"10px 24px", borderRadius:2, fontSize:12, fontWeight:700, cursor:"pointer", letterSpacing:1, textTransform:"uppercase" }}>Close</button>
            </div>
          ) : (
            <>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:"var(--orange)", marginBottom:8 }}>🔒 Secure Submission</div>
              <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, marginBottom:6, letterSpacing:2 }}>Submit a Leak</h2>
              <p style={{ fontSize:12, color:"var(--gray-text)", marginBottom:20, paddingBottom:16, borderBottom:"1px solid var(--border)" }}>All submissions encrypted · Identity never revealed · Reviewed within 24 hours</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
                <input className="leak-input" style={{ background:"var(--gray-bg)", color:"var(--black)", border:"1px solid var(--border)" }} placeholder="Your name (optional)" />
                <select className="leak-select" style={{ background:"var(--gray-bg)", color:"var(--black)", border:"1px solid var(--border)" }}>
                  <option value="">Category...</option>
                  <option>Government / Corruption</option>
                  <option>Security / Military</option>
                  <option>Business / Finance</option>
                  <option>Celebrity / Entertainment</option>
                  <option>Sports</option>
                  <option>Other</option>
                </select>
              </div>
              <textarea className="leak-textarea" style={{ background:"var(--gray-bg)", color:"var(--black)", border:"1px solid var(--border)", width:"100%", marginBottom:12 }} placeholder="Describe the tip or paste information here..." />
              <button className="btn-submit" onClick={() => setSent(true)}>🔒 Submit Securely</button>
              <div style={{ fontSize:11, color:"var(--gray-text)", marginTop:10 }}>🛡 <span style={{ color:"var(--green)" }}>End-to-end encrypted.</span> NRT never reveals sources. Nigerian whistleblower protections apply.</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
