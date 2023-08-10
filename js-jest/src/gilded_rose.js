class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}
class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    for (const item of this.items) {
      this.updateByItemName(item);
    }
    return this.items;
  }

  // 其实sellIn和阈值的处理都可以放到updateByItemName里面，但是为了函数可读性和函数功能整体性，还是分开写了
  updateByItemName(item) {
    switch (item.name) {
      case "Aged Brie":
        this.updateBrie(item);
        break;
      case "Backstage passes to a TAFKAL80ETC concert":
        this.updateBackstage(item);
        break;
      case "Sulfuras, Hand of Ragnaros":
        // this.updateSulfuras(item);
        break;
      case "Conjured":
        this.updateConjured(item);
        break;
      default:
        this.updateGeneral(item);
        break;
    }
  }

  updateGeneral(item) {
    item.sellIn = item.sellIn - 1;
    item.quality = item.sellIn < 0 ? item.quality - 2 : item.quality - 1;
    item.quality = item.quality < 0 ? 0 : item.quality;
  }

  updateBrie(item) {
    item.sellIn = item.sellIn - 1;
    item.quality = item.sellIn < 0 ? item.quality + 2 : item.quality + 1;
    item.quality = item.quality > 50 ? 50 : item.quality;
  }

  updateBackstage(item) {
    item.sellIn = item.sellIn - 1;
    if (item.sellIn < 0) {
      item.quality = 0;
      return;
    }
    item.quality =
      item.sellIn < 6
        ? item.quality + 3
        : item.sellIn < 11
        ? item.quality + 2
        : item.quality + 1;
    item.quality = item.quality > 50 ? 50 : item.quality;
  }

  // updateSulfuras(item) {}

  updateConjured(item) {
    item.sellIn = item.sellIn - 1;
    item.quality = item.quality - 2;
    item.quality = item.quality < 0 ? 0 : item.quality;
  }
}

module.exports = {
  Item,
  Shop,
};
