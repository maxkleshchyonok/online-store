import MainPage from '../main';
import CatalogPage from '../catalog';
import Page from '../../core/templates/page';
import CartPage from '../cart';
import Header from '../../core/components/header';
// import ProductPage from '../product-page';
// import Footer from '../../core/components/footer';
import { parameters } from '../../core/components/parameters';
// import createProductCard from '../../core/components/product_card/product_card';


export const enum PageIds {
  MainPageId = 'main-page',
  CatalogPageId = 'catalog-page',
  CartPageId = 'cart-page',
  ProductPageId = 'product-page',
}

class App {
  static container: HTMLElement | null = document.getElementById('content');

  static defaultPageId = 'current-page';

  private initialPage: MainPage;

  private header: Header;

  // private footer: Footer;

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
    }
    // } else if (idPage === PageIds.ProductPageId) {
    //   page = new ProductPage(idPage);
    // }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageId;
      this.previousPage = window.location.hash.slice(1);
      App.container?.append(pageHTML);
    }
  }

  private enableRouteChange() {
    const loadPage = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) {
        window.location.hash = 'main-page';
      }
      if (!hash.includes('?')) {
        this.renderNewPage(hash);
      } else {
        window.location.hash = parameters ? `catalog-page?${parameters.toString()}` : 'catalog-page';
      }
    };
    window.addEventListener('hashchange', loadPage);
    window.addEventListener('load', loadPage);
  }


  constructor() {
    this.header = new Header('header', 'header-container');
    this.initialPage = new MainPage('main-page');
    // this.footer = new Footer('footer', 'footer-container');
  }

  run() {
    App.container?.append(this.header.render());
    this.renderNewPage('catalog-page');
    window.location.hash = PageIds.CatalogPageId;
    this.enableRouteChange();
    // App.container?.append(this.footer.render());
  }
}

export default App;
