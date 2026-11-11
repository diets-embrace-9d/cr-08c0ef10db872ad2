// "Realistic Reader" — unlike data/passages.js (built strictly from taught
// lesson vocabulary, one word tier at a time), this content is meant to
// simulate reading something a real visitor to Hong Kong would encounter:
// full of dish names, notices, and small print that were never "taught" at
// all. Word lookups here go through js/dictionary.js's full CC-Canto/CEDICT
// coverage rather than the curated-only vocab lists, so every word should
// still be tappable even though most were never part of a lesson.
//
// Each entry is a realistic document made of typed blocks:
//   { kind: "shop-name", text }
//   { kind: "tagline", text }
//   { kind: "section", text }                     — section heading
//   { kind: "item", zh, price, note? }             — a menu line + price
//   { kind: "note", text }                          — small print / notice
export const REALISTIC_READINGS = [
  {
    id: "noodle-shop-menu",
    category: "🍜 Restaurants",
    title: "德興麵家",
    englishTitle: "Realistic Menu: Hong Kong Noodle Shop",
    level: 3,
    blocks: [
      { kind: "shop-name", text: "德興麵家" },
      { kind: "tagline", text: "老字號 · 手打竹昇麵" },

      { kind: "section", text: "招牌推介 Chef's Recommendations" },
      { kind: "item", zh: "招牌鮮蝦雲吞麵", price: "$42" },
      { kind: "item", zh: "秘製牛腩撈麵", price: "$48" },
      { kind: "item", zh: "竹昇淨麵", price: "$22" },

      { kind: "section", text: "湯麵 Soup Noodles" },
      { kind: "note", text: "麵底可選：幼麵／粗麵／河粉／米粉／伊麵，麵底不另加費用。" },
      { kind: "item", zh: "雲吞麵", price: "$32" },
      { kind: "item", zh: "鮮蝦雲吞麵", price: "$38" },
      { kind: "item", zh: "牛腩麵", price: "$46" },
      { kind: "item", zh: "牛雜麵", price: "$44" },
      { kind: "item", zh: "豬手麵", price: "$45" },
      { kind: "item", zh: "魚蛋麵", price: "$28" },
      { kind: "item", zh: "墨魚丸麵", price: "$30" },
      { kind: "item", zh: "淨麵", price: "$20" },

      { kind: "section", text: "撈麵 Dry-Tossed Noodles" },
      { kind: "item", zh: "蝦子撈麵", price: "$34" },
      { kind: "item", zh: "麻醬撈麵", price: "$30" },
      { kind: "item", zh: "蠔油撈麵", price: "$28" },
      { kind: "item", zh: "乾炒牛河", price: "$45" },

      { kind: "section", text: "小食 Sides" },
      { kind: "item", zh: "韭菜餃（六隻）", price: "$26" },
      { kind: "item", zh: "炸雲吞（六隻）", price: "$24" },
      { kind: "item", zh: "滷水豆腐", price: "$18" },

      { kind: "section", text: "飲品 Drinks" },
      { kind: "item", zh: "凍檸茶", price: "$18" },
      { kind: "item", zh: "熱奶茶", price: "$16" },
      { kind: "item", zh: "鴛鴦", price: "$19" },
      { kind: "item", zh: "檸檬蜜", price: "$17" },
      { kind: "item", zh: "可樂／雪碧", price: "$14" },
      { kind: "item", zh: "涼茶", price: "$12" },

      { kind: "section", text: "甜品 Desserts" },
      { kind: "item", zh: "楊枝甘露", price: "$32" },
      { kind: "item", zh: "豆腐花", price: "$16" },
      { kind: "item", zh: "紅豆沙", price: "$18" },
      { kind: "item", zh: "芒果布甸", price: "$22" },

      { kind: "section", text: "告示 Notices" },
      { kind: "note", text: "營業時間：星期一至五 上午11時至晚上10時；星期六、日及公眾假期 上午10時至晚上10時半。" },
      { kind: "note", text: "地址：香港九龍旺角西洋菜南街88號地下" },
      { kind: "note", text: "電話：2345 6789" },
      { kind: "note", text: "本店暫只收現金及八達通，不設信用卡付款，敬請留意。" },
      { kind: "note", text: "堂食另收加一服務費。" },
      { kind: "note", text: "午市繁忙時間座位有限，敬請見諒。" },
      { kind: "note", text: "如對任何食物或配料敏感，請於落單前通知職員。" },
      { kind: "note", text: "湯底每日新鮮熬製，售完即止，敬請見諒。" },
      { kind: "note", text: "免費Wi-Fi密碼：noodle2024" },
    ],
  },
];
