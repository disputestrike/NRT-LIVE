"use client";
import { useEffect } from "react";
import { Story, STORIES, getCatColor } from "../data/stories";

export default function StoryModal({ story, onClose, onStory }: {
  story: Story | null;
  onClose: () => void;
  onStory: (s: Story) => void;
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    document.body.style.overflow = story ? "hidden" : "";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [story, onClose]);

  if (!story) return null;

  const related = story.related.map(id => STORIES.find(s => s.id === id)).filter(Boolean) as Story[];

  return (
    <div className="modal-bg open" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* Ad banner top of article */}
        <div style={{ borderBottom:"1px solid var(--border)" }}>
          <div className="ad-slot ad-leaderboard" style={{ height:60, margin:0, borderRadius:0, background:"#f9f9f9", border:"none", borderBottom:"1px solid var(--border)" }}>
            <div className="ad-inner"><div className="ad-placeholder">— Advertisement —</div></div>
          </div>
        </div>

        <div className="modal-body">
          <div className="article-grid">
            {/* Main article */}
            <div className="article-main">
              <div className="art-cat" style={{ color: getCatColor(story.category) }}>{story.category}</div>
              <h1 className="art-hl">{story.headline}</h1>
              <div className="art-meta">
                <span>NRT Newsroom</span>
                <span>·</span>
                <span>{story.time}</span>
                <span>·</span>
                <span className={story.confidence === "Verified" ? "tag-verified" : "tag-developing"}>
                  {story.confidence === "Verified" ? "✓ Verified" : "⚠ Developing"}
                </span>
              </div>
              <div className="art-hero-ph" style={{ background: getBg(story.phClass) }}>
                <span style={{ fontSize:64 }}>{story.emoji}</span>
              </div>
              <div className="art-body" dangerouslySetInnerHTML={{ __html: story.body }} />
            </div>

            {/* Sidebar */}
            <div>
              {/* Related stories */}
              <div className="related-stories">
                <div className="rs-title">Related Stories</div>
                {related.map(r => (
                  <div key={r.id} className="list-card" onClick={() => onStory(r)}>
                    <div className="lc-img-ph" style={{ background: getBg(r.phClass), width:80, height:60, fontSize:20, display:"flex", alignItems:"center", justifyContent:"center", borderRadius:2, flexShrink:0 }}>
                      {r.emoji}
                    </div>
                    <div className="lc-body">
                      <div className="lc-cat" style={{ color: getCatColor(r.category) }}>{r.category}</div>
                      <div className="lc-hl">{r.headline}</div>
                      <div className="lc-meta">{r.time}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ad */}
              <div className="ad-slot ad-rect" style={{ marginTop:16 }}>
                <div className="ad-inner"><div className="ad-placeholder">300×250<br/>Ad Space</div></div>
              </div>
            </div>
          </div>

          {/* More stories below article */}
          <div style={{ marginTop:28, borderTop:"2px solid var(--black)", paddingTop:14 }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:2, marginBottom:14 }}>
              More Stories
            </div>
            <div className="card-grid-4">
              {STORIES.filter(s => s.id !== story.id).slice(0,4).map(s => (
                <div key={s.id} className="news-card" onClick={() => onStory(s)}>
                  <div style={{ height:90, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, borderRadius:"2px 2px 0 0", background: getBg(s.phClass) }}>
                    {s.emoji}
                  </div>
                  <div className="nc-body">
                    <div className="nc-cat" style={{ color: getCatColor(s.category) }}>{s.category}</div>
                    <div className="nc-hl" style={{ fontSize:13 }}>{s.headline}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getBg(cls: string): string {
  const map: Record<string,string> = {
    "ph-pol":"linear-gradient(135deg,#1a1a2e,#16213e)",
    "ph-eco":"linear-gradient(135deg,#0d2137,#1a3a5c)",
    "ph-spo":"linear-gradient(135deg,#0d3320,#1a5c35)",
    "ph-ent":"linear-gradient(135deg,#2d0d30,#5c1a60)",
    "ph-inv":"linear-gradient(135deg,#2d0d0d,#5c1a1a)",
    "ph-mon":"linear-gradient(135deg,#1a2d0d,#3a5c1a)",
    "ph-tec":"linear-gradient(135deg,#0d1a2d,#1a355c)",
    "ph-hlt":"linear-gradient(135deg,#2d0d1a,#5c1a35)",
  };
  return map[cls] || "#1a1a1a";
}
