"use client";
import { useEffect } from "react";
import Image from "next/image";
import { Story, STORIES, getCatColor } from "../data/stories";

export default function StoryModal({ story, onClose, onStory }: {
  story: Story | null; onClose: () => void; onStory: (s: Story) => void;
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    document.body.style.overflow = story ? "hidden" : "";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [story, onClose]);

  if (!story) return null;
  const related = story.related.map(id => STORIES.find(s => s.id === id)).filter(Boolean) as Story[];
  const more = STORIES.filter(s => s.id !== story.id).slice(0, 4);
  const color = getCatColor(story.category);

  return (
    <div className="modal-bg open" onClick={onClose}>
      <div className="modal-box" style={{ width:"100%", maxWidth:960, overflowX:"hidden" }} onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        {/* Top ad */}
        <div style={{ background:"#f9f9f9", borderBottom:"1px solid var(--border)", height:60, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ fontSize:10, color:"var(--gray-mid)", letterSpacing:"1.5px", textTransform:"uppercase" }}>— Advertisement —</span>
        </div>

        <div className="modal-inner">
          <div className="art-grid" style={{ width:"100%", minWidth:0 }}>
            {/* Article */}
            <div>
              <div className="art-cat" style={{ color }}>{story.category}</div>
              <h1 className="art-hl">{story.headline}</h1>
              <div className="art-meta">
                <span style={{ fontWeight:600 }}>NRT Newsroom</span>
                <span>·</span>
                <span>{story.time}</span>
                <span>·</span>
                <span className={`conf-pill ${story.confidence === "Verified" ? "conf-v" : "conf-d"}`}>
                  {story.confidence === "Verified" ? "✓ Verified" : "⚠ Developing"}
                </span>
                <span>·</span>
                <span style={{ cursor:"pointer", color:color }} onClick={() => navigator.share?.({ title:story.headline, url:window.location.href }).catch(()=>{}) }>↗ Share</span>
              </div>

              <div style={{ borderRadius:10, overflow:"hidden", marginBottom:18, aspectRatio:"16/9", position:"relative" }}>
                <Image src={story.image} alt={story.headline} fill style={{ objectFit:"cover" }} sizes="600px" />
              </div>

              <div className="art-body" dangerouslySetInnerHTML={{ __html: story.body }} />

              {/* Tags */}
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginTop:20, paddingTop:16, borderTop:"1px solid var(--border)" }}>
                {[story.category, "Nigeria", "NRT News"].map(t => (
                  <span key={t} style={{ background:"var(--gray-bg)", border:"1px solid var(--border)", fontSize:11, padding:"4px 12px", borderRadius:20, cursor:"pointer", color:"var(--gray-dark)" }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="rel-title">Related Stories</div>
              {related.map(r => (
                <div key={r.id} className="lc" onClick={() => onStory(r)}>
                  <div style={{ position:"relative", width:76, height:57, flexShrink:0, borderRadius:6, overflow:"hidden" }}>
                    <Image src={r.image} alt={r.headline} fill style={{ objectFit:"cover" }} sizes="76px" />
                  </div>
                  <div className="lc-body">
                    <div className="lc-cat" style={{ color: getCatColor(r.category) }}>{r.category}</div>
                    <div className="lc-hl">{r.headline}</div>
                    <div className="lc-meta">{r.time}</div>
                  </div>
                </div>
              ))}

              <div style={{ marginTop:16, background:"var(--gray-bg)", border:"1px solid var(--border)", height:250, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, color:"var(--gray-mid)", letterSpacing:"1.5px", textTransform:"uppercase" }}>
                300×250 Ad
              </div>
            </div>
          </div>

          {/* More stories */}
          <div style={{ marginTop:28, borderTop:"3px solid var(--black)", paddingTop:14 }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:2, marginBottom:14 }}>More Stories</div>
            <div className="card-grid-4" style={{ width:"100%", minWidth:0 }}>
              {more.map(s => (
                <div key={s.id} onClick={() => onStory(s)} className="nc fade-up">
                  <div className="nc-img-wrap">
                    <Image src={s.image} alt={s.headline} width={200} height={120} style={{ width:"100%", height:120, objectFit:"cover" }} />
                    <span className="nc-cat-pill" style={{ color: getCatColor(s.category) }}>{s.category}</span>
                  </div>
                  <div className="nc-body">
                    <div className="nc-hl" style={{ fontSize:12 }}>{s.headline}</div>
                    <div className="nc-meta"><span>{s.time}</span></div>
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
