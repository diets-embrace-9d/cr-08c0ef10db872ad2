// Generates a short example sentence for a vocab word, built primarily from
// other Top-200 scaffold vocabulary (我/你/佢/想/可以/鍾意/有/今日/呢度…), so
// reviewing a word also reinforces reading. Part-of-speech is inferred from
// the rank range each word was authored in (see data/vocab.js categories),
// with a small exceptions table for words that don't fit their range's norm.

const RANGES = [
  [1, 20, "skip"], // pronouns / question words
  [21, 35, "skip"], // numbers
  [36, 90, "verb"],
  [91, 110, "skip"], // modal / connectors
  [111, 150, "adj"],
  [151, 170, "noun"], // time
  [171, 185, "noun"], // family / people
  [186, 200, "place"],
  [201, 210, "adj"], // colors
  [211, 225, "noun"], // body parts
  [226, 250, "noun"], // food / drink
  [251, 260, "noun"], // weather
  [261, 270, "noun"], // clothing
  [271, 280, "noun"], // transport
  [281, 295, "noun"], // shopping / money
  [296, 305, "noun"], // tech
  [306, 320, "adj"], // emotions
  [321, 330, "noun"], // directions
  [331, 345, "skip"], // classifiers
  [346, 352, "noun"], // days
  [353, 400, "verb"],
  [401, 460, "noun"],
  [461, 475, "skip"], // greetings / standalone phrases
  [476, 500, "adj"],
  [501, 530, "noun"], // work
  [531, 555, "noun"], // education
  [556, 580, "noun"], // health
  [581, 598, "verb"], // sports actions
  [599, 605, "noun"], // ball games / hobby nouns
  [606, 630, "place"], // travel
  [631, 650, "verb"], // relationships
  [651, 675, "noun"], // abstract concepts
  [676, 700, "noun"], // HK culture / food
  [701, 740, "verb"],
  [741, 770, "adj"],
  [771, 800, "noun"], // professions / society
  [801, 812, "noun"], // festivals
  [813, 832, "noun"], // time / quantity
  [833, 847, "skip"], // comparison / degree adverbs
  [848, 862, "skip"], // classifiers / ordinals
  [863, 882, "skip"], // idioms / standalone expressions
  [883, 902, "noun"], // tech extra
  [903, 922, "noun"], // home / furniture
  [923, 942, "noun"], // nature / animals
  [943, 962, "noun"], // food extra
  [963, 982, "noun"], // materials / shapes / science
  [983, 1000, "noun"], // news / media / environment
];

const EXCEPTIONS = {
  251: "verb", 259: "verb", 279: "verb", 283: "verb", 288: "verb",
  294: "verb", 295: "verb", 300: "verb", 301: "verb",
  501: "verb", 502: "verb", 512: "verb", 513: "verb", 516: "verb",
  517: "verb", 518: "verb", 519: "verb", 539: "verb",
  556: "verb", 557: "verb", 560: "verb", 561: "verb", 564: "verb",
  574: "verb", 575: "verb",
  610: "verb", 611: "verb", 613: "adj", 614: "verb", 615: "verb",
  623: "verb", 624: "verb", 625: "verb", 627: "verb", 628: "verb",
  637: "adj", 638: "noun", 641: "noun", 642: "noun", 643: "adj",
  644: "adj", 645: "noun", 646: "noun", 650: "noun",
  826: "adj", 827: "adj",
  886: "verb", 887: "verb", 888: "verb", 889: "verb", 900: "verb",
  988: "verb", 989: "adj",

  // HK Restaurant bonus pack (ids 2001+, no rank so they'd otherwise all
  // default to "noun" — override the verbs, adjectives, and full phrases).
  2001: "verb", 2002: "verb", 2003: "verb", 2004: "verb", 2005: "verb",
  2007: "verb", 2008: "skip", 2013: "skip", 2014: "skip", 2015: "skip",
  2016: "skip", 2017: "skip", 2019: "verb",
  2055: "skip",
  2080: "verb", 2081: "verb", 2082: "verb", 2083: "verb", 2084: "verb",
  2085: "verb", 2086: "verb", 2087: "skip", 2088: "adj", 2089: "verb",
  2090: "skip", 2091: "adj", 2092: "adj", 2093: "adj", 2094: "skip", 2095: "skip",
  2096: "adj", 2101: "verb", 2102: "skip", 2103: "skip",
  2104: "skip", 2105: "skip", 2106: "skip", 2107: "skip", 2108: "skip",
  2109: "skip", 2110: "skip", 2111: "skip", 2112: "skip",
  2153: "skip", 2154: "skip", 2155: "skip", 2156: "adj",

  // Yum cha & dim sum menu expansion (2157+)
  2157: "verb", 2159: "skip", 2162: "verb", 2163: "verb",

  // Noodle shop menu (2192+) — has hand-written sentences below anyway, but
  // kept accurate for consistency with the rest of this table.
  2193: "verb", 2209: "adj",
};

// ===== 501-1000: Work & Office (501-530) =====
const HAND_501_530 = {
  501: [ { zh: "我朝早上班。", jyut: "ngo5 ziu1 zou2 soeng5 baan1.", en: "I go to work in the morning." }, { zh: "你幾點上班呀？", jyut: "nei5 gei2 dim2 soeng5 baan1 aa3?", en: "What time do you go to work?" } ],
  502: [ { zh: "我夜晚下班。", jyut: "ngo5 je6 maan5 haa6 baan1.", en: "I get off work at night." }, { zh: "你幾點下班呀？", jyut: "nei5 gei2 dim2 haa6 baan1 aa3?", en: "What time do you get off work?" } ],
  503: [ { zh: "我老闆好忙。", jyut: "ngo5 lou5 baan2 hou2 mong4.", en: "My boss is very busy." }, { zh: "老闆叫我做嘢。", jyut: "lou5 baan2 giu3 ngo5 zou6 je5.", en: "My boss told me to do something." } ],
  504: [ { zh: "我而家開緊會。", jyut: "ngo5 ji4 gaa1 hoi1 gan2 wui2.", en: "I'm in a meeting right now." }, { zh: "我哋幾點開會呀？", jyut: "ngo5 dei6 gei2 dim2 hoi1 wui2 aa3?", en: "What time is our meeting?" } ],
  505: [ { zh: "會議好耐。", jyut: "wui6 ji5 hou2 noi6.", en: "The meeting is very long." }, { zh: "會議幾點開始呀？", jyut: "wui6 ji5 gei2 dim2 hoi1 ci2 aa3?", en: "What time does the meeting start?" } ],
  506: [ { zh: "我要寫報告。", jyut: "ngo5 jiu3 se2 bou3 gou3.", en: "I need to write a report." }, { zh: "你做完報告未呀？", jyut: "nei5 zou6 jyun4 bou3 gou3 mei6 aa3?", en: "Have you finished the report?" } ],
  507: [ { zh: "唔該簽合約。", jyut: "m4 goi1 cim1 hap6 joek3.", en: "Please sign the contract." }, { zh: "我未睇完合約。", jyut: "ngo5 mei6 tai2 jyun4 hap6 joek3.", en: "I haven't finished reading the contract." } ],
  508: [ { zh: "唔該喺呢度簽名。", jyut: "m4 goi1 hai2 ni1 dou6 cim1 meng2.", en: "Please sign here." }, { zh: "唔該簽合約。", jyut: "m4 goi1 cim1 hap6 joek3.", en: "Please sign the contract." } ],
  509: [ { zh: "我聽日有個面試。", jyut: "ngo5 ting1 jat6 jau5 go3 min6 si3.", en: "I have an interview tomorrow." }, { zh: "面試幾點呀？", jyut: "min6 si3 gei2 dim2 aa3?", en: "What time is the interview?" } ],
  510: [ { zh: "我聽日去見工。", jyut: "ngo5 ting1 jat6 heoi3 gin3 gung1.", en: "I'm going to a job interview tomorrow." }, { zh: "見工點呀？", jyut: "gin3 gung1 dim2 aa3?", en: "How did the interview go?" } ],
  511: [ { zh: "我人工唔高。", jyut: "ngo5 jan4 gung1 m4 gou1.", en: "My salary isn't high." }, { zh: "你人工幾多呀？", jyut: "nei5 jan4 gung1 gei2 do1 aa3?", en: "What's your salary?" } ],
  512: [ { zh: "我夜晚要加班。", jyut: "ngo5 je6 maan5 jiu3 gaa1 baan1.", en: "I need to work overtime tonight." }, { zh: "我唔想加班。", jyut: "ngo5 m4 soeng2 gaa1 baan1.", en: "I don't want to work overtime." } ],
  513: [ { zh: "我哋聽日放假。", jyut: "ngo5 dei6 ting1 jat6 fong3 gaa3.", en: "We're off tomorrow." }, { zh: "今日係星期五，聽日放假！", jyut: "gam1 jat6 hai6 sing1 kei4 ng5, ting1 jat6 fong3 gaa3!", en: "It's Friday, tomorrow's a day off!" } ],
  514: [ { zh: "我要請病假。", jyut: "ngo5 jiu3 cing2 beng6 gaa3.", en: "I need to take sick leave." }, { zh: "佢病咗，攞病假。", jyut: "keoi5 beng6 zo2, lo2 beng6 gaa3.", en: "He/she is sick and took sick leave." } ],
  515: [ { zh: "我想攞年假。", jyut: "ngo5 soeng2 lo2 nin4 gaa3.", en: "I want to take annual leave." }, { zh: "你有幾多日年假呀？", jyut: "nei5 jau5 gei2 do1 jat6 nin4 gaa3 aa3?", en: "How many days of annual leave do you have?" } ],
  516: [ { zh: "我爸爸退休咗。", jyut: "ngo5 baa4 baa1 teoi3 jau1 zo2.", en: "My dad has retired." }, { zh: "你幾時想退休呀？", jyut: "nei5 gei2 si4 soeng2 teoi3 jau1 aa3?", en: "When do you want to retire?" } ],
  517: [ { zh: "我想辭職。", jyut: "ngo5 soeng2 ci4 zik1.", en: "I want to resign." }, { zh: "佢辭咗職。", jyut: "keoi5 ci4 zo2 zik1.", en: "He/she resigned." } ],
  518: [ { zh: "佢俾人炒咗魷魚。", jyut: "keoi5 bei2 jan4 caau2 zo2 jau4 jyu2.", en: "He/she got fired." }, { zh: "我驚俾人炒魷魚。", jyut: "ngo5 geng1 bei2 jan4 caau2 jau4 jyu2.", en: "I'm afraid of getting fired." } ],
  519: [ { zh: "我升咗職！", jyut: "ngo5 sing1 zo2 zik1!", en: "I got promoted!" }, { zh: "恭喜你升職！", jyut: "gung1 hei2 nei5 sing1 zik1!", en: "Congratulations on your promotion!" } ],
  520: [ { zh: "呢間公司福利好好。", jyut: "ni1 gaan1 gung1 si1 fuk1 lei6 hou2 hou2.", en: "This company has great benefits." }, { zh: "有咩福利呀？", jyut: "jau5 me1 fuk1 lei6 aa3?", en: "What benefits are there?" } ],
  521: [ { zh: "我喺邊個部門做嘢呀？", jyut: "ngo5 hai2 bin1 go3 bou6 mun4 zou6 je5 aa3?", en: "Which department do I work in?" }, { zh: "呢個部門好多人。", jyut: "ni1 go3 bou6 mun4 hou2 do1 jan4.", en: "This department has a lot of people." } ],
  522: [ { zh: "佢係經理。", jyut: "keoi5 hai6 ging1 lei5.", en: "He/she is the manager." }, { zh: "經理而家喺開會。", jyut: "ging1 lei5 ji4 gaa1 hai2 hoi1 wui2.", en: "The manager is in a meeting right now." } ],
  523: [ { zh: "佢係經理嘅秘書。", jyut: "keoi5 hai6 ging1 lei5 ge3 bei3 syu1.", en: "He/she is the manager's secretary." }, { zh: "秘書幫我打電話。", jyut: "bei3 syu1 bong1 ngo5 daa2 din6 waa2.", en: "The secretary called for me." } ],
  524: [ { zh: "我要見客戶。", jyut: "ngo5 jiu3 gin3 haak3 wu6.", en: "I need to meet a client." }, { zh: "客戶好滿意。", jyut: "haak3 wu6 hou2 mun5 ji3.", en: "The client is very satisfied." } ],
  525: [ { zh: "佢做緊生意。", jyut: "keoi5 zou6 gan2 saang1 ji3.", en: "He/she is running a business." }, { zh: "生意點呀？", jyut: "saang1 ji3 dim2 aa3?", en: "How's business?" } ],
  526: [ { zh: "我想投資。", jyut: "ngo5 soeng2 tau4 zi1.", en: "I want to invest." }, { zh: "你投資咗幾多錢呀？", jyut: "nei5 tau4 zi1 zo2 gei2 do1 cin2 aa3?", en: "How much money did you invest?" } ],
  527: [ { zh: "我買咗啲股票。", jyut: "ngo5 maai5 zo2 di1 gu2 piu3.", en: "I bought some stocks." }, { zh: "股票升咗。", jyut: "gu2 piu3 sing1 zo2.", en: "The stock went up." } ],
  528: [ { zh: "我買咗保險。", jyut: "ngo5 maai5 zo2 bou2 him2.", en: "I bought insurance." }, { zh: "你有冇買保險呀？", jyut: "nei5 jau5 mou5 maai5 bou2 him2 aa3?", en: "Have you bought insurance?" } ],
  529: [ { zh: "我要寫履歷。", jyut: "ngo5 jiu3 se2 lei5 lik6.", en: "I need to write my resume." }, { zh: "唔該畀你履歷我。", jyut: "m4 goi1 bei2 nei5 lei5 lik6 ngo5.", en: "Please give me your resume." } ],
  530: [ { zh: "你做咩職業呀？", jyut: "nei5 zou6 me1 zik1 jip6 aa3?", en: "What's your occupation?" }, { zh: "佢嘅職業係老師。", jyut: "keoi5 ge3 zik1 jip6 hai6 lou5 si1.", en: "His/her occupation is teacher." } ],
};

// ===== 501-1000: Education (531-555) =====
const HAND_531_555 = {
  531: [ { zh: "我讀緊大學。", jyut: "ngo5 duk6 gan2 daai6 hok6.", en: "I'm studying at university." }, { zh: "呢間大學好大。", jyut: "ni1 gaan1 daai6 hok6 hou2 daai6.", en: "This university is big." } ],
  532: [ { zh: "我喺中學讀書。", jyut: "ngo5 hai2 zung1 hok6 duk6 syu1.", en: "I study at secondary school." }, { zh: "呢間中學好大。", jyut: "ni1 gaan1 zung1 hok6 hou2 daai6.", en: "This secondary school is big." } ],
  533: [ { zh: "我細個喺呢間小學讀書。", jyut: "ngo5 sai3 go3 hai2 ni1 gaan1 siu2 hok6 duk6 syu1.", en: "When I was young I studied at this primary school." }, { zh: "個仔喺小學讀書。", jyut: "go3 zai2 hai2 siu2 hok6 duk6 syu1.", en: "My son studies at primary school." } ],
  534: [ { zh: "個女讀緊幼稚園。", jyut: "go3 neoi2 duk6 gan2 jau3 zi6 jyun4.", en: "My daughter is at kindergarten." }, { zh: "呢間幼稚園好好。", jyut: "ni1 gaan1 jau3 zi6 jyun4 hou2 hou2.", en: "This kindergarten is good." } ],
  535: [ { zh: "考試好難。", jyut: "haau2 si5 hou2 naan4.", en: "The exam is difficult." }, { zh: "我聽日考試。", jyut: "ngo5 ting1 jat6 haau2 si5.", en: "I have an exam tomorrow." } ],
  536: [ { zh: "我哋聽日測驗。", jyut: "ngo5 dei6 ting1 jat6 caak1 jim6.", en: "We have a quiz tomorrow." }, { zh: "測驗好易。", jyut: "caak1 jim6 hou2 ji6.", en: "The quiz is easy." } ],
  537: [ { zh: "我而家做緊功課。", jyut: "ngo5 ji4 gaa1 zou6 gan2 gung1 fo3.", en: "I'm doing homework right now." }, { zh: "你做完功課未呀？", jyut: "nei5 zou6 jyun4 gung1 fo3 mei6 aa3?", en: "Have you finished your homework?" } ],
  538: [ { zh: "我成績好好。", jyut: "ngo5 sing4 zik1 hou2 hou2.", en: "My grades are very good." }, { zh: "你成績點呀？", jyut: "nei5 sing4 zik1 dim2 aa3?", en: "How are your grades?" } ],
  539: [ { zh: "我畢業喇。", jyut: "ngo5 bat1 jip6 laa3.", en: "I've graduated." }, { zh: "你幾時畢業呀？", jyut: "nei5 gei2 si4 bat1 jip6 aa3?", en: "When do you graduate?" } ],
  540: [ { zh: "佢係校長。", jyut: "keoi5 hai6 haau6 zoeng2.", en: "He/she is the principal." }, { zh: "校長好忙。", jyut: "haau6 zoeng2 hou2 mong4.", en: "The principal is very busy." } ],
  541: [ { zh: "佢係我同學。", jyut: "keoi5 hai6 ngo5 tung4 hok6.", en: "He/she is my classmate." }, { zh: "我同學好聰明。", jyut: "ngo5 tung4 hok6 hou2 cung1 ming4.", en: "My classmate is very smart." } ],
  542: [ { zh: "呢個課程好難。", jyut: "ni1 go3 fo3 cing4 hou2 naan4.", en: "This course is difficult." }, { zh: "我讀緊呢個課程。", jyut: "ngo5 duk6 gan2 ni1 go3 fo3 cing4.", en: "I'm taking this course." } ],
  543: [ { zh: "我鍾意呢個科目。", jyut: "ngo5 zung1 ji3 ni1 go3 fo1 muk6.", en: "I like this subject." }, { zh: "你鍾意邊個科目呀？", jyut: "nei5 zung1 ji3 bin1 go3 fo1 muk6 aa3?", en: "Which subject do you like?" } ],
  544: [ { zh: "我鍾意數學。", jyut: "ngo5 zung1 ji3 sou3 hok6.", en: "I like math." }, { zh: "數學好難。", jyut: "sou3 hok6 hou2 naan4.", en: "Math is difficult." } ],
  545: [ { zh: "我唔鍾意化學。", jyut: "ngo5 m4 zung1 ji3 faa3 hok6.", en: "I don't like chemistry." }, { zh: "化學好難。", jyut: "faa3 hok6 hou2 naan4.", en: "Chemistry is difficult." } ],
  546: [ { zh: "我鍾意物理。", jyut: "ngo5 zung1 ji3 mat6 lei5.", en: "I like physics." }, { zh: "物理好難。", jyut: "mat6 lei5 hou2 naan4.", en: "Physics is difficult." } ],
  547: [ { zh: "我鍾意歷史。", jyut: "ngo5 zung1 ji3 lik6 si2.", en: "I like history." }, { zh: "香港有好長嘅歷史。", jyut: "hoeng1 gong2 jau5 hou2 coeng4 ge3 lik6 si2.", en: "Hong Kong has a long history." } ],
  548: [ { zh: "我鍾意地理。", jyut: "ngo5 zung1 ji3 dei6 lei5.", en: "I like geography." }, { zh: "地理好難記。", jyut: "dei6 lei5 hou2 naan4 gei3.", en: "Geography is hard to remember." } ],
  549: [ { zh: "我鍾意體育。", jyut: "ngo5 zung1 ji3 tai2 juk6.", en: "I like PE." }, { zh: "我鍾意打波。", jyut: "ngo5 zung1 ji3 daa2 bo1.", en: "I like playing ball sports." } ],
  550: [ { zh: "圖書館好靜。", jyut: "tou4 syu1 gun2 hou2 zing6.", en: "The library is quiet." }, { zh: "我去圖書館讀書。", jyut: "ngo5 heoi3 tou4 syu1 gun2 duk6 syu1.", en: "I'm going to the library to study." } ],
  551: [ { zh: "我住喺宿舍。", jyut: "ngo5 zyu6 hai2 suk1 se3.", en: "I live in a dormitory." }, { zh: "宿舍好細。", jyut: "suk1 se3 hou2 sai3.", en: "The dormitory is small." } ],
  552: [ { zh: "我攞咗獎學金。", jyut: "ngo5 lo2 zo2 zoeng2 hok6 gam1.", en: "I got a scholarship." }, { zh: "獎學金好難攞。", jyut: "zoeng2 hok6 gam1 hou2 naan4 lo2.", en: "Scholarships are hard to get." } ],
  553: [ { zh: "我而家寫緊論文。", jyut: "ngo5 ji4 gaa1 se2 gan2 leon6 man4.", en: "I'm writing my thesis right now." }, { zh: "篇論文好長。", jyut: "pin1 leon6 man4 hou2 coeng4.", en: "The thesis is long." } ],
  554: [ { zh: "我有一個學位。", jyut: "ngo5 jau5 jat1 go3 hok6 wai2.", en: "I have a degree." }, { zh: "你讀邊個學位呀？", jyut: "nei5 duk6 bin1 go3 hok6 wai2 aa3?", en: "Which degree are you studying?" } ],
  555: [ { zh: "我要着校服。", jyut: "ngo5 jiu3 zoek3 haau6 fuk6.", en: "I need to wear a school uniform." }, { zh: "校服好唔舒服。", jyut: "haau6 fuk6 hou2 m4 syu1 fuk6.", en: "The school uniform isn't comfortable." } ],
};

// ===== 501-1000: Health (556-580) =====
const HAND_556_580 = {
  556: [ { zh: "我要去睇醫生。", jyut: "ngo5 jiu3 heoi3 tai2 ji1 sang1.", en: "I need to see a doctor." }, { zh: "你睇咗醫生未呀？", jyut: "nei5 tai2 zo2 ji1 sang1 mei6 aa3?", en: "Have you seen a doctor yet?" } ],
  557: [ { zh: "我要去睇牙醫。", jyut: "ngo5 jiu3 heoi3 tai2 ngaa4 ji1.", en: "I need to see a dentist." }, { zh: "我隻牙好痛，要睇牙醫。", jyut: "ngo5 zek3 ngaa4 hou2 tung3, jiu3 tai2 ngaa4 ji1.", en: "My tooth hurts, I need to see a dentist." } ],
  558: [ { zh: "我要食藥。", jyut: "ngo5 jiu3 sik6 joek6.", en: "I need to take medicine." }, { zh: "呢種藥好貴。", jyut: "ni1 zung2 joek6 hou2 gwai3.", en: "This medicine is expensive." } ],
  559: [ { zh: "藥房喺邊度呀？", jyut: "joek6 fong4 hai2 bin1 dou6 aa3?", en: "Where is the pharmacy?" }, { zh: "我去藥房買藥。", jyut: "ngo5 heoi3 joek6 fong4 maai5 joek6.", en: "I'm going to the pharmacy to buy medicine." } ],
  560: [ { zh: "我發緊燒。", jyut: "ngo5 faat3 gan2 siu1.", en: "I have a fever." }, { zh: "佢發燒，要睇醫生。", jyut: "keoi5 faat3 siu1, jiu3 tai2 ji1 sang1.", en: "He/she has a fever, needs to see a doctor." } ],
  561: [ { zh: "我咳緊。", jyut: "ngo5 kat1 gan2.", en: "I'm coughing." }, { zh: "你咳咗幾耐呀？", jyut: "nei5 kat1 zo2 gei2 noi6 aa3?", en: "How long have you been coughing?" } ],
  562: [ { zh: "我頭痛。", jyut: "ngo5 tau4 tung3.", en: "I have a headache." }, { zh: "我頭好痛，要食藥。", jyut: "ngo5 tau4 hou2 tung3, jiu3 sik6 joek6.", en: "My head hurts a lot, I need to take medicine." } ],
  563: [ { zh: "我肚痛。", jyut: "ngo5 tou5 tung3.", en: "I have a stomachache." }, { zh: "我個肚好痛。", jyut: "ngo5 go3 tou5 hou2 tung3.", en: "My stomach hurts a lot." } ],
  564: [ { zh: "我受傷咗。", jyut: "ngo5 sau6 soeng1 zo2.", en: "I'm injured." }, { zh: "佢打波嗰陣受傷。", jyut: "keoi5 daa2 bo1 go2 zan6 sau6 soeng1.", en: "He/she got injured while playing ball." } ],
  565: [ { zh: "我隻腳骨折。", jyut: "ngo5 zek3 goek3 gwat1 zit3.", en: "I have a fracture in my leg." }, { zh: "骨折要睇醫生。", jyut: "gwat1 zit3 jiu3 tai2 ji1 sang1.", en: "A fracture needs a doctor's care." } ],
  566: [ { zh: "我對呢個敏感。", jyut: "ngo5 deoi3 ni1 go3 man5 gam2.", en: "I'm allergic to this." }, { zh: "我對蛋敏感。", jyut: "ngo5 deoi3 daan2 man5 gam2.", en: "I'm allergic to eggs." } ],
  567: [ { zh: "我感冒咗。", jyut: "ngo5 gam2 mou6 zo2.", en: "I've caught a cold." }, { zh: "感冒要休息。", jyut: "gam2 mou6 jiu3 jau1 sik1.", en: "A cold needs rest." } ],
  568: [ { zh: "我流感咗。", jyut: "ngo5 lau4 gam2 zo2.", en: "I've got the flu." }, { zh: "流感好辛苦。", jyut: "lau4 gam2 hou2 san1 fu2.", en: "The flu is tough." } ],
  569: [ { zh: "我打咗疫苗。", jyut: "ngo5 daa2 zo2 jik6 miu4.", en: "I got vaccinated." }, { zh: "你打咗疫苗未呀？", jyut: "nei5 daa2 zo2 jik6 miu4 mei6 aa3?", en: "Have you gotten vaccinated yet?" } ],
  570: [ { zh: "我要做身體檢查。", jyut: "ngo5 jiu3 zou6 san1 tai2 gim2 caa4.", en: "I need to do a physical checkup." }, { zh: "你幾時做身體檢查呀？", jyut: "nei5 gei2 si4 zou6 san1 tai2 gim2 caa4 aa3?", en: "When are you doing your checkup?" } ],
  571: [ { zh: "佢係護士。", jyut: "keoi5 hai6 wu6 si6.", en: "He/she is a nurse." }, { zh: "護士喺醫院做嘢。", jyut: "wu6 si6 hai2 ji1 jyun2 zou6 je5.", en: "Nurses work at the hospital." } ],
  572: [ { zh: "佢係醫生。", jyut: "keoi5 hai6 ji1 sang1.", en: "He/she is a doctor." }, { zh: "我要去睇醫生。", jyut: "ngo5 jiu3 heoi3 tai2 ji1 sang1.", en: "I need to see a doctor." } ],
  573: [ { zh: "我要做手術。", jyut: "ngo5 jiu3 zou6 sau2 seot6.", en: "I need surgery." }, { zh: "手術要好耐。", jyut: "sau2 seot6 jiu3 hou2 noi6.", en: "The surgery takes a long time." } ],
  574: [ { zh: "佢要住院。", jyut: "keoi5 jiu3 zyu6 jyun2.", en: "He/she needs to be hospitalized." }, { zh: "我住咗院幾日。", jyut: "ngo5 zyu6 zo2 jyun2 gei2 jat6.", en: "I was hospitalized for a few days." } ],
  575: [ { zh: "我聽日出院。", jyut: "ngo5 ting1 jat6 ceot1 jyun2.", en: "I'm being discharged tomorrow." }, { zh: "佢幾時出院呀？", jyut: "keoi5 gei2 si4 ceot1 jyun2 aa3?", en: "When is he/she being discharged?" } ],
  576: [ { zh: "我哋去急症室。", jyut: "ngo5 dei6 heoi3 gap1 zing3 sat1.", en: "We're going to the emergency room." }, { zh: "急症室好多人。", jyut: "gap1 zing3 sat1 hou2 do1 jan4.", en: "The emergency room is crowded." } ],
  577: [ { zh: "唔該叫救護車。", jyut: "m4 goi1 giu3 gau3 wu6 ce1.", en: "Please call an ambulance." }, { zh: "救護車嚟緊。", jyut: "gau3 wu6 ce1 lai4 gan2.", en: "The ambulance is coming." } ],
  578: [ { zh: "我體溫好高。", jyut: "ngo5 tai2 wan1 hou2 gou1.", en: "My temperature is high." }, { zh: "你體溫幾多度呀？", jyut: "nei5 tai2 wan1 gei2 do1 dou6 aa3?", en: "What's your temperature?" } ],
  579: [ { zh: "我血壓好高。", jyut: "ngo5 hyut3 aat3 hou2 gou1.", en: "My blood pressure is high." }, { zh: "醫生幫我量血壓。", jyut: "ji1 sang1 bong1 ngo5 loeng4 hyut3 aat3.", en: "The doctor checked my blood pressure." } ],
  580: [ { zh: "我爸爸有糖尿病。", jyut: "ngo5 baa4 baa1 jau5 tong4 niu6 beng6.", en: "My dad has diabetes." }, { zh: "糖尿病要小心飲食。", jyut: "tong4 niu6 beng6 jiu3 siu2 sam1 jam2 sik6.", en: "Diabetes requires careful eating." } ],
};

// ===== 501-1000: Sports & Hobbies (581-605) =====
const HAND_581_605 = {
  581: [ { zh: "我鍾意打波。", jyut: "ngo5 zung1 ji3 daa2 bo1.", en: "I like playing ball sports." }, { zh: "我哋去打波。", jyut: "ngo5 dei6 heoi3 daa2 bo1.", en: "We're going to play ball sports." } ],
  582: [ { zh: "我鍾意踢波。", jyut: "ngo5 zung1 ji3 tek3 bo1.", en: "I like playing football." }, { zh: "我哋去踢波。", jyut: "ngo5 dei6 heoi3 tek3 bo1.", en: "We're going to play football." } ],
  583: [ { zh: "我識游水。", jyut: "ngo5 sik1 jau4 seoi2.", en: "I know how to swim." }, { zh: "我哋去游水。", jyut: "ngo5 dei6 heoi3 jau4 seoi2.", en: "We're going swimming." } ],
  584: [ { zh: "我鍾意跑步。", jyut: "ngo5 zung1 ji3 paau2 bou6.", en: "I like running." }, { zh: "我朝早跑步。", jyut: "ngo5 ziu1 zou2 paau2 bou6.", en: "I run in the morning." } ],
  585: [ { zh: "我鍾意健身。", jyut: "ngo5 zung1 ji3 gin6 san1.", en: "I like working out." }, { zh: "我成日去健身。", jyut: "ngo5 sing4 jat6 heoi3 gin6 san1.", en: "I go work out all the time." } ],
  586: [ { zh: "我鍾意瑜伽。", jyut: "ngo5 zung1 ji3 jyu4 gaa1.", en: "I like yoga." }, { zh: "我而家學緊瑜伽。", jyut: "ngo5 ji4 gaa1 hok6 gan2 jyu4 gaa1.", en: "I'm learning yoga right now." } ],
  587: [ { zh: "我哋去行山。", jyut: "ngo5 dei6 heoi3 haang4 saan1.", en: "We're going hiking." }, { zh: "行山好辛苦。", jyut: "haang4 saan1 hou2 san1 fu2.", en: "Hiking is tough." } ],
  588: [ { zh: "我爸爸鍾意釣魚。", jyut: "ngo5 baa4 baa1 zung1 ji3 diu3 jyu2.", en: "My dad likes fishing." }, { zh: "我哋去釣魚。", jyut: "ngo5 dei6 heoi3 diu3 jyu2.", en: "We're going fishing." } ],
  589: [ { zh: "我鍾意攝影。", jyut: "ngo5 zung1 ji3 sip3 jing2.", en: "I like photography." }, { zh: "佢好識攝影。", jyut: "keoi5 hou2 sik1 sip3 jing2.", en: "He/she is good at photography." } ],
  590: [ { zh: "我鍾意畫畫。", jyut: "ngo5 zung1 ji3 waak6 waa2.", en: "I like drawing." }, { zh: "妹妹鍾意畫畫。", jyut: "mui6 mui2 zung1 ji3 waak6 waa2.", en: "My sister likes drawing." } ],
  591: [ { zh: "我識彈琴。", jyut: "ngo5 sik1 taan4 kam4.", en: "I know how to play piano." }, { zh: "佢彈琴彈得好好。", jyut: "keoi5 taan4 kam4 taan4 dak1 hou2 hou2.", en: "He/she plays piano very well." } ],
  592: [ { zh: "我鍾意跳舞。", jyut: "ngo5 zung1 ji3 tiu3 mou5.", en: "I like dancing." }, { zh: "佢跳舞跳得好好。", jyut: "keoi5 tiu3 mou5 tiu3 dak1 hou2 hou2.", en: "He/she dances very well." } ],
  593: [ { zh: "我鍾意睇波。", jyut: "ngo5 zung1 ji3 tai2 bo1.", en: "I like watching ball games." }, { zh: "我哋一齊睇波。", jyut: "ngo5 dei6 jat1 cai4 tai2 bo1.", en: "We're watching the game together." } ],
  594: [ { zh: "我想去睇演唱會。", jyut: "ngo5 soeng2 heoi3 tai2 jin2 coeng3 wui2.", en: "I want to go to a concert." }, { zh: "演唱會好多人。", jyut: "jin2 coeng3 wui2 hou2 do1 jan4.", en: "Concerts are crowded." } ],
  595: [ { zh: "我哋一齊去旅行。", jyut: "ngo5 dei6 jat1 cai4 heoi3 leoi5 hang4.", en: "We're traveling together." }, { zh: "我鍾意旅行。", jyut: "ngo5 zung1 ji3 leoi5 hang4.", en: "I like traveling." } ],
  596: [ { zh: "我哋去露營。", jyut: "ngo5 dei6 heoi3 lou6 jing4.", en: "We're going camping." }, { zh: "露營好好玩。", jyut: "lou6 jing4 hou2 hou2 waan2.", en: "Camping is fun." } ],
  597: [ { zh: "我識滑雪。", jyut: "ngo5 sik1 waat6 syut3.", en: "I know how to ski." }, { zh: "我想學滑雪。", jyut: "ngo5 soeng2 hok6 waat6 syut3.", en: "I want to learn to ski." } ],
  598: [ { zh: "我識潛水。", jyut: "ngo5 sik1 cim4 seoi2.", en: "I know how to dive." }, { zh: "潛水好好玩。", jyut: "cim4 seoi2 hou2 hou2 waan2.", en: "Diving is fun." } ],
  599: [ { zh: "我鍾意拳擊。", jyut: "ngo5 zung1 ji3 kyun4 gik1.", en: "I like boxing." }, { zh: "拳擊好辛苦。", jyut: "kyun4 gik1 hou2 san1 fu2.", en: "Boxing is tough." } ],
  600: [ { zh: "我鍾意打乒乓波。", jyut: "ngo5 zung1 ji3 daa2 bing1 bam1 bo1.", en: "I like playing table tennis." }, { zh: "我哋打乒乓波。", jyut: "ngo5 dei6 daa2 bing1 bam1 bo1.", en: "We're playing table tennis." } ],
  601: [ { zh: "我鍾意打羽毛球。", jyut: "ngo5 zung1 ji3 daa2 jyu5 mou4 kau4.", en: "I like playing badminton." }, { zh: "我哋打羽毛球。", jyut: "ngo5 dei6 daa2 jyu5 mou4 kau4.", en: "We're playing badminton." } ],
  602: [ { zh: "我鍾意打籃球。", jyut: "ngo5 zung1 ji3 daa2 laam4 kau4.", en: "I like playing basketball." }, { zh: "我哋打籃球。", jyut: "ngo5 dei6 daa2 laam4 kau4.", en: "We're playing basketball." } ],
  603: [ { zh: "我鍾意睇足球。", jyut: "ngo5 zung1 ji3 tai2 zuk1 kau4.", en: "I like watching football." }, { zh: "我哋踢足球。", jyut: "ngo5 dei6 tek3 zuk1 kau4.", en: "We're playing football." } ],
  604: [ { zh: "我鍾意打網球。", jyut: "ngo5 zung1 ji3 daa2 mong5 kau4.", en: "I like playing tennis." }, { zh: "我哋打網球。", jyut: "ngo5 dei6 daa2 mong5 kau4.", en: "We're playing tennis." } ],
  605: [ { zh: "你有咩興趣呀？", jyut: "nei5 jau5 me1 hing3 ceoi3 aa3?", en: "What are your hobbies?" }, { zh: "我興趣係游水。", jyut: "ngo5 hing3 ceoi3 hai6 jau4 seoi2.", en: "My hobby is swimming." } ],
};

// ===== 501-1000: Travel (606-630) =====
const HAND_606_630 = {
  606: [ { zh: "唔該畀護照我睇。", jyut: "m4 goi1 bei2 wu6 ziu3 ngo5 tai2.", en: "Please show me your passport." }, { zh: "我搵唔到護照。", jyut: "ngo5 wan2 m4 dou2 wu6 ziu3.", en: "I can't find my passport." } ],
  607: [ { zh: "我要攞簽證。", jyut: "ngo5 jiu3 lo2 cim1 zing3.", en: "I need to get a visa." }, { zh: "你有冇簽證呀？", jyut: "nei5 jau5 mou5 cim1 zing3 aa3?", en: "Do you have a visa?" } ],
  608: [ { zh: "我行李好重。", jyut: "ngo5 hang4 lei5 hou2 cung5.", en: "My luggage is heavy." }, { zh: "你帶咗幾多行李呀？", jyut: "nei5 daai3 zo2 gei2 do1 hang4 lei5 aa3?", en: "How much luggage did you bring?" } ],
  609: [ { zh: "我哋住喺呢間酒店。", jyut: "ngo5 dei6 zyu6 hai2 ni1 gaan1 zau2 dim3.", en: "We're staying at this hotel." }, { zh: "呢間酒店好貴。", jyut: "ni1 gaan1 zau2 dim3 hou2 gwai3.", en: "This hotel is expensive." } ],
  610: [ { zh: "我要訂房。", jyut: "ngo5 jiu3 deng6 fong2.", en: "I need to book a room." }, { zh: "你訂咗房未呀？", jyut: "nei5 deng6 zo2 fong2 mei6 aa3?", en: "Have you booked a room yet?" } ],
  611: [ { zh: "我哋而家登機。", jyut: "ngo5 dei6 ji4 gaa1 dang1 gei1.", en: "We're boarding now." }, { zh: "幾點登機呀？", jyut: "gei2 dim2 dang1 gei1 aa3?", en: "What time do we board?" } ],
  612: [ { zh: "我班機聽日飛。", jyut: "ngo5 baan1 gei1 ting1 jat6 fei1.", en: "My flight is tomorrow." }, { zh: "你班機幾點呀？", jyut: "nei5 baan1 gei1 gei2 dim2 aa3?", en: "What time is your flight?" } ],
  613: [ { zh: "我班機延誤咗。", jyut: "ngo5 baan1 gei1 jin4 ngo6 zo2.", en: "My flight is delayed." }, { zh: "呢班機好延誤。", jyut: "ni1 baan1 gei1 hou2 jin4 ngo6.", en: "This flight is very delayed." } ],
  614: [ { zh: "班機取消咗。", jyut: "baan1 gei1 ceoi2 siu1 zo2.", en: "The flight was cancelled." }, { zh: "我要取消訂房。", jyut: "ngo5 jiu3 ceoi2 siu1 deng6 fong2.", en: "I need to cancel my room booking." } ],
  615: [ { zh: "我要兌換錢。", jyut: "ngo5 jiu3 deoi3 wun6 cin2.", en: "I need to exchange money." }, { zh: "喺邊度可以兌換錢呀？", jyut: "hai2 bin1 dou6 ho2 ji5 deoi3 wun6 cin2 aa3?", en: "Where can I exchange money?" } ],
  616: [ { zh: "今日匯率幾多呀？", jyut: "gam1 jat6 wui6 leot2 gei2 do1 aa3?", en: "What's today's exchange rate?" }, { zh: "匯率好唔同。", jyut: "wui6 leot2 hou2 m4 tung4.", en: "The exchange rate is quite different." } ],
  617: [ { zh: "唔該畀張地圖我。", jyut: "m4 goi1 bei2 zoeng1 dei6 tou4 ngo5.", en: "Please give me a map." }, { zh: "我睇緊地圖。", jyut: "ngo5 tai2 gan2 dei6 tou4.", en: "I'm looking at the map." } ],
  618: [ { zh: "佢係導遊。", jyut: "keoi5 hai6 dou6 jau4.", en: "He/she is a tour guide." }, { zh: "導遊帶我哋去。", jyut: "dou6 jau4 daai3 ngo5 dei6 heoi3.", en: "The tour guide is taking us there." } ],
  619: [ { zh: "呢度係景點。", jyut: "ni1 dou6 hai6 ging2 dim2.", en: "This is a tourist spot." }, { zh: "香港有好多景點。", jyut: "hoeng1 gong2 jau5 hou2 do1 ging2 dim2.", en: "Hong Kong has a lot of tourist spots." } ],
  620: [ { zh: "我想買紀念品。", jyut: "ngo5 soeng2 maai5 gei2 nim6 ban2.", en: "I want to buy souvenirs." }, { zh: "呢個紀念品好靚。", jyut: "ni1 go3 gei2 nim6 ban2 hou2 leng3.", en: "This souvenir is nice." } ],
  621: [ { zh: "我鍾意自由行。", jyut: "ngo5 zung1 ji3 zi6 jau4 hang4.", en: "I like independent travel." }, { zh: "我哋去自由行。", jyut: "ngo5 dei6 heoi3 zi6 jau4 hang4.", en: "We're going on an independent trip." } ],
  622: [ { zh: "我唔鍾意旅行團。", jyut: "ngo5 m4 zung1 ji3 leoi5 hang4 tyun4.", en: "I don't like tour groups." }, { zh: "呢個旅行團好貴。", jyut: "ni1 go3 leoi5 hang4 tyun4 hou2 gwai3.", en: "This tour group is expensive." } ],
  623: [ { zh: "我哋而家出發。", jyut: "ngo5 dei6 ji4 gaa1 ceot1 faat3.", en: "We're departing now." }, { zh: "幾點出發呀？", jyut: "gei2 dim2 ceot1 faat3 aa3?", en: "What time do we depart?" } ],
  624: [ { zh: "我哋抵達喇。", jyut: "ngo5 dei6 dai2 daat6 laa3.", en: "We've arrived." }, { zh: "幾點抵達呀？", jyut: "gei2 dim2 dai2 daat6 aa3?", en: "What time do we arrive?" } ],
  625: [ { zh: "我要轉機。", jyut: "ngo5 jiu3 zyun3 gei1.", en: "I need to transfer flights." }, { zh: "轉機要幾耐呀？", jyut: "zyun3 gei1 jiu3 gei2 noi6 aa3?", en: "How long is the layover?" } ],
  626: [ { zh: "我哋要過海關。", jyut: "ngo5 dei6 jiu3 gwo3 hoi2 gwaan1.", en: "We need to go through customs." }, { zh: "海關好多人。", jyut: "hoi2 gwaan1 hou2 do1 jan4.", en: "Customs is crowded." } ],
  627: [ { zh: "我哋而家入境。", jyut: "ngo5 dei6 ji4 gaa1 jap6 ging2.", en: "We're entering the country now." }, { zh: "入境要好耐。", jyut: "jap6 ging2 jiu3 hou2 noi6.", en: "Entering takes a long time." } ],
  628: [ { zh: "我聽日離境。", jyut: "ngo5 ting1 jat6 lei4 ging2.", en: "I'm leaving the country tomorrow." }, { zh: "你幾時離境呀？", jyut: "nei5 gei2 si4 lei4 ging2 aa3?", en: "When are you leaving?" } ],
  629: [ { zh: "我有時差。", jyut: "ngo5 jau5 si4 caa1.", en: "I have jet lag." }, { zh: "時差好辛苦。", jyut: "si4 caa1 hou2 san1 fu2.", en: "Jet lag is tough." } ],
  630: [ { zh: "呢度好多遊客。", jyut: "ni1 dou6 hou2 do1 jau4 haak3.", en: "There are a lot of tourists here." }, { zh: "我係遊客。", jyut: "ngo5 hai6 jau4 haak3.", en: "I'm a tourist." } ],
};

// ===== 501-1000: Relationships (631-650) =====
const HAND_631_650 = {
  631: [ { zh: "我哋拍緊拖。", jyut: "ngo5 dei6 paak3 gan2 to1.", en: "We're dating." }, { zh: "你哋拍拖幾耐呀？", jyut: "nei5 dei6 paak3 to1 gei2 noi6 aa3?", en: "How long have you two been dating?" } ],
  632: [ { zh: "佢哋分咗手。", jyut: "keoi5 dei6 fan1 zo2 sau2.", en: "They broke up." }, { zh: "我唔想同你分手。", jyut: "ngo5 m4 soeng2 tung4 nei5 fan1 sau2.", en: "I don't want to break up with you." } ],
  633: [ { zh: "我哋結咗婚。", jyut: "ngo5 dei6 git3 zo2 fan1.", en: "We got married." }, { zh: "你幾時結婚呀？", jyut: "nei5 gei2 si4 git3 fan1 aa3?", en: "When are you getting married?" } ],
  634: [ { zh: "佢哋離咗婚。", jyut: "keoi5 dei6 lei4 zo2 fan1.", en: "They got divorced." }, { zh: "離婚好辛苦。", jyut: "lei4 fan1 hou2 san1 fu2.", en: "Divorce is tough." } ],
  635: [ { zh: "我求咗婚。", jyut: "ngo5 kau4 zo2 fan1.", en: "I proposed." }, { zh: "佢幾時求婚呀？", jyut: "keoi5 gei2 si4 kau4 fan1 aa3?", en: "When is he proposing?" } ],
  636: [ { zh: "我哋有個約會。", jyut: "ngo5 dei6 jau5 go3 joek3 wui6.", en: "We have a date." }, { zh: "我哋聽日約會。", jyut: "ngo5 dei6 ting1 jat6 joek3 wui6.", en: "We have a date tomorrow." } ],
  637: [ { zh: "我而家單身。", jyut: "ngo5 ji4 gaa1 daan1 san1.", en: "I'm single now." }, { zh: "佢仲係單身。", jyut: "keoi5 zung6 hai6 daan1 san1.", en: "He/she is still single." } ],
  638: [ { zh: "佢哋而家曖昧緊。", jyut: "keoi5 dei6 ji4 gaa1 oi3 mui6 gan2.", en: "They're in that ambiguous stage." }, { zh: "我唔鍾意曖昧。", jyut: "ngo5 m4 zung1 ji3 oi3 mui6.", en: "I don't like ambiguous relationships." } ],
  639: [ { zh: "佢追求緊我。", jyut: "keoi5 zeoi1 kau4 gan2 ngo5.", en: "He/she is pursuing me." }, { zh: "我想追求佢。", jyut: "ngo5 soeng2 zeoi1 kau4 keoi5.", en: "I want to pursue him/her." } ],
  640: [ { zh: "我想同佢表白。", jyut: "ngo5 soeng2 tung4 keoi5 biu2 baak6.", en: "I want to confess my feelings to him/her." }, { zh: "佢表白咗。", jyut: "keoi5 biu2 baak6 zo2.", en: "He/she confessed their feelings." } ],
  641: [ { zh: "佢哋係情侶。", jyut: "keoi5 dei6 hai6 cing4 leoi5.", en: "They're a couple." }, { zh: "呢對情侶好靚。", jyut: "ni1 deoi3 cing4 leoi5 hou2 leng3.", en: "This couple looks great together." } ],
  642: [ { zh: "佢係我伴侶。", jyut: "keoi5 hai6 ngo5 bun6 leoi5.", en: "He/she is my partner." }, { zh: "搵個好伴侶好難。", jyut: "wan2 go3 hou2 bun6 leoi5 hou2 naan4.", en: "Finding a good partner is hard." } ],
  643: [ { zh: "我已婚。", jyut: "ngo5 ji5 fan1.", en: "I'm married." }, { zh: "佢已婚未呀？", jyut: "keoi5 ji5 fan1 mei6 aa3?", en: "Is he/she married?" } ],
  644: [ { zh: "我未婚。", jyut: "ngo5 mei6 fan1.", en: "I'm unmarried." }, { zh: "佢仲未婚。", jyut: "keoi5 zung6 mei6 fan1.", en: "He/she is still unmarried." } ],
  645: [ { zh: "佢係我前度。", jyut: "keoi5 hai6 ngo5 cin4 dou6.", en: "He/she is my ex." }, { zh: "我搵返個前度。", jyut: "ngo5 wan2 faan1 go3 cin4 dou6.", en: "I ran into my ex." } ],
  646: [ { zh: "我哋異地戀。", jyut: "ngo5 dei6 ji6 dei6 lyun2.", en: "We're in a long-distance relationship." }, { zh: "異地戀好辛苦。", jyut: "ji6 dei6 lyun2 hou2 san1 fu2.", en: "Long-distance relationships are tough." } ],
  647: [ { zh: "我哋而家同居。", jyut: "ngo5 dei6 ji4 gaa1 tung4 geoi1.", en: "We're living together now." }, { zh: "你哋幾時開始同居呀？", jyut: "nei5 dei6 gei2 si4 hoi1 ci2 tung4 geoi1 aa3?", en: "When did you start living together?" } ],
  648: [ { zh: "我哋吵緊架。", jyut: "ngo5 dei6 caau2 gan2 gaa3.", en: "We're arguing." }, { zh: "我哋成日吵架。", jyut: "ngo5 dei6 sing4 jat6 caau2 gaa3.", en: "We argue all the time." } ],
  649: [ { zh: "我哋和好喇。", jyut: "ngo5 dei6 wo4 hou2 laa3.", en: "We've made up." }, { zh: "你哋幾時和好呀？", jyut: "nei5 dei6 gei2 si4 wo4 hou2 aa3?", en: "When did you two make up?" } ],
  650: [ { zh: "我信任你。", jyut: "ngo5 seon3 jam6 nei5.", en: "I trust you." }, { zh: "信任好緊要。", jyut: "seon3 jam6 hou2 gan2 jiu3.", en: "Trust is very important." } ],
};

// ===== 501-1000: Abstract Concepts (651-675) =====
const HAND_651_675 = {
  651: [ { zh: "我鍾意自由。", jyut: "ngo5 zung1 ji3 zi6 jau4.", en: "I love freedom." }, { zh: "自由好緊要。", jyut: "zi6 jau4 hou2 gan2 jiu3.", en: "Freedom is very important." } ],
  652: [ { zh: "人人平等。", jyut: "jan4 jan4 ping4 dang2.", en: "Everyone is equal." }, { zh: "平等好緊要。", jyut: "ping4 dang2 hou2 gan2 jiu3.", en: "Equality is very important." } ],
  653: [ { zh: "呢個唔公平。", jyut: "ni1 go3 m4 gung1 ping4.", en: "This isn't fair." }, { zh: "老師好公平。", jyut: "lou5 si1 hou2 gung1 ping4.", en: "The teacher is fair." } ],
  654: [ { zh: "我相信正義。", jyut: "ngo5 soeng1 seon3 zing3 ji6.", en: "I believe in justice." }, { zh: "正義好緊要。", jyut: "zing3 ji6 hou2 gan2 jiu3.", en: "Justice is very important." } ],
  655: [ { zh: "呢個唔道德。", jyut: "ni1 go3 m4 dou6 dak1.", en: "This is not moral." }, { zh: "道德好緊要。", jyut: "dou6 dak1 hou2 gan2 jiu3.", en: "Morality is very important." } ],
  656: [ { zh: "呢個係我責任。", jyut: "ni1 go3 hai6 ngo5 zaak3 jam6.", en: "This is my responsibility." }, { zh: "你要有責任。", jyut: "nei5 jiu3 jau5 zaak3 jam6.", en: "You need to have responsibility." } ],
  657: [ { zh: "呢個係我權利。", jyut: "ni1 go3 hai6 ngo5 kyun4 lei6.", en: "This is my right." }, { zh: "人人都有權利。", jyut: "jan4 jan4 dou1 jau5 kyun4 lei6.", en: "Everyone has rights." } ],
  658: [ { zh: "呢個係我義務。", jyut: "ni1 go3 hai6 ngo5 ji6 mou6.", en: "This is my obligation." }, { zh: "教書係老師嘅義務。", jyut: "gaau3 syu1 hai6 lou5 si1 ge3 ji6 mou6.", en: "Teaching is a teacher's obligation." } ],
  659: [ { zh: "我尊重你。", jyut: "ngo5 zyun1 zung6 nei5.", en: "I respect you." }, { zh: "你要尊重佢。", jyut: "nei5 jiu3 zyun1 zung6 keoi5.", en: "You need to respect him/her." } ],
  660: [ { zh: "你要誠實。", jyut: "nei5 jiu3 sing4 sat6.", en: "You need to be honest." }, { zh: "佢好誠實。", jyut: "keoi5 hou2 sing4 sat6.", en: "He/she is very honest." } ],
  661: [ { zh: "你要有勇氣。", jyut: "nei5 jiu3 jau5 jung5 hei3.", en: "You need to have courage." }, { zh: "我冇勇氣講。", jyut: "ngo5 mou5 jung5 hei3 gong2.", en: "I don't have the courage to say it." } ],
  662: [ { zh: "你要有耐性。", jyut: "nei5 jiu3 jau5 noi6 sing3.", en: "You need to have patience." }, { zh: "我冇耐性等。", jyut: "ngo5 mou5 noi6 sing3 dang2.", en: "I don't have the patience to wait." } ],
  663: [ { zh: "你要有毅力。", jyut: "nei5 jiu3 jau5 ngai6 lik6.", en: "You need to have perseverance." }, { zh: "佢好有毅力。", jyut: "keoi5 hou2 jau5 ngai6 lik6.", en: "He/she has great perseverance." } ],
  664: [ { zh: "你態度唔好。", jyut: "nei5 taai3 dou6 m4 hou2.", en: "Your attitude is bad." }, { zh: "我鍾意佢嘅態度。", jyut: "ngo5 zung1 ji3 keoi5 ge3 taai3 dou6.", en: "I like his/her attitude." } ],
  665: [ { zh: "我哋價值觀唔同。", jyut: "ngo5 dei6 gaa3 zik6 gun1 m4 tung4.", en: "Our values are different." }, { zh: "你嘅價值觀係咩呀？", jyut: "nei5 ge3 gaa3 zik6 gun1 hai6 me1 aa3?", en: "What are your values?" } ],
  666: [ { zh: "我有我嘅信念。", jyut: "ngo5 jau5 ngo5 ge3 seon3 nim6.", en: "I have my own beliefs." }, { zh: "你嘅信念係咩呀？", jyut: "nei5 ge3 seon3 nim6 hai6 me1 aa3?", en: "What are your beliefs?" } ],
  667: [ { zh: "我有原則。", jyut: "ngo5 jau5 jyun4 zak1.", en: "I have principles." }, { zh: "呢個係我原則。", jyut: "ni1 go3 hai6 ngo5 jyun4 zak1.", en: "This is my principle." } ],
  668: [ { zh: "我有好多選擇。", jyut: "ngo5 jau5 hou2 do1 syun2 zaak6.", en: "I have a lot of choices." }, { zh: "你嘅選擇係咩呀？", jyut: "nei5 ge3 syun2 zaak6 hai6 me1 aa3?", en: "What's your choice?" } ],
  669: [ { zh: "我有個機會。", jyut: "ngo5 jau5 go3 gei1 wui6.", en: "I have an opportunity." }, { zh: "呢個機會好難得。", jyut: "ni1 go3 gei1 wui6 hou2 naan4 dak1.", en: "This opportunity is rare." } ],
  670: [ { zh: "呢個好有挑戰。", jyut: "ni1 go3 hou2 jau5 tiu1 zin3.", en: "This is very challenging." }, { zh: "我鍾意挑戰。", jyut: "ngo5 zung1 ji3 tiu1 zin3.", en: "I like challenges." } ],
  671: [ { zh: "我好大壓力。", jyut: "ngo5 hou2 daai6 aat3 lik6.", en: "I'm under a lot of pressure." }, { zh: "考試壓力好大。", jyut: "haau2 si5 aat3 lik6 hou2 daai6.", en: "Exam pressure is intense." } ],
  672: [ { zh: "我冇動力。", jyut: "ngo5 mou5 dung6 lik6.", en: "I have no motivation." }, { zh: "你嘅動力係咩呀？", jyut: "nei5 ge3 dung6 lik6 hai6 me1 aa3?", en: "What's your motivation?" } ],
  673: [ { zh: "我冇靈感。", jyut: "ngo5 mou5 ling4 gam2.", en: "I have no inspiration." }, { zh: "呢個畀我靈感。", jyut: "ni1 go3 bei2 ngo5 ling4 gam2.", en: "This gives me inspiration." } ],
  674: [ { zh: "你好有創意。", jyut: "nei5 hou2 jau5 cong3 ji3.", en: "You're very creative." }, { zh: "呢個好有創意。", jyut: "ni1 go3 hou2 jau5 cong3 ji3.", en: "This is very creative." } ],
  675: [ { zh: "我嘅理想係做老師。", jyut: "ngo5 ge3 lei5 soeng2 hai6 zou6 lou5 si1.", en: "My dream is to become a teacher." }, { zh: "你嘅理想係咩呀？", jyut: "nei5 ge3 lei5 soeng2 hai6 me1 aa3?", en: "What's your dream?" } ],
};

// ===== 501-1000: HK Culture & Food (676-700) =====
const HAND_676_700 = {
  676: [ { zh: "我哋去茶餐廳食飯。", jyut: "ngo5 dei6 heoi3 caa4 caan1 teng1 sik6 faan6.", en: "We're going to a cha chaan teng to eat." }, { zh: "呢間茶餐廳好平。", jyut: "ni1 gaan1 caa4 caan1 teng1 hou2 peng4.", en: "This cha chaan teng is cheap." } ],
  677: [ { zh: "我要一杯凍檸茶。", jyut: "ngo5 jiu3 jat1 bui1 dung3 ning2 caa4.", en: "I want an iced lemon tea." }, { zh: "凍檸茶好好飲。", jyut: "dung3 ning2 caa4 hou2 hou2 jam2.", en: "Iced lemon tea is delicious." } ],
  678: [ { zh: "我要一杯奶茶。", jyut: "ngo5 jiu3 jat1 bui1 naai5 caa4.", en: "I want a milk tea." }, { zh: "香港奶茶好好飲。", jyut: "hoeng1 gong2 naai5 caa4 hou2 hou2 jam2.", en: "Hong Kong milk tea is delicious." } ],
  679: [ { zh: "我想食菠蘿包。", jyut: "ngo5 soeng2 sik6 bo1 lo4 baau1.", en: "I want to eat a pineapple bun." }, { zh: "呢個菠蘿包好好食。", jyut: "ni1 go3 bo1 lo4 baau1 hou2 hou2 sik6.", en: "This pineapple bun is delicious." } ],
  680: [ { zh: "我想食雞蛋仔。", jyut: "ngo5 soeng2 sik6 gai1 daan2 zai2.", en: "I want to eat an egg waffle." }, { zh: "雞蛋仔好好食。", jyut: "gai1 daan2 zai2 hou2 hou2 sik6.", en: "Egg waffles are delicious." } ],
  681: [ { zh: "我想食燒賣。", jyut: "ngo5 soeng2 sik6 siu1 maai2.", en: "I want to eat siu mai." }, { zh: "燒賣好好食。", jyut: "siu1 maai2 hou2 hou2 sik6.", en: "Siu mai is delicious." } ],
  682: [ { zh: "我想食叉燒。", jyut: "ngo5 soeng2 sik6 caa1 siu1.", en: "I want to eat char siu." }, { zh: "叉燒好好食。", jyut: "caa1 siu1 hou2 hou2 sik6.", en: "Char siu is delicious." } ],
  683: [ { zh: "我想食燒臘。", jyut: "ngo5 soeng2 sik6 siu1 laap6.", en: "I want to eat roasted meats." }, { zh: "燒臘飯好好食。", jyut: "siu1 laap6 faan6 hou2 hou2 sik6.", en: "Roasted meat rice is delicious." } ],
  684: [ { zh: "我哋去飲茶食點心。", jyut: "ngo5 dei6 heoi3 jam2 caa4 sik6 dim2 sam1.", en: "We're going to yum cha for dim sum." }, { zh: "點心好好食。", jyut: "dim2 sam1 hou2 hou2 sik6.", en: "Dim sum is delicious." } ],
  685: [ { zh: "我想食煲仔飯。", jyut: "ngo5 soeng2 sik6 bou1 zai2 faan6.", en: "I want to eat clay pot rice." }, { zh: "煲仔飯好熱。", jyut: "bou1 zai2 faan6 hou2 jit6.", en: "Clay pot rice is very hot." } ],
  686: [ { zh: "我哋去打邊爐。", jyut: "ngo5 dei6 heoi3 daa2 bin1 lou4.", en: "We're going for hot pot." }, { zh: "凍天打邊爐好好。", jyut: "dung3 tin1 daa2 bin1 lou4 hou2 hou2.", en: "Hot pot is great in cold weather." } ],
  687: [ { zh: "我哋去大排檔食飯。", jyut: "ngo5 dei6 heoi3 daai6 paai4 dong3 sik6 faan6.", en: "We're going to a food stall to eat." }, { zh: "大排檔好平。", jyut: "daai6 paai4 dong3 hou2 peng4.", en: "Food stalls are cheap." } ],
  688: [ { zh: "我哋去夜市。", jyut: "ngo5 dei6 heoi3 je6 si5.", en: "We're going to the night market." }, { zh: "夜市好多人。", jyut: "je6 si5 hou2 do1 jan4.", en: "The night market is crowded." } ],
  689: [ { zh: "我哋去廟街。", jyut: "ngo5 dei6 heoi3 miu6 gaai1.", en: "We're going to Temple Street." }, { zh: "廟街夜晚好多人。", jyut: "miu6 gaai1 je6 maan5 hou2 do1 jan4.", en: "Temple Street is crowded at night." } ],
  690: [ { zh: "我哋去維港睇嘢。", jyut: "ngo5 dei6 heoi3 wai4 gong2 tai2 je5.", en: "We're going to Victoria Harbour to sightsee." }, { zh: "維港好靚。", jyut: "wai4 gong2 hou2 leng3.", en: "Victoria Harbour is beautiful." } ],
  691: [ { zh: "我哋坐叮叮車。", jyut: "ngo5 dei6 co5 ding1 ding1 ce1.", en: "We're taking the tram." }, { zh: "叮叮車好慢。", jyut: "ding1 ding1 ce1 hou2 maan6.", en: "The tram is slow." } ],
  692: [ { zh: "我哋坐小巴。", jyut: "ngo5 dei6 co5 siu2 baa1.", en: "We're taking the minibus." }, { zh: "小巴好快。", jyut: "siu2 baa1 hou2 faai3.", en: "The minibus is fast." } ],
  693: [ { zh: "我去士多買嘢。", jyut: "ngo5 heoi3 si6 do1 maai5 je5.", en: "I'm going to the grocery store to buy things." }, { zh: "士多喺樓下。", jyut: "si6 do1 hai2 lau4 haa6.", en: "The grocery store is downstairs." } ],
  694: [ { zh: "我去便利店買嘢。", jyut: "ngo5 heoi3 bin6 lei6 dim3 maai5 je5.", en: "I'm going to the convenience store." }, { zh: "便利店成日開。", jyut: "bin6 lei6 dim3 sing4 jat6 hoi1.", en: "The convenience store is always open." } ],
  695: [ { zh: "我想飲涼茶。", jyut: "ngo5 soeng2 jam2 loeng4 caa4.", en: "I want to drink herbal tea." }, { zh: "涼茶對身體好。", jyut: "loeng4 caa4 deoi3 san1 tai2 hou2.", en: "Herbal tea is good for your body." } ],
  696: [ { zh: "我想食糖水。", jyut: "ngo5 soeng2 sik6 tong4 seoi2.", en: "I want to eat sweet soup dessert." }, { zh: "糖水好好食。", jyut: "tong4 seoi2 hou2 hou2 sik6.", en: "Sweet soup dessert is delicious." } ],
  697: [ { zh: "我想食車仔麵。", jyut: "ngo5 soeng2 sik6 ce1 zai2 min6.", en: "I want to eat cart noodles." }, { zh: "車仔麵可以自己揀嘢。", jyut: "ce1 zai2 min6 ho2 ji5 zi6 gei2 gaan2 je5.", en: "With cart noodles you can choose your own ingredients." } ],
  698: [ { zh: "呢間係老字號。", jyut: "ni1 gaan1 hai6 lou5 zi6 hou6.", en: "This is a long-established shop." }, { zh: "老字號嘢食好好食。", jyut: "lou5 zi6 hou6 je5 sik6 hou2 hou2 sik6.", en: "Long-established shops have delicious food." } ],
  699: [ { zh: "佢係我街坊。", jyut: "keoi5 hai6 ngo5 gaai1 fong1.", en: "He/she is my neighbour." }, { zh: "街坊都好好人。", jyut: "gaai1 fong1 dou1 hou2 hou2 jan4.", en: "The neighbours are all very nice." } ],
  700: [ { zh: "呢個好地道。", jyut: "ni1 go3 hou2 dei6 dou6.", en: "This is very authentic." }, { zh: "呢度嘅嘢食好地道。", jyut: "ni1 dou6 ge3 je5 sik6 hou2 dei6 dou6.", en: "The food here is very authentic." } ],
};

const VERB_TEMPLATES = [
  { zh: "我而家想{w}。", jyut: "ngo5 ji4 gaa1 soeng2 {wj}.", en: "I want to {we} now." },
  { zh: "你可唔可以{w}呀？", jyut: "nei5 ho2 m4 ho2 ji5 {wj} aa3?", en: "Can you {we}?" },
  { zh: "佢鍾意{w}。", jyut: "keoi5 zung1 ji3 {wj}.", en: "He/she likes to {we}." },
  { zh: "我哋今日要{w}。", jyut: "ngo5 dei6 gam1 jat6 jiu3 {wj}.", en: "We need to {we} today." },
];

const ADJ_TEMPLATES = [
  { zh: "呢個好{w}。", jyut: "ni1 go3 hou2 {wj}.", en: "This is very {we}." },
  { zh: "你哋都話佢好{w}。", jyut: "nei5 dei6 dou1 waa6 keoi5 hou2 {wj}.", en: "You all say he/she is very {we}." },
  { zh: "點解你咁{w}呀？", jyut: "dim2 gaai2 nei5 gam3 {wj} aa3?", en: "Why are you so {we}?" },
  { zh: "我唔想咁{w}。", jyut: "ngo5 m4 soeng2 gam3 {wj}.", en: "I don't want to be so {we}." },
];

const NOUN_TEMPLATES = [
  { zh: "我有一個{w}。", jyut: "ngo5 jau5 jat1 go3 {wj}.", en: "I have a {we}." },
  { zh: "呢度有好多{w}。", jyut: "ni1 dou6 jau5 hou2 do1 {wj}.", en: "There are a lot of {we} here." },
  { zh: "我鍾意{w}。", jyut: "ngo5 zung1 ji3 {wj}.", en: "I like {we}." },
];

const PLACE_TEMPLATES = [
  { zh: "你今日去咗{w}呀？", jyut: "nei5 gam1 jat6 heoi3 zo2 {wj} aa3?", en: "Did you go to {we} today?" },
  { zh: "我哋聽日去{w}。", jyut: "ngo5 dei6 ting1 jat6 heoi3 {wj}.", en: "We're going to {we} tomorrow." },
  { zh: "我唔知{w}喺邊度。", jyut: "ngo5 m4 zi1 {wj} hai2 bin1 dou6.", en: "I don't know where the {we} is." },
];

const BANKS = { verb: VERB_TEMPLATES, adj: ADJ_TEMPLATES, noun: NOUN_TEMPLATES, place: PLACE_TEMPLATES };

// A handful of words don't fit their pos's default (id % length) template
// pick — e.g. impersonal weather verbs can't be "wanted" or "needed" the way
// most verbs can. Force a better-fitting template index for those.
const FORCED_TEMPLATE = {
  251: 2, // 落雨 -> "佢鍾意落雨" (he/she likes rain) reads far more naturally
  259: 2, // 落雪 -> same fix for snow
};

// Hand-written sentence pairs for the words a template can't do justice to:
// personal pronouns, question words, demonstratives, and numbers. These are
// the very first words a learner sees, so they get real, checked sentences
// instead of a generic frame. Each entry is [sentence1, sentence2].
const HAND_SENTENCES = {
  1: [ // 我 I / me
    { zh: "我鍾意食嘢。", jyut: "ngo5 zung1 ji3 sik6 je5.", en: "I like eating." },
    { zh: "我而家好肚餓。", jyut: "ngo5 ji4 gaa1 hou2 tou5 ngo6.", en: "I'm very hungry right now." },
  ],
  2: [ // 你 you
    { zh: "你想去邊度呀？", jyut: "nei5 soeng2 heoi3 bin1 dou6 aa3?", en: "Where do you want to go?" },
    { zh: "你係咪好攰呀？", jyut: "nei5 hai6 mai6 hou2 gui6 aa3?", en: "Are you very tired?" },
  ],
  3: [ // 佢 he / she / it
    { zh: "佢係我朋友。", jyut: "keoi5 hai6 ngo5 pang4 jau5.", en: "He/she is my friend." },
    { zh: "佢鍾意飲茶。", jyut: "keoi5 zung1 ji3 jam2 caa4.", en: "He/she likes drinking tea." },
  ],
  4: [ // 我哋 we / us
    { zh: "我哋一齊食飯啦。", jyut: "ngo5 dei6 jat1 cai4 sik6 faan6 laa1.", en: "Let's eat together." },
    { zh: "我哋聽日去香港。", jyut: "ngo5 dei6 ting1 jat6 heoi3 hoeng1 gong2.", en: "We're going to Hong Kong tomorrow." },
  ],
  5: [ // 你哋 you (plural)
    { zh: "你哋想食咩呀？", jyut: "nei5 dei6 soeng2 sik6 me1 aa3?", en: "What do you all want to eat?" },
    { zh: "你哋都係學生呀？", jyut: "nei5 dei6 dou1 hai6 hok6 saang1 aa3?", en: "Are you all students?" },
  ],
  6: [ // 佢哋 they / them
    { zh: "佢哋係我嘅同事。", jyut: "keoi5 dei6 hai6 ngo5 ge3 tung4 si6.", en: "They are my colleagues." },
    { zh: "佢哋而家喺屋企。", jyut: "keoi5 dei6 ji4 gaa1 hai2 uk1 kei2.", en: "They're at home right now." },
  ],
  20: [ // 自己 oneself
    { zh: "我自己一個人去。", jyut: "ngo5 zi6 gei2 jat1 go3 jan4 heoi3.", en: "I'm going by myself." },
    { zh: "佢自己一個喺屋企。", jyut: "keoi5 zi6 gei2 jat1 go3 hai2 uk1 kei2.", en: "He/she is at home by himself/herself." },
  ],
  7: [ // 咩 what (particle)
    { zh: "你想食咩呀？", jyut: "nei5 soeng2 sik6 me1 aa3?", en: "What do you want to eat?" },
    { zh: "呢個係咩呀？", jyut: "ni1 go3 hai6 me1 aa3?", en: "What is this?" },
  ],
  8: [ // 乜嘢 what (thing)
    { zh: "你想要乜嘢呀？", jyut: "nei5 soeng2 jiu3 mat1 je5 aa3?", en: "What do you want?" },
    { zh: "呢度有乜嘢好食呀？", jyut: "ni1 dou6 jau5 mat1 je5 hou2 sik6 aa3?", en: "What's good to eat here?" },
  ],
  9: [ // 邊個 who
    { zh: "邊個係你朋友呀？", jyut: "bin1 go3 hai6 nei5 pang4 jau5 aa3?", en: "Who is your friend?" },
    { zh: "呢個係邊個呀？", jyut: "ni1 go3 hai6 bin1 go3 aa3?", en: "Who is this?" },
  ],
  10: [ // 邊度 where
    { zh: "你屋企喺邊度呀？", jyut: "nei5 uk1 kei2 hai2 bin1 dou6 aa3?", en: "Where is your home?" },
    { zh: "你聽日想去邊度呀？", jyut: "nei5 ting1 jat6 soeng2 heoi3 bin1 dou6 aa3?", en: "Where do you want to go tomorrow?" },
  ],
  11: [ // 幾時 when
    { zh: "你幾時返嚟呀？", jyut: "nei5 gei2 si4 faan1 lai4 aa3?", en: "When are you coming back?" },
    { zh: "我哋幾時去食飯呀？", jyut: "ngo5 dei6 gei2 si4 heoi3 sik6 faan6 aa3?", en: "When are we going to eat?" },
  ],
  12: [ // 點解 why
    { zh: "你點解唔開心呀？", jyut: "nei5 dim2 gaai2 m4 hoi1 sam1 aa3?", en: "Why are you unhappy?" },
    { zh: "佢點解唔嚟呀？", jyut: "keoi5 dim2 gaai2 m4 lai4 aa3?", en: "Why isn't he/she coming?" },
  ],
  13: [ // 點樣 how
    { zh: "呢個點樣用呀？", jyut: "ni1 go3 dim2 joeng2 jung6 aa3?", en: "How do you use this?" },
    { zh: "你今日點樣呀？", jyut: "nei5 gam1 jat6 dim2 joeng2 aa3?", en: "How are you today?" },
  ],
  14: [ // 幾多 how many / how much
    { zh: "呢個幾多錢呀？", jyut: "ni1 go3 gei2 do1 cin2 aa3?", en: "How much is this?" },
    { zh: "你有幾多本書呀？", jyut: "nei5 jau5 gei2 do1 bun2 syu1 aa3?", en: "How many books do you have?" },
  ],
  15: [ // 呢個 this
    { zh: "我鍾意呢個。", jyut: "ngo5 zung1 ji3 ni1 go3.", en: "I like this one." },
    { zh: "呢個幾多錢呀？", jyut: "ni1 go3 gei2 do1 cin2 aa3?", en: "How much is this one?" },
  ],
  16: [ // 嗰個 that
    { zh: "嗰個係咩嚟㗎？", jyut: "go2 go3 hai6 me1 lei4 gaa3?", en: "What is that?" },
    { zh: "我想要嗰個。", jyut: "ngo5 soeng2 jiu3 go2 go3.", en: "I want that one." },
  ],
  17: [ // 呢度 here
    { zh: "我而家喺呢度。", jyut: "ngo5 ji4 gaa1 hai2 ni1 dou6.", en: "I'm here right now." },
    { zh: "呢度好靚。", jyut: "ni1 dou6 hou2 leng3.", en: "This place is very nice." },
  ],
  18: [ // 嗰度 there
    { zh: "佢而家喺嗰度。", jyut: "keoi5 ji4 gaa1 hai2 go2 dou6.", en: "He/she is over there right now." },
    { zh: "我哋聽日去嗰度。", jyut: "ngo5 dei6 ting1 jat6 heoi3 go2 dou6.", en: "We're going there tomorrow." },
  ],
  21: [ // 零 zero
    { zh: "而家零度，好凍。", jyut: "ji4 gaa1 ling4 dou6, hou2 dung3.", en: "It's zero degrees right now, very cold." },
    { zh: "呢個電話號碼有個零。", jyut: "ni1 go3 din6 waa2 hou6 maa5 jau5 go3 ling4.", en: "This phone number has a zero in it." },
  ],
  22: [ // 一 one
    { zh: "我有一蚊。", jyut: "ngo5 jau5 jat1 man1.", en: "I have one dollar." },
    { zh: "我要一杯茶。", jyut: "ngo5 jiu3 jat1 bui1 caa4.", en: "I want one cup of tea." },
  ],
  23: [ // 二 two
    { zh: "呢度係二號房。", jyut: "ni1 dou6 hai6 ji6 hou6 fong2.", en: "This is room number two." },
    { zh: "我住二樓。", jyut: "ngo5 zyu6 ji6 lau4.", en: "I live on the second floor." },
  ],
  24: [ // 三 three
    { zh: "而家三點。", jyut: "ji4 gaa1 saam1 dim2.", en: "It's three o'clock now." },
    { zh: "我要三張紙。", jyut: "ngo5 jiu3 saam1 zoeng1 zi2.", en: "I need three sheets of paper." },
  ],
  25: [ // 四 four
    { zh: "而家四點。", jyut: "ji4 gaa1 sei3 dim2.", en: "It's four o'clock now." },
    { zh: "我屋企有四個人。", jyut: "ngo5 uk1 kei2 jau5 sei3 go3 jan4.", en: "There are four people in my family." },
  ],
  26: [ // 五 five
    { zh: "而家五點。", jyut: "ji4 gaa1 ng5 dim2.", en: "It's five o'clock now." },
    { zh: "我要五蚊。", jyut: "ngo5 jiu3 ng5 man1.", en: "I need five dollars." },
  ],
  27: [ // 六 six
    { zh: "而家六點。", jyut: "ji4 gaa1 luk6 dim2.", en: "It's six o'clock now." },
    { zh: "佢有六本書。", jyut: "keoi5 jau5 luk6 bun2 syu1.", en: "He/she has six books." },
  ],
  28: [ // 七 seven
    { zh: "而家七點。", jyut: "ji4 gaa1 cat1 dim2.", en: "It's seven o'clock now." },
    { zh: "一個星期有七日。", jyut: "jat1 go3 sing1 kei4 jau5 cat1 jat6.", en: "A week has seven days." },
  ],
  29: [ // 八 eight
    { zh: "而家八點。", jyut: "ji4 gaa1 baat3 dim2.", en: "It's eight o'clock now." },
    { zh: "我有八蚊。", jyut: "ngo5 jau5 baat3 man1.", en: "I have eight dollars." },
  ],
  30: [ // 九 nine
    { zh: "而家九點。", jyut: "ji4 gaa1 gau2 dim2.", en: "It's nine o'clock now." },
    { zh: "佢住九樓。", jyut: "keoi5 zyu6 gau2 lau4.", en: "He/she lives on the ninth floor." },
  ],
  31: [ // 十 ten
    { zh: "而家十點。", jyut: "ji4 gaa1 sap6 dim2.", en: "It's ten o'clock now." },
    { zh: "我有十蚊。", jyut: "ngo5 jau5 sap6 man1.", en: "I have ten dollars." },
  ],
  32: [ // 百 hundred
    { zh: "我有一百蚊。", jyut: "ngo5 jau5 jat1 baak3 man1.", en: "I have one hundred dollars." },
    { zh: "呢個要三百蚊。", jyut: "ni1 go3 jiu3 saam1 baak3 man1.", en: "This costs three hundred dollars." },
  ],
  33: [ // 千 thousand
    { zh: "我有一千蚊。", jyut: "ngo5 jau5 jat1 cin1 man1.", en: "I have one thousand dollars." },
    { zh: "呢個要兩千蚊。", jyut: "ni1 go3 jiu3 loeng5 cin1 man1.", en: "This costs two thousand dollars." },
  ],
  34: [ // 萬 ten-thousand
    { zh: "我有一萬蚊。", jyut: "ngo5 jau5 jat1 maan6 man1.", en: "I have ten thousand dollars." },
    { zh: "呢架車要十萬蚊。", jyut: "ni1 gaa3 ce1 jiu3 sap6 maan6 man1.", en: "This car costs one hundred thousand dollars." },
  ],
  35: [ // 兩 two (with measure word)
    { zh: "我有兩蚊。", jyut: "ngo5 jau5 loeng5 man1.", en: "I have two dollars." },
    { zh: "佢有兩個仔。", jyut: "keoi5 jau5 loeng5 go3 zai2.", en: "He/she has two sons." },
  ],
  // The next few are modal-ish verbs that collide with the template frames
  // themselves (e.g. "我而家想要" -> "I want to want") — hand-written instead.
  48: [ // 要 to want / to need
    { zh: "我要一杯水。", jyut: "ngo5 jiu3 jat1 bui1 seoi2.", en: "I want a cup of water." },
    { zh: "你要幾多呀？", jyut: "nei5 jiu3 gei2 do1 aa3?", en: "How much do you want?" },
  ],
  49: [ // 想 to want to
    { zh: "我想去香港。", jyut: "ngo5 soeng2 heoi3 hoeng1 gong2.", en: "I want to go to Hong Kong." },
    { zh: "你想食咩呀？", jyut: "nei5 soeng2 sik6 me1 aa3?", en: "What do you want to eat?" },
  ],
  50: [ // 可以 can / may
    { zh: "我可以幫你。", jyut: "ngo5 ho2 ji5 bong1 nei5.", en: "I can help you." },
    { zh: "呢度可以食嘢呀？", jyut: "ni1 dou6 ho2 ji5 sik6 je5 aa3?", en: "Can you eat here?" },
  ],
  53: [ // 鍾意 to like
    { zh: "我鍾意你。", jyut: "ngo5 zung1 ji3 nei5.", en: "I like you." },
    { zh: "佢鍾意呢度。", jyut: "keoi5 zung1 ji3 ni1 dou6.", en: "He/she likes this place." },
  ],
  362: [ // 需要 to need
    { zh: "你需要休息。", jyut: "nei5 seoi1 jiu3 jau1 sik1.", en: "You need to rest." },
    { zh: "我唔需要咁多。", jyut: "ngo5 m4 seoi1 jiu3 gam3 do1.", en: "I don't need that much." },
  ],
  363: [ // 希望 to hope
    { zh: "我希望你開心。", jyut: "ngo5 hei1 mong6 nei5 hoi1 sam1.", en: "I hope you're happy." },
    { zh: "我希望聽日天晴。", jyut: "ngo5 hei1 mong6 ting1 jat6 tin1 cing4.", en: "I hope it's sunny tomorrow." },
  ],

  // ===== Top 200: Core Verbs (36-90, minus 48/49/50/53 above) =====
  36: [ { zh: "我係香港人。", jyut: "ngo5 hai6 hoeng1 gong2 jan4.", en: "I am a Hong Kong person." }, { zh: "佢係我老師。", jyut: "keoi5 hai6 ngo5 lou5 si1.", en: "He/she is my teacher." } ],
  37: [ { zh: "我有一隻貓。", jyut: "ngo5 jau5 jat1 zek3 maau1.", en: "I have a cat." }, { zh: "佢有好多朋友。", jyut: "keoi5 jau5 hou2 do1 pang4 jau5.", en: "He/she has a lot of friends." } ],
  38: [ { zh: "我冇錢。", jyut: "ngo5 mou5 cin2.", en: "I don't have money." }, { zh: "佢冇朋友。", jyut: "keoi5 mou5 pang4 jau5.", en: "He/she has no friends." } ],
  39: [ { zh: "我哋而家去街市。", jyut: "ngo5 dei6 ji4 gaa1 heoi3 gaai1 si5.", en: "We're going to the market now." }, { zh: "佢去咗學校。", jyut: "keoi5 heoi3 zo2 hok6 haau6.", en: "He/she went to school." } ],
  40: [ { zh: "你幾時嚟呀？", jyut: "nei5 gei2 si4 lai4 aa3?", en: "When are you coming?" }, { zh: "佢聽日嚟我屋企。", jyut: "keoi5 ting1 jat6 lai4 ngo5 uk1 kei2.", en: "He/she is coming to my home tomorrow." } ],
  41: [ { zh: "我而家想食嘢。", jyut: "ngo5 ji4 gaa1 soeng2 sik6 je5.", en: "I want to eat now." }, { zh: "佢鍾意食麵。", jyut: "keoi5 zung1 ji3 sik6 min6.", en: "He/she likes to eat noodles." } ],
  42: [ { zh: "我想飲水。", jyut: "ngo5 soeng2 jam2 seoi2.", en: "I want to drink water." }, { zh: "佢鍾意飲茶。", jyut: "keoi5 zung1 ji3 jam2 caa4.", en: "He/she likes drinking tea." } ],
  43: [ { zh: "我想睇電視。", jyut: "ngo5 soeng2 tai2 din6 si6.", en: "I want to watch TV." }, { zh: "你睇緊乜嘢呀？", jyut: "nei5 tai2 gan2 mat1 je5 aa3?", en: "What are you watching?" } ],
  44: [ { zh: "我鍾意聽歌。", jyut: "ngo5 zung1 ji3 teng1 go1.", en: "I like listening to songs." }, { zh: "你聽唔聽到呀？", jyut: "nei5 teng1 m4 teng1 dou2 aa3?", en: "Can you hear it?" } ],
  45: [ { zh: "我想講廣東話。", jyut: "ngo5 soeng2 gong2 gwong2 dung1 waa2.", en: "I want to speak Cantonese." }, { zh: "你可唔可以講慢啲呀？", jyut: "nei5 ho2 m4 ho2 ji5 gong2 maan6 di1 aa3?", en: "Can you speak more slowly?" } ],
  46: [ { zh: "你話咩呀？", jyut: "nei5 waa6 me1 aa3?", en: "What did you say?" }, { zh: "佢話佢好肚餓。", jyut: "keoi5 waa6 keoi5 hou2 tou5 ngo6.", en: "He/she said he/she is very hungry." } ],
  47: [ { zh: "我而家做緊功課。", jyut: "ngo5 ji4 gaa1 zou6 gan2 gung1 fo3.", en: "I'm doing homework right now." }, { zh: "你做緊乜嘢呀？", jyut: "nei5 zou6 gan2 mat1 je5 aa3?", en: "What are you doing?" } ],
  51: [ { zh: "我唔知呀。", jyut: "ngo5 m4 zi1 aa3.", en: "I don't know." }, { zh: "你知唔知幾多錢呀？", jyut: "nei5 zi1 m4 zi1 gei2 do1 cin2 aa3?", en: "Do you know how much it costs?" } ],
  52: [ { zh: "我識講廣東話。", jyut: "ngo5 sik1 gong2 gwong2 dung1 waa2.", en: "I know how to speak Cantonese." }, { zh: "你識唔識游水呀？", jyut: "nei5 sik1 m4 sik1 jau4 seoi2 aa3?", en: "Do you know how to swim?" } ],
  54: [ { zh: "我愛你。", jyut: "ngo5 oi3 nei5.", en: "I love you." }, { zh: "佢愛佢嘅屋企人。", jyut: "keoi5 oi3 keoi5 ge3 uk1 kei2 jan4.", en: "He/she loves his/her family." } ],
  55: [ { zh: "我想買嘢。", jyut: "ngo5 soeng2 maai5 je5.", en: "I want to buy something." }, { zh: "我去街市買菜。", jyut: "ngo5 heoi3 gaai1 si5 maai5 coi3.", en: "I'm going to the market to buy vegetables." } ],
  56: [ { zh: "呢間舖頭賣咩呀？", jyut: "ni1 gaan1 pou3 tau2 maai6 me1 aa3?", en: "What does this shop sell?" }, { zh: "佢賣咗架車。", jyut: "keoi5 maai6 zo2 gaa3 ce1.", en: "He/she sold the car." } ],
  57: [ { zh: "唔該畀杯水我。", jyut: "m4 goi1 bei2 bui1 seoi2 ngo5.", en: "Please give me a cup of water." }, { zh: "佢畀咗錢我。", jyut: "keoi5 bei2 zo2 cin2 ngo5.", en: "He/she gave me money." } ],
  58: [ { zh: "唔該幫我攞張紙。", jyut: "m4 goi1 bong1 ngo5 lo2 zoeng1 zi2.", en: "Please help me get a sheet of paper." }, { zh: "佢攞咗我本書。", jyut: "keoi5 lo2 zo2 ngo5 bun2 syu1.", en: "He/she took my book." } ],
  59: [ { zh: "唔該幫我開門。", jyut: "m4 goi1 bong1 ngo5 hoi1 mun4.", en: "Please help me open the door." }, { zh: "間舖幾點開呀？", jyut: "gaan1 pou3 gei2 dim2 hoi1 aa3?", en: "What time does the shop open?" } ],
  60: [ { zh: "唔該閂門。", jyut: "m4 goi1 saan1 mun4.", en: "Please close the door." }, { zh: "你閂咗窗未呀？", jyut: "nei5 saan1 zo2 coeng1 mei6 aa3?", en: "Have you closed the window yet?" } ],
  61: [ { zh: "唔該坐呢度。", jyut: "m4 goi1 co5 ni1 dou6.", en: "Please sit here." }, { zh: "我哋坐巴士去。", jyut: "ngo5 dei6 co5 baa1 si2 heoi3.", en: "We're going by bus." } ],
  62: [ { zh: "唔該企呢度。", jyut: "m4 goi1 kei5 ni1 dou6.", en: "Please stand here." }, { zh: "佢企咗好耐。", jyut: "keoi5 kei5 zo2 hou2 noi6.", en: "He/she has been standing for a long time." } ],
  63: [ { zh: "我想瞓覺。", jyut: "ngo5 soeng2 fan3 gaau3.", en: "I want to sleep." }, { zh: "你幾點瞓呀？", jyut: "nei5 gei2 dim2 fan3 aa3?", en: "What time do you go to sleep?" } ],
  64: [ { zh: "我哋行路去。", jyut: "ngo5 dei6 haang4 lou6 heoi3.", en: "We're walking there." }, { zh: "我哋去行山。", jyut: "ngo5 dei6 heoi3 haang4 saan1.", en: "We're going hiking." } ],
  65: [ { zh: "我而家要走喇。", jyut: "ngo5 ji4 gaa1 jiu3 zau2 laa3.", en: "I need to go now." }, { zh: "佢走得好快。", jyut: "keoi5 zau2 dak1 hou2 faai3.", en: "He/she runs very fast." } ],
  66: [ { zh: "我要返屋企。", jyut: "ngo5 jiu3 faan1 uk1 kei2.", en: "I need to go home." }, { zh: "你幾點返學呀？", jyut: "nei5 gei2 dim2 faan1 hok6 aa3?", en: "What time do you go to school?" } ],
  67: [ { zh: "我到咗喇。", jyut: "ngo5 dou3 zo2 laa3.", en: "I've arrived." }, { zh: "幾時先至到呀？", jyut: "gei2 si4 sin1 zi3 dou3 aa3?", en: "When will we arrive?" } ],
  68: [ { zh: "我諗緊嘢。", jyut: "ngo5 nam2 gan2 je5.", en: "I'm thinking about something." }, { zh: "我諗住去香港。", jyut: "ngo5 nam2 zyu6 heoi3 hoeng1 gong2.", en: "I'm planning to go to Hong Kong." } ],
  69: [ { zh: "我記得你。", jyut: "ngo5 gei3 dak1 nei5.", en: "I remember you." }, { zh: "你記得帶銀包未呀？", jyut: "nei5 gei3 dak1 daai3 ngan4 baau1 mei6 aa3?", en: "Do you remember to bring your wallet?" } ],
  70: [ { zh: "我唔記得咗。", jyut: "ngo5 m4 gei3 dak1 zo2.", en: "I forgot." }, { zh: "佢成日唔記得嘢。", jyut: "keoi5 sing4 jat6 m4 gei3 dak1 je5.", en: "He/she always forgets things." } ],
  71: [ { zh: "唔該幫我。", jyut: "m4 goi1 bong1 ngo5.", en: "Please help me." }, { zh: "我可以幫你手。", jyut: "ngo5 ho2 ji5 bong1 nei5 sau2.", en: "I can help you out." } ],
  72: [ { zh: "唔該等我。", jyut: "m4 goi1 dang2 ngo5.", en: "Please wait for me." }, { zh: "你等咗好耐未呀？", jyut: "nei5 dang2 zo2 hou2 noi6 mei6 aa3?", en: "Have you been waiting long?" } ],
  73: [ { zh: "我搵緊嘢。", jyut: "ngo5 wan2 gan2 je5.", en: "I'm looking for something." }, { zh: "我搵唔到銀包。", jyut: "ngo5 wan2 m4 dou2 ngan4 baau1.", en: "I can't find my wallet." } ],
  74: [ { zh: "聽日見。", jyut: "ting1 jat6 gin3.", en: "See you tomorrow." }, { zh: "我想見我朋友。", jyut: "ngo5 soeng2 gin3 ngo5 pang4 jau5.", en: "I want to see my friend." } ],
  75: [ { zh: "佢教我廣東話。", jyut: "keoi5 gaau3 ngo5 gwong2 dung1 waa2.", en: "He/she teaches me Cantonese." }, { zh: "邊個教你嘅呀？", jyut: "bin1 go3 gaau3 nei5 ge3 aa3?", en: "Who taught you?" } ],
  76: [ { zh: "我想學廣東話。", jyut: "ngo5 soeng2 hok6 gwong2 dung1 waa2.", en: "I want to learn Cantonese." }, { zh: "我喺學校學嘢。", jyut: "ngo5 hai2 hok6 haau6 hok6 je5.", en: "I learn things at school." } ],
  77: [ { zh: "我想寫字。", jyut: "ngo5 soeng2 se2 zi6.", en: "I want to write characters." }, { zh: "你識唔識寫廣東話呀？", jyut: "nei5 sik1 m4 sik1 se2 gwong2 dung1 waa2 aa3?", en: "Do you know how to write Cantonese?" } ],
  78: [ { zh: "我鍾意讀書。", jyut: "ngo5 zung1 ji3 duk6 syu1.", en: "I like reading books." }, { zh: "你讀緊邊間學校呀？", jyut: "nei5 duk6 gan2 bin1 gaan1 hok6 haau6 aa3?", en: "Which school do you study at?" } ],
  79: [ { zh: "我鍾意唱歌。", jyut: "ngo5 zung1 ji3 coeng3 go1.", en: "I like singing." }, { zh: "佢唱歌唱得好好。", jyut: "keoi5 coeng3 go1 coeng3 dak1 hou2 hou2.", en: "He/she sings very well." } ],
  80: [ { zh: "我想同你玩。", jyut: "ngo5 soeng2 tung4 nei5 waan2.", en: "I want to play with you." }, { zh: "我哋聽日一齊玩。", jyut: "ngo5 dei6 ting1 jat6 jat1 cai4 waan2.", en: "We're playing together tomorrow." } ],
  81: [ { zh: "我鍾意打波。", jyut: "ngo5 zung1 ji3 daa2 bo1.", en: "I like playing ball sports." }, { zh: "唔該打電話畀我。", jyut: "m4 goi1 daa2 din6 waa2 bei2 ngo5.", en: "Please call me." } ],
  82: [ { zh: "我可以用你個電話呀？", jyut: "ngo5 ho2 ji5 jung6 nei5 go3 din6 waa2 aa3?", en: "Can I use your phone?" }, { zh: "呢個點樣用呀？", jyut: "ni1 go3 dim2 joeng2 jung6 aa3?", en: "How do you use this?" } ],
  83: [ { zh: "我要帶書返學校。", jyut: "ngo5 jiu3 daai3 syu1 faan1 hok6 haau6.", en: "I need to bring books to school." }, { zh: "佢帶咗個仔嚟。", jyut: "keoi5 daai3 zo2 go3 zai2 lai4.", en: "He/she brought their son along." } ],
  84: [ { zh: "唔該放喺呢度。", jyut: "m4 goi1 fong3 hai2 ni1 dou6.", en: "Please put it here." }, { zh: "我哋聽日放假。", jyut: "ngo5 dei6 ting1 jat6 fong3 gaa3.", en: "We're off tomorrow." } ],
  85: [ { zh: "我着緊件新衫。", jyut: "ngo5 zoek3 gan2 gin6 san1 saam1.", en: "I'm wearing a new shirt." }, { zh: "你今日着咗對新鞋。", jyut: "nei5 gam1 jat6 zoek3 zo2 deoi3 san1 haai4.", en: "You're wearing new shoes today." } ],
  86: [ { zh: "佢喺邊度出生㗎？", jyut: "keoi5 hai2 bin1 dou6 ceot1 sang1 gaa3?", en: "Where was he/she born?" }, { zh: "呢條魚仲生嘅。", jyut: "ni1 tiu4 jyu2 zung6 sang1 ge3.", en: "This fish is still raw." } ],
  87: [ { zh: "隻狗死咗。", jyut: "zek3 gau2 sei2 zo2.", en: "The dog died." }, { zh: "我攰到死。", jyut: "ngo5 gui6 dou3 sei2.", en: "I'm dead tired." } ],
  88: [ { zh: "我病咗。", jyut: "ngo5 beng6 zo2.", en: "I'm sick." }, { zh: "佢病咗要睇醫生。", jyut: "keoi5 beng6 zo2 jiu3 tai2 ji1 sang1.", en: "He/she is sick and needs to see a doctor." } ],
  89: [ { zh: "你做咩喊呀？", jyut: "nei5 zou6 me1 haam3 aa3?", en: "Why are you crying?" }, { zh: "佢傷心到喊。", jyut: "keoi5 soeng1 sam1 dou3 haam3.", en: "He/she is so sad he/she is crying." } ],
  90: [ { zh: "佢好鍾意笑。", jyut: "keoi5 hou2 zung1 ji3 siu3.", en: "He/she loves to laugh." }, { zh: "你做咩笑呀？", jyut: "nei5 zou6 me1 siu3 aa3?", en: "Why are you laughing?" } ],

  // ===== Top 200: Modal Words & Connectors (91-110) — previously skipped
  // entirely; two-clause sentences make these teachable after all. =====
  91: [ { zh: "我唔去。", jyut: "ngo5 m4 heoi3.", en: "I'm not going." }, { zh: "佢唔係香港人。", jyut: "keoi5 m4 hai6 hoeng1 gong2 jan4.", en: "He/she is not a Hong Kong person." } ],
  92: [ { zh: "唔該畀杯水我。", jyut: "m4 goi1 bei2 bui1 seoi2 ngo5.", en: "Please give me a cup of water." }, { zh: "唔該借過。", jyut: "m4 goi1 ze3 gwo3.", en: "Excuse me, let me through." } ],
  93: [ { zh: "多謝你。", jyut: "do1 ze6 nei5.", en: "Thank you." }, { zh: "多謝你幫我。", jyut: "do1 ze6 nei5 bong1 ngo5.", en: "Thank you for helping me." } ],
  94: [ { zh: "唔使擔心。", jyut: "m4 sai2 daam1 sam1.", en: "No need to worry." }, { zh: "你唔使幫我。", jyut: "nei5 m4 sai2 bong1 ngo5.", en: "You don't need to help me." } ],
  95: [ { zh: "我一定去。", jyut: "ngo5 jat1 ding6 heoi3.", en: "I'll definitely go." }, { zh: "你一定要小心。", jyut: "nei5 jat1 ding6 jiu3 siu2 sam1.", en: "You must definitely be careful." } ],
  96: [ { zh: "可能落雨。", jyut: "ho2 nang4 lok6 jyu5.", en: "It might rain." }, { zh: "佢可能唔嚟。", jyut: "keoi5 ho2 nang4 m4 lai4.", en: "He/she might not come." } ],
  97: [ { zh: "你應該休息。", jyut: "nei5 jing1 goi1 jau1 sik1.", en: "You should rest." }, { zh: "我哋應該早啲去。", jyut: "ngo5 dei6 jing1 goi1 zou2 di1 heoi3.", en: "We should go earlier." } ],
  98: [ { zh: "我同你去。", jyut: "ngo5 tung4 nei5 heoi3.", en: "I'll go with you." }, { zh: "我鍾意茶同咖啡。", jyut: "ngo5 zung1 ji3 caa4 tung4 gaa3 fe1.", en: "I like tea and coffee." } ],
  99: [ { zh: "我想去，但係落雨。", jyut: "ngo5 soeng2 heoi3, daan6 hai6 lok6 jyu5.", en: "I want to go, but it's raining." }, { zh: "佢好靚，但係好貴。", jyut: "keoi5 hou2 leng3, daan6 hai6 hou2 gwai3.", en: "It's very nice, but very expensive." } ],
  100: [ { zh: "我遲到因為塞車。", jyut: "ngo5 ci4 dou3 jan1 wai6 sak1 ce1.", en: "I'm late because of traffic." }, { zh: "我開心因為聽日放假。", jyut: "ngo5 hoi1 sam1 jan1 wai6 ting1 jat6 fong3 gaa3.", en: "I'm happy because tomorrow is a day off." } ],
  101: [ { zh: "落雨，所以我冇出街。", jyut: "lok6 jyu5, so2 ji5 ngo5 mou5 ceot1 gaai1.", en: "It's raining, so I didn't go out." }, { zh: "我肚餓，所以想食嘢。", jyut: "ngo5 tou5 ngo6, so2 ji5 soeng2 sik6 je5.", en: "I'm hungry, so I want to eat." } ],
  102: [ { zh: "如果落雨，我哋唔去。", jyut: "jyu4 gwo2 lok6 jyu5, ngo5 dei6 m4 heoi3.", en: "If it rains, we won't go." }, { zh: "如果你得閒，可以搵我。", jyut: "jyu4 gwo2 nei5 dak1 haan4, ho2 ji5 wan2 ngo5.", en: "If you're free, you can look for me." } ],
  103: [ { zh: "你要茶定係咖啡呀？", jyut: "nei5 jiu3 caa4 ding6 hai6 gaa3 fe1 aa3?", en: "Do you want tea or coffee?" }, { zh: "你去定係唔去呀？", jyut: "nei5 heoi3 ding6 hai6 m4 heoi3 aa3?", en: "Are you going or not?" } ],
  104: [ { zh: "我仲未食飯。", jyut: "ngo5 zung6 mei6 sik6 faan6.", en: "I haven't eaten yet." }, { zh: "佢仲喺度等緊。", jyut: "keoi5 zung6 hai2 dou6 dang2 gan2.", en: "He/she is still waiting there." } ],
  105: [ { zh: "我哋都鍾意食嘢。", jyut: "ngo5 dei6 dou1 zung1 ji3 sik6 je5.", en: "We all like eating." }, { zh: "佢都係學生。", jyut: "keoi5 dou1 hai6 hok6 saang1.", en: "He/she is also a student." } ],
  106: [ { zh: "你先講。", jyut: "nei5 sin1 gong2.", en: "You speak first." }, { zh: "我哋食完飯先去。", jyut: "ngo5 dei6 sik6 jyun4 faan6 sin1 heoi3.", en: "Let's eat first before going." } ],
  107: [ { zh: "我做完先至可以去。", jyut: "ngo5 zou6 jyun4 sin1 zi3 ho2 ji5 heoi3.", en: "I can only go after I finish." }, { zh: "幾時先至到呀？", jyut: "gei2 si4 sin1 zi3 dou3 aa3?", en: "When will we arrive?" } ],
  108: [ { zh: "呢個至靚。", jyut: "ni1 go3 zi3 leng3.", en: "This one is the prettiest." }, { zh: "邊個至高呀？", jyut: "bin1 go3 zi3 gou1 aa3?", en: "Who is the tallest?" } ],
  109: [ { zh: "佢好似好攰。", jyut: "keoi5 hou2 ci5 hou2 gui6.", en: "He/she seems very tired." }, { zh: "呢度好似屋企咁。", jyut: "ni1 dou6 hou2 ci5 uk1 kei2 gam3.", en: "This place feels like home." } ],
  110: [ { zh: "我哋一齊食飯。", jyut: "ngo5 dei6 jat1 cai4 sik6 faan6.", en: "We're eating together." }, { zh: "我哋一齊去旅行。", jyut: "ngo5 dei6 jat1 cai4 heoi3 leoi5 hang4.", en: "We're traveling together." } ],

  // ===== Top 200: Adjectives (111-150) =====
  111: [ { zh: "呢個好好。", jyut: "ni1 go3 hou2 hou2.", en: "This is very good." }, { zh: "呢間餐廳好好。", jyut: "ni1 gaan1 caan1 teng1 hou2 hou2.", en: "This restaurant is very good." } ],
  112: [ { zh: "呢個唔好。", jyut: "ni1 go3 m4 hou2.", en: "This is bad." }, { zh: "唔好喊喇。", jyut: "m4 hou2 haam3 laa3.", en: "Don't cry." } ],
  113: [ { zh: "呢間屋好大。", jyut: "ni1 gaan1 uk1 hou2 daai6.", en: "This house is very big." }, { zh: "呢隻狗好大。", jyut: "ni1 zek3 gau2 hou2 daai6.", en: "This dog is very big." } ],
  114: [ { zh: "呢間房好細。", jyut: "ni1 gaan1 fong2 hou2 sai3.", en: "This room is very small." }, { zh: "呢隻貓好細。", jyut: "ni1 zek3 maau1 hou2 sai3.", en: "This cat is very small." } ],
  115: [ { zh: "呢度人好多。", jyut: "ni1 dou6 jan4 hou2 do1.", en: "There are a lot of people here." }, { zh: "我有好多功課。", jyut: "ngo5 jau5 hou2 do1 gung1 fo3.", en: "I have a lot of homework." } ],
  116: [ { zh: "呢度人好少。", jyut: "ni1 dou6 jan4 hou2 siu2.", en: "There are few people here." }, { zh: "我而家好少睇電視。", jyut: "ngo5 ji4 gaa1 hou2 siu2 tai2 din6 si6.", en: "I rarely watch TV now." } ],
  117: [ { zh: "呢架車好新。", jyut: "ni1 gaa3 ce1 hou2 san1.", en: "This car is new." }, { zh: "我買咗對新鞋。", jyut: "ngo5 maai5 zo2 deoi3 san1 haai4.", en: "I bought a new pair of shoes." } ],
  118: [ { zh: "呢架車好舊。", jyut: "ni1 gaa3 ce1 hou2 gau6.", en: "This car is old." }, { zh: "呢本書好舊。", jyut: "ni1 bun2 syu1 hou2 gau6.", en: "This book is old." } ],
  119: [ { zh: "呢度好靚。", jyut: "ni1 dou6 hou2 leng3.", en: "This place is very nice." }, { zh: "你件衫好靚。", jyut: "nei5 gin6 saam1 hou2 leng3.", en: "Your shirt is very nice." } ],
  120: [ { zh: "佢好高。", jyut: "keoi5 hou2 gou1.", en: "He/she is very tall." }, { zh: "香港嘅樓好高。", jyut: "hoeng1 gong2 ge3 lau4 hou2 gou1.", en: "Hong Kong buildings are very tall." } ],
  121: [ { zh: "佢好矮。", jyut: "keoi5 hou2 ai2.", en: "He/she is short." }, { zh: "呢張枱好矮。", jyut: "ni1 zoeng1 toi2 hou2 ai2.", en: "This table is low." } ],
  122: [ { zh: "隻貓好肥。", jyut: "zek3 maau1 hou2 fei4.", en: "The cat is fat." }, { zh: "我食多咗，肥咗。", jyut: "ngo5 sik6 do1 zo2, fei4 zo2.", en: "I ate too much, I've gotten fatter." } ],
  123: [ { zh: "佢好瘦。", jyut: "keoi5 hou2 sau3.", en: "He/she is thin." }, { zh: "隻狗好瘦。", jyut: "zek3 gau2 hou2 sau3.", en: "The dog is thin." } ],
  124: [ { zh: "佢跑步好快。", jyut: "keoi5 paau2 bou6 hou2 faai3.", en: "He/she runs very fast." }, { zh: "地鐵好快。", jyut: "dei6 tit3 hou2 faai3.", en: "The MTR is fast." } ],
  125: [ { zh: "巴士好慢。", jyut: "baa1 si2 hou2 maan6.", en: "The bus is slow." }, { zh: "你可唔可以講慢啲呀？", jyut: "nei5 ho2 m4 ho2 ji5 gong2 maan6 di1 aa3?", en: "Can you speak more slowly?" } ],
  126: [ { zh: "今日好熱。", jyut: "gam1 jat6 hou2 jit6.", en: "Today is very hot." }, { zh: "碗湯好熱。", jyut: "wun2 tong1 hou2 jit6.", en: "The soup is very hot." } ],
  127: [ { zh: "今日好凍。", jyut: "gam1 jat6 hou2 dung3.", en: "Today is very cold." }, { zh: "杯水好凍。", jyut: "bui1 seoi2 hou2 dung3.", en: "The water is very cold." } ],
  128: [ { zh: "呢個好貴。", jyut: "ni1 go3 hou2 gwai3.", en: "This is expensive." }, { zh: "香港嘅樓好貴。", jyut: "hoeng1 gong2 ge3 lau4 hou2 gwai3.", en: "Hong Kong housing is very expensive." } ],
  129: [ { zh: "呢度嘢食好平。", jyut: "ni1 dou6 je5 sik6 hou2 peng4.", en: "The food here is cheap." }, { zh: "呢對鞋好平。", jyut: "ni1 deoi3 haai4 hou2 peng4.", en: "These shoes are cheap." } ],
  130: [ { zh: "廣東話好難。", jyut: "gwong2 dung1 waa2 hou2 naan4.", en: "Cantonese is difficult." }, { zh: "考試好難。", jyut: "haau2 si5 hou2 naan4.", en: "The exam is difficult." } ],
  131: [ { zh: "呢個好容易。", jyut: "ni1 go3 hou2 jung4 ji6.", en: "This is easy." }, { zh: "煮呢個好容易。", jyut: "zyu2 ni1 go3 hou2 jung4 ji6.", en: "Cooking this is easy." } ],
  132: [ { zh: "我今日好開心。", jyut: "ngo5 gam1 jat6 hou2 hoi1 sam1.", en: "I'm very happy today." }, { zh: "見到你，我好開心。", jyut: "gin3 dou2 nei5, ngo5 hou2 hoi1 sam1.", en: "I'm happy to see you." } ],
  133: [ { zh: "佢好唔開心。", jyut: "keoi5 hou2 m4 hoi1 sam1.", en: "He/she is very unhappy." }, { zh: "做咩唔開心呀？", jyut: "zou6 me1 m4 hoi1 sam1 aa3?", en: "Why are you unhappy?" } ],
  134: [ { zh: "我好攰。", jyut: "ngo5 hou2 gui6.", en: "I'm very tired." }, { zh: "行咗好耐，好攰。", jyut: "haang4 zo2 hou2 noi6, hou2 gui6.", en: "I walked for a long time, I'm very tired." } ],
  135: [ { zh: "我好肚餓。", jyut: "ngo5 hou2 tou5 ngo6.", en: "I'm very hungry." }, { zh: "你肚餓未呀？", jyut: "nei5 tou5 ngo6 mei6 aa3?", en: "Are you hungry yet?" } ],
  136: [ { zh: "我好忙。", jyut: "ngo5 hou2 mong4.", en: "I'm very busy." }, { zh: "佢成日好忙。", jyut: "keoi5 sing4 jat6 hou2 mong4.", en: "He/she is always busy." } ],
  137: [ { zh: "你聽日得唔得閒呀？", jyut: "nei5 ting1 jat6 dak1 m4 dak1 haan4 aa3?", en: "Are you free tomorrow?" }, { zh: "我而家得閒。", jyut: "ngo5 ji4 gaa1 dak1 haan4.", en: "I'm free right now." } ],
  138: [ { zh: "佢頭髮好長。", jyut: "keoi5 tau4 faat3 hou2 coeng4.", en: "His/her hair is long." }, { zh: "呢條路好長。", jyut: "ni1 tiu4 lou6 hou2 coeng4.", en: "This road is long." } ],
  139: [ { zh: "佢頭髮好短。", jyut: "keoi5 tau4 faat3 hou2 dyun2.", en: "His/her hair is short." }, { zh: "呢條褲好短。", jyut: "ni1 tiu4 fu3 hou2 dyun2.", en: "These trousers are short." } ],
  140: [ { zh: "間房好乾淨。", jyut: "gaan1 fong2 hou2 gon1 zeng6.", en: "The room is clean." }, { zh: "你隻手乾唔乾淨呀？", jyut: "nei5 zek3 sau2 gon1 m4 gon1 zeng6 aa3?", en: "Are your hands clean?" } ],
  141: [ { zh: "間房好污糟。", jyut: "gaan1 fong2 hou2 wu1 zou1.", en: "The room is dirty." }, { zh: "你件衫好污糟。", jyut: "nei5 gin6 saam1 hou2 wu1 zou1.", en: "Your shirt is dirty." } ],
  142: [ { zh: "呢度嘢好齊全。", jyut: "ni1 dou6 je5 hou2 cai4 cyun4.", en: "The stuff here is very complete." }, { zh: "呢間舖嘢齊全。", jyut: "ni1 gaan1 pou3 je5 cai4 cyun4.", en: "This shop has everything." } ],
  143: [ { zh: "隻狗好得意。", jyut: "zek3 gau2 hou2 dak1 ji3.", en: "The dog is cute." }, { zh: "隻貓好得意。", jyut: "zek3 maau1 hou2 dak1 ji3.", en: "The cat is cute." } ],
  144: [ { zh: "佢好犀利。", jyut: "keoi5 hou2 sai1 lei6.", en: "He/she is impressive." }, { zh: "你煮嘢好犀利。", jyut: "nei5 zyu2 je5 hou2 sai1 lei6.", en: "You're impressive at cooking." } ],
  145: [ { zh: "塞車好麻煩。", jyut: "sak1 ce1 hou2 maa4 faan4.", en: "Traffic jams are troublesome." }, { zh: "唔該晒，麻煩你喇。", jyut: "m4 goi1 saai3, maa4 faan4 nei5 laa3.", en: "Thanks so much, sorry for the trouble." } ],
  146: [ { zh: "考試好緊要。", jyut: "haau2 si5 hou2 gan2 jiu3.", en: "The exam is important." }, { zh: "冇問題，唔緊要。", jyut: "mou5 man6 tai4, m4 gan2 jiu3.", en: "No problem, it doesn't matter." } ],
  147: [ { zh: "張沙發好舒服。", jyut: "zoeng1 saa1 faat3 hou2 syu1 fuk6.", en: "The sofa is comfortable." }, { zh: "呢對鞋好舒服。", jyut: "ni1 deoi3 haai4 hou2 syu1 fuk6.", en: "These shoes are comfortable." } ],
  148: [ { zh: "行山好辛苦。", jyut: "haang4 saan1 hou2 san1 fu2.", en: "Hiking is tough." }, { zh: "你今日辛苦晒。", jyut: "nei5 gam1 jat6 san1 fu2 saai3.", en: "You've worked hard today." } ],
  149: [ { zh: "呢度好危險。", jyut: "ni1 dou6 hou2 ngai4 him2.", en: "This place is dangerous." }, { zh: "游水嗰陣要小心，好危險。", jyut: "jau4 seoi2 go2 zan6 jiu3 siu2 sam1, hou2 ngai4 him2.", en: "Swimming can be dangerous, be careful." } ],
  150: [ { zh: "呢度好安全。", jyut: "ni1 dou6 hou2 on1 cyun4.", en: "This place is safe." }, { zh: "喺屋企好安全。", jyut: "hai2 uk1 kei2 hou2 on1 cyun4.", en: "Being at home is safe." } ],

  // ===== Top 200: Time Words (151-170) =====
  151: [ { zh: "我今日好開心。", jyut: "ngo5 gam1 jat6 hou2 hoi1 sam1.", en: "I'm very happy today." }, { zh: "今日星期幾呀？", jyut: "gam1 jat6 sing1 kei4 gei2 aa3?", en: "What day is today?" } ],
  152: [ { zh: "我聽日去香港。", jyut: "ngo5 ting1 jat6 heoi3 hoeng1 gong2.", en: "I'm going to Hong Kong tomorrow." }, { zh: "聽日會落雨。", jyut: "ting1 jat6 wui5 lok6 jyu5.", en: "It'll rain tomorrow." } ],
  153: [ { zh: "尋日落雨。", jyut: "cam4 jat6 lok6 jyu5.", en: "It rained yesterday." }, { zh: "尋日我好忙。", jyut: "cam4 jat6 ngo5 hou2 mong4.", en: "I was busy yesterday." } ],
  154: [ { zh: "我而家好肚餓。", jyut: "ngo5 ji4 gaa1 hou2 tou5 ngo6.", en: "I'm very hungry right now." }, { zh: "你而家喺邊度呀？", jyut: "nei5 ji4 gaa1 hai2 bin1 dou6 aa3?", en: "Where are you now?" } ],
  155: [ { zh: "之後我哋去邊度呀？", jyut: "zi1 hau6 ngo5 dei6 heoi3 bin1 dou6 aa3?", en: "Where shall we go after?" }, { zh: "我食完飯之後想瞓覺。", jyut: "ngo5 sik6 jyun4 faan6 zi1 hau6 soeng2 fan3 gaau3.", en: "I want to sleep after eating." } ],
  156: [ { zh: "你去之前打電話畀我。", jyut: "nei5 heoi3 zi1 cin4 daa2 din6 waa2 bei2 ngo5.", en: "Call me before you go." }, { zh: "尋日之前我未見過佢。", jyut: "cam4 jat6 zi1 cin4 ngo5 mei6 gin3 gwo3 keoi5.", en: "I hadn't seen him/her before yesterday." } ],
  157: [ { zh: "我朝早飲咖啡。", jyut: "ngo5 ziu1 zou2 jam2 gaa3 fe1.", en: "I drink coffee in the morning." }, { zh: "聽朝早見。", jyut: "ting1 ziu1 zou2 gin3.", en: "See you tomorrow morning." } ],
  158: [ { zh: "我晏晝食飯。", jyut: "ngo5 aan3 zau3 sik6 faan6.", en: "I eat lunch at noon." }, { zh: "我晏晝要返工。", jyut: "ngo5 aan3 zau3 jiu3 faan1 gung1.", en: "I need to go to work in the afternoon." } ],
  159: [ { zh: "我夜晚瞓覺。", jyut: "ngo5 je6 maan5 fan3 gaau3.", en: "I sleep at night." }, { zh: "夜晚落雨。", jyut: "je6 maan5 lok6 jyu5.", en: "It's raining at night." } ],
  160: [ { zh: "一個星期有七日。", jyut: "jat1 go3 sing1 kei4 jau5 cat1 jat6.", en: "A week has seven days." }, { zh: "呢個星期我好忙。", jyut: "ni1 go3 sing1 kei4 ngo5 hou2 mong4.", en: "I'm busy this week." } ],
  161: [ { zh: "等我五分鐘。", jyut: "dang2 ngo5 ng5 fan1 zung1.", en: "Wait for me five minutes." }, { zh: "幾多分鐘先至到呀？", jyut: "gei2 do1 fan1 zung1 sin1 zi3 dou3 aa3?", en: "How many minutes until we arrive?" } ],
  162: [ { zh: "我等咗一個鐘頭。", jyut: "ngo5 dang2 zo2 jat1 go3 zung1 tau4.", en: "I waited an hour." }, { zh: "去香港要幾多個鐘頭呀？", jyut: "heoi3 hoeng1 gong2 jiu3 gei2 do1 go3 zung1 tau4 aa3?", en: "How many hours does it take to get to Hong Kong?" } ],
  163: [ { zh: "一年有十二個月。", jyut: "jat1 nin4 jau5 sap6 ji6 go3 jyut6.", en: "A year has twelve months." }, { zh: "聽年見。", jyut: "ting1 nin4 gin3.", en: "See you next year." } ],
  164: [ { zh: "一年有十二個月。", jyut: "jat1 nin4 jau5 sap6 ji6 go3 jyut6.", en: "A year has twelve months." }, { zh: "呢個月我好忙。", jyut: "ni1 go3 jyut6 ngo5 hou2 mong4.", en: "I'm busy this month." } ],
  165: [ { zh: "一個星期有七日。", jyut: "jat1 go3 sing1 kei4 jau5 cat1 jat6.", en: "A week has seven days." }, { zh: "我成日飲茶。", jyut: "ngo5 sing4 jat6 jam2 caa4.", en: "I drink tea every day." } ],
  166: [ { zh: "而家幾點呀？", jyut: "ji4 gaa1 gei2 dim2 aa3?", en: "What time is it now?" }, { zh: "你幾點返學呀？", jyut: "nei5 gei2 dim2 faan1 hok6 aa3?", en: "What time do you go to school?" } ],
  167: [ { zh: "我遲到咗。", jyut: "ngo5 ci4 dou3 zo2.", en: "I'm late." }, { zh: "巴士遲咗嚟。", jyut: "baa1 si2 ci4 zo2 lai4.", en: "The bus came late." } ],
  168: [ { zh: "我今日好早返學。", jyut: "ngo5 gam1 jat6 hou2 zou2 faan1 hok6.", en: "I went to school very early today." }, { zh: "你可唔可以早啲嚟呀？", jyut: "nei5 ho2 m4 ho2 ji5 zou2 di1 lai4 aa3?", en: "Can you come earlier?" } ],
  169: [ { zh: "我成日好忙。", jyut: "ngo5 sing4 jat6 hou2 mong4.", en: "I'm always busy." }, { zh: "佢成日唔記得嘢。", jyut: "keoi5 sing4 jat6 m4 gei3 dak1 je5.", en: "He/she always forgets things." } ],
  170: [ { zh: "我有時去街市買嘢。", jyut: "ngo5 jau5 si4 heoi3 gaai1 si5 maai5 je5.", en: "Sometimes I go to the market to buy things." }, { zh: "佢有時好嬲。", jyut: "keoi5 jau5 si4 hou2 nau1.", en: "Sometimes he/she gets angry." } ],

  // ===== Top 200: Family & People (171-185) =====
  171: [ { zh: "我爸爸好高。", jyut: "ngo5 baa4 baa1 hou2 gou1.", en: "My dad is tall." }, { zh: "我爸爸鍾意飲茶。", jyut: "ngo5 baa4 baa1 zung1 ji3 jam2 caa4.", en: "My dad likes drinking tea." } ],
  172: [ { zh: "我媽媽好靚。", jyut: "ngo5 maa4 maa1 hou2 leng3.", en: "My mum is very pretty." }, { zh: "媽媽煮飯好好食。", jyut: "maa4 maa1 zyu2 faan6 hou2 hou2 sik6.", en: "Mum cooks delicious food." } ],
  173: [ { zh: "我哥哥好高。", jyut: "ngo5 go4 go1 hou2 gou1.", en: "My older brother is tall." }, { zh: "我哥哥喺公司做嘢。", jyut: "ngo5 go4 go1 hai2 gung1 si1 zou6 je5.", en: "My brother works at a company." } ],
  174: [ { zh: "我姐姐好靚。", jyut: "ngo5 ze4 ze1 hou2 leng3.", en: "My older sister is pretty." }, { zh: "姐姐鍾意行街。", jyut: "ze4 ze1 zung1 ji3 haang4 gaai1.", en: "My sister likes going out." } ],
  175: [ { zh: "我細佬好得意。", jyut: "ngo5 sai3 lou2 hou2 dak1 ji3.", en: "My younger brother is cute." }, { zh: "細佬讀緊書。", jyut: "sai3 lou2 duk6 gan2 syu1.", en: "My younger brother is studying." } ],
  176: [ { zh: "我妹妹好得意。", jyut: "ngo5 mui6 mui2 hou2 dak1 ji3.", en: "My younger sister is cute." }, { zh: "妹妹鍾意畫畫。", jyut: "mui6 mui2 zung1 ji3 waak6 waa2.", en: "My sister likes drawing." } ],
  177: [ { zh: "我老婆好靚。", jyut: "ngo5 lou5 po4 hou2 leng3.", en: "My wife is pretty." }, { zh: "我老婆喺醫院做嘢。", jyut: "ngo5 lou5 po4 hai2 ji1 jyun2 zou6 je5.", en: "My wife works at a hospital." } ],
  178: [ { zh: "我老公好忙。", jyut: "ngo5 lou5 gung1 hou2 mong4.", en: "My husband is very busy." }, { zh: "我老公煮飯畀我食。", jyut: "ngo5 lou5 gung1 zyu2 faan6 bei2 ngo5 sik6.", en: "My husband cooks for me." } ],
  179: [ { zh: "我有一個仔。", jyut: "ngo5 jau5 jat1 go3 zai2.", en: "I have a son." }, { zh: "個仔而家讀緊書。", jyut: "go3 zai2 ji4 gaa1 duk6 gan2 syu1.", en: "My son is studying now." } ],
  180: [ { zh: "我有一個女。", jyut: "ngo5 jau5 jat1 go3 neoi2.", en: "I have a daughter." }, { zh: "個女好得意。", jyut: "go3 neoi2 hou2 dak1 ji3.", en: "My daughter is cute." } ],
  181: [ { zh: "佢係我朋友。", jyut: "keoi5 hai6 ngo5 pang4 jau5.", en: "He/she is my friend." }, { zh: "我想見我朋友。", jyut: "ngo5 soeng2 gin3 ngo5 pang4 jau5.", en: "I want to see my friend." } ],
  182: [ { zh: "我好鍾意我嘅屋企人。", jyut: "ngo5 hou2 zung1 ji3 ngo5 ge3 uk1 kei2 jan4.", en: "I really like my family." }, { zh: "我屋企人都住喺香港。", jyut: "ngo5 uk1 kei2 jan4 dou1 zyu6 hai2 hoeng1 gong2.", en: "My family all live in Hong Kong." } ],
  183: [ { zh: "佢係我同事。", jyut: "keoi5 hai6 ngo5 tung4 si6.", en: "He/she is my colleague." }, { zh: "我同事好鍾意飲咖啡。", jyut: "ngo5 tung4 si6 hou2 zung1 ji3 jam2 gaa3 fe1.", en: "My colleague loves drinking coffee." } ],
  184: [ { zh: "佢係我老師。", jyut: "keoi5 hai6 ngo5 lou5 si1.", en: "He/she is my teacher." }, { zh: "老師教我廣東話。", jyut: "lou5 si1 gaau3 ngo5 gwong2 dung1 waa2.", en: "My teacher teaches me Cantonese." } ],
  185: [ { zh: "我係學生。", jyut: "ngo5 hai6 hok6 saang1.", en: "I am a student." }, { zh: "呢度好多學生。", jyut: "ni1 dou6 hou2 do1 hok6 saang1.", en: "There are many students here." } ],

  // ===== Top 200: Places (186-200) =====
  186: [ { zh: "我要返屋企。", jyut: "ngo5 jiu3 faan1 uk1 kei2.", en: "I need to go home." }, { zh: "我屋企有隻貓。", jyut: "ngo5 uk1 kei2 jau5 zek3 maau1.", en: "There's a cat at my home." } ],
  187: [ { zh: "我聽日返學校。", jyut: "ngo5 ting1 jat6 faan1 hok6 haau6.", en: "I'm going to school tomorrow." }, { zh: "呢間學校好大。", jyut: "ni1 gaan1 hok6 haau6 hou2 daai6.", en: "This school is big." } ],
  188: [ { zh: "我喺公司做嘢。", jyut: "ngo5 hai2 gung1 si1 zou6 je5.", en: "I work at a company." }, { zh: "公司幾點開呀？", jyut: "gung1 si1 gei2 dim2 hoi1 aa3?", en: "What time does the company open?" } ],
  189: [ { zh: "呢間餐廳好好。", jyut: "ni1 gaan1 caan1 teng1 hou2 hou2.", en: "This restaurant is very good." }, { zh: "呢間餐廳好多人。", jyut: "ni1 gaan1 caan1 teng1 hou2 do1 jan4.", en: "This restaurant has a lot of people." } ],
  190: [ { zh: "我去街市買菜。", jyut: "ngo5 heoi3 gaai1 si5 maai5 coi3.", en: "I'm going to the market to buy vegetables." }, { zh: "街市好多人。", jyut: "gaai1 si5 hou2 do1 jan4.", en: "The market is crowded." } ],
  191: [ { zh: "我要去醫院。", jyut: "ngo5 jiu3 heoi3 ji1 jyun2.", en: "I need to go to the hospital." }, { zh: "佢喺醫院做護士。", jyut: "keoi5 hai2 ji1 jyun2 zou6 wu6 si6.", en: "He/she works as a nurse at the hospital." } ],
  192: [ { zh: "我要去銀行。", jyut: "ngo5 jiu3 heoi3 ngan4 hong4.", en: "I need to go to the bank." }, { zh: "銀行幾點開呀？", jyut: "ngan4 hong4 gei2 dim2 hoi1 aa3?", en: "What time does the bank open?" } ],
  193: [ { zh: "我哋去公園玩。", jyut: "ngo5 dei6 heoi3 gung1 jyun4 waan2.", en: "We're going to play at the park." }, { zh: "公園有好多樹。", jyut: "gung1 jyun4 jau5 hou2 do1 syu6.", en: "The park has a lot of trees." } ],
  194: [ { zh: "廁所喺邊度呀？", jyut: "ci3 so2 hai2 bin1 dou6 aa3?", en: "Where is the toilet?" }, { zh: "我要去廁所。", jyut: "ngo5 jiu3 heoi3 ci3 so2.", en: "I need to go to the toilet." } ],
  195: [ { zh: "我係香港人。", jyut: "ngo5 hai6 hoeng1 gong2 jan4.", en: "I am a Hong Kong person." }, { zh: "香港嘅樓好貴。", jyut: "hoeng1 gong2 ge3 lau4 hou2 gwai3.", en: "Hong Kong housing is very expensive." } ],
  196: [ { zh: "呢間房好細。", jyut: "ni1 gaan1 fong2 hou2 sai3.", en: "This room is small." }, { zh: "呢間房好乾淨。", jyut: "ni1 gaan1 fong2 hou2 gon1 zeng6.", en: "This room is clean." } ],
  197: [ { zh: "呢間舖頭賣咩呀？", jyut: "ni1 gaan1 pou3 tau2 maai6 me1 aa3?", en: "What does this shop sell?" }, { zh: "舖頭幾點開呀？", jyut: "pou3 tau2 gei2 dim2 hoi1 aa3?", en: "What time does the shop open?" } ],
  198: [ { zh: "我而家去機場。", jyut: "ngo5 ji4 gaa1 heoi3 gei1 coeng4.", en: "I'm going to the airport now." }, { zh: "機場好多人。", jyut: "gei1 coeng4 hou2 do1 jan4.", en: "The airport is crowded." } ],
  199: [ { zh: "地鐵站喺邊度呀？", jyut: "dei6 tit3 zaam6 hai2 bin1 dou6 aa3?", en: "Where is the MTR station?" }, { zh: "我喺地鐵站等你。", jyut: "ngo5 hai2 dei6 tit3 zaam6 dang2 nei5.", en: "I'll wait for you at the MTR station." } ],
  200: [ { zh: "巴士站喺邊度呀？", jyut: "baa1 si2 zaam6 hai2 bin1 dou6 aa3?", en: "Where is the bus stop?" }, { zh: "我喺巴士站等緊你。", jyut: "ngo5 hai2 baa1 si2 zaam6 dang2 gan2 nei5.", en: "I'm waiting for you at the bus stop." } ],

  // Colors: sentence 2 names a real thing that's actually that color,
  // instead of just re-stating "this is X" a second time.
  201: [ // 紅色 red
    { zh: "呢個係紅色。", jyut: "ni1 go3 hai6 hung4 sik1.", en: "This is red." },
    { zh: "呢個蘋果係紅色嘅。", jyut: "ni1 go3 ping4 gwo2 hai6 hung4 sik1 ge3.", en: "This apple is red." },
  ],
  202: [ // 黃色 yellow
    { zh: "呢個係黃色。", jyut: "ni1 go3 hai6 wong4 sik1.", en: "This is yellow." },
    { zh: "香蕉係黃色嘅。", jyut: "hoeng1 ziu1 hai6 wong4 sik1 ge3.", en: "Bananas are yellow." },
  ],
  203: [ // 藍色 blue
    { zh: "呢個係藍色。", jyut: "ni1 go3 hai6 laam4 sik1.", en: "This is blue." },
    { zh: "天空係藍色嘅。", jyut: "tin1 hung1 hai6 laam4 sik1 ge3.", en: "The sky is blue." },
  ],
  204: [ // 綠色 green
    { zh: "呢個係綠色。", jyut: "ni1 go3 hai6 luk6 sik1.", en: "This is green." },
    { zh: "樹葉係綠色嘅。", jyut: "syu6 jip6 hai6 luk6 sik1 ge3.", en: "Leaves are green." },
  ],
  205: [ // 白色 white
    { zh: "呢個係白色。", jyut: "ni1 go3 hai6 baak6 sik1.", en: "This is white." },
    { zh: "雲係白色嘅。", jyut: "wan4 hai6 baak6 sik1 ge3.", en: "Clouds are white." },
  ],
  206: [ // 黑色 black
    { zh: "呢個係黑色。", jyut: "ni1 go3 hai6 hak1 sik1.", en: "This is black." },
    { zh: "佢對眼係黑色嘅。", jyut: "keoi5 deoi3 ngaan5 hai6 hak1 sik1 ge3.", en: "His/her eyes are black." },
  ],
  207: [ // 橙色 orange
    { zh: "呢個係橙色。", jyut: "ni1 go3 hai6 caang2 sik1.", en: "This is orange." },
    { zh: "呢個生果係橙色嘅。", jyut: "ni1 go3 saang1 gwo2 hai6 caang2 sik1 ge3.", en: "This fruit is orange." },
  ],
  208: [ // 紫色 purple
    { zh: "呢個係紫色。", jyut: "ni1 go3 hai6 zi2 sik1.", en: "This is purple." },
    { zh: "呢件衫係紫色嘅。", jyut: "ni1 gin6 saam1 hai6 zi2 sik1 ge3.", en: "This shirt is purple." },
  ],
  209: [ // 粉紅色 pink
    { zh: "呢個係粉紅色。", jyut: "ni1 go3 hai6 fan2 hung4 sik1.", en: "This is pink." },
    { zh: "呢對鞋係粉紅色嘅。", jyut: "ni1 deoi3 haai4 hai6 fan2 hung4 sik1 ge3.", en: "These shoes are pink." },
  ],
  210: [ // 灰色 grey
    { zh: "呢個係灰色。", jyut: "ni1 go3 hai6 fui1 sik1.", en: "This is grey." },
    { zh: "呢架車係灰色嘅。", jyut: "ni1 gaa3 ce1 hai6 fui1 sik1 ge3.", en: "This car is grey." },
  ],

  // ===== 201-500: Body Parts (211-225) =====
  211: [ { zh: "我頭好痛。", jyut: "ngo5 tau4 hou2 tung3.", en: "My head hurts a lot." }, { zh: "佢個頭好大。", jyut: "keoi5 go3 tau4 hou2 daai6.", en: "His/her head is big." } ],
  212: [ { zh: "我隻眼好痛。", jyut: "ngo5 zek3 ngaan5 hou2 tung3.", en: "My eye hurts." }, { zh: "佢對眼好靚。", jyut: "keoi5 deoi3 ngaan5 hou2 leng3.", en: "His/her eyes are beautiful." } ],
  213: [ { zh: "我隻耳仔好痛。", jyut: "ngo5 zek3 ji5 zai2 hou2 tung3.", en: "My ear hurts." }, { zh: "佢耳仔好大。", jyut: "keoi5 ji5 zai2 hou2 daai6.", en: "His/her ears are big." } ],
  214: [ { zh: "我個鼻好痛。", jyut: "ngo5 go3 bei6 hou2 tung3.", en: "My nose hurts." }, { zh: "佢個鼻好高。", jyut: "keoi5 go3 bei6 hou2 gou1.", en: "His/her nose is prominent." } ],
  215: [ { zh: "佢個口好細。", jyut: "keoi5 go3 hau2 hou2 sai3.", en: "His/her mouth is small." }, { zh: "唔該張開口。", jyut: "m4 goi1 zoeng1 hoi1 hau2.", en: "Please open your mouth." } ],
  216: [ { zh: "唔該洗手。", jyut: "m4 goi1 sai2 sau2.", en: "Please wash your hands." }, { zh: "我隻手好痛。", jyut: "ngo5 zek3 sau2 hou2 tung3.", en: "My hand hurts." } ],
  217: [ { zh: "我隻腳好痛。", jyut: "ngo5 zek3 goek3 hou2 tung3.", en: "My leg hurts." }, { zh: "佢腳好長。", jyut: "keoi5 goek3 hou2 coeng4.", en: "His/her legs are long." } ],
  218: [ { zh: "我好開心。", jyut: "ngo5 hou2 hoi1 sam1.", en: "I'm very happy." }, { zh: "佢心好好。", jyut: "keoi5 sam1 hou2 hou2.", en: "He/she has a kind heart." } ],
  219: [ { zh: "我個肚好痛。", jyut: "ngo5 go3 tou5 hou2 tung3.", en: "My stomach hurts." }, { zh: "我好肚餓。", jyut: "ngo5 hou2 tou5 ngo6.", en: "I'm very hungry." } ],
  220: [ { zh: "我隻牙好痛。", jyut: "ngo5 zek3 ngaa4 hou2 tung3.", en: "My tooth hurts." }, { zh: "佢啲牙好靚。", jyut: "keoi5 di1 ngaa4 hou2 leng3.", en: "His/her teeth are nice." } ],
  221: [ { zh: "佢個面好靚。", jyut: "keoi5 go3 min6 hou2 leng3.", en: "His/her face is pretty." }, { zh: "你個面紅晒。", jyut: "nei5 go3 min6 hung4 saai3.", en: "Your face is all red." } ],
  222: [ { zh: "佢頭髮好長。", jyut: "keoi5 tau4 faat3 hou2 coeng4.", en: "His/her hair is long." }, { zh: "佢頭髮好靚。", jyut: "keoi5 tau4 faat3 hou2 leng3.", en: "His/her hair is nice." } ],
  223: [ { zh: "我背脊好痛。", jyut: "ngo5 bui3 zek3 hou2 tung3.", en: "My back hurts." }, { zh: "我背脊好痛，想休息。", jyut: "ngo5 bui3 zek3 hou2 tung3, soeng2 jau1 sik1.", en: "My back hurts, I want to rest." } ],
  224: [ { zh: "我條頸好痛。", jyut: "ngo5 tiu4 geng2 hou2 tung3.", en: "My neck hurts." }, { zh: "佢條頸好長。", jyut: "keoi5 tiu4 geng2 hou2 coeng4.", en: "His/her neck is long." } ],
  225: [ { zh: "我身體唔舒服。", jyut: "ngo5 san1 tai2 m4 syu1 fuk6.", en: "I don't feel well." }, { zh: "你身體好唔好呀？", jyut: "nei5 san1 tai2 hou2 m4 hou2 aa3?", en: "Are you feeling well?" } ],

  // ===== 201-500: Food & Drink (226-250) =====
  226: [ { zh: "我想食飯。", jyut: "ngo5 soeng2 sik6 faan6.", en: "I want to eat." }, { zh: "媽媽煮飯好好食。", jyut: "maa4 maa1 zyu2 faan6 hou2 hou2 sik6.", en: "Mum cooks delicious food." } ],
  227: [ { zh: "我想食麵。", jyut: "ngo5 soeng2 sik6 min6.", en: "I want to eat noodles." }, { zh: "呢碗麵好好食。", jyut: "ni1 wun2 min6 hou2 hou2 sik6.", en: "This bowl of noodles is delicious." } ],
  228: [ { zh: "我想飲茶。", jyut: "ngo5 soeng2 jam2 caa4.", en: "I want to drink tea." }, { zh: "我鍾意茶同咖啡。", jyut: "ngo5 zung1 ji3 caa4 tung4 gaa3 fe1.", en: "I like tea and coffee." } ],
  229: [ { zh: "我想飲水。", jyut: "ngo5 soeng2 jam2 seoi2.", en: "I want to drink water." }, { zh: "杯水好凍。", jyut: "bui1 seoi2 hou2 dung3.", en: "The water is very cold." } ],
  230: [ { zh: "我朝早飲咖啡。", jyut: "ngo5 ziu1 zou2 jam2 gaa3 fe1.", en: "I drink coffee in the morning." }, { zh: "呢杯咖啡好熱。", jyut: "ni1 bui1 gaa3 fe1 hou2 jit6.", en: "This coffee is very hot." } ],
  231: [ { zh: "我想食牛肉。", jyut: "ngo5 soeng2 sik6 ngau4 juk6.", en: "I want to eat beef." }, { zh: "呢碟牛肉好好食。", jyut: "ni1 dip2 ngau4 juk6 hou2 hou2 sik6.", en: "This plate of beef is delicious." } ],
  232: [ { zh: "我想食豬肉。", jyut: "ngo5 soeng2 sik6 zyu1 juk6.", en: "I want to eat pork." }, { zh: "呢個豬肉好貴。", jyut: "ni1 go3 zyu1 juk6 hou2 gwai3.", en: "This pork is expensive." } ],
  233: [ { zh: "我想食雞。", jyut: "ngo5 soeng2 sik6 gai1.", en: "I want to eat chicken." }, { zh: "隻雞好大。", jyut: "zek3 gai1 hou2 daai6.", en: "The chicken is big." } ],
  234: [ { zh: "我想食魚。", jyut: "ngo5 soeng2 sik6 jyu2.", en: "I want to eat fish." }, { zh: "呢條魚好大。", jyut: "ni1 tiu4 jyu2 hou2 daai6.", en: "This fish is big." } ],
  235: [ { zh: "我去街市買菜。", jyut: "ngo5 heoi3 gaai1 si5 maai5 coi3.", en: "I'm going to the market to buy vegetables." }, { zh: "我要多啲菜。", jyut: "ngo5 jiu3 do1 di1 coi3.", en: "I want more vegetables." } ],
  236: [ { zh: "我鍾意食生果。", jyut: "ngo5 zung1 ji3 sik6 saang1 gwo2.", en: "I like eating fruit." }, { zh: "呢個生果係橙色嘅。", jyut: "ni1 go3 saang1 gwo2 hai6 caang2 sik1 ge3.", en: "This fruit is orange." } ],
  237: [ { zh: "我想食蛋。", jyut: "ngo5 soeng2 sik6 daan2.", en: "I want to eat eggs." }, { zh: "我朝早食蛋。", jyut: "ngo5 ziu1 zou2 sik6 daan2.", en: "I eat eggs in the morning." } ],
  238: [ { zh: "我想食麵包。", jyut: "ngo5 soeng2 sik6 min6 baau1.", en: "I want to eat bread." }, { zh: "我朝早食麵包。", jyut: "ngo5 ziu1 zou2 sik6 min6 baau1.", en: "I eat bread in the morning." } ],
  239: [ { zh: "碗湯好熱。", jyut: "wun2 tong1 hou2 jit6.", en: "The soup is very hot." }, { zh: "我鍾意飲湯。", jyut: "ngo5 zung1 ji3 jam2 tong1.", en: "I like drinking soup." } ],
  240: [ { zh: "我唔要糖。", jyut: "ngo5 m4 jiu3 tong4.", en: "I don't want sugar." }, { zh: "我鍾意食糖。", jyut: "ngo5 zung1 ji3 sik6 tong4.", en: "I like eating candy." } ],
  241: [ { zh: "唔該畀啲鹽。", jyut: "m4 goi1 bei2 di1 jim4.", en: "Please give me some salt." }, { zh: "我唔要鹽。", jyut: "ngo5 m4 jiu3 jim4.", en: "I don't want salt." } ],
  242: [ { zh: "我唔飲酒。", jyut: "ngo5 m4 jam2 jau2.", en: "I don't drink alcohol." }, { zh: "佢鍾意飲酒。", jyut: "keoi5 zung1 ji3 jam2 jau2.", en: "He/she likes drinking alcohol." } ],
  243: [ { zh: "我想飲果汁。", jyut: "ngo5 soeng2 jam2 gwo2 zap1.", en: "I want to drink juice." }, { zh: "呢杯果汁好好飲。", jyut: "ni1 bui1 gwo2 zap1 hou2 hou2 jam2.", en: "This juice is delicious." } ],
  244: [ { zh: "我食緊早餐。", jyut: "ngo5 sik6 gan2 zou2 caan1.", en: "I'm eating breakfast." }, { zh: "我朝早食麵包做早餐。", jyut: "ngo5 ziu1 zou2 sik6 min6 baau1 zou6 zou2 caan1.", en: "I eat bread for breakfast." } ],
  245: [ { zh: "我而家食午餐。", jyut: "ngo5 ji4 gaa1 sik6 ng5 caan1.", en: "I'm having lunch now." }, { zh: "你食咗午餐未呀？", jyut: "nei5 sik6 zo2 ng5 caan1 mei6 aa3?", en: "Have you had lunch yet?" } ],
  246: [ { zh: "我哋一齊食晚餐。", jyut: "ngo5 dei6 jat1 cai4 sik6 maan5 caan1.", en: "We're having dinner together." }, { zh: "你想食咩做晚餐呀？", jyut: "nei5 soeng2 sik6 me1 zou6 maan5 caan1 aa3?", en: "What do you want for dinner?" } ],
  247: [ { zh: "我鍾意食甜品。", jyut: "ngo5 zung1 ji3 sik6 tim4 ban2.", en: "I like eating dessert." }, { zh: "呢個甜品好好食。", jyut: "ni1 go3 tim4 ban2 hou2 hou2 sik6.", en: "This dessert is delicious." } ],
  248: [ { zh: "呢個蘋果係紅色嘅。", jyut: "ni1 go3 ping4 gwo2 hai6 hung4 sik1 ge3.", en: "This apple is red." }, { zh: "我鍾意食蘋果。", jyut: "ngo5 zung1 ji3 sik6 ping4 gwo2.", en: "I like eating apples." } ],
  249: [ { zh: "香蕉係黃色嘅。", jyut: "hoeng1 ziu1 hai6 wong4 sik1 ge3.", en: "Bananas are yellow." }, { zh: "我鍾意食香蕉。", jyut: "ngo5 zung1 ji3 sik6 hoeng1 ziu1.", en: "I like eating bananas." } ],
  250: [ { zh: "我鍾意食西瓜。", jyut: "ngo5 zung1 ji3 sik6 sai1 gwaa1.", en: "I like eating watermelon." }, { zh: "呢個西瓜好大。", jyut: "ni1 go3 sai1 gwaa1 hou2 daai6.", en: "This watermelon is big." } ],

  // ===== 201-500: Weather (251-260) =====
  251: [ { zh: "聽日會落雨。", jyut: "ting1 jat6 wui5 lok6 jyu5.", en: "It'll rain tomorrow." }, { zh: "落雨，所以我冇出街。", jyut: "lok6 jyu5, so2 ji5 ngo5 mou5 ceot1 gaai1.", en: "It's raining, so I didn't go out." } ],
  252: [ { zh: "今日天氣好熱。", jyut: "gam1 jat6 tin1 hei3 hou2 jit6.", en: "The weather is very hot today." }, { zh: "聽日天氣點樣呀？", jyut: "ting1 jat6 tin1 hei3 dim2 joeng2 aa3?", en: "What's the weather like tomorrow?" } ],
  253: [ { zh: "而家係熱天。", jyut: "ji4 gaa1 hai6 jit6 tin1.", en: "It's hot weather now." }, { zh: "熱天我鍾意飲凍嘢。", jyut: "jit6 tin1 ngo5 zung1 ji3 jam2 dung3 je5.", en: "In hot weather I like drinking cold things." } ],
  254: [ { zh: "而家係凍天。", jyut: "ji4 gaa1 hai6 dung3 tin1.", en: "It's cold weather now." }, { zh: "凍天要着多啲衫。", jyut: "dung3 tin1 jiu3 zoek3 do1 di1 saam1.", en: "In cold weather you need to wear more clothes." } ],
  255: [ { zh: "今日好大風。", jyut: "gam1 jat6 hou2 daai6 fung1.", en: "It's very windy today." }, { zh: "風好大，小心呀。", jyut: "fung1 hou2 daai6, siu2 sam1 aa3.", en: "The wind is strong, be careful." } ],
  256: [ { zh: "雲係白色嘅。", jyut: "wan4 hai6 baak6 sik1 ge3.", en: "Clouds are white." }, { zh: "今日好多雲。", jyut: "gam1 jat6 hou2 do1 wan4.", en: "It's very cloudy today." } ],
  257: [ { zh: "今日太陽好大。", jyut: "gam1 jat6 taai3 joeng4 hou2 daai6.", en: "The sun is very strong today." }, { zh: "太陽出嚟喇。", jyut: "taai3 joeng4 ceot1 lai4 laa3.", en: "The sun has come out." } ],
  258: [ { zh: "夜晚月光好靚。", jyut: "je6 maan5 jyut6 gwong1 hou2 leng3.", en: "The moonlight is beautiful at night." }, { zh: "月光好光。", jyut: "jyut6 gwong1 hou2 gwong1.", en: "The moonlight is bright." } ],
  259: [ { zh: "聽日會唔會落雪呀？", jyut: "ting1 jat6 wui5 m4 wui5 lok6 syut3 aa3?", en: "Will it snow tomorrow?" }, { zh: "香港好少落雪。", jyut: "hoeng1 gong2 hou2 siu2 lok6 syut3.", en: "It rarely snows in Hong Kong." } ],
  260: [ { zh: "聽日會天晴。", jyut: "ting1 jat6 wui5 tin1 cing4.", en: "Tomorrow will be sunny." }, { zh: "我希望聽日天晴。", jyut: "ngo5 hei1 mong6 ting1 jat6 tin1 cing4.", en: "I hope it's sunny tomorrow." } ],

  // ===== 201-500: Clothing (261-270) =====
  261: [ { zh: "你件衫好靚。", jyut: "nei5 gin6 saam1 hou2 leng3.", en: "Your shirt is very nice." }, { zh: "我着緊件新衫。", jyut: "ngo5 zoek3 gan2 gin6 san1 saam1.", en: "I'm wearing a new shirt." } ],
  262: [ { zh: "呢條褲好短。", jyut: "ni1 tiu4 fu3 hou2 dyun2.", en: "These trousers are short." }, { zh: "我想買條褲。", jyut: "ngo5 soeng2 maai5 tiu4 fu3.", en: "I want to buy trousers." } ],
  263: [ { zh: "我買咗對新鞋。", jyut: "ngo5 maai5 zo2 deoi3 san1 haai4.", en: "I bought new shoes." }, { zh: "呢對鞋好舒服。", jyut: "ni1 deoi3 haai4 hou2 syu1 fuk6.", en: "These shoes are comfortable." } ],
  264: [ { zh: "我着緊對襪。", jyut: "ngo5 zoek3 gan2 deoi3 mat6.", en: "I'm wearing socks." }, { zh: "呢對襪好污糟。", jyut: "ni1 deoi3 mat6 hou2 wu1 zou1.", en: "These socks are dirty." } ],
  265: [ { zh: "我嘅帽好靚。", jyut: "ngo5 ge3 mou2 hou2 leng3.", en: "My hat is nice." }, { zh: "呢個帽好舊。", jyut: "ni1 go3 mou2 hou2 gau6.", en: "This hat is old." } ],
  266: [ { zh: "呢個眼鏡好靚。", jyut: "ni1 go3 ngaan5 geng2 hou2 leng3.", en: "These glasses are nice." }, { zh: "我搵唔到眼鏡。", jyut: "ngo5 wan2 m4 dou2 ngaan5 geng2.", en: "I can't find my glasses." } ],
  267: [ { zh: "我搵唔到銀包。", jyut: "ngo5 wan2 m4 dou2 ngan4 baau1.", en: "I can't find my wallet." }, { zh: "你記得帶銀包未呀？", jyut: "nei5 gei3 dak1 daai3 ngan4 baau1 mei6 aa3?", en: "Do you remember to bring your wallet?" } ],
  268: [ { zh: "呢個袋好靚。", jyut: "ni1 go3 doi2 hou2 leng3.", en: "This bag is nice." }, { zh: "我個袋好重。", jyut: "ngo5 go3 doi2 hou2 cung5.", en: "My bag is heavy." } ],
  269: [ { zh: "呢個手錶好靚。", jyut: "ni1 go3 sau2 biu1 hou2 leng3.", en: "This watch is nice." }, { zh: "呢個手錶好貴。", jyut: "ni1 go3 sau2 biu1 hou2 gwai3.", en: "This watch is expensive." } ],
  270: [ { zh: "我着緊件冷衫。", jyut: "ngo5 zoek3 gan2 gin6 laang1 saam1.", en: "I'm wearing a sweater." }, { zh: "凍天要着冷衫。", jyut: "dung3 tin1 jiu3 zoek3 laang1 saam1.", en: "In cold weather you need to wear a sweater." } ],

  // ===== 201-500: Transport (271-280) =====
  271: [ { zh: "呢架車好新。", jyut: "ni1 gaa3 ce1 hou2 san1.", en: "This car is new." }, { zh: "我哋坐車去。", jyut: "ngo5 dei6 co5 ce1 heoi3.", en: "We're going by car." } ],
  272: [ { zh: "巴士好慢。", jyut: "baa1 si2 hou2 maan6.", en: "The bus is slow." }, { zh: "我哋坐巴士去。", jyut: "ngo5 dei6 co5 baa1 si2 heoi3.", en: "We're going by bus." } ],
  273: [ { zh: "地鐵好快。", jyut: "dei6 tit3 hou2 faai3.", en: "The MTR is fast." }, { zh: "我哋坐地鐵去。", jyut: "ngo5 dei6 co5 dei6 tit3 heoi3.", en: "We're going by MTR." } ],
  274: [ { zh: "我哋坐的士去。", jyut: "ngo5 dei6 co5 dik1 si2 heoi3.", en: "We're taking a taxi." }, { zh: "的士好貴。", jyut: "dik1 si2 hou2 gwai3.", en: "Taxis are expensive." } ],
  275: [ { zh: "我哋坐火車去。", jyut: "ngo5 dei6 co5 fo2 ce1 heoi3.", en: "We're going by train." }, { zh: "火車好快。", jyut: "fo2 ce1 hou2 faai3.", en: "The train is fast." } ],
  276: [ { zh: "我哋坐飛機去。", jyut: "ngo5 dei6 co5 fei1 gei1 heoi3.", en: "We're going by plane." }, { zh: "飛機幾點到呀？", jyut: "fei1 gei1 gei2 dim2 dou3 aa3?", en: "What time does the plane arrive?" } ],
  277: [ { zh: "我哋坐船去。", jyut: "ngo5 dei6 co5 syun4 heoi3.", en: "We're going by boat." }, { zh: "隻船好大。", jyut: "zek3 syun4 hou2 daai6.", en: "The boat is big." } ],
  278: [ { zh: "我有一架單車。", jyut: "ngo5 jau5 jat1 gaa3 daan1 ce1.", en: "I have a bicycle." }, { zh: "單車好平。", jyut: "daan1 ce1 hou2 peng4.", en: "Bicycles are cheap." } ],
  279: [ { zh: "我哋行路去。", jyut: "ngo5 dei6 haang4 lou6 heoi3.", en: "We're walking there." }, { zh: "行路去要幾耐呀？", jyut: "haang4 lou6 heoi3 jiu3 gei2 noi6 aa3?", en: "How long does it take to walk there?" } ],
  280: [ { zh: "塞車好麻煩。", jyut: "sak1 ce1 hou2 maa4 faan4.", en: "Traffic jams are troublesome." }, { zh: "我遲到因為塞車。", jyut: "ngo5 ci4 dou3 jan1 wai6 sak1 ce1.", en: "I'm late because of traffic." } ],

  // ===== 201-500: Shopping & Money (281-295) =====
  281: [ { zh: "我冇錢。", jyut: "ngo5 mou5 cin2.", en: "I don't have money." }, { zh: "你有幾多錢呀？", jyut: "nei5 jau5 gei2 do1 cin2 aa3?", en: "How much money do you have?" } ],
  282: [ { zh: "呢個幾多錢呀？", jyut: "ni1 go3 gei2 do1 cin2 aa3?", en: "How much is this?" }, { zh: "呢對鞋幾多錢呀？", jyut: "ni1 deoi3 haai4 gei2 do1 cin2 aa3?", en: "How much are these shoes?" } ],
  283: [ { zh: "唔該找錢。", jyut: "m4 goi1 zaau2 cin2.", en: "Please give me change." }, { zh: "佢找錯咗錢。", jyut: "keoi5 zaau2 co3 zo2 cin2.", en: "He/she gave the wrong change." } ],
  284: [ { zh: "我冇現金。", jyut: "ngo5 mou5 jin6 gam1.", en: "I don't have cash." }, { zh: "呢度收唔收現金呀？", jyut: "ni1 dou6 sau1 m4 sau1 jin6 gam1 aa3?", en: "Do you accept cash here?" } ],
  285: [ { zh: "我用信用卡畀錢。", jyut: "ngo5 jung6 seon3 jung6 kaat1 bei2 cin2.", en: "I'll pay with a credit card." }, { zh: "呢度收唔收信用卡呀？", jyut: "ni1 dou6 sau1 m4 sau1 seon3 jung6 kaat1 aa3?", en: "Do you accept credit cards here?" } ],
  286: [ { zh: "呢個有折扣。", jyut: "ni1 go3 jau5 zit3 kau3.", en: "This has a discount." }, { zh: "幾多折扣呀？", jyut: "gei2 do1 zit3 kau3 aa3?", en: "How much discount?" } ],
  287: [ { zh: "唔該畀張收據我。", jyut: "m4 goi1 bei2 zoeng1 sau1 geoi3 ngo5.", en: "Please give me a receipt." }, { zh: "我唔見咗張收據。", jyut: "ngo5 m4 gin3 zo2 zoeng1 sau1 geoi3.", en: "I lost the receipt." } ],
  288: [ { zh: "我想買嘢。", jyut: "ngo5 soeng2 maai5 je5.", en: "I want to buy something." }, { zh: "我哋去街市買嘢。", jyut: "ngo5 dei6 heoi3 gaai1 si5 maai5 je5.", en: "We're going to the market to shop." } ],
  289: [ { zh: "間舖大減價。", jyut: "gaan1 pou3 daai6 gaam2 gaa3.", en: "The shop is having a sale." }, { zh: "大減價，好平。", jyut: "daai6 gaam2 gaa3, hou2 peng4.", en: "It's on sale, very cheap." } ],
  290: [ { zh: "呢個好抵。", jyut: "ni1 go3 hou2 dai2.", en: "This is a great deal." }, { zh: "呢對鞋好抵。", jyut: "ni1 deoi3 haai4 hou2 dai2.", en: "These shoes are a great deal." } ],
  291: [ { zh: "我有好多銀仔。", jyut: "ngo5 jau5 hou2 do1 ngan4 zai2.", en: "I have a lot of coins." }, { zh: "唔該畀啲銀仔我。", jyut: "m4 goi1 bei2 di1 ngan4 zai2 ngo5.", en: "Please give me some coins." } ],
  292: [ { zh: "我有一張紙幣。", jyut: "ngo5 jau5 jat1 zoeng1 zi2 bai6.", en: "I have a banknote." }, { zh: "呢張紙幣好舊。", jyut: "ni1 zoeng1 zi2 bai6 hou2 gau6.", en: "This banknote is old." } ],
  293: [ { zh: "提款機喺邊度呀？", jyut: "tai4 fun2 gei1 hai2 bin1 dou6 aa3?", en: "Where is the ATM?" }, { zh: "我要用提款機攞錢。", jyut: "ngo5 jiu3 jung6 tai4 fun2 gei1 lo2 cin2.", en: "I need to use the ATM to get money." } ],
  294: [ { zh: "我想存錢。", jyut: "ngo5 soeng2 cyun4 cin2.", en: "I want to save money." }, { zh: "我成日存錢。", jyut: "ngo5 sing4 jat6 cyun4 cin2.", en: "I save money all the time." } ],
  295: [ { zh: "我使咗好多錢。", jyut: "ngo5 sai2 zo2 hou2 do1 cin2.", en: "I spent a lot of money." }, { zh: "唔好使咁多錢。", jyut: "m4 hou2 sai2 gam3 do1 cin2.", en: "Don't spend so much money." } ],

  // ===== 201-500: Tech (296-305) =====
  296: [ { zh: "我可以用你個電話呀？", jyut: "ngo5 ho2 ji5 jung6 nei5 go3 din6 waa2 aa3?", en: "Can I use your phone?" }, { zh: "唔該打電話畀我。", jyut: "m4 goi1 daa2 din6 waa2 bei2 ngo5.", en: "Please call me." } ],
  297: [ { zh: "我搵唔到手機。", jyut: "ngo5 wan2 m4 dou2 sau2 gei1.", en: "I can't find my phone." }, { zh: "呢個手機好貴。", jyut: "ni1 go3 sau2 gei1 hou2 gwai3.", en: "This phone is expensive." } ],
  298: [ { zh: "我而家用緊電腦。", jyut: "ngo5 ji4 gaa1 jung6 gan2 din6 nou5.", en: "I'm using the computer now." }, { zh: "我電腦好舊。", jyut: "ngo5 din6 nou5 hou2 gau6.", en: "My computer is old." } ],
  299: [ { zh: "呢度有冇網呀？", jyut: "ni1 dou6 jau5 mou5 mong5 aa3?", en: "Is there internet here?" }, { zh: "我而家上緊網。", jyut: "ngo5 ji4 gaa1 soeng5 gan2 mong5.", en: "I'm online right now." } ],
  300: [ { zh: "我而家上緊網。", jyut: "ngo5 ji4 gaa1 soeng5 gan2 mong5.", en: "I'm online right now." }, { zh: "我鍾意上網睇嘢。", jyut: "ngo5 zung1 ji3 soeng5 mong5 tai2 je5.", en: "I like browsing online." } ],
  301: [ { zh: "唔該打電話畀我。", jyut: "m4 goi1 daa2 din6 waa2 bei2 ngo5.", en: "Please call me." }, { zh: "我而家打緊電話。", jyut: "ngo5 ji4 gaa1 daa2 gan2 din6 waa2.", en: "I'm on the phone right now." } ],
  302: [ { zh: "你收到我個短訊未呀？", jyut: "nei5 sau1 dou2 ngo5 go3 dyun2 seon3 mei6 aa3?", en: "Did you get my text message?" }, { zh: "我而家寫緊短訊。", jyut: "ngo5 ji4 gaa1 se2 gan2 dyun2 seon3.", en: "I'm writing a text message right now." } ],
  303: [ { zh: "我而家寫緊電郵。", jyut: "ngo5 ji4 gaa1 se2 gan2 din6 jau4.", en: "I'm writing an email right now." }, { zh: "你收到我封電郵未呀？", jyut: "nei5 sau1 dou2 ngo5 fung1 din6 jau4 mei6 aa3?", en: "Did you get my email?" } ],
  304: [ { zh: "我有一部相機。", jyut: "ngo5 jau5 jat1 bou6 soeng2 gei1.", en: "I have a camera." }, { zh: "呢部相機好貴。", jyut: "ni1 bou6 soeng2 gei1 hou2 gwai3.", en: "This camera is expensive." } ],
  305: [ { zh: "我想睇電視。", jyut: "ngo5 soeng2 tai2 din6 si6.", en: "I want to watch TV." }, { zh: "我而家好少睇電視。", jyut: "ngo5 ji4 gaa1 hou2 siu2 tai2 din6 si6.", en: "I rarely watch TV now." } ],

  // ===== 201-500: Directions (321-330) =====
  321: [ { zh: "你上嚟啦。", jyut: "nei5 soeng5 lai4 laa1.", en: "Come up." }, { zh: "我上緊樓梯。", jyut: "ngo5 soeng5 gan2 lau4 tai1.", en: "I'm going up the stairs." } ],
  322: [ { zh: "喺枱下面。", jyut: "hai2 toi2 haa6 min6.", en: "It's under the table." }, { zh: "落樓下等我。", jyut: "lok6 lau4 haa6 dang2 ngo5.", en: "Come downstairs and wait for me." } ],
  323: [ { zh: "轉左。", jyut: "zyun3 zo2.", en: "Turn left." }, { zh: "喺你左手邊。", jyut: "hai2 nei5 zo2 sau2 bin1.", en: "It's on your left side." } ],
  324: [ { zh: "轉右。", jyut: "zyun3 jau6.", en: "Turn right." }, { zh: "喺你右手邊。", jyut: "hai2 nei5 jau6 sau2 bin1.", en: "It's on your right side." } ],
  325: [ { zh: "喺你前面。", jyut: "hai2 nei5 cin4 min6.", en: "It's in front of you." }, { zh: "企喺前面。", jyut: "kei5 hai2 cin4 min6.", en: "Stand in front." } ],
  326: [ { zh: "喺你後面。", jyut: "hai2 nei5 hau6 min6.", en: "It's behind you." }, { zh: "企喺後面。", jyut: "kei5 hai2 hau6 min6.", en: "Stand at the back." } ],
  327: [ { zh: "喺個袋入面。", jyut: "hai2 go3 doi2 jap6 min6.", en: "It's inside the bag." }, { zh: "入面好熱。", jyut: "jap6 min6 hou2 jit6.", en: "It's hot inside." } ],
  328: [ { zh: "出面落緊雨。", jyut: "ceot1 min6 lok6 gan2 jyu5.", en: "It's raining outside." }, { zh: "出面好凍。", jyut: "ceot1 min6 hou2 dung3.", en: "It's cold outside." } ],
  329: [ { zh: "我住喺佢隔籬。", jyut: "ngo5 zyu6 hai2 keoi5 gaak3 lei4.", en: "I live next to him/her." }, { zh: "間舖喺銀行隔籬。", jyut: "gaan1 pou3 hai2 ngan4 hong4 gaak3 lei4.", en: "The shop is next to the bank." } ],
  330: [ { zh: "企喺中間。", jyut: "kei5 hai2 zung1 gaan1.", en: "Stand in the middle." }, { zh: "喺兩個中間。", jyut: "hai2 loeng5 go3 zung1 gaan1.", en: "It's between the two." } ],

  // ===== 201-500: Days of the Week (346-352) =====
  346: [ { zh: "我星期一返學。", jyut: "ngo5 sing1 kei4 jat1 faan1 hok6.", en: "I go to school on Monday." }, { zh: "今日係星期一。", jyut: "gam1 jat6 hai6 sing1 kei4 jat1.", en: "Today is Monday." } ],
  347: [ { zh: "我星期二返學。", jyut: "ngo5 sing1 kei4 ji6 faan1 hok6.", en: "I go to school on Tuesday." }, { zh: "聽日係星期二。", jyut: "ting1 jat6 hai6 sing1 kei4 ji6.", en: "Tomorrow is Tuesday." } ],
  348: [ { zh: "我星期三返學。", jyut: "ngo5 sing1 kei4 saam1 faan1 hok6.", en: "I go to school on Wednesday." }, { zh: "今日係星期三。", jyut: "gam1 jat6 hai6 sing1 kei4 saam1.", en: "Today is Wednesday." } ],
  349: [ { zh: "我星期四返學。", jyut: "ngo5 sing1 kei4 sei3 faan1 hok6.", en: "I go to school on Thursday." }, { zh: "聽日係星期四。", jyut: "ting1 jat6 hai6 sing1 kei4 sei3.", en: "Tomorrow is Thursday." } ],
  350: [ { zh: "我星期五返學。", jyut: "ngo5 sing1 kei4 ng5 faan1 hok6.", en: "I go to school on Friday." }, { zh: "今日係星期五，聽日放假！", jyut: "gam1 jat6 hai6 sing1 kei4 ng5, ting1 jat6 fong3 gaa3!", en: "It's Friday, tomorrow's a day off!" } ],
  351: [ { zh: "星期六我唔使返學。", jyut: "sing1 kei4 luk6 ngo5 m4 sai2 faan1 hok6.", en: "I don't have school on Saturday." }, { zh: "今日係星期六。", jyut: "gam1 jat6 hai6 sing1 kei4 luk6.", en: "Today is Saturday." } ],
  352: [ { zh: "星期日我哋去公園。", jyut: "sing1 kei4 jat6 ngo5 dei6 heoi3 gung1 jyun4.", en: "We're going to the park on Sunday." }, { zh: "今日係星期日。", jyut: "gam1 jat6 hai6 sing1 kei4 jat6.", en: "Today is Sunday." } ],

  // ===== 201-500: More Verbs (353-400, minus 362/363 above) =====
  353: [ { zh: "我哋開始啦。", jyut: "ngo5 dei6 hoi1 ci2 laa1.", en: "Let's start." }, { zh: "電影幾點開始呀？", jyut: "din6 jing2 gei2 dim2 hoi1 ci2 aa3?", en: "What time does the movie start?" } ],
  354: [ { zh: "我食完喇。", jyut: "ngo5 sik6 jyun4 laa3.", en: "I've finished eating." }, { zh: "你做完功課未呀？", jyut: "nei5 zou6 jyun4 gung1 fo3 mei6 aa3?", en: "Have you finished your homework?" } ],
  355: [ { zh: "唔該停呢度。", jyut: "m4 goi1 ting4 ni1 dou6.", en: "Please stop here." }, { zh: "架車停咗喺門口。", jyut: "gaa3 ce1 ting4 zo2 hai2 mun4 hau2.", en: "The car stopped at the doorway." } ],
  356: [ { zh: "我哋繼續行啦。", jyut: "ngo5 dei6 gai3 zuk6 haang4 laa1.", en: "Let's continue walking." }, { zh: "你可以繼續講。", jyut: "nei5 ho2 ji5 gai3 zuk6 gong2.", en: "You can continue speaking." } ],
  357: [ { zh: "你可唔可以改呀？", jyut: "nei5 ho2 m4 ho2 ji5 goi2 aa3?", en: "Can you change it?" }, { zh: "佢改咗個名。", jyut: "keoi5 goi2 zo2 go3 meng2.", en: "He/she changed his/her name." } ],
  358: [ { zh: "你揀邊個呀？", jyut: "nei5 gaan2 bin1 go3 aa3?", en: "Which one do you choose?" }, { zh: "我揀咗紅色。", jyut: "ngo5 gaan2 zo2 hung4 sik1.", en: "I chose red." } ],
  359: [ { zh: "你哋比較邊個高呀？", jyut: "nei5 dei6 bei2 gaau3 bin1 go3 gou1 aa3?", en: "Compare who's taller." }, { zh: "呢個比較平。", jyut: "ni1 go3 bei2 gaau3 peng4.", en: "This one is relatively cheap." } ],
  360: [ { zh: "我決定咗喇。", jyut: "ngo5 kyut3 ding6 zo2 laa3.", en: "I've decided." }, { zh: "你決定去邊度呀？", jyut: "nei5 kyut3 ding6 heoi3 bin1 dou6 aa3?", en: "Where have you decided to go?" } ],
  361: [ { zh: "我準備緊食飯。", jyut: "ngo5 zeon2 bei6 gan2 sik6 faan6.", en: "I'm getting ready to eat." }, { zh: "你準備好未呀？", jyut: "nei5 zeon2 bei6 hou2 mei6 aa3?", en: "Are you ready yet?" } ],
  364: [ { zh: "我相信你。", jyut: "ngo5 soeng1 seon3 nei5.", en: "I believe you." }, { zh: "我相信佢會嚟。", jyut: "ngo5 soeng1 seon3 keoi5 wui5 lai4.", en: "I believe he/she will come." } ],
  365: [ { zh: "我明白喇。", jyut: "ngo5 ming4 baak6 laa3.", en: "I understand." }, { zh: "你明唔明白呀？", jyut: "nei5 ming4 m4 ming4 baak6 aa3?", en: "Do you understand?" } ],
  366: [ { zh: "你可唔可以解釋畀我聽呀？", jyut: "nei5 ho2 m4 ho2 ji5 gaai2 sik1 bei2 ngo5 teng1 aa3?", en: "Can you explain it to me?" }, { zh: "老師解釋得好好。", jyut: "lou5 si1 gaai2 sik1 dak1 hou2 hou2.", en: "The teacher explains very well." } ],
  367: [ { zh: "我想問你嘢。", jyut: "ngo5 soeng2 man6 nei5 je5.", en: "I want to ask you something." }, { zh: "你可以問老師。", jyut: "nei5 ho2 ji5 man6 lou5 si1.", en: "You can ask the teacher." } ],
  368: [ { zh: "你答啦。", jyut: "nei5 daap3 laa1.", en: "Go on, answer." }, { zh: "我答唔到。", jyut: "ngo5 daap3 m4 dou2.", en: "I can't answer." } ],
  369: [ { zh: "你叫咩名呀？", jyut: "nei5 giu3 me1 meng2 aa3?", en: "What's your name?" }, { zh: "我哋叫多杯茶。", jyut: "ngo5 dei6 giu3 do1 bui1 caa4.", en: "Let's order another cup of tea." } ],
  370: [ { zh: "我睇見佢喇。", jyut: "ngo5 tai2 gin3 keoi5 laa3.", en: "I see him/her." }, { zh: "你睇唔睇見呀？", jyut: "nei5 tai2 m4 tai2 gin3 aa3?", en: "Can you see it?" } ],
  371: [ { zh: "我聽見佢喇。", jyut: "ngo5 teng1 gin3 keoi5 laa3.", en: "I heard him/her." }, { zh: "你聽唔聽見呀？", jyut: "nei5 teng1 m4 teng1 gin3 aa3?", en: "Can you hear it?" } ],
  372: [ { zh: "我感覺好攰。", jyut: "ngo5 gam2 gok3 hou2 gui6.", en: "I feel very tired." }, { zh: "你感覺點樣呀？", jyut: "nei5 gam2 gok3 dim2 joeng2 aa3?", en: "How do you feel?" } ],
  373: [ { zh: "我覺得好開心。", jyut: "ngo5 gok3 dak1 hou2 hoi1 sam1.", en: "I feel very happy." }, { zh: "你覺得點樣呀？", jyut: "nei5 gok3 dak1 dim2 joeng2 aa3?", en: "What do you think?" } ],
  374: [ { zh: "小心呀！", jyut: "siu2 sam1 aa3!", en: "Be careful!" }, { zh: "你一定要小心。", jyut: "nei5 jat1 ding6 jiu3 siu2 sam1.", en: "You must definitely be careful." } ],
  375: [ { zh: "唔該注意。", jyut: "m4 goi1 zyu3 ji3.", en: "Please pay attention." }, { zh: "你要注意安全。", jyut: "nei5 jiu3 zyu3 ji3 on1 cyun4.", en: "You need to pay attention to safety." } ],
  376: [ { zh: "我要檢查。", jyut: "ngo5 jiu3 gim2 caa4.", en: "I need to check." }, { zh: "醫生幫我檢查身體。", jyut: "ji1 sang1 bong1 ngo5 gim2 caa4 san1 tai2.", en: "The doctor checked my body." } ],
  377: [ { zh: "我要修理架車。", jyut: "ngo5 jiu3 sau1 lei5 gaa3 ce1.", en: "I need to repair the car." }, { zh: "邊個識修理電腦呀？", jyut: "bin1 go3 sik1 sau1 lei5 din6 nou5 aa3?", en: "Who knows how to repair computers?" } ],
  378: [ { zh: "我要清潔間房。", jyut: "ngo5 jiu3 cing1 git3 gaan1 fong2.", en: "I need to clean the room." }, { zh: "呢度好清潔。", jyut: "ni1 dou6 hou2 cing1 git3.", en: "This place is very clean." } ],
  379: [ { zh: "唔該洗手。", jyut: "m4 goi1 sai2 sau2.", en: "Please wash your hands." }, { zh: "我洗緊衫。", jyut: "ngo5 sai2 gan2 saam1.", en: "I'm washing clothes." } ],
  380: [ { zh: "媽媽煮飯好好食。", jyut: "maa4 maa1 zyu2 faan6 hou2 hou2 sik6.", en: "Mum cooks delicious food." }, { zh: "我唔識煮嘢食。", jyut: "ngo5 m4 sik1 zyu2 je5 sik6.", en: "I don't know how to cook." } ],
  381: [ { zh: "唔該幫我切菜。", jyut: "m4 goi1 bong1 ngo5 cit3 coi3.", en: "Please help me cut the vegetables." }, { zh: "小心切到手。", jyut: "siu2 sam1 cit3 dou2 sau2.", en: "Be careful not to cut your hand." } ],
  382: [ { zh: "唔該加啲糖。", jyut: "m4 goi1 gaa1 di1 tong4.", en: "Please add some sugar." }, { zh: "呢個加埋幾多錢呀？", jyut: "ni1 go3 gaa1 maai4 gei2 do1 cin2 aa3?", en: "How much does this add up to?" } ],
  383: [ { zh: "唔該幫我減價。", jyut: "m4 goi1 bong1 ngo5 gaam2 gaa3.", en: "Please give me a discount." }, { zh: "十減三係幾多呀？", jyut: "sap6 gaam2 saam1 hai6 gei2 do1 aa3?", en: "What is ten minus three?" } ],
  384: [ { zh: "唔該幫我計數。", jyut: "m4 goi1 bong1 ngo5 gai3 sou3.", en: "Please help me calculate." }, { zh: "我哋計埋幾多錢呀？", jyut: "ngo5 dei6 gai3 maai4 gei2 do1 cin2 aa3?", en: "How much does it all add up to?" } ],
  385: [ { zh: "我比你高。", jyut: "ngo5 bei2 nei5 gou1.", en: "I'm taller than you." }, { zh: "呢個比嗰個平。", jyut: "ni1 go3 bei2 go2 go3 peng4.", en: "This one is cheaper than that one." } ],
  386: [ { zh: "唔該借枝筆畀我。", jyut: "m4 goi1 ze3 zi1 bat1 bei2 ngo5.", en: "Please lend me a pen." }, { zh: "我可以借你個電話呀？", jyut: "ngo5 ho2 ji5 ze3 nei5 go3 din6 waa2 aa3?", en: "Can I borrow your phone?" } ],
  387: [ { zh: "我要還書。", jyut: "ngo5 jiu3 waan4 syu1.", en: "I need to return the book." }, { zh: "你幾時還我呀？", jyut: "nei5 gei2 si4 waan4 ngo5 aa3?", en: "When will you return it to me?" } ],
  388: [ { zh: "我想送啲嘢畀你。", jyut: "ngo5 soeng2 sung3 di1 je5 bei2 nei5.", en: "I want to give you something." }, { zh: "唔該送我去機場。", jyut: "m4 goi1 sung3 ngo5 heoi3 gei1 coeng4.", en: "Please take me to the airport." } ],
  389: [ { zh: "我去接你。", jyut: "ngo5 heoi3 zip3 nei5.", en: "I'm going to pick you up." }, { zh: "我去機場接佢。", jyut: "ngo5 heoi3 gei1 coeng4 zip3 keoi5.", en: "I'm going to the airport to pick him/her up." } ],
  390: [ { zh: "我要寄嘢返屋企。", jyut: "ngo5 jiu3 gei3 je5 faan1 uk1 kei2.", en: "I need to mail something home." }, { zh: "你寄咗未呀？", jyut: "nei5 gei3 zo2 mei6 aa3?", en: "Have you mailed it yet?" } ],
  391: [ { zh: "我收到你封電郵喇。", jyut: "ngo5 sau1 dou2 nei5 fung1 din6 jau4 laa3.", en: "I received your email." }, { zh: "你收到我個短訊未呀？", jyut: "nei5 sau1 dou2 ngo5 go3 dyun2 seon3 mei6 aa3?", en: "Did you get my text message?" } ],
  392: [ { zh: "我想存錢。", jyut: "ngo5 soeng2 cyun4 cin2.", en: "I want to save money." }, { zh: "我要存啲錢。", jyut: "ngo5 jiu3 cyun4 di1 cin2.", en: "I need to save some money." } ],
  393: [ { zh: "我想省啲錢。", jyut: "ngo5 soeng2 saang2 di1 cin2.", en: "I want to save some money." }, { zh: "坐地鐵可以省錢。", jyut: "co5 dei6 tit3 ho2 ji5 saang2 cin2.", en: "Taking the MTR can save money." } ],
  394: [ { zh: "我想賺多啲錢。", jyut: "ngo5 soeng2 zaan6 do1 di1 cin2.", en: "I want to earn more money." }, { zh: "佢賺好多錢。", jyut: "keoi5 zaan6 hou2 do1 cin2.", en: "He/she earns a lot of money." } ],
  395: [ { zh: "我輸咗。", jyut: "ngo5 syu1 zo2.", en: "I lost." }, { zh: "我打波輸咗。", jyut: "ngo5 daa2 bo1 syu1 zo2.", en: "I lost the ball game." } ],
  396: [ { zh: "我贏咗！", jyut: "ngo5 jeng4 zo2!", en: "I won!" }, { zh: "邊個贏咗呀？", jyut: "bin1 go3 jeng4 zo2 aa3?", en: "Who won?" } ],
  397: [ { zh: "我哋去睇比賽。", jyut: "ngo5 dei6 heoi3 tai2 bei2 coi3.", en: "We're going to watch the competition." }, { zh: "比賽幾點開始呀？", jyut: "bei2 coi3 gei2 dim2 hoi1 ci2 aa3?", en: "What time does the competition start?" } ],
  398: [ { zh: "我要練習廣東話。", jyut: "ngo5 jiu3 lin6 zaap6 gwong2 dung1 waa2.", en: "I need to practice Cantonese." }, { zh: "你成日都練習呀？", jyut: "nei5 sing4 jat6 dou1 lin6 zaap6 aa3?", en: "Do you practice all the time?" } ],
  399: [ { zh: "我哋而家訓練緊。", jyut: "ngo5 dei6 ji4 gaa1 fan3 lin6 gan2.", en: "We're training right now." }, { zh: "教練訓練我哋。", jyut: "gaau3 lin6 fan3 lin6 ngo5 dei6.", en: "The coach trains us." } ],
  400: [ { zh: "你應該休息。", jyut: "nei5 jing1 goi1 jau1 sik1.", en: "You should rest." }, { zh: "我想休息一陣。", jyut: "ngo5 soeng2 jau1 sik1 jat1 zan6.", en: "I want to rest for a while." } ],

  // Cooking methods (restaurant pack): sentence 2 names a real dish cooked
  // that way, so the method sticks together with vocabulary you already
  // know from the menu-item lessons instead of a generic filler sentence.
  2080: [ // 蒸 to steam
    { zh: "你可唔可以蒸呀？", jyut: "nei5 ho2 m4 ho2 ji5 zing1 aa3?", en: "Can you steam it?" },
    { zh: "蝦餃係蒸嘅。", jyut: "haa1 gaau2 hai6 zing1 ge3.", en: "Shrimp dumplings are steamed." },
  ],
  2081: [ // 炒 to stir-fry
    { zh: "我而家想炒。", jyut: "ngo5 ji4 gaa1 soeng2 caau2.", en: "I want to stir-fry now." },
    { zh: "呢碟係干炒牛河。", jyut: "ni1 dip2 hai6 gon1 caau2 ngau4 ho2.", en: "This plate is dry-fried beef ho fun." },
  ],
  2082: [ // 炸 to deep-fry
    { zh: "佢鍾意炸。", jyut: "keoi5 zung1 ji3 zaa3.", en: "He/she likes to deep-fry." },
    { zh: "油炸鬼係炸嘅。", jyut: "jau4 zaa3 gwai2 hai6 zaa3 ge3.", en: "Chinese crullers are deep-fried." },
  ],
  2083: [ // 燉 to stew / double-boil
    { zh: "我哋今日要燉。", jyut: "ngo5 dei6 gam1 jat6 jiu3 dan6.", en: "We need to stew it today." },
    { zh: "呢個湯燉咗好耐。", jyut: "ni1 go3 tong1 dan6 zo2 hou2 noi6.", en: "This soup has been stewing for a long time." },
  ],
  2084: [ // 焗 to bake
    { zh: "我而家想焗。", jyut: "ngo5 ji4 gaa1 soeng2 guk6.", en: "I want to bake now." },
    { zh: "我想食焗豬扒飯。", jyut: "ngo5 soeng2 sik6 guk6 zyu1 paa2 faan6.", en: "I want to eat baked pork chop rice." },
  ],
  2085: [ // 灼 to blanch
    { zh: "你可唔可以灼呀？", jyut: "nei5 ho2 m4 ho2 ji5 coek3 aa3?", en: "Can you blanch it?" },
    { zh: "我想食灼菜心。", jyut: "ngo5 soeng2 sik6 coek3 coi3 sam1.", en: "I want to eat blanched choy sum." },
  ],
  2086: [ // 燜 to braise
    { zh: "佢鍾意燜。", jyut: "keoi5 zung1 ji3 mun6.", en: "He/she likes to braise." },
    { zh: "我想食燜牛腩。", jyut: "ngo5 soeng2 sik6 mun6 ngau4 naam5.", en: "I want to eat braised beef brisket." },
  ],
  2087: [ // 清蒸 steamed plain (usually fish)
    { zh: "我鍾意清蒸。", jyut: "ngo5 zung1 ji3 cing1 zing1.", en: "I like food steamed plain." },
    { zh: "我想食清蒸魚。", jyut: "ngo5 soeng2 sik6 cing1 zing1 jyu2.", en: "I want to eat steamed fish." },
  ],

  // ===== 201-500: Everyday Nouns (401-460) =====
  401: [ { zh: "我鍾意睇電視劇。", jyut: "ngo5 zung1 ji3 tai2 din6 si6 kek6.", en: "I like watching TV dramas." }, { zh: "呢個電視劇好好睇。", jyut: "ni1 go3 din6 si6 kek6 hou2 hou2 tai2.", en: "This TV drama is very good." } ],
  402: [ { zh: "我想睇電影。", jyut: "ngo5 soeng2 tai2 din6 jing2.", en: "I want to watch a movie." }, { zh: "呢個電影好好睇。", jyut: "ni1 go3 din6 jing2 hou2 hou2 tai2.", en: "This movie is very good." } ],
  403: [ { zh: "我鍾意聽音樂。", jyut: "ngo5 zung1 ji3 teng1 jam1 ngok6.", en: "I like listening to music." }, { zh: "呢個音樂好好聽。", jyut: "ni1 go3 jam1 ngok6 hou2 hou2 teng1.", en: "This music sounds great." } ],
  404: [ { zh: "我鍾意聽歌。", jyut: "ngo5 zung1 ji3 teng1 go1.", en: "I like listening to songs." }, { zh: "呢個歌好好聽。", jyut: "ni1 go3 go1 hou2 hou2 teng1.", en: "This song sounds great." } ],
  405: [ { zh: "我鍾意讀書。", jyut: "ngo5 zung1 ji3 duk6 syu1.", en: "I like reading books." }, { zh: "呢本書好舊。", jyut: "ni1 bun2 syu1 hou2 gau6.", en: "This book is old." } ],
  406: [ { zh: "我睇緊報紙。", jyut: "ngo5 tai2 gan2 bou3 zi2.", en: "I'm reading the newspaper." }, { zh: "呢張報紙好平。", jyut: "ni1 zoeng1 bou3 zi2 hou2 peng4.", en: "This newspaper is cheap." } ],
  407: [ { zh: "我鍾意睇雜誌。", jyut: "ngo5 zung1 ji3 tai2 zaap6 zi3.", en: "I like reading magazines." }, { zh: "呢本雜誌好貴。", jyut: "ni1 bun2 zaap6 zi3 hou2 gwai3.", en: "This magazine is expensive." } ],
  408: [ { zh: "唔該借枝筆畀我。", jyut: "m4 goi1 ze3 zi1 bat1 bei2 ngo5.", en: "Please lend me a pen." }, { zh: "我搵唔到枝筆。", jyut: "ngo5 wan2 m4 dou2 zi1 bat1.", en: "I can't find my pen." } ],
  409: [ { zh: "我要三張紙。", jyut: "ngo5 jiu3 saam1 zoeng1 zi2.", en: "I need three sheets of paper." }, { zh: "唔該畀張紙我。", jyut: "m4 goi1 bei2 zoeng1 zi2 ngo5.", en: "Please give me a sheet of paper." } ],
  410: [ { zh: "呢張枱好矮。", jyut: "ni1 zoeng1 toi2 hou2 ai2.", en: "This table is low." }, { zh: "喺枱下面。", jyut: "hai2 toi2 haa6 min6.", en: "It's under the table." } ],
  411: [ { zh: "呢張椅好舒服。", jyut: "ni1 zoeng1 ji2 hou2 syu1 fuk6.", en: "This chair is comfortable." }, { zh: "唔該坐張椅。", jyut: "m4 goi1 co5 zoeng1 ji2.", en: "Please sit on the chair." } ],
  412: [ { zh: "我瞓喺張床度。", jyut: "ngo5 fan3 hai2 zoeng1 cong4 dou6.", en: "I sleep on the bed." }, { zh: "呢張床好舒服。", jyut: "ni1 zoeng1 cong4 hou2 syu1 fuk6.", en: "This bed is comfortable." } ],
  413: [ { zh: "唔該幫我開門。", jyut: "m4 goi1 bong1 ngo5 hoi1 mun4.", en: "Please help me open the door." }, { zh: "唔該閂門。", jyut: "m4 goi1 saan1 mun4.", en: "Please close the door." } ],
  414: [ { zh: "你閂咗窗未呀？", jyut: "nei5 saan1 zo2 coeng1 mei6 aa3?", en: "Have you closed the window yet?" }, { zh: "唔該開窗。", jyut: "m4 goi1 hoi1 coeng1.", en: "Please open the window." } ],
  415: [ { zh: "唔該開燈。", jyut: "m4 goi1 hoi1 dang1.", en: "Please turn on the light." }, { zh: "唔該閂燈。", jyut: "m4 goi1 saan1 dang1.", en: "Please turn off the light." } ],
  416: [ { zh: "唔該開冷氣。", jyut: "m4 goi1 hoi1 laang5 hei3.", en: "Please turn on the AC." }, { zh: "冷氣好凍。", jyut: "laang5 hei3 hou2 dung3.", en: "The AC is very cold." } ],
  417: [ { zh: "媽媽喺廚房煮飯。", jyut: "maa4 maa1 hai2 cyu4 fong2 zyu2 faan6.", en: "Mum is cooking in the kitchen." }, { zh: "廚房好乾淨。", jyut: "cyu4 fong2 hou2 gon1 zeng6.", en: "The kitchen is clean." } ],
  418: [ { zh: "我哋喺客廳睇電視。", jyut: "ngo5 dei6 hai2 haak3 teng1 tai2 din6 si6.", en: "We're watching TV in the living room." }, { zh: "客廳好大。", jyut: "haak3 teng1 hou2 daai6.", en: "The living room is big." } ],
  419: [ { zh: "浴室喺邊度呀？", jyut: "juk6 sat1 hai2 bin1 dou6 aa3?", en: "Where is the bathroom?" }, { zh: "浴室好乾淨。", jyut: "juk6 sat1 hou2 gon1 zeng6.", en: "The bathroom is clean." } ],
  420: [ { zh: "屋企有個花園。", jyut: "uk1 kei2 jau5 go3 faa1 jyun4.", en: "There's a garden at home." }, { zh: "花園有好多花。", jyut: "faa1 jyun4 jau5 hou2 do1 faa1.", en: "The garden has a lot of flowers." } ],
  421: [ { zh: "我鍾意動物。", jyut: "ngo5 zung1 ji3 dung6 mat6.", en: "I like animals." }, { zh: "公園有好多動物。", jyut: "gung1 jyun4 jau5 hou2 do1 dung6 mat6.", en: "The park has a lot of animals." } ],
  422: [ { zh: "我有一隻貓。", jyut: "ngo5 jau5 jat1 zek3 maau1.", en: "I have a cat." }, { zh: "隻貓好得意。", jyut: "zek3 maau1 hou2 dak1 ji3.", en: "The cat is cute." } ],
  423: [ { zh: "隻狗好大。", jyut: "zek3 gau2 hou2 daai6.", en: "The dog is big." }, { zh: "隻狗好得意。", jyut: "zek3 gau2 hou2 dak1 ji3.", en: "The dog is cute." } ],
  424: [ { zh: "我聽到雀仔叫。", jyut: "ngo5 teng1 dou2 zoek3 zai2 giu3.", en: "I hear a bird chirping." }, { zh: "隻雀仔好得意。", jyut: "zek3 zoek3 zai2 hou2 dak1 ji3.", en: "The bird is cute." } ],
  425: [ { zh: "我屋企有老鼠。", jyut: "ngo5 uk1 kei2 jau5 lou5 syu2.", en: "There's a mouse at my home." }, { zh: "我好驚老鼠。", jyut: "ngo5 hou2 geng1 lou5 syu2.", en: "I'm very scared of mice." } ],
  426: [ { zh: "我鍾意馬。", jyut: "ngo5 zung1 ji3 maa5.", en: "I like horses." }, { zh: "隻馬跑得好快。", jyut: "zek3 maa5 paau2 dak1 hou2 faai3.", en: "The horse runs very fast." } ],
  427: [ { zh: "隻牛好大。", jyut: "zek3 ngau4 hou2 daai6.", en: "The cow is big." }, { zh: "牛肉係由牛嚟嘅。", jyut: "ngau4 juk6 hai6 jau4 ngau4 lai4 ge3.", en: "Beef comes from cows." } ],
  428: [ { zh: "隻豬好肥。", jyut: "zek3 zyu1 hou2 fei4.", en: "The pig is fat." }, { zh: "豬肉係由豬嚟嘅。", jyut: "zyu1 juk6 hai6 jau4 zyu1 lai4 ge3.", en: "Pork comes from pigs." } ],
  429: [ { zh: "隻兔仔好得意。", jyut: "zek3 tou3 zai2 hou2 dak1 ji3.", en: "The rabbit is cute." }, { zh: "隻兔仔走得好快。", jyut: "zek3 tou3 zai2 zau2 dak1 hou2 faai3.", en: "The rabbit runs very fast." } ],
  430: [ { zh: "我好驚蟲。", jyut: "ngo5 hou2 geng1 cung4.", en: "I'm very scared of insects." }, { zh: "樹度有好多蟲。", jyut: "syu6 dou6 jau5 hou2 do1 cung4.", en: "There are a lot of insects on the tree." } ],
  431: [ { zh: "天空係藍色嘅。", jyut: "tin1 hung1 hai6 laam4 sik1 ge3.", en: "The sky is blue." }, { zh: "天空好靚。", jyut: "tin1 hung1 hou2 leng3.", en: "The sky is beautiful." } ],
  432: [ { zh: "我哋去海邊玩。", jyut: "ngo5 dei6 heoi3 hoi2 bin1 waan2.", en: "We're going to play at the seaside." }, { zh: "海好靚。", jyut: "hoi2 hou2 leng3.", en: "The sea is beautiful." } ],
  433: [ { zh: "我哋去行山。", jyut: "ngo5 dei6 heoi3 haang4 saan1.", en: "We're going hiking." }, { zh: "山好高。", jyut: "saan1 hou2 gou1.", en: "The mountain is tall." } ],
  434: [ { zh: "公園有好多樹。", jyut: "gung1 jyun4 jau5 hou2 do1 syu6.", en: "The park has a lot of trees." }, { zh: "樹度有好多蟲。", jyut: "syu6 dou6 jau5 hou2 do1 cung4.", en: "There are a lot of insects on the tree." } ],
  435: [ { zh: "花園有好多花。", jyut: "faa1 jyun4 jau5 hou2 do1 faa1.", en: "The garden has a lot of flowers." }, { zh: "呢啲花好靚。", jyut: "ni1 di1 faa1 hou2 leng3.", en: "These flowers are beautiful." } ],
  436: [ { zh: "公園有好多草。", jyut: "gung1 jyun4 jau5 hou2 do1 cou2.", en: "The park has a lot of grass." }, { zh: "草係綠色嘅。", jyut: "cou2 hai6 luk6 sik1 ge3.", en: "Grass is green." } ],
  437: [ { zh: "呢粒石好靚。", jyut: "ni1 nap1 sek6 hou2 leng3.", en: "This stone is pretty." }, { zh: "呢個石好重。", jyut: "ni1 go3 sek6 hou2 cung5.", en: "This stone is heavy." } ],
  438: [ { zh: "我哋去沙灘玩。", jyut: "ngo5 dei6 heoi3 saa1 taan1 waan2.", en: "We're going to play at the beach." }, { zh: "沙灘好多人。", jyut: "saa1 taan1 hou2 do1 jan4.", en: "The beach is crowded." } ],
  439: [ { zh: "香港有好多島。", jyut: "hoeng1 gong2 jau5 hou2 do1 dou2.", en: "Hong Kong has a lot of islands." }, { zh: "呢個島好靚。", jyut: "ni1 go3 dou2 hou2 leng3.", en: "This island is beautiful." } ],
  440: [ { zh: "呢條河好靚。", jyut: "ni1 tiu4 ho2 hou2 leng3.", en: "This river is beautiful." }, { zh: "河度有魚。", jyut: "ho2 dou6 jau5 jyu2.", en: "There are fish in the river." } ],
  441: [ { zh: "香港唔係一個國家。", jyut: "hoeng1 gong2 m4 hai6 jat1 go3 gwok3 gaa1.", en: "Hong Kong is not a country." }, { zh: "你嚟自邊個國家呀？", jyut: "lai4 zi6 bin1 go3 gwok3 gaa1 aa3?", en: "Which country are you from?" } ],
  442: [ { zh: "香港係一個城市。", jyut: "hoeng1 gong2 hai6 jat1 go3 sing4 si5.", en: "Hong Kong is a city." }, { zh: "呢個城市好大。", jyut: "ni1 go3 sing4 si5 hou2 daai6.", en: "This city is big." } ],
  443: [ { zh: "世界好大。", jyut: "sai3 gaai3 hou2 daai6.", en: "The world is big." }, { zh: "香港喺世界邊度呀？", jyut: "hoeng1 gong2 hai2 sai3 gaai3 bin1 dou6 aa3?", en: "Where in the world is Hong Kong?" } ],
  444: [ { zh: "呢個地方好靚。", jyut: "ni1 go3 dei6 fong1 hou2 leng3.", en: "This place is beautiful." }, { zh: "呢個係咩地方呀？", jyut: "ni1 go3 hai6 me1 dei6 fong1 aa3?", en: "What place is this?" } ],
  445: [ { zh: "我去過中國。", jyut: "ngo5 heoi3 gwo3 zung1 gwok3.", en: "I've been to China." }, { zh: "中國好大。", jyut: "zung1 gwok3 hou2 daai6.", en: "China is big." } ],
  446: [ { zh: "我想去台灣。", jyut: "ngo5 soeng2 heoi3 toi4 waan1.", en: "I want to go to Taiwan." }, { zh: "台灣嘅嘢食好好食。", jyut: "toi4 waan1 ge3 je5 sik6 hou2 hou2 sik6.", en: "Taiwan's food is delicious." } ],
  447: [ { zh: "我想去日本。", jyut: "ngo5 soeng2 heoi3 jat6 bun2.", en: "I want to go to Japan." }, { zh: "日本嘅嘢好貴。", jyut: "jat6 bun2 ge3 je5 hou2 gwai3.", en: "Japan's things are expensive." } ],
  448: [ { zh: "我想去韓國。", jyut: "ngo5 soeng2 heoi3 hon4 gwok3.", en: "I want to go to Korea." }, { zh: "我鍾意韓國嘅歌。", jyut: "ngo5 zung1 ji3 hon4 gwok3 ge3 go1.", en: "I like Korean songs." } ],
  449: [ { zh: "我想去美國。", jyut: "ngo5 soeng2 heoi3 mei5 gwok3.", en: "I want to go to the USA." }, { zh: "美國好遠。", jyut: "mei5 gwok3 hou2 jyun5.", en: "The USA is very far." } ],
  450: [ { zh: "我想去英國。", jyut: "ngo5 soeng2 heoi3 jing1 gwok3.", en: "I want to go to the UK." }, { zh: "英國成日落雨。", jyut: "jing1 gwok3 sing4 jat6 lok6 jyu5.", en: "It rains all the time in the UK." } ],
  451: [ { zh: "廣東話係一種語言。", jyut: "gwong2 dung1 waa2 hai6 jat1 zung2 jyu5 jin4.", en: "Cantonese is a language." }, { zh: "你識幾多種語言呀？", jyut: "nei5 sik1 gei2 do1 zung2 jyu5 jin4 aa3?", en: "How many languages do you know?" } ],
  452: [ { zh: "我想學廣東話。", jyut: "ngo5 soeng2 hok6 gwong2 dung1 waa2.", en: "I want to learn Cantonese." }, { zh: "我識講廣東話。", jyut: "ngo5 sik1 gong2 gwong2 dung1 waa2.", en: "I know how to speak Cantonese." } ],
  453: [ { zh: "我識講英文。", jyut: "ngo5 sik1 gong2 jing1 man2.", en: "I know how to speak English." }, { zh: "你嘅英文好好。", jyut: "nei5 ge3 jing1 man2 hou2 hou2.", en: "Your English is very good." } ],
  454: [ { zh: "我識睇中文。", jyut: "ngo5 sik1 tai2 zung1 man2.", en: "I can read Chinese." }, { zh: "呢個字係中文。", jyut: "ni1 go3 zi6 hai6 zung1 man2.", en: "This character is Chinese." } ],
  455: [ { zh: "我唔識講普通話。", jyut: "ngo5 m4 sik1 gong2 pou2 tung1 waa2.", en: "I don't know how to speak Mandarin." }, { zh: "廣東話同普通話唔同。", jyut: "gwong2 dung1 waa2 tung4 pou2 tung1 waa2 m4 tung4.", en: "Cantonese and Mandarin are different." } ],
  456: [ { zh: "我想寫字。", jyut: "ngo5 soeng2 se2 zi6.", en: "I want to write characters." }, { zh: "呢個字點寫呀？", jyut: "ni1 go3 zi6 dim2 se2 aa3?", en: "How do you write this character?" } ],
  457: [ { zh: "呢個字係咩意思呀？", jyut: "ni1 go3 zi6 hai6 me1 ji3 si1 aa3?", en: "What does this character mean?" }, { zh: "我唔明呢個意思。", jyut: "ngo5 m4 ming4 ni1 go3 ji3 si1.", en: "I don't understand this meaning." } ],
  458: [ { zh: "我鍾意食生果，例如蘋果。", jyut: "ngo5 zung1 ji3 sik6 saang1 gwo2, lai6 jyu4 ping4 gwo2.", en: "I like eating fruit, for example apples." }, { zh: "呢度好多嘢食，例如麵同飯。", jyut: "ni1 dou6 hou2 do1 je5 sik6, lai6 jyu4 min6 tung4 faan6.", en: "There's a lot of food here, like noodles and rice." } ],
  459: [ { zh: "仲有冇其他嘢呀？", jyut: "zung6 jau5 mou5 kei4 taa1 je5 aa3?", en: "Is there anything else?" }, { zh: "我冇其他朋友。", jyut: "ngo5 mou5 kei4 taa1 pang4 jau5.", en: "I don't have other friends." } ],
  460: [ { zh: "呢啲全部係我嘅。", jyut: "ni1 di1 cyun4 bou6 hai6 ngo5 ge3.", en: "These are all mine." }, { zh: "我全部都鍾意。", jyut: "ngo5 cyun4 bou6 dou1 zung1 ji3.", en: "I like all of them." } ],

  // ===== 201-500: More Adjectives (476-500) =====
  476: [ { zh: "呢度好靜。", jyut: "ni1 dou6 hou2 zing6.", en: "This place is quiet." }, { zh: "圖書館好靜。", jyut: "tou4 syu1 gun2 hou2 zing6.", en: "The library is quiet." } ],
  477: [ { zh: "呢度好嘈。", jyut: "ni1 dou6 hou2 cou4.", en: "This place is noisy." }, { zh: "隻狗好嘈。", jyut: "zek3 gau2 hou2 cou4.", en: "The dog is noisy." } ],
  478: [ { zh: "呢度好光。", jyut: "ni1 dou6 hou2 gwong1.", en: "This place is bright." }, { zh: "月光好光。", jyut: "jyut6 gwong1 hou2 gwong1.", en: "The moonlight is bright." } ],
  479: [ { zh: "呢度好黑暗。", jyut: "ni1 dou6 hou2 hak1 am3.", en: "This place is dark." }, { zh: "夜晚好黑暗。", jyut: "je6 maan5 hou2 hak1 am3.", en: "It's very dark at night." } ],
  480: [ { zh: "我件衫好濕。", jyut: "ngo5 gin6 saam1 hou2 sap1.", en: "My shirt is very wet." }, { zh: "落雨之後條路好濕。", jyut: "lok6 jyu5 zi1 hau6 tiu4 lou6 hou2 sap1.", en: "The road is wet after rain." } ],
  481: [ { zh: "件衫乾咗未呀？", jyut: "gin6 saam1 gon1 zo2 mei6 aa3?", en: "Is the shirt dry yet?" }, { zh: "呢度好乾。", jyut: "ni1 dou6 hou2 gon1.", en: "This place is dry." } ],
  482: [ { zh: "張床好軟。", jyut: "zoeng1 cong4 hou2 jyun5.", en: "The bed is soft." }, { zh: "呢個麵包好軟。", jyut: "ni1 go3 min6 baau1 hou2 jyun5.", en: "This bread is soft." } ],
  483: [ { zh: "張床好硬。", jyut: "zoeng1 cong4 hou2 ngaang6.", en: "The bed is hard." }, { zh: "呢個麵包好硬。", jyut: "ni1 go3 min6 baau1 hou2 ngaang6.", en: "This bread is hard." } ],
  484: [ { zh: "呢個好圓。", jyut: "ni1 go3 hou2 jyun4.", en: "This is round." }, { zh: "個波好圓。", jyut: "go3 bo1 hou2 jyun4.", en: "The ball is round." } ],
  485: [ { zh: "呢張枱好方。", jyut: "ni1 zoeng1 toi2 hou2 fong1.", en: "This table is square." }, { zh: "間房好方。", jyut: "gaan1 fong2 hou2 fong1.", en: "The room is square." } ],
  486: [ { zh: "呢個好尖。", jyut: "ni1 go3 hou2 zim1.", en: "This is sharp." }, { zh: "小心，呢個好尖。", jyut: "siu2 sam1, ni1 go3 hou2 zim1.", en: "Be careful, this is sharp." } ],
  487: [ { zh: "呢個好平滑。", jyut: "ni1 go3 hou2 ping4 waat6.", en: "This is smooth." }, { zh: "張枱好平滑。", jyut: "zoeng1 toi2 hou2 ping4 waat6.", en: "The table is smooth." } ],
  488: [ { zh: "呢個好粗糙。", jyut: "ni1 go3 hou2 cou1 cou4.", en: "This is rough." }, { zh: "佢隻手好粗糙。", jyut: "keoi5 zek3 sau2 hou2 cou1 cou4.", en: "His/her hands are rough." } ],
  489: [ { zh: "我個袋好重。", jyut: "ngo5 go3 doi2 hou2 cung5.", en: "My bag is heavy." }, { zh: "呢個石好重。", jyut: "ni1 go3 sek6 hou2 cung5.", en: "This stone is heavy." } ],
  490: [ { zh: "呢個好輕。", jyut: "ni1 go3 hou2 heng1.", en: "This is light." }, { zh: "呢個袋好輕。", jyut: "ni1 go3 doi2 hou2 heng1.", en: "This bag is light." } ],
  491: [ { zh: "呢個海好深。", jyut: "ni1 go3 hoi2 hou2 sam1.", en: "This sea is deep." }, { zh: "呢條河好深。", jyut: "ni1 tiu4 ho2 hou2 sam1.", en: "This river is deep." } ],
  492: [ { zh: "呢個海好淺。", jyut: "ni1 go3 hoi2 hou2 cin2.", en: "This sea is shallow." }, { zh: "呢條河好淺。", jyut: "ni1 tiu4 ho2 hou2 cin2.", en: "This river is shallow." } ],
  493: [ { zh: "呢條路好窄。", jyut: "ni1 tiu4 lou6 hou2 zaak3.", en: "This road is narrow." }, { zh: "間房好窄。", jyut: "gaan1 fong2 hou2 zaak3.", en: "The room is narrow." } ],
  494: [ { zh: "呢條路好闊。", jyut: "ni1 tiu4 lou6 hou2 fut3.", en: "This road is wide." }, { zh: "間房好闊。", jyut: "gaan1 fong2 hou2 fut3.", en: "The room is wide." } ],
  495: [ { zh: "個杯滿咗。", jyut: "go3 bui1 mun5 zo2.", en: "The cup is full." }, { zh: "間房好多人，好滿。", jyut: "gaan1 fong2 hou2 do1 jan4, hou2 mun5.", en: "The room is full of people." } ],
  496: [ { zh: "個杯空咗。", jyut: "go3 bui1 hung1 zo2.", en: "The cup is empty." }, { zh: "間房好空。", jyut: "gaan1 fong2 hou2 hung1.", en: "The room is empty." } ],
  497: [ { zh: "呢個係真嘅。", jyut: "ni1 go3 hai6 zan1 ge3.", en: "This is real." }, { zh: "你講嘅係真定假呀？", jyut: "nei5 gong2 ge3 hai6 zan1 ding6 gaa2 aa3?", en: "Is what you're saying true or false?" } ],
  498: [ { zh: "呢個係假嘅。", jyut: "ni1 go3 hai6 gaa2 ge3.", en: "This is fake." }, { zh: "呢個係真定假呀？", jyut: "ni1 go3 hai6 zan1 ding6 gaa2 aa3?", en: "Is this real or fake?" } ],
  499: [ { zh: "你講得啱。", jyut: "nei5 gong2 dak1 ngaam1.", en: "You're right." }, { zh: "你做得啱。", jyut: "nei5 zou6 dak1 ngaam1.", en: "You did it correctly." } ],
  500: [ { zh: "你講錯咗。", jyut: "nei5 gong2 co3 zo2.", en: "You said it wrong." }, { zh: "我做錯咗。", jyut: "ngo5 zou6 co3 zo2.", en: "I did it wrong." } ],

  // Taste descriptors: sentence 2 pairs the taste with a real dish it
  // actually describes.
  2088: [ // 惹味 flavourful / appetizing
    { zh: "呢個好惹味。", jyut: "ni1 go3 hou2 je5 mei6.", en: "This is very appetizing." },
    { zh: "豉油雞好惹味。", jyut: "si6 jau4 gai1 hou2 je5 mei6.", en: "Soy sauce chicken is very appetizing." },
  ],
  2091: [ // 香脆 crispy and fragrant
    { zh: "呢個好香脆。", jyut: "ni1 go3 hou2 hoeng1 ceoi3.", en: "This is very crispy and fragrant." },
    { zh: "燒肉好香脆。", jyut: "siu1 juk6 hou2 hoeng1 ceoi3.", en: "Roast pork is very crispy." },
  ],
  2092: [ // 肥膩 greasy
    { zh: "呢個好肥膩。", jyut: "ni1 go3 hou2 fei4 nei6.", en: "This is very greasy." },
    { zh: "炸嘢會肥膩啲。", jyut: "zaa3 je5 wui5 fei4 nei6 di1.", en: "Fried food tends to be greasier." },
  ],
  2093: [ // 鮮味 savory / umami
    { zh: "呢個好鮮味。", jyut: "ni1 go3 hou2 sin1 mei6.", en: "This is very savory." },
    { zh: "呢碗湯好鮮味。", jyut: "ni1 wun2 tong1 hou2 sin1 mei6.", en: "This bowl of soup is very savory." },
  ],
};

Object.assign(HAND_SENTENCES, HAND_501_530, HAND_531_555, HAND_556_580, HAND_581_605, HAND_606_630, HAND_631_650, HAND_651_675, HAND_676_700);

// ===== 501-1000: Extended Verbs (701-740) =====
const HAND_701_740 = {
  701: [ { zh: "唔該提醒我。", jyut: "m4 goi1 tai4 sing2 ngo5.", en: "Please remind me." }, { zh: "你提醒我要買嘢。", jyut: "nei5 tai4 sing2 ngo5 jiu3 maai5 je5.", en: "Remind me that I need to buy something." } ],
  702: [ { zh: "我想提出一個問題。", jyut: "ngo5 soeng2 tai4 ceot1 jat1 go3 man6 tai4.", en: "I want to raise a question." }, { zh: "佢提出咗個建議。", jyut: "keoi5 tai4 ceot1 zo2 go3 gin3 ji5.", en: "He/she proposed a suggestion." } ],
  703: [ { zh: "呢度提供咖啡。", jyut: "ni1 dou6 tai4 gung1 gaa3 fe1.", en: "This place provides coffee." }, { zh: "你可以提供幫助。", jyut: "nei5 ho2 ji5 tai4 gung1 bong1.", en: "You can provide help." } ],
  704: [ { zh: "我想提高成績。", jyut: "ngo5 soeng2 tai4 gou1 sing4 zik1.", en: "I want to improve my grades." }, { zh: "我想提高我嘅廣東話。", jyut: "ngo5 soeng2 tai4 gou1 ngo5 ge3 gwong2 dung1 waa2.", en: "I want to improve my Cantonese." } ],
  705: [ { zh: "我想降低壓力。", jyut: "ngo5 soeng2 gong3 dai1 aat3 lik6.", en: "I want to reduce stress." }, { zh: "呢個降低咗好多。", jyut: "ni1 go3 gong3 dai1 zo2 hou2 do1.", en: "This has been lowered a lot." } ],
  706: [ { zh: "人工增加咗。", jyut: "jan4 gung1 zang1 gaa1 zo2.", en: "My salary has increased." }, { zh: "呢度嘅人增加咗好多。", jyut: "ni1 dou6 ge3 jan4 zang1 gaa1 zo2 hou2 do1.", en: "The number of people here has increased a lot." } ],
  707: [ { zh: "人工減少咗。", jyut: "jan4 gung1 gaam2 siu2 zo2.", en: "My salary decreased." }, { zh: "呢度嘅人減少咗。", jyut: "ni1 dou6 ge3 jan4 gaam2 siu2 zo2.", en: "The number of people here has decreased." } ],
  708: [ { zh: "香港發展得好快。", jyut: "hoeng1 gong2 faat3 zin2 dak1 hou2 faai3.", en: "Hong Kong develops fast." }, { zh: "呢個城市發展得好快。", jyut: "ni1 go3 sing4 si5 faat3 zin2 dak1 hou2 faai3.", en: "This city develops fast." } ],
  709: [ { zh: "我發現咗個問題。", jyut: "ngo5 faat3 jin6 zo2 go3 man6 tai4.", en: "I discovered a problem." }, { zh: "我發現佢好誠實。", jyut: "ngo5 faat3 jin6 keoi5 hou2 sing4 sat6.", en: "I discovered that he/she is very honest." } ],
  710: [ { zh: "邊個發明電話呀？", jyut: "bin1 go3 faat3 ming4 din6 waa2 aa3?", en: "Who invented the telephone?" }, { zh: "佢發明咗個新嘢。", jyut: "keoi5 faat3 ming4 zo2 go3 san1 je5.", en: "He/she invented something new." } ],
  711: [ { zh: "發生咩事呀？", jyut: "faat3 sang1 me1 si6 aa3?", en: "What happened?" }, { zh: "呢度發生咗一件事。", jyut: "ni1 dou6 faat3 sang1 zo2 jat1 gin6 si6.", en: "Something happened here." } ],
  712: [ { zh: "我要發表報告。", jyut: "ngo5 jiu3 faat3 biu2 bou3 gou3.", en: "I need to present my report." }, { zh: "佢發表咗篇論文。", jyut: "keoi5 faat3 biu2 zo2 pin1 leon6 man4.", en: "He/she published a thesis." } ],
  713: [ { zh: "我建議你休息。", jyut: "ngo5 gin3 ji5 nei5 jau1 sik1.", en: "I suggest you rest." }, { zh: "你有咩建議呀？", jyut: "nei5 jau5 me1 gin3 ji5 aa3?", en: "What's your suggestion?" } ],
  714: [ { zh: "我哋要建立信任。", jyut: "ngo5 dei6 jiu3 gin3 laap6 seon3 jam6.", en: "We need to build trust." }, { zh: "佢建立咗間公司。", jyut: "keoi5 gin3 laap6 zo2 gaan1 gung1 si1.", en: "He/she established a company." } ],
  715: [ { zh: "佢哋建造緊間屋。", jyut: "keoi5 dei6 gin3 zou6 gan2 gaan1 uk1.", en: "They're building a house." }, { zh: "呢間屋建造得好靚。", jyut: "ni1 gaan1 uk1 gin3 zou6 dak1 hou2 leng3.", en: "This house is beautifully built." } ],
  716: [ { zh: "我反對呢個。", jyut: "ngo5 faan2 deoi3 ni1 go3.", en: "I oppose this." }, { zh: "佢反對我嘅諗法。", jyut: "keoi5 faan2 deoi3 ngo5 ge3 nam2 faat3.", en: "He/she opposes my idea." } ],
  717: [ { zh: "我支持你。", jyut: "ngo5 zi1 ci4 nei5.", en: "I support you." }, { zh: "我支持你嘅決定。", jyut: "ngo5 zi1 ci4 nei5 ge3 kyut3 ding6.", en: "I support your decision." } ],
  718: [ { zh: "我同意你。", jyut: "ngo5 tung4 ji3 nei5.", en: "I agree with you." }, { zh: "你同唔同意呀？", jyut: "nei5 tung4 m4 tung4 ji3 aa3?", en: "Do you agree?" } ],
  719: [ { zh: "我拒絕。", jyut: "ngo5 keoi5 zyut6.", en: "I refuse." }, { zh: "佢拒絕咗我嘅要求。", jyut: "keoi5 keoi5 zyut6 zo2 ngo5 ge3 jiu1 kau4.", en: "He/she refused my request." } ],
  720: [ { zh: "老闆批准咗。", jyut: "lou5 baan2 pai1 zeon2 zo2.", en: "The boss approved it." }, { zh: "你批准未呀？", jyut: "nei5 pai1 zeon2 mei6 aa3?", en: "Have you approved it?" } ],
  721: [ { zh: "呢度禁止食嘢。", jyut: "ni1 dou6 gam3 zi2 sik6 je5.", en: "Eating is prohibited here." }, { zh: "呢度禁止玩波。", jyut: "ni1 dou6 gam3 zi2 waan2 bo1.", en: "Playing ball is prohibited here." } ],
  722: [ { zh: "我允許你去。", jyut: "ngo5 wan5 heoi2 nei5 heoi3.", en: "I permit you to go." }, { zh: "老師允許我哋玩。", jyut: "lou5 si1 wan5 heoi2 ngo5 dei6 waan2.", en: "The teacher allowed us to play." } ],
  723: [ { zh: "我有個要求。", jyut: "ngo5 jau5 go3 jiu1 kau4.", en: "I have a request." }, { zh: "老闆要求好高。", jyut: "lou5 baan2 jiu1 kau4 hou2 gou1.", en: "The boss has high demands." } ],
  724: [ { zh: "我想避免麻煩。", jyut: "ngo5 soeng2 bei6 min5 maa4 faan4.", en: "I want to avoid trouble." }, { zh: "我哋要避免塞車。", jyut: "ngo5 dei6 jiu3 bei6 min5 sak1 ce1.", en: "We need to avoid traffic." } ],
  725: [ { zh: "我想防止呢個問題。", jyut: "ngo5 soeng2 fong4 zi2 ni1 go3 man6 tai4.", en: "I want to prevent this problem." }, { zh: "我哋要防止意外。", jyut: "ngo5 dei6 jiu3 fong4 zi2 ji3 ngoi6.", en: "We need to prevent accidents." } ],
  726: [ { zh: "我哋要保護環境。", jyut: "ngo5 dei6 jiu3 bou2 wu6 waan4 ging2.", en: "We need to protect the environment." }, { zh: "爸爸媽媽保護仔女。", jyut: "baa4 baa1 maa4 maa1 bou2 wu6 zai2 neoi2.", en: "Parents protect their children." } ],
  727: [ { zh: "我要保存呢啲相。", jyut: "ngo5 jiu3 bou2 cyun4 ni1 di1 soeng2.", en: "I need to save these photos." }, { zh: "呢啲嘢食保存得好好。", jyut: "ni1 di1 je5 sik6 bou2 cyun4 dak1 hou2 hou2.", en: "This food is well-preserved." } ],
  728: [ { zh: "要保持乾淨。", jyut: "jiu3 bou2 ci4 gon1 zeng6.", en: "Need to keep it clean." }, { zh: "唔該保持安靜。", jyut: "m4 goi1 bou2 ci4 on1 zing6.", en: "Please keep quiet." } ],
  729: [ { zh: "我要維持呢個。", jyut: "ngo5 jiu3 wai4 ci4 ni1 go3.", en: "I need to maintain this." }, { zh: "我哋要維持信任。", jyut: "ngo5 dei6 jiu3 wai4 ci4 seon3 jam6.", en: "We need to maintain trust." } ],
  730: [ { zh: "我而家恢復緊。", jyut: "ngo5 ji4 gaa1 fui1 fuk6 gan2.", en: "I'm recovering right now." }, { zh: "你幾時可以恢復呀？", jyut: "nei5 gei2 si4 ho2 ji5 fui1 fuk6 aa3?", en: "When will you recover?" } ],
  731: [ { zh: "我要改善我嘅廣東話。", jyut: "ngo5 jiu3 goi2 sin6 ngo5 ge3 gwong2 dung1 waa2.", en: "I need to improve my Cantonese." }, { zh: "天氣改善咗。", jyut: "tin1 hei3 goi2 sin6 zo2.", en: "The weather has improved." } ],
  732: [ { zh: "我哋要改進。", jyut: "ngo5 dei6 jiu3 goi2 zeon3.", en: "We need to improve." }, { zh: "你可以改進啲乜嘢呀？", jyut: "nei5 ho2 ji5 goi2 zeon3 di1 mat1 je5 aa3?", en: "What can you improve?" } ],
  733: [ { zh: "手機要更新。", jyut: "sau2 gei1 jiu3 gang1 san1.", en: "The phone needs an update." }, { zh: "我更新咗個電話。", jyut: "ngo5 gang1 san1 zo2 go3 din6 waa2.", en: "I updated my phone." } ],
  734: [ { zh: "我想更改一個名。", jyut: "ngo5 soeng2 gang1 goi2 jat1 go3 meng2.", en: "I want to change a name." }, { zh: "你可以更改呀？", jyut: "nei5 ho2 ji5 gang1 goi2 aa3?", en: "Can you change it?" } ],
  735: [ { zh: "我哋推遲個會議。", jyut: "ngo5 dei6 teoi1 ci4 go3 wui6 ji5.", en: "We're postponing the meeting." }, { zh: "班機推遲咗。", jyut: "baan1 gei1 teoi1 ci4 zo2.", en: "The flight is postponed." } ],
  736: [ { zh: "我想延長假期。", jyut: "ngo5 soeng2 jin4 coeng4 gaa3 kei4.", en: "I want to extend my vacation." }, { zh: "合約延長咗。", jyut: "hap6 joek3 jin4 coeng4 zo2.", en: "The contract has been extended." } ],
  737: [ { zh: "我想縮短假期。", jyut: "ngo5 soeng2 suk1 dyun2 gaa3 kei4.", en: "I want to shorten my vacation." }, { zh: "呢條路縮短咗。", jyut: "ni1 tiu4 lou6 suk1 dyun2 zo2.", en: "This road has been shortened." } ],
  738: [ { zh: "我想同你分享。", jyut: "ngo5 soeng2 tung4 nei5 fan1 hoeng2.", en: "I want to share with you." }, { zh: "佢分享咗好多相。", jyut: "keoi5 fan1 hoeng2 zo2 hou2 do1 soeng2.", en: "He/she shared a lot of photos." } ],
  739: [ { zh: "我哋討論下。", jyut: "ngo5 dei6 tou2 leon6 haa5.", en: "Let's discuss it." }, { zh: "我哋討論緊呢個問題。", jyut: "ngo5 dei6 tou2 leon6 gan2 ni1 go3 man6 tai4.", en: "We're discussing this problem." } ],
  740: [ { zh: "我解決咗個問題。", jyut: "ngo5 gaai2 kyut3 zo2 go3 man6 tai4.", en: "I solved the problem." }, { zh: "呢個好難解決。", jyut: "ni1 go3 hou2 naan4 gaai2 kyut3.", en: "This is hard to solve." } ],
};

// ===== 501-1000: Extended Adjectives (741-770) =====
const HAND_741_770 = {
  741: [ { zh: "你要積極啲。", jyut: "nei5 jiu3 zik1 gik6 di1.", en: "You need to be more proactive." }, { zh: "佢做嘢好積極。", jyut: "keoi5 zou6 je5 hou2 zik1 gik6.", en: "He/she is very proactive at work." } ],
  742: [ { zh: "你唔好咁消極。", jyut: "nei5 m4 hou2 gam3 siu1 gik6.", en: "Don't be so negative." }, { zh: "佢態度好消極。", jyut: "keoi5 taai3 dou6 hou2 siu1 gik6.", en: "His/her attitude is very negative." } ],
  743: [ { zh: "你要主動啲。", jyut: "nei5 jiu3 zyu2 dung6 di1.", en: "You need to be more proactive." }, { zh: "佢好主動幫我。", jyut: "keoi5 hou2 zyu2 dung6 bong1 ngo5.", en: "He/she proactively helped me." } ],
  744: [ { zh: "你唔好咁被動。", jyut: "nei5 m4 hou2 gam3 bei6 dung6.", en: "Don't be so passive." }, { zh: "佢好被動。", jyut: "keoi5 hou2 bei6 dung6.", en: "He/she is very passive." } ],
  745: [ { zh: "佢好誠懇。", jyut: "keoi5 hou2 sing4 han2.", en: "He/she is very sincere." }, { zh: "多謝你誠懇嘅建議。", jyut: "do1 ze6 nei5 sing4 han2 ge3 gin3 ji5.", en: "Thank you for your sincere suggestion." } ],
  746: [ { zh: "佢好虛偽。", jyut: "keoi5 hou2 heoi1 ngai6.", en: "He/she is hypocritical." }, { zh: "我唔鍾意虛偽嘅人。", jyut: "ngo5 m4 zung1 ji3 heoi1 ngai6 ge3 jan4.", en: "I don't like hypocritical people." } ],
  747: [ { zh: "佢好慷慨。", jyut: "keoi5 hou2 hong1 koi3.", en: "He/she is very generous." }, { zh: "多謝你咁慷慨。", jyut: "do1 ze6 nei5 gam3 hong1 koi3.", en: "Thank you for being so generous." } ],
  748: [ { zh: "佢好吝嗇。", jyut: "keoi5 hou2 leon6 sik1.", en: "He/she is stingy." }, { zh: "唔好咁吝嗇。", jyut: "m4 hou2 gam3 leon6 sik1.", en: "Don't be so stingy." } ],
  749: [ { zh: "你好勇敢。", jyut: "nei5 hou2 jung5 gam2.", en: "You're very brave." }, { zh: "消防員好勇敢。", jyut: "siu1 fong4 jyun4 hou2 jung5 gam2.", en: "Firefighters are very brave." } ],
  750: [ { zh: "你唔好咁懦弱。", jyut: "nei5 m4 hou2 gam3 no6 joek6.", en: "Don't be so cowardly." }, { zh: "佢好懦弱。", jyut: "keoi5 hou2 no6 joek6.", en: "He/she is cowardly." } ],
  751: [ { zh: "你好聰明。", jyut: "nei5 hou2 cung1 ming4.", en: "You're very clever." }, { zh: "隻狗好聰明。", jyut: "zek3 gau2 hou2 cung1 ming4.", en: "The dog is very clever." } ],
  752: [ { zh: "呢個好愚蠢。", jyut: "ni1 go3 hou2 jyu4 ceon2.", en: "This is foolish." }, { zh: "咁做好愚蠢。", jyut: "gam3 zou6 hou2 jyu4 ceon2.", en: "Doing that is foolish." } ],
  753: [ { zh: "你好勤力。", jyut: "nei5 hou2 kan4 lik6.", en: "You're hardworking." }, { zh: "佢讀書好勤力。", jyut: "keoi5 duk6 syu1 hou2 kan4 lik6.", en: "He/she studies very hard." } ],
  754: [ { zh: "你好懶惰。", jyut: "nei5 hou2 laan5 do6.", en: "You're lazy." }, { zh: "佢好懶惰，唔想做嘢。", jyut: "keoi5 hou2 laan5 do6, m4 soeng2 zou6 je5.", en: "He/she is lazy, doesn't want to work." } ],
  755: [ { zh: "你要樂觀啲。", jyut: "nei5 jiu3 lok6 gun1 di1.", en: "You need to be more optimistic." }, { zh: "佢好樂觀。", jyut: "keoi5 hou2 lok6 gun1.", en: "He/she is very optimistic." } ],
  756: [ { zh: "你唔好咁悲觀。", jyut: "nei5 m4 hou2 gam3 bei1 gun1.", en: "Don't be so pessimistic." }, { zh: "佢好悲觀。", jyut: "keoi5 hou2 bei1 gun1.", en: "He/she is pessimistic." } ],
  757: [ { zh: "你好謙虛。", jyut: "nei5 hou2 him1 heoi1.", en: "You're very modest." }, { zh: "佢成績咁好都好謙虛。", jyut: "keoi5 sing4 zik1 gam3 hou2 dou1 hou2 him1 heoi1.", en: "His/her grades are so good but he/she is still modest." } ],
  758: [ { zh: "你唔好咁驕傲。", jyut: "nei5 m4 hou2 gam3 giu1 ngou6.", en: "Don't be so arrogant." }, { zh: "我好驕傲。", jyut: "ngo5 hou2 giu1 ngou6.", en: "I'm very proud." } ],
  759: [ { zh: "你要冷靜。", jyut: "nei5 jiu3 laang5 zing6.", en: "You need to calm down." }, { zh: "佢好冷靜。", jyut: "keoi5 hou2 laang5 zing6.", en: "He/she is very calm." } ],
  760: [ { zh: "你唔好咁衝動。", jyut: "nei5 m4 hou2 gam3 cung1 dung6.", en: "Don't be so impulsive." }, { zh: "佢好衝動。", jyut: "keoi5 hou2 cung1 dung6.", en: "He/she is very impulsive." } ],
  761: [ { zh: "你好固執。", jyut: "nei5 hou2 gu3 zap1.", en: "You're very stubborn." }, { zh: "佢好固執，唔聽人講。", jyut: "keoi5 hou2 gu3 zap1, m4 teng1 jan4 gong2.", en: "He/she is stubborn, doesn't listen to others." } ],
  762: [ { zh: "你要靈活啲。", jyut: "nei5 jiu3 ling4 wut6 di1.", en: "You need to be more flexible." }, { zh: "佢諗嘢好靈活。", jyut: "keoi5 nam2 je5 hou2 ling4 wut6.", en: "He/she thinks flexibly." } ],
  763: [ { zh: "我好獨立。", jyut: "ngo5 hou2 duk6 laap6.", en: "I'm very independent." }, { zh: "你要學識獨立。", jyut: "nei5 jiu3 hok6 sik1 duk6 laap6.", en: "You need to learn to be independent." } ],
  764: [ { zh: "我唔想依賴人。", jyut: "ngo5 m4 soeng2 ji1 laai6 jan4.", en: "I don't want to depend on others." }, { zh: "佢好依賴我。", jyut: "keoi5 hou2 ji1 laai6 ngo5.", en: "He/she is very dependent on me." } ],
  765: [ { zh: "呢個好神秘。", jyut: "ni1 go3 hou2 san4 bei3.", en: "This is mysterious." }, { zh: "佢好神秘。", jyut: "keoi5 hou2 san4 bei3.", en: "He/she is mysterious." } ],
  766: [ { zh: "呢個好普通。", jyut: "ni1 go3 hou2 pou2 tung1.", en: "This is ordinary." }, { zh: "我係普通人。", jyut: "ngo5 hai6 pou2 tung1 jan4.", en: "I'm an ordinary person." } ],
  767: [ { zh: "今日好特別。", jyut: "gam1 jat6 hou2 dak6 bit6.", en: "Today is special." }, { zh: "呢個好特別。", jyut: "ni1 go3 hou2 dak6 bit6.", en: "This is special." } ],
  768: [ { zh: "呢個好罕見。", jyut: "ni1 go3 hou2 hon2 gin3.", en: "This is rare." }, { zh: "呢隻雀仔好罕見。", jyut: "ni1 zek3 zoek3 zai2 hou2 hon2 gin3.", en: "This bird is rare." } ],
  769: [ { zh: "呢個好常見。", jyut: "ni1 go3 hou2 soeng4 gin3.", en: "This is common." }, { zh: "感冒好常見。", jyut: "gam2 mou6 hou2 soeng4 gin3.", en: "Colds are common." } ],
  770: [ { zh: "呢個好典型。", jyut: "ni1 go3 hou2 din2 jing4.", en: "This is typical." }, { zh: "佢係典型嘅香港人。", jyut: "keoi5 hai6 din2 jing4 ge3 hoeng1 gong2 jan4.", en: "He/she is a typical Hong Konger." } ],
};

Object.assign(HAND_SENTENCES, HAND_701_740, HAND_741_770);

// ===== 501-1000: Professions & Society (771-800) =====
const HAND_771_800 = {
  771: [ { zh: "政府話要小心。", jyut: "zing3 fu2 waa6 jiu3 siu2 sam1.", en: "The government says to be careful." }, { zh: "政府幫我哋。", jyut: "zing3 fu2 bong1 ngo5 dei6.", en: "The government helps us." } ],
  772: [ { zh: "呢個政策好好。", jyut: "ni1 go3 zing3 caak3 hou2 hou2.", en: "This policy is good." }, { zh: "政策改咗。", jyut: "zing3 caak3 goi2 zo2.", en: "The policy has changed." } ],
  773: [ { zh: "呢個唔啱法律。", jyut: "ni1 go3 m4 ngaam1 faat3 leot6.", en: "This is against the law." }, { zh: "你要識法律。", jyut: "nei5 jiu3 sik1 faat3 leot6.", en: "You need to know the law." } ],
  774: [ { zh: "我哋要去法庭。", jyut: "ngo5 dei6 jiu3 heoi3 faat3 ting4.", en: "We need to go to court." }, { zh: "法庭好靜。", jyut: "faat3 ting4 hou2 zing6.", en: "The courtroom is quiet." } ],
  775: [ { zh: "唔該叫警察。", jyut: "m4 goi1 giu3 ging2 caat3.", en: "Please call the police." }, { zh: "佢係警察。", jyut: "keoi5 hai6 ging2 caat3.", en: "He/she is a police officer." } ],
  776: [ { zh: "佢係消防員。", jyut: "keoi5 hai6 siu1 fong4 jyun4.", en: "He/she is a firefighter." }, { zh: "消防員好勇敢。", jyut: "siu1 fong4 jyun4 hou2 jung5 gam2.", en: "Firefighters are very brave." } ],
  777: [ { zh: "佢係律師。", jyut: "keoi5 hai6 leot6 si1.", en: "He/she is a lawyer." }, { zh: "我要搵律師。", jyut: "ngo5 jiu3 wan2 leot6 si1.", en: "I need to find a lawyer." } ],
  778: [ { zh: "佢係記者。", jyut: "keoi5 hai6 gei3 ze2.", en: "He/she is a journalist." }, { zh: "記者問咗好多問題。", jyut: "gei3 ze2 man6 zo2 hou2 do1 man6 tai4.", en: "The journalist asked a lot of questions." } ],
  779: [ { zh: "佢係作家。", jyut: "keoi5 hai6 zok3 gaa1.", en: "He/she is a writer." }, { zh: "我鍾意呢個作家。", jyut: "ngo5 zung1 ji3 ni1 go3 zok3 gaa1.", en: "I like this writer." } ],
  780: [ { zh: "佢係藝術家。", jyut: "keoi5 hai6 ngai6 seot6 gaa1.", en: "He/she is an artist." }, { zh: "呢個藝術家好有創意。", jyut: "ni1 go3 ngai6 seot6 gaa1 hou2 jau5 cong3 ji3.", en: "This artist is very creative." } ],
  781: [ { zh: "佢係設計師。", jyut: "keoi5 hai6 cit3 gai3 si1.", en: "He/she is a designer." }, { zh: "設計師設計咗呢個。", jyut: "cit3 gai3 si1 cit3 gai3 zo2 ni1 go3.", en: "The designer designed this." } ],
  782: [ { zh: "佢係工程師。", jyut: "keoi5 hai6 gung1 cing4 si1.", en: "He/she is an engineer." }, { zh: "工程師修理好咗。", jyut: "gung1 cing4 si1 sau1 lei5 hou2 zo2.", en: "The engineer fixed it." } ],
  783: [ { zh: "佢係會計師。", jyut: "keoi5 hai6 wui6 gai3 si1.", en: "He/she is an accountant." }, { zh: "會計師幫我計數。", jyut: "wui6 gai3 si1 bong1 ngo5 gai3 sou3.", en: "The accountant helps me calculate." } ],
  784: [ { zh: "佢係建築師。", jyut: "keoi5 hai6 gin3 zuk1 si1.", en: "He/she is an architect." }, { zh: "建築師設計咗呢間屋。", jyut: "gin3 zuk1 si1 cit3 gai3 zo2 ni1 gaan1 uk1.", en: "The architect designed this house." } ],
  785: [ { zh: "佢係司機。", jyut: "keoi5 hai6 si1 gei1.", en: "He/she is a driver." }, { zh: "巴士司機好忙。", jyut: "baa1 si2 si1 gei1 hou2 mong4.", en: "Bus drivers are very busy." } ],
  786: [ { zh: "佢係廚師。", jyut: "keoi5 hai6 cyu4 si1.", en: "He/she is a chef." }, { zh: "廚師煮嘢好好食。", jyut: "cyu4 si1 zyu2 je5 hou2 hou2 sik6.", en: "The chef cooks delicious food." } ],
  787: [ { zh: "服務員好好人。", jyut: "fuk6 mou6 jyun4 hou2 hou2 jan4.", en: "The waiter is very nice." }, { zh: "唔該，服務員！", jyut: "m4 goi1, fuk6 mou6 jyun4!", en: "Excuse me, waiter!" } ],
  788: [ { zh: "佢係清潔工。", jyut: "keoi5 hai6 cing1 git3 gung1.", en: "He/she is a cleaner." }, { zh: "清潔工好辛苦。", jyut: "cing1 git3 gung1 hou2 san1 fu2.", en: "Cleaners work hard." } ],
  789: [ { zh: "佢係保安。", jyut: "keoi5 hai6 bou2 on1.", en: "He/she is a security guard." }, { zh: "保安企喺門口。", jyut: "bou2 on1 kei5 hai2 mun4 hau2.", en: "The security guard stands at the entrance." } ],
  790: [ { zh: "經濟唔好。", jyut: "ging1 zai3 m4 hou2.", en: "The economy is bad." }, { zh: "香港經濟好好。", jyut: "hoeng1 gong2 ging1 zai3 hou2 hou2.", en: "Hong Kong's economy is good." } ],
  791: [ { zh: "我鍾意香港文化。", jyut: "ngo5 zung1 ji3 hoeng1 gong2 man4 faa3.", en: "I like Hong Kong culture." }, { zh: "呢個係我哋嘅文化。", jyut: "ni1 go3 hai6 ngo5 dei6 ge3 man4 faa3.", en: "This is our culture." } ],
  792: [ { zh: "呢個係傳統。", jyut: "ni1 go3 hai6 cyun4 tung2.", en: "This is a tradition." }, { zh: "我哋要尊重傳統。", jyut: "ngo5 dei6 jiu3 zyun1 zung6 cyun4 tung2.", en: "We need to respect tradition." } ],
  793: [ { zh: "呢個係香港習俗。", jyut: "ni1 go3 hai6 hoeng1 gong2 zaap6 zuk6.", en: "This is a Hong Kong custom." }, { zh: "唔同地方有唔同習俗。", jyut: "m4 tung4 dei6 fong1 jau5 m4 tung4 zaap6 zuk6.", en: "Different places have different customs." } ],
  794: [ { zh: "社會好唔同。", jyut: "se5 wui2 hou2 m4 tung4.", en: "Society is quite different." }, { zh: "我哋要幫社會。", jyut: "ngo5 dei6 jiu3 bong1 se5 wui2.", en: "We need to help society." } ],
  795: [ { zh: "我哋要保護環境。", jyut: "ngo5 dei6 jiu3 bou2 wu6 waan4 ging2.", en: "We need to protect the environment." }, { zh: "呢度環境好靚。", jyut: "ni1 dou6 waan4 ging2 hou2 leng3.", en: "The environment here is beautiful." } ],
  796: [ { zh: "香港人口好多。", jyut: "hoeng1 gong2 jan4 hau2 hou2 do1.", en: "Hong Kong's population is large." }, { zh: "呢個城市人口減少咗。", jyut: "ni1 go3 sing4 si5 jan4 hau2 gaam2 siu2 zo2.", en: "This city's population has decreased." } ],
  797: [ { zh: "我想移民。", jyut: "ngo5 soeng2 ji4 man4.", en: "I want to emigrate." }, { zh: "佢係移民。", jyut: "keoi5 hai6 ji4 man4.", en: "He/she is an immigrant." } ],
  798: [ { zh: "呢度有好多難民。", jyut: "ni1 dou6 jau5 hou2 do1 naan6 man4.", en: "There are a lot of refugees here." }, { zh: "我哋要幫難民。", jyut: "ngo5 dei6 jiu3 bong1 naan6 man4.", en: "We need to help refugees." } ],
  799: [ { zh: "佢好貧窮。", jyut: "keoi5 hou2 pan4 kung4.", en: "He/she is very poor." }, { zh: "呢個地方好貧窮。", jyut: "ni1 go3 dei6 fong1 hou2 pan4 kung4.", en: "This place is very poor." } ],
  800: [ { zh: "佢好富有。", jyut: "keoi5 hou2 fu3 jau5.", en: "He/she is very wealthy." }, { zh: "佢屋企好富有。", jyut: "keoi5 uk1 kei2 hou2 fu3 jau5.", en: "His/her family is very wealthy." } ],
};

// ===== 501-1000: Festivals (801-812) =====
const HAND_801_812 = {
  801: [ { zh: "我鍾意呢個節日。", jyut: "ngo5 zung1 ji3 ni1 go3 zit3 jat6.", en: "I like this festival." }, { zh: "香港有好多節日。", jyut: "hoeng1 gong2 jau5 hou2 do1 zit3 jat6.", en: "Hong Kong has a lot of festivals." } ],
  802: [ { zh: "聖誕節快樂！", jyut: "sing3 daan3 zit3 faai3 lok6!", en: "Merry Christmas!" }, { zh: "我鍾意聖誕節。", jyut: "ngo5 zung1 ji3 sing3 daan3 zit3.", en: "I like Christmas." } ],
  803: [ { zh: "中秋節快樂！", jyut: "zung1 cau1 zit3 faai3 lok6!", en: "Happy Mid-Autumn Festival!" }, { zh: "中秋節我哋一齊食飯。", jyut: "zung1 cau1 zit3 ngo5 dei6 jat1 cai4 sik6 faan6.", en: "We eat together on Mid-Autumn Festival." } ],
  804: [ { zh: "端午節快樂！", jyut: "dyun1 ng5 zit3 faai3 lok6!", en: "Happy Dragon Boat Festival!" }, { zh: "端午節我哋去睇比賽。", jyut: "dyun1 ng5 zit3 ngo5 dei6 heoi3 tai2 bei2 coi3.", en: "We go watch races on Dragon Boat Festival." } ],
  805: [ { zh: "清明節我哋去拜祭。", jyut: "cing1 ming4 zit3 ngo5 dei6 heoi3 baai3 zai3.", en: "We go to pay respects on Ching Ming Festival." }, { zh: "清明節係四月。", jyut: "cing1 ming4 zit3 hai6 sei3 jyut6.", en: "Ching Ming Festival is in April." } ],
  806: [ { zh: "盂蘭節喺七月。", jyut: "jyu4 laan4 zit3 hai2 cat1 jyut6.", en: "Hungry Ghost Festival is in the seventh month." }, { zh: "盂蘭節好特別。", jyut: "jyu4 laan4 zit3 hou2 dak6 bit6.", en: "Hungry Ghost Festival is very special." } ],
  807: [ { zh: "復活節快樂！", jyut: "fuk6 wut6 zit3 faai3 lok6!", en: "Happy Easter!" }, { zh: "復活節我哋放假。", jyut: "fuk6 wut6 zit3 ngo5 dei6 fong3 gaa3.", en: "We're off for Easter." } ],
  808: [ { zh: "萬聖節快樂！", jyut: "maan6 sing3 zit3 faai3 lok6!", en: "Happy Halloween!" }, { zh: "萬聖節好好玩。", jyut: "maan6 sing3 zit3 hou2 hou2 waan2.", en: "Halloween is fun." } ],
  809: [ { zh: "情人節快樂！", jyut: "cing4 jan4 zit3 faai3 lok6!", en: "Happy Valentine's Day!" }, { zh: "情人節我哋去食飯。", jyut: "cing4 jan4 zit3 ngo5 dei6 heoi3 sik6 faan6.", en: "We're going out to eat for Valentine's Day." } ],
  810: [ { zh: "母親節快樂！", jyut: "mou5 can1 zit3 faai3 lok6!", en: "Happy Mother's Day!" }, { zh: "母親節我送花畀媽媽。", jyut: "mou5 can1 zit3 ngo5 sung3 faa1 bei2 maa4 maa1.", en: "I gave flowers to my mum for Mother's Day." } ],
  811: [ { zh: "父親節快樂！", jyut: "fu6 can1 zit3 faai3 lok6!", en: "Happy Father's Day!" }, { zh: "父親節我送嘢畀爸爸。", jyut: "fu6 can1 zit3 ngo5 sung3 je5 bei2 baa4 baa1.", en: "I gave something to my dad for Father's Day." } ],
  812: [ { zh: "農曆新年快樂！", jyut: "nung4 lik6 san1 nin4 faai3 lok6!", en: "Happy Lunar New Year!" }, { zh: "農曆新年我哋一齊食飯。", jyut: "nung4 lik6 san1 nin4 ngo5 dei6 jat1 cai4 sik6 faan6.", en: "We eat together for Lunar New Year." } ],
};

Object.assign(HAND_SENTENCES, HAND_771_800, HAND_801_812);

// ===== 501-1000: Time & Quantity (813-832) =====
const HAND_813_832 = {
  813: [ { zh: "呢個係二十世紀。", jyut: "ni1 go3 hai6 ji6 sap6 sai3 gei2.", en: "This is the 20th century." }, { zh: "一個世紀有一百年。", jyut: "jat1 go3 sai3 gei2 jau5 jat1 baak3 nin4.", en: "A century has a hundred years." } ],
  814: [ { zh: "呢個係邊個年代呀？", jyut: "ni1 go3 hai6 bin1 go3 nin4 doi6 aa3?", en: "What era is this?" }, { zh: "我鍾意嗰個年代嘅歌。", jyut: "ngo5 zung1 ji3 go2 go3 nin4 doi6 ge3 go1.", en: "I like the songs from that era." } ],
  815: [ { zh: "你鍾意邊個季節呀？", jyut: "nei5 zung1 ji3 bin1 go3 gwai3 zit3 aa3?", en: "Which season do you like?" }, { zh: "香港有四個季節。", jyut: "hoeng1 gong2 jau5 sei3 go3 gwai3 zit3.", en: "Hong Kong has four seasons." } ],
  816: [ { zh: "我鍾意春天。", jyut: "ngo5 zung1 ji3 ceon1 tin1.", en: "I like spring." }, { zh: "春天天氣好舒服。", jyut: "ceon1 tin1 tin1 hei3 hou2 syu1 fuk6.", en: "Spring weather is comfortable." } ],
  817: [ { zh: "我鍾意夏天。", jyut: "ngo5 zung1 ji3 haa6 tin1.", en: "I like summer." }, { zh: "夏天好熱。", jyut: "haa6 tin1 hou2 jit6.", en: "Summer is very hot." } ],
  818: [ { zh: "我鍾意秋天。", jyut: "ngo5 zung1 ji3 cau1 tin1.", en: "I like autumn." }, { zh: "秋天天氣好舒服。", jyut: "cau1 tin1 tin1 hei3 hou2 syu1 fuk6.", en: "Autumn weather is comfortable." } ],
  819: [ { zh: "我鍾意冬天。", jyut: "ngo5 zung1 ji3 dung1 tin1.", en: "I like winter." }, { zh: "冬天好凍。", jyut: "dung1 tin1 hou2 dung3.", en: "Winter is very cold." } ],
  820: [ { zh: "上半年我好忙。", jyut: "soeng6 bun3 nin4 ngo5 hou2 mong4.", en: "I was busy in the first half of the year." }, { zh: "上半年我去咗日本。", jyut: "soeng6 bun3 nin4 ngo5 heoi3 zo2 jat6 bun2.", en: "I went to Japan in the first half of the year." } ],
  821: [ { zh: "下半年我會去旅行。", jyut: "haa6 bun3 nin4 ngo5 wui5 heoi3 leoi5 hang4.", en: "I'll travel in the second half of the year." }, { zh: "下半年我要考試。", jyut: "haa6 bun3 nin4 ngo5 jiu3 haau2 si5.", en: "I have exams in the second half of the year." } ],
  822: [ { zh: "我哋週末去公園。", jyut: "ngo5 dei6 zau1 mut6 heoi3 gung1 jyun4.", en: "We're going to the park on the weekend." }, { zh: "你週末想做咩呀？", jyut: "nei5 zau1 mut6 soeng2 zou6 me1 aa3?", en: "What do you want to do on the weekend?" } ],
  823: [ { zh: "我平日返工。", jyut: "ngo5 ping4 jat6 faan1 gung1.", en: "I work on weekdays." }, { zh: "平日呢度好靜。", jyut: "ping4 jat6 ni1 dou6 hou2 zing6.", en: "It's quiet here on weekdays." } ],
  824: [ { zh: "我想延長假期。", jyut: "ngo5 soeng2 jin4 coeng4 gaa3 kei4.", en: "I want to extend my vacation." }, { zh: "假期我想去旅行。", jyut: "gaa3 kei4 ngo5 soeng2 heoi3 leoi5 hang4.", en: "I want to travel during the vacation." } ],
  825: [ { zh: "聽日係公眾假期。", jyut: "ting1 jat6 hai6 gung1 zung3 gaa3 kei4.", en: "Tomorrow is a public holiday." }, { zh: "公眾假期好多人去街。", jyut: "gung1 zung3 gaa3 kei4 hou2 do1 jan4 heoi3 gaai1.", en: "Lots of people go out on public holidays." } ],
  826: [ { zh: "我提早到咗。", jyut: "ngo5 tai4 zou2 dou3 zo2.", en: "I arrived early." }, { zh: "你可唔可以提早嚟呀？", jyut: "nei5 ho2 m4 ho2 ji5 tai4 zou2 lai4 aa3?", en: "Can you come earlier?" } ],
  827: [ { zh: "我準時到。", jyut: "ngo5 zeon2 si4 dou3.", en: "I arrived on time." }, { zh: "你要準時。", jyut: "nei5 jiu3 zeon2 si4.", en: "You need to be on time." } ],
  828: [ { zh: "大概要一個鐘頭。", jyut: "daai6 koi3 jiu3 jat1 go3 zung1 tau4.", en: "It'll take about an hour." }, { zh: "大概幾多錢呀？", jyut: "daai6 koi3 gei2 do1 cin2 aa3?", en: "Approximately how much?" } ],
  829: [ { zh: "十蚊左右。", jyut: "sap6 man1 zo2 jau6.", en: "About ten dollars." }, { zh: "五點左右見。", jyut: "ng5 dim2 zo2 jau6 gin3.", en: "See you around five o'clock." } ],
  830: [ { zh: "將近十點喇。", jyut: "zoeng1 gan6 sap6 dim2 laa3.", en: "It's nearly ten o'clock." }, { zh: "將近一年冇見。", jyut: "zoeng1 gan6 jat1 nin4 mou5 gin3.", en: "Nearly a year since we've met." } ],
  831: [ { zh: "我等咗足足一個鐘頭。", jyut: "ngo5 dang2 zo2 zuk1 zuk1 jat1 go3 zung1 tau4.", en: "I waited a full hour." }, { zh: "我足足行咗兩個鐘頭。", jyut: "ngo5 zuk1 zuk1 haang4 zo2 loeng5 go3 zung1 tau4.", en: "I walked for a full two hours." } ],
  832: [ { zh: "等我一陣。", jyut: "dang2 ngo5 jat1 zan6.", en: "Wait a moment for me." }, { zh: "我想休息一陣。", jyut: "ngo5 soeng2 jau1 sik1 jat1 zan6.", en: "I want to rest for a while." } ],
};

// ===== 501-1000: Tech Extra (883-902) =====
const HAND_883_902 = {
  883: [ { zh: "我下載咗個應用程式。", jyut: "ngo5 haa6 zoi3 zo2 go3 jing3 jung6 cing4 sik1.", en: "I downloaded an app." }, { zh: "呢個應用程式好好用。", jyut: "ni1 go3 jing3 jung6 cing4 sik1 hou2 hou2 jung6.", en: "This app is very useful." } ],
  884: [ { zh: "我唔記得密碼。", jyut: "ngo5 m4 gei3 dak1 mat6 maa5.", en: "I forgot my password." }, { zh: "唔該打密碼。", jyut: "m4 goi1 daa2 mat6 maa5.", en: "Please enter the password." } ],
  885: [ { zh: "我有個銀行帳戶。", jyut: "ngo5 jau5 go3 ngan4 hong4 zoeng3 wu6.", en: "I have a bank account." }, { zh: "我登入唔到個帳戶。", jyut: "ngo5 dang1 jap6 m4 dou2 go3 zoeng3 wu6.", en: "I can't log into my account." } ],
  886: [ { zh: "我登入唔到。", jyut: "ngo5 dang1 jap6 m4 dou2.", en: "I can't log in." }, { zh: "唔該登入你個帳戶。", jyut: "m4 goi1 dang1 jap6 nei5 go3 zoeng3 wu6.", en: "Please log into your account." } ],
  887: [ { zh: "我登出咗。", jyut: "ngo5 dang1 ceot1 zo2.", en: "I've logged out." }, { zh: "用完記得登出。", jyut: "jung6 jyun4 gei3 dak1 dang1 ceot1.", en: "Remember to log out when you're done." } ],
  888: [ { zh: "我下載咗個應用程式。", jyut: "ngo5 haa6 zoi3 zo2 go3 jing3 jung6 cing4 sik1.", en: "I downloaded an app." }, { zh: "呢個好慢，下載緊。", jyut: "ni1 go3 hou2 maan6, haa6 zoi3 gan2.", en: "This is slow, still downloading." } ],
  889: [ { zh: "我上載緊相。", jyut: "ngo5 soeng5 zoi3 gan2 soeng2.", en: "I'm uploading photos." }, { zh: "你上載咗未呀？", jyut: "nei5 soeng5 zoi3 zo2 mei6 aa3?", en: "Have you uploaded it yet?" } ],
  890: [ { zh: "我要做更新程式。", jyut: "ngo5 jiu3 zou6 gang1 san1 cing4 sik1.", en: "I need to do a software update." }, { zh: "更新程式要好耐。", jyut: "gang1 san1 cing4 sik1 jiu3 hou2 noi6.", en: "Software updates take a long time." } ],
  891: [ { zh: "我鍾意用社交媒體。", jyut: "ngo5 zung1 ji3 jung6 se5 gaau1 mui4 tai2.", en: "I like using social media." }, { zh: "社交媒體好多人用。", jyut: "se5 gaau1 mui4 tai2 hou2 do1 jan4 jung6.", en: "A lot of people use social media." } ],
  892: [ { zh: "我睇緊佢個帖文。", jyut: "ngo5 tai2 gan2 keoi5 go3 tip3 man2.", en: "I'm reading his/her post." }, { zh: "呢個帖文好得意。", jyut: "ni1 go3 tip3 man2 hou2 dak1 ji3.", en: "This post is cute." } ],
  893: [ { zh: "我留咗個言。", jyut: "ngo5 lau4 zo2 go3 jin4.", en: "I left a comment." }, { zh: "唔該留言。", jyut: "m4 goi1 lau4 jin4.", en: "Please leave a comment." } ],
  894: [ { zh: "我讚好咗你嘅帖文。", jyut: "ngo5 zaan3 hou2 zo2 nei5 ge3 tip3 man2.", en: "I liked your post." }, { zh: "唔該讚好。", jyut: "m4 goi1 zaan3 hou2.", en: "Please like it." } ],
  895: [ { zh: "我睇緊直播。", jyut: "ngo5 tai2 gan2 zik6 bo3.", en: "I'm watching a livestream." }, { zh: "我哋而家直播緊。", jyut: "ngo5 dei6 ji4 gaa1 zik6 bo3 gan2.", en: "We're livestreaming right now." } ],
  896: [ { zh: "佢係網紅。", jyut: "keoi5 hai6 mong5 hung4.", en: "He/she is an influencer." }, { zh: "我鍾意呢個網紅。", jyut: "ngo5 zung1 ji3 ni1 go3 mong5 hung4.", en: "I like this influencer." } ],
  897: [ { zh: "部電腦有病毒。", jyut: "bou6 din6 nou5 jau5 beng6 duk6.", en: "The computer has a virus." }, { zh: "病毒好麻煩。", jyut: "beng6 duk6 hou2 maa4 faan4.", en: "Viruses are troublesome." } ],
  898: [ { zh: "我用防毒軟件。", jyut: "ngo5 jung6 fong4 duk6 jyun5 gin2.", en: "I use antivirus software." }, { zh: "呢個防毒軟件好好用。", jyut: "ni1 go3 fong4 duk6 jyun5 gin2 hou2 hou2 jung6.", en: "This antivirus software is great." } ],
  899: [ { zh: "部電話屏幕好大。", jyut: "bou6 din6 waa2 ping4 mok2 hou2 daai6.", en: "The phone's screen is big." }, { zh: "屏幕好污糟。", jyut: "ping4 mok2 hou2 wu1 zou1.", en: "The screen is dirty." } ],
  900: [ { zh: "我要充電。", jyut: "ngo5 jiu3 cung1 din6.", en: "I need to charge my phone." }, { zh: "手機充緊電。", jyut: "sau2 gei1 cung1 gan2 din6.", en: "The phone is charging." } ],
  901: [ { zh: "電池冇電喇。", jyut: "din6 ci4 mou5 din6 laa3.", en: "The battery is dead." }, { zh: "我要買電池。", jyut: "ngo5 jiu3 maai5 din6 ci4.", en: "I need to buy a battery." } ],
  902: [ { zh: "唔該開藍芽。", jyut: "m4 goi1 hoi1 laam4 ngaa4.", en: "Please turn on Bluetooth." }, { zh: "我用緊藍芽。", jyut: "ngo5 jung6 gan2 laam4 ngaa4.", en: "I'm using Bluetooth." } ],
};

Object.assign(HAND_SENTENCES, HAND_813_832, HAND_883_902);

// ===== 501-1000: Home & Furniture (903-922) =====
const HAND_903_922 = {
  903: [ { zh: "張沙發好舒服。", jyut: "zoeng1 saa1 faat3 hou2 syu1 fuk6.", en: "The sofa is comfortable." }, { zh: "我瞓喺沙發度。", jyut: "ngo5 fan3 hai2 saa1 faat3 dou6.", en: "I'm sleeping on the sofa." } ],
  904: [ { zh: "我啲衫喺衣櫃度。", jyut: "ngo5 di1 saam1 hai2 ji1 gwai6 dou6.", en: "My clothes are in the wardrobe." }, { zh: "衣櫃好大。", jyut: "ji1 gwai6 hou2 daai6.", en: "The wardrobe is big." } ],
  905: [ { zh: "呢面鏡好靚。", jyut: "ni1 min6 geng3 hou2 leng3.", en: "This mirror is nice." }, { zh: "我睇緊鏡。", jyut: "ngo5 tai2 gan2 geng3.", en: "I'm looking in the mirror." } ],
  906: [ { zh: "電掣喺邊度呀？", jyut: "din6 zai3 hai2 bin1 dou6 aa3?", en: "Where is the light switch?" }, { zh: "唔該開電掣。", jyut: "m4 goi1 hoi1 din6 zai3.", en: "Please turn on the switch." } ],
  907: [ { zh: "插蘇喺邊度呀？", jyut: "caap3 sou1 hai2 bin1 dou6 aa3?", en: "Where is the plug socket?" }, { zh: "呢個插蘇用唔到。", jyut: "ni1 go3 caap3 sou1 jung6 m4 dou2.", en: "This plug doesn't work." } ],
  908: [ { zh: "唔該閂水喉。", jyut: "m4 goi1 saan1 seoi2 hau4.", en: "Please turn off the tap." }, { zh: "水喉滴緊水。", jyut: "seoi2 hau4 dik6 gan2 seoi2.", en: "The tap is dripping." } ],
  909: [ { zh: "我用電飯煲煮飯。", jyut: "ngo5 jung6 din6 faan6 bou1 zyu2 faan6.", en: "I cook rice with a rice cooker." }, { zh: "電飯煲好好用。", jyut: "din6 faan6 bou1 hou2 hou2 jung6.", en: "The rice cooker is very useful." } ],
  910: [ { zh: "啲嘢喺雪櫃度。", jyut: "di1 je5 hai2 syut3 gwai6 dou6.", en: "The things are in the fridge." }, { zh: "雪櫃好凍。", jyut: "syut3 gwai6 hou2 dung3.", en: "The fridge is cold." } ],
  911: [ { zh: "我用洗衣機洗衫。", jyut: "ngo5 jung6 sai2 ji1 gei1 sai2 saam1.", en: "I wash clothes with the washing machine." }, { zh: "洗衣機好舊。", jyut: "sai2 ji1 gei1 hou2 gau6.", en: "The washing machine is old." } ],
  912: [ { zh: "我用微波爐叮嘢食。", jyut: "ngo5 jung6 mei4 bo1 lou4 ding1 je5 sik6.", en: "I microwave food." }, { zh: "唔該用微波爐叮熱佢。", jyut: "m4 goi1 jung6 mei4 bo1 lou4 ding1 jit6 keoi5.", en: "Please microwave it to heat it up." } ],
  913: [ { zh: "我用吸塵機。", jyut: "ngo5 jung6 kap1 can4 gei1.", en: "I use a vacuum cleaner." }, { zh: "吸塵機好嘈。", jyut: "kap1 can4 gei1 hou2 cou4.", en: "The vacuum cleaner is noisy." } ],
  914: [ { zh: "垃圾桶喺邊度呀？", jyut: "laap6 saap3 tung2 hai2 bin1 dou6 aa3?", en: "Where is the trash bin?" }, { zh: "垃圾桶滿咗。", jyut: "laap6 saap3 tung2 mun5 zo2.", en: "The trash bin is full." } ],
  915: [ { zh: "我搵唔到鎖匙。", jyut: "ngo5 wan2 m4 dou2 so2 si4.", en: "I can't find my key." }, { zh: "你記得帶鎖匙未呀？", jyut: "nei5 gei3 dak1 daai3 so2 si4 mei6 aa3?", en: "Did you remember to bring your key?" } ],
  916: [ { zh: "遙控器喺邊度呀？", jyut: "jiu4 hung3 hei3 hai2 bin1 dou6 aa3?", en: "Where's the remote?" }, { zh: "唔該畀遙控器我。", jyut: "m4 goi1 bei2 jiu4 hung3 hei3 ngo5.", en: "Please give me the remote." } ],
  917: [ { zh: "我上緊樓梯。", jyut: "ngo5 soeng5 gan2 lau4 tai1.", en: "I'm going up the stairs." }, { zh: "樓梯好長。", jyut: "lau4 tai1 hou2 coeng4.", en: "The stairs are long." } ],
  918: [ { zh: "我哋坐電梯。", jyut: "ngo5 dei6 co5 din6 tai1.", en: "We're taking the elevator." }, { zh: "電梯好慢。", jyut: "din6 tai1 hou2 maan6.", en: "The elevator is slow." } ],
  919: [ { zh: "我喺露台。", jyut: "ngo5 hai2 lou6 toi4.", en: "I'm on the balcony." }, { zh: "露台有好多花。", jyut: "lou6 toi4 jau5 hou2 do1 faa1.", en: "The balcony has a lot of flowers." } ],
  920: [ { zh: "天花板好高。", jyut: "tin1 faa1 baan2 hou2 gou1.", en: "The ceiling is high." }, { zh: "天花板有隻蟲。", jyut: "tin1 faa1 baan2 jau5 zek3 cung4.", en: "There's an insect on the ceiling." } ],
  921: [ { zh: "地板好乾淨。", jyut: "dei6 baan2 hou2 gon1 zeng6.", en: "The floor is clean." }, { zh: "地板好污糟。", jyut: "dei6 baan2 hou2 wu1 zou1.", en: "The floor is dirty." } ],
  922: [ { zh: "呢面牆好靚。", jyut: "ni1 min6 coeng4 hou2 leng3.", en: "This wall is nice." }, { zh: "牆好高。", jyut: "coeng4 hou2 gou1.", en: "The wall is tall." } ],
};

// ===== 501-1000: Nature & Animals (923-942) =====
const HAND_923_942 = {
  923: [ { zh: "我鍾意熊貓。", jyut: "ngo5 zung1 ji3 hung4 maau1.", en: "I like pandas." }, { zh: "隻熊貓好得意。", jyut: "zek3 hung4 maau1 hou2 dak1 ji3.", en: "The panda is cute." } ],
  924: [ { zh: "我鍾意獅子。", jyut: "ngo5 zung1 ji3 si1 zi2.", en: "I like lions." }, { zh: "隻獅子好大。", jyut: "zek3 si1 zi2 hou2 daai6.", en: "The lion is big." } ],
  925: [ { zh: "我鍾意老虎。", jyut: "ngo5 zung1 ji3 lou5 fu2.", en: "I like tigers." }, { zh: "隻老虎好得意。", jyut: "zek3 lou5 fu2 hou2 dak1 ji3.", en: "The tiger is cute." } ],
  926: [ { zh: "我鍾意大象。", jyut: "ngo5 zung1 ji3 daai6 zoeng6.", en: "I like elephants." }, { zh: "隻大象好大。", jyut: "zek3 daai6 zoeng6 hou2 daai6.", en: "The elephant is big." } ],
  927: [ { zh: "我鍾意猴子。", jyut: "ngo5 zung1 ji3 hau4 zi2.", en: "I like monkeys." }, { zh: "隻猴子好得意。", jyut: "zek3 hau4 zi2 hou2 dak1 ji3.", en: "The monkey is cute." } ],
  928: [ { zh: "我好驚蛇。", jyut: "ngo5 hou2 geng1 se4.", en: "I'm very scared of snakes." }, { zh: "隻蛇好長。", jyut: "zek3 se4 hou2 coeng4.", en: "The snake is long." } ],
  929: [ { zh: "我鍾意烏龜。", jyut: "ngo5 zung1 ji3 wu1 gwai1.", en: "I like turtles." }, { zh: "隻烏龜行得好慢。", jyut: "zek3 wu1 gwai1 haang4 dak1 hou2 maan6.", en: "The turtle walks very slowly." } ],
  930: [ { zh: "我鍾意蝴蝶。", jyut: "ngo5 zung1 ji3 wu4 dip2.", en: "I like butterflies." }, { zh: "隻蝴蝶好靚。", jyut: "zek3 wu4 dip2 hou2 leng3.", en: "The butterfly is beautiful." } ],
  931: [ { zh: "我好驚蜜蜂。", jyut: "ngo5 hou2 geng1 mat6 fung1.", en: "I'm scared of bees." }, { zh: "隻蜜蜂好細。", jyut: "zek3 mat6 fung1 hou2 sai3.", en: "The bee is small." } ],
  932: [ { zh: "我好驚蚊。", jyut: "ngo5 hou2 geng1 man1.", en: "I'm scared of mosquitoes." }, { zh: "呢度好多蚊。", jyut: "ni1 dou6 hou2 do1 man1.", en: "There are a lot of mosquitoes here." } ],
  933: [ { zh: "樹葉係綠色嘅。", jyut: "syu6 jip6 hai6 luk6 sik1 ge3.", en: "Leaves are green." }, { zh: "好多樹葉喺度。", jyut: "hou2 do1 syu6 jip6 hai2 dou6.", en: "There are a lot of leaves here." } ],
  934: [ { zh: "呢條樹枝好長。", jyut: "ni1 tiu4 syu6 zi1 hou2 coeng4.", en: "This branch is long." }, { zh: "隻雀仔企喺樹枝度。", jyut: "zek3 zoek3 zai2 kei5 hai2 syu6 zi1 dou6.", en: "The bird is standing on the branch." } ],
  935: [ { zh: "呢啲種子好細。", jyut: "ni1 di1 zung2 zi2 hou2 sai3.", en: "These seeds are small." }, { zh: "呢啲係花嘅種子。", jyut: "ni1 di1 hai6 faa1 ge3 zung2 zi2.", en: "These are flower seeds." } ],
  936: [ { zh: "呢度嘅泥土好濕。", jyut: "ni1 dou6 ge3 nai4 tou2 hou2 sap1.", en: "The soil here is wet." }, { zh: "花園嘅泥土好靚。", jyut: "faa1 jyun4 ge3 nai4 tou2 hou2 leng3.", en: "The garden's soil is good." } ],
  937: [ { zh: "呢個湖好靚。", jyut: "ni1 go3 wu4 hou2 leng3.", en: "This lake is beautiful." }, { zh: "湖度有魚。", jyut: "wu4 dou6 jau5 jyu2.", en: "There are fish in the lake." } ],
  938: [ { zh: "呢個瀑布好靚。", jyut: "ni1 go3 buk6 bou3 hou2 leng3.", en: "This waterfall is beautiful." }, { zh: "瀑布好大聲。", jyut: "buk6 bou3 hou2 daai6 seng1.", en: "The waterfall is very loud." } ],
  939: [ { zh: "呢個火山好高。", jyut: "ni1 go3 fo2 saan1 hou2 gou1.", en: "This volcano is tall." }, { zh: "火山好危險。", jyut: "fo2 saan1 hou2 ngai4 him2.", en: "Volcanoes are dangerous." } ],
  940: [ { zh: "啱啱有地震。", jyut: "aam1 aam1 jau5 dei6 zan3.", en: "There was just an earthquake." }, { zh: "地震好危險。", jyut: "dei6 zan3 hou2 ngai4 him2.", en: "Earthquakes are dangerous." } ],
  941: [ { zh: "聽日有颱風。", jyut: "ting1 jat6 jau5 toi4 fung1.", en: "There's a typhoon tomorrow." }, { zh: "颱風嗰陣要小心。", jyut: "toi4 fung1 go2 zan6 jiu3 siu2 sam1.", en: "Be careful during typhoons." } ],
  942: [ { zh: "我睇見彩虹。", jyut: "ngo5 tai2 gin3 coi2 hung4.", en: "I see a rainbow." }, { zh: "彩虹好靚。", jyut: "coi2 hung4 hou2 leng3.", en: "The rainbow is beautiful." } ],
};

Object.assign(HAND_SENTENCES, HAND_903_922, HAND_923_942);

// ===== 501-1000: Food Extra (943-962) =====
const HAND_943_962 = {
  943: [ { zh: "我想食叉燒包。", jyut: "ngo5 soeng2 sik6 caa1 siu1 baau1.", en: "I want to eat a char siu bun." }, { zh: "叉燒包好好食。", jyut: "caa1 siu1 baau1 hou2 hou2 sik6.", en: "Char siu buns are delicious." } ],
  944: [ { zh: "我想食蝦餃。", jyut: "ngo5 soeng2 sik6 haa1 gaau2.", en: "I want to eat shrimp dumplings." }, { zh: "蝦餃係蒸嘅。", jyut: "haa1 gaau2 hai6 zing1 ge3.", en: "Shrimp dumplings are steamed." } ],
  945: [ { zh: "我想食春卷。", jyut: "ngo5 soeng2 sik6 ceon1 gyun2.", en: "I want to eat spring rolls." }, { zh: "春卷好好食。", jyut: "ceon1 gyun2 hou2 hou2 sik6.", en: "Spring rolls are delicious." } ],
  946: [ { zh: "我想食炒飯。", jyut: "ngo5 soeng2 sik6 caau2 faan6.", en: "I want to eat fried rice." }, { zh: "呢碟炒飯好好食。", jyut: "ni1 dip2 caau2 faan6 hou2 hou2 sik6.", en: "This fried rice is delicious." } ],
  947: [ { zh: "我想食炒麵。", jyut: "ngo5 soeng2 sik6 caau2 min6.", en: "I want to eat fried noodles." }, { zh: "呢碟炒麵好好食。", jyut: "ni1 dip2 caau2 min6 hou2 hou2 sik6.", en: "This fried noodles is delicious." } ],
  948: [ { zh: "我想食焗豬扒飯。", jyut: "ngo5 soeng2 sik6 guk6 zyu1 paa2 faan6.", en: "I want to eat baked pork chop rice." }, { zh: "焗豬扒飯好熱。", jyut: "guk6 zyu1 paa2 faan6 hou2 jit6.", en: "Baked pork chop rice is very hot." } ],
  949: [ { zh: "我想食沙律。", jyut: "ngo5 soeng2 sik6 saa1 leot2.", en: "I want to eat salad." }, { zh: "呢個沙律好好食。", jyut: "ni1 go3 saa1 leot2 hou2 hou2 sik6.", en: "This salad is delicious." } ],
  950: [ { zh: "我想食薯條。", jyut: "ngo5 soeng2 sik6 syu4 tiu4.", en: "I want to eat fries." }, { zh: "薯條好好食。", jyut: "syu4 tiu4 hou2 hou2 sik6.", en: "Fries are delicious." } ],
  951: [ { zh: "我想食漢堡包。", jyut: "ngo5 soeng2 sik6 hon3 bou2 baau1.", en: "I want to eat a hamburger." }, { zh: "呢個漢堡包好大。", jyut: "ni1 go3 hon3 bou2 baau1 hou2 daai6.", en: "This hamburger is big." } ],
  952: [ { zh: "我想食三文治。", jyut: "ngo5 soeng2 sik6 saam1 man4 zi6.", en: "I want to eat a sandwich." }, { zh: "呢個三文治好好食。", jyut: "ni1 go3 saam1 man4 zi6 hou2 hou2 sik6.", en: "This sandwich is delicious." } ],
  953: [ { zh: "我想食意粉。", jyut: "ngo5 soeng2 sik6 ji3 fan2.", en: "I want to eat pasta." }, { zh: "呢碟意粉好好食。", jyut: "ni1 dip2 ji3 fan2 hou2 hou2 sik6.", en: "This pasta is delicious." } ],
  954: [ { zh: "我鍾意食芝士。", jyut: "ngo5 zung1 ji3 sik6 zi1 si2.", en: "I like eating cheese." }, { zh: "呢個芝士好貴。", jyut: "ni1 go3 zi1 si2 hou2 gwai3.", en: "This cheese is expensive." } ],
  955: [ { zh: "我想飲牛奶。", jyut: "ngo5 soeng2 jam2 ngau4 naai5.", en: "I want to drink milk." }, { zh: "呢杯牛奶好凍。", jyut: "ni1 bui1 ngau4 naai5 hou2 dung3.", en: "This milk is very cold." } ],
  956: [ { zh: "我想飲豆漿。", jyut: "ngo5 soeng2 jam2 dau6 zoeng1.", en: "I want to drink soy milk." }, { zh: "呢杯豆漿好熱。", jyut: "ni1 bui1 dau6 zoeng1 hou2 jit6.", en: "This soy milk is hot." } ],
  957: [ { zh: "我要啲果醬。", jyut: "ngo5 jiu3 di1 gwo2 zoeng3.", en: "I want some jam." }, { zh: "呢個果醬好好食。", jyut: "ni1 go3 gwo2 zoeng3 hou2 hou2 sik6.", en: "This jam is delicious." } ],
  958: [ { zh: "唔該畀啲醬油。", jyut: "m4 goi1 bei2 di1 zoeng3 jau4.", en: "Please give me some soy sauce." }, { zh: "呢個要加醬油。", jyut: "ni1 go3 jiu3 gaa1 zoeng3 jau4.", en: "This needs soy sauce added." } ],
  959: [ { zh: "唔該畀啲醋。", jyut: "m4 goi1 bei2 di1 cou3.", en: "Please give me some vinegar." }, { zh: "呢個要加醋。", jyut: "ni1 go3 jiu3 gaa1 cou3.", en: "This needs vinegar added." } ],
  960: [ { zh: "我唔食辣椒。", jyut: "ngo5 m4 sik6 laat6 ziu1.", en: "I don't eat chili peppers." }, { zh: "呢個辣椒好辣。", jyut: "ni1 go3 laat6 ziu1 hou2 laat6.", en: "This chili pepper is very spicy." } ],
  961: [ { zh: "我唔鍾意薑。", jyut: "ngo5 m4 zung1 ji3 goeng1.", en: "I don't like ginger." }, { zh: "呢個有薑味。", jyut: "ni1 go3 jau5 goeng1 mei6.", en: "This has a ginger flavor." } ],
  962: [ { zh: "我唔鍾意蒜頭。", jyut: "ngo5 m4 zung1 ji3 syun3 tau4.", en: "I don't like garlic." }, { zh: "呢個有蒜頭味。", jyut: "ni1 go3 jau5 syun3 tau4 mei6.", en: "This has a garlic flavor." } ],
};

// ===== 501-1000: Materials & Science (963-982) =====
const HAND_963_982 = {
  963: [ { zh: "呢張枱係木嘅。", jyut: "ni1 zoeng1 toi2 hai6 muk6 ge3.", en: "This table is made of wood." }, { zh: "我鍾意木嘅嘢。", jyut: "ngo5 zung1 ji3 muk6 ge3 je5.", en: "I like wooden things." } ],
  964: [ { zh: "呢個係金屬嘅。", jyut: "ni1 go3 hai6 gam1 suk6 ge3.", en: "This is made of metal." }, { zh: "金屬好重。", jyut: "gam1 suk6 hou2 cung5.", en: "Metal is heavy." } ],
  965: [ { zh: "呢個係塑膠嘅。", jyut: "ni1 go3 hai6 sok3 gaau1 ge3.", en: "This is made of plastic." }, { zh: "塑膠好輕。", jyut: "sok3 gaau1 hou2 heng1.", en: "Plastic is light." } ],
  966: [ { zh: "呢個係玻璃嘅。", jyut: "ni1 go3 hai6 bo1 lei1 ge3.", en: "This is made of glass." }, { zh: "小心，呢個係玻璃。", jyut: "siu2 sam1, ni1 go3 hai6 bo1 lei1.", en: "Be careful, this is glass." } ],
  967: [ { zh: "呢件衫係布嘅。", jyut: "ni1 gin6 saam1 hai6 bou3 ge3.", en: "This shirt is made of cloth." }, { zh: "呢塊布好靚。", jyut: "ni1 faai3 bou3 hou2 leng3.", en: "This piece of cloth is nice." } ],
  968: [ { zh: "呢對鞋係皮嘅。", jyut: "ni1 deoi3 haai4 hai6 pei4 ge3.", en: "These shoes are made of leather." }, { zh: "我個皮好乾。", jyut: "ngo5 go3 pei4 hou2 gon1.", en: "My skin is dry." } ],
  969: [ { zh: "呢個係三角形。", jyut: "ni1 go3 hai6 saam1 gok3 jing4.", en: "This is a triangle." }, { zh: "我畫咗個三角形。", jyut: "ngo5 waak6 zo2 go3 saam1 gok3 jing4.", en: "I drew a triangle." } ],
  970: [ { zh: "呢個係正方形。", jyut: "ni1 go3 hai6 zing3 fong1 jing4.", en: "This is a square." }, { zh: "我畫咗個正方形。", jyut: "ngo5 waak6 zo2 go3 zing3 fong1 jing4.", en: "I drew a square." } ],
  971: [ { zh: "呢個係長方形。", jyut: "ni1 go3 hai6 coeng4 fong1 jing4.", en: "This is a rectangle." }, { zh: "張枱係長方形。", jyut: "zoeng1 toi2 hai6 coeng4 fong1 jing4.", en: "The table is rectangular." } ],
  972: [ { zh: "呢個係圓形。", jyut: "ni1 go3 hai6 jyun4 jing4.", en: "This is a circle." }, { zh: "個波係圓形。", jyut: "go3 bo1 hai6 jyun4 jing4.", en: "The ball is round." } ],
  973: [ { zh: "我鍾意科學。", jyut: "ngo5 zung1 ji3 fo1 hok6.", en: "I like science." }, { zh: "科學好難。", jyut: "fo1 hok6 hou2 naan4.", en: "Science is difficult." } ],
  974: [ { zh: "呢個係化學反應。", jyut: "ni1 go3 hai6 faa3 hok6 faan2 jing3.", en: "This is a chemical reaction." }, { zh: "化學反應好快。", jyut: "faa3 hok6 faan2 jing3 hou2 faai3.", en: "The chemical reaction is fast." } ],
  975: [ { zh: "我哋做緊實驗。", jyut: "ngo5 dei6 zou6 gan2 sat6 jim6.", en: "We're doing an experiment." }, { zh: "實驗做完喇。", jyut: "sat6 jim6 zou6 jyun4 laa3.", en: "The experiment is done." } ],
  976: [ { zh: "原子好細。", jyut: "jyun4 zi2 hou2 sai3.", en: "Atoms are very small." }, { zh: "呢個係原子。", jyut: "ni1 go3 hai6 jyun4 zi2.", en: "This is an atom." } ],
  977: [ { zh: "我冇能量。", jyut: "ngo5 mou5 nang4 loeng6.", en: "I have no energy." }, { zh: "太陽畀我哋能量。", jyut: "taai3 joeng4 bei2 ngo5 dei6 nang4 loeng6.", en: "The sun gives us energy." } ],
  978: [ { zh: "重力好緊要。", jyut: "cung5 lik6 hou2 gan2 jiu3.", en: "Gravity is very important." }, { zh: "因為重力，我哋唔會飛。", jyut: "jan1 wai6 cung5 lik6, ngo5 dei6 m4 wui5 fei1.", en: "Because of gravity, we don't fly." } ],
  979: [ { zh: "今日溫度好高。", jyut: "gam1 jat6 wan1 dou6 hou2 gou1.", en: "Today's temperature is high." }, { zh: "呢度溫度好凍。", jyut: "ni1 dou6 wan1 dou6 hou2 dung3.", en: "It's cold here." } ],
  980: [ { zh: "呢架車速度好快。", jyut: "ni1 gaa3 ce1 cuk1 dou6 hou2 faai3.", en: "This car's speed is fast." }, { zh: "火車速度好快。", jyut: "fo2 ce1 cuk1 dou6 hou2 faai3.", en: "The train's speed is fast." } ],
  981: [ { zh: "距離幾遠呀？", jyut: "keoi5 lei4 gei2 jyun5 aa3?", en: "How far is the distance?" }, { zh: "我哋距離好遠。", jyut: "ngo5 dei6 keoi5 lei4 hou2 jyun5.", en: "We are far apart." } ],
  982: [ { zh: "呢間房面積好大。", jyut: "ni1 gaan1 fong2 min6 zik1 hou2 daai6.", en: "This room has a large area." }, { zh: "呢個地方面積好細。", jyut: "ni1 go3 dei6 fong1 min6 zik1 hou2 sai3.", en: "This place has a small area." } ],
};

Object.assign(HAND_SENTENCES, HAND_943_962, HAND_963_982);

// ===== 501-1000: News & Environment (983-1000) =====
const HAND_983_1000 = {
  983: [ { zh: "我睇緊新聞。", jyut: "ngo5 tai2 gan2 san1 man4.", en: "I'm watching the news." }, { zh: "呢個新聞好特別。", jyut: "ni1 go3 san1 man4 hou2 dak6 bit6.", en: "This news is very unusual." } ],
  984: [ { zh: "我聽緊電台。", jyut: "ngo5 teng1 gan2 din6 toi4.", en: "I'm listening to the radio." }, { zh: "呢個電台好好聽。", jyut: "ni1 go3 din6 toi4 hou2 hou2 teng1.", en: "This radio station sounds great." } ],
  985: [ { zh: "呢個廣告好得意。", jyut: "ni1 go3 gwong2 gou3 hou2 dak1 ji3.", en: "This ad is cute." }, { zh: "我唔鍾意廣告。", jyut: "ngo5 m4 zung1 ji3 gwong2 gou3.", en: "I don't like ads." } ],
  986: [ { zh: "我做緊訪問。", jyut: "ngo5 zou6 gan2 fong2 man6.", en: "I'm doing an interview." }, { zh: "記者訪問咗佢。", jyut: "gei3 ze2 fong2 man6 zo2 keoi5.", en: "The journalist interviewed him/her." } ],
  987: [ { zh: "呢度污染好多。", jyut: "ni1 dou6 wu1 jim5 hou2 do1.", en: "There's a lot of pollution here." }, { zh: "我哋要減少污染。", jyut: "ngo5 dei6 jiu3 gaam2 siu2 wu1 jim5.", en: "We need to reduce pollution." } ],
  988: [ { zh: "我哋要回收。", jyut: "ngo5 dei6 jiu3 wui4 sau1.", en: "We need to recycle." }, { zh: "呢個可以回收。", jyut: "ni1 go3 ho2 ji5 wui4 sau1.", en: "This can be recycled." } ],
  989: [ { zh: "呢個好環保。", jyut: "ni1 go3 hou2 waan4 bou2.", en: "This is eco-friendly." }, { zh: "我哋要環保啲。", jyut: "ngo5 dei6 jiu3 waan4 bou2 di1.", en: "We need to be more eco-friendly." } ],
  990: [ { zh: "氣候變化好緊要。", jyut: "hei3 hau6 bin3 faa3 hou2 gan2 jiu3.", en: "Climate change is very important." }, { zh: "我哋要注意氣候變化。", jyut: "ngo5 dei6 jiu3 zyu3 ji3 hei3 hau6 bin3 faa3.", en: "We need to pay attention to climate change." } ],
  991: [ { zh: "我哋要省能源。", jyut: "ngo5 dei6 jiu3 saang2 nang4 jyun4.", en: "We need to save energy." }, { zh: "太陽能係一種能源。", jyut: "taai3 joeng4 nang4 hai6 jat1 zung2 nang4 jyun4.", en: "Solar power is a type of energy." } ],
  992: [ { zh: "我哋用太陽能。", jyut: "ngo5 dei6 jung6 taai3 joeng4 nang4.", en: "We use solar energy." }, { zh: "太陽能好環保。", jyut: "taai3 joeng4 nang4 hou2 waan4 bou2.", en: "Solar energy is eco-friendly." } ],
  993: [ { zh: "我哋要保護地球。", jyut: "ngo5 dei6 jiu3 bou2 wu6 dei6 kau4.", en: "We need to protect the Earth." }, { zh: "地球好靚。", jyut: "dei6 kau4 hou2 leng3.", en: "The Earth is beautiful." } ],
  994: [ { zh: "宇宙好大。", jyut: "jyu5 zau6 hou2 daai6.", en: "The universe is huge." }, { zh: "我鍾意諗宇宙。", jyut: "ngo5 zung1 ji3 nam2 jyu5 zau6.", en: "I like thinking about the universe." } ],
  995: [ { zh: "我想去太空。", jyut: "ngo5 soeng2 heoi3 taai3 hung1.", en: "I want to go to space." }, { zh: "太空好靜。", jyut: "taai3 hung1 hou2 zing6.", en: "Space is very quiet." } ],
  996: [ { zh: "我鍾意睇星星。", jyut: "ngo5 zung1 ji3 tai2 sing1 sing1.", en: "I like watching stars." }, { zh: "夜晚有好多星星。", jyut: "je6 maan5 jau5 hou2 do1 sing1 sing1.", en: "There are a lot of stars at night." } ],
  997: [ { zh: "月亮好靚。", jyut: "jyut6 loeng6 hou2 leng3.", en: "The moon is beautiful." }, { zh: "我睇緊月亮。", jyut: "ngo5 tai2 gan2 jyut6 loeng6.", en: "I'm looking at the moon." } ],
  998: [ { zh: "我對未來好樂觀。", jyut: "ngo5 deoi3 mei6 loi4 hou2 lok6 gun1.", en: "I'm optimistic about the future." }, { zh: "未來會點呀？", jyut: "mei6 loi4 wui5 dim2 aa3?", en: "What will the future be like?" } ],
  999: [ { zh: "過去嘅事我唔想諗。", jyut: "gwo3 heoi3 ge3 si6 ngo5 m4 soeng2 nam2.", en: "I don't want to think about the past." }, { zh: "過去我住喺呢度。", jyut: "gwo3 heoi3 ngo5 zyu6 hai2 ni1 dou6.", en: "In the past, I lived here." } ],
  1000: [ { zh: "現在幾點呀？", jyut: "jin6 zoi6 gei2 dim2 aa3?", en: "What time is it now?" }, { zh: "現在你喺邊度呀？", jyut: "jin6 zoi6 nei5 hai2 bin1 dou6 aa3?", en: "Where are you now?" } ],
};

Object.assign(HAND_SENTENCES, HAND_983_1000);

// ===== Grammar essentials: particles, aspect markers, classifiers, and
// common connecting words (ids 1500+) =====
const HAND_1500_1516 = {
  1500: [ { zh: "你係邊個呀？", jyut: "nei5 hai6 bin1 go3 aa3?", en: "Who are you?" }, { zh: "今日天氣好好呀。", jyut: "gam1 jat6 tin1 hei3 hou2 hou2 aa3.", en: "The weather is really nice today." } ],
  1501: [ { zh: "呢個係真㗎。", jyut: "ni1 go3 hai6 zan1 ge3 gaa3.", en: "This is real, you know." }, { zh: "我唔係開玩笑㗎。", jyut: "ngo5 m4 hai6 hoi1 wun4 siu3 gaa3.", en: "I'm not joking." } ],
  1502: [ { zh: "我食完喇。", jyut: "ngo5 sik6 jyun4 laa3.", en: "I've finished eating." }, { zh: "冇喇，用晒喇。", jyut: "mou5 laa3, jung6 saai3 laa3.", en: "There's none left, it's all used up." } ],
  1503: [ { zh: "我食咗飯。", jyut: "ngo5 sik6 zo2 faan6.", en: "I've eaten." }, { zh: "佢走咗喇。", jyut: "keoi5 zau2 zo2 laa3.", en: "He/she has already left." } ],
  1504: [ { zh: "我食緊飯。", jyut: "ngo5 sik6 gan2 faan6.", en: "I'm eating right now." }, { zh: "佢瞓緊覺。", jyut: "keoi5 fan3 gan2 gaau3.", en: "He/she is sleeping right now." } ],
  1505: [ { zh: "我食晒啲飯。", jyut: "ngo5 sik6 saai3 di1 faan6.", en: "I ate all of the rice." }, { zh: "啲嘢用晒喇。", jyut: "di1 je5 jung6 saai3 laa3.", en: "The things are all used up." } ],
  1506: [ { zh: "呢個好靚。", jyut: "ni1 go3 hou2 leng3.", en: "This one is really nice." }, { zh: "畀個蘋果我。", jyut: "bei2 go3 ping4 gwo2 ngo5.", en: "Give me an apple." } ],
  1507: [ { zh: "呢件衫好靚。", jyut: "ni1 gin6 saam1 hou2 leng3.", en: "This shirt is really nice." }, { zh: "呢件事好緊要。", jyut: "ni1 gin6 si6 hou2 gan2 jiu3.", en: "This matter is very important." } ],
  1508: [ { zh: "呢間屋好大。", jyut: "ni1 gaan1 uk1 hou2 daai6.", en: "This house is really big." }, { zh: "嗰間舖頭幾靚。", jyut: "go2 gaan1 pou3 tau2 gei2 leng3.", en: "That shop is quite nice." } ],
  1509: [ { zh: "我一諗就明。", jyut: "ngo5 jat1 nam2 zau6 ming4.", en: "As soon as I thought about it, I understood." }, { zh: "咁就得喇。", jyut: "gam3 zau6 dak1 laa3.", en: "That'll do then." } ],
  1510: [ { zh: "佢又嚟喇。", jyut: "keoi5 jau6 lai4 laa3.", en: "He/she is here again." }, { zh: "我又肚餓喇。", jyut: "ngo5 jau6 tou5 ngo6 laa3.", en: "I'm hungry again." } ],
  1511: [ { zh: "我喺屋企。", jyut: "ngo5 hai2 uk1 kei2.", en: "I'm at home." }, { zh: "佢喺邊度呀？", jyut: "keoi5 hai2 bin1 dou6 aa3?", en: "Where is he/she?" } ],
  1512: [ { zh: "呢個係我嘅。", jyut: "ni1 go3 hai6 ngo5 ge3.", en: "This one is mine." }, { zh: "佢嘅屋企好靚。", jyut: "keoi5 ge3 uk1 kei2 hou2 leng3.", en: "His/her home is really nice." } ],
  1513: [ { zh: "我食飯，你呢？", jyut: "ngo5 sik6 faan6, nei5 ne1?", en: "I'm eating, what about you?" }, { zh: "呢個呢？", jyut: "ni1 go3 ne1?", en: "What about this one?" } ],
  1514: [ { zh: "呢個幾好呀。", jyut: "ni1 go3 gei2 hou2 aa3.", en: "This one is quite good." }, { zh: "佢幾高㗎。", jyut: "keoi5 gei2 gou1 gaa3.", en: "He/she is quite tall." } ],
  1515: [ { zh: "我已經食咗飯。", jyut: "ngo5 ji5 ging1 sik6 zo2 faan6.", en: "I've already eaten." }, { zh: "佢已經返咗屋企。", jyut: "keoi5 ji5 ging1 faan1 zo2 uk1 kei2.", en: "He/she has already gone home." } ],
  1516: [ { zh: "咁又得嘅。", jyut: "gam2 jau6 dak1 ge3.", en: "That works too." }, { zh: "點解你咁講呀？", jyut: "dim2 gaai2 nei5 gam2 gong2 aa3?", en: "Why do you say it like that?" } ],
};

Object.assign(HAND_SENTENCES, HAND_1500_1516);

// ===== HK Restaurant bonus pack: Noodle shop menu (2192-2209) =====
const HAND_2192_2209 = {
  2192: [ { zh: "呢個係我哋嘅招牌菜。", jyut: "ni1 go3 hai6 ngo5 dei6 ge3 ziu1 paai4 coi3.", en: "This is our signature dish." }, { zh: "你哋間舖頭嘅招牌好靚。", jyut: "nei5 dei6 gaan1 pou3 tau2 ge3 ziu1 paai4 hou2 leng3.", en: "Your shop's sign is really nice." } ],
  2193: [ { zh: "老闆推介呢個畀我。", jyut: "lou5 baan2 teoi1 gaai3 ni1 go3 bei2 ngo5.", en: "The boss recommended this to me." }, { zh: "你有咩推介呀？", jyut: "nei5 jau5 me1 teoi1 gaai3 aa3?", en: "What do you recommend?" } ],
  2194: [ { zh: "我想食牛腩麵。", jyut: "ngo5 soeng2 sik6 ngau4 naam5 min6.", en: "I want to eat beef brisket noodles." }, { zh: "呢度嘅牛腩好腍。", jyut: "ni1 dou6 ge3 ngau4 naam5 hou2 nam4.", en: "The beef brisket here is very tender." } ],
  2195: [ { zh: "我鍾意食撈麵，唔要湯。", jyut: "ngo5 zung1 ji3 sik6 lou1 min6, m4 jiu3 tong1.", en: "I like eating tossed noodles, no soup." }, { zh: "呢碗撈麵好惹味。", jyut: "ni1 wun2 lou1 min6 hou2 je5 mei6.", en: "This bowl of tossed noodles is really flavorful." } ],
  2196: [ { zh: "佢鍾意食牛雜麵。", jyut: "keoi5 zung1 ji3 sik6 ngau4 zaap6 min6.", en: "He/she likes eating beef offal noodles." }, { zh: "牛雜要燉好耐先至腍。", jyut: "ngau4 zaap6 jiu3 dan6 hou2 noi6 sin1 zi3 nam4.", en: "Beef offal needs to be stewed a long time to get tender." } ],
  2197: [ { zh: "豬手麵幾多錢呀？", jyut: "zyu1 sau2 min6 gei2 do1 cin2 aa3?", en: "How much are the pork knuckle noodles?" }, { zh: "呢隻豬手燉得好腍。", jyut: "ni1 zek3 zyu1 sau2 dan6 dak1 hou2 nam4.", en: "This pork knuckle is stewed very tender." } ],
  2198: [ { zh: "我要一碗墨魚丸麵。", jyut: "ngo5 jiu3 jat1 wun2 mak6 jyu4 jyun2 min6.", en: "I want a bowl of cuttlefish ball noodles." }, { zh: "墨魚丸彈牙又好食。", jyut: "mak6 jyu4 jyun2 taan4 ngaa4 jau6 hou2 sik6.", en: "Cuttlefish balls are bouncy and delicious." } ],
  2199: [ { zh: "蝦子撈麵好香。", jyut: "haa1 zi2 lou1 min6 hou2 hoeng1.", en: "Shrimp roe tossed noodles smell great." }, { zh: "呢碗麵加咗蝦子。", jyut: "ni1 wun2 min6 gaa1 zo2 haa1 zi2.", en: "This bowl of noodles has shrimp roe added." } ],
  2200: [ { zh: "我要一碟乾炒牛河。", jyut: "ngo5 jiu3 jat1 dip2 gon1 caau2 ngau4 ho2.", en: "I want a plate of dry-fried beef ho fun." }, { zh: "乾炒牛河係好出名嘅香港菜。", jyut: "gon1 caau2 ngau4 ho2 hai6 hou2 ceot1 meng2 ge3 hoeng1 gong2 coi3.", en: "Dry-fried beef ho fun is a famous Hong Kong dish." } ],
  2201: [ { zh: "滷水豆腐好惹味。", jyut: "lou5 seoi2 dau6 fu6 hou2 je5 mei6.", en: "Braised tofu is really flavorful." }, { zh: "呢啲係滷水蛋。", jyut: "ni1 di1 hai6 lou5 seoi2 daan2.", en: "These are marinated eggs." } ],
  2202: [ { zh: "我想食豆腐。", jyut: "ngo5 soeng2 sik6 dau6 fu6.", en: "I want to eat tofu." }, { zh: "呢個豆腐好滑。", jyut: "ni1 go3 dau6 fu6 hou2 waat6.", en: "This tofu is very smooth." } ],
  2203: [ { zh: "我要一杯檸檬水。", jyut: "ngo5 jiu3 jat1 bui1 ning4 mung1 seoi2.", en: "I want a cup of lemon water." }, { zh: "檸檬好酸。", jyut: "ning4 mung1 hou2 syun1.", en: "Lemon is very sour." } ],
  2204: [ { zh: "唔該畀杯雪碧我。", jyut: "m4 goi1 bei2 bui1 syut3 bik1 ngo5.", en: "Please give me a Sprite." }, { zh: "你想飲可樂定係雪碧呀？", jyut: "nei5 soeng2 jam2 ho2 lok6 ding6 hai6 syut3 bik1 aa3?", en: "Do you want to drink Coke or Sprite?" } ],
  2205: [ { zh: "我用八達通畀錢。", jyut: "ngo5 jung6 baat3 daat6 tung1 bei2 cin2.", en: "I pay with my Octopus card." }, { zh: "你張八達通仲有幾多錢呀？", jyut: "nei5 zoeng1 baat3 daat6 tung1 zung6 jau5 gei2 do1 cin2 aa3?", en: "How much is left on your Octopus card?" } ],
  2206: [ { zh: "呢間舖頭嘅營業時間係幾點呀？", jyut: "ni1 gaan1 pou3 tau2 ge3 jing4 jip6 si4 gaan3 hai6 gei2 dim2 aa3?", en: "What are this shop's business hours?" }, { zh: "營業時間之外唔開門。", jyut: "jing4 jip6 si4 gaan3 zi1 ngoi6 m4 hoi1 mun4.", en: "It's not open outside business hours." } ],
  2207: [ { zh: "呢度嘅地址係咩呀？", jyut: "ni1 dou6 ge3 dei6 zi2 hai6 me1 aa3?", en: "What's the address here?" }, { zh: "唔該畀個地址我。", jyut: "m4 goi1 bei2 go3 dei6 zi2 ngo5.", en: "Please give me the address." } ],
  2208: [ { zh: "呢度仲有冇座位呀？", jyut: "ni1 dou6 zung6 jau5 mou5 zo6 wai2 aa3?", en: "Are there any seats left here?" }, { zh: "座位有限，要等。", jyut: "zo6 wai2 jau5 haan6, jiu3 dang2.", en: "Seats are limited, need to wait." } ],
  2209: [ { zh: "啲嘢食好新鮮。", jyut: "di1 je5 sik6 hou2 san1 sin1.", en: "The food is very fresh." }, { zh: "呢啲魚幾新鮮呀？", jyut: "ni1 di1 jyu2 gei2 san1 sin1 aa3?", en: "How fresh is this fish?" } ],
};

Object.assign(HAND_SENTENCES, HAND_2192_2209);

// Words tagged "classifier" (mostly ranks 331-345 & 848-860) get a usage
// pattern instead of a forced sentence — a bare classifier can't stand in a
// sentence without a number + noun, so showing how it combines is more
// honest and more useful.
const CLASSIFIER_IDS = new Set([
  ...Array.from({ length: 345 - 331 + 1 }, (_, i) => 331 + i),
  ...Array.from({ length: 860 - 848 + 1 }, (_, i) => 848 + i),
]);

function stripTo(en) {
  return en.replace(/^to\s+/i, "");
}

function cleanGloss(en) {
  const first = en.split(" / ")[0].trim();
  // Fully-parenthetical glosses (e.g. "(general classifier)") should keep
  // their content — only strip the parens — rather than vanish entirely.
  if (/^\(.*\)$/.test(first)) return first.slice(1, -1).trim();
  return first.replace(/\s*\([^)]*\)\s*/g, "").trim();
}

function posFor(word) {
  if (EXCEPTIONS[word.id]) return EXCEPTIONS[word.id];
  const range = RANGES.find(([min, max]) => word.rank >= min && word.rank <= max);
  return range ? range[2] : "noun";
}

function renderTemplate(word, pos, template) {
  const we = pos === "verb" ? stripTo(cleanGloss(word.english)) : cleanGloss(word.english);
  return {
    zh: template.zh.replace("{w}", word.traditional),
    jyut: template.jyut.replace("{wj}", word.jyutping),
    en: template.en.replace("{we}", we),
    highlight: word.traditional,
  };
}

function templateSlot(word, offset) {
  const pos = posFor(word);
  if (pos === "skip") return null;
  const bank = BANKS[pos];
  const base = FORCED_TEMPLATE[word.id] ?? word.id % bank.length;
  const idx = (base + offset) % bank.length;
  return renderTemplate(word, pos, bank[idx]);
}

// Returns { zh, jyut, en, highlight } or null if this word shouldn't get an
// example sentence (pronouns, particles, classifiers, standalone phrases).
export function buildExample(word) {
  if (HAND_SENTENCES[word.id]) {
    return { ...HAND_SENTENCES[word.id][0], highlight: word.traditional };
  }
  return templateSlot(word, 0);
}

// Returns [sentence1, sentence2], each either an example object or null.
// Used by the Lessons feature, which wants two distinct sentences per word.
export function buildExamplePair(word) {
  if (HAND_SENTENCES[word.id]) {
    return HAND_SENTENCES[word.id].map((s) => ({ ...s, highlight: word.traditional }));
  }
  const s1 = templateSlot(word, 0);
  if (!s1) return [null, null];
  const s2 = templateSlot(word, 1);
  return [s1, s2];
}

// For classifiers: "一個、兩個、呢個、嗰個" style usage pattern instead of a
// full sentence. Returns null for words that aren't tagged as classifiers.
export function buildUsageHint(word) {
  if (!CLASSIFIER_IDS.has(word.id)) return null;
  const w = word.traditional;
  const wj = word.jyutping;
  return {
    zh: `一${w}、兩${w}、呢${w}、嗰${w}`,
    jyut: `jat1 ${wj}、loeng5 ${wj}、ni1 ${wj}、go2 ${wj}`,
    en: "Pattern: one / two / this / that + this word — classifiers sit between a number or demonstrative and a noun.",
    highlight: w,
  };
}
