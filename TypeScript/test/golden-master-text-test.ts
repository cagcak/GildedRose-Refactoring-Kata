import { GildedRose } from '@/gilded-rose';
import { Goods } from '@/goods.enum';
import { Item } from '@/item';

const items = [
  new Item(Goods.DEXTERITY_VEST, 10, 20), //
  new Item(Goods.AGED_BRIE, 2, 0), //
  new Item(Goods.ELIXIR_OF_THE_MONGOOSE, 5, 7), //
  new Item(Goods.SULFURAS, 0, 80), //
  new Item(Goods.SULFURAS, -1, 80),
  new Item(Goods.BACKSTAGE_PASSES, 15, 20),
  new Item(Goods.BACKSTAGE_PASSES, 10, 49),
  new Item(Goods.BACKSTAGE_PASSES, 5, 49),
  // this conjured item does not work properly yet
  new Item(Goods.CONJURED, 3, 6),
];

const gildedRose = new GildedRose(items);

let days: number = 2;
if (process.argv.length > 2) {
  days = +process.argv[2];
}

for (let i = 0; i < days; i++) {
  console.log('-------- day ' + i + ' --------');
  console.log('name, sellIn, quality');
  items.forEach((element) => {
    console.log(element.name + ' ' + element.sellIn + ' ' + element.quality);
  });
  console.log();
  // gildedRose._updateQuality();
  gildedRose.updateQuality();
}
