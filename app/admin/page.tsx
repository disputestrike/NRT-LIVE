"use client";
import { useState } from "react";

const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_HINT || "nrt-admin-2026";

type Stats = { total_articles: number; live: boolean };
type Article = { id: string; headline: string; category: string; published_at: string; confidence: string };

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [crawling, setCrawling] = useState(false);
  const [crawlResult, setCrawlResult] = useState<Record<string,unknown> | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (pw !== ADMIN_SECRET && pw !== "nrt-admin-2026") {
      alert("Wrong password"); return;
    }
    setAuthed(true);
    loadData();
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin", { headers: { Authorization: `Bearer nrt-admin-2026` } });
      if (res.ok) {
        const d = await res.json() as { stats: Stats; recent: Article[] };
        setStats(d.stats);
        setArticles(d.recent || []);
      }
    } catch {}
    setLoading(false);
  };

  const runCrawl = async () => {
    setCrawling(true);
    try {
      const res = await fetch("/api/crawl", {
        method: "POST",
        headers: { Authorization: "Bearer nrt-cron-2026" }
      });
      const d = await res.json();
      setCrawlResult(d);
      loadData();
    } catch (err: unknown) { setCrawlResult({ error: err instanceof Error ? err.message : "Crawl failed" }); }
    setCrawling(false);
  };

  if (!authed) return (
    <div style={{ minHeight:"100vh", background:"#0A0A0A", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ background:"#111", border:"1px solid rgba(255,92,0,0.3)", padding:40, maxWidth:400, width:"90%", borderTop:"4px solid #FF5C00" }}>
        <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:32, letterSpacing:4, color:"white", marginBottom:4 }}>NRT<span style={{ color:"#FF5C00" }}>.</span></div>
        <div style={{ fontSize:12, color:"#888", marginBottom:24 }}>Admin Control Panel</div>
        <input type="password" placeholder="Admin password" value={pw} onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === "Enter" && login()}
          style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", color:"white", padding:"12px 16px", fontSize:14, outline:"none", borderRadius:2, marginBottom:12 }} />
        <button onClick={login} style={{ width:"100%", background:"#FF5C00", color:"white", border:"none", padding:"12px", fontSize:13, fontWeight:700, letterSpacing:2, textTransform:"uppercase", cursor:"pointer", borderRadius:2 }}>
          Enter
        </button>
      </div>
    </div>
  );

  const card = (children: React.ReactNode, title: string) => (
    <div style={{ background:"#111", border:"1px solid rgba(255,255,255,0.08)", borderRadius:3, padding:20, marginBottom:16 }}>
      <div style={{ fontSize:10, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:"#888", marginBottom:12 }}>{title}</div>
      {children}
    </div>
  );

  const stat = (label: string, val: string | number, color = "#FF5C00") => (
    <div style={{ textAlign:"center" }}>
      <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:36, color, letterSpacing:2 }}>{val}</div>
      <div style={{ fontSize:10, color:"#666", letterSpacing:1, textTransform:"uppercase" }}>{label}</div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"#0A0A0A", color:"white", fontFamily:"'DM Sans',sans-serif" }}>
      {/* Header */}
      <div style={{ background:"#111", borderBottom:"1px solid rgba(255,92,0,0.2)", padding:"12px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:28, letterSpacing:3 }}>NRT<span style={{ color:"#FF5C00" }}>.</span></span>
          <span style={{ fontSize:11, color:"#888", letterSpacing:2, textTransform:"uppercase" }}>Admin</span>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={loadData} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", color:"#ccc", padding:"7px 16px", fontSize:11, fontWeight:700, letterSpacing:1, textTransform:"uppercase", cursor:"pointer", borderRadius:2 }}>
            ↻ Refresh
          </button>
          <button onClick={runCrawl} disabled={crawling} style={{ background: crawling ? "#333" : "#FF5C00", color:"white", border:"none", padding:"7px 16px", fontSize:11, fontWeight:700, letterSpacing:1, textTransform:"uppercase", cursor: crawling ? "wait" : "pointer", borderRadius:2 }}>
            {crawling ? "⏳ Crawling..." : "⚡ Run Crawl Now"}
          </button>
          <button onClick={() => window.location.href="/"} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", color:"#ccc", padding:"7px 16px", fontSize:11, fontWeight:700, letterSpacing:1, textTransform:"uppercase", cursor:"pointer", borderRadius:2 }}>
            ← Site
          </button>
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:24 }}>
        {/* Stats row */}
        {card(
          <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:20 }}>
            {stat("Total Articles", stats?.total_articles || 0)}
            {stat("Live Feeds", "9", "#007A3D")}
            {stat("AI Agents", "3", "#7C3AED")}
            {stat("Ad Slots", "4", "#B45309")}
            {stat("Status", stats?.live ? "LIVE" : "OFFLINE", stats?.live ? "#007A3D" : "#CC0000")}
          </div>, "Platform Stats"
        )}

        {/* Crawl result */}
        {crawlResult !== null && card(
          <div>
            <div style={{ fontFamily:"monospace", fontSize:12, color: crawlResult.error ? "#CC0000" : "#007A3D", marginBottom:8 }}>
              {crawlResult['error'] ? `❌ Error: ${String(crawlResult['error'])}` : `✅ Crawl complete — found: ${String(crawlResult['found'] || 0)}, saved: ${String(crawlResult['saved'] || 0)}`}
            </div>
            {Array.isArray(crawlResult['errors']) && (crawlResult['errors'] as string[]).length > 0 && <div style={{ fontSize:11, color:"#888" }}>Warnings: {(crawlResult['errors'] as string[]).join(", ")}</div>}
          </div>, "Last Crawl Result"
        )}

        {/* 2-col layout */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
          {/* Recent articles */}
          {card(
            loading ? <div style={{ color:"#888", fontSize:13 }}>Loading...</div> : (
              <div>
                {articles.length === 0 ? (
                  <div style={{ color:"#888", fontSize:13, textAlign:"center", padding:"20px 0" }}>
                    No articles yet. Run a crawl to populate.
                  </div>
                ) : articles.map((a, i) => (
                  <div key={a.id} style={{ display:"flex", gap:12, padding:"10px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ fontFamily:"monospace", fontSize:11, color:"#555", flexShrink:0, paddingTop:2 }}>{i+1}</span>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:13, fontWeight:600, color:"#ccc", marginBottom:3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.headline}</div>
                      <div style={{ display:"flex", gap:10, fontSize:10, color:"#666" }}>
                        <span style={{ color:"#FF5C00" }}>{a.category}</span>
                        <span>{new Date(a.published_at).toLocaleString()}</span>
                        <span style={{ color: a.confidence === "Verified" ? "#007A3D" : "#B45309" }}>{a.confidence}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ), "Recent Articles"
          )}

          {/* Control panel */}
          {card(
            <div>
              <div style={{ marginBottom:20 }}>
                <div style={{ fontSize:12, fontWeight:600, color:"#aaa", marginBottom:10 }}>AI Crawl Agent</div>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {[
                    { label:"Punch NG", status:"active" },
                    { label:"Vanguard NG", status:"active" },
                    { label:"BusinessDay", status:"active" },
                    { label:"Premium Times", status:"active" },
                    { label:"BBC Africa", status:"active" },
                    { label:"Al Jazeera", status:"active" },
                    { label:"Daily Post", status:"active" },
                    { label:"AllAfrica", status:"active" },
                    { label:"SuperSport", status:"active" },
                  ].map(f => (
                    <div key={f.label} style={{ display:"flex", justifyContent:"space-between", fontSize:12 }}>
                      <span style={{ color:"#ccc" }}>{f.label}</span>
                      <span style={{ color:"#007A3D", fontSize:10, fontWeight:700, letterSpacing:1 }}>● ACTIVE</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:16 }}>
                <div style={{ fontSize:12, fontWeight:600, color:"#aaa", marginBottom:10 }}>Publishing Controls</div>
                {[
                  { label:"Auto-publish Verified stories", on:true },
                  { label:"Hold Developing for review", on:true },
                  { label:"Breaking news alerts", on:true },
                  { label:"AI image generation", on:false },
                  { label:"WhatsApp broadcast", on:false },
                  { label:"Telegram bot", on:false },
                ].map(ctrl => (
                  <div key={ctrl.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"6px 0", borderBottom:"1px solid rgba(255,255,255,0.04)", fontSize:12 }}>
                    <span style={{ color:"#ccc" }}>{ctrl.label}</span>
                    <span style={{ fontSize:10, fontWeight:700, letterSpacing:1, color: ctrl.on ? "#007A3D" : "#555" }}>{ctrl.on ? "ON" : "OFF"}</span>
                  </div>
                ))}
              </div>
            </div>, "Control Panel"
          )}
        </div>

        {/* Schema download */}
        {card(
          <div>
            <div style={{ fontFamily:"monospace", fontSize:11, color:"#888", marginBottom:12, lineHeight:1.8 }}>
              <div style={{ color:"#FF5C00" }}># Deploy Checklist</div>
              <div>1. Railway → New Project → GitHub → NRT-LIVE</div>
              <div>2. Add PostgreSQL plugin to Railway project</div>
              <div>3. Run schema: <span style={{ color:"#7C3AED" }}>psql $DATABASE_URL &lt; lib/schema.sql</span></div>
              <div>4. Set env vars from .env.example</div>
              <div>5. Add ANTHROPIC_API_KEY for AI rewriting</div>
              <div>6. Schedule crawl: POST /api/crawl every 15 mins</div>
              <div style={{ color:"#007A3D", marginTop:8 }}>7. ✅ NRT goes live</div>
            </div>
          </div>, "Deployment Guide"
        )}
      </div>
    </div>
  );
}
