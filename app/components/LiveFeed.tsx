"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { Story, S } from "../data/stories";

type DBArticle = {
  id: string; category: string; category_slug: string;
  headline: string; snippet: string; body: string;
  image_url: string; published_at: string;
};

function toStory(a: DBArticle): Story {
  const m = Math.floor((Date.now() - new Date(a.published_at).getTime()) / 60000);
  const ago = m < 1 ? "Just now" : m < 60 ? `${m}m ago` : `${Math.floor(m/60)}h ago`;
  return {
    id: String(a.id), category: a.category || "Nigeria",
    categorySlug: a.category_slug || "nigeria",
    headline: a.headline, snippet: a.snippet || "",
    time: ago, confidence: "Verified" as const,
    body: a.body || "",
    image: a.image_url || `https://picsum.photos/seed/${a.id}/480/270`,
    related: [],
  };
}

const DEFAULTS = [S.politics[0], S.economy[0], S.sports[0]];

export default function LiveFeed({ onStory }: { onStory:(s:Story)=>void }) {
  const [articles, setArticles] = useState<Story[]>(DEFAULTS);
  const [isLive, setIsLive] = useState(false);
  const [status, setStatus] = useState("Loading…");
  const pollRef = useRef<ReturnType<typeof setInterval>|null>(null);

  const fetchNews = useCallback(async () => {
    try {
      const res = await fetch(`/api/news?limit=6&_=${Date.now()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" }
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.source === "db" && data.articles?.length > 0) {
        setArticles(data.articles.map(toStory));
        setIsLive(true);
        setStatus(`Live · ${data.articles.length} stories`);
      }
    } catch {}
  }, []);

  const triggerCrawlAndPoll = useCallback(async () => {
    setStatus("Fetching latest news…");
    try {
      // Trigger auto-crawl (non-blocking on server)
      await fetch(`/api/auto-crawl?_=${Date.now()}`, { cache:"no-store" });
      // Start polling for results every 5s for up to 30s
      let attempts = 0;
      const poll = setInterval(async () => {
        attempts++;
        const res = await fetch(`/api/news?limit=6&_=${Date.now()}`, { cache:"no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.source === "db" && data.articles?.length > 0) {
            setArticles(data.articles.map(toStory));
            setIsLive(true);
            setStatus(`Live · Updated just now`);
            clearInterval(poll);
          }
        }
        if (attempts >= 6) clearInterval(poll); // give up after 30s
      }, 5000);
    } catch {}
  }, []);

  // On mount: trigger auto-crawl, then poll for results
  useEffect(() => {
    triggerCrawlAndPoll();
    // Refresh every 5 minutes
    pollRef.current = setInterval(triggerCrawlAndPoll, 5 * 60 * 1000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [triggerCrawlAndPoll]);

  return (
    <div>
      {/* Status */}
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16, fontSize:12, fontFamily:"'Inter',sans-serif" }}>
        <span style={{
          width:7, height:7, borderRadius:"50%", flexShrink:0, display:"inline-block",
          background: isLive ? "#007A3D" : "#FF5C00",
          animation: "pulse 2s infinite",
        }} />
        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
        <span style={{ color: isLive ? "#007A3D" : "#FF5C00", fontWeight:600 }}>{status}</span>
        <button onClick={triggerCrawlAndPoll}
          style={{ marginLeft:"auto", fontSize:11, color:"#888", background:"none", border:"1px solid #e0e0e0", padding:"2px 10px", borderRadius:20, cursor:"pointer" }}>
          ↻ Refresh
        </button>
      </div>

      {/* 3 cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
        {articles.slice(0,3).map(s => (
          <div key={s.id} onClick={() => onStory(s)}
            style={{ cursor:"pointer", borderBottom:"1px solid #e0e0e0", paddingBottom:16 }}>
            <div style={{ position:"relative", width:"100%", aspectRatio:"16/9", background:"#eee", marginBottom:10, overflow:"hidden" }}>
              <Image src={s.image} alt={s.headline} fill style={{ objectFit:"cover" }}
                onError={e=>{(e.target as HTMLImageElement).src=`https://picsum.photos/seed/${s.id}/400/225`;}} />
            </div>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"1px", textTransform:"uppercase", color:"#888", marginBottom:5 }}>
              {s.category}
            </div>
            <div style={{ fontSize:18, fontWeight:700, color:"#1a1a1a", lineHeight:1.3, marginBottom:6 }}>
              {s.headline}
            </div>
            <div style={{ fontSize:14, color:"#555", lineHeight:1.5, marginBottom:8,
              overflow:"hidden", display:"-webkit-box",
              WebkitLineClamp:2, WebkitBoxOrient:"vertical" as const }}>
              {s.snippet}
            </div>
            <div style={{ fontSize:12, color:"#999" }}>{s.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
