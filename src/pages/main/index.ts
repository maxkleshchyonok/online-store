import Page from '../../core/templates/page';
import Footer from '../../core/components/footer';

const CatalogMain = [
  {
    title: 'Palety Euro EPAL 1200*800',
    description: 'nowe',
  },
  {
    title: 'Palety Euro EPAL 1200*800',
    description: 'I gatunek używane',
  },
  {
    title: 'Palety Euro EPAL 1200*800',
    description: 'II gatunek używane',
  },
  {
    title: 'Palety typu EURO 1200*800',
    description: 'nowe',
  },
  {
    title: 'Palety typu EURO 1200*800',
    description: 'I gatunek używane',
  },
  {
    title: 'Palety typu EURO 1200*800',
    description: 'II gatunek używane',
  },
  {
    title: 'Palety typu EURO 1200*800',
    description: 'III gatunek używane',
  },
  {
    title: 'Palety jednorazowe 1200*800',
    description: 'nowe',
  },
  {
    title: 'Palety jednorazowe 1200*800',
    description: 'I gatunek używane',
  },
  {
    title: 'Palety jednorazowe 1200*800',
    description: 'II gatunek używane',
  },
  {
    title: 'Palety przemysłowe 1200*1000',
    description: 'nowe',
  },
  {
    title: 'Palety przemysłowe 1200*1000',
    description: 'używane',
  },
  {
    title: 'Palety przemysłowe 1200*1200',
    description: 'nowe',
  },
  {
    title: 'Palety przemysłowe 1200*1200',
    description: 'używane',
  },
  {
    title: 'Palety przemysłowe 80*60',
    description: 'nowe',
  },
  {
    title: 'Palety przemysłowe 80*60',
    description: 'używane',
  },
  {
    title: 'Palety inne',
    description: '',
  },
];

const PaletyMain = [
  {
    title: 'Palety EURO',
    description: '3 rodzaje',
    img: '../../assets/img/palety/palet-euro.png',
    class: 'up-left',
  },
  {
    title: 'Palety jednorazowe',
    description: '5 rodzaje',
    img: '../../assets/img/palety/palet-jed.png',
    class: 'down-left',
  },
  {
    title: 'Nadstawki',
    description: '1 rodzaj',
    img: '../../assets/img/palety/nadst.png',
    class: 'center',
  },
  {
    title: 'Półpalety',
    description: '3 rodzaje',
    img: '../../assets/img/palety/polpalet.png',
    class: 'up-right',
  },
  {
    title: 'Palety plastikowe',
    description: '5 rodzaje',
    img: '../../assets/img/palety/pal-plast.png',
    class: 'down-right',
  },
];

class MainPage extends Page {

  private footer: Footer;

  static TextObject = {
    MainTitle: 'Main page111',
  };

  constructor(id: string) {
    super(id);
    this.footer = new Footer('footer', 'footer-container');
  }

  private renderCatalog(): void {
    const catalogBlock = document.createElement('div');
    catalogBlock.className = 'catalog-bar';

    const catalogTitle = document.createElement('h2');

    const catalogList = document.createElement('div');
    catalogList.className = 'catalog-list';

    CatalogMain.forEach((el) => {
      const catalogListItem = document.createElement('a');
      const itemBlock = document.createElement('div');
      const itemTitle = document.createElement('h3');
      const itemDesc = document.createElement('h3');
      itemTitle.innerText = el.title;
      itemDesc.innerText = el.description;
      itemBlock.append(itemTitle, itemDesc);
      itemBlock.className = 'item-block';
      catalogListItem.append(itemBlock);
      catalogListItem.href = '#';
      catalogListItem.className = 'catalog-item';
      catalogList.append(catalogListItem);
    });
    catalogTitle.innerText = 'Katalog';
    catalogTitle.className = 'catalog-title';
    catalogBlock.append(catalogTitle, catalogList);
    // this.container.className = 'main-page';
    this.container.append(catalogBlock);
  }

  private renderMainBody(): void {
    const mainBody = document.createElement('div');
    const mainBodyHead = document.createElement('div');
    const headImg = document.createElement('img');
    const headTitle = document.createElement('h1');
    const headDescr = document.createElement('h2');
    const headButton = document.createElement('button');

    mainBody.className = 'main-body';
    mainBodyHead.className = 'body-head';
    headImg.className = 'head-img';
    headTitle.className = 'body-title';
    headDescr.className = 'body-description';
    headButton.className = 'body-button';

    headTitle.innerText = 'Zamów palety latwiej\n (szybciej, taniej) niż kiedyś';
    headDescr.innerText = 'Tu usprawnisz procesy zakupu i\n wymiany palet. Dzięki naszej systemie\n zjednoczenia' +
        ' logistycznych kierunków\n możesz się nie martwić o niewystarczających\n ilości palet u obecnego dostawcy.' +
        ' Dopasujemy\n zamówienie zgodnie ze twoimi potrzebami na czas.';
    headButton.innerText = 'SPROBUJĘ!';
    headImg.src = '../../assets/img/elements/main-pallet.png';

    mainBodyHead.append(headTitle, headDescr, headButton);
    mainBody.append(headImg, mainBodyHead);
    this.container.append(mainBody);
  }

  private renderPaletMenu(): void {
    const palety = document.createElement('div');
    palety.className = 'palety';

    PaletyMain.forEach((el) => {
      const paletItem = document.createElement('div');
      const paletInfo = document.createElement('div');
      const paletTitle = document.createElement('h3');
      const paletDescript = document.createElement('h4');
      const paletImg = document.createElement('img');

      paletItem.className = 'palet-item';
      paletInfo.className = 'item-info';
      paletTitle.className = 'item-title';
      paletDescript.className = 'item-descript';
      paletImg.className = 'item-img';

      paletItem.classList.add(el.class);
      if (el.title === 'Nadstawki') {
        paletImg.classList.add('center-image');
      }

      paletImg.src = el.img;
      paletTitle.innerText = el.title;
      paletDescript.innerText = el.description;
      paletInfo.append(paletTitle, paletDescript);
      paletItem.append(paletInfo, paletImg);
      palety.append(paletItem);
    });
    this.container.append(palety);
  }

  render() {
    // const title = this.createHeaderTitle(MainPage.TextObject.MainTitle);
    // this.container.append(title);
    this.renderCatalog();
    this.renderMainBody();
    this.renderPaletMenu();
    this.container.classList.add('main-page-styles');
    this.container.append(this.footer.render());
    return this.container;
  }
}

export default MainPage;
