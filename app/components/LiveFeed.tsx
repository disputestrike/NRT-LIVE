"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Story, S } from "../data/stories";

type DBArticle = {
  id: string; category: string; category_slug: string;
  headline: string; snippet: string; body: string;
  image_url: string; published_at: string; is_breaking: boolean;
};

function toStory(a: DBArticle): Story {
  const ago = () => {
    const m = Math.floor((Date.now()-new Date(a.published_at).getTime())/60000);
    if(m<1) return "Just now";
    if(m<60) return `${m} min${m===1?"":"s"} ago`;
    const h=Math.floor(m/60); return `${h} hr${h===1?"":"s"} ago`;
  };
  return {
    id: String(a.id),
    category: a.category || "Nigeria",
    categorySlug: a.category_slug || "nigeria",
    headline: a.headline,
    snippet: a.snippet || "",
    time: ago(),
    confidence: "Verified" as const,
    body: a.body || "",
    image: a.image_url || `https://picsum.photos/seed/${a.id}/480/270`,
    related: [],
  };
}

export default function LiveFeed({ onStory }: { onStory:(s:Story)=>void }) {
  // Start with static stories immediately visible
  const defaults = [...S.politics.slice(0,1), ...S.economy.slice(0,1), ...S.sports.slice(0,1)];
  const [articles, setArticles] = useState<Story[]>(defaults);
  const [isLive, setIsLive] = useState(false);
  const [crawling, setCrawling] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date|null>(null);

  const fetchLatest = useCallback(async () => {
    try {
      const res = await fetch("/api/news?limit=6", { cache:"no-store" });
      if (!res.ok) return false;
      const data = await res.json();
      if (data.source === "db" && data.articles?.length > 0) {
        setArticles(data.articles.map(toStory));
        setIsLive(true);
        setLastUpdate(new Date());
        return true;
      }
      return false;
    } catch { return false; }
  }, []);

  const triggerCrawl = useCallback(async () => {
    if (crawling) return;
    setCrawling(true);
    try {
      await fetch("/api/crawl", {
        method: "POST",
        headers: { "Authorization": "Bearer nrt-cron-2026" },
        cache: "no-store",
      });
      // Wait then fetch
      setTimeout(async () => {
        await fetchLatest();
        setCrawling(false);
      }, 8000);
    } catch {
      setCrawling(false);
    }
  }, [crawling, fetchLatest]);

  // On mount: fetch from DB, trigger crawl if nothing there
  useEffect(() => {
    const init = setTimeout(async () => {
      const hasLive = await fetchLatest();
      if (!hasLive) {
        // No DB articles — trigger crawl automatically
        await triggerCrawl();
      }
    }, 500);
    return () => clearTimeout(init);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Poll every 90s
  useEffect(() => {
    const id = setInterval(fetchLatest, 90_000);
    return () => clearInterval(id);
  }, [fetchLatest]);

  const ago = lastUpdate ? Math.floor((Date.now()-lastUpdate.getTime())/60000) : null;

  return (
    <div>
      {/* Status bar */}
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14, fontSize:12, fontFamily:"'Inter',sans-serif" }}>
        <span style={{
          width:7, height:7, borderRadius:"50%", display:"inline-block", flexShrink:0,
          background: isLive ? "#007A3D" : crawling ? "#FF5C00" : "#999",
          boxShadow: isLive ? "0 0 0 3px rgba(0,122,61,0.15)" : "none",
        }} />
        <span style={{ color: isLive ? "#007A3D" : crawling ? "#FF5C00" : "#888", fontWeight:600 }}>
          {isLive ? `Live${ago !== null ? ` · Updated ${ago === 0 ? "just now" : `${ago}m ago`}` : ""}` : crawling ? "Fetching latest news…" : "Loading…"}
        </span>
        {isLive && (
          <button onClick={triggerCrawl} disabled={crawling}
            style={{ marginLeft:"auto", fontSize:11, color:"#FF5C00", background:"none", border:"1px solid #FF5C00", padding:"2px 10px", borderRadius:20, cursor:"pointer" }}>
            {crawling ? "Refreshing…" : "↻ Refresh"}
          </button>
        )}
      </div>

      {/* 3 story cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
        {articles.slice(0,3).map(s => (
          <div key={s.id} onClick={() => onStory(s)} style={{ cursor:"pointer", borderBottom:"1px solid #e0e0e0", paddingBottom:16 }}>
            <div style={{ position:"relative", width:"100%", aspectRatio:"16/9", background:"#eee", marginBottom:10, overflow:"hidden" }}>
              <Image
                src={s.image} alt={s.headline} fill style={{ objectFit:"cover" }}
                onError={e=>{(e.target as HTMLImageElement).src=`https://picsum.photos/seed/${s.id}/400/225`;}}
              />
            </div>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"1px", textTransform:"uppercase", color:"#888", marginBottom:5 }}>
              {s.category}
            </div>
            <div style={{ fontSize:18, fontWeight:700, color:"#1a1a1a", lineHeight:1.3, marginBottom:6 }}>
              {s.headline}
            </div>
            <div style={{ fontSize:14, color:"#555", lineHeight:1.5, marginBottom:8,
              display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" as const, overflow:"hidden" }}>
              {s.snippet}
            </div>
            <div style={{ fontSize:12, color:"#999" }}>{s.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
