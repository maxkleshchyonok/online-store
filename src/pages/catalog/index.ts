import Page from '../../core/templates/page';
import createProductCard from '../../core/components/product_card/product_card';
import Product from '../../core/components/product';
import productsJSON from '../../assets/json/products.json';

const productData = productsJSON[0];
const product = new Product(productData.id,
                            productData.short,
                            productData.name,
                            productData.category,
                            productData.condition,
                            productData.material,
                            productData.length,
                            productData.width,
                            productData.height,
                            productData.load,
                            productData.image1,
                            productData.image2,
                            productData.info,
                            productData.price,
                            productData.quantity);


class CatalogPage extends Page {
  static TextObject = {
    MainTitle: 'Catalog Page',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(CatalogPage.TextObject.MainTitle);
    this.container.append(title);

    const card = document.createElement('div');
    card.classList.add('product__card');
    const cardName = document.createElement('span');
    cardName.classList.add('product__name');
    card.append(cardName);
    this.container.append(card);


    createProductCard(product, card, 0);

    return this.container;
  }
}



export default CatalogPage;
