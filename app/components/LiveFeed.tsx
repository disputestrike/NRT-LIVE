/**
 * LiveFeed — polls /api/news every 90s and rotates top stories
 * Falls back to static stories when API unavailable
 */
"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Story, S, getCatColor } from "../data/stories";

type LiveArticle = {
  id: string; category: string; category_slug: string;
  headline: string; snippet: string; image_url: string;
  confidence: string; published_at: string;
};

function toStory(a: LiveArticle): Story {
  return {
    id: a.id, category: a.category, categorySlug: a.category_slug,
    headline: a.headline, snippet: a.snippet, time: formatAgo(new Date(a.published_at)),
    confidence: a.confidence as "Verified"|"Developing"|"Unverified",
    body: "", image: a.image_url || `https://picsum.photos/seed/${a.id}/480/270`,
    related: [],
  };
}
function formatAgo(d: Date): string {
  const m = Math.floor((Date.now()-d.getTime())/60000);
  if(m<1) return "Just now"; if(m<60) return `${m} min${m===1?"":"s"} ago`;
  const h=Math.floor(m/60); return `${h} hr${h===1?"":"s"} ago`;
}

export default function LiveFeed({ onStory }: { onStory:(s:Story)=>void }) {
  const [articles, setArticles] = useState<Story[]>([...S.politics, ...S.economy, ...S.sports].slice(0,6));
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isLive, setIsLive] = useState(false);
  const [pulse, setPulse] = useState(false);

  const fetchLatest = useCallback(async () => {
    try {
      const res = await fetch("/api/news?limit=12", { cache:"no-store" });
      if (!res.ok) return;
      const data = await res.json();
      if (data.articles?.length > 0 && data.source === "db") {
        setArticles(data.articles.map(toStory));
        setIsLive(true);
        setLastUpdated(new Date());
        setPulse(true);
        setTimeout(() => setPulse(false), 2000);
      }
    } catch { /* keep current */ }
  }, []);

  useEffect(() => {
    // Initial fetch via timeout avoids synchronous setState in effect
    const initial = setTimeout(fetchLatest, 0);
    const id = setInterval(fetchLatest, 90_000);
    return () => { clearTimeout(initial); clearInterval(id); };
  }, [fetchLatest]);

  const c = getCatColor;

  return (
    <div>
      {/* Live status bar */}
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
        <span style={{ width:8, height:8, borderRadius:"50%", background: isLive ? "#007A3D" : "#888",
          boxShadow: isLive ? "0 0 0 3px rgba(0,122,61,0.2)" : "none",
          animation: pulse ? "blink 0.5s ease 3" : "none", display:"inline-block" }} />
        <span style={{ fontSize:11, fontWeight:700, letterSpacing:"1px", textTransform:"uppercase",
          color: isLive ? "#007A3D" : "#888", fontFamily:"'Inter',sans-serif" }}>
          {isLive ? "Live" : "Static"} · Updated {formatAgo(lastUpdated)}
        </span>
        {!isLive && (
          <span style={{ fontSize:10, color:"#aaa", fontFamily:"'Inter',sans-serif" }}>
            (Connect DB + ANTHROPIC_API_KEY for live feed)
          </span>
        )}
      </div>

      {/* 3-col grid */}
      <div className="card-grid-3" style={{ minWidth:0, width:"100%" }}>
        {articles.slice(0,3).map(s => (
          <div key={s.id} className="nc fade-up" onClick={() => onStory(s)}>
            <div className="nc-img-wrap">
              <Image src={s.image} alt={s.headline} width={480} height={270}
                style={{ width:"100%", aspectRatio:"16/9", objectFit:"cover", display:"block" }}
                onError={e=>{(e.target as HTMLImageElement).src=`https://picsum.photos/seed/${s.id}/480/270`;}} />
              <span className="nc-cat-pill" style={{ color:c(s.category) }}>{s.category}</span>
            </div>
            <div className="nc-body">
              <div className="nc-hl">{s.headline}</div>
              <div className="nc-snippet">{s.snippet}</div>
              <div className="nc-meta">
                <span>{s.time}</span>
                <span className={`conf-pill ${s.confidence==="Verified"?"conf-v":"conf-d"}`}>
                  {s.confidence==="Verified"?"✓ Verified":"⚠ Developing"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
