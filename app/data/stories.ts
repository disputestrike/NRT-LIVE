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

export const STORIES: Story[] = [
  // ── POLITICS (4 stories) ──────────────────────────────────────
  {
    id:"p1", category:"Politics", categorySlug:"politics",
    headline:"Senate Passes Sweeping Media Bill Amid Press Freedom Outcry",
    snippet:"Nigeria's upper chamber voted 67–42 to pass the Digital Media Regulation Act, granting sweeping new government oversight over online content and AI-generated news. Critics say it is the most dangerous legislation for the press in a generation.",
    time:"2 mins ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=900&q=80&auto=format&fit=crop",
    body:`<p>Nigeria's upper chamber voted 67–42 Thursday to pass the Digital Media Regulation Act — a deeply controversial bill that grants government authorities sweeping oversight powers over online content, AI-generated news, and social media platforms operating within the country.</p><p>The bill requires all digital news platforms to register with a new federal body — the National Digital Information Authority — and mandates that AI-generated content carry clear labels or face fines of up to ₦50 million per violation.</p><p>Critics from the Nigerian Press Organization and Amnesty International warn of chilling effects on investigative journalism and whistleblower protections. "This bill hands the government a kill switch over the press," said NUJ president Chris Isiguzo in an emergency statement.</p><p>The bill now moves to President Tinubu's desk for assent or veto. Constitutional law experts say a legal challenge is almost certain regardless of what he decides. The opposition PDP has already announced plans to petition the Supreme Court.</p>`,
    related:["e1","n1","i1"]
  },
  {
    id:"p2", category:"Politics", categorySlug:"politics",
    headline:"Kaduna Tribunal Nullifies Governorship Election — Protests Erupt Across State",
    snippet:"The election tribunal nullified the result citing widespread irregularities across 12 LGAs. Security forces deployed as protests turned violent in three towns.",
    time:"45 mins ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=900&q=80&auto=format&fit=crop",
    body:`<p>The Kaduna State Election Tribunal nullified the result of last November's governorship election Thursday, citing widespread irregularities including ballot stuffing, voter intimidation and manipulation of results sheets across 12 local government areas.</p><p>Security forces were deployed to manage protests that erupted in Kaduna city, Zaria and Kafanchan following the ruling. The incumbent governor's camp has indicated it will appeal to the Court of Appeal immediately.</p><p>The ruling is the most significant election nullification in northern Nigeria since 2011 and raises fresh questions about the credibility of Nigeria's electoral management body, INEC, which has now overseen three nullified governorship elections in the past 24 months.</p>`,
    related:["p1","n1","i1"]
  },
  {
    id:"p3", category:"Politics", categorySlug:"politics",
    headline:"Tinubu Signs ₦200B Emergency Infrastructure Fund for Six Northern States",
    snippet:"President Tinubu committed emergency funding to Borno, Zamfara, Kebbi, Sokoto, Yobe and Adamawa, citing decades of neglect and deteriorating public services.",
    time:"2 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80&auto=format&fit=crop",
    body:`<p>President Tinubu signed executive orders Thursday committing a ₦200 billion emergency infrastructure fund to six northern states — Borno, Zamfara, Kebbi, Sokoto, Yobe, and Adamawa — citing deteriorating roads, power infrastructure, and educational facilities.</p><p>The fund, sourced partly from recovered assets and a new World Bank credit facility, will be administered by a newly created Northern Infrastructure Coordination Office. Disbursements are expected within 90 days, according to the Ministry of Finance.</p>`,
    related:["e1","e2","n2"]
  },
  {
    id:"p4", category:"Politics", categorySlug:"politics",
    headline:"National Assembly Members Reject Pay Cut Amid Cost-of-Living Crisis",
    snippet:"Lawmakers voted 312–41 against a proposed 40% salary reduction despite public outrage as fuel prices and food costs continue to squeeze ordinary Nigerians.",
    time:"4 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=900&q=80&auto=format&fit=crop",
    body:`<p>Members of the National Assembly voted overwhelmingly Thursday to reject a proposal that would have cut their salaries and allowances by 40% as ordinary Nigerians continue to battle soaring food prices and fuel costs. The motion was defeated 312 to 41.</p><p>The rejection triggered immediate backlash on social media with #LegislativeGreed trending within hours. Opposition lawmakers who voted in favour of the cut described the outcome as "a betrayal of the people's trust."</p>`,
    related:["e1","e2","p1"]
  },

  // ── ECONOMY (4 stories) ──────────────────────────────────────
  {
    id:"e1", category:"Economy", categorySlug:"economy",
    headline:"Naira Hits ₦1,420 Per Dollar as CBN Calls Emergency MPC Meeting",
    snippet:"The naira slid to new lows at the parallel market Thursday, triggering an emergency Central Bank session. Analysts warn of further deterioration as import costs spiral.",
    time:"8 mins ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80&auto=format&fit=crop",
    body:`<p>The Nigerian naira slid to ₦1,420 against the US dollar at the parallel market Thursday, triggering an emergency session of the Central Bank of Nigeria's Monetary Policy Committee, according to sources with direct knowledge of the meeting.</p><p>The currency has lost over 12% of its value since February, driven by surging import demand, declining oil revenues, and reduced foreign direct investment. The CBN's official rate stands at ₦1,387, creating a widening arbitrage gap that traders have moved quickly to exploit.</p><p>Food inflation, currently running above 40%, remains the most pressing concern for ordinary Nigerians, with staples like rice, tomatoes and cooking oil all seeing double-digit price rises in the past month alone.</p>`,
    related:["e2","p1","n2"]
  },
  {
    id:"e2", category:"Economy", categorySlug:"economy",
    headline:"CBN Raises Benchmark Rate to 27.5% in Third Hike This Year",
    snippet:"The Monetary Policy Committee voted unanimously to raise the lending rate by 150 basis points as food inflation breaches 40% — the third consecutive hike this year.",
    time:"1 hr ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80&auto=format&fit=crop",
    body:`<p>The Central Bank of Nigeria's Monetary Policy Committee voted unanimously to raise the benchmark lending rate to 27.5%, an increase of 150 basis points, citing persistent food inflation and continued pressure on the naira. This marks the third consecutive rate hike this year.</p><p>Analysts warn the move could dampen consumer credit and slow GDP growth in Q2. Small businesses reliant on bank loans are expected to feel the sharpest impact, with commercial bank lending rates likely to breach 35% within weeks.</p><p>Governor Cardoso defended the decision saying the bank must "anchor expectations and restore confidence in the monetary framework," even as manufacturers warned the hike would force factory closures.</p>`,
    related:["e1","m1","p3"]
  },
  {
    id:"e3", category:"Economy", categorySlug:"economy",
    headline:"Dangote Refinery Begins Petrol Export to West Africa — A Historic First",
    snippet:"Africa's largest oil refinery has started exporting refined petroleum products to Benin, Ghana and Togo, marking a landmark shift in Nigeria's energy economy.",
    time:"3 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1601027847350-0285867c31f7?w=900&q=80&auto=format&fit=crop",
    body:`<p>The Dangote Petroleum Refinery has begun exporting refined petroleum products to West African neighbours Benin, Ghana and Togo — marking the first time Nigeria has exported petrol to the region rather than importing it from Europe.</p><p>The refinery, with a capacity of 650,000 barrels per day, reached 70% operational capacity this week and is now producing surplus volumes above domestic demand. Analysts say this could generate over $800 million annually in foreign exchange earnings for Nigeria if output targets are sustained.</p>`,
    related:["e1","e2","m1"]
  },
  {
    id:"e4", category:"Economy", categorySlug:"economy",
    headline:"IMF Downgrades Nigeria Growth Forecast to 3.1% Amid Currency Pressures",
    snippet:"The International Monetary Fund cut its Nigeria GDP growth forecast citing persistent naira weakness, high inflation and tight fiscal space heading into Q3.",
    time:"5 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80&auto=format&fit=crop",
    body:`<p>The International Monetary Fund revised its Nigeria economic growth forecast downward to 3.1% for 2026, citing persistent naira depreciation, elevated inflation and increasingly constrained fiscal space. The previous projection had been 3.8%.</p><p>The IMF report praised the government's removal of the fuel subsidy but warned that "without sustained structural reforms, Nigeria risks a prolonged period of below-potential growth that will deepen poverty and inequality."</p>`,
    related:["e1","e2","p3"]
  },

  // ── SPORTS (5 stories) ──────────────────────────────────────
  {
    id:"s1", category:"Sports", categorySlug:"sports",
    headline:"Super Eagles Named: Osimhen Leads 25-Man AFCON Qualifier Squad",
    snippet:"Head coach José Peseiro names a 25-man squad for the crucial double-header against Benin Republic and Lesotho. Lookman returns; Ndidi out with knee injury.",
    time:"14 mins ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=900&q=80&auto=format&fit=crop",
    body:`<p>Super Eagles head coach José Peseiro named a 25-man final squad Thursday for next month's crucial AFCON qualifying double-header against Benin Republic and Lesotho, with Victor Osimhen leading the attack despite recent fitness concerns at Napoli.</p><p>The squad sees the return of Ademola Lookman after a two-match absence and includes uncapped midfielder Alhassan Yusuf of Leicester City, in electrifying Premier League form this season. Notable absentees include Wilfred Ndidi (knee) and Alex Iwobi (form).</p><p>The Eagles currently top Group D with 10 points from 4 games and need just 4 more points from the remaining fixtures to secure qualification for AFCON 2027.</p>`,
    related:["s2","s3","s5"]
  },
  {
    id:"s2", category:"Sports · EPL", categorySlug:"sports",
    headline:"Arsenal Title Race Stalls: Haaland Brace Hands City 2–1 Win at Etihad",
    snippet:"Erling Haaland's clinical double ended Arsenal's 7-match winning run. Gunners now trail City by 5 points with 9 games to play in the tightest title race in years.",
    time:"3 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=900&q=80&auto=format&fit=crop",
    body:`<p>Erling Haaland's clinical second-half brace ended Arsenal's seven-match winning run at the Etihad on Thursday, leaving Mikel Arteta's side five points adrift of Manchester City with nine games remaining in the Premier League title race.</p><p>Arsenal's goal came from a Bukayo Saka penalty in the second half, but Haaland responded with goals in the 67th and 81st minutes. City fans celebrated what many believe is the decisive moment in the title race.</p>`,
    related:["s1","s3","s4"]
  },
  {
    id:"s3", category:"Sports · NBA", categorySlug:"sports",
    headline:"Giannis Drops 47 as Bucks Stun Celtics in Must-Win Playoff Thriller",
    snippet:"Antetokounmpo's historic performance — 47 points, 19 rebounds, 8 assists — kept Milwaukee's season alive in a heart-stopping overtime finish.",
    time:"5 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1546519638405-a9f0b27d18b0?w=900&q=80&auto=format&fit=crop",
    body:`<p>Giannis Antetokounmpo delivered one of the performances of his career Thursday night, scoring 47 points with 19 rebounds and 8 assists as the Milwaukee Bucks stunned the Boston Celtics to keep their playoff hopes alive in overtime.</p><p>The game was decided after Antetokounmpo hit a go-ahead free throw with 0.4 seconds left. The Bucks now sit just 1.5 games behind the 6th seed with 8 games remaining.</p>`,
    related:["s2","s4","s5"]
  },
  {
    id:"s4", category:"Sports · CAF", categorySlug:"sports",
    headline:"AFCON 2027: Lagos, Abuja and Kano in Running as Nigeria Bids to Co-Host",
    snippet:"Three Nigerian cities remain in contention as CAF finalises venue decisions. Inspectors visited Lagos National Stadium and Abuja's Moshood Abiola Stadium last week.",
    time:"7 hrs ago", confidence:"Developing",
    image:"https://images.unsplash.com/photo-1522778034537-20a2486be803?w=900&q=80&auto=format&fit=crop",
    body:`<p>Three Nigerian cities — Lagos, Abuja and Kano — remain in contention for hosting duties as CAF finalises venue decisions for AFCON 2027, which Nigeria is bidding to co-host alongside Morocco.</p><p>A CAF inspection team visited all three cities last week and is expected to submit its report by end of March. Infrastructure upgrades to Lagos' National Stadium and Abuja's Moshood Abiola Stadium are cited as Nigeria's strongest arguments.</p>`,
    related:["s1","s2","s5"]
  },
  {
    id:"s5", category:"Sports · Boxing", categorySlug:"sports",
    headline:"Efe Ajagba KOs Opponent in Round 3 to Stay Unbeaten — Eyes World Title Shot",
    snippet:"Nigerian heavyweight Efe Ajagba scored a devastating third-round stoppage in Las Vegas, maintaining his perfect 17-0 record and positioning himself for a world title challenge.",
    time:"9 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=900&q=80&auto=format&fit=crop",
    body:`<p>Nigerian heavyweight Efe Ajagba delivered a devastating third-round knockout in Las Vegas on Thursday night to remain undefeated at 17-0, with all 17 victories coming by stoppage. The win positions him as the mandatory challenger for the WBC heavyweight title.</p><p>Ajagba's promoter said a world title fight is now "within touching distance" and that negotiations are expected to begin within weeks. If successful, Ajagba would become only the second Nigerian to hold a major heavyweight title after Sam Peter.</p>`,
    related:["s1","s2","s3"]
  },

  // ── ENTERTAINMENT — Africa-wide (4 stories) ──────────────────
  {
    id:"en1", category:"Entertainment", categorySlug:"entertainment",
    headline:"Davido Announces 12-City Africa Tour — Lagos Kicks Off This August",
    snippet:"Grammy-nominated Davido confirms African dates with surprise acts rumoured to include Wizkid and Burna Boy. Tickets from ₦35,000 on sale Monday.",
    time:"2 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&q=80&auto=format&fit=crop",
    body:`<p>Grammy-nominated artist Davido confirmed Thursday a 12-city African tour kicking off in Lagos this August. The "Timeless Tour" Africa leg will also stop in Accra, Nairobi, Johannesburg, and Abidjan, among other cities.</p><p>Surprise opening acts are rumoured to include Wizkid and Burna Boy, according to sources close to the production. Tickets go on sale Monday at 10AM via Nairabox and major regional ticketing platforms. Lagos dates are expected to sell out within hours.</p>`,
    related:["en2","en3","en4"]
  },
  {
    id:"en2", category:"Entertainment", categorySlug:"entertainment",
    headline:"Nollywood Record: 'Eze Goes to School' Breaks ₦890M Opening Weekend",
    snippet:"The long-awaited sequel shattered Nigeria's all-time opening weekend box office record across 180 screens nationwide — a watershed moment for African cinema.",
    time:"5 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=900&q=80&auto=format&fit=crop",
    body:`<p>The long-awaited Nollywood sequel 'Eze Goes to School' shattered Nigeria's all-time opening weekend box office record, pulling in ₦890 million across 180 screens nationwide. It is the biggest opening in African cinema history.</p><p>The film, directed by Chukwuka Emelionwu and starring the original cast, follows a now-adult Eze navigating university politics, corruption and romance. Critics have praised it as the most polished Nigerian theatrical production to date.</p>`,
    related:["en1","en3","en4"]
  },
  {
    id:"en3", category:"Entertainment · Africa", categorySlug:"entertainment",
    headline:"South Africa's Tyla Becomes First African Artist to Win Two Grammys in One Night",
    snippet:"Cape Town-born singer Tyla made history at the Grammy Awards, winning Best African Music Performance and Best New Artist in a landmark night for the continent.",
    time:"6 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=900&q=80&auto=format&fit=crop",
    body:`<p>South African singer Tyla made history at the Grammy Awards Thursday night, becoming the first African artist to win two Grammy awards in a single evening. She took home Best African Music Performance for her smash hit "Water" and Best New Artist, beating out six international competitors.</p><p>The Cape Town-born artist, 22, broke down in tears on stage during her acceptance speech, dedicating the awards to "every African child who has ever been told their music isn't world-class." Social media across the continent erupted in celebration.</p>`,
    related:["en1","en2","en4"]
  },
  {
    id:"en4", category:"Entertainment · Africa", categorySlug:"entertainment",
    headline:"Burna Boy's 'African Giant' Stadium Tour Breaks 14 African City Records",
    snippet:"The Port Harcourt native's continental tour sold out in 14 African cities within 72 hours — the fastest-selling African music tour in history.",
    time:"8 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=900&q=80&auto=format&fit=crop",
    body:`<p>Burna Boy's "African Giant" stadium tour has sold out in 14 African cities within 72 hours of tickets going on sale — the fastest-selling African music tour in history, according to promoter Live Nation Africa.</p><p>The tour will visit Lagos, Accra, Nairobi, Johannesburg, Cape Town, Dakar, Abidjan, Kampala, Dar es Salaam, Kigali, Addis Ababa, Casablanca, Cairo and Luanda between May and September. Each venue holds between 40,000 and 80,000 people.</p>`,
    related:["en1","en2","en3"]
  },

  // ── NIGERIA LOCAL (3 stories) ──────────────────────────────
  {
    id:"n1", category:"Nigeria", categorySlug:"nigeria",
    headline:"Lagos Fuel Scarcity Enters Day 3 — NNPC Promises 72-Hour Resolution",
    snippet:"Long queues returned to Lagos filling stations as scarcity hit its third day, with some stations selling petrol at ₦1,200/litre. NNPC says consignments are en route.",
    time:"1 hr ago", confidence:"Developing",
    image:"https://images.unsplash.com/photo-1565043666747-69f6646db940?w=900&q=80&auto=format&fit=crop",
    body:`<p>Long queues returned to Lagos filling stations Thursday as fuel scarcity hit its third consecutive day, with some black market operators selling petrol at ₦1,200 per litre — more than double the regulated pump price.</p><p>NNPC spokesperson Olufemi Soneye said consignments from three storage depots are en route and the situation should normalise within 72 hours. The federal government has attributed the scarcity to distribution logistics rather than supply shortfalls.</p>`,
    related:["e1","e3","p3"]
  },
  {
    id:"n2", category:"Nigeria", categorySlug:"nigeria",
    headline:"WHO Flags New Mpox Strain Detected in Cross River State",
    snippet:"Health authorities confirmed three cases of a previously undetected mpox variant. Contact tracing is underway across 4 LGAs as the NCDC activates emergency protocols.",
    time:"3 hrs ago", confidence:"Developing",
    image:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80&auto=format&fit=crop",
    body:`<p>The World Health Organization and Nigeria Centre for Disease Control confirmed three cases of a previously undetected mpox variant in Cross River State, triggering a rapid contact tracing operation across four local government areas.</p><p>The NCDC said all three cases have been isolated and that there is currently no evidence of sustained community transmission. Authorities are urging the public to report any unusual skin rashes or fever to the nearest health facility immediately.</p>`,
    related:["p3","e1","n1"]
  },
  {
    id:"n3", category:"Nigeria", categorySlug:"nigeria",
    headline:"Borno Governor Launches $120M Solar Grid to Power One Million Rural Homes",
    snippet:"The Borno state government signed a landmark deal with a consortium of Chinese and Nigerian investors to build the largest off-grid solar installation in West Africa.",
    time:"6 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&q=80&auto=format&fit=crop",
    body:`<p>The Borno State Government signed a landmark $120 million agreement Thursday with a consortium of Chinese and Nigerian investors to build what will become the largest off-grid solar installation in West Africa, aiming to power one million rural homes across the state.</p><p>Governor Zulum said the project will create 8,000 construction jobs and provide clean electricity to communities that have never been connected to the national grid, particularly in areas recovering from Boko Haram devastation.</p>`,
    related:["p3","e3","e4"]
  },

  // ── INVESTIGATION (2 stories) ────────────────────────────────
  {
    id:"i1", category:"Investigation", categorySlug:"investigation",
    headline:"EFCC Arrests 12 Senior Bank Officials in ₦4.7B Forex Fraud Sweep",
    snippet:"Coordinated early-morning raids across Lagos and Abuja netted senior officials from three commercial banks connected to fake letters of credit and FX manipulation.",
    time:"31 mins ago", confidence:"Developing",
    image:"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=80&auto=format&fit=crop",
    body:`<p>The Economic and Financial Crimes Commission arrested 12 senior officials from three commercial banks in coordinated early-morning raids across Lagos and Abuja Thursday, in connection with an alleged ₦4.7 billion fraud scheme involving fake letters of credit and manipulated foreign exchange transactions.</p><p>NRT has confirmed the identities of three of those arrested, including a deputy general manager and two branch managers. EFCC spokesperson Wilson Uwujaren confirmed the arrests but declined to name the banks. A full press conference is expected Friday morning.</p>`,
    related:["p1","e1","i2"]
  },
  {
    id:"i2", category:"Investigation", categorySlug:"investigation",
    headline:"Exclusive: ₦2.3 Trillion in Public Funds Unaccounted for Across 14 MDAs",
    snippet:"A new Auditor General report seen by NRT reveals that ₦2.3 trillion in federal funds is missing or unaccounted for across 14 ministries, departments and agencies.",
    time:"4 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80&auto=format&fit=crop",
    body:`<p>A bombshell report by the Auditor General of the Federation, seen exclusively by NRT, reveals that ₦2.3 trillion in federal government funds remains unaccounted for across 14 ministries, departments and agencies as of December 2025.</p><p>The report identifies the Ministry of Humanitarian Affairs, the Federal Ministry of Works and the National Health Insurance Authority as having the largest unexplained gaps. Officials from three of the agencies have already been invited for questioning.</p>`,
    related:["p1","i1","p2"]
  },

  // ── MONEY / HUSTLE (2 stories) ───────────────────────────────
  {
    id:"m1", category:"Money / Hustle", categorySlug:"money",
    headline:"7 Platforms Actively Hiring Nigerians for Remote Dollar Jobs Right Now",
    snippet:"From AI data labeling to technical writing and virtual assistance — legitimate platforms paying $10–$50/hr to Nigerians with the right skills. No capital required.",
    time:"4 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&q=80&auto=format&fit=crop",
    body:`<p>As Nigeria's economy tightens, earning in foreign currency has gone from aspiration to survival strategy for millions. Here are seven platforms actively accepting Nigerian applicants in March 2026.</p><p><strong>1. Scale AI</strong> — Currently hiring for AI data labeling. Entry-level friendly, pays $15–$30/hr.</p><p><strong>2. Toptal</strong> — Elite freelance network. Top 3% accepted. Developers earn $60–$200/hr.</p><p><strong>3. Deel</strong> — Many US companies use Deel to hire Nigerian talent compliantly. Check their job board weekly.</p><p><strong>4. Upwork</strong> — Global marketplace. High competition but strong earning potential for skilled workers.</p>`,
    related:["m2","e1","e2"]
  },
  {
    id:"m2", category:"Money / Hustle", categorySlug:"money",
    headline:"Flutterwave Launches FlutterSave — Nigeria's First AI-Powered Savings Product",
    snippet:"The fintech giant enters the savings market with an AI product that automatically moves money into goal-based buckets based on your spending patterns.",
    time:"7 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1559526324-593bc073d938?w=900&q=80&auto=format&fit=crop",
    body:`<p>Flutterwave officially launched FlutterSave Thursday, positioning it as Nigeria's first AI-powered savings product that learns user spending habits and automatically moves money into goal-based savings buckets.</p><p>The product integrates with all major Nigerian banks via open banking APIs and promises returns above inflation for balances above ₦50,000. CEO Olugbenga Agboola said the company plans to expand FlutterSave to 12 African markets by Q4 2026.</p>`,
    related:["m1","e1","e4"]
  },

  // ── TECH (2 stories) ─────────────────────────────────────────
  {
    id:"t1", category:"Tech", categorySlug:"tech",
    headline:"Google DeepMind Partners with University of Lagos on AI Health Research Hub",
    snippet:"The $40M partnership will establish West Africa's first AI-powered disease prediction centre, training 500 Nigerian researchers in machine learning and bioinformatics.",
    time:"3 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80&auto=format&fit=crop",
    body:`<p>Google DeepMind announced Thursday a $40 million partnership with the University of Lagos to establish West Africa's first AI-powered disease prediction and health research centre. The facility will focus on malaria, tuberculosis and sickle cell disease — conditions that disproportionately affect Nigerians.</p><p>The partnership will train 500 Nigerian researchers in machine learning and bioinformatics over five years and is expected to produce the largest health dataset ever compiled on a West African population.</p>`,
    related:["t2","m1","n2"]
  },
  {
    id:"t2", category:"Tech", categorySlug:"tech",
    headline:"Lagos Startup Raises $18M to Bring Drone Delivery to 10 Nigerian Cities",
    snippet:"DroneExpress NG secured Series A funding to deploy a network of drone delivery hubs across Lagos, Abuja, Kano, Port Harcourt and six other major cities by end of year.",
    time:"5 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=900&q=80&auto=format&fit=crop",
    body:`<p>Lagos-based DroneExpress NG closed an $18 million Series A funding round Thursday led by Norrsken Africa and co-invested by MTN Ventures, to deploy a network of drone delivery hubs across 10 Nigerian cities by December 2026.</p><p>The company says its drones can deliver packages up to 5kg within 30 minutes across a 40km radius, bypassing Lagos traffic congestion that typically makes last-mile delivery 3–4 times more expensive than in comparable cities.</p>`,
    related:["t1","m2","e4"]
  },

  // ── AFRICA SECTION (3 stories) ───────────────────────────────
  {
    id:"af1", category:"Africa", categorySlug:"africa",
    headline:"Kenya's Ruto Signs Continental Free Trade Agreement Into Law",
    snippet:"President Ruto signed the AfCFTA implementation bill, making Kenya the first East African nation to fully activate continental free trade provisions covering 54 countries.",
    time:"1 hr ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&q=80&auto=format&fit=crop",
    body:`<p>Kenyan President William Ruto signed the African Continental Free Trade Agreement implementation bill into law Thursday, making Kenya the first East African nation to fully activate all AfCFTA trade provisions. The agreement covers 54 African countries and a combined GDP of $3.4 trillion.</p><p>Analysts expect Kenyan exports — particularly tea, coffee and manufactured goods — to double within five years as tariff barriers with 53 other African markets are progressively eliminated.</p>`,
    related:["af2","af3","e3"]
  },
  {
    id:"af2", category:"Africa", categorySlug:"africa",
    headline:"Ethiopia Becomes First African Nation to Launch Domestically Built Satellite",
    snippet:"Ethiopia's ETSAT-1 was successfully launched from the Baikonur Cosmodrome, making Ethiopia the first African nation to design, build and own a satellite entirely on the continent.",
    time:"4 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=900&q=80&auto=format&fit=crop",
    body:`<p>Ethiopia successfully launched ETSAT-1 Thursday — the first satellite designed, built and owned by an African country without foreign technical assistance. The satellite launched from Kazakhstan's Baikonur Cosmodrome aboard a Soyuz rocket.</p><p>The satellite, which will be used for agricultural monitoring, weather forecasting and telecommunications, was built over four years by a team of 120 Ethiopian engineers at the Ethiopian Space Science and Geospatial Institute in Addis Ababa.</p>`,
    related:["af1","af3","t1"]
  },
  {
    id:"af3", category:"Africa", categorySlug:"africa",
    headline:"South Africa Unemployment Falls to 29.1% — First Drop in Three Years",
    snippet:"Statistics South Africa data shows the unemployment rate fell 1.8 percentage points in Q1 2026, driven by growth in the renewable energy and digital services sectors.",
    time:"6 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1494523716954-dc08e5e57e64?w=900&q=80&auto=format&fit=crop",
    body:`<p>Statistics South Africa reported Thursday that the country's unemployment rate fell to 29.1% in Q1 2026 — the first meaningful decline in three years — driven primarily by job creation in renewable energy infrastructure and digital services.</p><p>The data showed 340,000 new jobs were created in the quarter, the highest single-quarter figure since 2018. Youth unemployment, however, remained stubbornly high at 54.8%, according to the expanded definition.</p>`,
    related:["af1","af2","e4"]
  },
];

export const getCatColor = (cat: string): string => {
  const l = cat.toLowerCase();
  if(l.includes("polit")||l.includes("nigeria")||l.includes("kaduna")||l.includes("abuja")) return "#CC0000";
  if(l.includes("sport")||l.includes("epl")||l.includes("nba")||l.includes("caf")||l.includes("eagle")||l.includes("boxing")) return "#007A3D";
  if(l.includes("entertain")||l.includes("nollywood")||l.includes("music")) return "#7C3AED";
  if(l.includes("econom")||l.includes("money")||l.includes("hustle")||l.includes("market")||l.includes("fintech")) return "#B45309";
  if(l.includes("invest")) return "#CC0000";
  if(l.includes("tech")) return "#1D4ED8";
  if(l.includes("health")) return "#0891B2";
  if(l.includes("africa")) return "#D97706";
  return "#FF5C00";
};

// Grouped exports for easy page use
export const bySlug = (slug: string) => STORIES.filter(s => s.categorySlug === slug);
export const S = {
  politics:     STORIES.filter(s => s.categorySlug === "politics"),
  economy:      STORIES.filter(s => s.categorySlug === "economy"),
  sports:       STORIES.filter(s => s.categorySlug === "sports"),
  entertainment:STORIES.filter(s => s.categorySlug === "entertainment"),
  nigeria:      STORIES.filter(s => s.categorySlug === "nigeria"),
  investigation:STORIES.filter(s => s.categorySlug === "investigation"),
  money:        STORIES.filter(s => s.categorySlug === "money"),
  tech:         STORIES.filter(s => s.categorySlug === "tech"),
  africa:       STORIES.filter(s => s.categorySlug === "africa"),
};
