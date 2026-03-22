"use client";
import Image from "next/image";
import { S, Story } from "../data/stories";

function si(s: Story, w=400, h=225) {
  return s.image || `https://picsum.photos/seed/${s.id}/${w}/${h}`;
}
function er(e: React.SyntheticEvent<HTMLImageElement>, id: string, w=400, h=225) {
  (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${id}/${w}/${h}`;
}

type Props = { onStory:(s:Story)=>void };

export default function MultiCluster({ onStory }: Props) {

  /* ─ 1. TOP MIXED GRID ─────────────────────────────────────── */
  const topLeft  = [S.money[0], S.health[0], S.nigeria[2]];
  const topCenter = S.economy[2];
  const topRight  = [S.world[0], S.world[1], S.entertainment[3]];

  /* ─ 2. WEEK IN REVIEW ─────────────────────────────────────── */
  const wir = [S.politics[1], S.sports[3], S.africa[0]];

  /* ─ 3. SPLIT FEATURE (US + WORLD style) ───────────────────── */
  const splitCols = [
    {
      label:"Nigeria", color:"red",
      main: S.nigeria[0],
      links:[S.nigeria[1], S.nigeria[2]],
      smalls:[] as Story[]
    },
    {
      label:"Africa", color:"amber",
      main: S.africa[1],
      links:[S.africa[2]],
      smalls:[S.world[2]] as Story[]
    },
    {
      label:"World", color:"blue",
      main: S.world[0],
      links:[],
      smalls:[S.world[1], S.world[2]] as Story[]
    },
  ];

  /* ─ 4. SHORTS RAIL ────────────────────────────────────────── */
  const shorts = [S.sports[0], S.entertainment[0], S.investigation[0], S.tech[1], S.africa[2]];

  /* ─ 5+6. CATEGORY TRIPLETS ────────────────────────────────── */
  const triplet1 = [
    { label:"Immigration & Security", color:"red",    main:S.investigation[0], links:[S.investigation[1], S.nigeria[1]] },
    { label:"People We Follow",       color:"purple", main:S.entertainment[1], links:[S.entertainment[2], S.entertainment[3]] },
    { label:"Business & Economy",     color:"amber",  main:S.economy[1],       links:[S.economy[3], S.money[1]] },
  ];
  const triplet2 = [
    { label:"Celebrities",      color:"purple", main:S.entertainment[0], links:[S.entertainment[2], S.sports[4]] },
    { label:"Health & Science", color:"teal",   main:S.health[0],        links:[S.health[1], S.tech[0]] },
    { label:"Politics",         color:"red",    main:S.politics[2],      links:[S.politics[3], S.nigeria[0]] },
  ];

  return (
    <div style={{ borderTop:"3px solid #1a1a1a", marginTop:0 }}>

      {/* ── 1. TOP MIXED GRID ──────────────────────────────── */}
      <div className="page-wrap">
        <div className="cluster-top">

          {/* Left stack */}
          <div className="cluster-stack">
            {topLeft.map(s => (
              <div key={s.id} className="cluster-stack-item" onClick={() => onStory(s)}>
                <img src={si(s,80,54)} alt={s.headline} className="cluster-stack-img"
                  onError={e=>{(e.currentTarget).src=`https://picsum.photos/seed/${s.id}/80/54`;}} />
                <div>
                  <div className="cluster-stack-hl">{s.headline}</div>
                  <div className="cluster-stack-meta">{s.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Center feature */}
          <div className="cluster-feature" onClick={() => onStory(topCenter)}>
            <img src={si(topCenter,600,338)} alt={topCenter.headline}
              className="cluster-feature-img"
              onError={e=>{(e.currentTarget).src=`https://picsum.photos/seed/${topCenter.id}/600/338`;}} />
            <div className="cluster-feature-hl">{topCenter.headline}</div>
            <div className="cluster-feature-sum">{topCenter.snippet}</div>
          </div>

          {/* Right stack */}
          <div className="cluster-stack">
            {topRight.map(s => (
              <div key={s.id} className="cluster-stack-item" onClick={() => onStory(s)}>
                <img src={si(s,80,54)} alt={s.headline} className="cluster-stack-img"
                  onError={e=>{(e.currentTarget).src=`https://picsum.photos/seed/${s.id}/80/54`;}} />
                <div>
                  <div className="cluster-stack-hl">{s.headline}</div>
                  <div className="cluster-stack-meta">{s.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 2. WEEK IN REVIEW ──────────────────────────────── */}
      <div className="page-wrap">
        <div className="wir-strip">
          <div className="wir-label">Week in Review</div>
          <div className="wir-grid">
            {wir.map(s => (
              <div key={s.id} className="wir-card" onClick={() => onStory(s)}>
                <img src={si(s,360,203)} alt={s.headline} className="wir-img"
                  onError={e=>{(e.currentTarget).src=`https://picsum.photos/seed/${s.id}/360/203`;}} />
                <div className="wir-hl">{s.headline}</div>
                <div className="wir-meta">{s.category} · {s.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. SPLIT FEATURE ROW ───────────────────────────── */}
      <div className="page-wrap">
        <div className="split-row">
          {splitCols.map(col => (
            <div key={col.label} className="split-col">
              <div className={`split-label ${col.color}`}>{col.label}</div>
              <img src={si(col.main)} alt={col.main.headline}
                className="split-main-img" onClick={() => onStory(col.main)}
                onError={e=>{(e.currentTarget).src=`https://picsum.photos/seed/${col.main.id}/360/240`;}} />
              <div className="split-main-hl" onClick={() => onStory(col.main)}>{col.main.headline}</div>
              {col.links.map(s => (
                <div key={s.id} className="split-text-item" onClick={() => onStory(s)}>
                  <div className="split-text-hl">{s.headline}</div>
                  <div className="split-text-meta">{s.time}</div>
                </div>
              ))}
              {col.smalls.map(s => (
                <div key={s.id} className="split-small" onClick={() => onStory(s)}>
                  <img src={si(s,80,54)} alt={s.headline} className="split-small-img"
                    onError={e=>{(e.currentTarget).src=`https://picsum.photos/seed/${s.id}/80/54`;}} />
                  <div className="split-small-hl">{s.headline}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. SHORTS / QUICK HITS RAIL ────────────────────── */}
      <div className="page-wrap">
        <div className="shorts-strip">
          <div className="shorts-label">NRT Shorts</div>
          <div className="shorts-rail">
            {shorts.map(s => (
              <div key={s.id} className="short-card" onClick={() => onStory(s)}>
                <Image src={si(s,200,267)} alt={s.headline} width={200} height={267}
                  className="short-img"
                  onError={e=>er(e,s.id,200,267)} />
                <div className="short-overlay">
                  <div className="short-hl">{s.headline.slice(0,55)}{s.headline.length>55?"...":""}</div>
                  <div className="short-meta">{s.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 5. CATEGORY TRIPLET ROW 1 ──────────────────────── */}
      <div className="page-wrap">
        <div className="triplet-row">
          {triplet1.map(col => (
            <div key={col.label} className="triplet-col">
              <span className={`triplet-label ${col.color}`}>{col.label}</span>
              <img src={si(col.main)} alt={col.main.headline}
                className="triplet-main-img" onClick={() => onStory(col.main)}
                onError={e=>{(e.currentTarget).src=`https://picsum.photos/seed/${col.main.id}/360/240`;}} />
              <div className="triplet-main-hl" onClick={() => onStory(col.main)}>{col.main.headline}</div>
              {col.links.map(s => (
                <div key={s.id} className="triplet-link" onClick={() => onStory(s)}>
                  <img src={si(s,60,40)} alt={s.headline} className="triplet-link-img"
                    onError={e=>{(e.currentTarget).src=`https://picsum.photos/seed/${s.id}/60/40`;}} />
                  <div className="triplet-link-hl">{s.headline}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── 6. CATEGORY TRIPLET ROW 2 ──────────────────────── */}
      <div className="page-wrap" style={{ marginBottom:32 }}>
        <div className="triplet-row" style={{ borderBottom:"none" }}>
          {triplet2.map(col => (
            <div key={col.label} className="triplet-col">
              <span className={`triplet-label ${col.color}`}>{col.label}</span>
              <img src={si(col.main)} alt={col.main.headline}
                className="triplet-main-img" onClick={() => onStory(col.main)}
                onError={e=>{(e.currentTarget).src=`https://picsum.photos/seed/${col.main.id}/360/240`;}} />
              <div className="triplet-main-hl" onClick={() => onStory(col.main)}>{col.main.headline}</div>
              {col.links.map(s => (
                <div key={s.id} className="triplet-link" onClick={() => onStory(s)}>
                  <img src={si(s,60,40)} alt={s.headline} className="triplet-link-img"
                    onError={e=>{(e.currentTarget).src=`https://picsum.photos/seed/${s.id}/60/40`;}} />
                  <div className="triplet-link-hl">{s.headline}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
