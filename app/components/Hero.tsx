"use client";
import { Story } from "../data/stories";

export default function Hero({ stories, onStory }: { stories: Story[]; onStory: (s: Story) => void }) {
  const main = stories[0];
  const side = stories.slice(1, 5);
  const catColor: Record<string,string> = {
    Politics:"var(--orange)", Economy:"#FFC800", Sports:"#00C853",
    Investigation:"#FF2D2D", Entertainment:"#A855F7", Default:"var(--orange)"
  };
  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 380px", gap:1, background:"var(--border)", border:"1px solid var(--border)", marginTop:1 }}>
      {/* Main */}
      <div onClick={() => onStory(main)} style={{
        background:"var(--black2)", padding:40, position:"relative",
        overflow:"hidden", cursor:"pointer", borderRight:"1px solid var(--border)"
      }} className="animate-fade-up hover:bg-[#141414] transition-colors">
        <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"var(--orange)" }} />
        <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"var(--red)", color:"white", fontSize:10, fontWeight:700, letterSpacing:2, textTransform:"uppercase", padding:"4px 10px", borderRadius:2, marginBottom:16 }}>
          <span className="animate-pulse-dot" style={{ width:6, height:6, background:"white", borderRadius:"50%", display:"inline-block" }} />
          Breaking
        </div>
        <div style={{ fontSize:11, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:"var(--orange)", marginBottom:10 }}>{main.category}</div>
        <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:52, lineHeight:1.0, color:"var(--white)", marginBottom:16, letterSpacing:1 }}>{main.headline}</h1>
        <p style={{ fontSize:15, color:"var(--white2)", lineHeight:1.7, maxWidth:580, marginBottom:24 }}>{main.snippet}</p>
        <div style={{ display:"flex", alignItems:"center", gap:16, fontSize:12, color:"var(--white3)" }}>
          <span>NRT Newsroom</span>
          <span style={{ color:"var(--orange)" }}>●</span>
          <span>{main.time}</span>
          <span style={{ color:"var(--orange)" }}>●</span>
          <span className={main.confidence === "Verified" ? "conf-high" : "conf-med"}>
            {main.confidence === "Verified" ? "✓ Verified" : "⚠ Developing"}
          </span>
        </div>
      </div>
      {/* Sidebar */}
      <div style={{ display:"flex", flexDirection:"column", gap:1 }}>
        {side.map((s, i) => (
          <div key={i} onClick={() => onStory(s)} style={{
            background:"var(--black2)", padding:"20px 24px",
            cursor:"pointer", borderBottom:"1px solid var(--border2)", position:"relative", transition:"all 0.2s"
          }} className="hover:bg-[#141414] hover:pl-7 transition-all group">
            <div style={{ position:"absolute", left:0, top:0, bottom:0, width:3, background:"var(--orange)", opacity:0 }} className="group-hover:opacity-100 transition-opacity" />
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", color: catColor[s.category] || catColor.Default, marginBottom:6 }}>{s.category}</div>
            <div style={{ fontSize:14, fontWeight:700, color:"var(--white)", lineHeight:1.4, marginBottom:8 }}>{s.headline}</div>
            <div style={{ display:"flex", alignItems:"center", gap:8, fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"var(--white3)" }}>
              <span>{s.time}</span>
              <span className={s.confidence === "Verified" ? "conf-high" : "conf-med"} style={{ fontSize:9, padding:"1px 6px" }}>
                {s.confidence === "Verified" ? "✓ Verified" : "⚠ Developing"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
