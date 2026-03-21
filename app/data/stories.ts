export type Story = {
  id: string;
  category: string;
  categorySlug: string;
  headline: string;
  snippet: string;
  time: string;
  confidence: "Verified" | "Developing" | "Unverified";
  body: string;
  image: string;
  related: string[];
};

// Photorealistic Unsplash images mapped to story topics
const IMGS = {
  senate:     "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&auto=format&fit=crop",
  naira:      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop",
  football:   "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop",
  fraud:      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop",
  infra:      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop",
  cbn:        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop",
  music:      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop",
  arsenal:    "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop",
  jobs:       "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop",
  basketball: "https://images.unsplash.com/photo-1546519638405-a9f0b27d18b0?w=800&auto=format&fit=crop",
  nollywood:  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&auto=format&fit=crop",
  fintech:    "https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&auto=format&fit=crop",
  afcon:      "https://images.unsplash.com/photo-1522778034537-20a2486be803?w=800&auto=format&fit=crop",
  protest:    "https://images.unsplash.com/photo-1591189863430-ab87e120f312?w=800&auto=format&fit=crop",
  market:     "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop",
  abuja:      "https://images.unsplash.com/photo-1609209080565-1a2d13286c86?w=800&auto=format&fit=crop",
  oil:        "https://images.unsplash.com/photo-1601027847350-0285867c31f7?w=800&auto=format&fit=crop",
  tech:       "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
  election:   "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&auto=format&fit=crop",
  health:     "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop",
};

export const STORIES: Story[] = [
  {
    id:"s1", category:"Politics", categorySlug:"politics",
    headline:"Senate Passes Sweeping Media Bill Amid Press Freedom Outcry",
    snippet:"Nigeria's upper chamber voted 67–42 to pass the Digital Media Regulation Act, granting sweeping new government oversight over online content and AI-generated news.",
    time:"2 mins ago", confidence:"Verified", image: IMGS.senate,
    body:`<p>Nigeria's upper chamber voted 67–42 Thursday to pass the Digital Media Regulation Act — a deeply controversial bill that grants government authorities sweeping oversight powers over online content, AI-generated news, and social media platforms.</p><p>The bill requires all digital news platforms to register with a new federal body — the National Digital Information Authority — and mandates that AI-generated content carry clear labels or face fines of up to ₦50 million per violation.</p><p>Critics from the Nigerian Press Organization and Amnesty International warn of chilling effects on investigative journalism and whistleblower protections. "This bill hands the government a kill switch over the press," said NUJ president Chris Isiguzo in a statement.</p><p>The bill now moves to President Tinubu's desk for assent or veto. Constitutional law experts say a legal challenge is almost certain regardless of what he decides.</p>`,
    related:["s5","s2","s4"]
  },
  {
    id:"s2", category:"Economy", categorySlug:"economy",
    headline:"Naira Hits ₦1,420 Per Dollar as CBN Calls Emergency Meeting",
    snippet:"The naira slid to new lows at the parallel market Thursday, triggering an emergency Central Bank session as analysts warn of further deterioration.",
    time:"8 mins ago", confidence:"Verified", image: IMGS.naira,
    body:`<p>The Nigerian naira slid to ₦1,420 against the US dollar at the parallel market Thursday, triggering an emergency session of the Central Bank of Nigeria's Monetary Policy Committee.</p><p>The currency has lost over 12% of its value since February, driven by surging import demand, declining oil revenues, and reduced foreign direct investment. The CBN's official rate stands at ₦1,387, creating a widening arbitrage gap.</p><p>Food inflation, currently running above 40%, remains the most pressing concern for ordinary Nigerians, with staples like rice, tomatoes and cooking oil all seeing double-digit price rises in the past month.</p><p>The emergency MPC session is expected to result in either a rate hike or direct forex intervention. Nigeria's foreign reserves stand at approximately $35.2 billion — enough to cover roughly 7 months of import cover.</p>`,
    related:["s6","s9","s3"]
  },
  {
    id:"s3", category:"Sports", categorySlug:"sports",
    headline:"Super Eagles Named: Osimhen Leads Attack for AFCON Qualifiers",
    snippet:"Head coach José Peseiro names a 25-man squad for the crucial double-header against Benin Republic and Lesotho. Osimhen is fit.",
    time:"14 mins ago", confidence:"Verified", image: IMGS.football,
    body:`<p>Super Eagles head coach José Peseiro named a 25-man final squad Thursday for next month's crucial AFCON qualifying double-header against Benin Republic and Lesotho, with Victor Osimhen leading the attack despite recent fitness concerns at Napoli.</p><p>The squad sees the return of Ademola Lookman after a two-match absence and includes uncapped midfielder Alhassan Yusuf of Leicester City, in electrifying Premier League form this season.</p><p>Notable absentees include Wilfred Ndidi, sidelined with a knee injury, and Alex Iwobi, dropped following a dip in form at Fulham. The Eagles currently top Group D with 10 points from 4 games.</p>`,
    related:["s8","s10","s13"]
  },
  {
    id:"s4", category:"Investigation", categorySlug:"investigation",
    headline:"EFCC Arrests 12 Bank Officials in ₦4.7B Fraud Sweep",
    snippet:"Coordinated early-morning raids across Lagos and Abuja netted senior officials from three commercial banks in a massive forex manipulation case.",
    time:"31 mins ago", confidence:"Developing", image: IMGS.fraud,
    body:`<p>The Economic and Financial Crimes Commission arrested 12 senior officials from three commercial banks in coordinated early-morning raids across Lagos and Abuja on Thursday, in connection with an alleged ₦4.7 billion fraud scheme involving fake letters of credit and manipulated foreign exchange transactions.</p><p>NRT has confirmed the identities of three of those arrested, including a deputy general manager and two branch managers. EFCC spokesperson Wilson Uwujaren confirmed the arrests but declined to name the banks.</p><p>Sources close to the investigation say the scheme ran for at least 18 months and may involve additional individuals not yet in custody. A full press conference is expected Friday morning.</p>`,
    related:["s1","s2","s5"]
  },
  {
    id:"s5", category:"Nigeria", categorySlug:"nigeria",
    headline:"FG Commits ₦200B to Six Northern States in Emergency Infrastructure Push",
    snippet:"President Tinubu signed executive orders Thursday committing emergency infrastructure funding to Borno, Zamfara, Kebbi, Sokoto, Yobe and Adamawa.",
    time:"52 mins ago", confidence:"Verified", image: IMGS.infra,
    body:`<p>President Tinubu signed executive orders Thursday committing a ₦200 billion emergency infrastructure fund to six northern states — Borno, Zamfara, Kebbi, Sokoto, Yobe, and Adamawa — citing deteriorating roads, power infrastructure, and educational facilities.</p><p>The fund, sourced partly from recovered assets and a new World Bank credit facility, will be administered by a newly created Northern Infrastructure Coordination Office. Disbursements are expected within 90 days.</p><p>Critics from opposition parties questioned the timing, noting the announcement came days before three state gubernatorial by-elections. The administration dismissed the characterizations, pointing to detailed project lists already attached to the executive orders.</p>`,
    related:["s1","s2","s6"]
  },
  {
    id:"s6", category:"Economy", categorySlug:"economy",
    headline:"CBN Raises Benchmark Rate to 27.5% to Stem Runaway Inflation",
    snippet:"The MPC voted unanimously to raise the lending rate by 150 basis points — the third hike this year — as food inflation breaches 40%.",
    time:"1 hr ago", confidence:"Verified", image: IMGS.cbn,
    body:`<p>The Central Bank of Nigeria's Monetary Policy Committee voted unanimously to raise the benchmark lending rate to 27.5%, an increase of 150 basis points, citing persistent food inflation and continued pressure on the naira.</p><p>Analysts warn the move could dampen consumer credit and slow GDP growth in Q2. Small businesses reliant on bank loans are expected to feel the sharpest impact, with commercial bank lending rates likely to breach 35% within weeks.</p>`,
    related:["s2","s5","s9"]
  },
  {
    id:"s7", category:"Entertainment", categorySlug:"entertainment",
    headline:"Davido Announces 12-City Africa Tour — Lagos Kicks Off This August",
    snippet:"Grammy-nominated Davido confirms African dates with surprise acts rumored to include Wizkid and Burna Boy. Tickets from ₦35,000.",
    time:"2 hrs ago", confidence:"Verified", image: IMGS.music,
    body:`<p>Grammy-nominated artist Davido confirmed Thursday a 12-city African tour kicking off in Lagos this August. The "Timeless Tour" Africa leg will also stop in Accra, Nairobi, Johannesburg, and Abidjan, among other cities.</p><p>Surprise opening acts are rumored to include Wizkid and Burna Boy, according to sources close to the production. Tickets go on sale Monday at 10AM via Nairabox and major regional ticketing platforms. Lagos dates are expected to sell out within hours.</p>`,
    related:["s11","s1","s3"]
  },
  {
    id:"s8", category:"Sports · EPL", categorySlug:"sports",
    headline:"Arsenal Title Race Stalls: Haaland Brace Hands City 2–1 Win at Etihad",
    snippet:"Erling Haaland's clinical double ended Arsenal's 7-match winning run. Gunners now trail City by 5 points with 9 games left.",
    time:"3 hrs ago", confidence:"Verified", image: IMGS.arsenal,
    body:`<p>Erling Haaland's clinical second-half brace ended Arsenal's seven-match winning run at the Etihad on Thursday, leaving Mikel Arteta's side five points adrift of Manchester City with nine games remaining in the Premier League title race.</p><p>Arsenal's goal came from a Bukayo Saka penalty in the second half, but Haaland responded with goals in the 67th and 81st minutes to seal the win for Guardiola's side.</p>`,
    related:["s3","s10","s13"]
  },
  {
    id:"s9", category:"Money / Hustle", categorySlug:"money",
    headline:"7 Platforms Hiring Nigerians for Remote Dollar Jobs Right Now",
    snippet:"From technical writing to AI data labeling — legitimate platforms paying $10–$50/hour to Nigerians with the right skills.",
    time:"4 hrs ago", confidence:"Verified", image: IMGS.jobs,
    body:`<p>As Nigeria's economy tightens, earning in foreign currency has become survival strategy for millions. Here are seven platforms actively accepting Nigerian applicants in March 2026.</p><p><strong>1. Upwork</strong> — Global freelance marketplace. High competition but strong earning potential for developers, designers and writers.</p><p><strong>2. Deel</strong> — The fastest-growing employer of record platform. Many US and European companies use Deel to hire Nigerian talent compliantly.</p><p><strong>3. Toptal</strong> — Elite network. Top 3% of applicants accepted. Developers earn $60–$200/hr.</p><p><strong>4. Scale AI</strong> — Currently hiring for AI data labeling. Entry-level friendly. Pays $15–$30/hr.</p>`,
    related:["s6","s2","s5"]
  },
  {
    id:"s10", category:"Sports · NBA", categorySlug:"sports",
    headline:"Giannis Drops 47 as Bucks Stun Celtics in Must-Win Playoff Thriller",
    snippet:"Antetokounmpo's historic performance — 47 points, 19 rebounds, 8 assists — kept Milwaukee's season alive in OT.",
    time:"5 hrs ago", confidence:"Verified", image: IMGS.basketball,
    body:`<p>Giannis Antetokounmpo delivered one of the performances of his career Thursday night, scoring 47 points with 19 rebounds and 8 assists as the Milwaukee Bucks stunned the Boston Celtics to keep their playoff hopes alive.</p><p>The game was decided in overtime after Antetokounmpo hit a go-ahead free throw with 0.4 seconds left. The Bucks now sit just 1.5 games behind the 6th seed with 8 games remaining.</p>`,
    related:["s8","s3","s13"]
  },
  {
    id:"s11", category:"Entertainment", categorySlug:"entertainment",
    headline:"Nollywood Record: 'Eze Goes to School' Breaks ₦890M Opening Weekend",
    snippet:"The long-awaited sequel shattered Nigeria's all-time opening weekend box office record across 180 screens nationwide.",
    time:"6 hrs ago", confidence:"Verified", image: IMGS.nollywood,
    body:`<p>The long-awaited Nollywood sequel 'Eze Goes to School' shattered Nigeria's all-time opening weekend box office record, pulling in ₦890 million across 180 screens nationwide.</p><p>The film, directed by Chukwuka Emelionwu and starring the original cast, follows a now-adult Eze navigating university politics, corruption and romance. Critics have praised it as the most polished Nigerian theatrical production to date.</p>`,
    related:["s7","s12","s3"]
  },
  {
    id:"s12", category:"Tech", categorySlug:"tech",
    headline:"Flutterwave Launches FlutterSave — Nigeria's First AI-Powered Savings Product",
    snippet:"The fintech giant enters the savings market with a product that uses AI to automatically set aside money based on spending patterns.",
    time:"7 hrs ago", confidence:"Verified", image: IMGS.fintech,
    body:`<p>Flutterwave officially launched FlutterSave on Thursday, positioning it as Nigeria's first AI-powered savings product that learns user spending habits and automatically moves money into goal-based savings buckets.</p><p>The product integrates with all major Nigerian banks via open banking APIs and promises returns above inflation for balances above ₦50,000. CEO Olugbenga Agboola said the company plans to expand FlutterSave to 12 African markets by Q4 2026.</p>`,
    related:["s9","s6","s2"]
  },
  {
    id:"s13", category:"Sports · CAF", categorySlug:"sports",
    headline:"AFCON 2027: Lagos, Abuja, Kano and Port Harcourt in Running as Host Cities",
    snippet:"Four Nigerian cities remain in contention as CAF finalizes venue decisions for Africa's biggest football tournament.",
    time:"8 hrs ago", confidence:"Developing", image: IMGS.afcon,
    body:`<p>Four Nigerian cities — Lagos, Abuja, Kano and Port Harcourt — remain in contention for hosting duties as CAF finalizes venue decisions for AFCON 2027, which Nigeria is bidding to co-host alongside Morocco.</p><p>A CAF inspection team visited all four cities last week and is expected to submit its report by end of March. Infrastructure upgrades to Lagos' National Stadium and Abuja's Moshood Abiola Stadium are cited as Nigeria's strongest arguments.</p>`,
    related:["s3","s8","s10"]
  },
  {
    id:"s14", category:"Nigeria", categorySlug:"nigeria",
    headline:"Lagos Fuel Scarcity: NNPC Promises 72-Hour Resolution as Queues Grow",
    snippet:"Long queues returned to Lagos filling stations Thursday as fuel scarcity hit its third day. NNPC says consignments are en route.",
    time:"9 hrs ago", confidence:"Developing", image: IMGS.oil,
    body:`<p>Long queues returned to Lagos filling stations Thursday as fuel scarcity hit its third day, with some stations selling petrol at ₦1,200/litre — more than double the regulated pump price.</p><p>NNPC spokesperson Olufemi Soneye said consignments from three storage depots are en route and the situation should normalize within 72 hours. The federal government has blamed the scarcity on distribution logistics rather than supply shortfalls.</p>`,
    related:["s2","s6","s5"]
  },
  {
    id:"s15", category:"Health", categorySlug:"health",
    headline:"WHO Flags New Mpox Strain Detected in Cross River State, Nigeria",
    snippet:"Health authorities confirmed three cases of a previously undetected mpox variant. Contact tracing is underway across 4 LGAs.",
    time:"10 hrs ago", confidence:"Developing", image: IMGS.health,
    body:`<p>The World Health Organization and Nigeria Centre for Disease Control have confirmed three cases of a previously undetected mpox variant in Cross River State, triggering a rapid contact tracing operation across four local government areas.</p><p>The NCDC said all three cases have been isolated and that there is currently no evidence of sustained community transmission. Authorities are urging the public to report any unusual skin rashes or fever to the nearest health facility immediately.</p>`,
    related:["s5","s1","s9"]
  },
  {
    id:"s16", category:"Politics", categorySlug:"politics",
    headline:"Kaduna Tribunal Nullifies Governorship Election — Protests Erupt",
    snippet:"The election tribunal nullified the result citing widespread irregularities. Security forces deployed as protesters took to the streets.",
    time:"11 hrs ago", confidence:"Verified", image: IMGS.election,
    body:`<p>The Kaduna State Election Tribunal nullified the result of last November's governorship election on Thursday, citing widespread irregularities including ballot stuffing, voter intimidation and manipulation of results sheets across 12 local government areas.</p><p>Security forces were deployed to manage protests that erupted in Kaduna city and three other towns following the ruling. The incumbent governor's camp has indicated it will appeal to the Court of Appeal immediately.</p>`,
    related:["s1","s5","s4"]
  },
];

export const getCatColor = (cat: string): string => {
  if(cat.toLowerCase().includes("polit")||cat.toLowerCase().includes("nigeria")||cat.toLowerCase().includes("abuja")||cat.toLowerCase().includes("kaduna")) return "#CC0000";
  if(cat.toLowerCase().includes("sport")||cat.toLowerCase().includes("epl")||cat.toLowerCase().includes("nba")||cat.toLowerCase().includes("caf")||cat.toLowerCase().includes("eagle")) return "#007A3D";
  if(cat.toLowerCase().includes("entertain")||cat.toLowerCase().includes("nollywood")) return "#7C3AED";
  if(cat.toLowerCase().includes("econom")||cat.toLowerCase().includes("money")||cat.toLowerCase().includes("market")||cat.toLowerCase().includes("hustle")) return "#B45309";
  if(cat.toLowerCase().includes("invest")) return "#CC0000";
  if(cat.toLowerCase().includes("tech")) return "#1D4ED8";
  if(cat.toLowerCase().includes("health")) return "#0891B2";
  if(cat.toLowerCase().includes("africa")||cat.toLowerCase().includes("world")) return "#374151";
  return "#FF5C00";
};
