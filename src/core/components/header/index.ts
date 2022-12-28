import Component from '../../templates/components';
import { PageIds } from '../../../pages/app';

const Buttons = [
  {
    id: PageIds.MainPageId,
    text: 'Main',
  },
  {
    id: PageIds.CatalogPageId,
    text: 'Katalog',
  },
  {
    id: PageIds.CartPageId,
    text: 'Cart',
  },
];

const HeaderInfo = [
  {
    id: 'location',
    text: 'MAZOWIECKIE',
    img: '../../assets/img/elements/location.svg',
  },
  {
    id: 'email',
    text: 'info@palletport.pl',
    img: '../../assets/img/elements/mail.svg',
  },
  {
    id: 'phone',
    text: '+48666666666',
    img: '../../assets/img/elements/phone.svg',
  },
  {
    id: 'konto',
    text: 'Twoje konto',
    img: '../../assets/img/elements/konto-arrow.svg',
  },
];

class Header extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }


  private renderHeaderInfo(): void {
    const containerInfo = document.createElement('div');
    containerInfo.className = 'header-info';
    HeaderInfo.forEach(item => {
      const infoItem = document.createElement('div');
      const infoItemImg = document.createElement('img');
      const infoItemA = document.createElement('a');
      infoItem.className = `info-item ${item.id}`;
      infoItem.id = item.id;
      infoItemImg.src = item.img;
      infoItemA.href = '#';
      infoItemA.innerText = item.text;
      infoItem.append(infoItemImg, infoItemA);
      containerInfo.append(infoItem);
    });
    this.container.append(containerInfo);
  }

  // private renderHeaderMain(): void {
  //   const containerMain = document.createElement('div');
  //   containerMain.className = 'header-main';
  //   Buttons.forEach( button => {
  //     const buttonHTML = document.createElement('a');
  //     buttonHTML.href = `#${button.id}`;
  //     buttonHTML.id = button.id;
  //     // if (buttonHTML.id === 'main-page') {
  //     //   buttonHTML.append(logo);
  //     // }
  //     buttonHTML.innerText = button.text;
  //     containerMain.append(buttonHTML);
  //   });
  //   this.container.append(containerMain);
  // }

  private renderHeaderMain(): void {
    const containerMain = document.createElement('div');
    const logoBlock = document.createElement('a');
    const logo = document.createElement('img');
    const catalogBlock = document.createElement('a');
    const catalogImg = document.createElement('img');
    const catalogText = document.createElement('p');
    const cartBlock = document.createElement('a');

    logoBlock.id = Buttons[0].id;
    logoBlock.href = `#${Buttons[0].id}`;
    logo.src = '../../assets/img/elements/palletport_logo_small.svg';
    containerMain.className = 'header-main';

    catalogBlock.href = `#${Buttons[1].id}`;
    catalogBlock.className = 'catalog-block';
    catalogImg.src = '../../assets/img/elements/catalog.svg';
    catalogText.innerText = Buttons[1].text;
    catalogText.className = 'catalog-block-text';
    catalogBlock.append(catalogImg, catalogText);

    cartBlock.innerText = Buttons[2].text;
    cartBlock.href = `#${Buttons[2].id}`;
    cartBlock.className = 'cart-block';

    logoBlock.append(logo);
    containerMain.append(logoBlock, catalogBlock, cartBlock);
    this.container.append(containerMain);
  }

  render(): HTMLElement {
    this.renderHeaderInfo();
    this.renderHeaderMain();
    return this.container;
  }
}

export default Header;
