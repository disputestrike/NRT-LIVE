"use client";
const HEADLINES = [
  "BREAKING: Senate passes controversial media regulation bill",
  "SPORTS: Super Eagles squad announced for AFCON qualifiers",
  "ECONOMY: Naira gains 1.2% against dollar in official market",
  "LAGOS: Governor signs new transport reform into law",
  "SPORTS: Manchester City 2–1 Arsenal — Haaland brace secures top spot",
  "ENTERTAINMENT: Burna Boy announces world tour dates including Lagos",
  "INVESTIGATION: EFCC arrests 12 bank officials over ₦4.7B fraud",
  "SPORTS: Osimhen scores hat-trick as Napoli thrash Juventus 4–1",
];
export default function Ticker() {
  const doubled = [...HEADLINES, ...HEADLINES];
  return (
    <div className="ticker-wrap">
      <div className="ticker-label">⚡ LIVE</div>
      <div className="overflow-hidden flex-1">
        <div className="ticker-track animate-ticker">
          {doubled.map((h, i) => <span key={i}>{h}</span>)}
        </div>
      </div>
    </div>
  );
}
