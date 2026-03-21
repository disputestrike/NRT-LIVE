"use client";
const SCORES = [
  { league:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League", home:"Man City", away:"Arsenal", hs:2, as:1, status:"FT", live:false },
  { league:"🇳🇬 Super Eagles", home:"Nigeria", away:"Ghana", hs:2, as:0, status:"67'", live:true },
  { league:"🇮🇹 Serie A", home:"Napoli", away:"Juventus", hs:4, as:1, status:"FT", live:false },
  { league:"🏆 Champions League", home:"Real Madrid", away:"PSG", hs:3, as:1, status:"82'", live:true },
  { league:"🇫🇷 Ligue 1", home:"Monaco", away:"Marseille", hs:2, as:2, status:"90+2'", live:true },
  { league:"🇩🇪 Bundesliga", home:"Bayern", away:"Dortmund", hs:5, as:2, status:"FT", live:false },
  { league:"🏀 NBA", home:"Lakers", away:"Celtics", hs:114, as:108, status:"FT", live:false },
  { league:"🌍 CAF Champions", home:"Al Ahly", away:"Esperance", hs:1, as:1, status:"FT·AET", live:false },
];
export default function Scores() {
  return (
    <div style={{ display:"flex", gap:12, overflowX:"auto", paddingBottom:8, scrollbarWidth:"none" }}>
      {SCORES.map((s, i) => (
        <div key={i} style={{
          background:"var(--black2)", border:`1px solid ${s.live ? "var(--orange)" : "var(--border)"}`,
          borderRadius:6, padding:"14px 20px", minWidth:200, flexShrink:0, cursor:"pointer", transition:"all 0.2s"
        }} className="hover:border-orange-500 hover:bg-[#1a1a1a] transition-all">
          <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:"var(--white3)", marginBottom:10 }}>{s.league}</div>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:13, fontWeight:600, color: s.hs >= s.as ? "var(--white)" : "var(--white3)" }}>{s.home}</span>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:18, fontWeight:600, color:"var(--orange)" }}>{s.hs}</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:13, fontWeight:600, color: s.as > s.hs ? "var(--white)" : "var(--white3)" }}>{s.away}</span>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:18, fontWeight:600, color:"var(--orange)" }}>{s.as}</span>
            </div>
          </div>
          <div style={{ marginTop:8 }}>
            {s.live
              ? <span className="status-live">{s.status}</span>
              : <span style={{ fontSize:9, fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", color:"var(--white3)" }}>{s.status}</span>
            }
          </div>
        </div>
      ))}
    </div>
  );
}
