"use client";
import { useState } from "react";
export default function LeakModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [d, setD] = useState({ name:"", cat:"", text:"" });
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.8)", zIndex:2000, display:"flex", alignItems:"center", justifyContent:"center", padding:20, backdropFilter:"blur(6px)" }} onClick={onClose}>
      <div style={{ background:"#0f0f0f", maxWidth:540, width:"100%", borderRadius:14, position:"relative", borderTop:"4px solid var(--orange)", border:"1px solid rgba(255,255,255,0.1)", boxShadow:"0 24px 80px rgba(0,0,0,0.5)" }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close" style={{ position:"absolute", top:14, right:14, background:"rgba(255,255,255,0.08)", border:"none", width:30, height:30, borderRadius:"50%", cursor:"pointer", fontSize:15, color:"white" }}>✕</button>
        <div style={{ padding:32 }}>
          {sent ? (
            <div style={{ textAlign:"center", padding:"16px 0" }}>
              <div style={{ fontSize:48, marginBottom:12 }}>🔐</div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:26, color:"#6BCB77", marginBottom:8, letterSpacing:2 }}>Submission Received</div>
              <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)" }}>Encrypted and secured. Our investigative team reviews within 24 hours.</div>
              <button onClick={onClose} style={{ marginTop:20, background:"var(--orange)", color:"white", border:"none", padding:"10px 28px", borderRadius:20, fontSize:12, fontWeight:700, cursor:"pointer", letterSpacing:1, textTransform:"uppercase" }}>Close</button>
            </div>
          ) : (
            <>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:"var(--orange)", marginBottom:8 }}>🔒 Secure Submission</div>
              <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, color:"white", marginBottom:6, letterSpacing:2 }}>Submit a Leak</h2>
              <p style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginBottom:20, paddingBottom:16, borderBottom:"1px solid rgba(255,255,255,0.08)" }}>All submissions encrypted · Identity never revealed · Reviewed within 24 hours</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
                <input className="fi" placeholder="Your name (optional)" value={d.name} onChange={e => setD(x => ({...x, name:e.target.value}))} />
                <select className="fi" value={d.cat} onChange={e => setD(x => ({...x, cat:e.target.value}))}>
                  <option value="">Category...</option>
                  <option>Government / Corruption</option>
                  <option>Security / Military</option>
                  <option>Business / Finance</option>
                  <option>Celebrity / Entertainment</option>
                  <option>Sports</option>
                  <option>Other</option>
                </select>
              </div>
              <textarea className="fi" style={{ resize:"vertical", minHeight:90, width:"100%", marginBottom:14 }} placeholder="Describe the tip or paste information here..." value={d.text} onChange={e => setD(x => ({...x, text:e.target.value}))} />
              <button style={{ background:"var(--orange)", color:"white", border:"none", fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", padding:"12px 28px", cursor:"pointer", borderRadius:20, transition:"all 0.2s" }} onClick={() => { if(d.text) setSent(true); }}>
                🔒 Submit Securely
              </button>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)", marginTop:10 }}>🛡 <span style={{ color:"#6BCB77" }}>End-to-end encrypted.</span> NRT never reveals sources.</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
