"use client";
import { useState } from "react";
import Ticker from "./components/Ticker";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Scores from "./components/Scores";
import StoryModal from "./components/StoryModal";
import LeakModal from "./components/LeakModal";
import { STORIES, Story } from "./data/stories";

const catColor: Record<string,string> = {
  Politics:"var(--orange)", Economy:"#FFC800", Sports:"#00C853",
  Investigation:"#FF2D2D", Entertainment:"#A855F7", Default:"var(--orange)",
  "Money / Hustle":"#38BDF8", "Sports · EPL":"#00C853"
};
const getColor = (cat: string) => {
  for (const k of Object.keys(catColor)) if (cat.includes(k)) return catColor[k];
  return catColor.Default;
};

const SectionHeader = ({ title, onMore }: { title: string; onMore?: () => void }) => (
  <div style={{ display:"flex", alignItems:"center", gap:16, padding:"32px 0 16px", borderBottom:"1px solid var(--border)", marginBottom:24 }}>
    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, letterSpacing:3, color:"var(--white)" }}>{title}</div>
    <div style={{ flex:1, height:1, background:"var(--border)" }} />
    <span onClick={onMore} style={{ fontSize:11, fontWeight:600, letterSpacing:"1.5px", textTransform:"uppercase", color:"var(--orange)", cursor:"pointer" }}>All →</span>
  </div>
);

const MARKET = [
  { label:"USD/NGN", val:"₦1,420", chg:"▼ 0.8%", up:false },
  { label:"Bitcoin", val:"$84,210", chg:"▲ 2.1%", up:true },
  { label:"DANGCEM", val:"₦1,042", chg:"▲ 4.9%", up:true },
  { label:"MTNN", val:"₦215.4", chg:"▼ 1.2%", up:false },
  { label:"Crude", val:"$74.40", chg:"▲ 0.6%", up:true },
];
const TRENDS = ["#MediaBill","#SuperEagles","#Naira","#Osimhen","#EFCC","#DavidoTour"];

export default function Home() {
  const [story, setStory] = useState<Story | null>(null);
  const [leak, setLeak] = useState(false);

  return (
    <div style={{ minHeight:"100vh" }}>
      <Ticker />
      <Navbar onLeak={() => setLeak(true)} />

      <div style={{ maxWidth:1400, margin:"0 auto", padding:"0 24px" }}>
        <Hero stories={STORIES.slice(0,5)} onStory={setStory} />

        {/* AI Bulletin */}
        <div style={{
          background:"linear-gradient(135deg,#1a0800,#0f0f0f)",
          border:"1px solid var(--orange)", borderLeft:"4px solid var(--orange)",
          padding:"16px 24px", margin:"24px 0", display:"flex",
          alignItems:"center", gap:20, cursor:"pointer"
        }}>
          <div className="animate-pulse-ring" style={{ width:40, height:40, background:"var(--orange)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>🎙</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:"var(--orange)", marginBottom:4 }}>🔴 Live AI Broadcast · Top of the Hour</div>
            <div style={{ fontSize:14, fontWeight:600, color:"var(--white)" }}>NRT AI Anchor: Your 3PM news bulletin — 8 stories, 4 minutes</div>
          </div>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", color:"var(--orange)", border:"1px solid var(--orange)", padding:"8px 16px", borderRadius:2, whiteSpace:"nowrap" }}>▶ Play Now</div>
        </div>

        {/* Live Feed */}
        <SectionHeader title="Live Feed" />
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:1, background:"var(--border)", border:"1px solid var(--border)", marginBottom:40 }}>
          {STORIES.slice(5,9).map((s, i) => (
            <div key={s.id} onClick={() => setStory(s)} style={{
              background:"var(--black2)", padding:24, cursor:"pointer",
              gridColumn: i === 0 ? "span 2" : undefined, transition:"background 0.2s"
            }} className="hover:bg-[#141414] transition-colors">
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color: getColor(s.category), marginBottom:10 }}>{s.category}</div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize: i === 0 ? 22 : 18, lineHeight:1.15, color:"var(--white)", marginBottom:10, letterSpacing:"0.5px" }}>{s.headline}</div>
              <div style={{ fontSize:13, color:"var(--white2)", lineHeight:1.6, marginBottom:14, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical" }}>{s.snippet}</div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"var(--white3)" }}>{s.time}</span>
                <span className={s.confidence === "Verified" ? "conf-high" : "conf-med"}>{s.confidence === "Verified" ? "✓ Verified" : "⚠ Developing"}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Scores */}
        <SectionHeader title="Scores" />
        <div style={{ marginBottom:40 }}><Scores /></div>

        {/* Top Stories + Sidebar */}
        <SectionHeader title="Top Stories" />
        <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:24, marginBottom:40, alignItems:"start" }}>
          {/* Articles */}
          <div style={{ display:"flex", flexDirection:"column", gap:1, background:"var(--border)", border:"1px solid var(--border)" }}>
            {STORIES.map((s, i) => (
              <div key={s.id} onClick={() => setStory(s)} style={{
                background:"var(--black2)", padding:"20px 24px",
                display:"flex", gap:20, cursor:"pointer", transition:"background 0.2s"
              }} className="hover:bg-[#141414] transition-colors">
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, color:"var(--border)", lineHeight:1, flexShrink:0, width:36 }}>
                  {String(i+1).padStart(2,"0")}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:15, fontWeight:700, color:"var(--white)", marginBottom:6, lineHeight:1.4 }}>{s.headline}</div>
                  <div style={{ display:"flex", gap:12, fontSize:11, color:"var(--white3)", alignItems:"center" }}>
                    <span style={{ fontSize:10, fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", color: getColor(s.category) }}>{s.category}</span>
                    <span>{s.time}</span>
                    <span className={s.confidence === "Verified" ? "conf-high" : "conf-med"} style={{ fontSize:9, padding:"1px 6px" }}>{s.confidence === "Verified" ? "✓" : "⚠"} {s.confidence}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Widgets */}
          <div>
            {/* Trending */}
            <div style={{ background:"var(--black2)", border:"1px solid var(--border)", marginBottom:16 }}>
              <div style={{ padding:"14px 20px", borderBottom:"1px solid var(--border)", fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:2 }}>
                Trending <span style={{ color:"var(--orange)" }}>Now</span>
              </div>
              <div style={{ padding:"16px 20px" }}>
                {TRENDS.map((t, i) => (
                  <div key={t} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:"1px solid var(--border2)", cursor:"pointer" }}>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"var(--orange)", width:20 }}>#{i+1}</span>
                    <span style={{ fontSize:13, fontWeight:600, color:"var(--white2)", flex:1 }}>{t}</span>
                    <span style={{ fontSize:11, color:"var(--white3)" }}>{["48.2","31.7","27.4","22.1","18.9","15.3"][i]}K</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Market */}
            <div style={{ background:"var(--black2)", border:"1px solid var(--border)", marginBottom:16 }}>
              <div style={{ padding:"14px 20px", borderBottom:"1px solid var(--border)", fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:2 }}>
                Market <span style={{ color:"var(--orange)" }}>Data</span>
              </div>
              <div style={{ padding:"16px 20px" }}>
                {MARKET.map(m => (
                  <div key={m.label} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:"1px solid var(--border2)" }}>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"var(--white3)", width:80 }}>{m.label}</span>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:14, color:"var(--white)", flex:1 }}>{m.val}</span>
                    <span style={{ fontSize:11, color: m.up ? "var(--green)" : "var(--red)" }}>{m.chg}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Confidence Key */}
            <div style={{ background:"var(--black2)", border:"1px solid var(--border)" }}>
              <div style={{ padding:"14px 20px", borderBottom:"1px solid var(--border)", fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:2 }}>
                AI <span style={{ color:"var(--orange)" }}>Confidence</span>
              </div>
              <div style={{ padding:"16px 20px", fontSize:13, color:"var(--white2)", lineHeight:1.7 }}>
                All NRT stories carry a verification score.<br /><br />
                <span className="conf-high" style={{ marginBottom:8, display:"inline-flex" }}>✓ Verified</span><br />Multi-source confirmed<br /><br />
                <span className="conf-med" style={{ margin:"8px 0", display:"inline-flex" }}>⚠ Developing</span><br />Single source, updating<br /><br />
                <span style={{ fontSize:12, color:"var(--white3)" }}>Human editors review all content before publish.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Leak Section */}
        <div style={{ background:"var(--black3)", border:"1px solid var(--orange)", padding:40, margin:"40px 0 60px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-40, right:-40, width:200, height:200, background:"radial-gradient(circle,var(--orange-glow) 0%,transparent 70%)", pointerEvents:"none" }} />
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:36, letterSpacing:3, marginBottom:8 }}>
            GOT A <span style={{ color:"var(--orange)" }}>LEAK?</span>
          </h2>
          <p style={{ fontSize:14, color:"var(--white2)", marginBottom:28, maxWidth:500 }}>Submit tips, documents, or insider information securely. All submissions are encrypted and reviewed by our investigative team. Your identity is never exposed.</p>
          <button onClick={() => setLeak(true)} style={{ background:"var(--orange)", color:"var(--black)", border:"none", fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", padding:"14px 32px", cursor:"pointer", borderRadius:2 }}>
            🔒 Submit a Tip Securely
          </button>
          <div style={{ fontSize:11, color:"var(--white3)", marginTop:12 }}>🛡 <span style={{ color:"var(--green)" }}>End-to-end encrypted.</span> NRT never reveals sources. Nigerian whistleblower protections apply.</div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background:"var(--black2)", borderTop:"1px solid var(--border)", padding:"48px 24px 24px" }}>
        <div style={{ maxWidth:1400, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:40, marginBottom:40 }}>
            <div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:42, letterSpacing:5, marginBottom:12 }}>NRT<span style={{ color:"var(--orange)" }}>.</span></div>
              <div style={{ fontSize:13, color:"var(--white3)", lineHeight:1.7, marginBottom:20, maxWidth:280 }}>Nigeria Real Time &mdash; the nation&apos;s first AI-native, 24/7 news network. Breaking news. Deep investigation. Fearless and people-powered.</div>
              <div style={{ display:"flex", gap:8 }}>
                {["X / Twitter","WhatsApp","Telegram","TikTok"].map(s => (
                  <button key={s} style={{ background:"var(--border2)", border:"1px solid var(--border)", color:"var(--white2)", fontSize:11, fontWeight:700, letterSpacing:1, padding:"6px 12px", borderRadius:2, cursor:"pointer", textTransform:"uppercase" }}>{s}</button>
                ))}
              </div>
            </div>
            {[
              { title:"Sections", links:["Nigeria","Africa","World","Politics","Sports","Entertainment","Money","Opinion"] },
              { title:"Company", links:["About NRT","Editorial Standards","AI Transparency","Corrections Policy","Advertise","Careers"] },
              { title:"Legal", links:["Privacy Policy","Terms of Service","NDPR Compliance","Whistleblower Policy","DMCA / Copyright"] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:16, letterSpacing:2, color:"var(--white)", marginBottom:16 }}>{col.title}</h4>
                {col.links.map(l => <div key={l} style={{ fontSize:13, color:"var(--white3)", marginBottom:8, cursor:"pointer" }}>{l}</div>)}
              </div>
            ))}
          </div>
          <div style={{ borderTop:"1px solid var(--border2)", paddingTop:20, display:"flex", justifyContent:"space-between", alignItems:"center", fontSize:12, color:"var(--white3)" }}>
            <div>© 2026 <span style={{ color:"var(--orange)" }}>NRT</span> · Nigeria Real Time. AI-powered. Human-verified.</div>
            <div>Built on: <span style={{ color:"var(--orange)" }}>Next.js · Cerebras AI · PostgreSQL · Railway</span></div>
          </div>
        </div>
      </footer>

      {story && <StoryModal story={story} onClose={() => setStory(null)} />}
      {leak && <LeakModal onClose={() => setLeak(false)} />}
    </div>
  );
}
