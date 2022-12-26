import Component from '../../templates/components';
import { PageIds } from '../../../pages/app';

export const headerModule = document.querySelector('#body')

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
    text: 'Bucket',
  },
];

class Header extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderPageButtons() {
    const pageButtons = document.createElement('div');
    Buttons.forEach( button => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerText = button.text;
      pageButtons.append(buttonHTML);
    });
    this.container.append(pageButtons);
  }

  render(): HTMLElement {

    this.renderPageButtons();
    return this.container;
  }
}

export default Header;
