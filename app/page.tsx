"use client";
import { useState } from "react";
import Ticker from "./components/Ticker";
import Navbar from "./components/Navbar";
import StoryModal from "./components/StoryModal";
import LeakModal from "./components/LeakModal";
import { STORIES, Story, getCatColor } from "./data/stories";

const getBg = (cls: string) => {
  const m: Record<string,string> = {
    "ph-pol":"linear-gradient(135deg,#1a1a2e,#16213e)",
    "ph-eco":"linear-gradient(135deg,#0d2137,#1a3a5c)",
    "ph-spo":"linear-gradient(135deg,#0d3320,#1a5c35)",
    "ph-ent":"linear-gradient(135deg,#2d0d30,#5c1a60)",
    "ph-inv":"linear-gradient(135deg,#2d0d0d,#5c1a1a)",
    "ph-mon":"linear-gradient(135deg,#1a2d0d,#3a5c1a)",
    "ph-tec":"linear-gradient(135deg,#0d1a2d,#1a355c)",
    "ph-hlt":"linear-gradient(135deg,#2d0d1a,#5c1a35)",
  };
  return m[cls] || "#1a1a1a";
};

const SCORES = [
  { league:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League", home:"Man City", away:"Arsenal", hs:2, as:1, status:"FT", live:false },
  { league:"🇳🇬 Super Eagles", home:"Nigeria", away:"Ghana", hs:2, as:0, status:"67'", live:true },
  { league:"🇮🇹 Serie A", home:"Napoli", away:"Juventus", hs:4, as:1, status:"FT", live:false },
  { league:"🏆 UCL", home:"Real Madrid", away:"PSG", hs:3, as:1, status:"82'", live:true },
  { league:"🇫🇷 Ligue 1", home:"Monaco", away:"Marseille", hs:2, as:2, status:"90+2'", live:true },
  { league:"🇩🇪 Bundesliga", home:"Bayern", away:"Dortmund", hs:5, as:2, status:"FT", live:false },
  { league:"🏀 NBA", home:"Lakers", away:"Celtics", hs:114, as:108, status:"FT", live:false },
  { league:"🌍 CAF", home:"Al Ahly", away:"Esperance", hs:1, as:1, status:"FT·AET", live:false },
];
const MARKET = [
  { l:"USD/NGN", v:"₦1,420", c:"▼ 0.8%", up:false },
  { l:"Bitcoin", v:"$84,210", c:"▲ 2.1%", up:true },
  { l:"DANGCEM", v:"₦1,042", c:"▲ 4.9%", up:true },
  { l:"MTNN", v:"₦215.4", c:"▼ 1.2%", up:false },
  { l:"Crude Oil", v:"$74.40", c:"▲ 0.6%", up:true },
  { l:"Gold", v:"$2,341", c:"▲ 0.3%", up:true },
];
const TRENDS = [
  { t:"#MediaBill", n:"48.2K" }, { t:"#SuperEagles", n:"31.7K" },
  { t:"#Naira", n:"27.4K" }, { t:"#Osimhen", n:"22.1K" },
  { t:"#EFCC", n:"18.9K" }, { t:"#DavidoTour", n:"15.3K" },
];
const VIDEOS = [
  { emoji:"🎙", title:"NRT AI Anchor: 3PM Bulletin — Top 8 Stories", dur:"4:12", ph:"ph-pol" },
  { emoji:"⚽", title:"Super Eagles Training Camp: Osimhen Drills Ahead of Qualifiers", dur:"2:47", ph:"ph-spo" },
  { emoji:"💰", title:"Naira Crisis Explained: What the CBN Decision Means for You", dur:"3:31", ph:"ph-eco" },
  { emoji:"🎵", title:"Davido Announces Africa Tour — Exclusive Interview", dur:"5:20", ph:"ph-ent" },
];

function SectionHeader({ title, color = "var(--black)" }: { title: string; color?: string }) {
  return (
    <div className="sec-hdr">
      <span className="sec-hdr-title" style={{ borderBottom:`3px solid ${color}` }}>{title}</span>
      <div className="sec-hdr-line" />
      <span className="sec-hdr-more">See All →</span>
    </div>
  );
}

function NewsCard({ s, onStory, size = "normal" }: { s: Story; onStory: (s: Story) => void; size?: string }) {
  return (
    <div className="news-card" onClick={() => onStory(s)}>
      <div style={{ background: getBg(s.phClass), aspectRatio:"16/9", display:"flex", alignItems:"center", justifyContent:"center", fontSize: size === "large" ? 44 : 30, borderRadius:"2px 2px 0 0" }}>
        {s.emoji}
      </div>
      <div className="nc-body">
        <div className="nc-cat" style={{ color: getCatColor(s.category) }}>{s.category}</div>
        <div className={`nc-hl${size === "large" ? " large" : ""}`}>{s.headline}</div>
        <div className="nc-snippet">{s.snippet}</div>
        <div className="nc-meta">
          <span>{s.time}</span>
          <span className={s.confidence === "Verified" ? "tag-verified" : "tag-developing"}>
            {s.confidence === "Verified" ? "✓ Verified" : "⚠ Developing"}
          </span>
        </div>
      </div>
    </div>
  );
}

function ListCard({ s, onStory }: { s: Story; onStory: (s: Story) => void }) {
  return (
    <div className="list-card" onClick={() => onStory(s)}>
      <div style={{ background: getBg(s.phClass), width:80, height:60, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, borderRadius:2, flexShrink:0 }}>
        {s.emoji}
      </div>
      <div className="lc-body">
        <div className="lc-cat" style={{ color: getCatColor(s.category) }}>{s.category}</div>
        <div className="lc-hl">{s.headline}</div>
        <div className="lc-meta">{s.time}</div>
      </div>
    </div>
  );
}

export default function Home() {
  const [story, setStory] = useState<Story | null>(null);
  const [leak, setLeak] = useState(false);

  return (
    <div style={{ background:"white", minHeight:"100vh" }}>
      <Ticker />
      <Navbar onLeak={() => setLeak(true)} />

      {/* Breaking Bar */}
      <div className="breaking-bar">
        <span className="bb-label">Breaking</span>
        <span className="bb-text">Senate passes Digital Media Regulation Act — critics call it attack on press freedom · CBN holds emergency meeting as naira hits ₦1,420</span>
      </div>

      {/* Trending bar */}
      <div className="trending-bar">
        <span className="tb-label">Trending</span>
        <div className="tb-items">
          {["#MediaBill","Super Eagles","Naira Crisis","Osimhen","EFCC Arrests","Davido Tour","CBN Rate Hike","Nollywood Record"].map(t => (
            <span key={t} className="tb-item">{t}</span>
          ))}
        </div>
      </div>

      {/* TOP LEADERBOARD AD */}
      <div style={{ maxWidth:1280, margin:"12px auto 0", padding:"0 20px" }}>
        <div className="ad-slot ad-leaderboard">
          <div className="ad-inner"><div className="ad-placeholder">728×90 Leaderboard Advertisement</div></div>
        </div>
      </div>

      {/* MAIN */}
      <div className="page-wrap">
        <div className="main-grid">

          {/* LEFT: CONTENT */}
          <div className="content-col">

            {/* HERO BLOCK */}
            <div className="hero-block">
              {/* Featured story */}
              <div className="hero-main" onClick={() => setStory(STORIES[0])}>
                <div style={{ background: getBg(STORIES[0].phClass), aspectRatio:"16/9", display:"flex", alignItems:"center", justifyContent:"center", fontSize:72, position:"relative" }}>
                  <span>{STORIES[0].emoji}</span>
                  {/* Orange accent bar */}
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:4, background:"var(--orange)" }} />
                </div>
                <div className="hero-overlay">
                  <div className="hero-cat" style={{ color:"var(--orange)" }}>{STORIES[0].category}</div>
                  <h1 className="hero-hl">{STORIES[0].headline}</h1>
                  <div className="hero-meta-line">{STORIES[0].time} · <span className="tag-verified" style={{ background:"rgba(255,255,255,0.2)", color:"white" }}>✓ Verified</span></div>
                </div>
              </div>

              {/* Side stack */}
              <div className="hero-side">
                {STORIES.slice(1,5).map(s => (
                  <div key={s.id} className="hero-side-item" onClick={() => setStory(s)}>
                    <div style={{ background: getBg(s.phClass), width:72, height:54, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, borderRadius:2, flexShrink:0 }}>
                      {s.emoji}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div className="hsi-cat" style={{ color: getCatColor(s.category) }}>{s.category}</div>
                      <div className="hsi-hl">{s.headline}</div>
                      <div className="hsi-time">{s.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LATEST NEWS 3-col */}
            <SectionHeader title="Latest News" />
            <div className="card-grid-3" style={{ marginBottom:24 }}>
              {STORIES.slice(0,3).map(s => <NewsCard key={s.id} s={s} onStory={setStory} />)}
            </div>

            {/* INLINE AD */}
            <div className="ad-slot" style={{ height:90, margin:"0 0 20px" }}>
              <div className="ad-inner"><div className="ad-placeholder">728×90 Inline Advertisement</div></div>
            </div>

            {/* POLITICS */}
            <SectionHeader title="Politics" color="var(--red)" />
            <div className="card-grid-featured" style={{ marginBottom:24 }}>
              <NewsCard s={STORIES[0]} onStory={setStory} size="large" />
              <div>
                {[STORIES[4], STORIES[3]].map(s => <ListCard key={s.id} s={s} onStory={setStory} />)}
              </div>
            </div>

            {/* SPORTS SCORES */}
            <div style={{ borderTop:"3px solid #007A3D", paddingTop:10, marginBottom:14 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:2 }}>Live Scores</span>
                <span style={{ fontSize:11, fontWeight:600, letterSpacing:1, textTransform:"uppercase", color:"#007A3D", cursor:"pointer" }}>All Leagues →</span>
              </div>
              <div className="scores-scroll">
                {SCORES.map((sc, i) => (
                  <div key={i} className={`score-pill${sc.live ? " live" : ""}`}>
                    <div className="sp-league">{sc.league}</div>
                    <div className="sp-row"><span className={`sp-team${sc.hs < sc.as ? " dim" : ""}`}>{sc.home}</span><span className="sp-score">{sc.hs}</span></div>
                    <div className="sp-row"><span className={`sp-team${sc.as < sc.hs ? " dim" : ""}`}>{sc.away}</span><span className="sp-score">{sc.as}</span></div>
                    <div className={`sp-status${sc.live ? " live" : " ft"}`}>{sc.status}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* SPORTS NEWS */}
            <SectionHeader title="Sports" color="#007A3D" />
            <div className="card-grid-3" style={{ marginBottom:24 }}>
              {STORIES.filter(s => s.categorySlug === "sports").slice(0,3).map(s => <NewsCard key={s.id} s={s} onStory={setStory} />)}
            </div>

            {/* INLINE AD */}
            <div className="ad-slot" style={{ height:90, margin:"0 0 20px" }}>
              <div className="ad-inner"><div className="ad-placeholder">728×90 Inline Advertisement</div></div>
            </div>

            {/* ECONOMY / BUSINESS */}
            <SectionHeader title="Economy & Business" color="#B45309" />
            <div className="card-grid-featured" style={{ marginBottom:24 }}>
              <NewsCard s={STORIES[5]} onStory={setStory} size="large" />
              <div>
                {[STORIES[1], STORIES[11]].map(s => <ListCard key={s.id} s={s} onStory={setStory} />)}
              </div>
            </div>

            {/* VIDEO SECTION */}
            <SectionHeader title="Video" />
            <div className="video-row" style={{ marginBottom:24 }}>
              {VIDEOS.map((v, i) => (
                <div key={i} className="vid-card">
                  <div className="vid-thumb" style={{ background: getBg(v.ph), display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, position:"relative" }}>
                    <span>{v.emoji}</span>
                    <div className="vid-play">▶</div>
                  </div>
                  <div className="vid-title">{v.title}</div>
                  <div className="vid-dur">▶ {v.dur}</div>
                </div>
              ))}
            </div>

            {/* ENTERTAINMENT */}
            <SectionHeader title="Entertainment" color="#7C3AED" />
            <div className="card-grid-3" style={{ marginBottom:24 }}>
              {STORIES.filter(s => s.categorySlug === "entertainment").slice(0,2).concat(STORIES.filter(s => s.categorySlug === "tech").slice(0,1)).map(s => <NewsCard key={s.id} s={s} onStory={setStory} />)}
            </div>

            {/* INLINE AD */}
            <div className="ad-slot" style={{ height:90, margin:"0 0 20px" }}>
              <div className="ad-inner"><div className="ad-placeholder">728×90 Inline Advertisement</div></div>
            </div>

            {/* MONEY & HUSTLE */}
            <SectionHeader title="Money / Hustle" color="#007A3D" />
            <div className="card-grid-2" style={{ marginBottom:24 }}>
              {STORIES.filter(s => s.categorySlug === "money").slice(0,2).map(s => <NewsCard key={s.id} s={s} onStory={setStory} />)}
            </div>

            {/* PODCAST STRIP */}
            <div className="podcast-strip">
              <span className="pod-icon">🎙</span>
              <div className="pod-info">
                <div className="pod-title">NRT DAILY BRIEFING</div>
                <div className="pod-desc">Your 5-minute AI-hosted audio digest — top stories, delivered every morning at 7AM WAT</div>
              </div>
              <button className="pod-btn">▶ Listen Now</button>
            </div>

            {/* INVESTIGATION */}
            <SectionHeader title="Investigations" color="#CC0000" />
            <div className="card-grid-2" style={{ marginBottom:24 }}>
              {[STORIES[3], STORIES[0]].map(s => <NewsCard key={s.id} s={s} onStory={setStory} />)}
            </div>

            {/* MORE NEWS 4-col */}
            <SectionHeader title="More Stories" />
            <div className="card-grid-4" style={{ marginBottom:24 }}>
              {STORIES.slice(5,9).map(s => <NewsCard key={s.id} s={s} onStory={setStory} />)}
            </div>

            {/* LEAK BAND */}
            <div className="leak-band">
              <h2>GOT A <span>LEAK?</span></h2>
              <p>Submit tips, documents, or insider information securely. All submissions are encrypted and reviewed by our investigative team. Your identity is never exposed.</p>
              <div className="leak-form" style={{ marginBottom:12 }}>
                <input className="leak-input" placeholder="Your name (optional)" />
                <select className="leak-select">
                  <option value="">Category...</option>
                  <option>Government / Corruption</option>
                  <option>Security / Military</option>
                  <option>Business / Finance</option>
                  <option>Celebrity / Entertainment</option>
                  <option>Sports</option>
                  <option>Other</option>
                </select>
                <textarea className="leak-textarea" placeholder="Describe the tip or paste information here..." />
              </div>
              <button className="btn-submit" onClick={() => alert('Submission encrypted. Our team reviews within 24 hours.')}>🔒 Submit Securely</button>
              <div className="anon-note">🛡 <span>End-to-end encrypted.</span> NRT never reveals sources. Nigerian whistleblower protections apply.</div>
            </div>

          </div>

          {/* RIGHT: SIDEBAR */}
          <div className="sidebar-col">

            {/* Trending */}
            <div className="widget">
              <div className="widget-title">Trending <span>Now</span></div>
              {TRENDS.map((t, i) => (
                <div key={t.t} className="trend-row">
                  <span className="tr-rank">{i+1}</span>
                  <span className="tr-label">{t.t}</span>
                  <span className="tr-count">{t.n} posts</span>
                </div>
              ))}
            </div>

            {/* Ad */}
            <div className="ad-slot ad-rect" style={{ marginBottom:24 }}>
              <div className="ad-inner"><div className="ad-placeholder">300×250<br/>Advertisement</div></div>
            </div>

            {/* Market */}
            <div className="widget">
              <div className="widget-title">Markets <span>Live</span></div>
              {MARKET.map(m => (
                <div key={m.l} className="market-row">
                  <span className="mr-label">{m.l}</span>
                  <span className="mr-val">{m.v}</span>
                  <span className={`mr-chg ${m.up ? "up" : "down"}`}>{m.c}</span>
                </div>
              ))}
            </div>

            {/* Must Read */}
            <div className="widget" style={{ marginTop:24 }}>
              <div className="widget-title">Must <span>Read</span></div>
              {STORIES.slice(0,5).map(s => <ListCard key={s.id} s={s} onStory={setStory} />)}
            </div>

            {/* Ad rail */}
            <div className="ad-slot" style={{ height:250, marginTop:24, marginBottom:24 }}>
              <div className="ad-inner"><div className="ad-placeholder">300×250<br/>Advertisement</div></div>
            </div>

            {/* AI Confidence */}
            <div className="widget">
              <div className="widget-title">AI <span>Transparency</span></div>
              <div style={{ padding:"10px 0", fontSize:12, color:"var(--gray-text)", lineHeight:1.7 }}>
                All NRT stories carry an AI confidence score.<br /><br />
                <span className="tag-verified">✓ Verified</span> — Multi-source confirmed<br /><br />
                <span className="tag-developing">⚠ Developing</span> — Single source, updating<br /><br />
                Human editors review all content before publish. NRT is AI-powered, human-verified.
              </div>
            </div>

            {/* Podcast widget */}
            <div style={{ background:"var(--navy)", padding:16, borderRadius:3, marginTop:24 }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:16, letterSpacing:2, color:"white", marginBottom:6 }}>🎙 NRT PODCAST</div>
              {["Today&apos;s 7AM Briefing · 5min","Week in Review · 12min","Naira Crisis Deep Dive · 8min"].map((p, i) => (
                <div key={i} style={{ display:"flex", gap:8, alignItems:"center", padding:"8px 0", borderBottom:"1px solid rgba(255,255,255,0.08)", cursor:"pointer" }}>
                  <span style={{ color:"var(--orange)", fontSize:16 }}>▶</span>
                  <span style={{ fontSize:12, color:"#ccc" }}>{p}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24, paddingBottom:24, borderBottom:"1px solid rgba(255,255,255,0.1)" }}>
            <div>
              <div className="footer-logo">NRT<span>.</span></div>
              <div className="footer-tagline">Nigeria Real Time — AI-powered. Human-verified. 24/7.</div>
              <div className="footer-socials">
                {["X / Twitter","WhatsApp","Telegram","TikTok","YouTube","Instagram"].map(s => (
                  <button key={s} className="soc-btn">{s}</button>
                ))}
              </div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:11, color:"#888", marginBottom:6 }}>DOWNLOAD APP</div>
              <div style={{ display:"flex", gap:8 }}>
                <button className="soc-btn">📱 App Store</button>
                <button className="soc-btn">🤖 Google Play</button>
              </div>
            </div>
          </div>
          <div className="footer-grid">
            {[
              { t:"Nigeria", l:["Politics","Lagos","Abuja","Economy","Security","Education"] },
              { t:"Africa", l:["East Africa","West Africa","Southern Africa","North Africa","CAF"] },
              { t:"World", l:["US & Americas","Europe","Middle East","Asia","UK"] },
              { t:"Sports", l:["Super Eagles","Premier League","AFCON","NBA","Athletics"] },
              { t:"Business", l:["Markets","Fintech","Oil & Gas","Agriculture","Startups"] },
              { t:"Entertainment", l:["Nollywood","Music","Celebrity","Lifestyle","Fashion"] },
              { t:"Money", l:["Personal Finance","Crypto","Jobs","Side Hustles","Investing"] },
              { t:"Company", l:["About NRT","Editorial","AI Policy","Advertise","Careers","Contact"] },
            ].map(col => (
              <div key={col.t} className="footer-col">
                <h4>{col.t}</h4>
                {col.l.map(l => <a key={l}>{l}</a>)}
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <div>© 2026 <span style={{ color:"var(--orange)" }}>NRT</span> · Nigeria Real Time. AI-powered. Human-verified.</div>
            <div style={{ color:"#555" }}>Built on Next.js · Cerebras AI · PostgreSQL · Railway</div>
          </div>
        </div>
      </footer>

      {story && <StoryModal story={story} onClose={() => setStory(null)} onStory={setStory} />}
      {leak && <LeakModal onClose={() => setLeak(false)} />}
    </div>
  );
}
