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
  const more = STORIES.filter(s => s.id !== story.id && s.categorySlug === story.categorySlug).slice(0, 4);
  const color = getCatColor(story.category);

  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:1000,
      display:"flex", alignItems:"flex-start", justifyContent:"center",
      padding:"40px 20px", overflowY:"auto"
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background:"#ffffff", width:"100%", maxWidth:900,
        position:"relative", fontFamily:"'Inter',Helvetica,Arial,sans-serif"
      }}>
        {/* Close */}
        <button onClick={onClose} style={{
          position:"absolute", top:12, right:12, width:32, height:32,
          background:"#f5f5f5", border:"1px solid #e0e0e0", borderRadius:"50%",
          cursor:"pointer", fontSize:14, zIndex:10, display:"flex",
          alignItems:"center", justifyContent:"center", color:"#1a1a1a"
        }}>✕</button>

        {/* Article image */}
        <div style={{ position:"relative", width:"100%", aspectRatio:"16/9", background:"#eee" }}>
          <Image src={story.image || `https://picsum.photos/seed/${story.id}/900/506`}
            alt={story.headline} fill style={{ objectFit:"cover" }}
            onError={e=>{(e.target as HTMLImageElement).src=`https://picsum.photos/seed/${story.id}/900/506`;}} />
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 260px", gap:0 }}>
          {/* Main article */}
          <div style={{ padding:"24px 28px", borderRight:"1px solid #e0e0e0" }}>
            {/* Category */}
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", color, marginBottom:10 }}>
              {story.category}
            </div>

            {/* Headline */}
            <h1 style={{ fontSize:28, fontWeight:700, color:"#1a1a1a", lineHeight:1.2, marginBottom:12, fontFamily:"'Inter',sans-serif" }}>
              {story.headline}
            </h1>

            {/* Meta */}
            <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"#888", padding:"10px 0", borderTop:"1px solid #e0e0e0", borderBottom:"1px solid #e0e0e0", marginBottom:18, flexWrap:"wrap" }}>
              <span style={{ fontWeight:600, color:"#1a1a1a" }}>NRT Newsroom</span>
              <span>·</span>
              <span>{story.time}</span>
              <span>·</span>
              <span style={{ cursor:"pointer", color }} onClick={() => navigator.share?.({ title:story.headline, url:window.location.href }).catch(()=>{})}>↗ Share</span>
            </div>

            {/* Body */}
            <div style={{ fontSize:17, lineHeight:1.75, color:"#1a1a1a" }}
              dangerouslySetInnerHTML={{ __html: story.body
                ? story.body.replace(/<p>/g,'<p style="margin-bottom:16px;font-size:17px;line-height:1.75;color:#1a1a1a;">')
                : `<p style="margin-bottom:16px;font-size:17px;line-height:1.75;color:#1a1a1a;">${story.snippet}</p><p style="margin-bottom:16px;font-size:17px;line-height:1.75;color:#555;">This story is developing. NRT is on the ground gathering more details. Check back for updates as they become available.</p>`
              }} />

            {/* Tags */}
            <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginTop:20, paddingTop:16, borderTop:"1px solid #e0e0e0" }}>
              {[story.category, "Nigeria", "NRT News"].map(t => (
                <span key={t} style={{ background:"#f5f5f5", border:"1px solid #e0e0e0", fontSize:11, padding:"4px 12px", borderRadius:20, cursor:"pointer", color:"#555" }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ padding:"24px 16px" }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", color:"#1a1a1a", borderBottom:"2px solid #1a1a1a", paddingBottom:8, marginBottom:14 }}>
              Related
            </div>

            {(related.length > 0 ? related : more.slice(0,3)).map(r => (
              <div key={r.id} onClick={() => onStory(r)} style={{ display:"flex", gap:10, padding:"10px 0", borderBottom:"1px solid #e0e0e0", cursor:"pointer" }}>
                <div style={{ position:"relative", width:70, height:47, flexShrink:0, background:"#eee" }}>
                  <Image src={r.image || `https://picsum.photos/seed/${r.id}/70/47`} alt={r.headline}
                    fill style={{ objectFit:"cover" }}
                    onError={e=>{(e.target as HTMLImageElement).src=`https://picsum.photos/seed/${r.id}/70/47`;}} />
                </div>
                <div>
                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:"1px", textTransform:"uppercase", color:getCatColor(r.category), marginBottom:3 }}>{r.category}</div>
                  <div style={{ fontSize:13, fontWeight:600, color:"#1a1a1a", lineHeight:1.35 }}>{r.headline}</div>
                  <div style={{ fontSize:11, color:"#888", marginTop:3 }}>{r.time}</div>
                </div>
              </div>
            ))}

            {/* Ad slot */}
            <div style={{ marginTop:16, background:"#f9f9f9", border:"1px solid #e0e0e0", height:200, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, color:"#aaa", letterSpacing:"1.5px", textTransform:"uppercase" }}>
              Advertisement
            </div>
          </div>
        </div>

        {/* More stories */}
        {more.length > 0 && (
          <div style={{ padding:"20px 28px", borderTop:"3px solid #1a1a1a" }}>
            <div style={{ fontSize:14, fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:16, color:"#1a1a1a" }}>More Stories</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
              {more.map(s => (
                <div key={s.id} onClick={() => onStory(s)} style={{ cursor:"pointer" }}>
                  <div style={{ position:"relative", width:"100%", aspectRatio:"16/9", background:"#eee", marginBottom:8 }}>
                    <Image src={s.image || `https://picsum.photos/seed/${s.id}/200/113`} alt={s.headline}
                      fill style={{ objectFit:"cover" }}
                      onError={e=>{(e.target as HTMLImageElement).src=`https://picsum.photos/seed/${s.id}/200/113`;}} />
                  </div>
                  <div style={{ fontSize:9, fontWeight:700, color:getCatColor(s.category), letterSpacing:"1px", textTransform:"uppercase", marginBottom:4 }}>{s.category}</div>
                  <div style={{ fontSize:13, fontWeight:600, color:"#1a1a1a", lineHeight:1.3 }}>{s.headline}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
