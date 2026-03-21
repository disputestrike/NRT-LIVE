export type Story = {
  id: string;
  category: string;
  headline: string;
  snippet: string;
  time: string;
  confidence: "Verified" | "Developing" | "Unverified";
  body: string;
};

export const STORIES: Story[] = [
  {
    id: "s1",
    category: "Politics · Nigeria",
    headline: "SENATE PASSES SWEEPING MEDIA BILL AMID PRESS FREEDOM OUTCRY",
    snippet: "Nigeria's upper chamber voted 67–42 to pass the Digital Media Regulation Act, granting government authorities new oversight powers over online content and AI-generated news. Critics call it a direct attack on press freedom.",
    time: "2 minutes ago",
    confidence: "Verified",
    body: `<p>Nigeria's upper chamber voted 67–42 to pass the Digital Media Regulation Act Thursday, a landmark but deeply controversial bill that grants government authorities sweeping new oversight powers over online content, AI-generated news, and social media platforms operating within the country.</p><p>The bill requires all digital news platforms to register with a new federal body — the National Digital Information Authority — and mandates that AI-generated content carry clear labels or face fines of up to ₦50 million per violation.</p><p>Supporters argue the legislation is necessary to combat misinformation and deepfakes. "We cannot allow anonymous algorithms to poison public discourse," said Senate President Barau Jibrin. Critics from the Nigerian Press Organization and Amnesty International warn of chilling effects on investigative journalism.</p>`
  },
  {
    id: "s2",
    category: "Economy",
    headline: "NAIRA HITS ₦1,420 PER DOLLAR AS CBN HOLDS EMERGENCY MEETING",
    snippet: "The Nigerian naira slid to ₦1,420 against the US dollar at the parallel market, triggering an emergency session of the Central Bank of Nigeria's Monetary Policy Committee.",
    time: "8 minutes ago",
    confidence: "Verified",
    body: `<p>The Nigerian naira slid to ₦1,420 against the US dollar at the parallel market Thursday, triggering an emergency session of the Central Bank of Nigeria's Monetary Policy Committee, according to sources with direct knowledge of the meeting.</p><p>The currency has lost over 12% of its value since February, driven by surging import demand, declining oil revenues, and reduced foreign direct investment. The CBN's official rate stands at ₦1,387, creating a widening arbitrage gap that traders have moved quickly to exploit.</p><p>The emergency MPC session is expected to result in either a rate hike or direct forex market intervention using Nigeria's foreign reserves, which stand at approximately $35.2 billion — enough to cover roughly 7 months of import cover.</p>`
  },
  {
    id: "s3",
    category: "Sports",
    headline: "SUPER EAGLES: PESEIRO NAMES FINAL SQUAD — OSIMHEN LEADS ATTACK",
    snippet: "Super Eagles head coach José Peseiro has named a 25-man squad for next month's crucial AFCON qualifying double-header against Benin Republic and Lesotho.",
    time: "14 minutes ago",
    confidence: "Verified",
    body: `<p>Super Eagles head coach José Peseiro named a 25-man final squad Thursday for next month's crucial AFCON qualifying double-header against Benin Republic and Lesotho, with Victor Osimhen leading the attack despite recent fitness concerns at Napoli.</p><p>The squad sees the return of Ademola Lookman after a two-match absence and includes uncapped midfielder Alhassan Yusuf of Leicester City, who has been in electrifying Premier League form this season.</p><p>Notable absentees include Wilfred Ndidi, sidelined with a knee injury, and Alex Iwobi, dropped following a dip in form at Fulham. The Eagles currently top Group D with 10 points from 4 games.</p>`
  },
  {
    id: "s4",
    category: "Investigation",
    headline: "EFCC ARRESTS 12 SENIOR BANKING OFFICIALS IN ₦4.7B FRAUD SWEEP",
    snippet: "The Economic and Financial Crimes Commission arrested 12 senior officials from three commercial banks in coordinated early-morning raids across Lagos and Abuja.",
    time: "31 minutes ago",
    confidence: "Developing",
    body: `<p>The Economic and Financial Crimes Commission arrested 12 senior officials from three commercial banks in coordinated early-morning raids across Lagos and Abuja on Thursday, in connection with an alleged ₦4.7 billion fraud scheme involving fake letters of credit and manipulated foreign exchange transactions.</p><p>NRT has confirmed the identities of three of those arrested, including a deputy general manager and two branch managers. The remaining nine are described as relationship managers and treasury officers.</p><p>EFCC spokesperson Wilson Uwujaren confirmed the arrests but declined to name the banks involved, saying a full press conference would be held Friday morning. This story is developing.</p>`
  },
  {
    id: "s5",
    category: "Abuja",
    headline: "FG ANNOUNCES N200B INFRASTRUCTURE FUND TARGETING 6 NORTHERN STATES",
    snippet: "President Tinubu signed executive orders Thursday committing a N200 billion emergency infrastructure fund to Borno, Zamfara, Kebbi, Sokoto, Yobe, and Adamawa.",
    time: "52 minutes ago",
    confidence: "Verified",
    body: `<p>President Tinubu signed executive orders Thursday committing a N200 billion emergency infrastructure fund to six northern states — Borno, Zamfara, Kebbi, Sokoto, Yobe, and Adamawa — citing deteriorating roads, power infrastructure, and educational facilities.</p><p>The fund, sourced partly from recovered assets and a new World Bank credit facility, will be administered by a newly created Northern Infrastructure Coordination Office under the Ministry of Finance. Disbursements are expected within 90 days.</p><p>Critics from opposition parties questioned the timing, noting the announcement came days before three state gubernatorial by-elections. The administration dismissed the characterizations, pointing to detailed project lists already attached to the executive orders.</p>`
  },
  {
    id: "s6",
    category: "Economy",
    headline: "CBN RAISES BENCHMARK INTEREST RATE TO 27.5% IN EMERGENCY MOVE",
    snippet: "The Central Bank of Nigeria's MPC voted unanimously to raise the benchmark lending rate by 150 basis points, citing persistent food inflation and naira pressure.",
    time: "1 hr ago",
    confidence: "Verified",
    body: `<p>The Central Bank of Nigeria's Monetary Policy Committee voted unanimously to raise the benchmark lending rate to 27.5%, an increase of 150 basis points, citing persistent food inflation and continued pressure on the naira. This marks the third consecutive rate hike this year.</p><p>Analysts warn the move could dampen consumer credit and slow GDP growth in Q2. Small businesses reliant on bank loans are expected to feel the sharpest impact, with lending rates at commercial banks likely to breach the 35% mark within weeks.</p>`
  },
  {
    id: "s7",
    category: "Entertainment",
    headline: "DAVIDO ANNOUNCES TIMELESS TOUR AFRICA LEG — LAGOS, ACCRA, NAIROBI",
    snippet: "Grammy-nominated Davido confirms a 12-city African tour kicking off in Lagos this August, with surprise acts rumored to include Wizkid and Burna Boy.",
    time: "2 hrs ago",
    confidence: "Verified",
    body: `<p>Grammy-nominated artist Davido confirmed Thursday a 12-city African tour kicking off in Lagos this August. The "Timeless Tour" Africa leg will also stop in Accra, Nairobi, Johannesburg, and Abidjan, among other cities.</p><p>Surprise opening acts are rumored to include Wizkid and Burna Boy, according to sources close to the production. Tickets go on sale Monday at 10AM via Nairabox and major regional ticketing platforms. Lagos dates are expected to sell out within hours.</p>`
  },
  {
    id: "s8",
    category: "Sports · EPL",
    headline: "ARSENAL TITLE CHARGE STALLS AFTER 2–1 DEFEAT AT CITY",
    snippet: "Haaland's clinical brace ended Arsenal's seven-match winning run. Gunners now trail leaders City by 5 points with 9 games remaining.",
    time: "3 hrs ago",
    confidence: "Verified",
    body: `<p>Erling Haaland's clinical second-half brace ended Arsenal's seven-match winning run at the Etihad on Thursday, leaving Mikel Arteta's side five points adrift of Manchester City with nine games remaining in the Premier League title race.</p><p>Arsenal's goal came from a Bukayo Saka penalty early in the second half, but Haaland responded with goals in the 67th and 81st minutes to seal the win for Pep Guardiola's side. City fans celebrated what many believe is the decisive moment in the title race.</p>`
  },
  {
    id: "s9",
    category: "Money / Hustle",
    headline: "HOW NIGERIANS ARE USING AI TO BUILD BUSINESSES FROM ZERO",
    snippet: "From Enugu to Ibadan, entrepreneurs are deploying AI tools to cut costs, automate tasks, and compete globally. Here's how you can too.",
    time: "5 hrs ago",
    confidence: "Verified",
    body: `<p>Across Nigeria, a quiet revolution is underway. From a one-room apartment in Enugu to a co-working space in Ibadan, entrepreneurs are deploying artificial intelligence tools to build businesses that would have required teams of 10 just three years ago.</p><p>Tools like Claude, ChatGPT, Midjourney, and dozens of specialized platforms are enabling Nigerians to create content, handle customer service, generate legal documents, build software, and market products — all at minimal cost.</p><p>NRT spoke with 12 founders building AI-powered businesses. Their monthly revenues range from ₦200,000 to over ₦2 million. The common thread: starting with one tool, mastering it, then expanding the stack.</p>`
  },
];
