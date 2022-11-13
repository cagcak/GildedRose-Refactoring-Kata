import { Goods } from '@/goods.enum';
import { Item } from '@/item';

describe('Item', () => {
  let item: Item;

  it('should set a good as item', () => {
    item = new Item(Goods.ELIXIR_OF_THE_MONGOOSE, 0, 0);

    expect(item).toBeInstanceOf(Item);
    expect(item.name).toBe(Goods.ELIXIR_OF_THE_MONGOOSE);
    expect(item.sellIn).toBe(0);
    expect(item.quality).toBe(0);
  });
});
