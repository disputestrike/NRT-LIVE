export type Story = {
  id: string; category: string; categorySlug: string;
  headline: string; snippet: string; time: string;
  confidence: "Verified" | "Developing" | "Unverified";
  body: string; image: string; related: string[];
};

export const STORIES: Story[] = [
  {
    id:"p1", category:"Politics", categorySlug:"politics",
    headline:"Senate Passes Sweeping Media Bill Amid Press Freedom Outcry",
    snippet:"Nigeria's upper chamber voted 67–42 to pass the Digital Media Regulation Act, granting sweeping new government oversight over online content and AI-generated news. Critics say it is the most dangerous legislation for the press in a generation.",
    time:"2 mins ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=900&q=80&auto=format&fit=crop",
    body:`<p>Nigeria's upper chamber voted 67–42 Thursday to pass the Digital Media Regulation Act in one of the most contentious legislative sessions in the Senate's recent history, with galleries packed with journalists, civil society representatives and members of the public who had gathered to witness what many described as a historic and deeply troubling moment for press freedom in Africa's most populous nation.</p>
<p>The bill, which had been debated for nearly eight months, grants government authorities sweeping new powers to regulate online content, AI-generated news and social media platforms operating within Nigeria. At its core, the legislation requires all digital news platforms to register with a newly created federal body — the National Digital Information Authority — and mandates that any content generated or assisted by artificial intelligence carry a visible label or face fines of up to ₦50 million per violation.</p>
<p>Senators who voted in favour argued that the legislation was a necessary response to what they described as an explosion of misinformation and AI-generated disinformation that had destabilised political discourse, interfered with health messaging and enabled scammers to defraud Nigerians at unprecedented scale. Senate President Barau Jibrin, in an impassioned floor speech moments before the vote, declared: "We cannot afford to allow anonymous algorithms and foreign-owned platforms to poison the wells of our national conversation without any accountability."</p>
<p>But the bill's opponents — a coalition of 41 senators, joined by virtually every major press freedom organisation operating in Nigeria and across West Africa — described the legislation in far starker terms. The Nigerian Union of Journalists issued a statement within minutes of the vote calling it "the most dangerous piece of legislation for a free press since the military era." Amnesty International Nigeria said it would immediately petition the National Human Rights Commission and begin exploring international legal remedies.</p>
<p>Among the most contested provisions is Section 24, which grants the newly formed Authority the power to order the temporary suspension of any digital news outlet pending investigation, without requiring a court order. Critics say this provision effectively hands the executive branch a kill switch over independent journalism — a characterisation that several senators who voted for the bill strongly disputed.</p>
<p>The bill now moves to President Tinubu's desk, where he has 30 days to sign it into law, return it with amendments, or veto it. Senior presidential advisers declined to comment on which course of action the president was likely to take. Constitutional law experts at the Nigerian Bar Association have already announced that a legal challenge at the Supreme Court is being prepared regardless of the president's decision.</p>
<p>The international response was swift. The Committee to Protect Journalists issued a statement from New York calling on President Tinubu to veto the bill, and the US Embassy in Abuja said it was "monitoring the situation closely in line with our commitment to press freedom and democratic values." The European Union Delegation added its voice, noting that the legislation appeared to conflict with Nigeria's obligations under the African Charter on Human and Peoples' Rights.</p>`,
    related:["e1","n1","i1"]
  },
  {
    id:"p2", category:"Politics", categorySlug:"politics",
    headline:"Kaduna Tribunal Nullifies Governorship Election — Protests Erupt Across State",
    snippet:"The election tribunal nullified the result citing widespread irregularities across 12 LGAs. Security forces deployed as protests turned violent in three towns.",
    time:"45 mins ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=900&q=80&auto=format&fit=crop",
    body:`<p>The Kaduna State Governorship Election Tribunal delivered one of its most consequential rulings in years on Thursday, nullifying the result of last November's governorship election in a decision that triggered immediate and widespread protests across the state and raised profound questions about the integrity of Nigeria's electoral management architecture.</p>
<p>In a 217-page ruling delivered by a three-member tribunal panel led by Justice Fatima Adamu, the court found overwhelming evidence of electoral malpractice in 12 of the state's 23 local government areas, including documented cases of ballot stuffing, systematic voter intimidation, and the manipulation of results sheets at the collation stage. The tribunal determined that the infractions were so pervasive as to have fundamentally affected the outcome of the election.</p>
<p>Within hours of the ruling, protests had broken out in Kaduna city, Zaria and Kafanchan. Security forces were deployed to manage the demonstrations, and the Kaduna State Police Command said three people had been arrested in connection with what it described as acts of vandalism. A dusk-to-dawn curfew was imposed in two local government areas as a precautionary measure.</p>
<p>The incumbent governor's legal team said it would file an appeal at the Court of Appeal in Abuja within the statutory seven-day window, and described the tribunal's decision as "a grave miscarriage of justice that misread the evidence and misapplied the law." The team noted that the ruling appeared to rely heavily on witness testimony that it argued had been discredited during cross-examination.</p>
<p>The ruling is the most significant election nullification in northern Nigeria since 2011 and adds to a growing list of disputed governorship results that have strained public confidence in the Independent National Electoral Commission. Three other governorship elections from the same cycle remain the subject of active tribunal proceedings.</p>`,
    related:["p1","n1","i1"]
  },
  {
    id:"p3", category:"Politics", categorySlug:"politics",
    headline:"Tinubu Signs ₦200B Emergency Infrastructure Fund for Six Northern States",
    snippet:"President Tinubu committed emergency funding to Borno, Zamfara, Kebbi, Sokoto, Yobe and Adamawa, citing decades of neglect and deteriorating public services.",
    time:"2 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80&auto=format&fit=crop",
    body:`<p>President Bola Tinubu on Thursday signed a suite of executive orders committing ₦200 billion in emergency infrastructure funding to six northern states — Borno, Zamfara, Kebbi, Sokoto, Yobe and Adamawa — in what he described as a long-overdue reckoning with decades of structural underdevelopment that had left communities across the north without basic services and economic opportunity.</p>
<p>The signing ceremony, held at the State House in Abuja, was attended by the governors of all six states, senior officials from the World Bank and the African Development Bank, and representatives of civil society organisations that have long advocated for targeted investment in communities affected by insurgency and banditry.</p>
<p>The fund, which will be administered by a newly created Northern Infrastructure Coordination Office under the Ministry of Finance, is to be sourced from a combination of recovered assets held in the Nigerian Sovereign Investment Authority, a new ₦120 billion credit facility from the World Bank, and direct federal budget allocations for the 2026 fiscal year.</p>
<p>Priority areas for the funding include road rehabilitation across the Sahel corridor connecting Sokoto, Kebbi and Zamfara; electricity grid upgrades in Borno, Yobe and Adamawa; and the construction and rehabilitation of primary and secondary schools in communities that have been displaced or disrupted by Boko Haram activity over the past 15 years.</p>
<p>The announcement drew immediate criticism from opposition politicians who noted that the signing came less than two weeks before three by-elections in states that border the six identified beneficiaries. The Peoples Democratic Party described the timing as "a cynical attempt to purchase goodwill with public funds." The administration rejected the characterisation, pointing to project documentation that it said demonstrated years of prior planning.</p>`,
    related:["e1","e2","n2"]
  },
  {
    id:"p4", category:"Politics", categorySlug:"politics",
    headline:"National Assembly Members Reject 40% Pay Cut Amid Cost-of-Living Crisis",
    snippet:"Lawmakers voted 312–41 against a proposed salary reduction despite public outrage as fuel prices and food costs continue to squeeze ordinary Nigerians.",
    time:"4 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=900&q=80&auto=format&fit=crop",
    body:`<p>Members of the Nigerian National Assembly voted 312 to 41 on Thursday to reject a legislative proposal that would have reduced their salaries, allowances and constituency project funding by 40%, even as millions of ordinary Nigerians continue to struggle under a cost-of-living crisis that has driven food inflation above 40% and pushed fuel prices to record levels at the pump.</p>
<p>The motion, introduced by a cross-party group of 23 lawmakers and widely characterised as both a symbolic gesture and a practical call to austerity, had attracted significant public attention in the weeks leading up to the vote. Online petitions calling on lawmakers to support the cut garnered over 800,000 signatures, and the Nigerian Labour Congress had publicly backed the proposal as a demonstration of solidarity with working Nigerians.</p>
<p>The rejection triggered immediate and fierce reaction on social media. Within 90 minutes of the vote, #LegislativeGreed, #ShameOnNASS and #PayCutNow were all trending simultaneously on X in Nigeria, with the combined volume of posts exceeding 150,000 per hour at the peak. Several state governors issued carefully worded statements expressing "disappointment" without directly criticising their party colleagues in the legislature.</p>
<p>Opposition lawmakers who voted in favour of the cut used their floor time to deliver scathing denunciations of their colleagues. "You voted today to protect your comfort while mothers are choosing between feeding their children and paying their transport fare," said Representative Zainab Aliyu of Kano State, in remarks that were widely shared online.</p>
<p>The National Assembly earns among the highest legislative salaries in the world relative to per capita income. According to a 2025 comparative analysis by BudgIT, the average Nigerian lawmaker earns approximately 116 times the annual income of an ordinary Nigerian worker when all allowances are factored in.</p>`,
    related:["e1","e2","p1"]
  },
  {
    id:"e1", category:"Economy", categorySlug:"economy",
    headline:"Naira Hits ₦1,420 Per Dollar as CBN Calls Emergency MPC Meeting",
    snippet:"The naira slid to new lows at the parallel market Thursday, triggering an emergency Central Bank session as analysts warn of further deterioration.",
    time:"8 mins ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80&auto=format&fit=crop",
    body:`<p>The Nigerian naira fell to ₦1,420 against the US dollar at the parallel market on Thursday — its weakest level since the Central Bank of Nigeria's managed float policy was introduced — triggering an emergency convening of the Monetary Policy Committee that sent shockwaves through the financial system and prompted urgent calls from business leaders and economists for decisive intervention.</p>
<p>The slide, which accelerated through the morning trading session, came against a backdrop of mounting pressure on Nigeria's foreign exchange position. Oil receipts — which account for more than 80% of Nigeria's foreign exchange earnings — have fallen below expectations for the third consecutive quarter, while import demand for food, medicine and manufacturing inputs has continued to rise sharply.</p>
<p>The CBN's official rate stood at ₦1,387, creating an arbitrage gap of ₦33 that foreign exchange traders, bureaux de change operators and importers have moved quickly to exploit. Financial analysts said the widening spread was itself a sign of deteriorating confidence in the CBN's ability to defend the official rate.</p>
<p>Senior officials at the CBN confirmed to NRT that an emergency MPC session had been convened for late Thursday afternoon, with the committee expected to consider either a benchmark interest rate increase — which would be the fourth consecutive hike — or a direct intervention in the foreign exchange market using Nigeria's external reserves, which stood at $35.2 billion as of last week. That figure represents approximately seven months of import cover, providing some buffer, but analysts noted that reserve levels have fallen from $38.4 billion in January.</p>
<p>The human impact of the currency's decline was being felt most acutely in the food market, where traders told NRT that the wholesale prices of imported goods — including rice from Thailand, vegetable oil from Malaysia and turkey from the United States — had risen by between 15% and 30% since January. "I used to sell a bag of rice for ₦85,000. Now the same bag costs me ₦108,000 to buy. My customers cannot pay that," said Blessing Nwosu, a foodstuffs trader at Lagos' Mile 12 market.</p>
<p>The Association of Bureaux de Change Operators of Nigeria called on the CBN to increase the volume of foreign exchange sold to licensed operators, arguing that supply constraints rather than demand pressure were the primary driver of the parallel market premium. The CBN was not immediately available for comment on that specific request.</p>`,
    related:["e2","p1","n2"]
  },
  {
    id:"e2", category:"Economy", categorySlug:"economy",
    headline:"CBN Raises Benchmark Rate to 27.5% in Third Consecutive Hike This Year",
    snippet:"The Monetary Policy Committee voted unanimously for a 150-basis-point increase as food inflation breaches 40% — the most aggressive tightening cycle in Nigeria's history.",
    time:"1 hr ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80&auto=format&fit=crop",
    body:`<p>The Central Bank of Nigeria's Monetary Policy Committee voted unanimously on Thursday to raise the benchmark lending rate to 27.5%, delivering a 150-basis-point increase that marks the third consecutive rate hike this year and the most aggressive monetary tightening cycle in Nigeria's post-independence history. The decision, announced by CBN Governor Olayemi Cardoso at a press conference in Abuja, sent Nigerian bank stocks lower and prompted immediate warnings from the manufacturers' lobby that the move could push more factories toward closure.</p>
<p>Governor Cardoso framed the decision in stark but determined terms. "The committee is acutely aware of the pain this decision imposes on households and businesses," he said. "But the committee is equally acutely aware that failing to anchor inflation expectations now would impose far greater pain on far more Nigerians for far longer. We will not flinch from our mandate."</p>
<p>Nigeria's headline inflation reached 33.2% in February, while food inflation — which has a disproportionate impact on lower-income households — surged to 40.8%, its highest level since the National Bureau of Statistics began publishing monthly inflation data in its current form. The naira's continued depreciation has made imported food, medicine and manufacturing inputs increasingly unaffordable, creating a feedback loop between currency weakness and price pressure that the CBN is now attempting to break through aggressive monetary policy.</p>
<p>The Manufacturers Association of Nigeria issued an immediate statement saying it was "deeply alarmed" by the decision. "With lending rates at commercial banks now certain to breach 35%, many of our members — especially small and medium-sized manufacturers — will find it impossible to access the credit they need to maintain production, pay salaries and purchase raw materials," the association's president said.</p>
<p>The Association of Nigerian Exporters took a different view, arguing that higher interest rates were essential to restoring confidence in the naira and creating conditions under which Nigerian exporters could plan with greater certainty. "A stable currency is worth more to us than cheap credit," its chairman said.</p>
<p>Market reaction was mixed. The Nigerian Stock Exchange All-Share Index fell 1.4% in the hours following the announcement, led by declines in banking stocks. However, the naira strengthened modestly at the official rate, recovering from its session low of ₦1,420 to close at ₦1,401 in late afternoon trading — a move analysts attributed to speculation that the CBN might follow the rate decision with direct market intervention.</p>`,
    related:["e1","m1","p3"]
  },
  {
    id:"e3", category:"Economy", categorySlug:"economy",
    headline:"Dangote Refinery Begins Petrol Export to West Africa — A Historic First",
    snippet:"Africa's largest oil refinery has started exporting refined petroleum products to Benin, Ghana and Togo, marking a landmark shift in Nigeria's energy economy.",
    time:"3 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1601027847350-0285867c31f7?w=900&q=80&auto=format&fit=crop",
    body:`<p>The Dangote Petroleum Refinery on Thursday began its first commercial export of refined petroleum products to West African neighbours, dispatching three tankers loaded with petrol, diesel and aviation fuel to offtakers in Benin Republic, Ghana and Togo in what energy analysts described as a landmark moment not just for Nigeria but for the entire region's energy security architecture.</p>
<p>The refinery, situated on a 2,635-hectare site at Lekki Free Trade Zone in Lagos State, has a nameplate processing capacity of 650,000 barrels per day and has been gradually ramping up output since beginning test runs in 2023. It reached 70% operational capacity this week for the first time, generating surplus volumes above domestic demand that made the first export consignment possible.</p>
<p>Aliko Dangote, the refinery's owner and Africa's wealthiest person, attended the loading ceremony at the Lekki export terminal alongside Nigeria's Minister of Petroleum, the Chief Executives of the Nigerian Midstream and Downstream Petroleum Regulatory Authority and representatives of the three receiving countries. "For 60 years Nigeria exported crude oil and imported refined products. That era is now decisively over," Dangote said.</p>
<p>The financial implications are significant. Analysts at Coronation Research estimated that if the refinery sustains 70% capacity and continues to export surplus volumes, Nigeria could generate between $800 million and $1.2 billion annually in petroleum product export revenues — a meaningful contribution to the foreign exchange earnings that the country desperately needs to stabilise the naira.</p>
<p>The development also has major implications for the wider West African fuel market, which has historically been supplied by European refiners, particularly in the Netherlands and Spain, at significant logistical cost and with substantial price volatility. Regional buyers said the availability of competitively priced refined products from a domestic supplier with no shipping time premium was "transformative."</p>`,
    related:["e1","e2","m1"]
  },
  {
    id:"e4", category:"Economy", categorySlug:"economy",
    headline:"IMF Cuts Nigeria Growth Forecast to 3.1% Amid Currency and Inflation Pressures",
    snippet:"The International Monetary Fund revised its Nigeria GDP projection downward citing persistent naira weakness, elevated inflation and constrained fiscal space.",
    time:"5 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80&auto=format&fit=crop",
    body:`<p>The International Monetary Fund on Thursday revised its economic growth forecast for Nigeria downward to 3.1% for 2026, cutting its previous projection of 3.8% by 70 basis points in its latest Article IV consultation assessment, citing persistent naira depreciation, elevated and sticky inflation, and an increasingly constrained fiscal position that limits the government's room to stimulate growth through public spending.</p>
<p>The downward revision places Nigeria's projected growth rate below the sub-Saharan African average of 4.1% and raises fresh questions about whether the Tinubu administration's economic reform programme — which has included the removal of the costly fuel subsidy and a significant liberalisation of the foreign exchange regime — will deliver tangible improvements in living standards within the administration's first term.</p>
<p>The IMF report, which draws on data collected during a team visit to Abuja in February, praised several aspects of the administration's reform agenda, noting that the subsidy removal had significantly improved Nigeria's fiscal position and that the CBN's willingness to allow the naira to find a more market-reflective level had been "broadly appropriate." However, the report warned that "without sustained structural reforms to improve the business environment, diversify export earnings and build fiscal buffers, Nigeria risks a prolonged period of below-potential growth that will deepen poverty and worsen inequality."</p>
<p>The fund's assessment noted that while Nigeria's headline growth numbers appear positive, much of the growth is being driven by the oil sector and a small number of large firms, while the informal economy — which employs more than 80% of Nigeria's working population — is under severe stress from high inflation, expensive credit and weak consumer demand.</p>`,
    related:["e1","e2","p3"]
  },
  {
    id:"s1", category:"Sports", categorySlug:"sports",
    headline:"Super Eagles Squad Named: Osimhen Leads 25-Man AFCON Qualifier Group",
    snippet:"Head coach José Peseiro names a 25-man squad for the crucial double-header against Benin Republic and Lesotho. Lookman returns; Ndidi out injured.",
    time:"14 mins ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=900&q=80&auto=format&fit=crop",
    body:`<p>Super Eagles head coach José Peseiro named his 25-man squad on Thursday for Nigeria's crucial AFCON qualifying double-header next month against Benin Republic and Lesotho, with Victor Osimhen confirming his availability despite the fitness concerns that had surrounded the Napoli striker following a hamstring strain sustained in Serie A action three weeks ago.</p>
<p>The squad, which will assemble in Abuja on Monday for a five-day pre-camp before departing for the away fixture against Benin Republic, features the return of Ademola Lookman following a two-match absence and includes Leicester City midfielder Alhassan Yusuf — uncapped at senior level — who has been in outstanding form in the Premier League this season and has been strongly recommended by the Eagles' scouting department for several months.</p>
<p>The most notable absentee from the squad is Wilfred Ndidi, who underwent arthroscopic knee surgery in January and has not yet returned to full training at Leicester City. The veteran defensive midfielder's absence is a significant blow given his importance to the team's defensive structure, and Peseiro acknowledged at Thursday's press conference that finding an adequate replacement remains one of his primary tactical challenges heading into the qualifiers.</p>
<p>Alex Iwobi was also omitted, with Peseiro confirming that the omission was form-related. The Fulham midfielder has struggled for consistency in the Premier League this season and was poor in both the previous qualifying fixtures. "We need players who are performing at the top of their game right now," Peseiro said diplomatically. "That is the standard we are holding everyone to."</p>
<p>The Eagles currently top Group D with 10 points from four games, three points clear of second-placed Ghana with three fixtures remaining. A win in either of the two upcoming matches would effectively secure qualification for AFCON 2027. Peseiro expressed confidence but urged against complacency, noting that Benin Republic had significantly strengthened their squad in the January transfer window.</p>`,
    related:["s2","s3","s5"]
  },
  {
    id:"s2", category:"Sports · EPL", categorySlug:"sports",
    headline:"Arsenal Title Race Stalls: Haaland Brace Hands City 2–1 Win at Etihad",
    snippet:"Erling Haaland's clinical double ended Arsenal's 7-match winning run. Gunners now trail City by 5 points with 9 games to play in the tightest title race in years.",
    time:"3 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=900&q=80&auto=format&fit=crop",
    body:`<p>Erling Haaland delivered the kind of performance that has come to define Manchester City's era of English football dominance on Thursday night, scoring twice in the second half to give City a 2–1 victory over Arsenal at the Etihad Stadium that may prove to be the decisive moment in this season's Premier League title race — if, indeed, there was ever genuinely a race to speak of.</p>
<p>The Norwegian striker, who had been unusually quiet in the first half as Arsenal's disciplined defensive structure frustrated City's usual patterns of play, came alive after the interval. His first goal, in the 67th minute, came from a Bernardo Silva cutback that Haaland met with characteristic precision, directing a first-time shot across goalkeeper David Raya and into the far corner. His second, in the 81st minute, was even more devastating — a towering header from a Kevin De Bruyne corner that left Raya with no chance.</p>
<p>Arsenal had taken the lead through a Bukayo Saka penalty in the 54th minute after Gabriel Magalhães was brought down in the box by Ruben Dias — a decision City furiously contested but which VAR confirmed. For 13 minutes, the Gunners were on the verge of one of the most significant results in their recent history. Then Haaland struck.</p>
<p>Mikel Arteta was gracious in defeat but visibly frustrated. "We played well enough to get at least a draw. The first goal came against the run of play and the second from a set piece. Those are fine margins," the Arsenal manager said. "But we have nine games left and we will fight for every point." City manager Pep Guardiola was more expansive, describing Haaland's performance as "what separates the very good from the extraordinary."</p>
<p>The result leaves Arsenal five points behind City with nine games remaining. Given City's superior goal difference and their historically strong record in the run-in under Guardiola, most analysts now consider the title race effectively over — though Arsenal's supporters, and Arteta himself, refuse to concede the argument.</p>`,
    related:["s1","s3","s4"]
  },
  {
    id:"s3", category:"Sports · NBA", categorySlug:"sports",
    headline:"Giannis Drops 47 as Bucks Stun Celtics in Must-Win Playoff Thriller",
    snippet:"Antetokounmpo's historic performance — 47 points, 19 rebounds, 8 assists — kept Milwaukee's season alive in overtime.",
    time:"5 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1546519638405-a9f0b27d18b0?w=900&q=80&auto=format&fit=crop",
    body:`<p>Giannis Antetokounmpo delivered what many NBA observers are already calling the performance of the season on Thursday night, scoring 47 points, grabbing 19 rebounds and distributing 8 assists as the Milwaukee Bucks stunned the Boston Celtics 109–107 in overtime to keep their increasingly precarious playoff hopes alive in one of the most electrifying games of the regular season's closing stretch.</p>
<p>The Greek Freak was at his most unstoppable, attacking the basket with the relentless ferocity that has made him a two-time MVP and one of the most dominant physical forces the game has ever produced. He scored Milwaukee's final 11 points in regulation to force overtime after the Bucks had trailed by 8 with 3 minutes remaining, and then hit the go-ahead free throw with 0.4 seconds left in the extra period to seal the win.</p>
<p>The performance came despite Antetokounmpo playing through what Milwaukee later confirmed was a significant left knee bruise sustained in the second quarter. He took three shots of cortisone at halftime, according to sources with knowledge of the situation, and refused to be withdrawn when head coach Doc Rivers suggested it during a timeout in the fourth quarter. "He told me, very directly, that he was playing," Rivers said with what appeared to be genuine admiration. "What can I say? You don't argue with him."</p>
<p>For the Celtics, it was a painful defeat in a game they appeared to have under control for the majority of the evening. Jayson Tatum scored 32 points and Jaylen Brown added 28, but both players struggled in the critical moments of the fourth quarter and overtime, missing a combined four free throws that would have been sufficient to seal the win.</p>
<p>The result leaves the Bucks 1.5 games behind the sixth seed with eight games remaining in the regular season. A playoff berth — which seemed almost impossible a month ago — is now genuinely within reach.</p>`,
    related:["s2","s4","s5"]
  },
  {
    id:"s4", category:"Sports · CAF", categorySlug:"sports",
    headline:"AFCON 2027: Lagos, Abuja and Kano in Running as Nigeria Eyes Co-Host Rights",
    snippet:"Three Nigerian cities remain in contention as CAF finalises venue decisions. Inspectors visited Lagos National Stadium and Abuja's Moshood Abiola Stadium last week.",
    time:"7 hrs ago", confidence:"Developing",
    image:"https://images.unsplash.com/photo-1522778034537-20a2486be803?w=900&q=80&auto=format&fit=crop",
    body:`<p>Three Nigerian cities — Lagos, Abuja and Kano — remain in active contention for hosting duties as the Confederation of African Football moves toward finalising venue assignments for AFCON 2027, which Nigeria is bidding to co-host alongside Morocco in what would be the most expansive edition of the tournament in its 65-year history.</p>
<p>A CAF inspection team completed a five-day visit to all three cities last week, examining stadium infrastructure, training facilities, accommodation capacity, transport logistics and security arrangements. The team's report is expected to be submitted to CAF's executive committee by the end of March, with a final announcement on host venues expected in early May.</p>
<p>The Moshood Abiola National Stadium in Abuja and the newly renovated Teslim Balogun Stadium in Lagos are considered Nigeria's strongest offerings, but officials have also raised the possibility of including the Sani Abacha Stadium in Kano — which holds 40,000 spectators and would bring the tournament to the north for the first time since 1980 — to strengthen the bid's geographic breadth.</p>
<p>Nigeria's bid faces significant competition from Morocco, which is widely expected to host the majority of the tournament's high-profile matches given its superior existing infrastructure. However, Nigerian football federation officials have argued strongly that co-hosting rights should be distributed equitably and that Nigeria's status as African football's most populous nation and most passionate football market entitles it to host at least one group stage venue and a knockout round fixture.</p>
<p>The Nigerian government has pledged $250 million in stadium and infrastructure upgrades as part of the bid, subject to National Assembly approval of the relevant appropriation.</p>`,
    related:["s1","s2","s5"]
  },
  {
    id:"s5", category:"Sports · Boxing", categorySlug:"sports",
    headline:"Efe Ajagba KOs Opponent in Round 3 — Eyes World Heavyweight Title Shot",
    snippet:"Nigerian heavyweight Efe Ajagba scored a devastating third-round stoppage in Las Vegas, staying unbeaten at 17-0 and positioning himself as mandatory WBC challenger.",
    time:"9 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=900&q=80&auto=format&fit=crop",
    body:`<p>Nigerian heavyweight Efe Ajagba remained undefeated on Thursday night after scoring a devastating third-round technical knockout in Las Vegas, improving his professional record to 17 wins from 17 fights — all by stoppage — in a performance that his promoter says has finally moved him to the front of the queue for a WBC world heavyweight title challenge.</p>
<p>Ajagba, 29, who was born in Delta State and trains in Houston, Texas, overwhelmed his opponent with a combination of exceptional hand speed and knockout power that has distinguished him since he represented Nigeria at the 2016 Rio Olympics, where he controversially lost in the super-heavyweight quarter-finals. He dropped his opponent twice in the second round before ending the contest at the 2 minute 47 second mark of the third with a left hook to the body followed by a right hand to the chin.</p>
<p>Bob Arum, the 83-year-old Hall of Fame promoter who handles Ajagba through Top Rank Boxing, said after the fight that he would begin negotiations within days for a mandatory title challenge. "Efe is the mandatory challenger. The WBC has made that clear. Now it's a question of getting the right deal done with the right timing," Arum said. "The next time you see him in a ring, it will be for a world championship."</p>
<p>Ajagba himself was characteristically direct when asked what his ambitions were. "I want to be the first Nigerian world heavyweight champion. That is what I have been working for since I was 14 years old. I am ready. I have always been ready. Let them come," he said through a smile that suggested absolute confidence rather than bravado.</p>
<p>If successful in a world title fight, Ajagba would become only the second Nigerian heavyweight to hold a major world title, after Sam Peter, who held the WBC belt from 2006 to 2008.</p>`,
    related:["s1","s2","s3"]
  },
  {
    id:"en1", category:"Entertainment", categorySlug:"entertainment",
    headline:"Davido Announces 12-City Africa Tour — Lagos Kicks Off This August",
    snippet:"Grammy-nominated Davido confirms African dates with surprise acts rumoured to include Wizkid and Burna Boy. Tickets on sale Monday from ₦35,000.",
    time:"2 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&q=80&auto=format&fit=crop",
    body:`<p>David Adeleke, the Grammy-nominated recording artist known globally as Davido, on Thursday confirmed a 12-city African tour that will run from August through November — the most ambitious continental tour undertaken by a Nigerian artist in the streaming era and one that is already generating enormous commercial interest across the continent.</p>
<p>The "Timeless Tour" Africa leg, announced simultaneously across Davido's social media platforms and through a press release distributed by Live Nation Africa, will open in Lagos before moving to Accra, Nairobi, Johannesburg, Cape Town, Abidjan, Dakar, Kampala, Dar es Salaam, Kigali, Addis Ababa and Casablanca. Each venue is a stadium or large arena, with combined capacity across all 12 shows exceeding 500,000 seats.</p>
<p>Tickets go on sale Monday at 10AM local time in each city through Nairabox and the relevant local ticketing partner. Lagos tickets are priced between ₦35,000 and ₦450,000 depending on the category. Industry sources expect the Lagos date to sell out within hours given the demand generated by Davido's previous homecoming shows.</p>
<p>The tour's supporting cast remains officially unconfirmed, but multiple sources with knowledge of the production told NRT that Wizkid and Burna Boy are both in advanced discussions to appear as surprise guests at the Lagos, Accra and Johannesburg dates — which would make the shows among the most commercially significant African music events since the Afrobeats genre first achieved genuine global reach in the early 2020s.</p>
<p>The announcement comes at a moment when Davido's profile has never been higher. His "Timeless" album became the first Nigerian album to achieve over one billion streams on Spotify last year, and his collaboration with American producer Metro Boomin remains one of the most-streamed tracks globally in 2026.</p>`,
    related:["en2","en3","en4"]
  },
  {
    id:"en2", category:"Entertainment", categorySlug:"entertainment",
    headline:"'Eze Goes to School' Breaks ₦890M Opening Weekend — Nollywood Record",
    snippet:"The long-awaited sequel shattered Nigeria's all-time opening weekend box office record across 180 screens nationwide.",
    time:"5 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=900&q=80&auto=format&fit=crop",
    body:`<p>The long-awaited sequel to the beloved Nollywood classic "Eze Goes to School" shattered Nigeria's all-time opening weekend box office record on Sunday, pulling in ₦890 million across 180 cinema screens nationwide in a performance that has sent producers, distributors and investors rushing to re-examine their assumptions about the commercial potential of Nigerian theatrical cinema.</p>
<p>The film, directed by Chukwuka Emelionwu and produced by EbonyLife Films in partnership with Netflix Africa, follows the original protagonist Eze — now a university lecturer in his 50s — navigating the intersection of institutional corruption, generational conflict and personal redemption at a fictional Nigerian university. The original "Eze Goes to School" was a beloved Nigerian television series from the 1990s, and the new film has been received by older audiences as a nostalgic homecoming and by younger viewers as a genuinely compelling drama in its own right.</p>
<p>Critics have praised the film's production values — widely described as the highest ever achieved by a Nigerian theatrical production — and the performances of veteran actors who reprise their original roles alongside a new generation of Nollywood talent. The film has received five stars from NRT's arts team and an 89% approval rating on Rotten Tomatoes from international critics, an extraordinary achievement for a Nigerian film in mainstream international critical discourse.</p>
<p>The box office figure of ₦890 million beats the previous record of ₦620 million set by "A Tribe Called Judah" in 2023 and has prompted immediate analysis of what it means for the future of Nigerian cinema. "This proves definitively that Nigerians will come to the cinema in extraordinary numbers for the right product," said Mo Abudu, EbonyLife's Chief Executive. "The audience was always there. We just had to meet them at the level they deserved."</p>`,
    related:["en1","en3","en4"]
  },
  {
    id:"en3", category:"Entertainment · Africa", categorySlug:"entertainment",
    headline:"South Africa's Tyla Makes History — First African Artist to Win Two Grammys in One Night",
    snippet:"Cape Town-born Tyla won Best African Music Performance and Best New Artist at Thursday's Grammy Awards in a landmark night for the continent.",
    time:"6 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=900&q=80&auto=format&fit=crop",
    body:`<p>South African singer Tyla made history at the Grammy Awards on Thursday night, becoming the first African artist ever to win two Grammy awards in a single evening when she claimed both the Best African Music Performance award for her smash hit "Water" and the Best New Artist award — beating out six international competitors in one of the evening's most anticipated categories to complete a sweep that reduced her to tears on stage and triggered celebrations across Africa from Lagos to Johannesburg to Nairobi.</p>
<p>The Cape Town-born 22-year-old had arrived at the ceremony already holding one Grammy — she had won Best African Music Performance in 2024 — but her victory in the Best New Artist category elevated her achievement to a different level entirely. No African artist had previously won in that category, which is considered one of the Recording Academy's most prestigious given its role in defining global popular music's future direction.</p>
<p>In her acceptance speech for Best New Artist, delivered in a voice barely controlled by emotion, Tyla dedicated both awards to "every African child who has ever been told that their music isn't good enough, that their stories don't matter, that the world isn't interested in who they are. Tonight, I want you to know that the world is listening. Africa, we are here."</p>
<p>Social media across the continent erupted. Within 20 minutes of the announcement, Tyla's name was trending in 47 countries simultaneously. Nigerian artists including Burna Boy, Wizkid and Davido all posted congratulatory messages describing the win as a victory for the continent rather than a single nation. South Africa's President Cyril Ramaphosa issued a statement calling Tyla "a national treasure and a continental icon."</p>`,
    related:["en1","en2","en4"]
  },
  {
    id:"en4", category:"Entertainment · Africa", categorySlug:"entertainment",
    headline:"Burna Boy's 'African Giant' Stadium Tour Breaks 14 City Sellout Records in 72 Hours",
    snippet:"The Port Harcourt native's continental tour sold out across 14 African cities within 72 hours — the fastest-selling African music tour in history.",
    time:"8 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=900&q=80&auto=format&fit=crop",
    body:`<p>Burna Boy's "African Giant" stadium tour has sold out in 14 African cities within 72 hours of tickets going on sale — the fastest-selling African music tour in recorded history, according to data published by Live Nation Africa on Thursday, cementing the Port Harcourt-born Afrobeats superstar's status as the continent's dominant live music force.</p>
<p>The tour, which will visit Lagos, Accra, Nairobi, Johannesburg, Cape Town, Dakar, Abidjan, Kampala, Dar es Salaam, Kigali, Addis Ababa, Casablanca, Cairo and Luanda between May and September, will play to a combined audience of more than 900,000 people across venues ranging from 40,000-seat stadiums to 80,000-capacity outdoor arenas.</p>
<p>The sellout in under 72 hours surpasses the previous record for an African tour, set by Davido in 2022 when his homecoming shows sold out in five days. It also comfortably exceeds the speed with which major international acts including Beyoncé and Taylor Swift sold out their own African dates in recent years, though those artists played fewer cities at smaller venues.</p>
<p>Burna Boy, who became the first African artist to sell out Madison Square Garden in 2023 and last year headlined Glastonbury to what many described as the festival's most memorable performance in a decade, said in a statement that the sellout reflected something deeper than his individual popularity. "This isn't about me," he said. "This is about Africa deciding that our music, our culture, our stories deserve the biggest stages in the world. And they do. We always did."</p>`,
    related:["en1","en2","en3"]
  },
  {
    id:"n1", category:"Nigeria", categorySlug:"nigeria",
    headline:"Lagos Fuel Scarcity Enters Day 3 — NNPC Promises 72-Hour Resolution",
    snippet:"Long queues returned to Lagos filling stations as scarcity hit its third day, with some stations selling at ₦1,200/litre. NNPC says consignments are en route.",
    time:"1 hr ago", confidence:"Developing",
    image:"https://images.unsplash.com/photo-1565043666747-69f6646db940?w=900&q=80&auto=format&fit=crop",
    body:`<p>Fuel scarcity in Lagos entered its third consecutive day on Thursday with no sign of immediate resolution, as long queues stretching up to a kilometre from filling station forecourts paralysed traffic in multiple parts of the city and black market operators cashed in by selling petrol at ₦1,100 to ₦1,200 per litre — more than double the regulated pump price of ₦480 per litre.</p>
<p>NNPC spokesman Olufemi Soneye said in a statement that consignments from three depots — Atlas Cove in Lagos, Warri in Delta State and Calabar in Cross River State — were in transit and would reach filling stations within 72 hours. He attributed the scarcity to "a temporary disruption in the distribution pipeline" caused by a combination of bad weather affecting depot loading operations and increased demand driven by the ongoing naira depreciation, which had prompted some retailers to hold product in anticipation of higher future prices.</p>
<p>That last explanation drew sharp criticism from consumer advocacy groups, who argued that it amounted to an admission that petrol hoarding by downstream operators was being permitted to continue without meaningful enforcement. "NNPC is telling us that retailers are deliberately withholding product to exploit a currency crisis, and the regulator's response is to say that more supply is coming in 72 hours," said Adenike Okonkwo of the Consumer Protection Network. "Where is the enforcement action against the hoarders?"</p>
<p>The practical impact of the scarcity was being felt across Lagos' economy. Ride-hailing drivers said they were spending three to four hours per day queueing for fuel, drastically reducing the number of trips they could complete and cutting their incomes by as much as 60%. Informal businesses relying on generators — which account for the majority of electricity consumed in Lagos given the city's unreliable grid — said the scarcity was forcing them to close early or suspend operations entirely.</p>`,
    related:["e1","e3","p3"]
  },
  {
    id:"n2", category:"Nigeria", categorySlug:"nigeria",
    headline:"WHO Flags New Mpox Strain Detected in Cross River State — Contact Tracing Underway",
    snippet:"Health authorities confirmed three cases of a previously undetected variant. Contact tracing is underway across 4 LGAs as the NCDC activates emergency protocols.",
    time:"3 hrs ago", confidence:"Developing",
    image:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80&auto=format&fit=crop",
    body:`<p>The World Health Organization and the Nigeria Centre for Disease Control jointly confirmed on Thursday the detection of three cases of a previously uncharacterised mpox variant in Cross River State, activating emergency public health protocols and triggering a rapid contact tracing operation across four local government areas that public health officials said was proceeding efficiently but warranted close monitoring.</p>
<p>The three confirmed cases — two adults and one child — were detected at a primary health centre in Calabar Municipal local government area following routine surveillance activities. Genomic sequencing of viral samples conducted at the NCDC's reference laboratory in Abuja confirmed that the variant differed in several key genetic markers from both the Clade I and Clade II mpox strains that have been identified in previous Nigerian outbreaks, prompting an immediate report to WHO under the International Health Regulations.</p>
<p>All three confirmed cases have been isolated in the infectious disease ward of the University of Calabar Teaching Hospital, where they are receiving supportive care. Their conditions were described as stable. NCDC Director-General Dr. Jide Idris said there was currently no evidence of sustained community transmission and that the detection had occurred through routine surveillance rather than because of an obvious cluster of illness in the population.</p>
<p>Contact tracers have so far identified 47 close contacts of the confirmed cases, all of whom have been placed under 21-day surveillance monitoring. The NCDC said it had sufficient stocks of mpox vaccine — donated by the WHO and bilateral partners — to cover all identified contacts and an additional buffer population, and that vaccination of close contacts was already underway.</p>`,
    related:["p3","e1","n1"]
  },
  {
    id:"n3", category:"Nigeria", categorySlug:"nigeria",
    headline:"Borno Governor Launches $120M Solar Grid to Power One Million Rural Homes",
    snippet:"The Borno state government signed a landmark deal with Chinese and Nigerian investors to build the largest off-grid solar installation in West Africa.",
    time:"6 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&q=80&auto=format&fit=crop",
    body:`<p>Borno State Governor Babagana Zulum on Thursday signed a $120 million agreement with a consortium of Chinese and Nigerian investors to develop what engineers say will be the largest off-grid solar installation in West Africa, a network of distributed solar microgrids and standalone home solar systems designed to provide electricity to one million rural households across the state — communities that have spent their entire lives without reliable power, many of them still recovering from the devastation of Boko Haram's decade-long insurgency.</p>
<p>The project, which will be developed over three years by a consortium led by the Nigerian arm of CCECC — a Chinese state infrastructure company with extensive experience in African energy projects — and Nigerian renewable energy firm Daystar Power, will prioritise communities in Borno's rural local government areas that were most severely affected by the insurgency. Many of these communities lost not only their electrical infrastructure but their entire physical infrastructure — schools, health centres, markets and government buildings — during the height of the conflict.</p>
<p>Governor Zulum, who has built a reputation as one of Nigeria's most effective state executives through his hands-on approach to post-insurgency reconstruction, said the project went beyond electricity. "When we bring light to these communities, we bring the possibility of education, of economic activity, of security, of dignity," he said. "A community without electricity in 2026 is a community that the rest of the world has decided doesn't matter. We are saying loudly that these communities matter."</p>
<p>The project is expected to create approximately 8,000 direct construction and installation jobs over the three-year development period and an estimated 3,500 permanent operations and maintenance jobs thereafter. Local content requirements embedded in the agreement stipulate that at least 60% of the workforce must be drawn from Borno State residents.</p>`,
    related:["p3","e3","e4"]
  },
  {
    id:"i1", category:"Investigation", categorySlug:"investigation",
    headline:"EFCC Arrests 12 Senior Bank Officials in ₦4.7B Forex Fraud Sweep",
    snippet:"Coordinated raids across Lagos and Abuja netted senior officials from three commercial banks connected to a massive fake letters of credit and FX manipulation scheme.",
    time:"31 mins ago", confidence:"Developing",
    image:"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=80&auto=format&fit=crop",
    body:`<p>The Economic and Financial Crimes Commission executed simultaneous early-morning raids across Lagos Island, Victoria Island and the Central Business District of Abuja on Thursday, arresting 12 senior officials from three of Nigeria's commercial banks in connection with an alleged ₦4.7 billion fraud scheme that investigators say exploited Nigeria's foreign exchange regulatory framework through the systematic creation of fictitious letters of credit and the manipulation of transaction records at the collation stage.</p>
<p>The operation, which EFCC sources said had been in planning for seven months following a tip from a whistleblower within one of the affected institutions, involved more than 60 EFCC operatives working in coordinated teams across multiple locations. Computers, servers, mobile devices and physical documentation were seized from all three institutions' offices as part of the raids.</p>
<p>NRT has independently confirmed the identities of three of the 12 individuals arrested. They include a deputy general manager of one of Nigeria's tier-two commercial banks, two branch managers at separate institutions, and — based on information provided by sources with direct knowledge of the investigation — at least one official of the Central Bank of Nigeria's Foreign Exchange department, whose involvement would significantly expand the scope and seriousness of the alleged scheme.</p>
<p>EFCC spokesman Wilson Uwujaren confirmed the arrests in a brief statement issued Thursday morning but declined to name either the individuals concerned or the institutions involved, citing the ongoing nature of the investigation and the need to avoid prejudicing any future prosecution. He said a full press conference would be held Friday morning at EFCC headquarters in Abuja.</p>
<p>Banking sector analysts said that if the allegations were proven, the scheme would represent one of the most sophisticated cases of financial fraud in Nigeria's banking history, combining elements of documentary fraud, insider dealing and regulatory evasion in a way that suggests a high degree of institutional organisation and planning.</p>`,
    related:["p1","e1","i2"]
  },
  {
    id:"i2", category:"Investigation", categorySlug:"investigation",
    headline:"Exclusive: ₦2.3 Trillion in Federal Funds Unaccounted for Across 14 MDAs",
    snippet:"A new Auditor General report seen by NRT reveals that ₦2.3 trillion in federal funds is missing across 14 ministries, departments and agencies — the largest audit gap in Nigerian history.",
    time:"4 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80&auto=format&fit=crop",
    body:`<p>A bombshell report by the Auditor General of the Federation, seen exclusively by NRT before its scheduled public release next week, reveals that ₦2.3 trillion in federal government funds — approximately $1.6 billion at the current official exchange rate — remains unaccounted for across 14 ministries, departments and agencies as of December 31, 2025. The figure, which represents the largest single-year audit gap in Nigerian history, is detailed in a 418-page document that also identifies specific instances of procurement fraud, payroll manipulation and the diversion of project funds across multiple agencies.</p>
<p>The report, which the Office of the Auditor General is legally required to present to the National Assembly by April 1, identifies the Ministry of Humanitarian Affairs and Poverty Alleviation, the Federal Ministry of Works and Housing Infrastructure, and the National Health Insurance Authority as having the three largest unreconciled financial gaps. Combined, these three agencies account for more than ₦980 billion — nearly half the total identified discrepancy.</p>
<p>NRT's investigation team has spent three weeks reviewing the document and verifying key findings against public procurement records, budget implementation reports and testimony from four officials at different agencies who agreed to speak on condition of strict anonymity. All four confirmed the substance of the audit findings relating to their agencies and expressed frustration that previous years' audit reports had failed to trigger meaningful accountability or corrective action.</p>
<p>The Auditor General's office declined to comment, citing the report's pending official submission to the National Assembly. The three agencies identified as having the largest gaps all failed to respond to NRT's requests for comment by publication time. The office of the Minister of Finance said it was "aware of the findings" and that "appropriate action will be taken through the established accountability mechanisms."</p>`,
    related:["p1","i1","p2"]
  },
  {
    id:"m1", category:"Money / Hustle", categorySlug:"money",
    headline:"7 Platforms Actively Hiring Nigerians for Remote Dollar Jobs Right Now",
    snippet:"From AI data labeling to technical writing — legitimate platforms paying $10–$50/hr to Nigerians with the right skills. No capital required to get started.",
    time:"4 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&q=80&auto=format&fit=crop",
    body:`<p>As the naira continues its decline and the cost of living in Nigeria reaches levels that are increasingly difficult for middle-income households to sustain, earning income in foreign currency has transitioned from an aspiration held by a relative few to an economic survival strategy for millions of Nigerians across the professional spectrum. Here, in concrete and actionable detail, are seven platforms that are actively accepting Nigerian applicants in March 2026.</p>
<p><strong>1. Scale AI</strong> — Currently the most accessible entry point for Nigerians without specialist technical skills. Scale AI hires workers globally for AI training data tasks including content review, data labeling, audio transcription and document classification. Payment ranges from $15 to $30 per hour depending on task complexity, and work is available on a flexible, task-based basis. The application process involves completing sample tasks and passing a quality assessment. Nigerian applicants should note that payments are made via Payoneer or direct bank transfer.</p>
<p><strong>2. Toptal</strong> — The elite end of the remote work spectrum. Toptal accepts only the top 3% of applicants after a rigorous screening process that includes English proficiency tests, technical assessments and live problem-solving sessions. Accepted developers typically earn $60 to $200 per hour for work with US and European clients. The bar is very high, but for Nigerian software engineers and data scientists with strong portfolios, the earnings potential is transformative.</p>
<p><strong>3. Deel</strong> — Not a work platform itself but the infrastructure through which hundreds of US, UK and European companies legally employ Nigerian talent. If you see a remote job listing that mentions "Deel payments," it means the company is already set up to hire internationally. Many companies recruiting on LinkedIn for remote roles use Deel, making it worth specifically filtering for this keyword in your job search.</p>
<p><strong>4. Upwork</strong> — The world's largest freelance marketplace is competitive but still viable for Nigerians who invest time in building a strong profile. The key insight most Nigerian freelancers miss: specialise narrowly rather than offering general services. A profile that says "Nigerian-focused social media management for fintech startups" will consistently outperform one that says "social media manager" in the same market.</p>
<p><strong>5. Appen</strong> — Australian company with consistent work in data annotation, search quality evaluation and AI model testing. Pay ranges from $10 to $20 per hour. Work is project-based and availability varies, but Nigerians with strong written English are regularly accepted. Payment via PayPal or Payoneer.</p>
<p><strong>6. Coursera / edX Course Development</strong> — Both platforms actively recruit subject matter experts to develop online courses. If you have deep expertise in any field — law, medicine, accounting, engineering, traditional medicine, Yoruba or Hausa language instruction — both platforms have paid pathways for Nigerians to contribute content. Payment structures vary but typically include a revenue share on course sales.</p>
<p><strong>7. Remoteok / We Work Remotely</strong> — Job boards specifically for remote positions. The advantage for Nigerians is that many companies posting here have already decided to hire internationally, removing the most common barrier at the application stage. Filter for "contract" and "freelance" positions as these typically have fewer nationality restrictions than full-time roles.</p>`,
    related:["m2","e1","e2"]
  },
  {
    id:"m2", category:"Money / Hustle", categorySlug:"money",
    headline:"Flutterwave Launches FlutterSave — Nigeria's First AI-Powered Savings Product",
    snippet:"The fintech giant enters the savings market with an AI product that automatically moves money into goal-based buckets based on your spending patterns and financial goals.",
    time:"7 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1559526324-593bc073d938?w=900&q=80&auto=format&fit=crop",
    body:`<p>Flutterwave, the Nigerian fintech company that has grown since its 2016 founding to become one of the most valuable technology businesses in Africa, officially launched FlutterSave on Thursday — a product that its Chief Executive Olugbenga Agboola describes as Nigeria's first truly AI-powered savings tool, one that uses machine learning to analyse users' financial behaviour and automatically route money into goal-based savings accounts without requiring deliberate user action.</p>
<p>The product, which integrates with all 18 of Nigeria's licensed commercial banks through the country's open banking infrastructure, works by continuously monitoring a user's account activity and identifying regular patterns — salary credits, recurring expenses, discretionary spending — that allow its AI engine to make increasingly sophisticated predictions about when and how much money can be safely moved into savings without disrupting the user's cash flow needs.</p>
<p>"Most savings products in Nigeria ask you to decide how much to save and when," Agboola said at the launch event in Lagos. "FlutterSave flips that. You tell it what you want — a holiday, a car, a house deposit, your child's school fees — and it figures out how to get you there, automatically, without you having to think about it every day. It takes financial willpower out of the equation."</p>
<p>The product offers three savings tiers. The first — FlutterSave Basic — is free and offers returns of 12% per annum, significantly above the typical savings rate offered by commercial banks. The second — FlutterSave Plus — charges a monthly fee of ₦1,500 and offers returns of 18% per annum, achieved through investment in short-duration government securities and money market instruments. The third — FlutterSave Premium — is aimed at higher-net-worth users and offers customised investment portfolios managed in partnership with one of Nigeria's leading asset management firms.</p>
<p>Agboola said the company planned to expand FlutterSave to 12 additional African markets by the fourth quarter of 2026, beginning with Ghana, Kenya and South Africa in the second half of the year.</p>`,
    related:["m1","e1","e4"]
  },
  {
    id:"t1", category:"Tech", categorySlug:"tech",
    headline:"Google DeepMind Partners with University of Lagos on $40M AI Health Research Hub",
    snippet:"The partnership will establish West Africa's first AI-powered disease prediction centre, training 500 Nigerian researchers in machine learning and bioinformatics.",
    time:"3 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80&auto=format&fit=crop",
    body:`<p>Google DeepMind, the Alphabet subsidiary widely considered the world's leading artificial intelligence research organisation, announced Thursday a $40 million partnership with the University of Lagos to establish the West African Centre for AI Health Research — a facility that will focus specifically on applying machine learning and bioinformatics to the disease burden that disproportionately affects West African populations, including malaria, tuberculosis, sickle cell disease and the growing epidemic of non-communicable diseases such as hypertension and diabetes.</p>
<p>The centre, which will be physically located on the University of Lagos campus in Yaba and is expected to be operational by January 2027, will employ 80 full-time researchers and provide training fellowships for 500 Nigerian scientists over five years. DeepMind has committed to embedding six of its own researchers at the centre on rotating two-year assignments to work alongside Nigerian colleagues on joint research projects.</p>
<p>The partnership is the largest single international investment in Nigerian scientific research in the country's history and comes at a moment when Nigeria's research and development ecosystem has been increasingly recognised as an underutilised asset by both international technology companies and global health funders.</p>
<p>The research agenda agreed between DeepMind and the University of Lagos prioritises three areas. The first is early disease detection, using AI models trained on the centre's own data collection to identify malaria, tuberculosis and sickle cell crises at earlier stages than current clinical protocols allow. The second is drug resistance prediction, applying genomic sequencing and machine learning to understand why certain malaria and tuberculosis strains have become resistant to first-line treatments in specific Nigerian communities. The third is health systems optimisation, using operational data from participating hospitals to improve the allocation of scarce medical resources across the Lagos public health network.</p>`,
    related:["t2","m1","n2"]
  },
  {
    id:"t2", category:"Tech", categorySlug:"tech",
    headline:"Lagos Startup Raises $18M to Bring Drone Delivery to 10 Nigerian Cities",
    snippet:"DroneExpress NG closed a Series A led by Norrsken Africa to deploy delivery hubs across Lagos, Abuja, Kano, Port Harcourt and six other cities by year end.",
    time:"5 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=900&q=80&auto=format&fit=crop",
    body:`<p>DroneExpress NG, a Lagos-based logistics technology startup, closed an $18 million Series A funding round on Thursday led by Norrsken Africa — the impact investment arm of the foundation established by Klarna co-founder Niklas Adalberth — with co-investment from MTN Ventures, the strategic investment unit of Africa's largest mobile network operator, and two Nigerian institutional investors who declined to be named.</p>
<p>The company, founded in 2022 by Chidi Okonkwo and Amaka Eze, both of whom previously worked at Nigerian drone logistics pioneer Zipline before founding their own venture, plans to use the funding to deploy a network of 35 drone delivery hubs across 10 Nigerian cities by December 2026, with Lagos, Abuja, Kano and Port Harcourt as the initial four markets and six additional cities to follow in the second half of the year.</p>
<p>The commercial case for drone delivery in Nigerian cities rests primarily on the country's acute last-mile logistics challenge. In Lagos — Africa's largest city and one of the most congested urban environments on the planet — road-based delivery of a parcel across a 15-kilometre distance can take anywhere from 45 minutes to four hours depending on traffic conditions. DroneExpress says its drones, which carry payloads of up to five kilograms and fly at 80 kilometres per hour at an altitude of 120 metres, can complete the same delivery in 18 to 25 minutes regardless of road conditions.</p>
<p>Initial launch partners include a major Nigerian pharmaceutical distribution company, two of the country's largest e-commerce platforms, and one of the five largest banks in Nigeria, which plans to use the service for the rapid secure delivery of banking instruments. Healthcare delivery — particularly the delivery of blood products, vaccines and prescription medications to underserved communities — is also a priority, following the model pioneered by Zipline in Rwanda and Ghana.</p>`,
    related:["t1","m2","e4"]
  },
  {
    id:"af1", category:"Africa", categorySlug:"africa",
    headline:"Kenya's Ruto Signs AfCFTA Bill Into Law — First East African Nation to Fully Activate",
    snippet:"President Ruto signed the implementation bill, making Kenya the first East African nation to fully activate all continental free trade provisions covering 54 countries.",
    time:"1 hr ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&q=80&auto=format&fit=crop",
    body:`<p>Kenyan President William Ruto signed the African Continental Free Trade Agreement Implementation Bill into law Thursday in Nairobi, making Kenya the first East African nation and only the seventh African country overall to have fully activated all provisions of the AfCFTA — a trade framework that, if fully implemented across the 54 signatory nations, would create the world's largest free trade area by number of participating countries and a combined market of 1.4 billion people.</p>
<p>The signing ceremony, held at State House with ambassadors from 31 African nations in attendance, was described by President Ruto as "a defining moment not just for Kenya but for the African project" and drew immediate congratulations from African Union Commission Chair Moussa Faki Mahamat, who called Kenya's action "a powerful signal that Africa is serious about economic integration."</p>
<p>The practical implications of the legislation for Kenyan businesses are significant. Under the AfCFTA framework, Kenyan exporters will progressively face zero tariffs on their goods across 53 other African markets as the agreement's phase-in schedule is implemented. Kenya's export economy — built on tea, coffee, cut flowers, fresh vegetables, processed foods and manufactured goods — is particularly well positioned to benefit from expanded access to markets in West and Central Africa, where Kenyan products have historically faced tariff barriers of between 10% and 35%.</p>
<p>Independent economic analysts estimate that full AfCFTA implementation could increase Kenya's intra-African exports by 45% within five years and create up to 300,000 formal sector jobs in sectors ranging from food processing and light manufacturing to professional services and financial technology.</p>`,
    related:["af2","af3","e3"]
  },
  {
    id:"af2", category:"Africa", categorySlug:"africa",
    headline:"Ethiopia Launches First Domestically Built Satellite — A Continental Milestone",
    snippet:"ETSAT-1 successfully launched from Baikonur Cosmodrome, making Ethiopia the first African nation to design and build a satellite without foreign technical assistance.",
    time:"4 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=900&q=80&auto=format&fit=crop",
    body:`<p>Ethiopia made history in space technology on Thursday, successfully launching ETSAT-1 from Kazakhstan's Baikonur Cosmodrome aboard a Russian Soyuz rocket — the first satellite in African history to have been designed, engineered and built entirely on the continent without foreign technical assistance, representing a profound statement about African scientific capacity and ambition.</p>
<p>The satellite, which was built over four years by a team of 120 Ethiopian engineers and scientists at the Ethiopian Space Science and Geospatial Institute in Addis Ababa, entered a sun-synchronous orbit at an altitude of 530 kilometres and made its first contact with the ground station at the ESSGI campus approximately 94 minutes after launch, transmitting a strong signal that mission controllers described as "everything we had hoped for."</p>
<p>Prime Minister Abiy Ahmed, who attended the launch ceremony at Baikonur along with senior members of his cabinet, called ETSAT-1 "the most significant scientific achievement in Ethiopia's history" and described it as evidence that "Africa is no longer a continent that watches the world from the outside — we are participants in building the future." His speech drew a lengthy standing ovation from the Ethiopian delegation.</p>
<p>ETSAT-1 will be used primarily for agricultural monitoring — tracking rainfall patterns, soil moisture levels and crop health across Ethiopia's vast agricultural hinterland — weather forecasting, and telecommunications support for remote communities that lack reliable connectivity. Secondary mission objectives include environmental monitoring of the Nile River Basin and support for the country's national mapping programme.</p>
<p>The technical achievement is particularly notable given that Ethiopia achieved it without the extensive foreign technical assistance that has characterised other African satellite programmes, including those of Nigeria, Egypt and South Africa, all of which relied heavily on European, Chinese or Israeli partner organisations to design, build or test their satellites.</p>`,
    related:["af1","af3","t1"]
  },
  {
    id:"af3", category:"Africa", categorySlug:"africa",
    headline:"South Africa Unemployment Falls to 29.1% — First Drop in Three Years",
    snippet:"Statistics South Africa data shows the unemployment rate fell 1.8 percentage points in Q1 2026, driven by growth in renewable energy and digital services sectors.",
    time:"6 hrs ago", confidence:"Verified",
    image:"https://images.unsplash.com/photo-1494523716954-dc08e5e57e64?w=900&q=80&auto=format&fit=crop",
    body:`<p>Statistics South Africa published data on Thursday showing that the country's official unemployment rate fell to 29.1% in the first quarter of 2026 — the first meaningful decline in the headline unemployment figure in three consecutive years and one that economists attributed primarily to job creation in two sectors that have been growing rapidly: renewable energy infrastructure construction and digital services, including software development, data analytics and business process outsourcing.</p>
<p>The 1.8 percentage point decline from the Q4 2025 figure of 30.9% represents 340,000 new jobs entering the formal economy during the quarter — the highest single-quarter figure recorded since 2018 and one that exceeded the expectations of all but the most optimistic independent forecasters. The data was released alongside Statistics South Africa's detailed breakdown of employment by sector, which showed that the renewable energy sector alone accounted for 89,000 of the new positions, reflecting the accelerated roll-out of solar and wind capacity under the government's Emergency Power Procurement Programme.</p>
<p>President Cyril Ramaphosa described the data as "profoundly encouraging" but acknowledged in a statement that South Africa's unemployment challenge remained severe and that the current pace of job creation, while positive, needed to be sustained and significantly accelerated over many years to make a structural difference. "One quarter of positive data is a beginning, not a solution," Ramaphosa said. "But it proves that our approach is working and gives us the confidence to go further and faster."</p>
<p>Youth unemployment — which many economists consider the most critical structural challenge facing South Africa — remained stubbornly elevated at 54.8% using the expanded definition that includes discouraged workers. The figure was essentially unchanged from the previous quarter, underscoring the difficulty of reaching the youngest cohort of jobseekers who often lack formal qualifications and work experience.</p>`,
    related:["af1","af2","e4"]
  },
];

export const getCatColor = (cat: string): string => {
  const l = cat.toLowerCase();
  if(l.includes("polit")||l.includes("nigeria")||l.includes("kaduna")) return "#CC0000";
  if(l.includes("sport")||l.includes("epl")||l.includes("nba")||l.includes("caf")||l.includes("boxing")) return "#007A3D";
  if(l.includes("entertain")||l.includes("nollywood")) return "#7C3AED";
  if(l.includes("econom")||l.includes("money")||l.includes("hustle")) return "#B45309";
  if(l.includes("invest")) return "#CC0000";
  if(l.includes("tech")) return "#1D4ED8";
  if(l.includes("health")) return "#0891B2";
  if(l.includes("africa")) return "#D97706";
  return "#FF5C00";
};

export const bySlug = (slug: string) => STORIES.filter(s => s.categorySlug === slug);
export const S = {
  politics:      STORIES.filter(s => s.categorySlug === "politics"),
  economy:       STORIES.filter(s => s.categorySlug === "economy"),
  sports:        STORIES.filter(s => s.categorySlug === "sports"),
  entertainment: STORIES.filter(s => s.categorySlug === "entertainment"),
  nigeria:       STORIES.filter(s => s.categorySlug === "nigeria"),
  investigation: STORIES.filter(s => s.categorySlug === "investigation"),
  money:         STORIES.filter(s => s.categorySlug === "money"),
  tech:          STORIES.filter(s => s.categorySlug === "tech"),
  africa:        STORIES.filter(s => s.categorySlug === "africa"),
};
