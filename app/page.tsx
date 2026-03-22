"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { S, Story, getCatColor } from "./data/stories";
import Ticker from "./components/Ticker";
import Navbar from "./components/Navbar";
import ScoresStrip from "./components/ScoresStrip";
import LiveFeed from "./components/LiveFeed";
import StoryModal from "./components/StoryModal";
import LeakModal from "./components/LeakModal";

/* ── Small list card with image ───────────────────────────── */
function LC({ s, os }: { s:Story; os:(x:Story)=>void }) {
  return (
    <div className="lc" onClick={() => os(s)}>
      <div className="lc-img">
        <Image
          src={s.image || `https://picsum.photos/seed/${s.id}/90/60`}
          alt={s.headline} fill style={{ objectFit:"cover" }}
          sizes="90px"
          onError={e=>{(e.target as HTMLImageElement).src=`https://picsum.photos/seed/${s.id}/90/60`;}}
        />
      </div>
      <div className="lc-body">
        <div className="lc-cat" style={{ color:getCatColor(s.category) }}>{s.category}</div>
        <div className="lc-hl">{s.headline}</div>
        <div className="lc-meta">{s.time}</div>
      </div>
    </div>
  );
}

/* ── Standard card ────────────────────────────────────────── */
function NC({ s, os, large=false }: { s:Story; os:(x:Story)=>void; large?:boolean }) {
  return (
    <div className="nc" onClick={() => os(s)}>
      <div className="nc-img-wrap">
        <Image
          src={s.image || `https://picsum.photos/seed/${s.id}/400/225`}
          alt={s.headline} width={400} height={225}
          style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
          onError={e=>{(e.target as HTMLImageElement).src=`https://picsum.photos/seed/${s.id}/400/225`;}}
        />
        <span className="nc-cat-pill" style={{ color:getCatColor(s.category) }}>{s.category}</span>
      </div>
      <div className="nc-body">
        <div className={large ? "nc-hl nc-hl-lg" : "nc-hl"}>{s.headline}</div>
        <div className="nc-snippet">{s.snippet}</div>
        <div className="nc-meta"><span>{s.time}</span></div>
      </div>
    </div>
  );
}

/* ── Section header ───────────────────────────────────────── */
function SH({ title, color="#FF5C00", href="/" }: { title:string; color?:string; href?:string }) {
  return (
    <div className="sec-hdr" style={{ borderBottomColor:color }}>
      <span className="sec-hdr-title">{title}</span>
      <Link href={href} className="sec-hdr-link" style={{ color }}>View All →</Link>
    </div>
  );
}

/* ── Ad slot ──────────────────────────────────────────────── */
function Ad({ h=90, icon="", msg="", cta="", ctaColor="var(--orange)" }:
  { h?:number; icon?:string; msg?:string; cta?:string; ctaColor?:string }) {
  return (
    <div className="ad-slot" style={{ height:h, margin:"var(--section-pad) 0 0" }}>
      <div className="ad-label">Advertisement</div>
      <div className="ad-msg"><span style={{ fontSize:18 }}>{icon}</span>{msg}</div>
      {cta && <button className="ad-cta" style={{ background:ctaColor }}>{cta}</button>}
    </div>
  );
}

/* ── Main page ────────────────────────────────────────────── */
export default function Home() {
  const [story, setStory] = useState<Story|null>(null);
  const [leak, setLeak]   = useState(false);
  const [ld, setLd]       = useState({ name:"", cat:"", text:"" });
  const [lSent, setLSent] = useState(false);

  const hero     = S.politics[0];
  const heroSide = [S.economy[0], S.sports[0], S.nigeria[0], S.entertainment[0]];

  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh", width:"100%" }}>

      {/* ── FIXED HEADER ── */}
      <div className="sticky-header">
        <Ticker />
        <Navbar onLeak={() => setLeak(true)} />
      </div>

      {/* ── BREAKING BAR ── */}
      <div className="breaking-bar page-wrap-full">
        <div style={{ maxWidth:1170, margin:"0 auto", padding:"0 20px", display:"flex", alignItems:"center", gap:12, width:"100%" }}>
          <span className="bb-pill">Breaking</span>
          <span style={{ fontWeight:500, fontSize:14 }}>{hero.headline}</span>
          <span style={{ margin:"0 8px", opacity:.4 }}>·</span>
          <span style={{ fontSize:14 }}>CBN emergency MPC session as naira hits ₦1,420</span>
        </div>
      </div>

      {/* ── TRENDING BAR ── */}
      <div className="trending-bar page-wrap-full">
        <div style={{ maxWidth:1170, margin:"0 auto", padding:"0 0 0 20px", display:"flex", width:"100%", height:"100%" }}>
          <span className="tb-label">Trending</span>
          <div className="tb-items">
            {[
              ["#MediaBill","/politics"],["Super Eagles","/sports"],["Naira Crisis","/economy"],
              ["Osimhen","/sports"],["EFCC Arrests","/investigation"],["Davido Tour","/entertainment"],
              ["CBN Rate Hike","/economy"],["Nollywood Record","/entertainment"],
              ["Kaduna Tribunal","/politics"],["Tyla Grammy","/entertainment"],
              ["Efe Ajagba","/sports"],["AfCFTA","/africa"]
            ].map(([t,href]) => (
              <Link key={t} href={href} className="tb-item">{t}</Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── TOP AD ── */}
      <div className="page-wrap">
        <Ad h={90} icon="🏦" msg="Open a Dollar Account Today — Zero Fees for 6 Months" cta="Get Started" ctaColor="var(--orange)" />
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="page-wrap">
        <div className="main-grid">

          {/* ════ LEFT CONTENT COLUMN ════ */}
          <div style={{ minWidth:0 }}>

            {/* HERO */}
            <div className="hero-wrap">
              <div className="hero-main" onClick={() => setStory(hero)}>
                <Image
                  src={hero.image} alt={hero.headline} width={800} height={450}
                  style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                  onError={e=>{(e.target as HTMLImageElement).src=`https://picsum.photos/seed/${hero.id}/800/450`;}}
                  priority
                />
                <div className="hero-overlay">
                  <span className="hero-cat">{hero.category.toUpperCase()}</span>
                  <div className="hero-hl">{hero.headline}</div>
                  <div className="hero-meta">
                    <span>{hero.time}</span>
                    <span>·</span>
                    <span>NRT Newsroom</span>
                  </div>
                </div>
              </div>
              <div className="hero-side">
                {heroSide.map(s => (
                  <div key={s.id} className="hsi" onClick={() => setStory(s)}>
                    <div className="hsi-cat" style={{ color:getCatColor(s.category) }}>{s.category}</div>
                    <div className="hsi-hl">{s.headline}</div>
                    <div className="hsi-time">{s.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* LATEST NEWS — LiveFeed 3 cards, auto-updates */}
            <SH title="Latest News" />
            <LiveFeed onStory={setStory} />

            <Ad h={90} icon="🎓" msg="Study Abroad 2026 — Scholarships for Nigerian Students" cta="Apply Now" ctaColor="var(--blue)" />

            {/* POLITICS — 1 big featured + 3 list right */}
            <SH title="Politics" color="var(--red)" href="/politics" />
            <div className="card-featured">
              <NC s={S.politics[1]} os={setStory} large />
              <div>
                <LC s={S.politics[2]} os={setStory} />
                <LC s={S.politics[3]} os={setStory} />
                <LC s={S.nigeria[1]}  os={setStory} />
              </div>
            </div>

            {/* LIVE SCORES */}
            <ScoresStrip />

            {/* SPORTS — 3 cards */}
            <SH title="Sports" color="var(--green)" href="/sports" />
            <div className="card-grid-3">
              <NC s={S.sports[2]} os={setStory} />
              <NC s={S.sports[3]} os={setStory} />
              <NC s={S.sports[4]} os={setStory} />
            </div>

            <Ad h={90} icon="💊" msg="Health Insurance from ₦5,000/month — NRT Partners" cta="Get Quote" ctaColor="#0891B2" />

            {/* ECONOMY — 1 big + 3 list */}
            <SH title="Economy & Business" color="var(--amber)" href="/economy" />
            <div className="card-featured">
              <NC s={S.economy[2]} os={setStory} large />
              <div>
                <LC s={S.economy[3]} os={setStory} />
                <LC s={S.economy[1]} os={setStory} />
                <LC s={S.money[0]}   os={setStory} />
              </div>
            </div>

            {/* VIDEO — exactly 5 cards */}
            <SH title="Video" href="/" />
            <div className="vid-grid">
              {[S.politics[2], S.sports[1], S.economy[0], S.entertainment[1], S.africa[0]].map((s,i) => (
                <div key={s.id} className="vid-card" onClick={() => setStory(s)}>
                  <div className="vid-thumb">
                    <Image
                      src={s.image || `https://picsum.photos/seed/vid${i}/200/113`}
                      alt={s.headline} width={200} height={113}
                      style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                      onError={e=>{(e.target as HTMLImageElement).src=`https://picsum.photos/seed/vid${i}/200/113`;}}
                    />
                    <div className="vid-play">▶</div>
                  </div>
                  <div className="vid-body">
                    <div className="vid-cat" style={{ color:getCatColor(s.category) }}>{s.category}</div>
                    <div className="vid-hl">{s.headline}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* ENTERTAINMENT — 3 cards */}
            <SH title="Entertainment & Culture" color="var(--purple)" href="/entertainment" />
            <div className="card-grid-3">
              <NC s={S.entertainment[1]} os={setStory} />
              <NC s={S.entertainment[2]} os={setStory} />
              <NC s={S.entertainment[3]} os={setStory} />
            </div>

            {/* AFRICA — 3 cards */}
            <SH title="Africa" color="var(--amber)" href="/africa" />
            <div className="card-grid-3">
              <NC s={S.africa[0]} os={setStory} />
              <NC s={S.africa[1]} os={setStory} />
              <NC s={S.africa[2]} os={setStory} />
            </div>

            <Ad h={90} icon="✈️" msg="Lagos to London from ₦620,000 — Limited Seats" cta="Book Now" ctaColor="var(--black)" />

            {/* INVESTIGATIONS — 1 big + 3 list */}
            <SH title="Investigations" color="var(--red)" href="/investigation" />
            <div className="card-featured">
              <NC s={S.investigation[0]} os={setStory} large />
              <div>
                <LC s={S.investigation[1]} os={setStory} />
                <LC s={S.nigeria[2]}       os={setStory} />
                <LC s={S.tech[0]}          os={setStory} />
              </div>
            </div>

            {/* MONEY — 2 cards */}
            <SH title="Money / Hustle" color="var(--green)" href="/money" />
            <div className="card-grid-2">
              <NC s={S.money[1]} os={setStory} />
              <NC s={S.health[0]} os={setStory} />
            </div>

            {/* TECH — 2 cards */}
            <SH title="Tech & Innovation" color="var(--blue)" href="/tech" />
            <div className="card-grid-2">
              <NC s={S.tech[0]} os={setStory} />
              <NC s={S.tech[1]} os={setStory} />
            </div>

            {/* WORLD — 3 cards */}
            <SH title="World News" color="var(--blue)" href="/world" />
            <div className="card-grid-3">
              <NC s={S.world[0]} os={setStory} />
              <NC s={S.world[1]} os={setStory} />
              <NC s={S.world[2]} os={setStory} />
            </div>

            {/* HEALTH — 2 cards */}
            <SH title="Health" color="#0891B2" href="/health" />
            <div className="card-grid-2">
              <NC s={S.health[0]} os={setStory} />
              <NC s={S.health[1]} os={setStory} />
            </div>

            {/* OPINION — 3 cards */}
            <SH title="Opinion & Analysis" color="var(--purple)" href="/opinion" />
            <div className="card-grid-3">
              <NC s={S.opinion[0]} os={setStory} />
              <NC s={S.opinion[1]} os={setStory} />
              <NC s={S.opinion[2]} os={setStory} />
            </div>

          </div>{/* end content column */}

          {/* ════ RIGHT SIDEBAR — max 4 widgets ════ */}
          <div className="sidebar">

            {/* WIDGET 1: Trending — 5 items max */}
            <div className="widget">
              <div className="widget-hdr">
                <div className="widget-bar" style={{ background:"var(--orange)" }} />
                <div className="widget-title">Trending Now</div>
              </div>
              <div className="widget-body">
                {[
                  { t:"#MediaBill",   n:"48.2K", href:"/politics" },
                  { t:"#SuperEagles", n:"31.7K", href:"/sports" },
                  { t:"#Naira",       n:"27.4K", href:"/economy" },
                  { t:"#Osimhen",     n:"22.1K", href:"/sports" },
                  { t:"#EFCC",        n:"18.9K", href:"/investigation" },
                ].map((tr,i) => (
                  <Link key={tr.t} href={tr.href} className="trend-row">
                    <span className="tr-rank">{i+1}</span>
                    <span className="tr-label">{tr.t}</span>
                    <span className="tr-count">{tr.n}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* WIDGET 2: Weather */}
            <div className="weather-card">
              <div className="weather-city">📍 Lagos, Nigeria</div>
              <div className="weather-temp">32°C</div>
              <div className="weather-desc">☀️ Sunny · Feels like 36°C</div>
              <div className="weather-row">
                <div className="weather-stat"><div className="weather-stat-v">82%</div><div className="weather-stat-l">Humidity</div></div>
                <div className="weather-stat"><div className="weather-stat-v">18km/h</div><div className="weather-stat-l">Wind</div></div>
                <div className="weather-stat"><div className="weather-stat-v">UV 9</div><div className="weather-stat-l">Index</div></div>
                <div className="weather-stat"><div className="weather-stat-v">Low</div><div className="weather-stat-l">Rain</div></div>
              </div>
            </div>

            {/* WIDGET 3: Newsletter */}
            <div className="newsletter-wrap">
              <div style={{ fontSize:13, fontWeight:800, color:"white", marginBottom:4 }}>DAILY NEWSLETTER</div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,0.8)", marginBottom:12, lineHeight:1.5 }}>
                Join 240,000+ Nigerians. Free alerts, no spam.
              </div>
              <input placeholder="Enter your email address..." />
              <button>Subscribe Free</button>
            </div>

            {/* WIDGET 4: Must Read */}
            <div className="widget">
              <div className="widget-hdr">
                <div className="widget-bar" style={{ background:"var(--red)" }} />
                <div className="widget-title">Must Read</div>
              </div>
              <div className="widget-body">
                <LC s={S.investigation[0]} os={setStory} />
                <LC s={S.economy[3]}       os={setStory} />
                <LC s={S.africa[1]}        os={setStory} />
                <LC s={S.sports[4]}        os={setStory} />
              </div>
            </div>

            {/* Markets — extra below 4 core widgets */}
            <div className="widget">
              <div className="widget-hdr">
                <div className="widget-bar" style={{ background:"var(--green)" }} />
                <div className="widget-title">Markets Live</div>
              </div>
              <div className="widget-body">
                {[
                  { l:"USD/NGN", v:"₦1,420", up:false },
                  { l:"BTC",     v:"$84,210", up:true },
                  { l:"DANGCEM", v:"₦1,042",  up:true },
                  { l:"Crude",   v:"$74.40",  up:true },
                  { l:"GTCO",    v:"₦58.20",  up:false },
                ].map(mr => (
                  <div key={mr.l} className="mr-row">
                    <span className="mr-l">{mr.l}</span>
                    <span className={mr.up ? "mr-v up" : "mr-v dn"}>{mr.v} {mr.up?"▲":"▼"}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Today in Nigeria */}
            <div className="widget">
              <div className="widget-hdr">
                <div className="widget-bar" style={{ background:"var(--amber)" }} />
                <div className="widget-title">Today in Nigeria</div>
              </div>
              <div className="widget-body">
                {[
                  { year:"2006", text:"Sahara Reporters founded — Nigeria's first citizen journalism platform." },
                  { year:"1999", text:"Nigeria returned to civilian rule after 16 years of military rule." },
                  { year:"1960", text:"Nigeria gained independence from Britain on October 1." },
                ].map(ev => (
                  <div key={ev.year} style={{ display:"flex", gap:10, padding:"8px 0", borderBottom:"1px solid var(--border)" }}>
                    <span style={{ fontWeight:800, color:"var(--orange)", fontSize:13, minWidth:36 }}>{ev.year}</span>
                    <span style={{ fontSize:13, color:"#333", lineHeight:1.4 }}>{ev.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Transparency */}
            <div className="widget">
              <div className="widget-hdr">
                <div className="widget-bar" style={{ background:"var(--purple)" }} />
                <div className="widget-title">AI Transparency</div>
              </div>
              <div className="widget-body" style={{ paddingTop:10 }}>
                {[
                  { label:"Stories today",     val:"47" },
                  { label:"Validation score",  val:"91/100" },
                  { label:"Feeds monitored",   val:"10" },
                  { label:"Last update",       val:"8 mins ago" },
                ].map(row => (
                  <div key={row.label} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:"1px solid var(--border)", fontSize:12 }}>
                    <span style={{ color:"var(--text-secondary)" }}>{row.label}</span>
                    <span style={{ fontWeight:700, color:"var(--purple)" }}>{row.val}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>{/* end sidebar */}

        </div>{/* end main-grid */}
      </div>{/* end page-wrap */}

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-inner">

          {/* LEAK FORM — moved to footer per spec */}
          <div className="footer-leak">
            <h3>GOT A <span>LEAK?</span></h3>
            <p>Submit tips, documents, or insider information securely. End-to-end encrypted. Your identity is never exposed — guaranteed by Nigerian whistleblower law.</p>
            {lSent ? (
              <div style={{ textAlign:"center", padding:"20px 0", color:"#6BCB77" }}>
                <div style={{ fontSize:36, marginBottom:8 }}>🔐</div>
                <div style={{ fontWeight:700 }}>Received & Encrypted. Our team reviews within 24 hours.</div>
              </div>
            ) : (
              <>
                <div className="leak-grid">
                  <input className="fi" placeholder="Your name (optional)" value={ld.name} onChange={e=>setLd(d=>({...d,name:e.target.value}))} />
                  <select className="fi" value={ld.cat} onChange={e=>setLd(d=>({...d,cat:e.target.value}))}>
                    <option value="">Category...</option>
                    {["Government / Corruption","Security / Military","Business / Finance","Celebrity / Entertainment","Sports","Other"].map(o=><option key={o}>{o}</option>)}
                  </select>
                  <textarea className="fi fi-ta" placeholder="Describe the tip or paste your information here..." value={ld.text} onChange={e=>setLd(d=>({...d,text:e.target.value}))} />
                </div>
                <button className="leak-submit" onClick={()=>{ if(ld.text) setLSent(true); }}>🔒 Submit Securely</button>
                <div className="leak-note">🛡 <span>End-to-end encrypted.</span> NRT never reveals sources. Nigerian whistleblower protections apply.</div>
              </>
            )}
          </div>

          {/* Footer columns */}
          <div className="footer-top">
            <div>
              <div className="footer-logo">NRT<span>.</span></div>
              <div className="footer-tagline">Nigeria Real Time — the nation&apos;s first AI-native 24/7 news network. Breaking news. Deep investigation. Fearless and people-powered.</div>
              <div className="footer-socials">
                {["𝕏 Twitter","WhatsApp","Telegram","TikTok","YouTube","Instagram"].map(s=>(
                  <button key={s} className="soc">{s}</button>
                ))}
              </div>
            </div>
            {[
              { t:"Nigeria",   l:[["Politics","/politics"],["Lagos","/nigeria"],["Economy","/economy"],["North","/nigeria"],["South","/nigeria"]] },
              { t:"Sports",    l:[["Super Eagles","/sports"],["Premier League","/sports"],["AFCON","/sports"],["NBA","/sports"],["CAF","/sports"]] },
              { t:"Business",  l:[["Markets","/economy"],["Fintech","/money"],["Oil & Gas","/economy"],["Startups","/tech"],["Crypto","/money"]] },
              { t:"Company",   l:[["About NRT","#about"],["Editorial","#editorial"],["AI Policy","#ai-policy"],["Advertise","#advertise"],["Contact","#contact"]] },
            ].map(col=>(
              <div key={col.t} className="footer-col">
                <h4>{col.t}</h4>
                {col.l.map(([label,href])=>(
                  <Link key={label} href={href} className="footer-link">{label}</Link>
                ))}
              </div>
            ))}
          </div>

          <div className="footer-bottom">
            <div>© 2026 <strong>NRT</strong> · Nigeria Real Time. AI-powered. Human-verified.</div>
            <div>Built on Next.js · Claude AI · PostgreSQL · Railway</div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {story && <StoryModal story={story} onClose={() => setStory(null)} onStory={setStory} />}
      {leak  && <LeakModal onClose={() => setLeak(false)} />}

    </div>
  );
}
