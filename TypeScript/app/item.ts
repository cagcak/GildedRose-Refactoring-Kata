import { Goods } from './goods.enum';

export class Item {
  name: Goods;
  sellIn: number;
  quality: number;

  constructor(name: Goods, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}
