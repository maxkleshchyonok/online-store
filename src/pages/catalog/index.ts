import Page from '../../core/templates/page';
import createProductCard from '../../core/components/product_card/product_card';
import Product from '../../core/components/product/product';
import productsJSON from '../../assets/json/products.json';
import './index.scss';



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

    this.createElementHTML('div', 'catalog__wrapper', this.container);
    const catalogWrapper = this.container.querySelector('.catalog__wrapper');
    this.createElementHTML('section', 'filters__section', catalogWrapper as HTMLElement);
    const filtersSection = this.container.querySelector('.filters__section') as HTMLElement;
    this.createElementHTML('section', 'catalog__section', catalogWrapper as HTMLElement);
    const catalogSection = this.container.querySelector('.catalog__section') as HTMLElement;

    filtersSection.textContent = 'FILTERS FILTERS FILTERS FILTERS';

    for (let i = 0; i < 20; i++) {
      const productData = productsJSON[i];
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

      const card = document.createElement('div');
      card.classList.add('product__card');
      createProductCard(product, card, i);
      catalogSection.append(card);
    }
    return this.container;
  }
}



export default CatalogPage;
