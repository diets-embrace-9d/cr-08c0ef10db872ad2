// Hand-authored short stories for lesson reading practice, one per lesson,
// each using every word taught in that lesson (plus ordinary connecting
// vocabulary and particles) woven into a short connected narrative — a
// second reading-practice mode alongside the per-word Sentence 2 list.
//
// Each lesson has TWO independent stories (different scenarios), both under
// the same strict rule: only TOP200 vocabulary words taught in THAT lesson
// or an earlier one in the course (never a word from a later lesson) —
// verified programmatically against data/lessons.js's actual per-lesson word
// lists before this file was written. Exempt from that rule (not
// "vocabulary" in the ordering sense): sentence particles, aspect markers,
// classifiers, and ordinary words that aren't part of the Top 200 list at
// all (fruit, market, shop, etc.) — those were always fair game.
//
// Keyed by "${courseId}:${lessonNumber}" -> array of stories, each an array
// of { zh, jyut, en } sentences.
export const STORIES = {
  "top200:1": [
    [
      {"zh": "呀？㗎！喇。", "jyut": "aa3? gaa3! laa3.", "en": "Huh? Really! There we go."},
      {"zh": "搞咗，又搞緊，搞晒。", "jyut": "gaau2 zo2, jau6 gaau2 gan2, gaau2 saai3.", "en": "Done it; also doing it again; all done."},
      {"zh": "個、件、間。", "jyut": "go3, gin6, gaan1.", "en": "One (thing), one (item), one (room)."},
      {"zh": "就咁喇。", "jyut": "zau6 gam2 laa3.", "en": "That's just how it is."},
      {"zh": "喺度嘅嘢，呢？", "jyut": "hai2 dou6 ge3 je5, ne1?", "en": "The thing that's right here — what about it?"},
      {"zh": "幾搞得掂㗎，已經搞掂喇。", "jyut": "gei2 gaau2 dak1 dim6 gaa3, ji5 ging1 gaau2 dim6 laa3.", "en": "It's fairly manageable — already sorted out."},
    ],
    [
      {"zh": "搞緊喇，又搞咗喇。", "jyut": "gaau2 gan2 laa3, jau6 gaau2 zo2 laa3.", "en": "Working on it now, and already did it too."},
      {"zh": "個、件、間——幾樣嘢。", "jyut": "go3, gin6, gaan1 — gei2 joeng6 je5.", "en": "One, one, one — a few kinds of things."},
      {"zh": "呢啲嘢實喺度嘅。", "jyut": "ni1 di1 je5 sat6 hai2 dou6 ge3.", "en": "This stuff is definitely right here."},
      {"zh": "就咁喇，已經搞掂晒。", "jyut": "zau6 gam2 laa3, ji5 ging1 gaau2 dim6 saai3.", "en": "That's it then — all sorted out already."},
      {"zh": "咁呀？實㗎！", "jyut": "gam2 aa3? sat6 gaa3!", "en": "Really? Definitely!"},
    ],
  ],
  "top200:2": [
    [
      {"zh": "有就係有，冇就係冇。", "jyut": "jau5 zau6 hai6 jau5, mou5 zau6 hai6 mou5.", "en": "Having is having, not having is not having."},
      {"zh": "係咪呢？", "jyut": "hai6 mai6 ne1?", "en": "Is that so?"},
      {"zh": "有嘅，又冇嘅。", "jyut": "jau5 ge3, jau6 mou5 ge3.", "en": "Some have it, some don't."},
    ],
    [
      {"zh": "係咪呢？有就有。", "jyut": "hai6 mai6 ne1? jau5 zau6 jau5.", "en": "Is that so? If you have it, you have it."},
      {"zh": "冇嘅，就係冇嘅。", "jyut": "mou5 ge3, zau6 hai6 mou5 ge3.", "en": "Not having it — that's just not having it."},
      {"zh": "有就係咁，冇又係咁。", "jyut": "jau5 zau6 hai6 gam2, mou5 jau6 hai6 gam2.", "en": "Having is like that, not having is like that too."},
    ],
  ],
  "top200:3": [
    [
      {"zh": "我有你，你有我。", "jyut": "ngo5 jau5 nei5, nei5 jau5 ngo5.", "en": "I have you, you have me."},
      {"zh": "你哋有我，我哋有你哋。", "jyut": "nei5 dei6 jau5 ngo5, ngo5 dei6 jau5 nei5 dei6.", "en": "You (all) have me, and we have you (all)."},
      {"zh": "佢哋有佢哋自己嘅嘢，佢有佢自己嘅嘢。", "jyut": "keoi5 dei6 jau5 keoi5 dei6 zi6 gei2 ge3 je5, keoi5 jau5 keoi5 zi6 gei2 ge3 je5.", "en": "They have their own things, and he has his own things too."},
    ],
    [
      {"zh": "我係我，你係你，佢係佢。", "jyut": "ngo5 hai6 ngo5, nei5 hai6 nei5, keoi5 hai6 keoi5.", "en": "I am me, you are you, he/she is him/her."},
      {"zh": "我哋係我哋，你哋係你哋，佢哋係佢哋。", "jyut": "ngo5 dei6 hai6 ngo5 dei6, nei5 dei6 hai6 nei5 dei6, keoi5 dei6 hai6 keoi5 dei6.", "en": "We are we, you (all) are you (all), they are they."},
      {"zh": "自己嘅嘢就係自己嘅。", "jyut": "zi6 gei2 ge3 je5 zau6 hai6 zi6 gei2 ge3.", "en": "Your own things are your own."},
    ],
  ],
  "top200:4": [
    [
      {"zh": "呢個係咩呀？", "jyut": "ni1 go3 hai6 me1 aa3?", "en": "What is this?"},
      {"zh": "嗰個又係咩呀？", "jyut": "go2 go3 jau6 hai6 me1 aa3?", "en": "And what's that one?"},
      {"zh": "邊個係我，邊個係你呀？", "jyut": "bin1 go3 hai6 ngo5, bin1 go3 hai6 nei5 aa3?", "en": "Which one is me, which one is you?"},
      {"zh": "我喺呢度，你喺嗰度。", "jyut": "ngo5 hai2 ni1 dou6, nei5 hai2 go2 dou6.", "en": "I'm here, you're there."},
      {"zh": "邊度呀？邊呀？", "jyut": "bin1 dou6 aa3? bin1 aa3?", "en": "Where? Which?"},
      {"zh": "幾時呢？幾多呀？", "jyut": "gei2 si4 ne1? gei2 do1 aa3?", "en": "When? How many?"},
      {"zh": "點解呢？點樣呢？", "jyut": "dim2 gaai2 ne1? dim2 joeng2 ne1?", "en": "Why? How?"},
      {"zh": "係乜嘢呀？", "jyut": "hai6 mat1 je5 aa3?", "en": "What is it?"},
    ],
    [
      {"zh": "邊個喺邊度呀？", "jyut": "bin1 go3 hai2 bin1 dou6 aa3?", "en": "Who's where?"},
      {"zh": "呢個，嗰個，邊個？", "jyut": "ni1 go3, go2 go3, bin1 go3?", "en": "This one, that one, which one?"},
      {"zh": "邊個喺呢度，邊個喺嗰度？", "jyut": "bin1 go3 hai2 ni1 dou6, bin1 go3 hai2 go2 dou6?", "en": "Who's here, who's there?"},
      {"zh": "點解呀？點樣呀？", "jyut": "dim2 gaai2 aa3? dim2 joeng2 aa3?", "en": "Why? How?"},
      {"zh": "幾多人？幾時呀？", "jyut": "gei2 do1 jan4? gei2 si4 aa3?", "en": "How many people? When?"},
      {"zh": "係乜嘢事呢？", "jyut": "hai6 mat1 je5 si6 ne1?", "en": "What is it about?"},
      {"zh": "咩呀？邊呀？", "jyut": "me1 aa3? bin1 aa3?", "en": "What? Which?"},
    ],
  ],
  "top200:5": [
    [
      {"zh": "零、一、二、三、四、五、六、七、八、九、十，一共十一個。", "jyut": "ling4, jat1, ji6, saam1, sei3, ng5, luk6, cat1, baat3, gau2, sap6, jat1 gung6 sap6 jat1 go3.", "en": "Zero, one, two, three, four, five, six, seven, eight, nine, ten — eleven in total."},
      {"zh": "十個十就係一百。", "jyut": "sap6 go3 sap6 zau6 hai6 jat1 baak3.", "en": "Ten tens make a hundred."},
      {"zh": "十個一百就係一千。", "jyut": "sap6 go3 jat1 baak3 zau6 hai6 jat1 cin1.", "en": "Ten hundreds make a thousand."},
      {"zh": "十個一千就係一萬。", "jyut": "sap6 go3 jat1 cin1 zau6 hai6 jat1 maan6.", "en": "Ten thousands make ten thousand."},
      {"zh": "兩個一萬呢？就係二萬囉。", "jyut": "loeng5 go3 jat1 maan6 ne1? zau6 hai6 ji6 maan6 lo1.", "en": "And two ten-thousands? That makes twenty thousand."},
    ],
    [
      {"zh": "一二三四五六七八九十。", "jyut": "jat1 ji6 saam1 sei3 ng5 luk6 cat1 baat3 gau2 sap6.", "en": "One two three four five six seven eight nine ten."},
      {"zh": "我有兩個，你又有兩個，一共有幾多個呢？", "jyut": "ngo5 jau5 loeng5 go3, nei5 jau6 jau5 loeng5 go3, jat1 gung6 jau5 gei2 do1 go3 ne1?", "en": "I have two, you have two as well — how many are there in total?"},
      {"zh": "十個十係一百，十個一百係一千。", "jyut": "sap6 go3 sap6 hai6 jat1 baak3, sap6 go3 jat1 baak3 hai6 jat1 cin1.", "en": "Ten tens is a hundred, ten hundreds is a thousand."},
      {"zh": "一千個十就係一萬。", "jyut": "jat1 cin1 go3 sap6 zau6 hai6 jat1 maan6.", "en": "A thousand tens makes ten thousand."},
      {"zh": "你有幾多個？我有零個。", "jyut": "nei5 jau5 gei2 do1 go3? ngo5 jau5 ling4 go3.", "en": "How many do you have? I have zero."},
    ],
  ],
  "top200:6": [
    [
      {"zh": "我要去，你想去邊度呢？", "jyut": "ngo5 jiu3 heoi3, nei5 soeng2 heoi3 bin1 dou6 ne1?", "en": "I need to go — where do you want to go?"},
      {"zh": "你話呢？你想去邊度呀？", "jyut": "nei5 waa6 ne1? nei5 soeng2 heoi3 bin1 dou6 aa3?", "en": "What do you say? Where do you want to go?"},
      {"zh": "我哋去嗰度食嘢、飲嘢。", "jyut": "ngo5 dei6 heoi3 go2 dou6 sik6 je5, jam2 je5.", "en": "We're going there to eat and drink."},
      {"zh": "跟住我哋做咩呢？睇戲，又講嘢。", "jyut": "gan1 zyu6 ngo5 dei6 zou6 me1 ne1? tai2 hei3, jau6 gong2 je5.", "en": "Then what do we do? Watch a movie, and chat."},
      {"zh": "你嚟呀！", "jyut": "nei5 lai4 aa3!", "en": "Come!"},
    ],
    [
      {"zh": "我想去邊度食嘢呀？", "jyut": "ngo5 soeng2 heoi3 bin1 dou6 sik6 je5 aa3?", "en": "Where do I want to go eat?"},
      {"zh": "我要飲嘢，你要嚟嗎？", "jyut": "ngo5 jiu3 jam2 je5, nei5 jiu3 lai4 maa1?", "en": "I want a drink, do you want to come?"},
      {"zh": "佢話想睇戲，又想食嘢。", "jyut": "keoi5 waa6 soeng2 tai2 hei3, jau6 soeng2 sik6 je5.", "en": "He/she said they want to watch a movie, and want to eat too."},
      {"zh": "嚟啦，我哋做嘢，又講嘢。", "jyut": "lai4 laa1, ngo5 dei6 zou6 je5, jau6 gong2 je5.", "en": "Come on, let's do things, and talk too."},
    ],
  ],
  "top200:7": [
    [
      {"zh": "我可以買嘅，你可以賣嘅。", "jyut": "ngo5 ho2 ji5 maai5 ge3, nei5 ho2 ji5 maai6 ge3.", "en": "I can be the buyer, you can be the seller."},
      {"zh": "我識你，你識我，我哋鍾意呢度，又愛呢度。", "jyut": "ngo5 sik1 nei5, nei5 sik1 ngo5, ngo5 dei6 zung1 ji3 ni1 dou6, jau6 oi3 ni1 dou6.", "en": "I know you, you know me, we like it here, and love it here too."},
      {"zh": "我知你想攞啲咩嘢，我畀你啦。", "jyut": "ngo5 zi1 nei5 soeng2 lo2 di1 me1 je5, ngo5 bei2 nei5 laa1.", "en": "I know what you want to take, let me give it to you."},
      {"zh": "呢度開咗，未閂。", "jyut": "ni1 dou6 hoi1 zo2, mei6 saan1.", "en": "This is open, not closed yet."},
    ],
    [
      {"zh": "我識做呢樣嘢。", "jyut": "ngo5 sik1 zou6 ni1 joeng6 je5.", "en": "I know how to do this."},
      {"zh": "我知你鍾意呢度，我又愛呢度。", "jyut": "ngo5 zi1 nei5 zung1 ji3 ni1 dou6, ngo5 jau6 oi3 ni1 dou6.", "en": "I know you like it here, and I love it here too."},
      {"zh": "你可以買，我可以賣。", "jyut": "nei5 ho2 ji5 maai5, ngo5 ho2 ji5 maai6.", "en": "You can buy, I can sell."},
      {"zh": "畀我攞嗰啲嘢，開咗佢。", "jyut": "bei2 ngo5 lo2 go2 di1 je5, hoi1 zo2 keoi5.", "en": "Give me that stuff, open it."},
      {"zh": "跟住閂咗佢喇。", "jyut": "gan1 zyu6 saan1 zo2 keoi5 laa3.", "en": "Then close it up."},
    ],
  ],
  "top200:8": [
    [
      {"zh": "我坐喺度，佢企喺度。", "jyut": "ngo5 co5 hai2 dou6, keoi5 kei5 hai2 dou6.", "en": "I'm sitting here, he's standing there."},
      {"zh": "我瞓咗，行返去嗰度就醒。", "jyut": "ngo5 fan3 zo2, haang4 faan1 heoi3 go2 dou6 zau6 sing2.", "en": "I slept, and woke up once I walked back over there."},
      {"zh": "走嗰陣，我返去攞返啲嘢。", "jyut": "zau2 go2 zan6, ngo5 faan1 heoi3 lo2 faan1 di1 je5.", "en": "As I was leaving, I went back to get my stuff."},
      {"zh": "到咗嗰度，我諗吓要做咩。", "jyut": "dou3 zo2 go2 dou6, ngo5 nam2 haa5 jiu3 zou6 me1.", "en": "Once I got there, I thought about what to do."},
      {"zh": "我記得呢度，唔記得個名。", "jyut": "ngo5 gei3 dak1 ni1 dou6, m4 gei3 dak1 go3 meng2.", "en": "I remember this place, but forget its name."},
    ],
    [
      {"zh": "你坐低，我企喺度。", "jyut": "nei5 co5 dai1, ngo5 kei5 hai2 dou6.", "en": "You sit down, I'll stand here."},
      {"zh": "我瞓咗，你去邊呀？", "jyut": "ngo5 fan3 zo2, nei5 heoi3 bin1 aa3?", "en": "I fell asleep, where did you go?"},
      {"zh": "行返嗰度，到咗話我知。", "jyut": "haang4 faan1 go2 dou6, dou3 zo2 waa6 ngo5 zi1.", "en": "Walk back there, and let me know once you arrive."},
      {"zh": "我諗住走，你記得嚟。", "jyut": "ngo5 nam2 zyu6 zau2, nei5 gei3 dak1 lai4.", "en": "I'm planning to leave, remember to come."},
      {"zh": "咪唔記得呀。", "jyut": "mai5 m4 gei3 dak1 aa3.", "en": "Don't forget."},
    ],
  ],
  "top200:9": [
    [
      {"zh": "我幫你搵嘢，你等等我。", "jyut": "ngo5 bong1 nei5 wan2 je5, nei5 dang2 dang2 ngo5.", "en": "I'll help you find it, you wait for me."},
      {"zh": "我哋見咗，佢教我點樣寫嘢。", "jyut": "ngo5 dei6 gin3 zo2, keoi5 gaau3 ngo5 dim2 joeng2 se2 je5.", "en": "We met, and he taught me how to write things."},
      {"zh": "我喺度學嘢，讀嘢，寫嘢。", "jyut": "ngo5 hai2 dou6 hok6 je5, duk6 je5, se2 je5.", "en": "I'm here studying, reading, and writing."},
      {"zh": "跟住我哋唱歌，又玩到夜。", "jyut": "gan1 zyu6 ngo5 dei6 coeng3 go1, jau6 waan2 dou3 je6.", "en": "Then we sang, and played until night."},
    ],
    [
      {"zh": "等等我，我幫你搵嘢。", "jyut": "dang2 dang2 ngo5, ngo5 bong1 nei5 wan2 je5.", "en": "Wait for me, I'll help you find it."},
      {"zh": "見到佢，佢教我讀嘢、寫嘢。", "jyut": "gin3 dou2 keoi5, keoi5 gaau3 ngo5 duk6 je5, se2 je5.", "en": "When I saw him/her, they taught me to read and write."},
      {"zh": "學晒就玩，又唱歌。", "jyut": "hok6 saai3 zau6 waan2, jau6 coeng3 go1.", "en": "Once done with studying, then play, and sing too."},
    ],
  ],
  "top200:10": [
    [
      {"zh": "我帶咗啲嘢返嚟，放低咗。", "jyut": "ngo5 daai3 zo2 di1 je5 faan1 lai4, fong3 dai1 zo2.", "en": "I brought some stuff back and put it down."},
      {"zh": "佢放低咗啲嘢，喺度玩緊。", "jyut": "keoi5 fong3 dai1 zo2 di1 je5, hai2 dou6 waan2 gan2.", "en": "He put his stuff down, and is playing here."},
      {"zh": "我生喺呢度，又想死喺呢度。", "jyut": "ngo5 saang1 hai2 ni1 dou6, jau6 soeng2 sei2 hai2 ni1 dou6.", "en": "I was born here, and want to die here too."},
      {"zh": "佢病咗，喊緊，見到我又笑咗。", "jyut": "keoi5 beng6 zo2, haam3 gan2, gin3 dou2 ngo5 jau6 siu3 zo2.", "en": "He's sick and crying, but smiled when he saw me."},
    ],
    [
      {"zh": "佢帶咗啲嘢返嚟，放喺度。", "jyut": "keoi5 daai3 zo2 di1 je5 faan1 lai4, fong3 hai2 dou6.", "en": "He/she brought some things back and put them down here."},
      {"zh": "笑吓，就冇嘢。", "jyut": "siu3 haa5, zau6 mou5 je5.", "en": "Smile a bit, it's nothing."},
      {"zh": "生、老、病、死，就係咁。", "jyut": "sang1, lou5, beng6, sei2, zau6 hai6 gam2.", "en": "Birth, aging, sickness, death — that's just how it is."},
      {"zh": "病咗就瞓吓，笑返，咪喊。", "jyut": "beng6 zo2 zau6 fan3 haa5, siu3 faan1, mai5 haam3.", "en": "If you're sick, rest a bit — smile again, don't cry."},
      {"zh": "打晒就笑喇。", "jyut": "daa2 saai3 zau6 siu3 laa3.", "en": "Once all done playing, then smile."},
    ],
  ],
  "top200:11": [
    [
      {"zh": "唔該幫我攞嘢，唔使客氣。", "jyut": "m4 goi1 bong1 ngo5 lo2 je5, m4 sai2 haak3 hei3.", "en": "Please help me get that, no need to stand on ceremony."},
      {"zh": "多謝你，我應該同你去。", "jyut": "do1 ze6 nei5, ngo5 jing1 goi1 tung4 nei5 heoi3.", "en": "Thank you, I should go with you."},
      {"zh": "我可能有事，因為要幫佢做嘢。", "jyut": "ngo5 ho2 nang4 jau5 si6, jan1 wai6 jiu3 bong1 keoi5 zou6 je5.", "en": "I might be busy, because I need to help him with something."},
      {"zh": "但係一定得嘅。", "jyut": "daan6 hai6 jat1 ding6 dak1 ge3.", "en": "But it'll definitely work out."},
    ],
    [
      {"zh": "唔該同我攞嘢，唔使多謝。", "jyut": "m4 goi1 tung4 ngo5 lo2 je5, m4 sai2 do1 ze6.", "en": "Please get that for me, no need to thank me."},
      {"zh": "我應該一定得，可能因為彩數。", "jyut": "ngo5 jing1 goi1 jat1 ding6 dak1, ho2 nang4 jan1 wai6 coi2 sou3.", "en": "I should definitely manage, maybe because of luck."},
      {"zh": "但係唔使咁，一定得㗎。", "jyut": "daan6 hai6 m4 sai2 gam2, jat1 ding6 dak1 gaa3.", "en": "But no need for that, it'll definitely work out."},
    ],
  ],
  "top200:12": [
    [
      {"zh": "如果你可以，我哋可以一齊去。", "jyut": "jyu4 gwo2 nei5 ho2 ji5, ngo5 dei6 ho2 ji5 jat1 cai4 heoi3.", "en": "If you're able to, we can go together."},
      {"zh": "你想去呢度定係去嗰度呀？", "jyut": "nei5 soeng2 heoi3 ni1 dou6 ding6 hai6 heoi3 go2 dou6 aa3?", "en": "Do you want to go here or there?"},
      {"zh": "我仲未諗掂，你都未講你嘅諗法。", "jyut": "ngo5 zung6 mei6 nam2 dim6, nei5 dou1 mei6 gong2 nei5 ge3 nam2 faat3.", "en": "I still haven't figured it out, and you haven't said your idea either."},
      {"zh": "不如我哋做晒嘢先至去。", "jyut": "bat1 jyu4 ngo5 dei6 zou6 saai3 je5 sin1 zi3 heoi3.", "en": "How about we go only after we've finished everything."},
      {"zh": "好似都幾得，所以就至咁話啦。", "jyut": "hou2 ci5 dou1 gei2 dak1, so2 ji5 zau6 zi3 gam2 waa6 laa1.", "en": "That seems fine, so let's just do that."},
    ],
    [
      {"zh": "如果可以，仲可以一齊去。", "jyut": "jyu4 gwo2 ho2 ji5, zung6 ho2 ji5 jat1 cai4 heoi3.", "en": "If we can, we could still go together."},
      {"zh": "先至去邊度，定係先去嗰度？", "jyut": "sin1 zi3 heoi3 bin1 dou6, ding6 hai6 sin1 heoi3 go2 dou6?", "en": "Where do we go first, or should we go there first?"},
      {"zh": "都好似係咁，所以你話事。", "jyut": "dou1 hou2 ci5 hai6 gam2, so2 ji5 nei5 waa6 si6.", "en": "It seems that way too, so you decide."},
    ],
  ],
  "top200:13": [
    [
      {"zh": "呢間屋好大，嗰間就細好多。", "jyut": "ni1 gaan1 uk1 hou2 daai6, go2 gaan1 zau6 sai3 hou2 do1.", "en": "This house is big, that one is a lot smaller."},
      {"zh": "大嗰間仲要新，靚好多。", "jyut": "daai6 go2 gaan1 zung6 jiu3 san1, leng3 hou2 do1.", "en": "The bigger one is also newer, and much nicer."},
      {"zh": "細嗰間就舊啲，我唔好話佢差，不過少啲人鍾意。", "jyut": "sai3 go2 gaan1 zau6 gau6 di1, ngo5 m4 hou2 waa6 keoi5 caa1, bat1 gwo3 siu2 di1 jan4 zung1 ji3.", "en": "The smaller one is a bit older — I shouldn't say it's bad, but fewer people like it."},
      {"zh": "我哋多數要大又高嘅嗰間。", "jyut": "ngo5 dei6 do1 sou3 jiu3 daai6 jau6 gou1 ge3 go2 gaan1.", "en": "We usually want the big, tall one."},
    ],
    [
      {"zh": "大屋，細屋，新屋，舊屋——你要邊間？", "jyut": "daai6 uk1, sai3 uk1, san1 uk1, gau6 uk1 — nei5 jiu3 bin1 gaan1?", "en": "Big house, small house, new house, old house — which one do you want?"},
      {"zh": "靚嘅多，唔好嘅少。", "jyut": "leng3 ge3 do1, m4 hou2 ge3 siu2.", "en": "The nice ones are many, the bad ones are few."},
      {"zh": "呢間高，嗰間唔高。", "jyut": "ni1 gaan1 gou1, go2 gaan1 m4 gou1.", "en": "This one is tall, that one isn't."},
    ],
  ],
  "top200:14": [
    [
      {"zh": "佢好高，我就矮啲。", "jyut": "keoi5 hou2 gou1, ngo5 zau6 ai2 di1.", "en": "He's tall, and I'm a bit shorter."},
      {"zh": "佢肥啲，行得快，瘦咗好多。", "jyut": "keoi5 fei4 di1, haang4 dak1 faai3, sau3 zo2 hou2 do1.", "en": "He was a bit chubby, walked fast, and has lost a lot of weight."},
      {"zh": "我就行得慢，慢到想瞓。", "jyut": "ngo5 zau6 haang4 dak1 maan6, maan6 dou3 soeng2 fan3.", "en": "I'm just slow — so slow I want to sleep."},
      {"zh": "呢度好熱，嗰度就好凍。", "jyut": "ni1 dou6 hou2 jit6, go2 dou6 zau6 hou2 dung3.", "en": "It's hot here, and cold there."},
      {"zh": "呢啲嘢又貴又難買，不過我搵到平嘅。", "jyut": "ni1 di1 je5 jau6 gwai3 jau6 naan4 maai5, bat1 gwo3 ngo5 wan2 dou2 peng4 ge3.", "en": "This stuff is expensive and hard to find, but I found a cheap one."},
    ],
    [
      {"zh": "肥定係瘦，快定係慢，都係咁。", "jyut": "fei4 ding6 hai6 sau3, faai3 ding6 hai6 maan6, dou1 hai6 gam2.", "en": "Chubby or thin, fast or slow — it's all like that."},
      {"zh": "熱嗰陣飲凍嘢，貴嗰陣搵平嘢。", "jyut": "jit6 go2 zan6 jam2 dung3 je5, gwai3 go2 zan6 wan2 peng4 je5.", "en": "When it's hot, drink something cold; when it's expensive, find something cheap."},
      {"zh": "呢個矮，嗰個唔矮，你話邊個難分？", "jyut": "ni1 go3 ai2, go2 go3 m4 ai2, nei5 waa6 bin1 go3 naan4 fan1?", "en": "This one is short, that one isn't — which is harder to tell apart, you say?"},
    ],
  ],
  "top200:15": [
    [
      {"zh": "呢排做嘢好忙，時時都冇得閒。", "jyut": "ni1 paai4 zou6 je5 hou2 mong4, si4 si4 dou1 mou5 dak1 haan4.", "en": "I've been busy with work lately, never any free time."},
      {"zh": "排隊排得好長，等到我又攰又肚餓。", "jyut": "paai4 deoi2 paai4 dak1 hou2 coeng4, dang2 dou3 ngo5 jau6 gui6 jau6 tou5 ngo6.", "en": "The queue was really long, and waiting made me tired and hungry."},
      {"zh": "好彩呢排時間短好多。", "jyut": "hou2 coi2 ni1 paai4 si4 gaan3 dyun2 hou2 do1.", "en": "Luckily, lately the time's been a lot shorter."},
      {"zh": "呢啲嘢做起嚟冇話容易。", "jyut": "ni1 di1 je5 zou6 hei2 lai4 mou5 waa6 jung4 ji6.", "en": "This stuff wasn't easy to do."},
      {"zh": "不過見到成間屋乾淨晒，我又開心返，唔會唔開心太耐。", "jyut": "bat1 gwo3 gin3 dou2 sing4 gaan1 uk1 gon1 zeng6 saai3, ngo5 jau6 hoi1 sam1 faan1, m4 wui5 m4 hoi1 sam1 taai3 noi6.", "en": "But seeing the place clean again made me happy — I won't stay unhappy for long."},
    ],
    [
      {"zh": "開心定係唔開心，都係咁過。", "jyut": "hoi1 sam1 ding6 hai6 m4 hoi1 sam1, dou1 hai6 gam2 gwo3.", "en": "Happy or unhappy — that's just how it goes."},
      {"zh": "肚餓嗰陣咩都唔想做，攰嗰陣又想瞓。", "jyut": "tou5 ngo6 go2 zan6 me1 dou1 m4 soeng2 zou6, gui6 go2 zan6 jau6 soeng2 fan3.", "en": "When hungry, don't feel like doing anything; when tired, just want to sleep."},
      {"zh": "忙晒就得閒，執吓嘢，乾淨返。", "jyut": "mong4 saai3 zau6 dak1 haan4, zap1 haa5 je5, gon1 zeng6 faan1.", "en": "Once all the busy stuff is done, there's free time — tidy up, clean up."},
      {"zh": "呢個容易，嗰個唔容易。", "jyut": "ni1 go3 jung4 ji6, go2 go3 m4 jung4 ji6.", "en": "This one is easy, that one isn't."},
      {"zh": "呢個長，嗰個短。", "jyut": "ni1 go3 coeng4, go2 go3 dyun2.", "en": "This one is long, that one is short."},
    ],
  ],
  "top200:16": [
    [
      {"zh": "呢度設備好齊全，住得好舒服。", "jyut": "ni1 dou6 cit3 bei6 hou2 cai4 cyun4, zyu6 dak1 hou2 syu1 fuk6.", "en": "This place is fully equipped and very comfortable to stay in."},
      {"zh": "不過有啲污糟，要搵人執吓。", "jyut": "bat1 gwo3 jau5 di1 wu1 zou1, jiu3 wan2 jan4 zap1 haa5.", "en": "But it was a bit messy, so we needed to find someone to tidy it up."},
      {"zh": "都算麻煩，不過唔係好緊要。", "jyut": "dou1 syun3 maa4 faan4, bat1 gwo3 m4 hai6 hou2 gan2 jiu3.", "en": "It was a bit of a hassle, but not a big deal."},
      {"zh": "職員好犀利，好快就搞掂晒。", "jyut": "zik1 jyun4 hou2 sai1 lei6, hou2 faai3 zau6 gaau2 dim6 saai3.", "en": "The staff were impressively efficient, sorting it all out fast."},
      {"zh": "嗰度有人睇住，都算安全。", "jyut": "go2 dou6 jau5 jan4 tai2 zyu6, dou1 syun3 on1 cyun4.", "en": "There's someone keeping an eye on it there, so it's reasonably safe."},
      {"zh": "細路扮得意，扮到好辛苦咁。", "jyut": "sai3 lou6 baan6 dak1 ji3, baan6 dou3 hou2 san1 fu2 gam2.", "en": "The kid was clowning around, pretending it was really hard work."},
      {"zh": "我話佢知，咪咁危險。", "jyut": "ngo5 waa6 keoi5 zi1, mai5 gam3 ngai4 him2.", "en": "I told him, don't be so reckless."},
    ],
    [
      {"zh": "設備污糟就麻煩，齊全又安全先好。", "jyut": "cit3 bei6 wu1 zou1 zau6 maa4 faan4, cai4 cyun4 jau6 on1 cyun4 sin1 hou2.", "en": "Dirty equipment is a hassle — better to have it complete and safe."},
      {"zh": "辛苦搵到嘅嘢，一定得意犀利。", "jyut": "san1 fu2 wan2 dou2 ge3 je5, jat1 ding6 dak1 ji3 sai1 lei6.", "en": "Things found through hard work are certainly impressive."},
      {"zh": "危險嘅事，一定要諗吓至做。", "jyut": "ngai4 him2 ge3 si6, jat1 ding6 jiu3 nam2 haa5 zi3 zou6.", "en": "Dangerous things — you must think them over before doing."},
      {"zh": "舒服嘅嘢，一定想要。", "jyut": "syu1 fuk6 ge3 je5, jat1 ding6 soeng2 jiu3.", "en": "Comfortable things — you'll definitely want them."},
    ],
  ],
  "top200:17": [
    [
      {"zh": "尋日，我瞓咗好耐。", "jyut": "cam4 jat6, ngo5 fan3 zo2 hou2 noi6.", "en": "Yesterday, I slept for a long time."},
      {"zh": "今日朝早我一起身就好精神。", "jyut": "gam1 jat6 ziu1 zou2 ngo5 jat1 hei2 san1 zau6 hou2 zing1 san4.", "en": "This morning, I felt great the moment I got up."},
      {"zh": "而家晏晝，我要出去食嘢。", "jyut": "ji4 gaa1 aan3 zau3, ngo5 jiu3 ceot1 heoi3 sik6 je5.", "en": "Right now it's midday, and I need to go out to eat."},
      {"zh": "之前我已經做晒嘢。", "jyut": "zi1 cin4 ngo5 ji5 ging1 zou6 saai3 je5.", "en": "Before this, I'd already finished everything."},
      {"zh": "食晒之後，夜晚我想睇戲。", "jyut": "sik6 saai3 zi1 hau6, je6 maan5 ngo5 soeng2 tai2 hei3.", "en": "After I've finished eating, I want to watch a movie tonight."},
      {"zh": "聽日又要返去做嘢喇。", "jyut": "ting1 jat6 jau6 jiu3 faan1 heoi3 zou6 je5 laa3.", "en": "Tomorrow I have to go back to work again."},
      {"zh": "呢個星期好忙。", "jyut": "ni1 go3 sing1 kei4 hou2 mong4.", "en": "This week has been busy."},
    ],
    [
      {"zh": "而家係今日，之前係尋日，之後就係聽日。", "jyut": "ji4 gaa1 hai6 gam1 jat6, zi1 cin4 hai6 cam4 jat6, zi1 hau6 zau6 hai6 ting1 jat6.", "en": "Now is today, before was yesterday, after will be tomorrow."},
      {"zh": "尋日朝早去，今日晏晝返，聽日夜晚再去。", "jyut": "cam4 jat6 ziu1 zou2 heoi3, gam1 jat6 aan3 zau3 faan1, ting1 jat6 je6 maan5 zoi3 heoi3.", "en": "Went yesterday morning, came back today at noon, going again tomorrow night."},
      {"zh": "成個星期都係咁樣過。", "jyut": "sing4 go3 sing1 kei4 dou1 hai6 gam2 joeng6 gwo3.", "en": "The whole week went by just like that."},
    ],
  ],
  "top200:18": [
    [
      {"zh": "我喺呢度已經三年。", "jyut": "ngo5 hai2 ni1 dou6 ji5 ging1 saam1 nin4.", "en": "I've been here for three years already."},
      {"zh": "呢個月我成日都遲到。", "jyut": "ni1 go3 jyut6 ngo5 sing4 jat6 dou1 ci4 dou3.", "en": "This month I've been late almost every day."},
      {"zh": "有時淨係遲十分鐘，有時就遲成個鐘頭。", "jyut": "jau5 si4 zing6 hai6 ci4 sap6 fan1 zung1, jau5 si4 zau6 ci4 sing4 go3 zung1 tau4.", "en": "Sometimes I'm only ten minutes late, other times a whole hour late."},
      {"zh": "佢想知我幾點瞓覺。", "jyut": "keoi5 soeng2 zi1 ngo5 gei2 dim2 fan3 gaau3.", "en": "He wanted to know what time I go to sleep."},
      {"zh": "我話呢排每日都瞓得好晏。", "jyut": "ngo5 waa6 ni1 paai4 mui5 jat6 dou1 fan3 dak1 hou2 aan3.", "en": "I said that lately I've been sleeping very late every day."},
      {"zh": "佢話我要早啲瞓，唔好再遲到。", "jyut": "keoi5 waa6 ngo5 jiu3 zou2 di1 fan3, m4 hou2 zoi3 ci4 dou3.", "en": "He told me to sleep earlier and stop being late."},
    ],
    [
      {"zh": "分鐘變鐘頭，鐘頭變日，日變月，月變年。", "jyut": "fan1 zung1 bin3 zung1 tau4, zung1 tau4 bin3 jat6, jat6 bin3 jyut6, jyut6 bin3 nin4.", "en": "Minutes become hours, hours become days, days become months, months become years."},
      {"zh": "有時早，有時遲，日日都咁樣。", "jyut": "jau5 si4 zou2, jau5 si4 ci4, jat6 jat6 dou1 gam2 joeng6.", "en": "Sometimes early, sometimes late — every day is just like that."},
      {"zh": "而家幾點呀？我幾點瞓覺呀？", "jyut": "ji4 gaa1 gei2 dim2 aa3? ngo5 gei2 dim2 fan3 gaau3 aa3?", "en": "What time is it now? What time do I go to sleep?"},
    ],
  ],
  "top200:19": [
    [
      {"zh": "我屋企人好多，爸爸媽媽仲有四個細路。", "jyut": "ngo5 uk1 kei2 jan4 hou2 do1, baa4 baa1 maa4 maa1 zung6 jau5 sei3 go3 sai3 lou6.", "en": "My family is big — dad, mom, and four kids."},
      {"zh": "大哥哥同大姐姐已經出咗嚟做嘢。", "jyut": "daai6 go4 go1 tung4 daai6 ze4 ze1 ji5 ging1 ceot1 zo2 lai4 zou6 je5.", "en": "My eldest brother and eldest sister already have jobs."},
      {"zh": "細佬同妹妹仲喺度讀緊嘢，係學生。", "jyut": "sai3 lou2 tung4 mui6 mui2 zung6 hai2 dou6 duk6 gan2 je5, hai6 hok6 saang1.", "en": "My little brother and little sister are still studying, they're students."},
      {"zh": "哥哥嘅老婆好錫佢個仔。", "jyut": "go4 go1 ge3 lou5 po4 hou2 sek3 keoi5 go3 zai2.", "en": "My brother's wife dotes on their son."},
      {"zh": "姐姐嘅老公就成日湊佢個女。", "jyut": "ze4 ze1 ge3 lou5 gung1 zau6 sing4 jat6 cau3 keoi5 go3 neoi2.", "en": "My sister's husband spends all his time looking after their daughter."},
      {"zh": "細佬有個老師好錫佢。", "jyut": "sai3 lou2 jau5 go3 lou5 si1 hou2 sek3 keoi5.", "en": "My little brother has a teacher who's very fond of him."},
      {"zh": "我哋屋企人同佢嘅同事都係好朋友。", "jyut": "ngo5 dei6 uk1 kei2 jan4 tung4 keoi5 ge3 tung4 si6 dou1 hai6 hou2 pang4 jau5.", "en": "Our family and his coworkers are all good friends."},
    ],
    [
      {"zh": "爸爸媽媽，哥哥姐姐，細佬妹妹——一家人。", "jyut": "baa4 baa1 maa4 maa1, go4 go1 ze4 ze1, sai3 lou2 mui6 mui2 — jat1 gaa1 jan4.", "en": "Dad, mom, older brother and sister, younger brother and sister — one family."},
      {"zh": "老婆同老公係屋企人，老師同埋學生時時都見到。", "jyut": "lou5 po4 tung4 lou5 gung1 hai6 uk1 kei2 jan4, lou5 si1 tung4 maai4 hok6 saang1 si4 si4 dou1 gin3 dou2.", "en": "Wife and husband are family; teachers and students see each other all the time."},
      {"zh": "個仔、個女、同事、朋友——邊個都好。", "jyut": "go3 zai2, go3 neoi2, tung4 si6, pang4 jau5 — bin1 go3 dou1 hou2.", "en": "Son, daughter, coworkers, friends — every one of them is great."},
    ],
  ],
  "top200:20": [
    [
      {"zh": "我屋企喺香港，離學校好近。", "jyut": "ngo5 uk1 kei2 hai2 hoeng1 gong2, lei4 hok6 haau6 hou2 kan5.", "en": "My home is in Hong Kong, very close to school."},
      {"zh": "屋企有三間房，仲有個廁所。", "jyut": "ngo5 uk1 kei2 jau5 saam1 gaan1 fong2, zung6 jau5 go3 ci3 so2.", "en": "My home has three bedrooms, plus a bathroom."},
      {"zh": "附近有個公園同一個街市。", "jyut": "fu6 gan6 jau5 go3 gung1 jyun4 tung4 jat1 go3 gaai1 si5.", "en": "Nearby there's a park and a wet market."},
      {"zh": "附近有間餐廳、一間銀行同幾間舖頭。", "jyut": "fu6 gan6 jau5 gaan1 caan1 teng1, jat1 gaan1 ngan4 hong4 tung4 gei2 gaan1 pou3 tau2.", "en": "Nearby there's a restaurant, a bank, and a few shops."},
      {"zh": "再行遠啲就有醫院、地鐵站同巴士站。", "jyut": "zoi3 haang4 jyun5 di1 zau6 jau5 ji1 jyun2, dei6 tit3 zaam6 tung4 baa1 si2 zaam6.", "en": "A bit further out there's a hospital, an MTR station, and a bus stop."},
      {"zh": "我間公司好遠，喺機場附近。", "jyut": "ngo5 gaan1 gung1 si1 hou2 jyun5, hai2 gei1 coeng4 fu6 gan6.", "en": "My company is quite far, near the airport."},
    ],
    [
      {"zh": "屋企喺香港，機場就遠好多。", "jyut": "uk1 kei2 hai2 hoeng1 gong2, gei1 coeng4 zau6 jyun5 hou2 do1.", "en": "Home is in Hong Kong, the airport is much farther."},
      {"zh": "學校、公司、醫院、銀行，成日都要去。", "jyut": "hok6 haau6, gung1 si1, ji1 jyun2, ngan4 hong4, sing4 jat6 dou1 jiu3 heoi3.", "en": "School, office, hospital, bank — places I go all the time."},
      {"zh": "公園、街市、餐廳、舖頭，行吓就到。", "jyut": "gung1 jyun4, gaai1 si5, caan1 teng1, pou3 tau2, haang4 haa5 zau6 dou3.", "en": "Park, market, restaurant, shops — just a short walk away."},
      {"zh": "廁所喺邊間房嗰邊，地鐵站同巴士站都近。", "jyut": "ci3 so2 hai2 bin1 gaan1 fong2 go2 bin1, dei6 tit3 zaam6 tung4 baa1 si2 zaam6 dou1 kan5.", "en": "The bathroom is over by which room, and both the MTR and bus stop are close."},
    ],
  ],
  "top500:1": [
    [
      {"zh": "呢個係紅色，嗰個係藍色，呢個就係綠色。", "jyut": "ni1 go3 hai6 hung4 sik1, go2 go3 hai6 laam4 sik1, ni1 go3 zau6 hai6 luk6 sik1.", "en": "This one is red, that one is blue, this one is green."},
      {"zh": "紅色、黃色、藍色，你鍾意邊個呀？", "jyut": "hung4 sik1, wong4 sik1, laam4 sik1, nei5 zung1 ji3 bin1 go3 aa3?", "en": "Red, yellow, blue — which do you like?"},
      {"zh": "白色同黑色都幾靚。", "jyut": "baak6 sik1 tung4 hak1 sik1 dou1 gei2 leng3.", "en": "White and black are both quite nice."},
      {"zh": "橙色好似紅色，又好似黃色。", "jyut": "caang2 sik1 hou2 ci5 hung4 sik1, jau6 hou2 ci5 wong4 sik1.", "en": "Orange looks like red, and also like yellow."},
      {"zh": "紫色同粉紅色，我都鍾意。", "jyut": "zi2 sik1 tung4 fan2 hung4 sik1, ngo5 dou1 zung1 ji3.", "en": "Purple and pink — I like both."},
      {"zh": "灰色唔算靚，但係都幾得意。", "jyut": "fui1 sik1 m4 syun3 leng3, daan6 hai6 dou1 gei2 dak1 ji3.", "en": "Grey isn't exactly pretty, but it's still kind of charming."},
    ],
    [
      {"zh": "呢個唔係黑色，係灰色嚟嘅。", "jyut": "ni1 go3 m4 hai6 hak1 sik1, hai6 fui1 sik1 lai4 ge3.", "en": "This isn't black, it's grey."},
      {"zh": "你嗰個係咩色呀？係唔係橙色呀？", "jyut": "nei5 go2 go3 hai6 me1 sik1 aa3? hai6 m4 hai6 caang2 sik1 aa3?", "en": "What color is yours? Is it orange?"},
      {"zh": "綠色好靚，藍色都好靚。", "jyut": "luk6 sik1 hou2 leng3, laam4 sik1 dou1 hou2 leng3.", "en": "Green is pretty, blue is pretty too."},
      {"zh": "白色同灰色，邊個靚啲呀？", "jyut": "baak6 sik1 tung4 fui1 sik1, bin1 go3 leng3 di1 aa3?", "en": "White or grey, which is prettier?"},
      {"zh": "紫色定係粉紅色，你要邊個？", "jyut": "zi2 sik1 ding6 hai6 fan2 hung4 sik1, nei5 jiu3 bin1 go3?", "en": "Purple or pink, which do you want?"},
    ],
  ],
  "top500:2": [
    [
      {"zh": "我有手，有腳，有心，有肚。", "jyut": "ngo5 jau5 sau2, jau5 goek3, jau5 sam1, jau5 tou5.", "en": "I have hands, feet, a heart, a stomach."},
      {"zh": "我有一個頭，兩個眼，兩個耳仔。", "jyut": "ngo5 jau5 jat1 go3 tau4, loeng5 go3 ngaan5, loeng5 go3 ji5 zai2.", "en": "I have a head, two eyes, two ears."},
      {"zh": "我有一個鼻，一個口，仲有牙。", "jyut": "ngo5 jau5 jat1 go3 bei6, jat1 go3 hau2, zung6 jau5 ngaa4.", "en": "I have a nose, a mouth, and teeth too."},
      {"zh": "頭髮喺頭度，頸同背脊都喺身體度。", "jyut": "tau4 faat3 hai2 tau4 dou6, geng2 tung4 bui3 zek3 dou1 hai2 san1 tai2 dou6.", "en": "Hair is on the head; neck and back are both part of the body."},
      {"zh": "面度有眼、有鼻、有口。", "jyut": "min6 dou6 jau5 ngaan5, jau5 bei6, jau5 hau2.", "en": "The face has eyes, a nose, a mouth."},
      {"zh": "身體好緊要，我哋要錫身體。", "jyut": "san1 tai2 hou2 gan2 jiu3, ngo5 dei6 jiu3 sek3 san1 tai2.", "en": "The body matters a lot — we should take care of it."},
    ],
    [
      {"zh": "你嘅頭好大，我嘅頭就細啲。", "jyut": "nei5 ge3 tau4 hou2 daai6, ngo5 ge3 tau4 zau6 sai3 di1.", "en": "Your head is big, mine is smaller."},
      {"zh": "手同腳，邊個要用得多啲呢？", "jyut": "sau2 tung4 goek3, bin1 go3 jiu3 jung6 dak1 do1 di1 ne1?", "en": "Hands or feet, which do you use more?"},
      {"zh": "心、肚、牙，都好緊要。", "jyut": "sam1, tou5, ngaa4, dou1 hou2 gan2 jiu3.", "en": "Heart, stomach, teeth — all important."},
      {"zh": "頭髮長好定係短好呢？", "jyut": "tau4 faat3 coeng4 hou2 ding6 hai6 dyun2 hou2 ne1?", "en": "Is long hair better or short hair?"},
      {"zh": "頸同背脊都幾緊要。", "jyut": "geng2 tung4 bui3 zek3 dou1 gei2 gan2 jiu3.", "en": "Neck and back are both quite important."},
    ],
  ],
  "top500:3": [
    [
      {"zh": "我想食飯，你想食麵定係食乜嘢呀？", "jyut": "ngo5 soeng2 sik6 faan6, nei5 soeng2 sik6 min6 ding6 hai6 sik6 mat1 je5 aa3?", "en": "I want rice, do you want noodles or something else?"},
      {"zh": "我飲茶，佢飲水，你飲咖啡。", "jyut": "ngo5 jam2 caa4, keoi5 jam2 seoi2, nei5 jam2 gaa3 fe1.", "en": "I drink tea, he drinks water, you drink coffee."},
      {"zh": "呢度有牛肉、豬肉、雞，仲有魚。", "jyut": "ni1 dou6 jau5 ngau4 juk6, zyu1 juk6, gai1, zung6 jau5 jyu2.", "en": "Here there's beef, pork, chicken, and fish too."},
    ],
    [
      {"zh": "你想飲茶定係飲水呀？", "jyut": "nei5 soeng2 jam2 caa4 ding6 hai6 jam2 seoi2 aa3?", "en": "Do you want tea or water?"},
      {"zh": "我唔飲咖啡，我飲水就得。", "jyut": "ngo5 m4 jam2 gaa3 fe1, ngo5 jam2 seoi2 zau6 dak1.", "en": "I don't drink coffee, water is fine for me."},
      {"zh": "牛肉、豬肉、雞、魚，邊樣你唔食呀？", "jyut": "ngau4 juk6, zyu1 juk6, gai1, jyu2, bin1 joeng6 nei5 m4 sik6 aa3?", "en": "Beef, pork, chicken, fish — which do you not eat?"},
      {"zh": "我想食飯，唔想食麵。", "jyut": "ngo5 soeng2 sik6 faan6, m4 soeng2 sik6 min6.", "en": "I want rice, not noodles."},
    ],
  ],
  "top500:4": [
    [
      {"zh": "我鍾意食菜同生果，唔係好鍾意食蛋。", "jyut": "ngo5 zung1 ji3 sik6 coi3 tung4 saang1 gwo2, m4 hai6 hou2 zung1 ji3 sik6 daan2.", "en": "I like eating vegetables and fruit, not too fond of eggs."},
      {"zh": "麵包幾好食，我哋一齊食啦。", "jyut": "min6 baau1 gei2 hou2 sik6, ngo5 dei6 jat1 cai4 sik6 laa1.", "en": "The bread is quite tasty, let's eat it together."},
      {"zh": "呢個湯要有啲鹽先好食。", "jyut": "ni1 go3 tong1 jiu3 jau5 di1 jim4 sin1 hou2 sik6.", "en": "This soup needs a bit of salt to taste good."},
      {"zh": "我唔飲酒，你飲唔飲呀？", "jyut": "ngo5 m4 jam2 jau2, nei5 jam2 m4 jam2 aa3?", "en": "I don't drink alcohol, do you?"},
      {"zh": "我鍾意食糖。", "jyut": "ngo5 zung1 ji3 sik6 tong4.", "en": "I like eating candy."},
    ],
    [
      {"zh": "你鍾意食菜定係食生果呀？", "jyut": "nei5 zung1 ji3 sik6 coi3 ding6 hai6 sik6 saang1 gwo2 aa3?", "en": "Do you like eating vegetables or fruit?"},
      {"zh": "蛋同麵包，我朝早都食。", "jyut": "daan2 tung4 min6 baau1, ngo5 ziu1 zou2 dou1 sik6.", "en": "Eggs and bread, I eat both in the morning."},
      {"zh": "呢個湯有冇落鹽呀？", "jyut": "ni1 go3 tong1 jau5 mou5 lok6 jim4 aa3?", "en": "Did you put salt in this soup?"},
      {"zh": "酒同糖，邊樣你唔鍾意呀？", "jyut": "jau2 tung4 tong4, bin1 joeng6 nei5 m4 zung1 ji3 aa3?", "en": "Alcohol and sugar — which do you dislike?"},
    ],
  ],
  "top500:5": [
    [
      {"zh": "早餐我飲湯，午餐我飲果汁。", "jyut": "zou2 caan1 ngo5 jam2 tong1, ng5 caan1 ngo5 jam2 gwo2 zap1.", "en": "For breakfast I drink soup, for lunch I drink juice."},
      {"zh": "晚餐之後，我哋食啲甜品啦。", "jyut": "maan5 caan1 zi1 hau6, ngo5 dei6 sik6 di1 tim4 ban2 laa1.", "en": "After dinner, let's have some dessert."},
      {"zh": "蘋果、香蕉、西瓜，你鍾意食邊個呀？", "jyut": "ping4 gwo2, hoeng1 ziu1, sai1 gwaa1, nei5 zung1 ji3 sik6 bin1 go3 aa3?", "en": "Apple, banana, watermelon — which do you like to eat?"},
    ],
    [
      {"zh": "早餐飲果汁，午餐食蘋果。", "jyut": "zou2 caan1 jam2 gwo2 zap1, ng5 caan1 sik6 ping4 gwo2.", "en": "Breakfast: drink juice. Lunch: eat an apple."},
      {"zh": "晚餐之後，想唔想食啲甜品呀？", "jyut": "maan5 caan1 zi1 hau6, soeng2 m4 soeng2 sik6 di1 tim4 ban2 aa3?", "en": "After dinner, do you want some dessert?"},
      {"zh": "香蕉同西瓜，邊樣你鍾意啲呀？", "jyut": "hoeng1 ziu1 tung4 sai1 gwaa1, bin1 joeng6 nei5 zung1 ji3 di1 aa3?", "en": "Banana or watermelon, which do you like more?"},
    ],
  ],
  "top500:6": [
    [
      {"zh": "今日天氣幾熱，聽日可能會落雨。", "jyut": "gam1 jat6 tin1 hei3 gei2 jit6, ting1 jat6 ho2 nang4 wui5 lok6 jyu5.", "en": "Today's weather is quite hot; tomorrow it might rain."},
      {"zh": "有風，又有雲，仲有太陽。", "jyut": "jau5 fung1, jau6 jau5 wan4, zung6 jau5 taai3 joeng4.", "en": "There's wind, clouds, and sun too."},
      {"zh": "而家天晴喇，好靚呀。", "jyut": "ji4 gaa1 tin1 cing4 laa3, hou2 leng3 aa3.", "en": "It's sunny now — lovely."},
      {"zh": "夜晚有月光，好靚。", "jyut": "je6 maan5 jau5 jyut6 gwong1, hou2 leng3.", "en": "At night there's moonlight, lovely."},
      {"zh": "落雪嗰陣，天氣好凍。", "jyut": "lok6 syut3 go2 zan6, tin1 hei3 hou2 dung3.", "en": "When it snows, the weather's very cold."},
      {"zh": "呢度有熱天，又有凍天。", "jyut": "ni1 dou6 jau5 jit6 tin1, jau6 jau5 dung3 tin1.", "en": "Here there's hot weather, and cold weather too."},
    ],
    [
      {"zh": "天氣點呀？係咪就嚟落雨呀？", "jyut": "tin1 hei3 dim2 aa3? hai6 mai6 zau6 lai4 lok6 jyu5 aa3?", "en": "How's the weather? Is it about to rain?"},
      {"zh": "熱天飲凍嘢，凍天飲熱嘢。", "jyut": "jit6 tin1 jam2 dung3 je5, dung3 tin1 jam2 jit6 je5.", "en": "In hot weather drink cold things, in cold weather drink hot things."},
      {"zh": "天晴嗰陣，冇風冇雲。", "jyut": "tin1 cing4 go2 zan6, mou5 fung1 mou5 wan4.", "en": "When it's sunny, no wind, no clouds."},
      {"zh": "落雪嗰陣，會唔會有月光呢？", "jyut": "lok6 syut3 go2 zan6, wui5 m4 wui5 jau5 jyut6 gwong1 ne1?", "en": "When it snows, is there moonlight?"},
    ],
  ],
  "top500:7": [
    [
      {"zh": "我着咗件衫，仲着咗褲。", "jyut": "ngo5 zoek3 zo2 gin6 saam1, zung6 zoek3 zo2 fu3.", "en": "I'm wearing a shirt, and pants too."},
      {"zh": "落雨嗰陣，我着鞋，唔着襪都得。", "jyut": "lok6 jyu5 go2 zan6, ngo5 zoek3 haai4, m4 zoek3 mat6 dou1 dak1.", "en": "When it rains, I wear shoes; not wearing socks is fine too."},
      {"zh": "凍天，着返件冷衫啦。", "jyut": "dung3 tin1, zoek3 faan1 gin6 laang1 saam1 laa1.", "en": "Cold weather — put a sweater back on."},
      {"zh": "我冇眼鏡，睇嘢有啲難。", "jyut": "ngo5 mou5 ngaan5 geng2, tai2 je5 jau5 di1 naan4.", "en": "I don't have glasses, seeing things is a bit hard."},
      {"zh": "銀包同袋都喺呢度，手錶就唔喺度。", "jyut": "ngan4 baau1 tung4 doi2 dou1 hai2 ni1 dou6, sau2 biu1 zau6 m4 hai2 dou6.", "en": "Wallet and bag are both here, but the watch isn't."},
      {"zh": "呢度有帽，仲有眼鏡。", "jyut": "ni1 dou6 jau5 mou2, zung6 jau5 ngaan5 geng2.", "en": "There's a hat here, and glasses too."},
    ],
    [
      {"zh": "你着咗衫、褲、鞋、襪未呀？", "jyut": "nei5 zoek3 zo2 saam1, fu3, haai4, mat6 mei6 aa3?", "en": "Have you put on your shirt, pants, shoes, socks yet?"},
      {"zh": "出去要着帽，仲要着眼鏡。", "jyut": "ceot1 heoi3 jiu3 zoek3 mou2, zung6 jiu3 zoek3 ngaan5 geng2.", "en": "Going out you need a hat on, and glasses too."},
      {"zh": "銀包、袋、手錶，你帶咗未呀？", "jyut": "ngan4 baau1, doi2, sau2 biu1, nei5 daai3 zo2 mei6 aa3?", "en": "Have you brought your wallet, bag, watch?"},
      {"zh": "凍天要着返件冷衫先得。", "jyut": "dung3 tin1 jiu3 zoek3 faan1 gin6 laang1 saam1 sin1 dak1.", "en": "In cold weather you need to put a sweater back on."},
    ],
  ],
  "top500:8": [
    [
      {"zh": "我想搭車去，你想搭巴士定係搭地鐵呢？", "jyut": "ngo5 soeng2 daap3 ce1 heoi3, nei5 soeng2 daap3 baa1 si2 ding6 hai6 daap3 dei6 tit3 ne1?", "en": "I want to go by car, do you want to take the bus or the MTR?"},
      {"zh": "塞車嗰陣，搭地鐵好啲。", "jyut": "sak1 ce1 go2 zan6, daap3 dei6 tit3 hou2 di1.", "en": "During traffic jams, taking the MTR is better."},
      {"zh": "火車同飛機都去得好遠。", "jyut": "fo2 ce1 tung4 fei1 gei1 dou1 heoi3 dak1 hou2 jyun5.", "en": "Trains and planes can both go very far."},
      {"zh": "我鍾意坐船，又鍾意踩單車。", "jyut": "ngo5 zung1 ji3 co5 syun4, jau6 zung1 ji3 caai2 daan1 ce1.", "en": "I like riding boats, and biking too."},
      {"zh": "行路慢啲，但係唔使塞車。", "jyut": "haang4 lou6 maan6 di1, daan6 hai6 m4 sai2 sak1 ce1.", "en": "Walking is slower, but you don't have to deal with traffic jams."},
      {"zh": "落雨嗰陣，我鍾意搭的士。", "jyut": "lok6 jyu5 go2 zan6, ngo5 zung1 ji3 daap3 dik1 si2.", "en": "When it rains, I like taking taxis."},
    ],
    [
      {"zh": "搭車、搭巴士、搭的士，你鍾意邊樣呀？", "jyut": "daap3 ce1, daap3 baa1 si2, daap3 dik1 si2, nei5 zung1 ji3 bin1 joeng6 aa3?", "en": "By car, bus, or taxi — which do you like?"},
      {"zh": "火車、飛機、船，邊樣去得快呀？", "jyut": "fo2 ce1, fei1 gei1, syun4, bin1 joeng6 heoi3 dak1 faai3 aa3?", "en": "Train, plane, boat — which is fastest?"},
      {"zh": "塞車嗰陣，不如行路啦。", "jyut": "sak1 ce1 go2 zan6, bat1 jyu4 haang4 lou6 laa1.", "en": "During a traffic jam, might as well walk."},
      {"zh": "我想踩單車去，唔想搭地鐵。", "jyut": "ngo5 soeng2 caai2 daan1 ce1 heoi3, m4 soeng2 daap3 dei6 tit3.", "en": "I want to bike there, not take the MTR."},
    ],
  ],
  "top500:9": [
    [
      {"zh": "呢個幾多錢呀？我畀現金定係信用卡呢？", "jyut": "ni1 go3 gei2 do1 cin2 aa3? ngo5 bei2 jin6 gam1 ding6 hai6 seon3 jung6 kaat1 ne1?", "en": "How much is this? Should I pay cash or card?"},
      {"zh": "大減價嗰陣，買嘢會平好多，好抵。", "jyut": "daai6 gaam2 gaa3 go2 zan6, maai5 je5 wui5 peng4 hou2 do1, hou2 dai2.", "en": "During sales, shopping is much cheaper — great value."},
      {"zh": "唔該畀返啲錢我，同埋收據。", "jyut": "m4 goi1 bei2 faan1 di1 cin2 ngo5, tung4 maai4 sau1 geoi3.", "en": "Please give me my change back, along with the receipt."},
      {"zh": "折扣之後，仲要幾多錢呀？", "jyut": "zit3 kau3 zi1 hau6, zung6 jiu3 gei2 do1 cin2 aa3?", "en": "After the discount, how much is it still?"},
      {"zh": "我用提款機攞錢，攞咗啲銀仔同紙幣。", "jyut": "ngo5 jung6 tai4 fun2 gei1 lo2 cin2, lo2 zo2 di1 ngan4 zai2 tung4 zi2 bai6.", "en": "I used the ATM to get money — got some coins and banknotes."},
      {"zh": "我想存錢，唔想使錢使得咁多。", "jyut": "ngo5 soeng2 cyun4 cin2, m4 soeng2 sai2 cin2 sai2 dak1 gam3 do1.", "en": "I want to save money, don't want to spend so much."},
      {"zh": "唔該幫我找錢。", "jyut": "m4 goi1 bong1 ngo5 zaau2 cin2.", "en": "Please give me my change."},
    ],
    [
      {"zh": "你想用現金定係信用卡畀錢呀？", "jyut": "nei5 soeng2 jung6 jin6 gam1 ding6 hai6 seon3 jung6 kaat1 bei2 cin2 aa3?", "en": "Do you want to pay with cash or credit card?"},
      {"zh": "大減價有折扣，買嘢好抵。", "jyut": "daai6 gaam2 gaa3 jau5 zit3 kau3, maai5 je5 hou2 dai2.", "en": "Sale, there's a discount, shopping is a great deal."},
      {"zh": "唔該畀返錢我，仲有收據。", "jyut": "m4 goi1 bei2 faan1 cin2 ngo5, zung6 jau5 sau1 geoi3.", "en": "Please give me my change, and the receipt."},
      {"zh": "我去提款機攞啲銀仔同紙幣。", "jyut": "ngo5 heoi3 tai4 fun2 gei1 lo2 di1 ngan4 zai2 tung4 zi2 bai6.", "en": "I'm going to the ATM to get some coins and banknotes."},
      {"zh": "我想存錢，唔想使咁多錢。", "jyut": "ngo5 soeng2 cyun4 cin2, m4 soeng2 sai2 gam3 do1 cin2.", "en": "I want to save money, don't want to spend so much."},
    ],
  ],
  "top500:10": [
    [
      {"zh": "我用手機打電話，又用電腦上網。", "jyut": "ngo5 jung6 sau2 gei1 daa2 din6 waa2, jau6 jung6 din6 nou5 soeng5 mong5.", "en": "I use my phone to make calls, and my computer to go online."},
      {"zh": "你有冇電話呀？我想同你講嘢。", "jyut": "nei5 jau5 mou5 din6 waa2 aa3? ngo5 soeng2 tung4 nei5 gong2 je5.", "en": "Do you have a phone? I want to talk to you."},
      {"zh": "呢個相機好靚，我鍾意用。", "jyut": "ni1 go3 soeng2 gei1 hou2 leng3, ngo5 zung1 ji3 jung6.", "en": "This camera is quite nice, I like using it."},
      {"zh": "我有個短訊畀你，你睇吓電郵啦。", "jyut": "ngo5 jau5 go3 dyun2 seon3 bei2 nei5, nei5 tai2 haa5 din6 jau4 laa1.", "en": "I have a text for you, go check your email."},
      {"zh": "而家好多人成日睇電視。", "jyut": "ji4 gaa1 hou2 do1 jan4 sing4 jat6 tai2 din6 si6.", "en": "Nowadays lots of people watch TV all the time."},
    ],
    [
      {"zh": "你有手機定係得電話呀？", "jyut": "nei5 jau5 sau2 gei1 ding6 hai6 dak1 din6 waa2 aa3?", "en": "Do you have a mobile, or just a phone?"},
      {"zh": "我用電腦上網，睇短訊，睇電郵。", "jyut": "ngo5 jung6 din6 nou5 soeng5 mong5, tai2 dyun2 seon3, tai2 din6 jau4.", "en": "I use the computer to go online, check texts, check email."},
      {"zh": "你鍾意睇電視，定係鍾意用相機呢？", "jyut": "nei5 zung1 ji3 tai2 din6 si6, ding6 hai6 zung1 ji3 jung6 soeng2 gei1 ne1?", "en": "Do you like watching TV, or do you like using the camera?"},
      {"zh": "打電話定係打短訊，你鍾意邊樣？", "jyut": "daa2 din6 waa2 ding6 hai6 daa2 dyun2 seon3, nei5 zung1 ji3 bin1 joeng6?", "en": "Calling or texting, which do you prefer?"},
    ],
  ],
  "top500:11": [
    [
      {"zh": "我今日好興奮，因為就嚟見到朋友。", "jyut": "ngo5 gam1 jat6 hou2 hing1 fan3, jan1 wai6 zau6 lai4 gin3 dou2 pang4 jau5.", "en": "I'm so excited today, because I'm about to see my friend."},
      {"zh": "佢好嬲，我都唔知點解。", "jyut": "keoi5 hou2 nau1, ngo5 dou1 m4 zi1 dim2 gaai2.", "en": "He's angry, I don't even know why."},
      {"zh": "你使唔使咁緊張呀？唔使驚。", "jyut": "nei5 sai2 m4 sai2 gam3 gan2 zoeng1 aa3? m4 sai2 geng1.", "en": "Do you need to be so nervous? No need to be scared."},
      {"zh": "我有啲失望，不過都算滿意。", "jyut": "ngo5 jau5 di1 sat1 mong6, bat1 gwo3 dou1 syun3 mun5 ji3.", "en": "I'm a bit disappointed, but still fairly satisfied."},
      {"zh": "睇到呢個，我好驚訝，又好感動。", "jyut": "tai2 dou2 ni1 go3, ngo5 hou2 ging1 ngaa6, jau6 hou2 gam2 dung6.", "en": "Seeing this, I'm both surprised and touched."},
      {"zh": "一個人喺屋企，有時會無聊、孤獨，又有時會傷心。", "jyut": "jat1 go3 jan4 hai2 uk1 kei2, jau5 si4 wui5 mou4 liu4, gu1 duk6, jau6 jau5 si4 wui5 soeng1 sam1.", "en": "Alone at home, sometimes it's boring, lonely, and sometimes sad."},
      {"zh": "攞到嘢，我好自豪，又有啲尷尬，跟住要放鬆吓。", "jyut": "lo2 dou2 je5, ngo5 hou2 zi6 hou4, jau6 jau5 di1 gaam3 gaai3, gan1 zyu6 jiu3 fong3 sung1 haa5.", "en": "Getting something like this, I feel proud, and a bit embarrassed too — then I need to relax a bit."},
      {"zh": "唔使擔心，一定得嘅。", "jyut": "m4 sai2 daam1 sam1, jat1 ding6 dak1 ge3.", "en": "No need to worry, it'll definitely be fine."},
    ],
    [
      {"zh": "你今日興奮定係傷心呀？", "jyut": "nei5 gam1 jat6 hing1 fan3 ding6 hai6 soeng1 sam1 aa3?", "en": "Are you excited or sad today?"},
      {"zh": "佢嬲嗰陣，我都有啲驚。", "jyut": "keoi5 nau1 go2 zan6, ngo5 dou1 jau5 di1 geng1.", "en": "When he's angry, I feel a bit scared too."},
      {"zh": "唔使緊張，唔使擔心，一定得嘅。", "jyut": "m4 sai2 gan2 zoeng1, m4 sai2 daam1 sam1, jat1 ding6 dak1 ge3.", "en": "No need to be nervous, no need to worry, it'll be fine."},
      {"zh": "我幾滿意，一啲都唔失望。", "jyut": "ngo5 gei2 mun5 ji3, jat1 di1 dou1 m4 sat1 mong6.", "en": "I'm quite satisfied, not disappointed at all."},
      {"zh": "一個人喺屋企，會唔會無聊、孤獨呀？", "jyut": "jat1 go3 jan4 hai2 uk1 kei2, wui5 m4 wui5 mou4 liu4, gu1 duk6 aa3?", "en": "Being alone at home, do you feel bored, lonely?"},
      {"zh": "自豪定係尷尬呢？放鬆返啦。", "jyut": "zi6 hou4 ding6 hai6 gaam3 gaai3 ne1? fong3 sung1 faan1 laa1.", "en": "Proud or embarrassed? Just relax."},
    ],
  ],
  "top500:12": [
    [
      {"zh": "上定係下呢？左定係右呢？", "jyut": "soeng6 ding6 hai6 haa6 ne1? zo2 ding6 hai6 jau6 ne1?", "en": "Up or down? Left or right?"},
      {"zh": "我間房前面有個公園，後面就係街市。", "jyut": "ngo5 gaan1 fong2 cin4 min6 jau5 go3 gung1 jyun4, hau6 min6 zau6 hai6 gaai1 si5.", "en": "In front of my room there's a park, behind it is the market."},
      {"zh": "入面冇人，出面就好多人。", "jyut": "jap6 min6 mou5 jan4, ceot1 min6 zau6 hou2 do1 jan4.", "en": "Inside there's no one, outside there's lots of people."},
      {"zh": "銀行隔籬就係餐廳。", "jyut": "ngan4 hong4 gaak3 lei4 zau6 hai6 caan1 teng1.", "en": "Next to the bank is the restaurant."},
      {"zh": "中間嗰個係我，左嗰個係你，右嗰個係佢。", "jyut": "zung1 gaan1 go2 go3 hai6 ngo5, zo2 go2 go3 hai6 nei5, jau6 go2 go3 hai6 keoi5.", "en": "The one in the middle is me, the one on the left is you, the one on the right is him."},
    ],
    [
      {"zh": "上去定係落嚟？你喺邊呀？", "jyut": "soeng5 heoi3 ding6 hai6 lok6 lai4? nei5 hai2 bin1 aa3?", "en": "Going up or coming down? Where are you?"},
      {"zh": "左邊定係右邊，邊個近啲呀？", "jyut": "zo2 bin1 ding6 hai6 jau6 bin1, bin1 go3 kan5 di1 aa3?", "en": "Left side or right side, which is closer?"},
      {"zh": "前面有人，後面冇人。", "jyut": "cin4 min6 jau5 jan4, hau6 min6 mou5 jan4.", "en": "There's someone in front, no one behind."},
      {"zh": "入面熱定係出面熱呢？", "jyut": "jap6 min6 jit6 ding6 hai6 ceot1 min6 jit6 ne1?", "en": "Is it hot inside or outside?"},
      {"zh": "隔籬同中間，邊度近啲？", "jyut": "gaak3 lei4 tung4 zung1 gaan1, bin1 dou6 kan5 di1?", "en": "Next door or the middle, which is closer?"},
    ],
  ],
  "top500:13": [
    [
      {"zh": "個、隻、條、張、本、杯、樽、架、間、對、包、碗、碟、支、磅——你要學識晒。", "jyut": "go3, zek3, tiu4, zoeng1, bun2, bui1, zeon1, gaa3, gaan1, deoi3, baau1, wun2, dip2, zi1, bong2 — nei5 jiu3 hok6 sik1 saai3.", "en": "Ge3, zek3, tiu4, zoeng1, bun2, bui1, zeon1, gaa3, gaan1, deoi3, baau1, wun2, dip2, zi1, bong2 — you need to learn all of these."},
      {"zh": "一隻手，一隻腳，兩隻都係我嘅。", "jyut": "jat1 zek3 sau2, jat1 zek3 goek3, loeng5 zek3 dou1 hai6 ngo5 ge3.", "en": "One hand, one foot — both are mine."},
      {"zh": "呢條魚幾大，嗰條褲幾靚。", "jyut": "ni1 tiu4 jyu2 gei2 daai6, go2 tiu4 fu3 gei2 leng3.", "en": "This fish is quite big, those pants are quite nice."},
      {"zh": "一杯茶，一樽酒，你想飲邊個呢？", "jyut": "jat1 bui1 caa4, jat1 zeon1 jau2, nei5 soeng2 jam2 bin1 go3 ne1?", "en": "A cup of tea, a bottle of wine — which do you want to drink?"},
      {"zh": "呢間屋有一架車。", "jyut": "ni1 gaan1 uk1 jau5 jat1 gaa3 ce1.", "en": "This house has a car."},
      {"zh": "一對鞋，一包糖，一碗飯，一碟菜，都喺呢度。", "jyut": "jat1 deoi3 haai4, jat1 baau1 tong4, jat1 wun2 faan6, jat1 dip2 coi3, dou1 hai2 ni1 dou6.", "en": "A pair of shoes, a packet of candy, a bowl of rice, a plate of vegetables — all here."},
      {"zh": "呢條魚幾多磅呀？", "jyut": "ni1 tiu4 jyu2 gei2 do1 bong2 aa3?", "en": "How many pounds does this fish weigh?"},
    ],
    [
      {"zh": "一杯茶，一樽酒，邊樣你要呀？", "jyut": "jat1 bui1 caa4, jat1 zeon1 jau2, bin1 joeng6 nei5 jiu3 aa3?", "en": "A cup of tea, a bottle of wine — which do you want?"},
      {"zh": "一間屋有一架車，仲有一對鞋。", "jyut": "jat1 gaan1 uk1 jau5 jat1 gaa3 ce1, zung6 jau5 jat1 deoi3 haai4.", "en": "A house has a car, and a pair of shoes."},
      {"zh": "一包糖，一碗飯，一碟菜，你要邊樣？", "jyut": "jat1 baau1 tong4, jat1 wun2 faan6, jat1 dip2 coi3, nei5 jiu3 bin1 joeng6?", "en": "A packet of candy, a bowl of rice, a plate of veggies — which do you want?"},
      {"zh": "呢條魚幾多磅呀？", "jyut": "ni1 tiu4 jyu2 gei2 do1 bong2 aa3?", "en": "How many pounds is this fish?"},
      {"zh": "你要邊一本呀？", "jyut": "nei5 jiu3 bin1 jat1 bun2 aa3?", "en": "Which one do you want?"},
    ],
  ],
  "top500:14": [
    [
      {"zh": "星期一到星期五，我要返學。", "jyut": "sing1 kei4 jat1 dou3 sing1 kei4 ng5, ngo5 jiu3 faan1 hok6.", "en": "Monday to Friday, I have to go to school."},
      {"zh": "星期六同星期日，我唔使返學，好開心。", "jyut": "sing1 kei4 luk6 tung4 sing1 kei4 jat6, ngo5 m4 sai2 faan1 hok6, hou2 hoi1 sam1.", "en": "Saturday and Sunday, no school, so happy."},
      {"zh": "今日星期幾呀？聽日就係星期三。", "jyut": "gam1 jat6 sing1 kei4 gei2 aa3? ting1 jat6 zau6 hai6 sing1 kei4 saam1.", "en": "What day is it today? Tomorrow is Wednesday."},
      {"zh": "我星期二同星期四都要做嘢。", "jyut": "ngo5 sing1 kei4 ji6 tung4 sing1 kei4 sei3 dou1 jiu3 zou6 je5.", "en": "I have work to do both Tuesday and Thursday."},
      {"zh": "一個星期有七日，你知唔知呀？", "jyut": "jat1 go3 sing1 kei4 jau5 cat1 jat6, nei5 zi1 m4 zi1 aa3?", "en": "A week has seven days, did you know?"},
    ],
    [
      {"zh": "你星期幾得閒呀？星期五定係星期六？", "jyut": "nei5 sing1 kei4 gei2 dak1 haan4 aa3? sing1 kei4 ng5 ding6 hai6 sing1 kei4 luk6?", "en": "Which day are you free? Friday or Saturday?"},
      {"zh": "星期一至星期五要做嘢，星期六星期日就唔使。", "jyut": "sing1 kei4 jat1 zi3 sing1 kei4 ng5 jiu3 zou6 je5, sing1 kei4 luk6 sing1 kei4 jat6 zau6 m4 sai2.", "en": "Monday to Friday need to work, Saturday and Sunday don't."},
      {"zh": "我星期三見你，好唔好呀？", "jyut": "ngo5 sing1 kei4 saam1 gin3 nei5, hou2 m4 hou2 aa3?", "en": "I'll see you Wednesday, okay?"},
    ],
  ],
  "top500:15": [
    [
      {"zh": "我哋而家開始啦，做完就可以停。", "jyut": "ngo5 dei6 ji4 gaa1 hoi1 ci2 laa1, zou6 jyun4 zau6 ho2 ji5 ting4.", "en": "Let's start now — once we finish, we can stop."},
      {"zh": "唔好停，繼續做落去。", "jyut": "m4 hou2 ting4, gai3 zuk6 zou6 lok6 heoi3.", "en": "Don't stop, keep going."},
      {"zh": "你想改邊樣呀？我哋要揀一個。", "jyut": "nei5 soeng2 goi2 bin1 joeng6 aa3? ngo5 dei6 jiu3 gaan2 jat1 go3.", "en": "What do you want to change? We need to pick one."},
      {"zh": "我哋比較吓呢兩個，先至決定。", "jyut": "ngo5 dei6 bei2 gaau3 haa5 ni1 loeng5 go3, sin1 zi3 kyut3 ding6.", "en": "Let's compare these two, then decide."},
      {"zh": "你準備好未呀？我哋需要多啲時間。", "jyut": "nei5 zeon2 bei6 hou2 mei6 aa3? ngo5 dei6 seoi1 jiu3 do1 di1 si4 gaan3.", "en": "Are you ready? We need more time."},
    ],
    [
      {"zh": "你決定咗未呀？定係仲需要諗多陣？", "jyut": "nei5 kyut3 ding6 zo2 mei6 aa3? ding6 hai6 zung6 seoi1 jiu3 nam2 do1 zan6?", "en": "Have you decided? Or do you still need more time to think?"},
      {"zh": "開始咗就唔好停，要繼續落去。", "jyut": "hoi1 ci2 zo2 zau6 m4 hou2 ting4, jiu3 gai3 zuk6 lok6 heoi3.", "en": "Once started, don't stop — keep going."},
      {"zh": "我想揀呢個，你比較過未呀？", "jyut": "ngo5 soeng2 gaan2 ni1 go3, nei5 bei2 gaau3 gwo3 mei6 aa3?", "en": "I want to pick this one — have you compared them?"},
      {"zh": "準備好未呀？仲想唔想改呀？", "jyut": "zeon2 bei6 hou2 mei6 aa3? zung6 soeng2 m4 soeng2 goi2 aa3?", "en": "Are you ready? Do you still want to change it?"},
    ],
  ],
  "top500:16": [
    [
      {"zh": "我希望你可以明白我講嘅嘢。", "jyut": "ngo5 hei1 mong6 nei5 ho2 ji5 ming4 baak6 ngo5 gong2 ge3 je5.", "en": "I hope you can understand what I'm saying."},
      {"zh": "我相信你，但係想你解釋吓。", "jyut": "ngo5 soeng1 seon3 nei5, daan6 hai6 soeng2 nei5 gaai2 sik1 haa5.", "en": "I believe you, but want you to explain a bit."},
      {"zh": "你問，我答，好唔好呀？", "jyut": "nei5 man6, ngo5 daap3, hou2 m4 hou2 aa3?", "en": "You ask, I'll answer, okay?"},
      {"zh": "佢叫我嘅名，我睇見佢，又聽見佢講嘢。", "jyut": "keoi5 giu3 ngo5 ge3 meng2, ngo5 tai2 gin3 keoi5, jau6 teng1 gin3 keoi5 gong2 je5.", "en": "He called my name, I saw him, and heard him speak."},
      {"zh": "我而家嘅感覺係開心。", "jyut": "ngo5 ji4 gaa1 ge3 gam2 gok3 hai6 hoi1 sam1.", "en": "My feeling right now is happiness."},
    ],
    [
      {"zh": "我希望你相信我講嘅嘢。", "jyut": "ngo5 hei1 mong6 nei5 soeng1 seon3 ngo5 gong2 ge3 je5.", "en": "I hope you believe what I'm saying."},
      {"zh": "你明唔明白呀？使唔使我再解釋呀？", "jyut": "nei5 ming4 m4 ming4 baak6 aa3? sai2 m4 sai2 ngo5 zoi3 gaai2 sik1 aa3?", "en": "Do you understand? Do you need me to explain again?"},
      {"zh": "佢問我，我答佢，跟住佢叫我嘅名。", "jyut": "keoi5 man6 ngo5, ngo5 daap3 keoi5, gan1 zyu6 keoi5 giu3 ngo5 ge3 meng2.", "en": "He asked me, I answered him, then he called my name."},
      {"zh": "我睇見佢，又聽見佢講嘢，感覺幾開心。", "jyut": "ngo5 tai2 gin3 keoi5, jau6 teng1 gin3 keoi5 gong2 je5, gam2 gok3 gei2 hoi1 sam1.", "en": "I saw him, and heard him speak — I felt quite happy."},
    ],
  ],
  "top500:17": [
    [
      {"zh": "我覺得呢件事幾緊要，你要小心啲。", "jyut": "ngo5 gok3 dak1 ni1 gin6 si6 gei2 gan2 jiu3, nei5 jiu3 siu2 sam1 di1.", "en": "I think this matter is quite important, you should be careful."},
      {"zh": "行路嗰陣要注意啲，睇清楚先行。", "jyut": "haang4 lou6 go2 zan6 jiu3 zyu3 ji3 di1, tai2 cing1 co2 sin1 haang4.", "en": "When walking, pay attention — look carefully before you go."},
      {"zh": "你可唔可以檢查吓電腦呀？", "jyut": "nei5 ho2 m4 ho2 ji5 gim2 caa4 haa5 din6 nou5 aa3?", "en": "Can you check the computer please?"},
      {"zh": "電腦壞咗，要搵人修理。", "jyut": "din6 nou5 waai6 zo2, jiu3 wan2 jan4 sau1 lei5.", "en": "The computer is broken, need to find someone to fix it."},
      {"zh": "煮飯之前，要洗菜、切菜，仲要加鹽。", "jyut": "zyu2 faan6 zi1 cin4, jiu3 sai2 coi3, cit3 coi3, zung6 jiu3 gaa1 jim4.", "en": "Before cooking rice, wash the vegetables, cut them, and add salt too."},
      {"zh": "屋企要清潔吓，唔係好污糟。", "jyut": "uk1 kei2 jiu3 cing1 git3 haa5, m4 hai6 hou2 wu1 zou1.", "en": "The house needs a clean, it's a bit dirty."},
    ],
    [
      {"zh": "你覺得呢個安全定係危險呀？要小心啲，注意啲。", "jyut": "nei5 gok3 dak1 ni1 go3 on1 cyun4 ding6 hai6 ngai4 him2 aa3? jiu3 siu2 sam1 di1, zyu3 ji3 di1.", "en": "Do you think this is safe or dangerous? Be careful, pay attention."},
      {"zh": "檢查完之後，仲要修理定係清潔呢？", "jyut": "gim2 caa4 jyun4 zi1 hau6, zung6 jiu3 sau1 lei5 ding6 hai6 cing1 git3 ne1?", "en": "After checking, does it still need repairing or cleaning?"},
      {"zh": "煮飯之前要洗手，跟住切嘢，加鹽。", "jyut": "zyu2 faan6 zi1 cin4 jiu3 sai2 sau2, gan1 zyu6 cit3 je5, gaa1 jim4.", "en": "Before cooking, wash your hands, then cut things, add salt."},
    ],
  ],
  "top500:18": [
    [
      {"zh": "十減三係幾多呀？你識唔識計呀？", "jyut": "sap6 gaam2 saam1 hai6 gei2 do1 aa3? nei5 sik1 m4 sik1 gai3 aa3?", "en": "What's ten minus three? Do you know how to calculate it?"},
      {"zh": "呢件同嗰件比，邊件平啲呀？", "jyut": "ni1 gin6 tung4 go2 gin6 bei2, bin1 gin6 peng4 di1 aa3?", "en": "Comparing this one and that one, which is cheaper?"},
      {"zh": "可唔可以借啲錢畀我呀？我遲啲還畀你。", "jyut": "ho2 m4 ho2 ji5 ze3 di1 cin2 bei2 ngo5 aa3? ngo5 ci4 di1 waan4 bei2 nei5.", "en": "Can you lend me some money? I'll return it to you later."},
      {"zh": "我想送啲嘢畀你。", "jyut": "ngo5 soeng2 sung3 di1 je5 bei2 nei5.", "en": "I want to give you something."},
      {"zh": "聽日我去接你，跟住寄信。", "jyut": "ting1 jat6 ngo5 heoi3 zip3 nei5, gan1 zyu6 gei3 seon3.", "en": "Tomorrow I'll go pick you up, then mail a letter."},
      {"zh": "你收唔收到我送嘅嘢呀？", "jyut": "nei5 sau1 m4 sau1 dou2 ngo5 sung3 ge3 je5 aa3?", "en": "Did you receive what I gave you?"},
    ],
    [
      {"zh": "呢個減嗰個，計落嚟係幾多呀？", "jyut": "ni1 go3 gaam2 go2 go3, gai3 lok6 lai4 hai6 gei2 do1 aa3?", "en": "This one minus that one, how much does it come to?"},
      {"zh": "比嚟比去，邊個平啲呀？", "jyut": "bei2 lai4 bei2 heoi3, bin1 go3 peng4 di1 aa3?", "en": "Comparing them, which is cheaper?"},
      {"zh": "借畀你嘅嘢，記得還返畀我。", "jyut": "ze3 bei2 nei5 ge3 je5, gei3 dak1 waan4 faan1 bei2 ngo5.", "en": "What I lent you, remember to return it to me."},
      {"zh": "我送畀你，你要記得接住。", "jyut": "ngo5 sung3 bei2 nei5, nei5 jiu3 gei3 dak1 zip3 zyu6.", "en": "I'm giving it to you, remember to catch it."},
      {"zh": "寄畀你嘅嘢，收到未呀？", "jyut": "gei3 bei2 nei5 ge3 je5, sau1 dou2 mei6 aa3?", "en": "What I mailed you, did you receive it?"},
    ],
  ],
  "top500:19": [
    [
      {"zh": "我想存多啲錢，唔想使咁多。", "jyut": "ngo5 soeng2 cyun4 do1 di1 cin2, m4 soeng2 sai2 gam3 do1.", "en": "I want to save more money, don't want to spend so much."},
      {"zh": "省啲使錢，可以賺多啲。", "jyut": "saang2 di1 sai2 cin2, ho2 ji5 zaan6 do1 di1.", "en": "Spend a bit less, so you can earn more."},
      {"zh": "呢個比賽，你哋會贏定係輸呢？", "jyut": "ni1 go3 bei2 coi3, nei5 dei6 wui5 jeng4 ding6 hai6 syu1 ne1?", "en": "This competition, will you win or lose?"},
      {"zh": "練習得多，先至做得好。", "jyut": "lin6 zaap6 dak1 do1, sin1 zi3 zou6 dak1 hou2.", "en": "Practice more, then you'll do well."},
      {"zh": "訓練完之後，要休息吓。", "jyut": "fan3 lin6 jyun4 zi1 hau6, jiu3 jau1 sik1 haa5.", "en": "After training, need to rest a bit."},
    ],
    [
      {"zh": "你想存錢定係想賺多啲呢？記得要省啲使。", "jyut": "nei5 soeng2 cyun4 cin2 ding6 hai6 soeng2 zaan6 do1 di1 ne1? gei3 dak1 jiu3 saang2 di1 sai2.", "en": "Do you want to save money or earn more? Remember to spend less."},
      {"zh": "比賽輸咗定係贏咗呀？", "jyut": "bei2 coi3 syu1 zo2 ding6 hai6 jeng4 zo2 aa3?", "en": "Did you lose or win the competition?"},
      {"zh": "練習完之後，要訓練定係休息呢？", "jyut": "lin6 zaap6 jyun4 zi1 hau6, jiu3 fan3 lin6 ding6 hai6 jau1 sik1 ne1?", "en": "After practicing, should you train more or rest?"},
    ],
  ],
  "top500:20": [
    [
      {"zh": "我鍾意睇電視劇，又鍾意睇電影。", "jyut": "ngo5 zung1 ji3 tai2 din6 si6 kek6, jau6 zung1 ji3 tai2 din6 jing2.", "en": "I like watching TV dramas, and movies too."},
      {"zh": "聽音樂、唱歌，都好開心。", "jyut": "teng1 jam1 ngok6, coeng3 go1, dou1 hou2 hoi1 sam1.", "en": "Listening to music, singing — both make me happy."},
      {"zh": "我而家喺度睇書，仲有睇報紙。", "jyut": "ngo5 ji4 gaa1 hai2 dou6 tai2 syu1, zung6 jau5 tai2 bou3 zi2.", "en": "I'm reading a book right now, and reading the newspaper too."},
      {"zh": "雜誌喺枱度，筆同紙都喺度。", "jyut": "zaap6 zi3 hai2 toi2 dou6, bat1 tung4 zi2 dou1 hai2 dou6.", "en": "The magazine is on the table, the pen and paper are here too."},
    ],
    [
      {"zh": "你想睇電視劇定係睇電影呀？", "jyut": "nei5 soeng2 tai2 din6 si6 kek6 ding6 hai6 tai2 din6 jing2 aa3?", "en": "Do you want to watch a TV drama or a movie?"},
      {"zh": "聽音樂、唱歌，都可以喺枱度做。", "jyut": "teng1 jam1 ngok6, coeng3 go1, dou1 ho2 ji5 hai2 toi2 dou6 zou6.", "en": "Listening to music, singing — both can be done at the desk."},
      {"zh": "書、報紙、雜誌，你成日睇邊樣呀？", "jyut": "syu1, bou3 zi2, zaap6 zi3, nei5 sing4 jat6 tai2 bin1 joeng6 aa3?", "en": "Books, newspapers, magazines — which do you read most?"},
      {"zh": "唔該畀支筆同張紙我。", "jyut": "m4 goi1 bei2 zi1 bat1 tung4 zoeng1 zi2 ngo5.", "en": "Please give me a pen and a piece of paper."},
    ],
  ],
  "top500:21": [
    [
      {"zh": "我坐喺椅度，佢瞓喺床度。", "jyut": "ngo5 co5 hai2 ji2 dou6, keoi5 fan3 hai2 cong4 dou6.", "en": "I'm sitting on the chair, he's sleeping in the bed."},
      {"zh": "開門定係開窗呀？開埋燈啦。", "jyut": "hoi1 mun4 ding6 hai6 hoi1 coeng1 aa3? hoi1 maai4 dang1 laa1.", "en": "Open the door or the window? Turn the light on too."},
      {"zh": "屋企有冷氣，廚房、客廳、浴室都有。", "jyut": "uk1 kei2 jau5 laang5 hei3, cyu4 fong2, haak3 teng1, juk6 sat1 dou1 jau5.", "en": "The home has AC — the kitchen, living room, and bathroom all have it too."},
      {"zh": "花園好靚，我鍾意喺度坐吓。", "jyut": "faa1 jyun4 hou2 leng3, ngo5 zung1 ji3 hai2 dou6 co5 haa5.", "en": "The garden is lovely, I like sitting here for a bit."},
    ],
    [
      {"zh": "椅同床，邊樣你想買呀？", "jyut": "ji2 tung4 cong4, bin1 joeng6 nei5 soeng2 maai5 aa3?", "en": "Chair or bed, which do you want to buy?"},
      {"zh": "開門定係開窗？開埋燈，開埋冷氣。", "jyut": "hoi1 mun4 ding6 hai6 hoi1 coeng1? hoi1 maai4 dang1, hoi1 maai4 laang5 hei3.", "en": "Open the door or the window? Turn on the light, and the AC too."},
      {"zh": "廚房、客廳、浴室，邊間你要執吓呀？", "jyut": "cyu4 fong2, haak3 teng1, juk6 sat1, bin1 gaan1 nei5 jiu3 zap1 haa5 aa3?", "en": "Kitchen, living room, bathroom — which one needs tidying?"},
      {"zh": "花園好靚，我哋出去坐吓啦。", "jyut": "faa1 jyun4 hou2 leng3, ngo5 dei6 ceot1 heoi3 co5 haa5 laa1.", "en": "The garden is lovely, let's go sit outside."},
    ],
  ],
  "top500:22": [
    [
      {"zh": "貓同狗都係好得意嘅動物。", "jyut": "maau1 tung4 gau2 dou1 hai6 hou2 dak1 ji3 ge3 dung6 mat6.", "en": "Cats and dogs are both cute animals."},
      {"zh": "雀仔幾得意，老鼠就唔係幾得意。", "jyut": "zoek3 zai2 gei2 dak1 ji3, lou5 syu2 zau6 m4 hai6 gei2 dak1 ji3.", "en": "Birds are quite cute, mice not so much."},
      {"zh": "馬、牛、豬，都幾大。", "jyut": "maa5, ngau4, zyu1, dou1 gei2 daai6.", "en": "Horses, cows, pigs are all quite big."},
      {"zh": "兔仔好得意，蟲就唔係咁得意。", "jyut": "tou3 zai2 hou2 dak1 ji3, cung4 zau6 m4 hai6 gam3 dak1 ji3.", "en": "Rabbits are cute, insects not so much."},
    ],
    [
      {"zh": "貓、狗、兔仔，邊樣動物你鍾意呀？", "jyut": "maau1, gau2, tou3 zai2, bin1 joeng6 dung6 mat6 nei5 zung1 ji3 aa3?", "en": "Cat, dog, rabbit — which animal do you like?"},
      {"zh": "雀仔好得意，老鼠就唔係好得意。", "jyut": "zoek3 zai2 hou2 dak1 ji3, lou5 syu2 zau6 m4 hai6 hou2 dak1 ji3.", "en": "Birds are cute, mice aren't so cute."},
      {"zh": "馬、牛、豬，邊個最大呀？", "jyut": "maa5, ngau4, zyu1, bin1 go3 zeoi3 daai6 aa3?", "en": "Horse, cow, pig — which is biggest?"},
      {"zh": "蟲好細，但係都算係動物。", "jyut": "cung4 hou2 sai3, daan6 hai6 dou1 syun3 hai6 dung6 mat6.", "en": "Insects are small, but they still count as animals."},
    ],
  ],
  "top500:23": [
    [
      {"zh": "天空好藍，海都好藍。", "jyut": "tin1 hung1 hou2 laam4, hoi2 dou1 hou2 laam4.", "en": "The sky is blue, the sea is blue too."},
      {"zh": "山上面有好多樹。", "jyut": "saan1 soeng6 min6 jau5 hou2 do1 syu6.", "en": "There are lots of trees on the mountain."},
      {"zh": "花同草都喺花園度，仲有石。", "jyut": "faa1 tung4 cou2 dou1 hai2 faa1 jyun4 dou6, zung6 jau5 sek6.", "en": "Flowers and grass are in the garden, and stones too."},
      {"zh": "沙灘好靚，島喺海入面。", "jyut": "saa1 taan1 hou2 leng3, dou2 hai2 hoi2 jap6 min6.", "en": "The beach is lovely, the island is in the sea."},
      {"zh": "呢條河好長。", "jyut": "ni1 tiu4 ho4 hou2 coeng4.", "en": "This river is quite long."},
    ],
    [
      {"zh": "天空好藍，海就好靚。", "jyut": "tin1 hung1 hou2 laam4, hoi2 zau6 hou2 leng3.", "en": "The sky is blue, the sea is lovely."},
      {"zh": "山上面有樹、有花、有草。", "jyut": "saan1 soeng6 min6 jau5 syu6, jau5 faa1, jau5 cou2.", "en": "On the mountain there are trees, flowers, grass."},
      {"zh": "沙灘有石，仲有島喺海度。", "jyut": "saa1 taan1 jau5 sek6, zung6 jau5 dou2 hai2 hoi2 dou6.", "en": "The beach has stones, and an island in the sea."},
      {"zh": "呢條河靚唔靚呀？", "jyut": "ni1 tiu4 ho4 leng3 m4 leng3 aa3?", "en": "Is this river pretty?"},
    ],
  ],
  "top500:24": [
    [
      {"zh": "呢個世界有好多國家。", "jyut": "ni1 go3 sai3 gaai3 jau5 hou2 do1 gwok3 gaa1.", "en": "This world has many countries."},
      {"zh": "香港係一個城市，喺中國。", "jyut": "hoeng1 gong2 hai6 jat1 go3 sing4 si5, hai2 zung1 gwok3.", "en": "Hong Kong is a city, in China."},
      {"zh": "中國、台灣、日本、韓國，都喺附近。", "jyut": "zung1 gwok3, toi4 waan1, jat6 bun2, hon4 gwok3, dou1 hai2 fu6 gan6.", "en": "China, Taiwan, Japan, Korea are all nearby."},
      {"zh": "美國同英國都幾遠。", "jyut": "mei5 gwok3 tung4 jing1 gwok3 dou1 gei2 jyun5.", "en": "The US and UK are both quite far."},
      {"zh": "呢個地方好靚，係邊個國家㗎？", "jyut": "ni1 go3 dei6 fong1 hou2 leng3, hai6 bin1 go3 gwok3 gaa1 gaa3?", "en": "This place is lovely, which country is it?"},
    ],
    [
      {"zh": "中國、日本、韓國、台灣，邊個國家你去過呀？", "jyut": "zung1 gwok3, jat6 bun2, hon4 gwok3, toi4 waan1, bin1 go3 gwok3 gaa1 nei5 heoi3 gwo3 aa3?", "en": "China, Japan, Korea, Taiwan — which country have you been to?"},
      {"zh": "美國同英國，邊個城市你想去呀？", "jyut": "mei5 gwok3 tung4 jing1 gwok3, bin1 go3 sing4 si5 nei5 soeng2 heoi3 aa3?", "en": "US or UK, which city do you want to go to?"},
      {"zh": "呢個世界有好多地方好去。", "jyut": "ni1 go3 sai3 gaai3 jau5 hou2 do1 dei6 fong1 hou2 heoi3.", "en": "This world has many places worth visiting."},
    ],
  ],
  "top500:25": [
    [
      {"zh": "廣東話、英文、中文、普通話，都係語言。", "jyut": "gwong2 dung1 waa2, jing1 man2, zung1 man2, pou2 tung1 waa2, dou1 hai6 jyu5 jin4.", "en": "Cantonese, English, Chinese, Mandarin are all languages."},
      {"zh": "呢個字係咩意思呀？", "jyut": "ni1 go3 zi6 hai6 me1 ji3 si1 aa3?", "en": "What does this character mean?"},
      {"zh": "例如呢個字，仲有其他好多字。", "jyut": "lai6 jyu4 ni1 go3 zi6, zung6 jau5 kei4 taa1 hou2 do1 zi6.", "en": "For example this character, and many other characters too."},
      {"zh": "全部字我都想學。", "jyut": "cyun4 bou6 zi6 ngo5 dou1 soeng2 hok6.", "en": "I want to learn all the characters."},
    ],
    [
      {"zh": "廣東話同普通話，邊個語言難學啲呀？", "jyut": "gwong2 dung1 waa2 tung4 pou2 tung1 waa2, bin1 go3 jyu5 jin4 naan4 hok6 di1 aa3?", "en": "Cantonese or Mandarin, which language is harder to learn?"},
      {"zh": "英文定係中文，你鍾意邊樣呀？", "jyut": "jing1 man2 ding6 hai6 zung1 man2, nei5 zung1 ji3 bin1 joeng6 aa3?", "en": "English or Chinese, which do you like?"},
      {"zh": "呢個字係咩意思呀？例如呢個呢？", "jyut": "ni1 go3 zi6 hai6 me1 ji3 si1 aa3? lai6 jyu4 ni1 go3 ne1?", "en": "What does this character mean? For example this one?"},
      {"zh": "其他字我唔識，全部都要學。", "jyut": "kei4 taa1 zi6 ngo5 m4 sik1, cyun4 bou6 dou1 jiu3 hok6.", "en": "I don't know the other characters, need to learn them all."},
    ],
  ],
  "top500:26": [
    [
      {"zh": "你好！早晨！你去邊度呀？", "jyut": "nei5 hou2! zou2 san4! nei5 heoi3 bin1 dou6 aa3?", "en": "Hello! Good morning! Where are you going?"},
      {"zh": "對唔住，遲到咗。——唔緊要，冇問題。", "jyut": "deoi3 m4 zyu6, ci4 dou3 zo2. — m4 gan2 jiu3, mou5 man6 tai4.", "en": "Sorry, I'm late. — It's okay, no problem."},
      {"zh": "恭喜你呀！生日快樂！", "jyut": "gung1 hei2 nei5 aa3! saang1 jat6 faai3 lok6!", "en": "Congratulations! Happy birthday!"},
      {"zh": "好耐冇見，你點呀？", "jyut": "hou2 noi6 mou5 gin3, nei5 dim2 aa3?", "en": "Long time no see, how've you been?"},
      {"zh": "唔使咁快，慢慢嚟啦。", "jyut": "m4 sai2 gam3 faai3, maan6 maan2 lai4 laa1.", "en": "No rush, take your time."},
      {"zh": "如果有嘢做得唔好，你可唔可以原諒我呀？", "jyut": "jyu4 gwo2 jau5 je5 zou6 dak1 m4 hou2, nei5 ho2 m4 ho2 ji5 jyun4 loeng6 ngo5 aa3?", "en": "If I did something not well, can you forgive me?"},
      {"zh": "加油呀！恭喜發財！新年快樂！祝你好運！拜拜！", "jyut": "gaa1 jau4 aa3! gung1 hei2 faat3 coi4! san1 nin4 faai3 lok6! zuk1 nei5 hou2 wan6! baai1 baai3!", "en": "Cheer up! Wishing you prosperity! Happy new year! Good luck! Bye-bye!"},
    ],
    [
      {"zh": "早晨！你好！", "jyut": "zou2 san4! nei5 hou2!", "en": "Good morning! Hello!"},
      {"zh": "對唔住，我遲到咗。——冇問題，唔緊要。", "jyut": "deoi3 m4 zyu6, ngo5 ci4 dou3 zo2. — mou5 man6 tai4, m4 gan2 jiu3.", "en": "Sorry, I'm late. — No problem, it's okay."},
      {"zh": "好耐冇見，你點呀？", "jyut": "hou2 noi6 mou5 gin3, nei5 dim2 aa3?", "en": "Long time no see, how've you been?"},
      {"zh": "慢慢嚟，唔使咁快。", "jyut": "maan6 maan2 lai4, m4 sai2 gam3 faai3.", "en": "Take your time, no need to be so fast."},
      {"zh": "拜拜！加油呀！", "jyut": "baai1 baai3! gaa1 jau4 aa3!", "en": "Bye! Cheer up!"},
      {"zh": "恭喜你！生日快樂！新年快樂！", "jyut": "gung1 hei2 nei5! saang1 jat6 faai3 lok6! san1 nin4 faai3 lok6!", "en": "Congratulations! Happy birthday! Happy new year!"},
      {"zh": "如果我做得唔好，原諒我啦，祝你好運，恭喜發財！", "jyut": "jyu4 gwo2 ngo5 zou6 dak1 m4 hou2, jyun4 loeng6 ngo5 laa1, zuk1 nei5 hou2 wan6, gung1 hei2 faat3 coi4!", "en": "If I did something not well, forgive me — wishing you good luck and prosperity!"},
    ],
  ],
  "top500:27": [
    [
      {"zh": "呢度好靜，出面就好嘈。", "jyut": "ni1 dou6 hou2 zing6, ceot1 min6 zau6 hou2 cou4.", "en": "It's quiet here, noisy outside."},
      {"zh": "房入面好光，出面就黑暗。", "jyut": "fong2 jap6 min6 hou2 gwong1, ceot1 min6 zau6 hak1 am3.", "en": "Inside the room is bright, outside is dark."},
      {"zh": "件衫濕晒，仲未乾。", "jyut": "gin6 saam1 sap1 saai3, zung6 mei6 gon1.", "en": "The shirt is all wet, still not dry."},
      {"zh": "呢張床好軟，嗰個好硬。", "jyut": "ni1 zoeng1 cong4 hou2 jyun5, go2 go3 hou2 ngaang6.", "en": "This bed is soft, that one is hard."},
      {"zh": "呢個係圓嘅，嗰個都係圓嘅。", "jyut": "ni1 go3 hai6 jyun4 ge3, go2 go3 dou1 hai6 jyun4 ge3.", "en": "This one's round, and that one's round too."},
    ],
    [
      {"zh": "呢度靜定係嘈呀？", "jyut": "ni1 dou6 zing6 ding6 hai6 cou4 aa3?", "en": "Is it quiet or noisy here?"},
      {"zh": "房入面光定係黑暗呢？", "jyut": "fong2 jap6 min6 gwong1 ding6 hai6 hak1 am3 ne1?", "en": "Is the room bright or dark?"},
      {"zh": "件衫濕定係乾呀？", "jyut": "gin6 saam1 sap1 ding6 hai6 gon1 aa3?", "en": "Is the shirt wet or dry?"},
      {"zh": "呢張床軟，嗰張就硬。", "jyut": "ni1 zoeng1 cong4 jyun5, go2 zoeng1 zau6 ngaang6.", "en": "This bed is soft, that one is hard."},
      {"zh": "呢個係咪圓嘅呀？", "jyut": "ni1 go3 hai6 mai6 jyun4 ge3 aa3?", "en": "Is this one round?"},
    ],
  ],
  "top500:28": [
    [
      {"zh": "呢個係方嘅，嗰個係尖嘅。", "jyut": "ni1 go3 hai6 fong1 ge3, go2 go3 hai6 zim1 ge3.", "en": "This one's square, that one's pointed."},
      {"zh": "呢個平滑，嗰個就粗糙。", "jyut": "ni1 go3 ping4 waat6, go2 go3 zau6 cou1 cou4.", "en": "This one's smooth, that one's rough."},
      {"zh": "呢個好重，嗰個好輕。", "jyut": "ni1 go3 hou2 cung5, go2 go3 hou2 heng1.", "en": "This one's heavy, that one's light."},
      {"zh": "呢條河好深，嗰度就好淺。", "jyut": "ni1 tiu4 ho4 hou2 sam1, go2 dou6 zau6 hou2 cin2.", "en": "This river is deep, over there it's shallow."},
    ],
    [
      {"zh": "呢個係方嘅，嗰個就尖。", "jyut": "ni1 go3 hai6 fong1 ge3, go2 go3 zau6 zim1.", "en": "This one is square, that one is pointed."},
      {"zh": "平滑定係粗糙呀？睇吓就知。", "jyut": "ping4 waat6 ding6 hai6 cou1 cou4 aa3? tai2 haa5 zau6 zi1.", "en": "Smooth or rough? Take a look and you'll know."},
      {"zh": "重定係輕，你試吓攞起佢。", "jyut": "cung5 ding6 hai6 heng1, nei5 si3 haa5 lo2 hei2 keoi5.", "en": "Heavy or light, try picking it up."},
      {"zh": "河深定係淺呀？", "jyut": "ho4 sam1 ding6 hai6 cin2 aa3?", "en": "Is the river deep or shallow?"},
    ],
  ],
  "top500:29": [
    [
      {"zh": "呢度好窄，嗰度就好闊。", "jyut": "ni1 dou6 hou2 zaak3, go2 dou6 zau6 hou2 fut3.", "en": "This is narrow, that is wide."},
      {"zh": "個杯滿晒，嗰個就空嘅。", "jyut": "go3 bui1 mun5 saai3, go2 go3 zau6 hung1 ge3.", "en": "This cup is full, that one is empty."},
      {"zh": "呢個係真嘅，嗰個係假嘅。", "jyut": "ni1 go3 hai6 zan1 ge3, go2 go3 hai6 gaa2 ge3.", "en": "This one's real, that one's fake."},
      {"zh": "你啱喇！佢就錯咗。", "jyut": "nei5 ngaam1 laa3! keoi5 zau6 co3 zo2.", "en": "You're right! He's wrong."},
    ],
    [
      {"zh": "呢度窄，嗰度闊，你行邊便呀？", "jyut": "ni1 dou6 zaak3, go2 dou6 fut3, nei5 haang4 bin1 bin6 aa3?", "en": "This is narrow, that's wide — which side do you walk?"},
      {"zh": "個杯滿定係空呀？", "jyut": "go3 bui1 mun5 ding6 hai6 hung1 aa3?", "en": "Is the cup full or empty?"},
      {"zh": "真定係假，你點知呀？", "jyut": "zan1 ding6 hai6 gaa2, nei5 dim2 zi1 aa3?", "en": "Real or fake, how do you know?"},
      {"zh": "你啱定係錯，講先啦。", "jyut": "nei5 ngaam1 ding6 hai6 co3, gong2 sin1 laa1.", "en": "Right or wrong, say it first."},
    ],
  ],
  "top1000:1": [
    [
      {"zh": "我朝早上班，夜晚先至下班。", "jyut": "ngo5 ziu1 zou2 soeng5 baan1, je6 maan5 sin1 zi3 haa6 baan1.", "en": "I go to work in the morning, and only get off work at night."},
      {"zh": "老闆叫我哋開會，開會嗰陣要交報告。", "jyut": "lou5 baan2 giu3 ngo5 dei6 hoi1 wui2, hoi1 wui2 go2 zan6 jiu3 gaau1 bou3 gou3.", "en": "The boss told us to have a meeting, and we need to hand in a report at the meeting."},
      {"zh": "呢份合約，要簽名先至得。", "jyut": "ni1 fan6 hap6 joek3, jiu3 cim1 meng2 sin1 zi3 dak1.", "en": "This contract needs a signature first."},
      {"zh": "呢個會議幾耐呀？", "jyut": "ni1 go3 wui6 ji5 gei2 noi6 aa3?", "en": "How long is this meeting?"},
      {"zh": "見工嗰陣，老闆問咗我好多嘢，仲有面試。", "jyut": "gin3 gung1 go2 zan6, lou5 baan2 man6 zo2 ngo5 hou2 do1 je5, zung6 jau5 min6 si3.", "en": "At the job interview, the boss asked me a lot, and there was an interview too."},
    ],
  ],
  "top1000:2": [
    [
      {"zh": "我嘅人工幾多呀？仲有咩福利呢？", "jyut": "ngo5 ge3 jan4 gung1 gei2 do1 aa3? zung6 jau5 me1 fuk1 lei6 ne1?", "en": "How much is my salary? What benefits are there too?"},
      {"zh": "今個月加班加得好多，我想放假。", "jyut": "gam1 go3 jyut6 gaa1 baan1 gaa1 dak1 hou2 do1, ngo5 soeng2 fong3 gaa3.", "en": "This month I've worked overtime a lot, I want time off."},
      {"zh": "病假同年假都要同老闆講。", "jyut": "beng6 gaa3 tung4 nin4 gaa3 dou1 jiu3 tung4 lou5 baan2 gong2.", "en": "Both sick leave and annual leave need to be told to the boss."},
      {"zh": "佢升職喇，我就辭職，跟住退休。", "jyut": "keoi5 sing1 zik1 laa3, ngo5 zau6 ci4 zik1, gan1 zyu6 teoi3 jau1.", "en": "He got promoted, I resigned, then retired."},
      {"zh": "做得唔好，可能會炒魷魚。", "jyut": "zou6 dak1 m4 hou2, ho2 nang4 wui5 caau2 jau4 jyu2.", "en": "If you don't do well, you might get fired."},
    ],
  ],
  "top1000:3": [
    [
      {"zh": "呢個部門有經理，有秘書，仲有好多客戶。", "jyut": "ni1 go3 bou6 mun4 jau5 ging1 lei5, jau5 bei3 syu1, zung6 jau5 hou2 do1 haak3 wu6.", "en": "This department has a manager, a secretary, and lots of clients too."},
      {"zh": "做生意，可以投資股票，又可以買保險。", "jyut": "zou6 saang1 ji3, ho2 ji5 tau4 zi1 gu2 piu3, jau6 ho2 ji5 maai5 bou2 him2.", "en": "In business, you can invest in stocks, and buy insurance too."},
      {"zh": "你嘅履歷寫得幾好，職業係咩呀？", "jyut": "nei5 ge3 lei5 lik6 se2 dak1 gei2 hou2, zik1 jip6 hai6 me1 aa3?", "en": "Your resume is written quite well, what's your occupation?"},
    ],
  ],
  "top1000:4": [
    [
      {"zh": "幼稚園、小學、中學、大學，要讀好耐先至畢業。", "jyut": "jau3 zi6 jyun4, siu2 hok6, zung1 hok6, daai6 hok6, jiu3 duk6 hou2 noi6 sin1 zi3 bat1 jip6.", "en": "Kindergarten, primary, secondary, university — takes a long time to graduate."},
      {"zh": "考試、測驗、功課，都會影響成績。", "jyut": "haau2 si5, caak1 jim6, gung1 fo3, dou1 wui5 jing2 hoeng2 sing4 zik1.", "en": "Exams, quizzes, homework — all affect your grades."},
    ],
  ],
  "top1000:5": [
    [
      {"zh": "校長話，我哋要讀好多科目：數學、化學、物理、歷史。", "jyut": "haau6 zoeng2 waa6, ngo5 dei6 jiu3 duk6 hou2 do1 fo1 muk6: sou3 hok6, faa3 hok6, mat6 lei5, lik6 si2.", "en": "The principal said we need to study many subjects: math, chemistry, physics, history."},
      {"zh": "呢個課程，我同學都話幾難。", "jyut": "ni1 go3 fo3 cing4, ngo5 tung4 hok6 dou1 waa6 gei2 naan4.", "en": "My classmates all say this course is quite hard."},
    ],
  ],
  "top1000:6": [
    [
      {"zh": "地理同體育都係科目。", "jyut": "dei6 lei5 tung4 tai2 juk6 dou1 hai6 fo1 muk6.", "en": "Geography and PE are both subjects."},
      {"zh": "我住喺宿舍，成日去圖書館寫論文。", "jyut": "ngo5 zyu6 hai2 suk1 se3, sing4 jat6 heoi3 tou4 syu1 gun2 se2 leon6 man4.", "en": "I live in a dorm, and go to the library all the time to write my thesis."},
      {"zh": "攞到獎學金，先至可以攞到學位。", "jyut": "lo2 dou2 zoeng2 hok6 gam1, sin1 zi3 ho2 ji5 lo2 dou2 hok6 wai2.", "en": "Only after getting a scholarship can you get the degree."},
      {"zh": "返學要着校服。", "jyut": "faan1 hok6 jiu3 zoek3 haau6 fuk6.", "en": "Going to school means wearing a school uniform."},
    ],
  ],
  "top1000:7": [
    [
      {"zh": "我發燒、頭痛、又咳，要去睇醫生。", "jyut": "ngo5 faat3 siu1, tau4 tung3, jau6 kat1, jiu3 heoi3 tai2 ji1 sang1.", "en": "I have a fever, headache, and a cough — need to see a doctor."},
      {"zh": "我肚痛，又受傷，都要睇醫生。", "jyut": "ngo5 tou5 tung3, jau6 sau6 soeng1, dou1 jiu3 tai2 ji1 sang1.", "en": "I have a stomachache, and I'm injured — also need to see a doctor."},
      {"zh": "睇牙醫之前，要去藥房買藥。", "jyut": "tai2 ngaa4 ji1 zi1 cin4, jiu3 heoi3 joek6 fong4 maai5 joek6.", "en": "Before seeing the dentist, need to go to the pharmacy to buy medicine."},
    ],
  ],
  "top1000:8": [
    [
      {"zh": "我骨折咗，醫生同護士都好幫手。", "jyut": "ngo5 gwat1 zit3 zo2, ji1 sang1 tung4 wu6 si6 dou1 hou2 bong1 sau2.", "en": "I have a fracture, the doctor and nurse both helped a lot."},
      {"zh": "感冒定係流感呢？打咗疫苗會好啲。", "jyut": "gam2 mou6 ding6 hai6 lau4 gam2 ne1? daa2 zo2 jik6 miu4 wui5 hou2 di1.", "en": "Is it a cold or the flu? Getting the vaccine helps."},
      {"zh": "我敏感，身體檢查嗰陣要講畀醫生知。", "jyut": "ngo5 man5 gam2, san1 tai2 gim2 caa4 go2 zan6 jiu3 gong2 bei2 ji1 sang1 zi1.", "en": "I have allergies, need to tell the doctor during the physical checkup."},
    ],
  ],
  "top1000:9": [
    [
      {"zh": "佢要做手術，住院幾日先至出院。", "jyut": "keoi5 jiu3 zou6 sau2 seot6, zyu6 jyun2 gei2 jat6 sin1 zi3 ceot1 jyun2.", "en": "He needs surgery, hospitalized for a few days before being discharged."},
      {"zh": "好緊要就要去急症室，叫救護車。", "jyut": "hou2 gan2 jiu3 zau6 jiu3 heoi3 gap1 zing3 sat1, giu3 gau3 wu6 ce1.", "en": "If it's urgent, go to the ER, call an ambulance."},
      {"zh": "醫生幫我睇體溫、睇血壓，仲有糖尿病。", "jyut": "ji1 sang1 bong1 ngo5 tai2 tai2 wan1, tai2 hyut3 aat3, zung6 jau5 tong4 niu6 beng6.", "en": "The doctor checked my temperature, blood pressure, and diabetes too."},
    ],
  ],
  "top1000:10": [
    [
      {"zh": "我鍾意打波、踢波，又鍾意游水、跑步。", "jyut": "ngo5 zung1 ji3 daa2 bo1, tek3 bo1, jau6 zung1 ji3 jau4 seoi2, paau2 bou6.", "en": "I like playing ball, football, and swimming, jogging too."},
      {"zh": "健身、瑜伽，都可以幫身體。", "jyut": "gin6 san1, jyu4 gaa1, dou1 ho2 ji5 bong1 san1 tai2.", "en": "Working out and yoga both help the body."},
      {"zh": "行山、釣魚、攝影，我都鍾意。", "jyut": "haang4 saan1, diu3 jyu2, sip3 jing2, ngo5 dou1 zung1 ji3.", "en": "Hiking, fishing, photography — I like them all."},
    ],
  ],
  "top1000:11": [
    [
      {"zh": "我鍾意畫畫、彈琴、跳舞。", "jyut": "ngo5 zung1 ji3 waak6 waa2, taan4 kam4, tiu3 mou5.", "en": "I like drawing, playing piano, and dancing."},
      {"zh": "我鍾意睇波、睇演唱會。", "jyut": "ngo5 zung1 ji3 tai2 bo1, tai2 jin2 coeng3 wui2.", "en": "I like watching ball games, and going to concerts."},
      {"zh": "旅行、露營、滑雪，都幾好玩。", "jyut": "leoi5 hang4, lou6 jing4, waat6 syut3, dou1 gei2 hou2 waan2.", "en": "Travelling, camping, skiing — all quite fun."},
    ],
  ],
  "top1000:12": [
    [
      {"zh": "潛水、拳擊，我都試過。", "jyut": "cim4 seoi2, kyun4 gik1, ngo5 dou1 si3 gwo3.", "en": "Diving, boxing — I've tried them both."},
      {"zh": "乒乓波、羽毛球、籃球、足球、網球，你鍾意邊個呀？", "jyut": "bing1 bam1 bo1, jyu5 mou4 kau4, laam4 kau4, zuk1 kau4, mong5 kau4, nei5 zung1 ji3 bin1 go3 aa3?", "en": "Table tennis, badminton, basketball, football, tennis — which do you like?"},
      {"zh": "呢啲都係我嘅興趣。", "jyut": "ni1 di1 dou1 hai6 ngo5 ge3 hing3 ceoi3.", "en": "These are all my hobbies."},
    ],
  ],
  "top1000:13": [
    [
      {"zh": "出國要有護照、簽證，仲要帶行李。", "jyut": "ceot1 gwok3 jiu3 jau5 wu6 ziu3, cim1 zing3, zung6 jiu3 daai3 hang4 lei5.", "en": "Going abroad needs a passport, visa, and you need to bring luggage too."},
      {"zh": "我喺酒店訂房，聽日登機。", "jyut": "ngo5 hai2 zau2 dim3 deng6 fong2, ting1 jat6 dang1 gei1.", "en": "I booked a room at the hotel, boarding tomorrow."},
      {"zh": "班機延誤咗，仲可能取消。", "jyut": "baan1 gei1 jin4 ngo6 zo2, zung6 ho2 nang4 ceoi2 siu1.", "en": "The flight is delayed, and might even be cancelled."},
    ],
  ],
  "top1000:14": [
    [
      {"zh": "去到外國，要兌換錢，睇吓匯率。", "jyut": "heoi3 dou3 ngoi6 gwok3, jiu3 deoi3 wun6 cin2, tai2 haa5 wui6 leot2.", "en": "Once abroad, need to exchange money, check the exchange rate."},
      {"zh": "用地圖，或者跟導遊，去好多景點。", "jyut": "jung6 dei6 tou4, waak6 ze2 gan1 dou6 jau4, heoi3 hou2 do1 ging2 dim2.", "en": "Use a map, or follow a tour guide, go to lots of tourist spots."},
      {"zh": "買啲紀念品返嚟。", "jyut": "maai5 di1 gei2 nim6 ban2 faan1 lai4.", "en": "Buy some souvenirs to bring back."},
      {"zh": "你鍾意自由行，定係跟旅行團呢？", "jyut": "nei5 zung1 ji3 zi6 jau4 hang4, ding6 hai6 gan1 leoi5 hang4 tyun4 ne1?", "en": "Do you like independent travel, or joining a tour group?"},
    ],
  ],
  "top1000:15": [
    [
      {"zh": "我哋幾點出發？幾點抵達呢？", "jyut": "ngo5 dei6 gei2 dim2 ceot1 faat3? gei2 dim2 dai2 daat6 ne1?", "en": "What time do we depart? What time do we arrive?"},
      {"zh": "我哋要轉機，仲要過海關。", "jyut": "ngo5 dei6 jiu3 zyun3 gei1, zung6 jiu3 gwo3 hoi2 gwaan1.", "en": "We need to transfer flights, and go through customs too."},
      {"zh": "入境、離境，都要畀人睇護照。", "jyut": "jap6 ging2, lei4 ging2, dou1 jiu3 bei2 jan4 tai2 wu6 ziu3.", "en": "Entering and leaving a country both require showing your passport."},
      {"zh": "時差好辛苦，好多遊客都咁話。", "jyut": "si4 caa1 hou2 san1 fu2, hou2 do1 jau4 haak3 dou1 gam2 waa6.", "en": "Jet lag is really rough, lots of tourists say so."},
    ],
  ],
  "top1000:16": [
    [
      {"zh": "佢哋拍拖幾耐呀？定係已經分手咗？", "jyut": "keoi5 dei6 paak3 to1 gei2 noi6 aa3? ding6 hai6 ji5 ging1 fan1 sau2 zo2?", "en": "How long have they been dating? Or have they already broken up?"},
      {"zh": "結婚定係離婚，都係好大件事。", "jyut": "git3 fan1 ding6 hai6 lei4 fan1, dou1 hai6 hou2 daai6 gin6 si6.", "en": "Getting married or divorced — both are big deals."},
      {"zh": "求婚之前，佢追求咗好耐，仲表白過。", "jyut": "kau4 fan1 zi1 cin4, keoi5 zeoi1 kau4 zo2 hou2 noi6, zung6 biu2 baak6 gwo3.", "en": "Before the proposal, he pursued her for a long time, and confessed his feelings too."},
      {"zh": "你單身定係有約會呀？定係仲曖昧緊呢？", "jyut": "nei5 daan1 san1 ding6 hai6 jau5 joek3 wui6 aa3? ding6 hai6 zung6 oi3 mui6 gan2 ne1?", "en": "Are you single or dating? Or still in that ambiguous phase?"},
    ],
  ],
  "top1000:17": [
    [
      {"zh": "呢對情侶係伴侶，已婚定係未婚呢？", "jyut": "ni1 deoi3 cing4 leoi5 hai6 bun6 leoi5, ji5 fan1 ding6 hai6 mei6 fan1 ne1?", "en": "This couple are partners — married or unmarried?"},
      {"zh": "佢係我前度，我哋以前異地戀。", "jyut": "keoi5 hai6 ngo5 cin4 dou6, ngo5 dei6 ji5 cin4 ji6 dei6 lyun2.", "en": "He's my ex, we used to be in a long-distance relationship."},
      {"zh": "我哋而家同居，有時吵架，跟住又和好。", "jyut": "ngo5 dei6 ji4 gaa1 tung4 geoi1, jau5 si4 caau2 gaa3, gan1 zyu6 jau6 wo4 hou2.", "en": "We live together now, sometimes argue, then make up."},
      {"zh": "信任好緊要。", "jyut": "seon3 jam6 hou2 gan2 jiu3.", "en": "Trust matters a lot."},
    ],
  ],
  "top1000:18": [
    [
      {"zh": "自由、平等、公平、正義，都好緊要。", "jyut": "zi6 jau4, ping4 dang2, gung1 ping4, zing3 ji6, dou1 hou2 gan2 jiu3.", "en": "Freedom, equality, fairness, justice — all matter a lot."},
      {"zh": "義務同權利，要諗清楚。", "jyut": "ji6 mou6 tung4 kyun4 lei6, jiu3 nam2 cing1 co2.", "en": "Obligations and rights — need to think them through."},
      {"zh": "尊重人，係道德，都係責任。", "jyut": "zyun1 zung6 jan4, hai6 dou6 dak1, dou1 hai6 zaak3 jam6.", "en": "Respecting people is morality, and it's a responsibility too."},
    ],
  ],
  "top1000:19": [
    [
      {"zh": "誠實、勇氣、耐性、毅力，都係好嘅態度。", "jyut": "sing4 sat6, jung5 hei3, noi6 sing3, ngai6 lik6, dou1 hai6 hou2 ge3 taai3 dou6.", "en": "Honesty, courage, patience, perseverance — all good attitudes."},
      {"zh": "你嘅價值觀、信念、原則係咩呀？", "jyut": "nei5 ge3 gaa3 zik6 gun1, seon3 nim6, jyun4 zak1 hai6 me1 aa3?", "en": "What are your values, beliefs, principles?"},
    ],
  ],
  "top1000:20": [
    [
      {"zh": "我哋有好多選擇，又有好多機會、挑戰。", "jyut": "ngo5 dei6 jau5 hou2 do1 syun2 zaak6, jau6 jau5 hou2 do1 gei1 wui6, tiu1 zin3.", "en": "We have lots of choices, and lots of opportunities, challenges too."},
      {"zh": "壓力大，但係都可以係動力。", "jyut": "aat3 lik6 daai6, daan6 hai6 dou1 ho2 ji5 hai6 dung6 lik6.", "en": "Pressure is big, but it can also be motivation."},
      {"zh": "靈感同創意，可以幫我哋做到理想嘅嘢。", "jyut": "ling4 gam2 tung4 cong3 ji3, ho2 ji5 bong1 ngo5 dei6 zou6 dou3 lei5 soeng2 ge3 je5.", "en": "Inspiration and creativity can help us achieve our ideals."},
    ],
  ],
  "top1000:21": [
    [
      {"zh": "我去茶餐廳，飲凍檸茶定係奶茶呢？", "jyut": "ngo5 heoi3 caa4 caan1 teng1, jam2 dung3 ning2 caa4 ding6 hai6 naai5 caa4 ne1?", "en": "I'm going to a cha chaan teng — iced lemon tea or milk tea?"},
      {"zh": "茶餐廳有菠蘿包、雞蛋仔，都幾好食。", "jyut": "caa4 caan1 teng1 jau5 bo1 lo4 baau1, gai1 daan2 zai2, dou1 gei2 hou2 sik6.", "en": "The cha chaan teng has pineapple buns and egg waffles, both quite tasty."},
      {"zh": "燒賣、叉燒、燒臘，都係好味嘅點心。", "jyut": "siu1 maai2, caa1 siu1, siu1 laap6, dou1 hai6 hou2 mei6 ge3 dim2 sam1.", "en": "Siu mai, char siu, roasted meats — all tasty dim sum."},
    ],
  ],
  "top1000:22": [
    [
      {"zh": "凍天，我哋去打邊爐，又或者食煲仔飯。", "jyut": "dung3 tin1, ngo5 dei6 heoi3 daa2 bin1 lou4, jau6 waak6 ze2 sik6 bou1 zai2 faan6.", "en": "Cold weather, let's go for hot pot, or clay pot rice."},
      {"zh": "大排檔、夜市，都好多人。", "jyut": "daai6 paai4 dong3, je6 si5, dou1 hou2 do1 jan4.", "en": "Food stalls, night markets — both crowded."},
      {"zh": "廟街、維港，都係香港嘅景點。", "jyut": "miu6 gaai1, wai4 gong2, dou1 hai6 hoeng1 gong2 ge3 ging2 dim2.", "en": "Temple Street, Victoria Harbour — both Hong Kong tourist spots."},
      {"zh": "搭叮叮車，定係搭小巴呢？", "jyut": "daap3 ding1 ding1 ce1, ding6 hai6 daap3 siu2 baa1 ne1?", "en": "Take the tram, or the minibus?"},
    ],
  ],
  "top1000:23": [
    [
      {"zh": "士多同便利店都可以買嘢。", "jyut": "si6 do1 tung4 bin6 lei6 dim3 dou1 ho2 ji5 maai5 je5.", "en": "Both the corner store and convenience store let you buy things."},
      {"zh": "飲涼茶、食糖水，都幾好。", "jyut": "jam2 loeng4 caa4, sik6 tong4 seoi2, dou1 gei2 hou2.", "en": "Drinking herbal tea, eating sweet soup — both nice."},
      {"zh": "車仔麵好地道，呢間係老字號，街坊都鍾意。", "jyut": "ce1 zai2 min6 hou2 dei6 dou6, ni1 gaan1 hai6 lou5 zi6 hou6, gaai1 fong1 dou1 zung1 ji3.", "en": "Cart noodles are very authentic — this shop is long-established, the neighbours all love it."},
    ],
  ],
  "top1000:24": [
    [
      {"zh": "唔該提醒我，我想提出個諗法。", "jyut": "m4 goi1 tai4 sing2 ngo5, ngo5 soeng2 tai4 ceot1 go3 nam2 faat3.", "en": "Please remind me, I want to propose an idea."},
      {"zh": "呢間公司提供好多嘢，仲想提高多啲。", "jyut": "ni1 gaan1 gung1 si1 tai4 gung1 hou2 do1 je5, zung6 soeng2 tai4 gou1 do1 di1.", "en": "This company provides a lot, and wants to raise things even more."},
      {"zh": "增加定係減少呢？有時要提高，有時要降低。", "jyut": "zang1 gaa1 ding6 hai6 gaam2 siu2 ne1? jau5 si4 jiu3 tai4 gou1, jau5 si4 jiu3 gong3 dai1.", "en": "Increase or decrease? Sometimes need to raise it, sometimes lower it."},
      {"zh": "我發現一個新嘢，仲想發明啲嘢，幫公司發展。", "jyut": "ngo5 faat3 jin6 jat1 go3 san1 je5, zung6 soeng2 faat3 ming4 di1 je5, bong1 gung1 si1 faat3 zin2.", "en": "I discovered something new, and want to invent something too, to help the company develop."},
    ],
  ],
  "top1000:25": [
    [
      {"zh": "發生咩事呀？佢想發表吓。", "jyut": "faat3 sang1 me1 si6 aa3? keoi5 soeng2 faat3 biu2 haa5.", "en": "What happened? He wants to make an announcement."},
      {"zh": "我建議建立、建造多啲嘢。", "jyut": "ngo5 gin3 ji5 gin3 laap6, gin3 zou6 do1 di1 je5.", "en": "I suggest establishing and building more things."},
      {"zh": "你反對定係支持呀？同意就講聲，唔想就拒絕。", "jyut": "nei5 faan2 deoi3 ding6 hai6 zi1 ci4 aa3? tung4 ji3 zau6 gong2 seng1, m4 soeng2 zau6 keoi5 zyut6.", "en": "Do you oppose or support it? Say so if you agree, refuse if you don't want to."},
      {"zh": "批准之前，要諗清楚。", "jyut": "pai1 zeon2 zi1 cin4, jiu3 nam2 cing1 co2.", "en": "Before approving, need to think it through."},
    ],
  ],
  "top1000:26": [
    [
      {"zh": "呢度禁止定係允許呢？", "jyut": "ni1 dou6 gam3 zi2 ding6 hai6 wan5 heoi2 ne1?", "en": "Is this prohibited or allowed here?"},
      {"zh": "要求防止，要求保護。", "jyut": "jiu1 kau4 fong4 zi2, jiu1 kau4 bou2 wu6.", "en": "Demand prevention, demand protection."},
      {"zh": "保存、保持、維持，都唔容易。", "jyut": "bou2 cyun4, bou2 ci4, wai4 ci4, dou1 m4 jung4 ji6.", "en": "Preserving, maintaining, sustaining — none of it is easy."},
      {"zh": "病咗之後，要慢慢恢復。", "jyut": "beng6 zo2 zi1 hau6, jiu3 maan6 maan2 fui1 fuk6.", "en": "After being sick, need to slowly recover."},
      {"zh": "我哋要避免問題發生。", "jyut": "ngo5 dei6 jiu3 bei6 min5 man6 tai4 faat3 sang1.", "en": "We need to avoid problems happening."},
    ],
  ],
  "top1000:27": [
    [
      {"zh": "我哋要改善、改進，仲要更改、更新啲嘢。", "jyut": "ngo5 dei6 jiu3 goi2 sin6, goi2 zeon3, zung6 jiu3 gang1 goi2, gang1 san1 di1 je5.", "en": "We need to improve, and also alter and update things."},
      {"zh": "推遲定係延長？縮短又得唔得？", "jyut": "teoi1 ci4 ding6 hai6 jin4 coeng4? suk1 dyun2 jau6 dak1 m4 dak1?", "en": "Postpone or extend? Would shortening it work too?"},
      {"zh": "分享吓、討論吓，先至可以解決問題。", "jyut": "fan1 hoeng2 haa5, tou2 leon6 haa5, sin1 zi3 ho2 ji5 gaai2 kyut3 man6 tai4.", "en": "Share a bit, discuss a bit — only then can we solve the problem."},
    ],
  ],
  "top1000:28": [
    [
      {"zh": "你係積極定係消極？主動定係被動？", "jyut": "nei5 hai6 zik1 gik6 ding6 hai6 siu1 gik6? zyu2 dung6 ding6 hai6 bei6 dung6?", "en": "Are you proactive or passive? Taking initiative or waiting?"},
      {"zh": "誠懇就唔好虛偽。", "jyut": "sing4 han2 zau6 m4 hou2 heoi1 ngai6.", "en": "Be sincere, don't be hypocritical."},
      {"zh": "慷慨嘅人唔會吝嗇。", "jyut": "hong1 koi3 ge3 jan4 m4 wui5 leon6 sik1.", "en": "Generous people aren't stingy."},
      {"zh": "勇敢定係懦弱，你自己揀。", "jyut": "jung5 gam2 ding6 hai6 no6 joek6, nei5 zi6 gei2 gaan2.", "en": "Brave or cowardly — you choose."},
    ],
  ],
  "top1000:29": [
    [
      {"zh": "你聰明定係愚蠢？勤力定係懶惰？", "jyut": "nei5 cung1 ming4 ding6 hai6 jyu4 ceon2? kan4 lik6 ding6 hai6 laan5 do6?", "en": "Are you clever or foolish? Hardworking or lazy?"},
      {"zh": "樂觀啲，唔好咁悲觀。", "jyut": "lok6 gun1 di1, m4 hou2 gam3 bei1 gun1.", "en": "Be more optimistic, don't be so pessimistic."},
      {"zh": "謙虛啲，唔好咁驕傲。", "jyut": "him1 heoi1 di1, m4 hou2 gam3 giu1 ngou6.", "en": "Be more modest, don't be so proud."},
      {"zh": "遇到事，要冷靜，唔好咁衝動。", "jyut": "jyu6 dou3 si6, jiu3 laang5 zing6, m4 hou2 gam3 cung1 dung6.", "en": "When something happens, stay calm, don't be so impulsive."},
    ],
  ],
  "top1000:30": [
    [
      {"zh": "佢好固執，一啲都唔靈活。", "jyut": "keoi5 hou2 gu3 zap1, jat1 di1 dou1 m4 ling4 wut6.", "en": "He's really stubborn, not flexible at all."},
      {"zh": "你係獨立，定係依賴人哋呢？", "jyut": "nei5 hai6 duk6 laap6, ding6 hai6 ji1 laai6 jan4 dei6 ne1?", "en": "Are you independent, or dependent on others?"},
      {"zh": "呢件事好神秘，唔係好普通。", "jyut": "ni1 gin6 si6 hou2 san4 bei3, m4 hai6 hou2 pou2 tung1.", "en": "This matter is quite mysterious, not very ordinary."},
      {"zh": "呢個好特別，好罕見，唔係好常見，但都幾典型。", "jyut": "ni1 go3 hou2 dak6 bit6, hou2 hon2 gin3, m4 hai6 hou2 soeng4 gin3, daan6 dou1 gei2 din2 jing4.", "en": "This one is quite special, rare, not very common, but still fairly typical."},
    ],
  ],
  "top1000:31": [
    [
      {"zh": "政府有政策，仲要跟法律。", "jyut": "zing3 fu2 jau5 zing3 caak3, zung6 jiu3 gan1 faat3 leot6.", "en": "The government has policies, and needs to follow the law too."},
      {"zh": "法庭有律師，佢哋識法律。", "jyut": "faat3 ting4 jau5 leot6 si1, keoi5 dei6 sik1 faat3 leot6.", "en": "Courts have lawyers, they know the law."},
      {"zh": "警察、消防員，都好緊要嘅職業。", "jyut": "ging2 caat3, siu1 fong4 jyun4, dou1 hou2 gan2 jiu3 ge3 zik1 jip6.", "en": "Police, firefighters — both very important professions."},
      {"zh": "記者、作家、藝術家，都好特別。", "jyut": "gei3 ze2, zok3 gaa1, ngai6 seot6 gaa1, dou1 hou2 dak6 bit6.", "en": "Journalists, writers, artists — all quite special."},
    ],
  ],
  "top1000:32": [
    [
      {"zh": "設計師、建築師、工程師、會計師，都做緊要嘅嘢。", "jyut": "cit3 gai3 si1, gin3 zuk1 si1, gung1 cing4 si1, wui6 gai3 si1, dou1 zou6 gan2 jiu3 ge3 je5.", "en": "Designers, architects, engineers, accountants — all doing important work."},
      {"zh": "廚師煮嘢食，服務員幫手，清潔工執嘢。", "jyut": "cyu4 si1 zyu2 je5 sik6, fuk6 mou6 jyun4 bong1 sau2, cing1 git3 gung1 zap1 je5.", "en": "Chefs cook, waiters help, cleaners tidy up."},
      {"zh": "司機開車，保安睇門口。", "jyut": "si1 gei1 hoi1 ce1, bou2 on1 tai2 mun4 hau2.", "en": "Drivers drive, security guards watch the entrance."},
      {"zh": "呢啲職業，都同經濟有關。", "jyut": "ni1 di1 zik1 jip6, dou1 tung4 ging1 zai3 jau5 gwaan1.", "en": "These professions are all connected to the economy."},
    ],
  ],
  "top1000:33": [
    [
      {"zh": "每個地方都有自己嘅文化、傳統、習俗。", "jyut": "mui5 go3 dei6 fong1 dou1 jau5 zi6 gei2 ge3 man4 faa3, cyun4 tung2, zaap6 zuk6.", "en": "Every place has its own culture, traditions, customs."},
      {"zh": "社會、環境、人口，都好緊要。", "jyut": "se5 wui2, waan4 ging2, jan4 hau2, dou1 hou2 gan2 jiu3.", "en": "Society, environment, population — all matter a lot."},
      {"zh": "移民、難民，都想搵個好地方住。", "jyut": "ji4 man4, naan6 man4, dou1 soeng2 wan2 go3 hou2 dei6 fong1 zyu6.", "en": "Immigrants, refugees — both want to find a good place to live."},
      {"zh": "有人貧窮，有人富有。", "jyut": "jau5 jan4 pan4 kung4, jau5 jan4 fu3 jau5.", "en": "Some people are poor, some are wealthy."},
    ],
  ],
  "top1000:34": [
    [
      {"zh": "節日好多：聖誕節、中秋節、端午節、清明節、盂蘭節，仲有復活節、萬聖節。", "jyut": "zit3 jat6 hou2 do1: sing3 daan3 zit3, zung1 cau1 zit3, dyun1 ng5 zit3, cing1 ming4 zit3, jyu4 laan4 zit3, zung6 jau5 fuk6 wut6 zit3, maan6 sing3 zit3.", "en": "So many festivals: Christmas, Mid-Autumn, Dragon Boat, Ching Ming, Hungry Ghost, and also Easter, Halloween."},
      {"zh": "情人節、母親節、父親節，都要記得。", "jyut": "cing4 jan4 zit3, mou5 can1 zit3, fu6 can1 zit3, dou1 jiu3 gei3 dak1.", "en": "Valentine's Day, Mother's Day, Father's Day — all need remembering."},
      {"zh": "農曆新年最開心。", "jyut": "nung4 lik6 san1 nin4 zeoi3 hoi1 sam1.", "en": "Lunar New Year is the happiest."},
    ],
  ],
  "top1000:35": [
    [
      {"zh": "呢個世紀，呢個年代，都幾特別。", "jyut": "ni1 go3 sai3 gei2, ni1 go3 nin4 doi6, dou1 gei2 dak6 bit6.", "en": "This century, this era — both quite special."},
      {"zh": "上半年定係下半年，你鍾意邊個季節？", "jyut": "soeng6 bun3 nin4 ding6 hai6 haa6 bun3 nin4, nei5 zung1 ji3 bin1 go3 gwai3 zit3?", "en": "First half or second half of the year — which season do you like?"},
      {"zh": "春天、夏天、秋天、冬天，四個季節。", "jyut": "ceon1 tin1, haa6 tin1, cau1 tin1, dung1 tin1, sei3 go3 gwai3 zit3.", "en": "Spring, summer, autumn, winter — four seasons."},
      {"zh": "週末休息，好開心。", "jyut": "zau1 mut6 jau1 sik1, hou2 hoi1 sam1.", "en": "Resting on the weekend, so happy."},
    ],
  ],
  "top1000:36": [
    [
      {"zh": "平日返學返工，假期同公眾假期就唔使。", "jyut": "ping4 jat6 faan1 hok6 faan1 gung1, gaa3 kei4 tung4 gung1 zung3 gaa3 kei4 zau6 m4 sai2.", "en": "On weekdays go to school and work, but not on holidays or public holidays."},
      {"zh": "提早啲去，唔好遲到，要準時。", "jyut": "tai4 zou2 di1 heoi3, m4 hou2 ci4 dou3, jiu3 zeon2 si4.", "en": "Go a bit earlier, don't be late, be on time."},
      {"zh": "大概幾點呀？兩點左右，將近三點。", "jyut": "daai6 koi3 gei2 dim2 aa3? loeng5 dim2 zo2 jau6, zoeng1 gan6 saam1 dim2.", "en": "About what time is it? Around two, nearly three."},
      {"zh": "我等咗足足一個鐘頭，仲要多等一陣。", "jyut": "ngo5 dang2 zo2 zuk1 zuk1 jat1 go3 zung1 tau4, zung6 jiu3 do1 dang2 jat1 zan6.", "en": "I've waited a full hour, and still need to wait a bit more."},
    ],
  ],
  "top1000:37": [
    [
      {"zh": "呢個更加靚，最為特別。", "jyut": "ni1 go3 gang3 gaa1 leng3, zeoi3 wai4 dak6 bit6.", "en": "This one is even prettier, most special."},
      {"zh": "相對嚟講，呢個絕對好啲。", "jyut": "soeng1 deoi3 lai4 gong2, ni1 go3 zyut6 deoi3 hou2 di1.", "en": "Relatively speaking, this one is absolutely better."},
      {"zh": "呢兩個一樣，定係唔同呢？", "jyut": "ni1 loeng5 go3 jat1 joeng6, ding6 hai6 m4 tung4 ne1?", "en": "Are these two the same, or different?"},
      {"zh": "差唔多啦，兩個都幾類似。", "jyut": "caa1 m4 do1 laa1, loeng5 go3 dou1 gei2 leoi6 ci5.", "en": "Almost the same, both quite similar."},
      {"zh": "完全唔同，幾乎睇唔出。", "jyut": "jyun4 cyun4 m4 tung4, gei2 fu4 tai2 m4 ceot1.", "en": "Completely different, almost can't tell."},
      {"zh": "僅僅得咁多，只不過係咁樣。", "jyut": "gan2 gan2 dak1 gam3 do1, zi2 bat1 gwo3 hai6 gam2 joeng6.", "en": "Just this much, that's all it is."},
      {"zh": "除咗呢個，越嚟越多人鍾意。", "jyut": "ceoi4 zo2 ni1 go3, jyut6 lei4 jyut6 do1 jan4 zung1 ji3.", "en": "Apart from this one, more and more people like it."},
      {"zh": "佢特登嚟搵你。", "jyut": "keoi5 dak6 dang1 lai4 wan2 nei5.", "en": "He came on purpose to find you."},
    ],
  ],
  "top1000:38": [
    [
      {"zh": "半個，兩倍，你要邊樣呀？", "jyut": "bun3 go3, loeng5 pui5, nei5 jiu3 bin1 joeng6 aa3?", "en": "Half of it, double it — which do you want?"},
      {"zh": "呢次，嗰次，睇咗幾遍，去咗幾趟。", "jyut": "ni1 ci3, go2 ci3, tai2 zo2 gei2 pin3, heoi3 zo2 gei2 tong3.", "en": "This time, that time — watched it several times, been there several trips."},
      {"zh": "呢位、呢件、嗰幢樓、邊層，你要邊個？", "jyut": "ni1 wai2, ni1 gin6, go2 zong6 lau2, bin1 cang4, nei5 jiu3 bin1 go3?", "en": "This person, this item, that building, which floor — which one do you want?"},
      {"zh": "一塊、一粒、一滴，都係少少。", "jyut": "jat1 faai3, jat1 nap1, jat1 dik6, dou1 hai6 siu2 siu2.", "en": "A chunk, a bit, a drop — all a little bit."},
      {"zh": "邊種、第幾多，仲有第一，你要邊個？", "jyut": "bin1 zung2, dai6 gei2 do1, zung6 jau5 dai6 jat1, nei5 jiu3 bin1 go3?", "en": "Which type, which number, and first place too — which do you want?"},
    ],
  ],
  "top1000:39": [
    [
      {"zh": "冇所謂，隨便啦，由得佢啦。", "jyut": "mou5 so2 wai6, cheoi4 bin6 laa1, jau4 dak1 keoi5 laa1.", "en": "Doesn't matter, whatever, let it be."},
      {"zh": "算啦，咪住先。", "jyut": "syun3 laa1, mai5 zyu6 sin1.", "en": "Forget it — wait, hold on."},
      {"zh": "梗係啦！實在太好喇。", "jyut": "gang2 hai6 laa1! sat6 zoi6 taai3 hou2 laa3.", "en": "Of course! Really too good."},
      {"zh": "其實，總之，反正，都係一樣嘅意思。", "jyut": "kei4 sat6, zung2 zi1, faan2 zing3, dou1 hai6 jat1 joeng6 ge3 ji3 si1.", "en": "Actually, in short, anyway — all mean the same thing."},
    ],
  ],
  "top1000:40": [
    [
      {"zh": "始終都係咁，難怪，唔怪之得。", "jyut": "ci2 zung1 dou1 hai6 gam2, naan4 gwaai3, m4 gwaai3 zi1 dak1.", "en": "It's always like this after all — no wonder, makes sense."},
      {"zh": "估唔到，諗唔到，原來係咁。", "jyut": "gu2 m4 dou2, nam2 m4 dou2, jyun4 loi4 hai6 gam2.", "en": "Didn't expect it, didn't think of it — so that's how it is."},
      {"zh": "認真啲，講真，老實講。", "jyut": "jing6 zan1 di1, gong2 zan1, lou5 sat6 gong2.", "en": "Be more serious — honestly, speaking truthfully."},
      {"zh": "咪講笑喇！", "jyut": "mai5 gong2 siu3 laa3!", "en": "Don't joke around!"},
    ],
  ],
  "top1000:41": [
    [
      {"zh": "呢個應用程式，要更新程式先得。", "jyut": "ni1 go3 jing3 jung6 cing4 sik1, jiu3 gang1 san1 cing4 sik1 sin1 dak1.", "en": "This app needs a software update first."},
      {"zh": "密碼、帳戶，登入、登出，都要記得。", "jyut": "mat6 maa5, zoeng3 wu6, dang1 jap6, dang1 ceot1, dou1 jiu3 gei3 dak1.", "en": "Password, account, logging in, logging out — all need remembering."},
      {"zh": "下載、上載，喺社交媒體度寫帖文。", "jyut": "haa6 zoi3, soeng5 zoi3, hai2 se5 gaau1 mui4 tai2 dou6 se2 tip3 man2.", "en": "Downloading, uploading, writing posts on social media."},
    ],
  ],
  "top1000:42": [
    [
      {"zh": "留言、讚好，都係睇直播嗰陣做嘅嘢。", "jyut": "lau4 jin4, zaan3 hou2, dou1 hai6 tai2 zik6 bo3 go2 zan6 zou6 ge3 je5.", "en": "Commenting, liking — things you do while watching a livestream."},
      {"zh": "網紅好紅，但係都要小心病毒，用防毒軟件。", "jyut": "mong5 hung4 hou2 hung4, daan6 hai6 dou1 jiu3 siu2 sam1 beng6 duk6, jung6 fong4 duk6 jyun5 gin2.", "en": "Influencers are very popular, but still need to watch out for viruses, use antivirus software."},
      {"zh": "屏幕、充電、電池、藍芽，都係手機嘅嘢。", "jyut": "ping4 mok2, cung1 din6, din6 ci4, laam4 ngaa4, dou1 hai6 sau2 gei1 ge3 je5.", "en": "Screen, charging, battery, Bluetooth — all phone things."},
    ],
  ],
  "top1000:43": [
    [
      {"zh": "沙發、雪櫃、衣櫃，都喺屋企。", "jyut": "saa1 faat3, syut3 gwai6, ji1 gwai6, dou1 hai2 uk1 kei2.", "en": "Sofa, fridge, wardrobe — all at home."},
      {"zh": "洗衣機、電飯煲、微波爐，都好有用。", "jyut": "sai2 ji1 gei1, din6 faan6 bou1, mei4 bo1 lou4, dou1 hou2 jau5 jung6.", "en": "Washing machine, rice cooker, microwave — all very useful."},
      {"zh": "鏡、電掣、插蘇、水喉，都係屋企常見嘅嘢。", "jyut": "geng3, din6 zai3, caap3 sou1, seoi2 hau4, dou1 hai6 uk1 kei2 soeng4 gin3 ge3 je5.", "en": "Mirror, light switch, plug, tap — all common things at home."},
    ],
  ],
  "top1000:44": [
    [
      {"zh": "吸塵機、垃圾桶、鎖匙、遙控器，都喺屋企。", "jyut": "kap1 can4 gei1, laap6 saap3 tung2, so2 si4, jiu4 hung3 hei3, dou1 hai2 uk1 kei2.", "en": "Vacuum, trash bin, keys, remote — all at home."},
      {"zh": "行樓梯定係搭電梯呢？", "jyut": "haang4 lau4 tai1 ding6 hai6 daap3 din6 tai1 ne1?", "en": "Take the stairs or the elevator?"},
      {"zh": "露台、天花板、地板、牆，都係屋企嘅嘢。", "jyut": "lou6 toi4, tin1 faa1 baan2, dei6 baan2, coeng4, dou1 hai6 uk1 kei2 ge3 je5.", "en": "Balcony, ceiling, floor, wall — all part of the home."},
    ],
  ],
  "top1000:45": [
    [
      {"zh": "熊貓、獅子、老虎、大象，都好大。", "jyut": "hung4 maau1, si1 zi2, lou5 fu2, daai6 zoeng6, dou1 hou2 daai6.", "en": "Pandas, lions, tigers, elephants — all quite big."},
      {"zh": "猴子、蛇、烏龜，都幾得意。", "jyut": "hau4 zi2, se4, wu1 gwai1, dou1 gei2 dak1 ji3.", "en": "Monkeys, snakes, turtles — all quite cute."},
      {"zh": "蝴蝶、蜜蜂、蚊，都識飛。", "jyut": "wu4 dip2, mat6 fung1, man1, dou1 sik1 fei1.", "en": "Butterflies, bees, mosquitoes — all can fly."},
    ],
  ],
  "top1000:46": [
    [
      {"zh": "樹葉、樹枝、種子，都喺泥土附近。", "jyut": "syu6 jip6, syu6 zi1, zung2 zi2, dou1 hai2 nai4 tou2 fu6 gan6.", "en": "Leaves, branches, seeds — all near the soil."},
      {"zh": "湖同瀑布，都好靚。", "jyut": "wu4 tung4 buk6 bou3, dou1 hou2 leng3.", "en": "The lake and waterfall are both lovely."},
      {"zh": "火山、地震、颱風，都好危險。", "jyut": "fo2 saan1, dei6 zan3, toi4 fung1, dou1 hou2 ngai4 him2.", "en": "Volcanoes, earthquakes, typhoons — all dangerous."},
      {"zh": "落雨之後，有時會見到彩虹。", "jyut": "lok6 jyu5 zi1 hau6, jau5 si4 wui5 gin3 dou2 coi2 hung4.", "en": "After it rains, sometimes you see a rainbow."},
    ],
  ],
  "top1000:47": [
    [
      {"zh": "叉燒包、漢堡包，我都鍾意食。", "jyut": "caa1 siu1 baau1, hon3 bou2 baau1, ngo5 dou1 zung1 ji3 sik6.", "en": "Char siu buns, hamburgers — I like eating both."},
      {"zh": "蝦餃、春卷，都係點心。", "jyut": "haa1 gaau2, ceon1 gyun2, dou1 hai6 dim2 sam1.", "en": "Shrimp dumplings, spring rolls — both dim sum."},
      {"zh": "炒麵、炒飯、焗豬扒飯，都好好食。", "jyut": "caau2 min6, caau2 faan6, guk6 zyu1 paa2 faan6, dou1 hou2 hou2 sik6.", "en": "Fried noodles, fried rice, baked pork chop rice — all delicious."},
      {"zh": "沙律、薯條、三文治，我都食過。", "jyut": "saa1 leot2, syu4 tiu4, saam1 man4 zi6, ngo5 dou1 sik6 gwo3.", "en": "Salad, fries, sandwiches — I've eaten them all."},
    ],
  ],
  "top1000:48": [
    [
      {"zh": "意粉加芝士，好好食。", "jyut": "ji3 fan2 gaa1 zi1 si2, hou2 hou2 sik6.", "en": "Pasta with cheese, delicious."},
      {"zh": "我飲牛奶，佢飲豆漿。", "jyut": "ngo5 jam2 ngau4 naai5, keoi5 jam2 dau6 zoeng1.", "en": "I drink milk, he drinks soy milk."},
      {"zh": "麵包加果醬，好好食。", "jyut": "min6 baau1 gaa1 gwo2 zoeng3, hou2 hou2 sik6.", "en": "Bread with jam, delicious."},
      {"zh": "醬油、醋、辣椒、薑、蒜頭，都係煮嘢食要用嘅嘢。", "jyut": "zoeng3 jau4, cou3, laat6 ziu1, goeng1, syun3 tau4, dou1 hai6 zyu2 je5 sik6 jiu3 jung6 ge3 je5.", "en": "Soy sauce, vinegar, chili, ginger, garlic — all needed for cooking."},
    ],
  ],
  "top1000:49": [
    [
      {"zh": "木、金屬、塑膠、玻璃、布、皮，都係唔同嘅嘢。", "jyut": "muk6, gam1 suk6, sok3 gaau1, bo1 lei1, bou3, pei4, dou1 hai6 m4 tung4 ge3 je5.", "en": "Wood, metal, plastic, glass, cloth, leather — all different things."},
      {"zh": "三角形、正方形、長方形、圓形，你識唔識畫呀？", "jyut": "saam1 gok3 jing4, zing3 fong1 jing4, coeng4 fong1 jing4, jyun4 jing4, nei5 sik1 m4 sik1 waak6 aa3?", "en": "Triangle, square, rectangle, circle — do you know how to draw them?"},
    ],
  ],
  "top1000:50": [
    [
      {"zh": "科學嘅化學反應，要做實驗先至知。", "jyut": "fo1 hok6 ge3 faa3 hok6 faan2 jing3, jiu3 zou6 sat6 jim6 sin1 zi3 zi1.", "en": "Chemical reactions in science — need to do experiments to know."},
      {"zh": "原子好細，但係有能量。", "jyut": "jyun4 zi2 hou2 sai3, daan6 hai6 jau5 nang4 loeng6.", "en": "Atoms are tiny, but they have energy."},
      {"zh": "重力、溫度、速度、距離、面積，都係科學嘅嘢。", "jyut": "cung5 lik6, wan1 dou6, cuk1 dou6, keoi5 lei4, min6 zik1, dou1 hai6 fo1 hok6 ge3 je5.", "en": "Gravity, temperature, speed, distance, area — all science things."},
    ],
  ],
  "top1000:51": [
    [
      {"zh": "聽新聞，聽電台，仲有睇廣告、睇訪問。", "jyut": "teng1 san1 man4, teng1 din6 toi4, zung6 jau5 tai2 gwong2 gou3, tai2 fong2 man6.", "en": "Listening to the news, the radio, and watching ads, interviews too."},
      {"zh": "污染唔好，要回收，要環保。", "jyut": "wu1 jim5 m4 hou2, jiu3 wui4 sau1, jiu3 waan4 bou2.", "en": "Pollution is bad, need to recycle, be eco-friendly."},
      {"zh": "氣候變化、能源，都係好緊要嘅新聞。", "jyut": "hei3 hau6 bin3 faa3, nang4 jyun4, dou1 hai6 hou2 gan2 jiu3 ge3 san1 man4.", "en": "Climate change, energy — both very important news topics."},
    ],
  ],
  "top1000:52": [
    [
      {"zh": "太陽能好環保。", "jyut": "taai3 joeng4 nang4 hou2 waan4 bou2.", "en": "Solar energy is very eco-friendly."},
      {"zh": "太空好大，地球喺宇宙入面好細。", "jyut": "taai3 hung1 hou2 daai6, dei6 kau4 hai2 jyu5 zau6 jap6 min6 hou2 sai3.", "en": "Space is huge, the Earth is tiny within the universe."},
      {"zh": "夜晚可以睇星星、月亮。", "jyut": "je6 maan5 ho2 ji5 tai2 sing1 sing1, jyut6 loeng6.", "en": "At night you can look at stars and the moon."},
      {"zh": "未來、過去、現在，都係時間。", "jyut": "mei6 loi4, gwo3 heoi3, jin6 zoi6, dou1 hai6 si4 gaan3.", "en": "Future, past, present — all time."},
    ],
  ],
};
