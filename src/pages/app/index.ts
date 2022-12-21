import MainPage from "../main";
import CatalogPage from "../catalog";
import Page from "../../core/templates/page";
import BucketPage from "../bucket";
import Header from "../../core/components/header";

export const enum PageIds {
    MainPage = 'main-page',
    CatalogPage = 'catalog-page',
    BucketPage = 'bucket-page',
}

class App {
    private static container: HTMLElement = document.body;
    private static defaultPageId: string = 'current-page'
    private initialPage: MainPage;
    private header: Header;

    static renderNewPage(idPage: string) {
        const currentPageHTML = document.getElementById(App.defaultPageId);
        if (currentPageHTML) {
            currentPageHTML.remove();
        }
        let page: Page | null = null;

        if (idPage === PageIds.MainPage) {
            page = new MainPage(idPage);
        } else if (idPage === PageIds.CatalogPage) {
            page = new CatalogPage(idPage);
        } else if (idPage === PageIds.BucketPage) {
            page = new BucketPage(idPage);
        }

        if (page) {
            const pageHTML = page.render();
            pageHTML.id = App.defaultPageId;
            App.container.append(pageHTML);
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

    run () {
        App.container.append(this.header.render());
        App.renderNewPage('bucket-page');
        this.enableRouteChange();
    }
}

export default App;
