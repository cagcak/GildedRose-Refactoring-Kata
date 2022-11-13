import { GildedRose } from '@/gilded-rose';
import { Goods } from '@/goods.enum';
import { Item } from '@/item';

describe('Gilded Rose', () => {
  let mockItems: Item[];
  let gildedRose: GildedRose;

  beforeAll(() => {
    mockItems = [
      new Item(Goods.DEXTERITY_VEST, 0, 0),
      new Item(Goods.DEXTERITY_VEST, 10, 20),
      new Item(Goods.AGED_BRIE, 2, 0),
      new Item(Goods.ELIXIR_OF_THE_MONGOOSE, 5, 7),
      new Item(Goods.SULFURAS, 0, 80),
      new Item(Goods.SULFURAS, -1, 80),
      new Item(Goods.BACKSTAGE_PASSES, 15, 20),
      new Item(Goods.BACKSTAGE_PASSES, 10, 49),
      new Item(Goods.BACKSTAGE_PASSES, 5, 49),
      new Item(Goods.CONJURED, 3, 6),
    ];
  });

  beforeEach(() => {
    gildedRose = new GildedRose(mockItems);
  });

  it('should decreases sell-in date but quality cannot be negative', () => {
    const currentGildedRose = new GildedRose([
      new Item(Goods.DEXTERITY_VEST, 0, 0),
    ]);
    const items = currentGildedRose.updateQuality();

    expect(items[0]).toMatchObject(new Item(Goods.DEXTERITY_VEST, -1, 0));
  });

  it('should decreases quality', () => {
    const currentGildedRose = new GildedRose([
      new Item(Goods.DEXTERITY_VEST, 10, 10),
    ]);
    const items = currentGildedRose.updateQuality();

    expect(items[0]).toMatchObject(new Item(Goods.DEXTERITY_VEST, 9, 9));
  });

  it('should decreases quality faster after sell-in date expired', () => {
    const currentGildedRose = new GildedRose([
      new Item(Goods.DEXTERITY_VEST, 0, 10),
    ]);
    const items = currentGildedRose.updateQuality();

    expect(items[0]).toMatchObject(new Item(Goods.DEXTERITY_VEST, -1, 8));
  });

  describe('Standard item', () => {
    it('should set a good sample for selling', () => {
      const currentGildedRose = new GildedRose([
        new Item(Goods.DEXTERITY_VEST, 0, 0),
      ]);
      const items = currentGildedRose.updateQuality();

      expect(items[0].name).toBe(Goods.DEXTERITY_VEST);
    });

    it('should be ensure that quality cannot be negative when sell-In date decreases', () => {
      const currentGildedRose = new GildedRose([
        new Item(Goods.DEXTERITY_VEST, 0, 0),
      ]);
      const items = currentGildedRose.updateQuality();

      expect(items[0]).toMatchObject(new Item(Goods.DEXTERITY_VEST, -1, 0));
      expect(items[0].quality).not.toBeLessThan(0);
    });

    it('should decrease quality', () => {
      const currentGildedRose = new GildedRose([
        new Item(Goods.DEXTERITY_VEST, 10, 10),
      ]);
      const items = currentGildedRose.updateQuality();

      expect(items[0]).toMatchObject(new Item(Goods.DEXTERITY_VEST, 9, 9));
    });

    it('should check quality decreases faster after sell-in date expired', () => {
      const currentGildedRose = new GildedRose([
        new Item(Goods.DEXTERITY_VEST, 0, 10),
      ]);
      const items = currentGildedRose.updateQuality();

      expect(items[0]).toMatchObject(new Item(Goods.DEXTERITY_VEST, -1, 8));
    });
  });

  describe('Aged Brie', () => {
    it('should be ensure item "Aged Brie" increases in quality', () => {
      const currentGildedRose = new GildedRose([
        new Item(Goods.AGED_BRIE, 2, 2),
      ]);
      const items = currentGildedRose.updateQuality();

      expect(items[0]).toMatchObject(new Item(Goods.AGED_BRIE, 1, 3));
    });

    it('should doubles quality when item "Aged Brie" off', () => {
      const currentGildedRose = new GildedRose([
        new Item(Goods.AGED_BRIE, 0, 2),
      ]);
      const items = currentGildedRose.updateQuality();

      expect(items[0]).toMatchObject(new Item(Goods.AGED_BRIE, -1, 4));
    });

    it('should be ensure item "Aged Brie" cannot go over max value in quality', () => {
      const currentGildedRose = new GildedRose([
        new Item(Goods.AGED_BRIE, 2, 50),
      ]);
      const items = currentGildedRose.updateQuality();

      expect(items[0]).toMatchObject(new Item(Goods.AGED_BRIE, 1, 50));
    });
  });

  describe('Sulfuras', () => {
    it('should be ensure sulfuras item never changes', () => {
      const currentGildedRose = new GildedRose([
        new Item(Goods.SULFURAS, 100, 100),
      ]);
      const items = currentGildedRose.updateQuality();

      expect(items[0]).toMatchObject(new Item(Goods.SULFURAS, 100, 100));
    });
  });

  describe('Backstage Passes', () => {
    it('should increases by 1 outside 10 days for item "Backstage Passes" in quality', () => {
      const currentGildedRose = new GildedRose([
        new Item(Goods.BACKSTAGE_PASSES, 20, 2),
      ]);
      const items = currentGildedRose.updateQuality();

      expect(items[0]).toMatchObject(new Item(Goods.BACKSTAGE_PASSES, 19, 3));
    });

    it('should increases by 2 inside 10 days for item "Backstage Passes" in quality', () => {
      const currentGildedRose = new GildedRose([
        new Item(Goods.BACKSTAGE_PASSES, 10, 2),
      ]);
      const items = currentGildedRose.updateQuality();

      expect(items[0]).toMatchObject(new Item(Goods.BACKSTAGE_PASSES, 9, 4));
    });

    it('should increases by 3 inside 5 days for item "Backstage Passes" in quality', () => {
      const currentGildedRose = new GildedRose([
        new Item(Goods.BACKSTAGE_PASSES, 5, 2),
      ]);
      const items = currentGildedRose.updateQuality();

      expect(items[0]).toMatchObject(new Item(Goods.BACKSTAGE_PASSES, 4, 5));
    });

    it('should sets to 0 when sell-in expires for item "Backstage Passes" in quality', () => {
      const currentGildedRose = new GildedRose([
        new Item(Goods.BACKSTAGE_PASSES, 0, 20),
      ]);
      const items = currentGildedRose.updateQuality();

      expect(items[0]).toMatchObject(new Item(Goods.BACKSTAGE_PASSES, -1, 0));
    });
  });

  describe('Conjured', () => {
    it('should decreases twice by the speed in quality', () => {
      const currentGildedRose = new GildedRose([
        new Item(Goods.CONJURED, 3, 6),
      ]);
      const items = currentGildedRose.updateQuality();

      expect(items[0]).toMatchObject(new Item(Goods.CONJURED, 2, 4));
    });

    it('should decreases twice by the speed in quality when sell-in expires', () => {
      const currentGildedRose = new GildedRose([
        new Item(Goods.CONJURED, 0, 6),
      ]);
      const items = currentGildedRose.updateQuality();

      expect(items[0]).toMatchObject(new Item(Goods.CONJURED, -1, 2));
    });
  });
});
