import MainPage from '../main';
import CatalogPage from '../catalog';
import Page from '../../core/templates/page';
import CartPage from '../cart';
import Header from '../../core/components/header';

export const enum PageIds {
  MainPageId = 'main-page',
  CatalogPageId = 'catalog-page',
  CartPageId = 'cart-page',
}

class App {
  private static container: HTMLElement | null = document.getElementById('content');

  private static defaultPageId = 'current-page';

  private initialPage: MainPage;

  private header: Header;

  static renderNewPage(idPage: string) {
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

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageId;
      App.container?.append(pageHTML);
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  constructor() {
    this.header = new Header('header', 'header-container');
    this.initialPage = new MainPage('main-page');
  }

  run() {
    App.container?.append(this.header.render());
    App.renderNewPage('main-page');
    window.location.hash = PageIds.MainPageId;
    this.enableRouteChange();
  }
}

export default App;
