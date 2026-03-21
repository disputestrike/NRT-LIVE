"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Ticker from "./components/Ticker";
import Navbar from "./components/Navbar";
import StoryModal from "./components/StoryModal";
import LeakModal from "./components/LeakModal";
import { S, Story, getCatColor } from "./data/stories";

/* ── Shared helpers ─────────────────────────────────────────── */
function SH({ title, color="var(--black)", href="/" }: { title:string; color?:string; href?:string }) {
  return (
    <div className="sec-hdr">
      <div className="sec-hdr-bar" style={{ background:color }} />
      <span className="sec-hdr-title">{title}</span>
      <div className="sec-hdr-line" />
      <Link href={href} className="sec-hdr-more">See All →</Link>
    </div>
  );
}

function NC({ s, os, size="sm" }: { s:Story; os:(x:Story)=>void; size?:"sm"|"md"|"lg" }) {
  const c = getCatColor(s.category);
  return (
    <div className="nc fade-up" onClick={() => os(s)}>
      <div className="nc-img-wrap">
        <Image src={s.image} alt={s.headline} width={480} height={270}
          style={{ width:"100%", aspectRatio:"16/9", objectFit:"cover", display:"block" }} />
        <span className="nc-cat-pill" style={{ color:c }}>{s.category}</span>
      </div>
      <div className="nc-body">
        <div className={`nc-hl${size==="lg"?" lg":size==="md"?" md":""}`}>{s.headline}</div>
        <div className="nc-snippet">{s.snippet}</div>
        <div className="nc-meta">
          <span>{s.time}</span>
          <span className={`conf-pill ${s.confidence==="Verified"?"conf-v":"conf-d"}`}>
            {s.confidence==="Verified"?"✓ Verified":"⚠ Developing"}
          </span>
        </div>
      </div>
    </div>
  );
}

function LC({ s, os }: { s:Story; os:(x:Story)=>void }) {
  return (
    <div className="lc" onClick={() => os(s)}>
      <div style={{ position:"relative", width:76, height:57, flexShrink:0, borderRadius:6, overflow:"hidden" }}>
        <Image src={s.image} alt={s.headline} fill style={{ objectFit:"cover" }} sizes="76px" />
      </div>
      <div className="lc-body">
        <div className="lc-cat" style={{ color:getCatColor(s.category) }}>{s.category}</div>
        <div className="lc-hl">{s.headline}</div>
        <div className="lc-meta">{s.time}</div>
      </div>
    </div>
  );
}

const SCORES = [
  { league:"🇳🇬 Super Eagles", h:"Nigeria", a:"Ghana", hs:2, as:0, st:"67'", live:true },
  { league:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League", h:"Man City", a:"Arsenal", hs:2, as:1, st:"FT", live:false },
  { league:"🏆 UCL", h:"Real Madrid", a:"PSG", hs:3, as:1, st:"82'", live:true },
  { league:"🇮🇹 Serie A", h:"Napoli", a:"Juventus", hs:4, as:1, st:"FT", live:false },
  { league:"🇫🇷 Ligue 1", h:"Monaco", a:"Marseille", hs:2, as:2, st:"90+3'", live:true },
  { league:"🇩🇪 Bundesliga", h:"Bayern", a:"Dortmund", hs:5, as:2, st:"FT", live:false },
  { league:"🏀 NBA", h:"Bucks", a:"Celtics", hs:109, as:107, st:"OT", live:true },
  { league:"🌍 CAF CL", h:"Al Ahly", a:"Esperance", hs:1, as:1, st:"FT·AET", live:false },
];
const MARKET = [
  { l:"USD/NGN",  v:"₦1,420", c:"▼ 0.8%", up:false },
  { l:"Bitcoin",  v:"$84,210", c:"▲ 2.1%", up:true },
  { l:"DANGCEM", v:"₦1,042", c:"▲ 4.9%", up:true },
  { l:"MTNN",    v:"₦215.4", c:"▼ 1.2%", up:false },
  { l:"Crude Oil",v:"$74.40", c:"▲ 0.6%", up:true },
  { l:"Gold",    v:"$2,341", c:"▲ 0.3%", up:true },
];
const TRENDS = [
  { t:"#MediaBill", n:"48.2K" }, { t:"#SuperEagles", n:"31.7K" },
  { t:"#Naira", n:"27.4K" },     { t:"#Osimhen", n:"22.1K" },
  { t:"#EFCC", n:"18.9K" },      { t:"#DavidoTour", n:"15.3K" },
  { t:"#CBNRateHike", n:"12.1K"}, { t:"#Nollywood", n:"9.8K" },
];
const POD_EPS = [
  { title:"Today's 7AM Briefing — Top 8 Stories", dur:"5:02" },
  { title:"Naira Crisis Deep Dive with Economists", dur:"8:14" },
  { title:"Super Eagles Squad Analysis", dur:"6:33" },
  { title:"Week in Review — March 21, 2026", dur:"12:07" },
];

/* ── Ad slot component ──────────────────────────────────────── */
function Ad({ h=90, icon="", msg="", cta="", ctaColor="var(--orange)" }:
  { h?:number; icon?:string; msg?:string; cta?:string; ctaColor?:string }) {
  return (
    <div className="ad-slot" style={{ height:h, marginBottom:h>90?20:0 }}>
      <span className="ad-label">Advertisement</span>
      <div className="ad-inner" style={{ flexDirection:h>90?"column":"row", gap:h>90?6:12 }}>
        {icon && <span style={{ fontSize:h>90?28:18 }}>{icon}</span>}
        <span style={{ fontSize:12, color:"var(--gray-text)", fontWeight:600, textAlign:h>90?"center":"left", padding:h>90?"0 10px":"0" }}>{msg}</span>
        {cta && <span style={{ fontSize:11, color:"white", background:ctaColor, padding:"5px 16px", borderRadius:20, cursor:"pointer", flexShrink:0, marginLeft:h>90?0:"auto", marginTop:h>90?4:0 }}>{cta}</span>}
      </div>
    </div>
  );
}

export default function Home() {
  const [story, setStory] = useState<Story|null>(null);
  const [leak, setLeak]   = useState(false);
  const [email, setEmail] = useState("");
  const [subDone, setSubDone] = useState(false);
  const [ld, setLd] = useState({ name:"", cat:"", text:"" });
  const [lSent, setLSent] = useState(false);

  /* Hero = top politics story, sidebar = mix of categories */
  const hero     = S.politics[0];
  const heroSide = [S.economy[1], S.sports[1], S.nigeria[1], S.entertainment[0]];

  return (
    <div style={{ background:"var(--gray-bg)", minHeight:"100vh", width:"100%", maxWidth:"100vw", overflowX:"hidden" }}>
      <Ticker />
      <Navbar onLeak={() => setLeak(true)} />

      {/* Breaking bar */}
      <div className="breaking-bar">
        <span className="bb-pill">Breaking</span>
        <span style={{ fontWeight:500 }}>{hero.headline}</span>
        <span style={{ margin:"0 10px", opacity:.35 }}>·</span>
        <span>CBN emergency MPC session underway as naira hits ₦1,420</span>
      </div>

      {/* Trending */}
      <div className="trending-bar">
        <span className="tb-label">Trending</span>
        <div className="tb-items">
          {["#MediaBill","Super Eagles","Naira Crisis","Osimhen","EFCC Arrests","Davido Tour","CBN Rate Hike","Nollywood Record","Kaduna Tribunal","Tyla Grammy","Efe Ajagba","AfCFTA"].map(t => (
            <span key={t} className="tb-item">{t}</span>
          ))}
        </div>
      </div>

      {/* Top leaderboard ad */}
      <div className="page-wrap">
        <Ad h={90} icon="🏦" msg="Open a Dollar Account Today — Zero Fees for 6 Months" cta="Get Started" />
      </div>

      <div className="page-wrap">
        <div className="main-grid">

          {/* ════ CONTENT COLUMN ════ */}
          <div style={{ minWidth:0, width:"100%", overflow:"hidden" }}>

            {/* HERO BLOCK */}
            <div className="hero-wrap">
              <div className="hero-main" onClick={() => setStory(hero)}>
                <Image src={hero.image} alt={hero.headline} width={780} height={439}
                  style={{ width:"100%", aspectRatio:"16/9", objectFit:"cover", display:"block" }} />
                <div className="hero-overlay">
                  <span className="hero-cat-pill">{hero.category}</span>
                  <h1 className="hero-hl">{hero.headline}</h1>
                  <div className="hero-meta">
                    <span>{hero.time}</span>
                    <span>·</span>
                    <span className="conf-pill conf-v" style={{ background:"rgba(255,255,255,0.18)", color:"white" }}>✓ Verified</span>
                    <span>·</span>
                    <span>NRT Newsroom</span>
                  </div>
                </div>
              </div>
              <div className="hero-side">
                {heroSide.map(st => (
                  <div key={st.id} className="hsi" onClick={() => setStory(st)}>
                    <div style={{ position:"relative", width:72, height:54, flexShrink:0, borderRadius:6, overflow:"hidden" }}>
                      <Image src={st.image} alt={st.headline} fill style={{ objectFit:"cover" }} sizes="72px" />
                    </div>
                    <div>
                      <div className="hsi-cat" style={{ color:getCatColor(st.category) }}>{st.category}</div>
                      <div className="hsi-hl">{st.headline}</div>
                      <div className="hsi-time">{st.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LATEST — 3 different categories */}
            <SH title="Latest News" />
            <div className="card-grid-3" style={{ minWidth:0, width:"100%" }}>
              <NC s={S.economy[0]}       os={setStory} />
              <NC s={S.investigation[0]} os={setStory} />
              <NC s={S.africa[0]}        os={setStory} />
            </div>

            <Ad h={90} icon="🎓" msg="Study Abroad 2026 — Scholarships Available for Nigerian Students" cta="Apply Now" ctaColor="var(--navy)" />

            {/* POLITICS — 2 col featured + list */}
            <SH title="Politics" color="var(--red)" href="/politics" />
            <div className="card-featured" style={{ minWidth:0, width:"100%" }}>
              <NC s={S.politics[1]} os={setStory} size="lg" />
              <div>
                <LC s={S.politics[2]} os={setStory} />
                <LC s={S.politics[3]} os={setStory} />
                <Link href="/politics" style={{ display:"flex", alignItems:"center", justifyContent:"center", marginTop:12, padding:"10px", background:"#FFF0F0", borderRadius:8, fontSize:12, fontWeight:700, color:"var(--red)" }}>
                  More Politics →
                </Link>
              </div>
            </div>

            {/* LIVE SCORES */}
            <SH title="Live Scores" color="#007A3D" href="/sports" />
            <div className="scores-row" style={{ width:"100%", maxWidth:"100%" }}>
              {SCORES.map((sc, i) => (
                <div key={i} className={`score-pill${sc.live?" live-game":""}`} onClick={() => setStory(S.sports[0])}>
                  <div className="sp-league">{sc.league}</div>
                  <div className="sp-row"><span className={`sp-team${sc.hs<sc.as?" dim":""}`}>{sc.h}</span><span className="sp-score">{sc.hs}</span></div>
                  <div className="sp-row"><span className={`sp-team${sc.as<sc.hs?" dim":""}`}>{sc.a}</span><span className="sp-score">{sc.as}</span></div>
                  <div className={sc.live?"sp-status sp-live":"sp-status sp-ft"}>{sc.st}</div>
                </div>
              ))}
            </div>

            {/* SPORTS — 3 distinct sports */}
            <SH title="Sports" color="#007A3D" href="/sports" />
            <div className="card-grid-3" style={{ minWidth:0, width:"100%" }}>
              <NC s={S.sports[0]} os={setStory} />
              <NC s={S.sports[1]} os={setStory} />
              <NC s={S.sports[4]} os={setStory} />
            </div>

            <Ad h={90} icon="💊" msg="Health Insurance Starting ₦5,000/month — NRT Partners" cta="Get Quote" ctaColor="#0891B2" />

            {/* ECONOMY — featured + 2 list */}
            <SH title="Economy & Business" color="#B45309" href="/economy" />
            <div className="card-featured" style={{ minWidth:0, width:"100%" }}>
              <NC s={S.economy[1]} os={setStory} size="lg" />
              <div>
                <LC s={S.economy[2]} os={setStory} />
                <LC s={S.economy[3]} os={setStory} />
                <Link href="/economy" style={{ display:"flex", alignItems:"center", justifyContent:"center", marginTop:12, padding:"10px", background:"#FFF8EE", borderRadius:8, fontSize:12, fontWeight:700, color:"#B45309" }}>
                  More Business →
                </Link>
              </div>
            </div>

            {/* VIDEO ROW */}
            <SH title="Video" />
            <div className="vid-grid" style={{ minWidth:0, width:"100%" }}>
              {[S.politics[1], S.sports[3], S.economy[2], S.entertainment[1]].map((st, i) => (
                <div key={i} className="vid-card" onClick={() => setStory(st)}>
                  <div className="vid-thumb">
                    <Image src={st.image} alt={st.headline} width={280} height={158}
                      style={{ width:"100%", aspectRatio:"16/9", objectFit:"cover", display:"block" }} />
                    <div className="vid-play">▶</div>
                    <span className="vid-dur">{["4:12","2:47","3:31","5:20"][i]}</span>
                  </div>
                  <div className="vid-body">
                    <div style={{ fontSize:9, fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", color:getCatColor(st.category), marginBottom:4 }}>{st.category}</div>
                    <div className="vid-title">{st.headline}</div>
                    <div className="vid-meta">NRT Video · {st.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* ENTERTAINMENT — Africa-wide, not just Nigeria */}
            <SH title="Entertainment & Culture" color="#7C3AED" href="/entertainment" />
            <div className="card-grid-3" style={{ minWidth:0, width:"100%" }}>
              <NC s={S.entertainment[0]} os={setStory} />
              <NC s={S.entertainment[2]} os={setStory} />
              <NC s={S.entertainment[3]} os={setStory} />
            </div>

            {/* AFRICA */}
            <SH title="Africa" color="#D97706" href="/africa" />
            <div className="card-grid-3" style={{ minWidth:0, width:"100%" }}>
              <NC s={S.africa[0]} os={setStory} />
              <NC s={S.africa[1]} os={setStory} />
              <NC s={S.africa[2]} os={setStory} />
            </div>

            <Ad h={90} icon="✈️" msg="Lagos to London from ₦620,000 — Limited Seats" cta="Book Now" ctaColor="var(--black)" />

            {/* MONEY / HUSTLE */}
            <SH title="Money / Hustle" color="#007A3D" href="/money" />
            <div className="card-grid-2" style={{ minWidth:0, width:"100%" }}>
              <NC s={S.money[0]} os={setStory} size="md" />
              <NC s={S.money[1]} os={setStory} size="md" />
            </div>

            {/* PODCAST STRIP */}
            <div className="pod-strip">
              <span className="pod-icon">🎙</span>
              <div style={{ flex:1 }}>
                <div className="pod-title">NRT DAILY BRIEFING</div>
                <div className="pod-desc">Your AI-hosted audio digest — top stories delivered every morning at 7AM WAT. Free, forever.</div>
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

            {/* INVESTIGATIONS */}
            <SH title="Investigations" color="var(--red)" href="/investigation" />
            <div className="card-grid-2" style={{ minWidth:0, width:"100%" }}>
              <NC s={S.investigation[0]} os={setStory} size="md" />
              <NC s={S.investigation[1]} os={setStory} size="md" />
            </div>

            {/* TECH */}
            <SH title="Tech" color="#1D4ED8" href="/tech" />
            <div className="card-grid-2" style={{ minWidth:0, width:"100%" }}>
              <NC s={S.tech[0]} os={setStory} size="md" />
              <NC s={S.tech[1]} os={setStory} size="md" />
            </div>

            {/* NIGERIA LOCAL */}
            <SH title="Nigeria" color="var(--red)" href="/nigeria" />
            <div className="card-grid-3" style={{ minWidth:0, width:"100%" }}>
              <NC s={S.nigeria[0]} os={setStory} />
              <NC s={S.nigeria[1]} os={setStory} />
              <NC s={S.nigeria[2]} os={setStory} />
            </div>

            {/* Subscribe band */}
            <div className="sub-band">
              <h3>NEVER MISS BREAKING NEWS</h3>
              <p>Get NRT alerts delivered instantly to your inbox. No spam. Unsubscribe anytime. Join 240,000+ Nigerians already subscribed.</p>
              <div className="sub-form">
                <input className="sub-input" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                <button className="sub-btn" onClick={() => { if(email) setSubDone(true); }}>
                  {subDone ? "✓ Subscribed!" : "Subscribe Free"}
                </button>
              </div>
            </div>

            {/* MORE STORIES — mixed 4-col */}
            <SH title="More Stories" />
            <div className="card-grid-4" style={{ minWidth:0, width:"100%" }}>
              <NC s={S.sports[3]}       os={setStory} />
              <NC s={S.sports[4]}       os={setStory} />
              <NC s={S.africa[2]}       os={setStory} />
              <NC s={S.politics[3]}     os={setStory} />
            </div>

            {/* LEAK FORM */}
            <div className="leak-wrap">
              <h2>GOT A <span>LEAK?</span></h2>
              <p>Submit tips, documents, or insider information securely. All submissions are end-to-end encrypted. Your identity is never exposed — guaranteed by Nigerian whistleblower law.</p>
              {lSent ? (
                <div style={{ textAlign:"center", padding:"24px 0" }}>
                  <div style={{ fontSize:48, marginBottom:12 }}>🔐</div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:24, color:"#6BCB77", marginBottom:6, letterSpacing:2 }}>Submission Received & Encrypted</div>
                  <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)" }}>Our investigative team reviews within 24 hours.</div>
                </div>
              ) : (
                <>
                  <div className="leak-grid">
                    <input className="fi" placeholder="Your name (optional)" value={ld.name} onChange={e => setLd(d=>({...d,name:e.target.value}))} />
                    <select className="fi" value={ld.cat} onChange={e => setLd(d=>({...d,cat:e.target.value}))}>
                      <option value="">Category...</option>
                      {["Government / Corruption","Security / Military","Business / Finance","Celebrity / Entertainment","Sports","Other"].map(o=><option key={o}>{o}</option>)}
                    </select>
                    <textarea className="fi fi-ta" placeholder="Describe the tip or paste your information here..." value={ld.text} onChange={e => setLd(d=>({...d,text:e.target.value}))} />
                  </div>
                  <button className="leak-submit" onClick={() => { if(ld.text) setLSent(true); }}>🔒 Submit Securely</button>
                  <div className="leak-note">🛡 <span>End-to-end encrypted.</span> NRT never reveals sources. Nigerian whistleblower protections apply.</div>
                </>
              )}
            </div>

          </div>

          {/* ════ SIDEBAR ════ */}
          <div style={{ minWidth:0, width:"100%" }}>

            {/* Weather */}
            <div className="weather-card">
              <div className="weather-city">📍 Lagos, Nigeria</div>
              <div className="weather-temp">32°C</div>
              <div className="weather-desc">☀️ Sunny · Feels like 36°C</div>
              <div className="weather-row">
                <div className="weather-stat"><div className="weather-stat-v">82%</div><div className="weather-stat-l">Humidity</div></div>
                <div className="weather-stat"><div className="weather-stat-v">18 km/h</div><div className="weather-stat-l">Wind</div></div>
                <div className="weather-stat"><div className="weather-stat-v">UV 9</div><div className="weather-stat-l">Index</div></div>
                <div className="weather-stat"><div className="weather-stat-v">Low</div><div className="weather-stat-l">Rain Risk</div></div>
              </div>
            </div>

            {/* Trending */}
            <div className="widget">
              <div className="widget-hdr"><div className="widget-bar" /><div className="widget-title">Trending Now</div></div>
              <div className="widget-body">
                {TRENDS.map((t,i) => (
                  <div key={t.t} className="trend-row">
                    <span className="tr-rank">{i+1}</span>
                    <span className="tr-label">{t.t}</span>
                    <span className="tr-count">{t.n}</span>
                  </div>
                ))}
              </div>
            </div>

            <Ad h={250} icon="🏠" msg="Buy Your Dream Home in Lekki from ₦45M" cta="View Listings" ctaColor="var(--orange)" />

            {/* Markets */}
            <div className="widget">
              <div className="widget-hdr"><div className="widget-bar" style={{ background:"#007A3D" }} /><div className="widget-title">Markets Live</div></div>
              <div className="widget-body">
                {MARKET.map(m => (
                  <div key={m.l} className="market-row">
                    <span className="mr-l">{m.l}</span>
                    <span className="mr-v">{m.v}</span>
                    <span className={`mr-c ${m.up?"up":"down"}`}>{m.c}</span>
                  </div>
                ))}
                <div style={{ marginTop:10, paddingTop:8, borderTop:"1px solid var(--border)", fontSize:10, color:"var(--orange)", textAlign:"center", cursor:"pointer", fontWeight:600 }}>
                  Full Market Data →
                </div>
              </div>
            </div>

            {/* Must read — mix of categories */}
            <div className="widget">
              <div className="widget-hdr"><div className="widget-bar" style={{ background:"var(--red)" }} /><div className="widget-title">Must Read</div></div>
              <div className="widget-body">
                <LC s={S.politics[1]}      os={setStory} />
                <LC s={S.economy[2]}       os={setStory} />
                <LC s={S.sports[2]}        os={setStory} />
                <LC s={S.entertainment[2]} os={setStory} />
                <LC s={S.tech[0]}          os={setStory} />
              </div>
            </div>

            <Ad h={250} icon="📊" msg="Trade Nigerian Stocks from Your Phone — Free Account" cta="Start Trading" ctaColor="#007A3D" />

            {/* AI Transparency */}
            <div className="widget">
              <div className="widget-hdr"><div className="widget-bar" style={{ background:"#7C3AED" }} /><div className="widget-title">AI Transparency</div></div>
              <div className="widget-body" style={{ paddingTop:10 }}>
                <p style={{ fontSize:12, color:"var(--gray-text)", lineHeight:1.7, marginBottom:10 }}>All NRT stories are AI-verified and carry a live confidence score.</p>
                <span className="conf-pill conf-v">✓ Verified</span>
                <p style={{ fontSize:11, color:"var(--gray-text)", margin:"4px 0 12px 0" }}>Multi-source confirmed. Safe to share.</p>
                <span className="conf-pill conf-d">⚠ Developing</span>
                <p style={{ fontSize:11, color:"var(--gray-text)", margin:"4px 0 0 0" }}>Single source, updating live. Handle with care.</p>
              </div>
            </div>

            {/* Podcast widget */}
            <div style={{ background:"var(--navy)", borderRadius:10, padding:16, marginBottom:20 }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:2, color:"white", marginBottom:4 }}>🎙 NRT PODCAST</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginBottom:12 }}>Listen on the go — daily episodes</div>
              {POD_EPS.slice(0,3).map((ep,i) => (
                <div key={i} style={{ display:"flex", gap:8, alignItems:"center", padding:"7px 0", borderBottom:"1px solid rgba(255,255,255,0.07)", cursor:"pointer" }}>
                  <span style={{ width:26, height:26, background:"var(--orange)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontSize:10, flexShrink:0 }}>▶</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:11, color:"rgba(255,255,255,0.8)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{ep.title}</div>
                    <div style={{ fontSize:9, color:"rgba(255,255,255,0.35)", marginTop:1 }}>{ep.dur}</div>
                  </div>
                </div>
              ))}
              <button style={{ marginTop:12, width:"100%", background:"var(--orange)", color:"white", border:"none", fontSize:11, fontWeight:700, letterSpacing:1, textTransform:"uppercase", padding:"9px", borderRadius:8, cursor:"pointer" }}>All Episodes</button>
            </div>

            {/* Newsletter */}
            <div style={{ background:"linear-gradient(135deg,var(--orange),#c44400)", borderRadius:10, padding:16, marginBottom:20 }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:2, color:"white", marginBottom:4 }}>📬 DAILY NEWSLETTER</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.8)", marginBottom:12 }}>Top 10 stories delivered 7AM WAT. Free.</div>
              <input placeholder="Enter your email"
                style={{ width:"100%", background:"rgba(255,255,255,0.2)", border:"1px solid rgba(255,255,255,0.35)", color:"white", fontSize:12, padding:"9px 14px", borderRadius:8, outline:"none", marginBottom:8 }} />
              <button style={{ width:"100%", background:"white", color:"var(--orange)", border:"none", fontSize:12, fontWeight:700, letterSpacing:1, textTransform:"uppercase", padding:"9px", borderRadius:8, cursor:"pointer" }}>Subscribe Free</button>
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
              <div style={{ marginTop:10, display:"flex", gap:6 }}>
                <button className="soc">📱 App Store</button>
                <button className="soc">🤖 Google Play</button>
              </div>
            </div>
            {[
              { t:"Nigeria",   l:["Politics","Lagos","Abuja","South-South","North","Economy"] },
              { t:"Sports",    l:["Super Eagles","Premier League","AFCON","NBA","Athletics","CAF"] },
              { t:"Business",  l:["Markets","Fintech","Oil & Gas","Agriculture","Startups","Crypto"] },
              { t:"Lifestyle", l:["Entertainment","Nollywood","Music","Travel","Fashion","Food"] },
              { t:"Company",   l:["About NRT","Editorial","AI Policy","Advertise","Careers","Contact"] },
            ].map(col => (
              <div key={col.t} className="footer-col">
                <h4>{col.t}</h4>
                {col.l.map(l => <a key={l}>{l}</a>)}
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
      {leak  && <LeakModal  onClose={() => setLeak(false)} />}
    </div>
  );
}
