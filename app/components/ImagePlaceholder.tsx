"use client";
// AI-generated image placeholder that shows story-specific emoji + gradient
// In production: replace with actual DALL-E/Stable Diffusion API call
export default function ImagePlaceholder({
  emoji, phClass, aspect = "16/9", size = "full"
}: { emoji: string; phClass: string; aspect?: string; size?: string }) {
  const style: React.CSSProperties = {
    background: getGradient(phClass),
    aspectRatio: aspect,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: size === "small" ? 20 : size === "medium" ? 28 : 40,
    width: "100%",
    position: "relative",
    overflow: "hidden",
  };
  return (
    <div style={style}>
      <span>{emoji}</span>
      <div style={{
        position:"absolute", inset:0,
        background:"linear-gradient(135deg, rgba(255,92,0,0.05) 0%, transparent 60%)",
        pointerEvents:"none"
      }} />
    </div>
  );
}

function getGradient(cls: string): string {
  const map: Record<string,string> = {
    "ph-pol": "linear-gradient(135deg,#1a1a2e 0%,#16213e 100%)",
    "ph-eco": "linear-gradient(135deg,#0d2137 0%,#1a3a5c 100%)",
    "ph-spo": "linear-gradient(135deg,#0d3320 0%,#1a5c35 100%)",
    "ph-ent": "linear-gradient(135deg,#2d0d30 0%,#5c1a60 100%)",
    "ph-inv": "linear-gradient(135deg,#2d0d0d 0%,#5c1a1a 100%)",
    "ph-mon": "linear-gradient(135deg,#1a2d0d 0%,#3a5c1a 100%)",
    "ph-tec": "linear-gradient(135deg,#0d1a2d 0%,#1a355c 100%)",
    "ph-hlt": "linear-gradient(135deg,#2d0d1a 0%,#5c1a35 100%)",
  };
  return map[cls] || "linear-gradient(135deg,#1a1a1a 0%,#333 100%)";
}
