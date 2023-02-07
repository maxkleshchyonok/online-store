import MainPage from '../main';
import CatalogPage from '../catalog';
import Page from '../../core/templates/page';
import CartPage from '../cart';
import Header from '../../core/components/header';
import ProductPage from '../product-page';
// import Footer from '../../core/components/footer';
import { loadParameters, parametersObj } from '../../core/components/parameters';
// import createProductCard from '../../core/components/product_card/product_card';
import productsJSON from '../../assets/json/products.json';
import Product from '../../core/components/product/product';
import ErrorPage from '../error/error';

const products: Product[] = productsJSON;
const productsId: string[] = [];
products.forEach((product) => {
  productsId.push(`product-page/${product.id}`);
});

export const PageIds: { [props: string]: string | string[] } = {
  MainPageId: 'main-page',
  CatalogPageId:'catalog-page',
  CartPageId: 'cart-page',
  ErrorPage: 'error-page',
  ProductPageId: productsId,
};

class App {
  static container: HTMLElement | null = document.getElementById('content');

  static defaultPageId = 'catalog-page';

  private initialPage: MainPage;

  private header: Header;

  // private footer: Footer;

  // previousPage: string[] = [];
  previousPage = '';

  public renderNewPage(idPage: string) {
    const currentPageHTML = document.getElementById(App.defaultPageId);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }
    let page: Page | null = null;
    if (idPage === PageIds.MainPageId) {
      page = new MainPage(idPage);
    } else if (idPage === PageIds.CatalogPageId) {
      page = new CatalogPage(idPage);
    } else if (idPage === PageIds.CartPageId) {
      page = new CartPage(idPage);
    } else if (PageIds.ProductPageId.includes(idPage)) {
      const id = Number(idPage.replace(/[\D]+/g, ''));
      const product = products.find((el) => el.id === id);
      if (product) {
        parametersObj(product.short);
        // saveParameters();
        page = new ProductPage(idPage);
      } else {
        page = new ErrorPage(idPage, '404');
      }
    } else {
      page = new ErrorPage(idPage, '404');
    }

    if (page) {
      this.previousPage = window.location.hash.slice(1);
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageId;
      App.container?.append(pageHTML);
    }
  }

  private enableRouteChange() {
    const loadPage = () => {
      const hash = window.location.hash.slice(1);
      loadParameters();
      if (!hash) {
        window.location.hash = 'main-page';
      }
      if (!hash.includes('?')) {
        this.renderNewPage(hash);
      } else {
        if (this.previousPage.slice(0, hash.indexOf('?')) === hash.slice(0, hash.indexOf('?'))) {
          setTimeout(() => {}, 1);
        } else {
          this.renderNewPage(`${hash.slice(0, hash.indexOf('?'))}`);
        }
      }

    };
    window.addEventListener('hashchange', () => {
      if (window.location.hash.includes('?') && !this.previousPage[this.previousPage.length - 1].includes('catalog')) {
        this.renderNewPage('catalog-page');
      } else
        loadPage();
    });
    window.addEventListener('load', () => {
      loadPage();
    });
  }


  constructor() {
    this.header = new Header('header', 'header-container');
    this.initialPage = new MainPage('main-page');
    // this.footer = new Footer('footer', 'footer-container');
  }

  run() {
    App.container?.append(this.header.render());
    this.renderNewPage('main-page');
    window.location.hash = PageIds.MainPageId as string;
    this.enableRouteChange();
    // App.container?.append(this.footer.render());
  }
}

export default App;
