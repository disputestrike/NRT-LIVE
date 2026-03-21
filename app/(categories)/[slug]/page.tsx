"use client";
import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Ticker from "../../components/Ticker";
import Navbar from "../../components/Navbar";
import StoryModal from "../../components/StoryModal";
import LeakModal from "../../components/LeakModal";
import { STORIES, Story, getCatColor } from "../../data/stories";

const SLUG_LABELS: Record<string,string> = {
  politics:"Politics", economy:"Economy & Business", sports:"Sports",
  entertainment:"Entertainment", investigation:"Investigations",
  money:"Money / Hustle", tech:"Tech", health:"Health", world:"World",
  nigeria:"Nigeria", africa:"Africa", opinion:"Opinion"
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [story, setStory] = useState<Story | null>(null);
  const [leak, setLeak] = useState(false);

  const articles = useMemo(() => {
    const filtered = STORIES.filter(s =>
      s.categorySlug === slug ||
      s.category.toLowerCase().includes(slug) ||
      (slug === "nigeria" && ["politics","investigation","abuja","health"].some(c =>
        s.categorySlug === c || s.category.toLowerCase().includes(c)
      ))
    );
    return filtered.length > 0 ? filtered : STORIES.slice(0, 9);
  }, [slug]);

  const label = SLUG_LABELS[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
  const color = getCatColor(label);

  return (
    <div style={{ background:"var(--gray-bg)", minHeight:"100vh" }}>
      <Ticker />
      <Navbar onLeak={() => setLeak(true)} />

      {/* Section banner */}
      <div style={{ background:`linear-gradient(135deg,${color}18,${color}06)`, borderBottom:`4px solid ${color}`, padding:"28px 20px" }}>
        <div style={{ maxWidth:1300, margin:"0 auto" }}>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:3, textTransform:"uppercase", color:"var(--gray-text)", marginBottom:6 }}>NRT · Section</div>
          <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:48, letterSpacing:4, color:"var(--black)" }}>{label}</h1>
          <div style={{ fontSize:13, color:"var(--gray-text)", marginTop:4 }}>{articles.length} stories · Updated live · AI-verified</div>
        </div>
      </div>

      <div style={{ maxWidth:1300, margin:"0 auto", padding:"24px 20px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 300px", gap:24 }}>
          <div>
            {/* Featured */}
            {articles[0] && (
              <div style={{ cursor:"pointer", marginBottom:24, background:"white", borderRadius:12, overflow:"hidden", boxShadow:"0 2px 12px rgba(0,0,0,0.07)" }} onClick={() => setStory(articles[0])}>
                <div style={{ position:"relative", aspectRatio:"16/9", width:"100%" }}>
                  <Image src={articles[0].image} alt={articles[0].headline} fill style={{ objectFit:"cover" }} sizes="800px" />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(transparent 40%,rgba(0,0,0,0.85))", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:24 }}>
                    <span style={{ background:color, color:"white", fontSize:10, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", padding:"3px 12px", borderRadius:20, display:"inline-block", marginBottom:8, width:"fit-content" }}>{articles[0].category}</span>
                    <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:26, fontWeight:700, color:"white", lineHeight:1.2, marginBottom:8 }}>{articles[0].headline}</h2>
                    <p style={{ fontSize:13, color:"rgba(255,255,255,0.75)", lineHeight:1.5 }}>{articles[0].snippet}</p>
                    <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)", marginTop:8 }}>{articles[0].time}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Grid */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16 }}>
              {articles.slice(1).map(s => (
                <div key={s.id} onClick={() => setStory(s)} className="nc" style={{ cursor:"pointer" }}>
                  <div className="nc-img-wrap">
                    <Image src={s.image} alt={s.headline} width={300} height={169} style={{ width:"100%", aspectRatio:"16/9", objectFit:"cover" }} />
                    <span className="nc-cat-pill" style={{ color: getCatColor(s.category) }}>{s.category}</span>
                  </div>
                  <div className="nc-body">
                    <div className="nc-hl">{s.headline}</div>
                    <div className="nc-snippet">{s.snippet}</div>
                    <div className="nc-meta"><span>{s.time}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div style={{ background:"white", borderRadius:10, padding:"14px 16px", marginBottom:16, boxShadow:"0 2px 8px rgba(0,0,0,0.05)" }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:17, letterSpacing:2, marginBottom:12, borderTop:`3px solid ${color}`, paddingTop:8 }}>All Sections</div>
              {Object.entries(SLUG_LABELS).map(([s, l]) => (
                <a key={s} href={`/${s}`} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid var(--border)", fontSize:13, fontWeight:600, color: s === slug ? color : "var(--black)", textDecoration:"none" }}>
                  {l}
                  {s === slug && <span style={{ background:color, color:"white", fontSize:9, padding:"2px 8px", borderRadius:20, letterSpacing:1 }}>ACTIVE</span>}
                </a>
              ))}
            </div>
            <div style={{ background:"var(--gray-bg)", border:"1px solid var(--border)", height:250, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:8 }}>
              <span style={{ fontSize:24 }}>📢</span>
              <span style={{ fontSize:11, color:"var(--gray-text)", fontWeight:600 }}>300×250 Advertisement</span>
              <span style={{ fontSize:10, color:"var(--orange)", cursor:"pointer" }}>advertise@nrt.ng</span>
            </div>
          </div>
        </div>
      </div>

      {story && <StoryModal story={story} onClose={() => setStory(null)} onStory={setStory} />}
      {leak && <LeakModal onClose={() => setLeak(false)} />}
    </div>
  );
}
