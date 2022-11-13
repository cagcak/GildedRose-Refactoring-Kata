import { Goods } from './goods.enum';
import { Item } from './item';

export class GildedRose {
  items: Item[];

  constructor(items: Item[] = []) {
    this.items = items;
  }

  isValidItem(item: Item): boolean {
    if (item instanceof Object && Object.keys(item).length === 3) return true;

    return false;
  }

  isValidItemQualityRange(quality: number): boolean {
    if (isNaN(quality)) return false;

    return quality >= 0 && quality <= 50;
  }

  getDegradeRate(item: Item, isExpired: boolean): number {
    const baseDegradeRate = item.name === Goods.CONJURED ? -2 : -1;

    return isExpired ? baseDegradeRate * 2 : baseDegradeRate;
  }

  getReConfiguredQuality(item: Item, adjustment: number): Item {
    const newQuality = item.quality + adjustment;

    if (!this.isValidItemQualityRange(newQuality)) {
      return item;
    }

    return { ...item, quality: newQuality };
  }

  updateQuality() {
    this.items = this.items.map(this.getUpdatedItemQuality.bind(this));

    return this.items;
  }

  getUpdatedItemQuality(currentItem: Item) {
    if (!this.isValidItem(currentItem)) {
      throw new Error('Not a valid item. Aborting..');
    }

    let item = currentItem;

    const isExpired = item.sellIn < 1;
    const degradeRate = this.getDegradeRate(item, isExpired);
    const degradables = [
      Goods.AGED_BRIE,
      Goods.SULFURAS,
      Goods.BACKSTAGE_PASSES,
    ];
    const doesDegrade = !degradables.includes(item.name);
    const hasItSellByDate = item.name !== Goods.SULFURAS;

    if (doesDegrade) {
      item = this.getReConfiguredQuality(item, degradeRate);
    }

    if (item.name === Goods.AGED_BRIE) {
      const adjustment = isExpired ? 2 : 1;
      item = this.getReConfiguredQuality(item, adjustment);
    }

    if (item.name === Goods.BACKSTAGE_PASSES) {
      item = this.getBackstageQuality(item, isExpired);
    }

    if (hasItSellByDate) {
      item.sellIn = item.sellIn - 1;
    }

    return item;
  }

  getBackstageQuality(currentItem: Item, isExpired: boolean): Item {
    let item = this.getReConfiguredQuality(currentItem, 1);

    if (item.sellIn < 11) {
      item = this.getReConfiguredQuality(item, 1);
    }

    if (item.sellIn < 6) {
      item = this.getReConfiguredQuality(item, 1);
    }

    if (isExpired) {
      item.quality = item.quality - item.quality;
    }

    return item;
  }
}
