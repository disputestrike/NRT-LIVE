export type Story = {
  id: string;
  category: string;
  categorySlug: string;
  headline: string;
  snippet: string;
  time: string;
  confidence: "Verified" | "Developing" | "Unverified";
  body: string;
  emoji: string;
  phClass: string;
  related: string[];
};

export const STORIES: Story[] = [
  {
    id:"s1", category:"Politics", categorySlug:"politics",
    headline:"Senate Passes Sweeping Media Bill Amid Press Freedom Outcry",
    snippet:"Nigeria's upper chamber voted 67–42 to pass the Digital Media Regulation Act, granting sweeping new government oversight over online content and AI-generated news.",
    time:"2 mins ago", confidence:"Verified",
    emoji:"🏛️", phClass:"ph-pol",
    body:`<p>Nigeria's upper chamber voted 67–42 to pass the Digital Media Regulation Act Thursday, a landmark but deeply controversial bill that grants government authorities sweeping new oversight powers over online content, AI-generated news, and social media platforms operating within the country.</p><p>The bill requires all digital news platforms to register with a new federal body — the National Digital Information Authority — and mandates that AI-generated content carry clear labels or face fines of up to ₦50 million per violation.</p><p>Supporters argue the legislation is necessary to combat misinformation and deepfakes. "We cannot allow anonymous algorithms to poison public discourse," said Senate President Barau Jibrin. Critics from the Nigerian Press Organization and Amnesty International warn of chilling effects on investigative journalism.</p><p>The bill now moves to President Tinubu's desk for assent or veto. Constitutional law experts say a legal challenge is almost certain.</p>`,
    related:["s5","s2","s4"]
  },
  {
    id:"s2", category:"Economy", categorySlug:"economy",
    headline:"Naira Hits ₦1,420 Per Dollar as CBN Calls Emergency Meeting",
    snippet:"The naira slid to new lows at the parallel market Thursday, triggering an emergency Central Bank session as analysts warn of further deterioration.",
    time:"8 mins ago", confidence:"Verified",
    emoji:"💰", phClass:"ph-eco",
    body:`<p>The Nigerian naira slid to ₦1,420 against the US dollar at the parallel market Thursday, triggering an emergency session of the Central Bank of Nigeria's Monetary Policy Committee.</p><p>The currency has lost over 12% of its value since February, driven by surging import demand, declining oil revenues, and reduced foreign direct investment. The CBN's official rate stands at ₦1,387, creating a widening arbitrage gap.</p><p>The emergency MPC session is expected to result in either a rate hike or direct forex market intervention using Nigeria's foreign reserves, which stand at approximately $35.2 billion — enough to cover roughly 7 months of import cover.</p><p>Food inflation, currently running above 40%, remains the most pressing concern for ordinary Nigerians, with staples like rice, tomatoes and cooking oil all seeing double-digit price rises in the past month alone.</p>`,
    related:["s6","s9","s3"]
  },
  {
    id:"s3", category:"Sports", categorySlug:"sports",
    headline:"Super Eagles Squad Named: Osimhen Leads Attack for AFCON Qualifiers",
    snippet:"Head coach José Peseiro names a 25-man squad for next month's crucial double-header against Benin Republic and Lesotho, with Osimhen fit despite recent injury concerns.",
    time:"14 mins ago", confidence:"Verified",
    emoji:"⚽", phClass:"ph-spo",
    body:`<p>Super Eagles head coach José Peseiro named a 25-man final squad Thursday for next month's crucial AFCON qualifying double-header against Benin Republic and Lesotho, with Victor Osimhen leading the attack despite recent fitness concerns at Napoli.</p><p>The squad sees the return of Ademola Lookman after a two-match absence and includes uncapped midfielder Alhassan Yusuf of Leicester City, who has been in electrifying Premier League form this season.</p><p>Notable absentees include Wilfred Ndidi, sidelined with a knee injury, and Alex Iwobi, dropped following a dip in form at Fulham. The Eagles currently top Group D with 10 points from 4 games and need just 4 more points to secure qualification.</p>`,
    related:["s8","s10","s7"]
  },
  {
    id:"s4", category:"Investigation", categorySlug:"investigation",
    headline:"EFCC Arrests 12 Bank Officials in ₦4.7 Billion Fraud Sweep",
    snippet:"Coordinated early-morning raids across Lagos and Abuja netted 12 senior officials from three commercial banks in connection with fake letters of credit and manipulated FX transactions.",
    time:"31 mins ago", confidence:"Developing",
    emoji:"🔍", phClass:"ph-inv",
    body:`<p>The Economic and Financial Crimes Commission arrested 12 senior officials from three commercial banks in coordinated early-morning raids across Lagos and Abuja on Thursday, in connection with an alleged ₦4.7 billion fraud scheme involving fake letters of credit and manipulated foreign exchange transactions.</p><p>NRT has confirmed the identities of three of those arrested, including a deputy general manager and two branch managers. EFCC spokesperson Wilson Uwujaren confirmed the arrests but declined to name the banks involved, saying a full press conference would be held Friday morning.</p><p>Sources close to the investigation say the scheme ran for at least 18 months and may involve additional individuals not yet in custody. The arrested officials have not yet been formally charged.</p>`,
    related:["s1","s2","s5"]
  },
  {
    id:"s5", category:"Abuja", categorySlug:"nigeria",
    headline:"FG Commits N200 Billion to Six Northern States in Infrastructure Drive",
    snippet:"President Tinubu signed executive orders committing emergency infrastructure funding to Borno, Zamfara, Kebbi, Sokoto, Yobe and Adamawa, citing deteriorating roads and power grids.",
    time:"52 mins ago", confidence:"Verified",
    emoji:"🏗️", phClass:"ph-pol",
    body:`<p>President Tinubu signed executive orders Thursday committing a N200 billion emergency infrastructure fund to six northern states — Borno, Zamfara, Kebbi, Sokoto, Yobe, and Adamawa — citing deteriorating roads, power infrastructure, and educational facilities.</p><p>The fund, sourced partly from recovered assets and a new World Bank credit facility, will be administered by a newly created Northern Infrastructure Coordination Office under the Ministry of Finance. Disbursements are expected within 90 days.</p><p>Critics from opposition parties questioned the timing, noting the announcement came days before three state gubernatorial by-elections. The administration dismissed the characterizations, pointing to detailed project lists already attached to the executive orders.</p>`,
    related:["s1","s2","s6"]
  },
  {
    id:"s6", category:"Economy", categorySlug:"economy",
    headline:"CBN Raises Benchmark Rate to 27.5% to Stem Runaway Inflation",
    snippet:"The Monetary Policy Committee voted unanimously to raise the lending rate by 150 basis points — the third hike this year — as food inflation breaches 40%.",
    time:"1 hr ago", confidence:"Verified",
    emoji:"📈", phClass:"ph-eco",
    body:`<p>The Central Bank of Nigeria's Monetary Policy Committee voted unanimously to raise the benchmark lending rate to 27.5%, an increase of 150 basis points, citing persistent food inflation and continued pressure on the naira.</p><p>Analysts warn the move could dampen consumer credit and slow GDP growth in Q2. Small businesses reliant on bank loans are expected to feel the sharpest impact, with lending rates at commercial banks likely to breach the 35% mark within weeks.</p>`,
    related:["s2","s5","s9"]
  },
  {
    id:"s7", category:"Entertainment", categorySlug:"entertainment",
    headline:"Davido Announces 12-City Africa Leg of Timeless Tour — Lagos First",
    snippet:"Grammy-nominated Davido confirms African dates kicking off Lagos this August, with surprise acts rumored to include Wizkid and Burna Boy.",
    time:"2 hrs ago", confidence:"Verified",
    emoji:"🎵", phClass:"ph-ent",
    body:`<p>Grammy-nominated artist Davido confirmed Thursday a 12-city African tour kicking off in Lagos this August. The "Timeless Tour" Africa leg will also stop in Accra, Nairobi, Johannesburg, and Abidjan, among other cities.</p><p>Surprise opening acts are rumored to include Wizkid and Burna Boy, according to sources close to the production. Tickets go on sale Monday at 10AM via Nairabox and major regional ticketing platforms. Lagos dates are expected to sell out within hours.</p>`,
    related:["s11","s12","s3"]
  },
  {
    id:"s8", category:"Sports · EPL", categorySlug:"sports",
    headline:"Arsenal Title Race Stalls: Haaland Brace Hands City 2–1 Win",
    snippet:"Erling Haaland's clinical double ended Arsenal's seven-match winning run. The Gunners now trail Manchester City by 5 points with 9 games remaining.",
    time:"3 hrs ago", confidence:"Verified",
    emoji:"🏆", phClass:"ph-spo",
    body:`<p>Erling Haaland's clinical second-half brace ended Arsenal's seven-match winning run at the Etihad on Thursday, leaving Mikel Arteta's side five points adrift of Manchester City with nine games remaining in the Premier League title race.</p><p>Arsenal's goal came from a Bukayo Saka penalty early in the second half, but Haaland responded with goals in the 67th and 81st minutes to seal the win for Pep Guardiola's side. City fans celebrated what many believe is the decisive moment in the title race.</p>`,
    related:["s3","s10","s13"]
  },
  {
    id:"s9", category:"Money / Hustle", categorySlug:"money",
    headline:"7 Platforms Actively Hiring Nigerians for Remote Dollar Jobs Right Now",
    snippet:"From technical writing to virtual assistance and AI data labeling — here are the legitimate platforms paying $10–$50/hour to Nigerians with the right skills.",
    time:"4 hrs ago", confidence:"Verified",
    emoji:"💼", phClass:"ph-mon",
    body:`<p>As Nigeria's economy tightens, earning in foreign currency has gone from aspiration to survival strategy for millions. Here are seven platforms actively accepting Nigerian applicants in March 2026.</p><p><strong>1. Upwork</strong> — Global freelance marketplace. High competition but strong earning potential for developers, designers and writers. Create a compelling profile and start with competitive bids.</p><p><strong>2. Deel</strong> — The fastest-growing employer of record platform. Many US and European companies use Deel to hire Nigerian talent compliantly. Check their job board weekly.</p><p><strong>3. Toptal</strong> — Elite network requiring passing a rigorous screening. Top 3% of applicants accepted. Developers earn $60–$200/hr.</p><p><strong>4. Scale AI</strong> — Currently hiring for AI data labeling and RLHF projects. Entry-level friendly. Pays $15–$30/hr.</p>`,
    related:["s6","s2","s5"]
  },
  {
    id:"s10", category:"Sports · NBA", categorySlug:"sports",
    headline:"Giannis Drops 47 as Bucks Stun Celtics to Stay Alive in Playoff Race",
    snippet:"Antetokounmpo's historic performance — including 19 rebounds and 8 assists — kept Milwaukee's season alive in a must-win Thursday night showdown.",
    time:"5 hrs ago", confidence:"Verified",
    emoji:"🏀", phClass:"ph-spo",
    body:`<p>Giannis Antetokounmpo delivered one of the performances of his career Thursday night, scoring 47 points with 19 rebounds and 8 assists as the Milwaukee Bucks stunned the Boston Celtics to keep their playoff hopes alive.</p><p>The game was decided in overtime after Antetokounmpo hit a go-ahead free throw with 0.4 seconds left. The Bucks now sit just 1.5 games behind the 6th seed with 8 games remaining.</p>`,
    related:["s8","s3","s13"]
  },
  {
    id:"s11", category:"Entertainment", categorySlug:"entertainment",
    headline:"New Nollywood Blockbuster 'Eze Goes to School' Breaks ₦890M Box Office Record",
    snippet:"The long-awaited sequel shattered Nigeria's all-time opening weekend record, signaling a new era for Nollywood theatrical releases.",
    time:"6 hrs ago", confidence:"Verified",
    emoji:"🎬", phClass:"ph-ent",
    body:`<p>The long-awaited Nollywood sequel 'Eze Goes to School' shattered Nigeria's all-time opening weekend box office record, pulling in ₦890 million across 180 screens nationwide.</p><p>The film, directed by Chukwuka Emelionwu and starring the original cast, follows a now-adult Eze navigating university politics, corruption and romance. Critics have praised it as the most polished Nigerian theatrical production to date.</p>`,
    related:["s7","s12","s3"]
  },
  {
    id:"s12", category:"Tech", categorySlug:"tech",
    headline:"Flutterwave Launches FlutterSave — Nigeria's First AI-Powered Savings Product",
    snippet:"The fintech giant enters the savings market with a product that uses AI to automatically set aside money based on spending patterns and financial goals.",
    time:"7 hrs ago", confidence:"Verified",
    emoji:"🚀", phClass:"ph-tec",
    body:`<p>Flutterwave officially launched FlutterSave on Thursday, positioning it as Nigeria's first AI-powered savings product that learns user spending habits and automatically moves money into goal-based savings buckets.</p><p>The product integrates with all major Nigerian banks via open banking APIs and promises returns above inflation for balances above ₦50,000. CEO Olugbenga Agboola said the company plans to expand FlutterSave to 12 African markets by Q4 2026.</p>`,
    related:["s9","s6","s2"]
  },
  {
    id:"s13", category:"Sports · CAF", categorySlug:"sports",
    headline:"AFCON 2027 Host City Announcement: Four Nigerian Cities in the Running",
    snippet:"Lagos, Abuja, Kano and Port Harcourt are among the cities shortlisted as Nigeria eyes co-hosting rights for Africa's biggest football tournament.",
    time:"8 hrs ago", confidence:"Developing",
    emoji:"🌍", phClass:"ph-spo",
    body:`<p>Four Nigerian cities — Lagos, Abuja, Kano and Port Harcourt — remain in contention for hosting duties as CAF finalizes venue decisions for AFCON 2027, which Nigeria is bidding to co-host alongside Morocco.</p><p>A CAF inspection team visited all four cities last week and is expected to submit its report by end of March. Infrastructure upgrades to Lagos' National Stadium and Abuja's Moshood Abiola Stadium are cited as Nigeria's strongest arguments.</p>`,
    related:["s3","s8","s10"]
  },
];

export const getCatColor = (cat: string): string => {
  if(cat.includes("Politic")||cat.includes("Abuja")||cat.includes("Nigeria")) return "#CC0000";
  if(cat.includes("Sport")||cat.includes("EPL")||cat.includes("NBA")||cat.includes("CAF")) return "#007A3D";
  if(cat.includes("Entertain")) return "#7C3AED";
  if(cat.includes("Econom")||cat.includes("Money")||cat.includes("Market")) return "#B45309";
  if(cat.includes("Invest")) return "#CC0000";
  if(cat.includes("Tech")) return "#1D4ED8";
  return "#FF5C00";
};
