import ProductType from '../types/types';

export default class Product {
  constructor(
    public id: ProductType['id'],
    public short: ProductType['short'],
    public name: ProductType['name'],
    public category: ProductType['category'],
    public condition: ProductType['condition'],
    public material: ProductType['material'],
    public length: ProductType['length'],
    public width: ProductType['width'],
    public height: ProductType['height'],
    public load: ProductType['load'],
    public image1: ProductType['image1'],
    public image2: ProductType['image2'],
    public info: ProductType['info'],
    public price: ProductType['price'],
    public quantity: ProductType['quantity'],
  ) {}
}