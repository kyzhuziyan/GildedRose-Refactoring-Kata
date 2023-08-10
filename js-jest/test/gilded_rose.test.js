const { Shop, Item } = require("../src/gilded_rose");

const getExamples = () => {
  const name_lst = [
    "foo",
    "Aged Brie",
    "Backstage passes to a TAFKAL80ETC concert",
    "Conjured",
  ];
  const sell_in_lst = [-1, 0, 1, 5, 10, 15, 2];
  const quality_lst = [0, 1, 5, 10, 15, 49, 50];

  const examples = name_lst
    .map((name) =>
      sell_in_lst.map((sell_in) =>
        quality_lst.map((quality) => {
          const itemArgs = new Item(name, sell_in, quality);
          return itemArgs;
        })
      )
    )
    .flat(2);
  return [
    ...examples,
    new Item("Sulfuras, Hand of Ragnaros", 0, 80),
    new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    new Item("Sulfuras, Hand of Ragnaros", 10, 80),
    undefined,
  ];
};

describe("snapshot test", function () {
  const examples = getExamples();
  const output = [];
  examples.forEach((example) => {
    it("items", function () {
      const gildedRose = new Shop(example ? [example] : undefined);
      const items = gildedRose.updateQuality();
      output.push([...items]);
    });
  });
  expect(output).toMatchSnapshot();

  it("snapshot test", () => {
    expect(output).toMatchSnapshot();
  });
});
