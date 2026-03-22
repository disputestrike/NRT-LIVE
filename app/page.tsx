"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { S, Story, getCatColor } from "./data/stories";
import Ticker from "./components/Ticker";
import Navbar from "./components/Navbar";
import ScoresStrip from "./components/ScoresStrip";
import MultiCluster from "./components/MultiCluster";
import StoryModal from "./components/StoryModal";
import LeakModal from "./components/LeakModal";

/* ── helpers ─────────────────────────────────────────────────── */
function img(s: Story, w=400, h=225) {
  return s.image || `https://picsum.photos/seed/${s.id}/${w}/${h}`;
}
function err(e: React.SyntheticEvent<HTMLImageElement>, id: string, w=400, h=225) {
  (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${id}/${w}/${h}`;
}

/* ── Section label (CNN left-border style) ──────────────────── */
function Label({ text, color="#1a1a1a" }: { text:string; color?:string }) {
  return (
    <div className="sec-label">
      <div className="sec-label-bar" style={{ background:color }} />
      <span className="sec-label-text">{text}</span>
    </div>
  );
}

/* ── Small horizontal card (thumb left, text right) ────────── */
function SmallCard({ s, os }: { s:Story; os:(x:Story)=>void }) {
  return (
    <div className="story-small" onClick={() => os(s)}>
      <Image src={img(s,90,60)} alt={s.headline} width={90} height={60}
        className="story-small-img"
        onError={e=>err(e,s.id,90,60)} />
      <div>
        <div className="story-small-hl">{s.headline}</div>
        <div className="story-small-meta">{s.time}</div>
      </div>
    </div>
  );
}

/* ── Text-only story link (CNN left col list) ───────────────── */
function TextLink({ s, os }: { s:Story; os:(x:Story)=>void }) {
  return (
    <div className="story-text-link" onClick={() => os(s)}>
      <div className="story-text-link-hl">{s.headline}</div>
      <div className="story-text-link-meta">{s.time}</div>
    </div>
  );
}

/* ── CNN-style 3-column zone ────────────────────────────────── */
/* LEFT: label + featured image + text list
   CENTER: label + big story (image + headline + summary)
   RIGHT: label + featured image + small cards */
function Zone({
  leftLabel, leftMain, leftLinks,
  centerLabel, centerStory,
  rightLabel, rightMain, rightSmall,
  os, leftColor="#1a1a1a", centerColor="#1a1a1a", rightColor="#1a1a1a"
}: {
  leftLabel:string; leftMain:Story; leftLinks:Story[];
  centerLabel:string; centerStory:Story;
  rightLabel:string; rightMain:Story; rightSmall:Story[];
  os:(x:Story)=>void;
  leftColor?:string; centerColor?:string; rightColor?:string;
}) {
  return (
    <div className="cnn-zone">
      {/* LEFT */}
      <div className="cnn-col cnn-col-first">
        <Label text={leftLabel} color={leftColor} />
        <img src={img(leftMain)} alt={leftMain.headline}
          className="story-featured-img" onClick={() => os(leftMain)}
          onError={e=>err(e as unknown as React.SyntheticEvent<HTMLImageElement>,leftMain.id)} />
        <div className="story-featured-hl" onClick={() => os(leftMain)}>{leftMain.headline}</div>
        {leftLinks.map(s => <TextLink key={s.id} s={s} os={os} />)}
      </div>

      {/* CENTER */}
      <div className="cnn-col" style={{ borderLeft:"1px solid #e0e0e0" }}>
        <Label text={centerLabel} color={centerColor} />
        <div className="story-main" onClick={() => os(centerStory)}>
          <Image src={img(centerStory,700,394)} alt={centerStory.headline}
            width={700} height={394} className="story-main-img"
            onError={e=>err(e,centerStory.id,700,394)} />
          <div className="story-main-hl">{centerStory.headline}</div>
          <div className="story-main-sum">{centerStory.snippet}</div>
          <div className="story-main-meta">{centerStory.time} · NRT Newsroom</div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="cnn-col cnn-col-last" style={{ borderLeft:"1px solid #e0e0e0" }}>
        <Label text={rightLabel} color={rightColor} />
        <img src={img(rightMain)} alt={rightMain.headline}
          className="story-right-img" onClick={() => os(rightMain)}
          onError={e=>err(e as unknown as React.SyntheticEvent<HTMLImageElement>,rightMain.id)} />
        <div className="story-right-hl" onClick={() => os(rightMain)}>{rightMain.headline}</div>
        {rightSmall.map(s => <SmallCard key={s.id} s={s} os={os} />)}
      </div>
    </div>
  );
}

/* ── Ad slot ────────────────────────────────────────────────── */
function Ad({ h=90, msg="", cta="", color="#FF5C00" }:{h?:number;msg?:string;cta?:string;color?:string}) {
  return (
    <div className="ad-slot" style={{ height:h, margin:"24px 0" }}>
      <div className="ad-label-top">Advertisement</div>
      <div className="ad-msg">{msg}</div>
      {cta && <button className="ad-cta" style={{ background:color }}>{cta}</button>}
    </div>
  );
}

/* ── MAIN ────────────────────────────────────────────────────── */
export default function Home() {
  const [story, setStory] = useState<Story|null>(null);
  const [leak, setLeak]   = useState(false);
  const [ld, setLd]       = useState({ name:"", cat:"", text:"" });
  const [lSent, setLSent] = useState(false);

  return (
    <div style={{ background:"#fff", minHeight:"100vh" }}>

      {/* FIXED HEADER */}
      <div className="sticky-header">
        <Ticker />
        <Navbar onLeak={() => setLeak(true)} />
      </div>

      {/* TRENDING BAR — CNN style */}
      <div className="trending-bar page-wrap-full">
        <div className="page-wrap" style={{ display:"flex", alignItems:"center", width:"100%", padding:"0 20px", maxWidth:1170, margin:"0 auto" }}>
          <span className="tb-label">Trending:</span>
          <div className="tb-items">
            {[["#MediaBill","/politics"],["Super Eagles","/sports"],["Naira Crisis","/economy"],
              ["Osimhen","/sports"],["EFCC Arrests","/investigation"],["Davido Tour","/entertainment"],
              ["CBN Rate Hike","/economy"],["Nollywood Record","/entertainment"],
              ["AfCFTA","/africa"],["Tyla Grammy","/entertainment"]
            ].map(([t,h]) => <Link key={t} href={h} className="tb-item">{t}</Link>)}
          </div>
        </div>
      </div>

      {/* TOP AD */}
      <div className="page-wrap">
        <Ad h={90} msg="🏦 Open a Dollar Account — Zero Fees for 6 Months" cta="Get Started" />
      </div>

      {/* ══ ZONE 1: POLITICS | HERO STORY | ECONOMY ══ */}
      <div className="page-wrap">
        <div className="cnn-zone">
          {/* LEFT: Politics */}
          <div className="cnn-col cnn-col-first">
            <Label text="Politics" color="#cc0000" />
            <img src={img(S.politics[1])} alt={S.politics[1].headline}
              className="story-featured-img" onClick={() => setStory(S.politics[1])}
              onError={e=>{(e.currentTarget as HTMLImageElement).src=`https://picsum.photos/seed/${S.politics[1].id}/280/158`;}} />
            <div className="story-featured-hl" onClick={() => setStory(S.politics[1])}>{S.politics[1].headline}</div>
            <TextLink s={S.politics[2]} os={setStory} />
            <TextLink s={S.politics[3]} os={setStory} />
            <TextLink s={S.nigeria[0]} os={setStory} />
          </div>

          {/* CENTER: Top story */}
          <div className="cnn-col" style={{ borderLeft:"1px solid #e0e0e0" }}>
            <Label text="Top Story" color="#cc0000" />
            <div className="story-main" onClick={() => setStory(S.politics[0])}>
              <Image src={img(S.politics[0],700,394)} alt={S.politics[0].headline}
                width={700} height={394} className="story-main-img" priority
                onError={e=>err(e,S.politics[0].id,700,394)} />
              <div className="story-main-hl">{S.politics[0].headline}</div>
              <div className="story-main-sum">{S.politics[0].snippet}</div>
              <div className="story-main-meta">{S.politics[0].time} · NRT Newsroom</div>
            </div>
          </div>

          {/* RIGHT: Economy */}
          <div className="cnn-col cnn-col-last" style={{ borderLeft:"1px solid #e0e0e0" }}>
            <Label text="Economy" color="#B45309" />
            <img src={img(S.economy[0])} alt={S.economy[0].headline}
              className="story-right-img" onClick={() => setStory(S.economy[0])}
              onError={e=>{(e.currentTarget as HTMLImageElement).src=`https://picsum.photos/seed/${S.economy[0].id}/280/158`;}} />
            <div className="story-right-hl" onClick={() => setStory(S.economy[0])}>{S.economy[0].headline}</div>
            <SmallCard s={S.economy[1]} os={setStory} />
            <SmallCard s={S.economy[2]} os={setStory} />
          </div>
        </div>

        {/* ══ ZONE 2: SPORTS | INVESTIGATIONS | ENTERTAINMENT ══ */}
        <div className="cnn-zone">
          <div className="cnn-col cnn-col-first">
            <Label text="Sports" color="#007A3D" />
            <img src={img(S.sports[0])} alt={S.sports[0].headline}
              className="story-featured-img" onClick={() => setStory(S.sports[0])}
              onError={e=>{(e.currentTarget as HTMLImageElement).src=`https://picsum.photos/seed/${S.sports[0].id}/280/158`;}} />
            <div className="story-featured-hl" onClick={() => setStory(S.sports[0])}>{S.sports[0].headline}</div>
            <TextLink s={S.sports[1]} os={setStory} />
            <TextLink s={S.sports[2]} os={setStory} />
            <TextLink s={S.sports[3]} os={setStory} />
          </div>

          <div className="cnn-col" style={{ borderLeft:"1px solid #e0e0e0" }}>
            <Label text="Investigations" color="#cc0000" />
            <div className="story-main" onClick={() => setStory(S.investigation[0])}>
              <Image src={img(S.investigation[0],700,394)} alt={S.investigation[0].headline}
                width={700} height={394} className="story-main-img"
                onError={e=>err(e,S.investigation[0].id,700,394)} />
              <div className="story-main-hl">{S.investigation[0].headline}</div>
              <div className="story-main-sum">{S.investigation[0].snippet}</div>
              <div className="story-main-meta">{S.investigation[0].time} · NRT Newsroom</div>
            </div>
          </div>

          <div className="cnn-col cnn-col-last" style={{ borderLeft:"1px solid #e0e0e0" }}>
            <Label text="Entertainment" color="#7C3AED" />
            <img src={img(S.entertainment[0])} alt={S.entertainment[0].headline}
              className="story-right-img" onClick={() => setStory(S.entertainment[0])}
              onError={e=>{(e.currentTarget as HTMLImageElement).src=`https://picsum.photos/seed/${S.entertainment[0].id}/280/158`;}} />
            <div className="story-right-hl" onClick={() => setStory(S.entertainment[0])}>{S.entertainment[0].headline}</div>
            <SmallCard s={S.entertainment[1]} os={setStory} />
            <SmallCard s={S.entertainment[2]} os={setStory} />
          </div>
        </div>
      </div>

      {/* LIVE SCORES */}
      <ScoresStrip />

      {/* ══ ZONE 3: AFRICA | NIGERIA | TECH ══ */}
      <div className="page-wrap">
        <div className="cnn-zone">
          <div className="cnn-col cnn-col-first">
            <Label text="Africa" color="#B45309" />
            <img src={img(S.africa[0])} alt={S.africa[0].headline}
              className="story-featured-img" onClick={() => setStory(S.africa[0])}
              onError={e=>{(e.currentTarget as HTMLImageElement).src=`https://picsum.photos/seed/${S.africa[0].id}/280/158`;}} />
            <div className="story-featured-hl" onClick={() => setStory(S.africa[0])}>{S.africa[0].headline}</div>
            <TextLink s={S.africa[1]} os={setStory} />
            <TextLink s={S.africa[2]} os={setStory} />
          </div>

          <div className="cnn-col" style={{ borderLeft:"1px solid #e0e0e0" }}>
            <Label text="Nigeria" color="#cc0000" />
            <div className="story-main" onClick={() => setStory(S.nigeria[0])}>
              <Image src={img(S.nigeria[0],700,394)} alt={S.nigeria[0].headline}
                width={700} height={394} className="story-main-img"
                onError={e=>err(e,S.nigeria[0].id,700,394)} />
              <div className="story-main-hl">{S.nigeria[0].headline}</div>
              <div className="story-main-sum">{S.nigeria[0].snippet}</div>
              <div className="story-main-meta">{S.nigeria[0].time} · NRT Newsroom</div>
            </div>
          </div>

          <div className="cnn-col cnn-col-last" style={{ borderLeft:"1px solid #e0e0e0" }}>
            <Label text="Tech & Innovation" color="#1D4ED8" />
            <img src={img(S.tech[0])} alt={S.tech[0].headline}
              className="story-right-img" onClick={() => setStory(S.tech[0])}
              onError={e=>{(e.currentTarget as HTMLImageElement).src=`https://picsum.photos/seed/${S.tech[0].id}/280/158`;}} />
            <div className="story-right-hl" onClick={() => setStory(S.tech[0])}>{S.tech[0].headline}</div>
            <SmallCard s={S.tech[1]} os={setStory} />
            <SmallCard s={S.nigeria[1]} os={setStory} />
          </div>
        </div>

        <Ad h={90} msg="✈️ Lagos to London from ₦620,000 — Limited Seats" cta="Book Now" color="#1a1a1a" />

        {/* ══ ZONE 4: MONEY | ECONOMY DEEP | WORLD ══ */}
        <div className="cnn-zone">
          <div className="cnn-col cnn-col-first">
            <Label text="Money / Hustle" color="#007A3D" />
            <img src={img(S.money[0])} alt={S.money[0].headline}
              className="story-featured-img" onClick={() => setStory(S.money[0])}
              onError={e=>{(e.currentTarget as HTMLImageElement).src=`https://picsum.photos/seed/${S.money[0].id}/280/158`;}} />
            <div className="story-featured-hl" onClick={() => setStory(S.money[0])}>{S.money[0].headline}</div>
            <TextLink s={S.money[1]} os={setStory} />
            <TextLink s={S.health[0]} os={setStory} />
            <TextLink s={S.health[1]} os={setStory} />
          </div>

          <div className="cnn-col" style={{ borderLeft:"1px solid #e0e0e0" }}>
            <Label text="Economy & Business" color="#B45309" />
            <div className="story-main" onClick={() => setStory(S.economy[3])}>
              <Image src={img(S.economy[3],700,394)} alt={S.economy[3].headline}
                width={700} height={394} className="story-main-img"
                onError={e=>err(e,S.economy[3].id,700,394)} />
              <div className="story-main-hl">{S.economy[3].headline}</div>
              <div className="story-main-sum">{S.economy[3].snippet}</div>
              <div className="story-main-meta">{S.economy[3].time} · NRT Newsroom</div>
            </div>
          </div>

          <div className="cnn-col cnn-col-last" style={{ borderLeft:"1px solid #e0e0e0" }}>
            <Label text="World News" color="#1D4ED8" />
            <img src={img(S.world[0])} alt={S.world[0].headline}
              className="story-right-img" onClick={() => setStory(S.world[0])}
              onError={e=>{(e.currentTarget as HTMLImageElement).src=`https://picsum.photos/seed/${S.world[0].id}/280/158`;}} />
            <div className="story-right-hl" onClick={() => setStory(S.world[0])}>{S.world[0].headline}</div>
            <SmallCard s={S.world[1]} os={setStory} />
            <SmallCard s={S.world[2]} os={setStory} />
          </div>
        </div>
      </div>

      {/* ══ MULTI-CLUSTER FEED BREAK ══ */}
      <MultiCluster onStory={setStory} />

      {/* STREAMING NOW — full-width black strip like CNN */}
      <div className="streaming-strip">
        <div className="streaming-inner">
          <div className="streaming-title">NRT Live & Video</div>
          <div className="streaming-grid">
            {[S.sports[4], S.investigation[1], S.entertainment[3], S.africa[2]].map((s,i) => (
              <div key={s.id} className="stream-card" onClick={() => setStory(s)}>
                <div className="stream-thumb">
                  <Image src={img(s,300,169)} alt={s.headline} width={300} height={169}
                    style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                    onError={e=>err(e,s.id,300,169)} />
                  {i===3 && <div className="stream-live-badge">⏺ LIVE</div>}
                  <div className="stream-thumb-label">{s.category.toUpperCase()}</div>
                </div>
                <div className="stream-hl">{s.headline}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ ZONE 5: OPINION | MORE STORIES | INVESTIGATION ══ */}
      <div className="page-wrap">
        <div className="cnn-zone">
          <div className="cnn-col cnn-col-first">
            <Label text="Opinion & Analysis" color="#7C3AED" />
            <img src={img(S.opinion[0])} alt={S.opinion[0].headline}
              className="story-featured-img" onClick={() => setStory(S.opinion[0])}
              onError={e=>{(e.currentTarget as HTMLImageElement).src=`https://picsum.photos/seed/${S.opinion[0].id}/280/158`;}} />
            <div className="story-featured-hl" onClick={() => setStory(S.opinion[0])}>{S.opinion[0].headline}</div>
            <TextLink s={S.opinion[1]} os={setStory} />
            <TextLink s={S.opinion[2]} os={setStory} />
          </div>

          <div className="cnn-col" style={{ borderLeft:"1px solid #e0e0e0" }}>
            <Label text="More Top Stories" />
            <div className="story-main" onClick={() => setStory(S.sports[2])}>
              <Image src={img(S.sports[2],700,394)} alt={S.sports[2].headline}
                width={700} height={394} className="story-main-img"
                onError={e=>err(e,S.sports[2].id,700,394)} />
              <div className="story-main-hl">{S.sports[2].headline}</div>
              <div className="story-main-sum">{S.sports[2].snippet}</div>
            </div>
          </div>

          <div className="cnn-col cnn-col-last" style={{ borderLeft:"1px solid #e0e0e0" }}>
            <Label text="For Subscribers" color="#cc0000" />
            <img src={img(S.investigation[1])} alt={S.investigation[1].headline}
              className="story-right-img" onClick={() => setStory(S.investigation[1])}
              onError={e=>{(e.currentTarget as HTMLImageElement).src=`https://picsum.photos/seed/${S.investigation[1].id}/280/158`;}} />
            <div className="story-right-hl" onClick={() => setStory(S.investigation[1])}>{S.investigation[1].headline}</div>
            <SmallCard s={S.nigeria[2]} os={setStory} />
            <SmallCard s={S.entertainment[3]} os={setStory} />
          </div>
        </div>

        <Ad h={90} msg="🎓 Study Abroad 2026 — Scholarships for Nigerian Students" cta="Apply Now" color="#1D4ED8" />

        {/* ══ ZONE 6: HEALTH | SPORTS DEEP | ENTERTAINMENT ══ */}
        <div className="cnn-zone" style={{ borderBottom:"none" }}>
          <div className="cnn-col cnn-col-first">
            <Label text="Health" color="#0891B2" />
            <img src={img(S.health[0])} alt={S.health[0].headline}
              className="story-featured-img" onClick={() => setStory(S.health[0])}
              onError={e=>{(e.currentTarget as HTMLImageElement).src=`https://picsum.photos/seed/${S.health[0].id}/280/158`;}} />
            <div className="story-featured-hl" onClick={() => setStory(S.health[0])}>{S.health[0].headline}</div>
            <TextLink s={S.health[1]} os={setStory} />
            <TextLink s={S.nigeria[1]} os={setStory} />
          </div>

          <div className="cnn-col" style={{ borderLeft:"1px solid #e0e0e0" }}>
            <Label text="Sports" color="#007A3D" />
            <div className="story-main" onClick={() => setStory(S.sports[3])}>
              <Image src={img(S.sports[3],700,394)} alt={S.sports[3].headline}
                width={700} height={394} className="story-main-img"
                onError={e=>err(e,S.sports[3].id,700,394)} />
              <div className="story-main-hl">{S.sports[3].headline}</div>
              <div className="story-main-sum">{S.sports[3].snippet}</div>
            </div>
          </div>

          <div className="cnn-col cnn-col-last" style={{ borderLeft:"1px solid #e0e0e0" }}>
            <Label text="Entertainment" color="#7C3AED" />
            <img src={img(S.entertainment[2])} alt={S.entertainment[2].headline}
              className="story-right-img" onClick={() => setStory(S.entertainment[2])}
              onError={e=>{(e.currentTarget as HTMLImageElement).src=`https://picsum.photos/seed/${S.entertainment[2].id}/280/158`;}} />
            <div className="story-right-hl" onClick={() => setStory(S.entertainment[2])}>{S.entertainment[2].headline}</div>
            <SmallCard s={S.africa[1]} os={setStory} />
            <SmallCard s={S.sports[4]} os={setStory} />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-leak">
            <h3>GOT A <span>LEAK?</span></h3>
            <p>Submit tips securely. End-to-end encrypted. Identity never exposed — protected by Nigerian whistleblower law.</p>
            {lSent ? (
              <div style={{ color:"#6BCB77", fontWeight:700, padding:"16px 0" }}>🔐 Received & Encrypted. Our team reviews within 24 hours.</div>
            ) : (
              <>
                <div className="leak-grid">
                  <input className="fi" placeholder="Your name (optional)" value={ld.name} onChange={e=>setLd(d=>({...d,name:e.target.value}))} />
                  <select className="fi" value={ld.cat} onChange={e=>setLd(d=>({...d,cat:e.target.value}))}>
                    <option value="">Category...</option>
                    {["Government / Corruption","Security / Military","Business / Finance","Entertainment","Sports","Other"].map(o=><option key={o}>{o}</option>)}
                  </select>
                  <textarea className="fi fi-ta" placeholder="Describe the tip..." value={ld.text} onChange={e=>setLd(d=>({...d,text:e.target.value}))} />
                </div>
                <button className="leak-submit" onClick={()=>{ if(ld.text) setLSent(true); }}>🔒 Submit Securely</button>
                <div className="leak-note">🛡 <span>End-to-end encrypted.</span> NRT never reveals sources.</div>
              </>
            )}
          </div>

          <div className="footer-top">
            <div>
              <div className="footer-logo">NRT<span>.</span></div>
              <div className="footer-tagline">Nigeria Real Time — the nation&apos;s first AI-native 24/7 news network.</div>
              <div className="footer-socials">
                {["𝕏 Twitter","WhatsApp","Telegram","TikTok","YouTube","Instagram"].map(s=>(
                  <button key={s} className="soc">{s}</button>
                ))}
              </div>
            </div>
            {[
              { t:"Nigeria", l:[["Politics","/politics"],["Lagos","/nigeria"],["Economy","/economy"],["Sports","/sports"]] },
              { t:"Business", l:[["Markets","/economy"],["Fintech","/money"],["Oil & Gas","/economy"],["Startups","/tech"]] },
              { t:"World", l:[["Africa","/africa"],["World News","/world"],["Health","/health"],["Tech","/tech"]] },
              { t:"Company", l:[["About NRT","#about"],["Editorial","#editorial"],["Advertise","#advertise"],["Contact","#contact"]] },
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
            <span>© 2026 NRT · Nigeria Real Time. AI-powered. Human-verified.</span>
            <span>Built on Next.js · Claude AI · Railway</span>
          </div>
        </div>
      </footer>

      {story && <StoryModal story={story} onClose={() => setStory(null)} onStory={setStory} />}
      {leak  && <LeakModal onClose={() => setLeak(false)} />}
    </div>
  );
}
