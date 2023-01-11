import Page from '../../core/templates/page';
import createProductCard from '../../core/components/product_card/product_card';
import Product from '../../core/components/product/product';
import productsJSON from '../../assets/json/products.json';
import './index.scss';
import Filters from '../../core/components/filters/filters';
import { SortEnum } from '../../core/types/types';
import Footer from '../../core/components/footer';

import { parameters, parametersObj, saveParameters } from '../../core/components/parameters';
// import App from '../app';


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
    parameters.delete('name');
  }



  drawProductsCards(catalogSection: HTMLElement) {


    catalogSection.innerHTML = '';
    let arr = [...productsJSON].filter((el) => parametersObj().short.includes(el.short)
        && parametersObj().category.includes(el.category) && parametersObj().price[0] <= el.price
        && parametersObj().price[1] >= el.price && parametersObj().quantity[0] <= el.quantity
        && parametersObj().quantity[1] >= el.quantity && parametersObj().condition.includes(el.condition)
        && parametersObj().material.includes(el.material) && parametersObj().length[0] <= el.length
        && parametersObj().length[1] >= el.length && parametersObj().width[0] <= el.width
        && parametersObj().width[1] >= el.width && parametersObj().height[0] <= el.height
        && parametersObj().height[1] >= el.height && parametersObj().price[0] <= el.price
        && parametersObj().price[1] >= el.price
        && parametersObj().load[0] <= el.load && parametersObj().load[1] >= el.load);

    this.sortFilter(arr);
    arr = this.searchFilter(arr);

    for (let j = 0; j < arr.length; j += 1) {
      const productData = arr[j];
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
      createProductCard(product, card, j);
      catalogSection.append(card);
    }
  }

  private renderCatalogTop(): HTMLElement {
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

    window.addEventListener('hashchange', () => {
      const sum = document.querySelectorAll('.product__card');
      console.log(sum);
      if (sum) {
        catalogAmountNumber.innerText = !(sum[0])
          ? 'Teraz nie mamy dokładnie tego, czego szukasz.' : `${sum.length} towarów`;
      } else catalogAmountNumber.innerText = `${productsJSON.length.toString()} towarów`;
    });
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

    const sortPlacehold = document.createElement('div');
    const placeholdImg = document.createElement('img');
    const placeHoldText = document.createElement('p');
    const placeHoldTextArrow = document.createElement('img');

    sortPlacehold.className = 'sort-placeholder';
    placeholdImg.className = 'placeholder-img';
    placeHoldText.className = 'placeholder-text';

    placeholdImg.src = '../../assets/img/elements/sort-icon.svg';
    placeHoldTextArrow.src = '../../assets/img/elements/arrow-down.svg';
    placeHoldText.innerText = parametersObj().sort;
    sortPlacehold.append(placeholdImg, placeHoldText, placeHoldTextArrow);
    sort.append(sortPlacehold);

    sortBlockTitle.innerText = 'Sortuj:';

    function sortApply(sortStyle: string): void {
      placeHoldText.innerHTML = sortStyle;
      parameters.set('sort', sortStyle);
      window.location.hash = parameters ? `catalog-page?${parameters.toString()}` : 'catalog-page';
      parametersObj();
      saveParameters();
    }

    for (let i = 0; i < 5; i += 1) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      switch (i) {
        case 0:
          a.innerText = SortEnum.DEFAULT;
          a.addEventListener('click', () => {
            sortApply(a.innerText);
          });
          li.append(a);
          sortList.append(li);
          break;
        case 1:
          a.innerText = SortEnum.NAME;
          a.addEventListener('click', () => {
            sortApply(a.innerText);
          });
          li.append(a);
          sortList.append(li);
          break;
        case 2:
          a.innerText = SortEnum.NAME_REVERSED;
          a.addEventListener('click', () => {
            sortApply(a.innerText);
          });
          li.append(a);
          sortList.append(li);
          break;
        case 3:
          a.innerText = SortEnum.PRICE_UP;
          a.addEventListener('click', () => {
            sortApply(a.innerText);
          });
          li.append(a);
          sortList.append(li);
          break;
        case 4:
          a.innerText = SortEnum.PRICE_DOWN;
          a.addEventListener('click', () => {
            sortApply(a.innerText);
          });
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

    const paginationBlock = document.createElement('div');
    const amountBlock = document.createElement('div');
    const amountTitle = document.createElement('h3');
    const amountVariants = document.createElement('div');

    const pagesBlock = document.createElement('div');
    const arrowLeft = document.createElement('div');
    const pages = document.createElement('div');
    const arrowRight = document.createElement('div');
    const arrowLeftImg = document.createElement('img');
    const arrowRightImg = document.createElement('img');

    paginationBlock.className = 'pagination-block';
    amountBlock.className = 'amount-block';
    amountTitle.className = 'amount-title';
    amountVariants.className = 'amount-variants';
    pagesBlock.className = 'pages-block';
    arrowLeft.className = 'button-back';
    pages.className = 'pages';
    arrowRight.className = 'button-forward';

    amountTitle.innerText = 'Towarów na stronie';
    arrowRightImg.src = '../../assets/img/elements/arrow-right.svg';
    arrowLeftImg.src = '../../assets/img/elements/arrow-right.svg';
    for (let i = 0; i < 4; i += 1) {
      const amountItem = document.createElement('div');
      amountItem.className = 'amount-item';
      switch (i) {
        case 0:
          amountItem.innerText = '24';
          break;
        case 1:
          amountItem.innerText = '48';
          break;
        case 2:
          amountItem.innerText = '72';
          break;
        case 3:
          amountItem.innerText = '96';
          break;
      }
      amountVariants.append(amountItem);
    }
    for (let i = 0; i < 5; i += 1) {
      const pageNumber = document.createElement('div');
      pageNumber.innerText = `${i + 1}`;
      if (i === 3) {
        pageNumber.innerText = '...';
      }
      pageNumber.className = 'pages-item';
      pages.append(pageNumber);
    }
    amountBlock.append(amountTitle, amountVariants);
    arrowLeft.append(arrowLeftImg);
    arrowRight.append(arrowRightImg);
    pagesBlock.append(arrowLeft, pages, arrowRight);
    paginationBlock.append(amountBlock, pagesBlock);

    sort.addEventListener('click', () => {
      sortList.classList.toggle('active');
    });
    sort.append(sortList);
    catalogSortBlock.append(sortBlockTitle, sort);
    topInfo.append(catalogAmount, catalogSortBlock);
    contentPages.append(mainPage, currentPage);
    content.append(contentPages, topInfo, paletTypeNav, paginationBlock);
    // this.container.append(content);
    return content;
  }

  private renderFilterBlock(): void {

  }

  sortFilter(arr: Product[]) {
    let temp = [];

    switch (parametersObj().sort) {
      case SortEnum.DEFAULT:
        temp = arr.sort((a, b) => a.id - b.id);
        break;
      case SortEnum.NAME:
        temp = arr.sort((a, b) => a.load - b.load);
        break;
      case SortEnum.NAME_REVERSED:
        temp = arr.sort((a, b) => b.load - a.load);
        break;
      case SortEnum.PRICE_DOWN:
        temp = arr.sort((a, b) => b.price - a.price);
        break;
      case SortEnum.PRICE_UP:
        temp = arr.sort((a, b) => a.price - b.price);
        break;
      default:
        temp = arr.sort((a, b) => parseInt(a.category) - parseInt(b.category));
    }
    return temp;
  }

  searchFilter(arr: Product[]) {
    let temp = [];
    const searchString = parameters.get('search') as string;
    temp = arr.filter(el => el.info.toLowerCase().match(searchString.toLowerCase())
      || el.name.toLowerCase().match(searchString.toLowerCase())
      || el.material.toLowerCase().match(searchString.toLowerCase())
      || el.category.toLowerCase().match(searchString.toLowerCase())
      || el.condition.toLowerCase().match(searchString.toLowerCase())
      || el.price.toString().toLowerCase().match(searchString.toLowerCase())
      || el.load.toString().toLowerCase().match(searchString.toLowerCase())
      || el.quantity.toString().toLowerCase().match(searchString.toLowerCase())
      || el.width.toString().toLowerCase().match(searchString.toLowerCase())
      || el.height.toString().toLowerCase().match(searchString.toLowerCase())
      || el.length.toString().toLowerCase().match(searchString.toLowerCase()));
    return temp;
  }


  render() {
    // this.renderCatalogTop();

    this.createElementHTML('div', 'catalog__wrapper', this.container);
    const catalogWrapper = this.container.querySelector('.catalog__wrapper');

    catalogWrapper?.append(this.renderCatalogTop());

    this.createElementHTML('section', 'filters__section', this.container as HTMLElement);
    const filtersSection = this.container.querySelector('.filters__section') as HTMLElement;
    this.createElementHTML('section', 'catalog__section', catalogWrapper as HTMLElement);
    const catalogSection = this.container.querySelector('.catalog__section') as HTMLElement;

    filtersSection.append(this.filters.render());


    this.drawProductsCards(catalogSection);

    window.addEventListener('hashchange', () => {
      this.drawProductsCards(catalogSection);
    });


    this.container.append(this.footer.render());
    this.container.classList.add('catalog-page-styles');
    return this.container;
  }
}

export default CatalogPage;