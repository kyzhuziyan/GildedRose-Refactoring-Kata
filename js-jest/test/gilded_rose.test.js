const { Shop, Item } = require("../src/gilded_rose");

const name_lst = [
  "foo",
  "Aged Brie",
  "Backstage passes to a TAFKAL80ETC concert",
  "Sulfuras, Hand of Ragnaros",
];
const sell_in_lst = [-1, 0, 1, 5, 10, 15];
const quality_lst = [-1, 0, 1, 5, 10, 15, 80, 49];

const old_examples = name_lst
  .map((name) =>
    sell_in_lst.map((sell_in) =>
      quality_lst.map((quality) => {
        const itemArgs = new Item(name, sell_in, quality);
        const gildedRose = new Shop([itemArgs]);
        const items = gildedRose.updateQuality();
        return { itemArgs, items };
      })
    )
  )
  .flat(2);

describe("Gilded Rose", function () {
  old_examples.forEach((example) => {
    it("should foo", function () {
      const gildedRose = new Shop([example.itemArgs]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe(example.items[0].name);
      expect(items[0].sellIn).toBe(example.items[0].sellIn);
      expect(items[0].quality).toBe(example.items[0].quality);
    });
  });

  it("items undefined", function () {
    const gildedRose = new Shop(undefined);
    const items = gildedRose.updateQuality();
    expect(items.length).toBe(0);
  });
});
