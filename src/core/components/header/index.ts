import Component from '../../templates/components';
import { HeaderInfo, ImagesEnum } from '../consts/consts';
import Product from '../product/product';
import productsJSON from '../../../assets/json/products.json';
import { parameters, parametersObj, saveParameters } from '../parameters';


const Buttons = [
  {
    id: 'main-page',
    text: 'Main',
  },
  {
    id: 'catalog-page',
    text: 'Katalog',
  },
  {
    id: 'cart-page',
    text: 'Cart',
  },
];



class Header extends Component {

  public priceNum: number | undefined = 0;

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


  public renderHeaderMain(): void {
    const containerMain = document.createElement('div');

    const logoBlock = document.createElement('a');
    const logo = document.createElement('img');

    const catalogBlock = document.createElement('a');
    const catalogImg = document.createElement('img');
    const catalogText = document.createElement('p');

    const cartBlock = document.createElement('a');
    const cartImg = document.createElement('img');
    const cartPrice = document.createElement('p');

    const sales = document.createElement('a');

    const searchBlock = document.createElement('div');
    const searchInput = document.createElement('input');
    const searchButton = document.createElement('button');

    const likeBlock = document.createElement('a');
    const likeImg = document.createElement('img');

    logoBlock.id = Buttons[0].id as string;
    logoBlock.href = `#${Buttons[0].id}`;
    logoBlock.className = 'logo-block';
    logo.src = '../../assets/img/elements/palletport_logo_small.svg';
    containerMain.className = 'header-main';

    catalogBlock.href = `#${Buttons[1].id}`;
    catalogBlock.className = 'catalog-block';
    catalogImg.src = ImagesEnum.catalodSVG;
    catalogText.innerText = Buttons[1].text;
    catalogText.className = 'catalog-block-text';
    catalogBlock.append(catalogImg, catalogText);

    sales.innerText = 'Wyprzedaż';
    sales.href = '#';
    sales.className = 'wyprzedaz';

    searchInput.type = 'text';
    if (parameters.get('search'))
      searchInput.value = parameters.get('search') as string;
    else
      searchInput.placeholder = 'Wpisz nazwę towaru';
    searchInput.className = 'input-field';
    searchButton.innerText = 'Szukaj';
    searchButton.className = 'input-button';
    searchBlock.className = 'search';
    searchBlock.append(searchInput, searchButton);

    window.addEventListener('hashchange', () => {
      if (parameters.get('search') === '')
        searchInput.value = '';
    });

    searchInput.addEventListener('input', () => {
      this.searchFilter(searchInput.value);
    });

    likeImg.src = ImagesEnum.likeSVG;
    likeImg.className = 'like-image';
    likeBlock.append(likeImg);
    likeBlock.className = 'like-block';
    likeBlock.href = '#';

    const arr: Product [] = [];
    for (let i = 0; i < productsJSON.length; i += 1) {
      if (localStorage.getItem(productsJSON[i].short) !== null) {
        arr.push(productsJSON[i]);
      }
    }
    for (let i = 0; i < arr.length; i += 1) {
      const amountOfItems = localStorage.getItem(arr[i].short) as string;
      if (typeof this.priceNum !== 'undefined') {
        this.priceNum += arr[i].price * parseInt(amountOfItems);
      }
    }
    // cartBlock.innerText = Buttons[2].text;
    cartImg.src = ImagesEnum.cartSVG;
    cartPrice.innerText = `${this.priceNum} zl (${arr.length})`;
    cartPrice.className = 'cart-price';
    cartBlock.href = `#${Buttons[2].id}`;
    cartBlock.className = 'cart-block';
    cartBlock.append(cartImg, cartPrice);

    logoBlock.append(logo);
    containerMain.append(logoBlock, catalogBlock, sales, searchBlock, likeBlock, cartBlock);
    this.container.append(containerMain);
  }

  searchFilter(string: string): void {
    parameters.set('search', string);
    window.location.hash = parameters ? `catalog-page?${parameters.toString()}` : 'catalog-page';
    parametersObj();
    saveParameters();
  }

  render(): HTMLElement {
    this.renderHeaderInfo();
    this.renderHeaderMain();
    return this.container;
  }
}

export default Header;
