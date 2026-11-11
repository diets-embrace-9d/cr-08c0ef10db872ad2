// Hand-checked meanings for common characters the dictionaries cover badly:
// a misleading gloss, or missing senses and readings. Each character's
// entries replace its standalone CC-Canto / CC-CEDICT entries. The first
// entry becomes the main meaning, unless curated lesson vocab already has
// the character, in which case all of these show as alternatives.
// Format: { [character]: [[jyutping, english], ...] }
export const CHAR_MEANINGS = {
  "堂": [
    ["tong4", "hall / main room (as in 禮堂 auditorium, 飯堂 canteen, 教堂 church)"],
    ["tong4", "a class or lesson (上堂 go to class, 一堂課 one lesson)"],
    ["tong4", "paternal cousin (堂兄弟 cousins through father's brothers, 堂家姐 older female cousin)"],
    ["tong4", "on the premises (堂食 dine in)"],
  ],
  "好": [
    ["hou2", "good / well"],
    ["hou2", "very (好熱 very hot, 好靚 very pretty)"],
    ["hou3", "to like / be fond of (好學 fond of learning, 愛好 hobby)"],
  ],
  "啲": [
    ["di1", "some / a few (啲嘢 some things)"],
    ["di1", "a bit more (大啲 a bit bigger, 快啲 a bit faster)"],
    ["di1", "plural marker before a noun (啲人 the people)"],
  ],
};
