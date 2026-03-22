"use client";
import { useState } from "react";

type Stats = { total_articles:number; live:boolean; crawl_count?:number };
type Article = { id:string; headline:string; category:string; published_at:string; confidence:string; validation_score?:number };

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [stats, setStats] = useState<Stats|null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [crawling, setCrawling] = useState(false);
  const [crawlResult, setCrawlResult] = useState<Record<string,unknown>|null>(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"articles"|"crawl"|"deploy">("articles");

  const login = async () => {
    if (pw !== "nrt-admin-2026") { alert("Wrong password"); return; }
    setAuthed(true); loadData();
  };
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin", { headers:{ Authorization:"Bearer nrt-admin-2026" } });
      if (res.ok) { const d = await res.json(); setStats(d.stats); setArticles(d.recent||[]); }
    } catch {}
    setLoading(false);
  };
  const runCrawl = async () => {
    setCrawling(true);
    try {
      const res = await fetch("/api/crawl", { method:"POST", headers:{ Authorization:"Bearer nrt-cron-2026" } });
      setCrawlResult(await res.json()); loadData();
    } catch (err:unknown) { setCrawlResult({ error: err instanceof Error ? err.message : "Failed" }); }
    setCrawling(false);
  };

  const bg = "#0A0A0A", card = "#111", border = "rgba(255,92,0,0.15)";

  if (!authed) return (
    <div style={{ minHeight:"100vh", background:bg, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ background:card, border:"1px solid "+border, padding:40, maxWidth:380, width:"90%", borderTop:"4px solid #FF5C00", borderRadius:4 }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, letterSpacing:4, color:"white", marginBottom:4 }}>NRT<span style={{ color:"#FF5C00" }}>.</span></div>
        <div style={{ fontSize:12, color:"#666", marginBottom:24, fontFamily:"'Inter',sans-serif" }}>Admin Control Panel</div>
        <input type="password" placeholder="Admin password" value={pw} onChange={e=>setPw(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&login()}
          style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", color:"white", padding:"12px 16px", fontSize:14, outline:"none", borderRadius:4, marginBottom:12, fontFamily:"'Inter',sans-serif" }} />
        <button onClick={login}
          style={{ width:"100%", background:"#FF5C00", color:"white", border:"none", padding:12, fontSize:13, fontWeight:700, letterSpacing:1, textTransform:"uppercase", cursor:"pointer", borderRadius:4, fontFamily:"'Inter',sans-serif" }}>
          Enter
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:bg, color:"white", fontFamily:"'Inter',sans-serif" }}>
      {/* Header */}
      <div style={{ background:card, borderBottom:"1px solid "+border, padding:"12px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, letterSpacing:3 }}>NRT<span style={{ color:"#FF5C00" }}>.</span></span>
          <span style={{ fontSize:11, color:"#888", letterSpacing:2, textTransform:"uppercase" }}>Admin</span>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {(["articles","crawl","deploy"] as const).map(t => (
            <button key={t} onClick={()=>setTab(t)}
              style={{ background:tab===t?"#FF5C00":"rgba(255,255,255,0.05)", color:tab===t?"white":"#888", border:"1px solid rgba(255,255,255,0.08)", padding:"6px 16px", fontSize:11, fontWeight:700, letterSpacing:1, textTransform:"uppercase", cursor:"pointer", borderRadius:4 }}>
              {t}
            </button>
          ))}
          <button onClick={loadData} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", color:"#ccc", padding:"6px 14px", fontSize:11, fontWeight:600, cursor:"pointer", borderRadius:4 }}>↻ Refresh</button>
          <button onClick={()=>window.location.href="/"} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", color:"#ccc", padding:"6px 14px", fontSize:11, fontWeight:600, cursor:"pointer", borderRadius:4 }}>← Site</button>
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:24 }}>

        {/* Stats row */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:12, marginBottom:20 }}>
          {[
            { l:"Articles", v:stats?.total_articles||0, c:"#FF5C00" },
            { l:"Live Feeds", v:10, c:"#007A3D" },
            { l:"AI Agents", v:3, c:"#7C3AED" },
            { l:"Categories", v:12, c:"#1D4ED8" },
            { l:"Status", v:stats?.live?"LIVE":"OFFLINE", c:stats?.live?"#007A3D":"#CC0000" },
          ].map(st => (
            <div key={st.l} style={{ background:card, border:"1px solid rgba(255,255,255,0.06)", borderRadius:6, padding:"16px 12px", textAlign:"center" }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, color:st.c, letterSpacing:2 }}>{st.v}</div>
              <div style={{ fontSize:10, color:"#666", letterSpacing:1, textTransform:"uppercase" }}>{st.l}</div>
            </div>
          ))}
        </div>

        {/* ARTICLES TAB */}
        {tab === "articles" && (
          <div style={{ background:card, border:"1px solid rgba(255,255,255,0.06)", borderRadius:6, padding:20 }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:"#888", marginBottom:14 }}>Recent Articles</div>
            {loading ? <div style={{ color:"#555", textAlign:"center", padding:20 }}>Loading...</div> : (
              articles.length===0
                ? <div style={{ color:"#444", textAlign:"center", padding:30 }}>
                    <div style={{ fontSize:32, marginBottom:12 }}>📭</div>
                    <div>No articles yet. Run a crawl to populate the database.</div>
                    <button onClick={()=>setTab("crawl")} style={{ marginTop:16, background:"#FF5C00", color:"white", border:"none", padding:"8px 24px", borderRadius:4, cursor:"pointer", fontWeight:700 }}>→ Go to Crawl</button>
                  </div>
                : articles.map((a,i) => (
                  <div key={a.id} style={{ display:"flex", gap:12, padding:"10px 0", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                    <span style={{ fontFamily:"monospace", fontSize:11, color:"#444", flexShrink:0, paddingTop:2 }}>{i+1}</span>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:13, fontWeight:600, color:"#ccc", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.headline}</div>
                      <div style={{ fontSize:11, color:"#555", marginTop:3, display:"flex", gap:12 }}>
                        <span style={{ color:"#FF5C00" }}>{a.category}</span>
                        <span>{new Date(a.published_at).toLocaleString()}</span>
                        <span style={{ color:a.confidence==="Verified"?"#007A3D":"#B45309" }}>{a.confidence}</span>
                        {a.validation_score && <span style={{ color:"#666" }}>Score: {a.validation_score}</span>}
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        )}

        {/* CRAWL TAB */}
        {tab === "crawl" && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
            <div style={{ background:card, border:"1px solid rgba(255,255,255,0.06)", borderRadius:6, padding:20 }}>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:"#888", marginBottom:16 }}>Crawl Control</div>
              <button onClick={runCrawl} disabled={crawling}
                style={{ width:"100%", background:crawling?"#333":"#FF5C00", color:"white", border:"none", padding:14, fontSize:13, fontWeight:700, letterSpacing:1, textTransform:"uppercase", cursor:crawling?"wait":"pointer", borderRadius:4, marginBottom:16 }}>
                {crawling ? "⏳ Crawling 10 feeds..." : "⚡ Run Crawl Now"}
              </button>
              {crawlResult && (
                <div style={{ fontFamily:"monospace", fontSize:12, padding:14, background:"rgba(255,255,255,0.03)", borderRadius:4, color:crawlResult["error"]?"#CC0000":"#007A3D" }}>
                  {crawlResult["error"]
                    ? `❌ ${String(crawlResult["error"])}`
                    : `✅ Found: ${String(crawlResult["found"]||0)} | Saved: ${String(crawlResult["saved"]||0)} | Validated: ${String(crawlResult["validated"]||0)}`
                  }
                </div>
              )}
              <div style={{ marginTop:16 }}>
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:"#888", marginBottom:10 }}>Feed Status</div>
                {["Punch NG","Vanguard NG","BusinessDay","Premium Times","Sahara Reporters","BBC Africa","Al Jazeera","The Guardian","SuperSport","Daily Post"].map(f => (
                  <div key={f} style={{ display:"flex", justifyContent:"space-between", fontSize:12, padding:"5px 0", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                    <span style={{ color:"#ccc" }}>{f}</span>
                    <span style={{ color:"#007A3D", fontSize:10, fontWeight:700, letterSpacing:1 }}>● ACTIVE</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background:card, border:"1px solid rgba(255,255,255,0.06)", borderRadius:6, padding:20 }}>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:"#888", marginBottom:16 }}>Validation Agent</div>
              {[
                { check:"Headline quality (6+ words)", threshold:"Pass" },
                { check:"Body length (200+ words)", threshold:"30pts" },
                { check:"Snippet length (15-80 words)", threshold:"15pts" },
                { check:"Image URL valid (HTTPS)", threshold:"20pts" },
                { check:"Category valid", threshold:"10pts" },
                { check:"Confidence label present", threshold:"10pts" },
                { check:"No duplicate headline words", threshold:"10pts" },
              ].map(v => (
                <div key={v.check} style={{ display:"flex", justifyContent:"space-between", fontSize:12, padding:"6px 0", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ color:"#ccc" }}>{v.check}</span>
                  <span style={{ color:"#FF5C00", fontWeight:600 }}>{v.threshold}</span>
                </div>
              ))}
              <div style={{ marginTop:14, padding:10, background:"rgba(0,122,61,0.1)", borderRadius:4, fontSize:12, color:"#007A3D", fontWeight:600 }}>
                Publish threshold: score ≥ 70 / 100
              </div>
            </div>
          </div>
        )}

        {/* DEPLOY TAB */}
        {tab === "deploy" && (
          <div style={{ background:card, border:"1px solid rgba(255,255,255,0.06)", borderRadius:6, padding:24 }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:"#888", marginBottom:20 }}>Go-Live Checklist</div>
            {[
              { step:"1", label:"Railway Project", detail:"New Project → Deploy from GitHub → disputestrike/NRT-LIVE", done:true },
              { step:"2", label:"PostgreSQL Plugin", detail:"Add Railway PostgreSQL plugin to your project", done:false },
              { step:"3", label:"Run Schema", detail:"psql $DATABASE_URL < lib/schema.sql", done:false },
              { step:"4", label:"CEREBRAS_API_KEY", detail:"Set in Railway environment variables (cloud.cerebras.ai)", done:false },
              { step:"5", label:"DATABASE_URL", detail:"Auto-set by Railway PostgreSQL plugin", done:false },
              { step:"6", label:"CRON_SECRET", detail:"Set to: nrt-cron-2026 (or your own)", done:false },
              { step:"7", label:"Schedule Crawl", detail:"POST /api/crawl every 15 mins — use Railway Cron or cron-job.org", done:false },
              { step:"8", label:"DNS", detail:"Point nrt.ng → Railway domain", done:false },
              { step:"9", label:"GO LIVE", detail:"NRT auto-crawls, auto-publishes, auto-refreshes", done:false },
            ].map(s => (
              <div key={s.step} style={{ display:"flex", gap:14, padding:"12px 0", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                <div style={{ width:28, height:28, borderRadius:"50%", background:s.done?"#007A3D":"rgba(255,92,0,0.15)", border:"1px solid "+(s.done?"#007A3D":"rgba(255,92,0,0.3)"), display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:s.done?"white":"#FF5C00", flexShrink:0 }}>
                  {s.done ? "✓" : s.step}
                </div>
                <div>
                  <div style={{ fontSize:14, fontWeight:700, color:s.done?"#007A3D":"white", marginBottom:3 }}>{s.label}</div>
                  <div style={{ fontSize:12, color:"#666", fontFamily:"monospace" }}>{s.detail}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
