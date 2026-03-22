"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Ticker from "./components/Ticker";
import Navbar from "./components/Navbar";
import StoryModal from "./components/StoryModal";
import LeakModal from "./components/LeakModal";
import { S, Story, getCatColor } from "./data/stories";
import ScoresStrip from "./components/ScoresStrip";
import LiveFeed from "./components/LiveFeed";

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
          style={{ width:"100%", aspectRatio:"16/9", objectFit:"cover", display:"block" }}
          onError={(e)=>{(e.target as HTMLImageElement).src=`https://picsum.photos/seed/${s.id}/480/270`;}} />
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

const MARKET = [
  { l:"USD/NGN",  v:"₦1,420", c:"▼ 0.8%", up:false },
  { l:"Bitcoin",  v:"$84,210", c:"▲ 2.1%", up:true },
  { l:"DANGCEM", v:"₦1,042", c:"▲ 4.9%", up:true },
  { l:"MTNN",    v:"₦215.4", c:"▼ 1.2%", up:false },
  { l:"Crude Oil",v:"$74.40", c:"▲ 0.6%", up:true },
  { l:"Gold",    v:"$2,341", c:"▲ 0.3%", up:true },
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
  const [ld, setLd] = useState({ name:"", cat:"", text:"" });
  const [lSent, setLSent] = useState(false);

  /* Hero = top politics story, sidebar = mix of categories */
  const hero     = S.politics[0];
  const heroSide = [S.economy[1], S.sports[1], S.nigeria[1], S.entertainment[0]];

  return (
    <div style={{ background:"var(--gray-bg)", minHeight:"100vh", width:"100%" }}>
      <div className="sticky-header">
        <Ticker />
        <Navbar onLeak={() => setLeak(true)} />
      </div>

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
          {[
            ["#MediaBill","/politics"],["Super Eagles","/sports"],["Naira Crisis","/economy"],
            ["Osimhen","/sports"],["EFCC Arrests","/investigation"],["Davido Tour","/entertainment"],
            ["CBN Rate Hike","/economy"],["Nollywood Record","/entertainment"],
            ["Kaduna Tribunal","/politics"],["Tyla Grammy","/entertainment"],
            ["Efe Ajagba","/sports"],["AfCFTA","/africa"]
          ].map(([t,href]) => (
            <Link key={t} href={href} className="tb-item" style={{ textDecoration:"none" }}>{t}</Link>
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

            {/* LATEST — live feed polls /api/news every 90s */}
            <SH title="Latest News" />
            <LiveFeed onStory={setStory} />

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

            {/* BLACK SCORES STRIP */}
            <ScoresStrip />

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

            {/* Trending Now */}
            <div className="widget">
              <div className="widget-hdr"><div className="widget-bar" /><div className="widget-title">Trending Now</div></div>
              <div className="widget-body">
                {[
                  { t:"#MediaBill",   n:"48.2K", href:"/politics" },
                  { t:"#SuperEagles", n:"31.7K", href:"/sports" },
                  { t:"#Naira",       n:"27.4K", href:"/economy" },
                  { t:"#Osimhen",     n:"22.1K", href:"/sports" },
                  { t:"#EFCC",        n:"18.9K", href:"/investigation" },
                  { t:"#DavidoTour",  n:"15.3K", href:"/entertainment" },
                  { t:"#CBNRateHike", n:"12.1K", href:"/economy" },
                  { t:"#Nollywood",   n:"9.8K",  href:"/entertainment" },
                ].map((tr, i) => (
                  <Link key={tr.t} href={tr.href} className="trend-row" style={{ textDecoration:"none" }}>
                    <span className="tr-rank">{i+1}</span>
                    <span className="tr-label">{tr.t}</span>
                    <span className="tr-count">{tr.n}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Ad */}
            <Ad h={250} icon="🏠" msg="Buy Your Dream Home in Lekki from ₦45M" cta="View Listings" ctaColor="var(--navy)" />

            {/* Markets */}
            <div className="widget">
              <div className="widget-hdr"><div className="widget-bar" style={{ background:"#007A3D" }} /><div className="widget-title">Markets Live</div></div>
              <div className="widget-body">
                {[
                  { l:"USD/NGN", v:"₦1,420", up:false },
                  { l:"BTC",     v:"$84,210", up:true },
                  { l:"DANGCEM", v:"₦1,042",  up:true },
                  { l:"Crude",   v:"$74.40",  up:true },
                  { l:"GTCO",    v:"₦58.20",  up:false },
                  { l:"Gold",    v:"$3,021",   up:true },
                ].map(mr => (
                  <div key={mr.l} className="mr-row">
                    <span className="mr-l">{mr.l}</span>
                    <span className={mr.up ? "mr-v up" : "mr-v dn"}>{mr.v} {mr.up ? "▲" : "▼"}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Must Read */}
            <div className="widget">
              <div className="widget-hdr"><div className="widget-bar" style={{ background:"var(--red)" }} /><div className="widget-title">Must Read</div></div>
              <div className="widget-body">
                <LC s={S.investigation[0]} os={setStory} />
                <LC s={S.politics[1]}      os={setStory} />
                <LC s={S.economy[0]}       os={setStory} />
              </div>
            </div>

            {/* AI Transparency */}
            <div className="widget">
              <div className="widget-hdr"><div className="widget-bar" style={{ background:"#7C3AED" }} /><div className="widget-title">AI Transparency</div></div>
              <div className="widget-body" style={{ paddingTop:10 }}>
                {[
                  { label:"Stories verified today", val:"47" },
                  { label:"Avg validation score",   val:"91/100" },
                  { label:"Sources crawled",        val:"10 feeds" },
                  { label:"Last crawl",             val:"12 mins ago" },
                ].map(row => (
                  <div key={row.label} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:"1px solid var(--border)", fontSize:12 }}>
                    <span style={{ color:"#666" }}>{row.label}</span>
                    <span style={{ fontWeight:700, color:"#7C3AED" }}>{row.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ad */}
            <Ad h={200} icon="📱" msg="Download NRT App — Breaking Alerts Instantly. Free." cta="Download" ctaColor="var(--black)" />

            {/* Today in Nigeria */}
            <div className="widget">
              <div className="widget-hdr"><div className="widget-bar" style={{ background:"#B45309" }} /><div className="widget-title">Today in Nigeria</div></div>
              <div className="widget-body">
                {[
                  { year:"2006", text:"Sahara Reporters founded by Omoyele Sowore — Nigeria's first citizen journalism platform." },
                  { year:"1999", text:"Nigeria returned to civilian rule after 16 years of military dictatorship under Olusegun Obasanjo." },
                  { year:"1960", text:"Nigeria gained independence from Britain on October 1, becoming Africa's most populous nation." },
                ].map(ev => (
                  <div key={ev.year} style={{ display:"flex", gap:10, padding:"8px 0", borderBottom:"1px solid var(--border)" }}>
                    <span style={{ fontWeight:800, color:"var(--orange)", fontSize:13, minWidth:36 }}>{ev.year}</span>
                    <span style={{ fontSize:13, color:"#333", lineHeight:1.4 }}>{ev.text}</span>
                  </div>
                ))}
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
              <div style={{ marginTop:10, display:"flex", gap:6 }}>
                <button className="soc">📱 App Store</button>
                <button className="soc">🤖 Google Play</button>
              </div>
            </div>
            {[
              { t:"Nigeria",   l:[["Politics","/politics"],["Lagos","/nigeria"],["Abuja","/nigeria"],["Economy","/economy"],["South-South","/nigeria"],["North","/nigeria"]] },
              { t:"Sports",    l:[["Super Eagles","/sports"],["Premier League","/sports"],["AFCON","/sports"],["NBA","/sports"],["Athletics","/sports"],["CAF","/sports"]] },
              { t:"Business",  l:[["Markets","/economy"],["Fintech","/money"],["Oil & Gas","/economy"],["Agriculture","/economy"],["Startups","/tech"],["Crypto","/money"]] },
              { t:"Lifestyle", l:[["Entertainment","/entertainment"],["Nollywood","/entertainment"],["Music","/entertainment"],["Travel","/world"],["Opinion","/opinion"],["Health","/health"]] },
              { t:"Company",   l:[["About NRT","#about"],["Editorial","#editorial"],["AI Policy","#ai-policy"],["Advertise","#advertise"],["Careers","#careers"],["Contact","#contact"]] },
            ].map(col => (
              <div key={col.t} className="footer-col">
                <h4>{col.t}</h4>
                {col.l.map(([label,href]) => <Link key={label} href={href} className="footer-link">{label}</Link>)}
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
