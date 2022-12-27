import Component from '../../templates/components';
import { PageIds } from '../../../pages/app';

const Buttons = [
  {
    id: PageIds.MainPageId,
    text: 'Main Page',
  },
  {
    id: PageIds.CatalogPageId,
    text: 'Catalog',
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
    img: '../../../img/elements/location.svg',
  },
  {
    id: 'email',
    text: 'info@palletport.pl',
    img: '../../../img/elements/location.svg',
  },
  {
    id: 'phone',
    text: '+48666666666',
    img: '../../../img/elements/location.svg',
  },
  {
    id: 'cart',
    text: 'Twoje konto',
    img: '../../../img/elements/location.svg',
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
      infoItemImg.src = './location.svg';
      infoItemA.href = '#';
      infoItemA.innerText = item.text;
      infoItem.append(infoItemImg, infoItemA);
      containerInfo.append(infoItem);
    });
    this.container.append(containerInfo);
  }

  private renderHeaderMain(): void {
    const containerMain = document.createElement('div');
    containerMain.className = 'header-main';
    Buttons.forEach( button => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerText = button.text;
      containerMain.append(buttonHTML);
    });
    this.container.append(containerMain);
  }

  render(): HTMLElement {
    this.renderHeaderInfo();
    this.renderHeaderMain();
    return this.container;
  }
}

export default Header;
