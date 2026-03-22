"use client";
const SCORES = [
  { league:"🇳🇬 Super Eagles", h:"Nigeria", a:"Ghana", hs:2, as:0, st:"67'", live:true },
  { league:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League", h:"Man City", a:"Arsenal", hs:2, as:1, st:"FT", live:false },
  { league:"🏆 UCL", h:"Real Madrid", a:"PSG", hs:3, as:1, st:"82'", live:true },
  { league:"🇮🇹 Serie A", h:"Napoli", a:"Juventus", hs:4, as:1, st:"FT", live:false },
  { league:"🇫🇷 Ligue 1", h:"Monaco", a:"Marseille", hs:2, as:2, st:"90+3'", live:true },
  { league:"🇩🇪 Bundesliga", h:"Bayern", a:"Dortmund", hs:5, as:2, st:"FT", live:false },
  { league:"🏀 NBA", h:"Bucks", a:"Celtics", hs:109, as:107, st:"OT", live:true },
  { league:"🌍 CAF CL", h:"Al Ahly", a:"Esperance", hs:1, as:1, st:"FT·AET", live:false },
  { league:"🇪🇸 La Liga", h:"Barcelona", a:"Real Madrid", hs:2, as:2, st:"78'", live:true },
  { league:"🇳🇬 NPFL", h:"Rivers Utd", a:"Enyimba", hs:1, as:0, st:"FT", live:false },
];
export default function ScoresStrip() {
  return (
    <div className="scores-strip">
      <div className="scores-strip-hdr">
        <span className="scores-strip-title">⚡ Live Scores</span>
        <span className="scores-strip-more">All Leagues →</span>
      </div>
      <div className="scores-slider">
        {SCORES.map((sc, i) => (
          <div key={i} className={`score-card${sc.live ? " live-game" : ""}`}>
            <div className="sc-league">{sc.league}</div>
            <div className="sc-row">
              <span className={`sc-team${sc.hs < sc.as ? " dim" : ""}`}>{sc.h}</span>
              <span className="sc-num">{sc.hs}</span>
            </div>
            <div className="sc-row">
              <span className={`sc-team${sc.as < sc.hs ? " dim" : ""}`}>{sc.a}</span>
              <span className="sc-num">{sc.as}</span>
            </div>
            <div className={sc.live ? "sc-status sc-live" : "sc-status sc-ft"}>{sc.st}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
