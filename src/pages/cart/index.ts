import Page from '../../core/templates/page';
import Footer from '../../core/components/footer';

class CartPage extends Page {

  private footer: Footer;

  static TextObject = {
    MainTitle: 'Cart page',
  };

  constructor(id: string) {
    super(id);
    this.footer = new Footer('footer', 'footer-container');
  }

  render(): HTMLElement {
    const title = this.createHeaderTitle(CartPage.TextObject.MainTitle);
    this.container.append(title);
    this.container.append(this.footer.render());
    return this.container;
  }
}

export default CartPage;
