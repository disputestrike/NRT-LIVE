"use client";
import { Story } from "../data/stories";
import { useEffect } from "react";

export default function StoryModal({ story, onClose }: { story: Story | null; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!story) return null;
  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,0.85)",
      zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center",
      backdropFilter:"blur(4px)"
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background:"var(--black2)", border:"1px solid var(--border)",
        maxWidth:700, width:"90%", maxHeight:"85vh", overflowY:"auto",
        position:"relative", borderTop:"3px solid var(--orange)"
      }}>
        <button aria-label="Close article" onClick={onClose} style={{
          position:"absolute", top:16, right:16, background:"none",
          border:"1px solid var(--border)", color:"var(--white2)", fontSize:18,
          width:32, height:32, cursor:"pointer", borderRadius:2
        }}>✕</button>
        <div style={{ padding:40 }}>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:"var(--orange)", marginBottom:12 }}>{story.category}</div>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:36, lineHeight:1.1, marginBottom:16, letterSpacing:1 }}>{story.headline}</h2>
          <div style={{ display:"flex", gap:16, fontSize:12, color:"var(--white3)", marginBottom:24, paddingBottom:24, borderBottom:"1px solid var(--border2)", flexWrap:"wrap", alignItems:"center" }}>
            <span>NRT Newsroom</span><span>·</span>
            <span>{story.time}</span><span>·</span>
            <span className={story.confidence === "Verified" ? "conf-high" : "conf-med"}>
              {story.confidence === "Verified" ? "✓ Verified" : "⚠ Developing"}
            </span>
          </div>
          <div style={{ fontSize:15, color:"var(--white2)", lineHeight:1.8 }}
            dangerouslySetInnerHTML={{ __html: story.body }} />
        </div>
      </div>
    </div>
  );
}
