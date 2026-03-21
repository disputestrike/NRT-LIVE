"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Ticker from "./components/Ticker";
import Navbar from "./components/Navbar";
import StoryModal from "./components/StoryModal";
import LeakModal from "./components/LeakModal";
import { STORIES, Story, getCatColor } from "./data/stories";

/* ── helpers ── */
function SH({ title, color = "var(--black)", href }: { title: string; color?: string; href?: string }) {
  return (
    <div className="sec-hdr">
      <div className="sec-hdr-bar" style={{ background: color }} />
      <span className="sec-hdr-title">{title}</span>
      <div className="sec-hdr-line" />
      <a href={href || "#"} className="sec-hdr-more">See All →</a>
    </div>
  );
}
function NC({ s, os, size }: { s: Story; os: (x: Story) => void; size?: string }) {
  const c = getCatColor(s.category);
  return (
    <div className="nc fade-up" onClick={() => os(s)}>
      <div className="nc-img-wrap">
        <Image src={s.image} alt={s.headline} width={400} height={225} style={{ width:"100%", aspectRatio:"16/9", objectFit:"cover" }} />
        <span className="nc-cat-pill" style={{ color: c }}>{s.category}</span>
      </div>
      <div className="nc-body">
        <div className={`nc-hl${size === "lg" ? " lg" : size === "xl" ? " xl" : ""}`}>{s.headline}</div>
        <div className="nc-snippet">{s.snippet}</div>
        <div className="nc-meta">
          <span>{s.time}</span>
          <span className={`conf-pill ${s.confidence === "Verified" ? "conf-v" : "conf-d"}`}>
            {s.confidence === "Verified" ? "✓ Verified" : "⚠ Developing"}
          </span>
        </div>
      </div>
    </div>
  );
}
function LC({ s, os }: { s: Story; os: (x: Story) => void }) {
  return (
    <div className="lc" onClick={() => os(s)}>
      <div style={{ position:"relative", width:76, height:57, flexShrink:0, borderRadius:6, overflow:"hidden" }}>
        <Image src={s.image} alt={s.headline} fill style={{ objectFit:"cover" }} sizes="76px" />
      </div>
      <div className="lc-body">
        <div className="lc-cat" style={{ color: getCatColor(s.category) }}>{s.category}</div>
        <div className="lc-hl">{s.headline}</div>
        <div className="lc-meta">{s.time}</div>
      </div>
    </div>
  );
}

const SCORES = [
  { league:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League", h:"Man City", a:"Arsenal", hs:2, as:1, st:"FT", live:false },
  { league:"🇳🇬 Super Eagles", h:"Nigeria", a:"Ghana", hs:2, as:0, st:"67'", live:true },
  { league:"🇮🇹 Serie A", h:"Napoli", a:"Juventus", hs:4, as:1, st:"FT", live:false },
  { league:"🏆 UCL", h:"Real Madrid", a:"PSG", hs:3, as:1, st:"82'", live:true },
  { league:"🇫🇷 Ligue 1", h:"Monaco", a:"Marseille", hs:2, as:2, st:"90+2'", live:true },
  { league:"🇩🇪 Bundesliga", h:"Bayern", a:"Dortmund", hs:5, as:2, st:"FT", live:false },
  { league:"🏀 NBA", h:"Lakers", a:"Celtics", hs:114, as:108, st:"FT", live:false },
  { league:"🌍 CAF", h:"Al Ahly", a:"Esperance", hs:1, as:1, st:"FT·AET", live:false },
];
const MARKET = [
  { l:"USD/NGN", v:"₦1,420", c:"▼ 0.8%", up:false }, { l:"Bitcoin", v:"$84,210", c:"▲ 2.1%", up:true },
  { l:"DANGCEM", v:"₦1,042", c:"▲ 4.9%", up:true }, { l:"MTNN", v:"₦215.4", c:"▼ 1.2%", up:false },
  { l:"Crude Oil", v:"$74.40", c:"▲ 0.6%", up:true }, { l:"Gold", v:"$2,341", c:"▲ 0.3%", up:true },
];
const TRENDS = [
  { t:"#MediaBill", n:"48.2K" }, { t:"#SuperEagles", n:"31.7K" }, { t:"#Naira", n:"27.4K" },
  { t:"#Osimhen", n:"22.1K" }, { t:"#EFCC", n:"18.9K" }, { t:"#DavidoTour", n:"15.3K" },
  { t:"#CBNRateHike", n:"12.1K" }, { t:"#Nollywood", n:"9.8K" },
];
const VIDS = [
  { s: STORIES[0], dur:"4:12", label:"AI Anchor" },
  { s: STORIES[2], dur:"2:47", label:"Sports" },
  { s: STORIES[1], dur:"3:31", label:"Economy" },
  { s: STORIES[6], dur:"5:20", label:"Entertainment" },
];
const POD_EPS = [
  { title:"Today's 7AM Briefing — Top 8 Stories", dur:"5:02" },
  { title:"Naira Crisis Deep Dive with Economists", dur:"8:14" },
  { title:"Super Eagles Squad Analysis", dur:"6:33" },
  { title:"Week in Review — March 21 2026", dur:"12:07" },
];

export default function Home() {
  const [story, setStory] = useState<Story | null>(null);
  const [leak, setLeak] = useState(false);
  const [email, setEmail] = useState("");
  const [subDone, setSubDone] = useState(false);
  const [leakData, setLeakData] = useState({ name:"", cat:"", text:"" });
  const [leakSent, setLeakSent] = useState(false);

  const s = STORIES;
  const politics = s.filter(x => x.categorySlug === "politics");
  const sports   = s.filter(x => x.categorySlug === "sports");
  const economy  = s.filter(x => x.categorySlug === "economy");
  const ent      = s.filter(x => x.categorySlug === "entertainment");
  const money    = s.filter(x => x.categorySlug === "money");
  const tech     = s.filter(x => x.categorySlug === "tech");
  const nigeria  = s.filter(x => ["nigeria","investigation","health"].includes(x.categorySlug));

  return (
    <div style={{ background:"var(--gray-bg)", minHeight:"100vh", width:"100%", maxWidth:"100vw", overflowX:"hidden" }}>
      <Ticker />
      <Navbar onLeak={() => setLeak(true)} />

      {/* Breaking bar */}
      <div className="breaking-bar">
        <span className="bb-pill">Breaking</span>
        <span style={{ fontWeight:500 }}>Senate passes Digital Media Regulation Act — critics call it attack on press freedom</span>
        <span style={{ margin:"0 8px", opacity:.4 }}>·</span>
        <span>CBN holds emergency meeting as naira hits ₦1,420</span>
      </div>

      {/* Trending topics */}
      <div className="trending-bar">
        <span className="tb-label">Trending</span>
        <div className="tb-items">
          {["#MediaBill","Super Eagles","Naira Crisis","Osimhen","EFCC Arrests","Davido Tour","CBN Rate Hike","Nollywood Record","Kaduna Tribunal","FlutterSave"].map(t => (
            <span key={t} className="tb-item" onClick={() => {}}>{t}</span>
          ))}
        </div>
      </div>

      {/* Top leaderboard ad */}
      <div className="page-wrap">
        <div className="ad-slot ad-leaderboard">
          <span className="ad-label">Advertisement</span>
          <div className="ad-inner">
            <span style={{ fontSize:22 }}>📱</span>
            <span style={{ fontSize:11, color:"var(--gray-text)", fontWeight:600 }}>Your Ad Here — Reach 2M+ Nigerians Daily</span>
            <span style={{ fontSize:10, color:"var(--orange)", cursor:"pointer", marginTop:2 }}>advertise@nrt.ng</span>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="page-wrap">
        <div className="main-grid">

          {/* ── CONTENT ── */}
          <div style={{ minWidth:0, width:"100%", overflow:"hidden" }}>

            {/* HERO */}
            <div className="hero-wrap" style={{ width:"100%", minWidth:0 }}>
              <div className="hero-main" onClick={() => setStory(s[0])}>
                <Image src={s[0].image} alt={s[0].headline} width={800} height={450} style={{ width:"100%", aspectRatio:"16/9", objectFit:"cover" }} />
                <div className="hero-overlay">
                  <span className="hero-cat-pill">{s[0].category}</span>
                  <h1 className="hero-hl">{s[0].headline}</h1>
                  <div className="hero-meta">
                    <span>{s[0].time}</span>
                    <span>·</span>
                    <span className="conf-pill conf-v" style={{ background:"rgba(255,255,255,0.2)", color:"white" }}>✓ Verified</span>
                    <span>·</span>
                    <span>NRT Newsroom</span>
                  </div>
                </div>
              </div>
              <div className="hero-side">
                {s.slice(1,5).map(st => (
                  <div key={st.id} className="hsi" onClick={() => setStory(st)}>
                    <div style={{ position:"relative", width:72, height:54, flexShrink:0, borderRadius:6, overflow:"hidden" }}>
                      <Image src={st.image} alt={st.headline} fill style={{ objectFit:"cover" }} sizes="72px" />
                    </div>
                    <div>
                      <div className="hsi-cat" style={{ color: getCatColor(st.category) }}>{st.category}</div>
                      <div className="hsi-hl">{st.headline}</div>
                      <div className="hsi-time">{st.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LATEST NEWS */}
            <SH title="Latest News" />
            <div className="card-grid-3" style={{ minWidth:0, width:"100%" }}>
              {s.slice(0,3).map(st => <NC key={st.id} s={st} os={setStory} />)}
            </div>

            {/* Inline ad */}
            <div className="ad-slot ad-leaderboard" style={{ marginTop:20 }}>
              <span className="ad-label">Advertisement</span>
              <div className="ad-inner" style={{ flexDirection:"row", gap:12 }}>
                <span style={{ fontSize:18 }}>🏦</span>
                <span style={{ fontSize:12, color:"var(--gray-text)" }}>Open a Dollar Account Today — Zero Fees for 6 Months</span>
                <span style={{ fontSize:11, color:"white", background:"var(--orange)", padding:"4px 14px", borderRadius:20, cursor:"pointer", marginLeft:"auto", flexShrink:0 }}>Learn More</span>
              </div>
            </div>

            {/* POLITICS */}
            <SH title="Politics" color="var(--red)" href="/politics" />
            <div className="card-featured" style={{ minWidth:0, width:"100%" }}>
              <NC s={politics[0] || s[0]} os={setStory} size="lg" />
              <div>
                {(politics.length > 1 ? politics.slice(1,3) : s.slice(1,3)).map(st => <LC key={st.id} s={st} os={setStory} />)}
                <Link href="/politics" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, marginTop:12, padding:"10px", background:"var(--orange-light)", borderRadius:8, fontSize:12, fontWeight:700, color:"var(--orange)", cursor:"pointer" }}>
                  More Politics →
                </Link>
              </div>
            </div>

            {/* LIVE SCORES */}
            <SH title="Live Scores" color="#007A3D" href="/sports" />
            <div className="scores-row">
              {SCORES.map((sc, i) => (
                <div key={i} className={`score-pill${sc.live ? " live-game" : ""}`} onClick={() => setStory(s[2])}>
                  <div className="sp-league">{sc.league}</div>
                  <div className="sp-row"><span className={`sp-team${sc.hs < sc.as ? " dim" : ""}`}>{sc.h}</span><span className="sp-score">{sc.hs}</span></div>
                  <div className="sp-row"><span className={`sp-team${sc.as < sc.hs ? " dim" : ""}`}>{sc.a}</span><span className="sp-score">{sc.as}</span></div>
                  <div className={sc.live ? "sp-status sp-live" : "sp-status sp-ft"}>{sc.st}</div>
                </div>
              ))}
            </div>

            {/* SPORTS */}
            <SH title="Sports" color="#007A3D" href="/sports" />
            <div className="card-grid-3" style={{ minWidth:0, width:"100%" }}>
              {sports.slice(0,3).map(st => <NC key={st.id} s={st} os={setStory} />)}
            </div>

            {/* Inline ad 2 */}
            <div className="ad-slot ad-leaderboard" style={{ marginTop:20 }}>
              <span className="ad-label">Advertisement</span>
              <div className="ad-inner" style={{ flexDirection:"row", gap:12 }}>
                <span style={{ fontSize:18 }}>🎓</span>
                <span style={{ fontSize:12, color:"var(--gray-text)" }}>Study Abroad 2026 — Scholarships Available for Nigerian Students</span>
                <span style={{ fontSize:11, color:"white", background:"var(--navy)", padding:"4px 14px", borderRadius:20, cursor:"pointer", marginLeft:"auto", flexShrink:0 }}>Apply Now</span>
              </div>
            </div>

            {/* ECONOMY */}
            <SH title="Economy & Business" color="#B45309" href="/economy" />
            <div className="card-featured" style={{ minWidth:0, width:"100%" }}>
              <NC s={economy[0] || s[1]} os={setStory} size="lg" />
              <div>
                {(economy.length > 1 ? economy.slice(1,3) : s.slice(4,6)).map(st => <LC key={st.id} s={st} os={setStory} />)}
                <Link href="/economy" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, marginTop:12, padding:"10px", background:"#FFF8EE", borderRadius:8, fontSize:12, fontWeight:700, color:"#B45309", cursor:"pointer" }}>
                  More Business →
                </Link>
              </div>
            </div>

            {/* VIDEO */}
            <SH title="Video" href="#" />
            <div className="vid-grid" style={{ minWidth:0, width:"100%" }}>
              {VIDS.map((v, i) => (
                <div key={i} className="vid-card" onClick={() => setStory(v.s)}>
                  <div className="vid-thumb">
                    <Image src={v.s.image} alt={v.s.headline} width={300} height={168} style={{ width:"100%", aspectRatio:"16/9", objectFit:"cover" }} />
                    <div className="vid-play">▶</div>
                    <span className="vid-dur">{v.dur}</span>
                  </div>
                  <div className="vid-body">
                    <div style={{ fontSize:9, fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", color:"var(--orange)", marginBottom:4 }}>{v.label}</div>
                    <div className="vid-title">{v.s.headline}</div>
                    <div className="vid-meta">NRT Video · {v.s.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* ENTERTAINMENT */}
            <SH title="Entertainment" color="#7C3AED" href="/entertainment" />
            <div className="card-grid-3" style={{ minWidth:0, width:"100%" }}>
              {[...ent, ...tech].slice(0,3).map(st => <NC key={st.id} s={st} os={setStory} />)}
            </div>

            {/* Inline ad 3 */}
            <div className="ad-slot ad-leaderboard" style={{ marginTop:20 }}>
              <span className="ad-label">Advertisement</span>
              <div className="ad-inner" style={{ flexDirection:"row", gap:12 }}>
                <span style={{ fontSize:18 }}>💊</span>
                <span style={{ fontSize:12, color:"var(--gray-text)" }}>Health Insurance Starting ₦5,000/month — NRT Partners</span>
                <span style={{ fontSize:11, color:"white", background:"#0891B2", padding:"4px 14px", borderRadius:20, cursor:"pointer", marginLeft:"auto", flexShrink:0 }}>Get Quote</span>
              </div>
            </div>

            {/* MONEY / HUSTLE */}
            <SH title="Money / Hustle" color="#007A3D" href="/money" />
            <div className="card-grid-2" style={{ minWidth:0, width:"100%" }}>
              {[...money, ...s.filter(x => x.categorySlug === "tech")].slice(0,2).map(st => <NC key={st.id} s={st} os={setStory} />)}
            </div>

            {/* PODCAST */}
            <div className="pod-strip">
              <span className="pod-icon">🎙</span>
              <div className="pod-info" style={{ flex:1 }}>
                <div className="pod-title">NRT DAILY BRIEFING</div>
                <div className="pod-desc">Your AI-hosted audio digest — top stories, delivered every morning at 7AM WAT</div>
                <div className="pod-eps">
                  {POD_EPS.map((ep, i) => (
                    <div key={i} className="pod-ep">
                      <div className="pod-ep-play">▶</div>
                      <span className="pod-ep-title">{ep.title}</span>
                      <span className="pod-ep-dur">{ep.dur}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button className="pod-cta" style={{ alignSelf:"flex-start" }}>Subscribe Free</button>
            </div>

            {/* INVESTIGATION */}
            <SH title="Investigations" color="var(--red)" href="/investigation" />
            <div className="card-grid-2" style={{ minWidth:0, width:"100%" }}>
              {[s[3], s[15]].map(st => <NC key={st.id} s={st} os={setStory} />)}
            </div>

            {/* NIGERIA / LOCAL */}
            <SH title="Nigeria" color="var(--red)" href="/nigeria" />
            <div className="card-grid-3" style={{ minWidth:0, width:"100%" }}>
              {nigeria.slice(0,3).map(st => <NC key={st.id} s={st} os={setStory} />)}
            </div>

            {/* Subscribe band */}
            <div className="sub-band">
              <h3>NEVER MISS BREAKING NEWS</h3>
              <p>Get NRT alerts delivered instantly to your inbox. No spam. Unsubscribe anytime.</p>
              <div className="sub-form">
                <input className="sub-input" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                <button className="sub-btn" onClick={() => { if(email) setSubDone(true); }}>
                  {subDone ? "✓ Done!" : "Subscribe"}
                </button>
              </div>
            </div>

            {/* MORE STORIES 4-col */}
            <SH title="More Stories" />
            <div className="card-grid-4" style={{ minWidth:0, width:"100%" }}>
              {s.slice(8,12).map(st => <NC key={st.id} s={st} os={setStory} />)}
            </div>

            {/* TECH */}
            <SH title="Tech" color="#1D4ED8" href="/tech" />
            <div className="card-grid-3" style={{ minWidth:0, width:"100%" }}>
              {[...tech, ...money].slice(0,3).map(st => <NC key={st.id} s={st} os={setStory} />)}
            </div>

            {/* HEALTH */}
            <SH title="Health" color="#0891B2" href="/health" />
            <div className="card-grid-2" style={{ minWidth:0, width:"100%" }}>
              {s.filter(x => x.categorySlug === "health").concat(s.slice(0,2)).slice(0,2).map(st => <NC key={st.id} s={st} os={setStory} />)}
            </div>

            {/* LEAK FORM */}
            <div className="leak-wrap">
              <h2>GOT A <span>LEAK?</span></h2>
              <p>Submit tips, documents, or insider information securely. All submissions are end-to-end encrypted. Your identity is never exposed — guaranteed.</p>
              {leakSent ? (
                <div style={{ textAlign:"center", padding:"20px 0" }}>
                  <div style={{ fontSize:40, marginBottom:10 }}>🔐</div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:24, color:"#6BCB77", marginBottom:6 }}>Submission Received & Encrypted</div>
                  <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)" }}>Our investigative team reviews within 24 hours. Thank you.</div>
                </div>
              ) : (
                <>
                  <div className="leak-grid">
                    <input className="fi" placeholder="Your name (optional)" value={leakData.name} onChange={e => setLeakData(d => ({...d, name:e.target.value}))} />
                    <select className="fi" value={leakData.cat} onChange={e => setLeakData(d => ({...d, cat:e.target.value}))}>
                      <option value="">Category...</option>
                      <option>Government / Corruption</option>
                      <option>Security / Military</option>
                      <option>Business / Finance</option>
                      <option>Celebrity / Entertainment</option>
                      <option>Sports</option>
                      <option>Other</option>
                    </select>
                    <textarea className="fi fi-ta" placeholder="Describe the tip or paste your information here..." value={leakData.text} onChange={e => setLeakData(d => ({...d, text:e.target.value}))} />
                  </div>
                  <button className="leak-submit" onClick={() => { if(leakData.text) setLeakSent(true); }}>🔒 Submit Securely</button>
                  <div className="leak-note">🛡 <span>End-to-end encrypted.</span> NRT never reveals sources. Nigerian whistleblower protections apply.</div>
                </>
              )}
            </div>

          </div>

          {/* ── SIDEBAR ── */}
          <div style={{ minWidth:0, width:"316px", flexShrink:0 }}>

            {/* Weather widget */}
            <div className="weather-card">
              <div className="weather-city">📍 Lagos, Nigeria</div>
              <div className="weather-temp">32°C</div>
              <div className="weather-desc">☀️ Sunny · Feels like 36°C</div>
              <div className="weather-row">
                <div className="weather-stat"><div className="weather-stat-v">82%</div><div className="weather-stat-l">Humidity</div></div>
                <div className="weather-stat"><div className="weather-stat-v">18km/h</div><div className="weather-stat-l">Wind</div></div>
                <div className="weather-stat"><div className="weather-stat-v">UV 9</div><div className="weather-stat-l">Index</div></div>
                <div className="weather-stat"><div className="weather-stat-v">Low Rain</div><div className="weather-stat-l">Today</div></div>
              </div>
            </div>

            {/* Trending */}
            <div className="widget">
              <div className="widget-hdr"><div className="widget-bar" /><div className="widget-title">Trending Now</div></div>
              <div className="widget-body">
                {TRENDS.map((t, i) => (
                  <div key={t.t} className="trend-row" onClick={() => {}}>
                    <span className="tr-rank">{i+1}</span>
                    <span className="tr-label">{t.t}</span>
                    <span className="tr-count">{t.n}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ad rect */}
            <div className="ad-slot ad-rect" style={{ marginBottom:20 }}>
              <span className="ad-label">Advertisement</span>
              <div className="ad-inner" style={{ flexDirection:"column", gap:6 }}>
                <span style={{ fontSize:28 }}>🏠</span>
                <span style={{ fontSize:12, color:"var(--gray-text)", textAlign:"center", padding:"0 10px", fontWeight:600 }}>Buy Your Dream Home in Lekki from ₦45M</span>
                <span style={{ fontSize:11, color:"white", background:"var(--orange)", padding:"6px 18px", borderRadius:20, cursor:"pointer", marginTop:4 }}>View Listings</span>
              </div>
            </div>

            {/* Market data */}
            <div className="widget">
              <div className="widget-hdr"><div className="widget-bar" style={{ background:"#007A3D" }} /><div className="widget-title">Markets Live</div></div>
              <div className="widget-body">
                {MARKET.map(m => (
                  <div key={m.l} className="market-row">
                    <span className="mr-l">{m.l}</span>
                    <span className="mr-v">{m.v}</span>
                    <span className={`mr-c ${m.up ? "up" : "down"}`}>{m.c}</span>
                  </div>
                ))}
                <div style={{ marginTop:10, padding:"8px 0", borderTop:"1px solid var(--border)", fontSize:10, color:"var(--gray-text)", textAlign:"center", cursor:"pointer" }}>
                  View Full Market Data →
                </div>
              </div>
            </div>

            {/* Must read */}
            <div className="widget">
              <div className="widget-hdr"><div className="widget-bar" style={{ background:"var(--red)" }} /><div className="widget-title">Must Read</div></div>
              <div className="widget-body">
                {s.slice(0,5).map(st => <LC key={st.id} s={st} os={setStory} />)}
              </div>
            </div>

            {/* Ad rect 2 */}
            <div className="ad-slot ad-rect" style={{ marginBottom:20 }}>
              <span className="ad-label">Advertisement</span>
              <div className="ad-inner" style={{ flexDirection:"column", gap:6 }}>
                <span style={{ fontSize:28 }}>📊</span>
                <span style={{ fontSize:12, color:"var(--gray-text)", textAlign:"center", padding:"0 10px", fontWeight:600 }}>Trade Nigerian Stocks from Your Phone — Free Account</span>
                <span style={{ fontSize:11, color:"white", background:"#007A3D", padding:"6px 18px", borderRadius:20, cursor:"pointer", marginTop:4 }}>Start Trading</span>
              </div>
            </div>

            {/* AI Transparency */}
            <div className="widget">
              <div className="widget-hdr"><div className="widget-bar" style={{ background:"#7C3AED" }} /><div className="widget-title">AI Transparency</div></div>
              <div className="widget-body" style={{ paddingTop:10 }}>
                <div style={{ fontSize:12, color:"var(--gray-text)", lineHeight:1.7 }}>
                  All NRT stories are AI-verified and carry a confidence score.<br /><br />
                  <span className="conf-pill conf-v">✓ Verified</span><br />
                  <span style={{ fontSize:11 }}>Multi-source confirmed. Safe to share.</span><br /><br />
                  <span className="conf-pill conf-d">⚠ Developing</span><br />
                  <span style={{ fontSize:11 }}>Single source. Updating live.</span><br /><br />
                  <span style={{ fontSize:11, color:"var(--gray-mid)" }}>Human editors review all content before publish. NRT is AI-powered, human-verified.</span>
                </div>
              </div>
            </div>

            {/* Podcast sidebar */}
            <div style={{ background:"var(--navy)", borderRadius:10, padding:16, marginBottom:20 }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:2, color:"white", marginBottom:4 }}>🎙 NRT PODCAST</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginBottom:12 }}>Listen on the go</div>
              {POD_EPS.slice(0,3).map((ep, i) => (
                <div key={i} style={{ display:"flex", gap:8, alignItems:"center", padding:"7px 0", borderBottom:"1px solid rgba(255,255,255,0.07)", cursor:"pointer" }}
                  onMouseEnter={e => { (e.currentTarget.style.background = "rgba(255,255,255,0.04)"); }}
                  onMouseLeave={e => { (e.currentTarget.style.background = ""); }}>
                  <span style={{ width:26, height:26, background:"var(--orange)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontSize:10, flexShrink:0 }}>▶</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:11, color:"rgba(255,255,255,0.8)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{ep.title}</div>
                    <div style={{ fontSize:9, color:"rgba(255,255,255,0.35)", marginTop:1 }}>{ep.dur}</div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop:12, textAlign:"center" }}>
                <button style={{ background:"var(--orange)", color:"white", border:"none", fontSize:11, fontWeight:700, letterSpacing:1, textTransform:"uppercase", padding:"8px 20px", borderRadius:20, cursor:"pointer" }}>All Episodes</button>
              </div>
            </div>

            {/* Newsletter sidebar */}
            <div style={{ background:"linear-gradient(135deg,var(--orange),#e04e00)", borderRadius:10, padding:16, marginBottom:20 }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:2, color:"white", marginBottom:4 }}>📬 DAILY NEWSLETTER</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.8)", marginBottom:12 }}>Top 10 stories delivered 7AM WAT, free.</div>
              <input placeholder="Enter your email" style={{ width:"100%", background:"rgba(255,255,255,0.2)", border:"1px solid rgba(255,255,255,0.35)", color:"white", fontSize:12, padding:"9px 14px", borderRadius:8, outline:"none", marginBottom:8 }} />
              <button style={{ width:"100%", background:"white", color:"var(--orange)", border:"none", fontSize:12, fontWeight:700, letterSpacing:1, textTransform:"uppercase", padding:"9px", borderRadius:8, cursor:"pointer" }}>Subscribe Free</button>
            </div>

            {/* Ad bottom rail */}
            <div className="ad-slot" style={{ height:200, borderRadius:10 }}>
              <span className="ad-label">Advertisement</span>
              <div className="ad-inner" style={{ flexDirection:"column", gap:6 }}>
                <span style={{ fontSize:24 }}>✈️</span>
                <span style={{ fontSize:11, color:"var(--gray-text)", textAlign:"center", fontWeight:600 }}>Lagos to London from ₦620,000<br/>Limited Seats Available</span>
                <span style={{ fontSize:11, color:"white", background:"var(--black)", padding:"6px 18px", borderRadius:20, cursor:"pointer", marginTop:4 }}>Book Now</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div className="footer-logo">NRT<span>.</span></div>
              <div className="footer-tagline">Nigeria Real Time — the nation&apos;s first AI-native,<br />24/7 news network. Breaking news. Deep investigation.<br />Fearless and people-powered.</div>
              <div className="footer-socials">
                {["𝕏 Twitter","WhatsApp","Telegram","TikTok","YouTube","Instagram"].map(s => (
                  <button key={s} className="soc">{s}</button>
                ))}
              </div>
              <div style={{ marginTop:12, display:"flex", gap:6 }}>
                <button className="soc">📱 App Store</button>
                <button className="soc">🤖 Google Play</button>
              </div>
            </div>
            {[
              { t:"Nigeria", l:["Politics","Lagos","Abuja","South-South","North","Economy"] },
              { t:"Sports", l:["Super Eagles","Premier League","AFCON","NBA","Athletics","CAF"] },
              { t:"Business", l:["Markets","Fintech","Oil & Gas","Agriculture","Startups","Crypto"] },
              { t:"Lifestyle", l:["Entertainment","Nollywood","Music","Travel","Fashion","Food"] },
              { t:"Company", l:["About NRT","Editorial","AI Policy","Advertise","Careers","Contact"] },
            ].map(col => (
              <div key={col.t} className="footer-col">
                <h4>{col.t}</h4>
                {col.l.map(l => <a key={l} onClick={() => {}}>{l}</a>)}
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <div>© 2026 <span>NRT</span> · Nigeria Real Time. AI-powered. Human-verified.</div>
            <div>Built on Next.js · Claude AI · PostgreSQL · Railway</div>
          </div>
        </div>
      </footer>

      {story && <StoryModal story={story} onClose={() => setStory(null)} onStory={setStory} />}
      {leak && <LeakModal onClose={() => setLeak(false)} />}
    </div>
  );
}
