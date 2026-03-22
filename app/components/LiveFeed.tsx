"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Story, S, getCatColor } from "../data/stories";

type LiveArticle = {
  id: string; category: string; category_slug: string;
  headline: string; snippet: string; image_url: string;
  confidence: string; published_at: string; body?: string;
};

function toStory(a: LiveArticle): Story {
  return {
    id: a.id, category: a.category, categorySlug: a.category_slug,
    headline: a.headline, snippet: a.snippet,
    time: formatAgo(new Date(a.published_at)),
    confidence: a.confidence as "Verified"|"Developing"|"Unverified",
    body: a.body || "", 
    image: a.image_url || `https://picsum.photos/seed/${a.id}/480/270`,
    related: [],
  };
}

function formatAgo(d: Date): string {
  const m = Math.floor((Date.now()-d.getTime())/60000);
  if(m<1) return "Just now"; if(m<60) return `${m} min${m===1?"":"s"} ago`;
  const h=Math.floor(m/60); return `${h} hr${h===1?"":"s"} ago`;
}

export default function LiveFeed({ onStory }: { onStory:(s:Story)=>void }) {
  const [articles, setArticles] = useState<Story[]>([
    ...S.politics, ...S.economy, ...S.sports
  ].slice(0,6));
  const [isLive, setIsLive] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [crawling, setCrawling] = useState(false);

  const fetchLatest = useCallback(async () => {
    try {
      const res = await fetch("/api/news?limit=12", { cache:"no-store" });
      if (!res.ok) return;
      const data = await res.json();
      if (data.articles?.length > 0 && data.source === "db") {
        setArticles(data.articles.map(toStory));
        setIsLive(true);
        setLastUpdated(new Date());
      }
    } catch { /* keep current */ }
  }, []);

  // Auto-trigger crawl if no live articles after 3 seconds
  const triggerCrawl = useCallback(async () => {
    if (crawling) return;
    setCrawling(true);
    try {
      await fetch("/api/cron", { method:"GET", cache:"no-store" });
      // Wait 5s then re-fetch
      setTimeout(fetchLatest, 5000);
    } catch {}
    setCrawling(false);
  }, [crawling, fetchLatest]);

  useEffect(() => {
    const init = setTimeout(async () => {
      await fetchLatest();
    }, 0);
    const interval = setInterval(fetchLatest, 90_000);
    return () => { clearTimeout(init); clearInterval(interval); };
  }, [fetchLatest]);

  // If still static after 4s, trigger a crawl automatically
  useEffect(() => {
    const check = setTimeout(() => {
      if (!isLive) triggerCrawl();
    }, 4000);
    return () => clearTimeout(check);
  }, [isLive, triggerCrawl]);

  const c = getCatColor;

  return (
    <div>
      {/* Live status indicator */}
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12, justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <span style={{ 
            width:8, height:8, borderRadius:"50%", display:"inline-block",
            background: isLive ? "#007A3D" : crawling ? "#FF5C00" : "#888",
            animation: (isLive||crawling) ? "blink 1s infinite" : "none",
            boxShadow: isLive ? "0 0 0 3px rgba(0,122,61,0.2)" : "none"
          }} />
          <span style={{ fontSize:11, fontWeight:700, letterSpacing:"1px", textTransform:"uppercase",
            color: isLive ? "#007A3D" : crawling ? "#FF5C00" : "#888",
            fontFamily:"'Inter',sans-serif" }}>
            {isLive ? `Live · Updated ${formatAgo(lastUpdated)}` : crawling ? "Fetching latest news..." : "Loading..."}
          </span>
        </div>
        <Link href="/admin" style={{ fontSize:10, color:"#aaa", textDecoration:"none", fontFamily:"'Inter',sans-serif" }}>
          Admin →
        </Link>
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
