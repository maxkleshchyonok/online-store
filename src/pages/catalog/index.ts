import Page from '../../core/templates/page';
import createProductCard from '../../core/components/product_card/product_card';
import Product from '../../core/components/product/product';
import productsJSON from '../../assets/json/products.json';
import './index.scss';
import Filters from '../../core/components/filters/filters';
import { SortEnum } from '../../core/types/types';
import Footer from '../../core/components/footer';

const PaletRange = ['Wszystkie', 'Europalety', 'Jednorazowe', 'Nowe', 'Używane',
  'Wyprzedaż', 'Półpalety', 'Plastikowe'];

class CatalogPage extends Page {
  private filters: Filters;

  private footer: Footer;

  static TextObject = {
    MainTitle: 'Catalog Page',
  };

  constructor(id: string) {
    super(id);
    this.filters = new Filters('section', 'filters');
    this.footer = new Footer('footer', 'footer-container');
  }

  drawProductsCards(catalogSection: HTMLElement) {
    if (this.filters.categoryCheckboxes) {
      this.filters.categoryCheckboxes.forEach(x => {
        x.addEventListener('change', () => {
          catalogSection.innerHTML = '';
          for (let i = 0; i < 20; i++) {
            const productData = productsJSON[i];
            if (this.filters.category.find(y=> y === productData.category)) {
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
          }
        });
      });
    }
  }



  private renderCatalogTop(): void {
    const content = document.createElement('div');

    const contentPages = document.createElement('div');
    const mainPage = document.createElement('a');
    const currentPage = document.createElement('p');

    const topInfo = document.createElement('div');

    const catalogAmount = document.createElement('div');
    const catalogAmountTitle = document.createElement('h2');
    const catalogAmountNumber = document.createElement('p');

    topInfo.className = 'catalog-top-info';

    catalogAmountTitle.className = 'catalog-amount-title';
    catalogAmountTitle.innerText = 'Katalog';
    catalogAmountNumber.className = 'catalog-amount-number';
    catalogAmountNumber.innerText = `${productsJSON.length.toString()} towarów`;
    catalogAmount.className = 'catalog-amount';
    catalogAmount.append(catalogAmountTitle, catalogAmountNumber);

    content.className = 'catalog-nav';
    contentPages.className = 'pages-nav';
    mainPage.className = 'nav-mainpage';
    currentPage.className = 'nav-currentpage';

    mainPage.innerText = 'Strona główna •';
    mainPage.href = '/#main-page';
    currentPage.innerText = 'Katalog';

    const catalogSortBlock = document.createElement('div');
    const sortBlockTitle = document.createElement('h3');
    const sort = document.createElement('a');
    const sortList = document.createElement('ul');

    catalogSortBlock.className = 'catalog-sort-block';
    sortBlockTitle.className = 'sort-block-title';
    sort.className = 'sort-choose-click';
    sortList.className = 'choose-list';

    // sort.innerText = 'Sortuj według...';

    const sortPlacehold = document.createElement('div');
    const placeholdImg = document.createElement('img');
    const placeHoldText = document.createElement('p');
    const placeHoldTextArrow = document.createElement('img');

    sortPlacehold.className = 'sort-placeholder';
    placeholdImg.className = 'placeholder-img';
    placeHoldText.className = 'placeholder-text';

    placeholdImg.src = '../../assets/img/elements/sort-icon.svg';
    placeHoldTextArrow.src = '../../assets/img/elements/arrow-down.svg';
    placeHoldText.innerText = 'Sortuj według...';
    sortPlacehold.append(placeholdImg, placeHoldText, placeHoldTextArrow);
    sort.append(sortPlacehold);

    sortBlockTitle.innerText = 'Sortuj:';

    for (let i = 0; i < 5; i += 1) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      switch (i) {
        case 0:
          a.innerText = SortEnum.DEFAULT;
          a.href = '#';
          li.append(a);
          sortList.append(li);
          break;
        case 1:
          a.innerText = SortEnum.NAME;
          a.href = '#';
          li.append(a);
          sortList.append(li);
          break;
        case 2:
          a.innerText = SortEnum.NAME_REVERSED;
          a.href = '#';
          li.append(a);
          sortList.append(li);
          break;
        case 3:
          a.innerText = SortEnum.PRICE_UP;
          a.href = '#';
          li.append(a);
          sortList.append(li);
          break;
        case 4:
          a.innerText = SortEnum.PRICE_DOWN;
          a.href = '#';
          li.append(a);
          sortList.append(li);
          break;
      }
    }

    const paletTypeNav = document.createElement('div');
    paletTypeNav.className = 'palet-types-block';
    for (let i = 0; i < PaletRange.length; i += 1) {
      const item = document.createElement('div');
      item.innerText = PaletRange[i];
      item.className = 'types-item';
      paletTypeNav.append(item);
    }

    sort.addEventListener('click', () => {
      sortList.classList.toggle('active');
    });
    sort.append(sortList);
    catalogSortBlock.append(sortBlockTitle, sort);
    topInfo.append(catalogAmount, catalogSortBlock);
    contentPages.append(mainPage, currentPage);
    content.append(contentPages, topInfo, paletTypeNav);
    this.container.append(content);
  }

  private renderFilterBlock(): void {

  }


  render() {
    this.renderCatalogTop();

    this.createElementHTML('div', 'catalog__wrapper', this.container);
    const catalogWrapper = this.container.querySelector('.catalog__wrapper');
    this.createElementHTML('section', 'filters__section', catalogWrapper as HTMLElement);
    const filtersSection = this.container.querySelector('.filters__section') as HTMLElement;
    this.createElementHTML('section', 'catalog__section', catalogWrapper as HTMLElement);
    const catalogSection = this.container.querySelector('.catalog__section') as HTMLElement;

    filtersSection.append(this.filters.render());

    this.drawProductsCards(catalogSection);
    this.container.append(this.footer.render());
    return this.container;
  }
}



export default CatalogPage;
