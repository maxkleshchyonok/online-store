import Page from '../../core/templates/page';
import Footer from '../../core/components/footer';
import './index.scss';
// import { parameters } from '../../core/components/parameters';
import productsJSON from '../../assets/json/products.json';

class ProductPage extends Page {

  private footer: Footer;

  private itemId: string | null;

  static TextObject = {
    MainTitle: 'Product page',
  };

  constructor(id: string, itemId: string | null) {
    super(id);
    this.footer = new Footer('footer', 'footer-container');
    this.itemId = itemId;
  }

  private renderProductBlock(): void {
    const productBlock = document.createElement('div');
    productBlock.className = 'product-block';

    const photosBlock = document.createElement('div');
    const bigPhoto = document.createElement('div');
    const descriptionBlock = document.createElement('div');
    photosBlock.className = 'photos-block';
    bigPhoto.className = 'big-photo';
    descriptionBlock.className = 'description-block';

    const bigPhotoImg = document.createElement('img');
    bigPhotoImg.src = '../../assets/img/products/palety_euro/euro_nowe_1.jpg';
    bigPhoto.append(bigPhotoImg);

    for (let i = 0; i < 4; i += 1) {
      const item = document.createElement('img');
      item.addEventListener('click', () => {
        bigPhotoImg.src = item.src;
      });
      photosBlock.append(item);
      switch (i) {
        // case 0:
        //   item.src = '../../assets/img/elements/arrow-right.svg';
        //   item.className = 'arrow-up';
        //   break;
        case 1:
          item.src = '../../assets/img/products/palety_euro/euro_nowe_1.jpg';
          item.className = 'photos-item';
          break;
        case 2:
          item.src = '../../assets/img/products/palety_euro/euro_nowe_2.jpg';
          item.className = 'photos-item';
          break;
        // case 3:
        //   item.src = '../../assets/img/elements/arrow-right.svg';
        //   item.className = 'arrow-down';
        //   break;
      }
    }

    const nameTitle = document.createElement('h1');
    const buttonsBlock = document.createElement('div');
    const priceBlock = document.createElement('h2');
    const buyButton = document.createElement('button');
    const likeButton = document.createElement('button');
    const like = document.createElement('img');
    const itemDescription = document.createElement('p');
    const infoBlock = document.createElement('div');
    const split = document.createElement('img');

    nameTitle.className = 'product-name';
    buttonsBlock.className = 'buttons-block';
    buyButton.className = 'buttons-buy';
    likeButton.className = 'buttons-like';
    priceBlock.className = 'price';
    itemDescription.className = 'product-description';
    infoBlock.className = 'product-info';
    split.className = 'splitter';

    nameTitle.textContent = productsJSON[0].name;
    priceBlock.textContent = `${productsJSON[0].price.toString()} zl`;
    buyButton.innerText = 'Dodaj do koszyka';
    like.src = '../../assets/img/elements/like.svg';
    likeButton.append(like);
    split.src = '../../assets/img/elements/split-horizontal.svg';
    itemDescription.textContent = productsJSON[0].info;

    const width = document.createElement('h3');
    const length = document.createElement('h3');
    const height = document.createElement('h3');
    const load = document.createElement('h3');
    const condition = document.createElement('h3');
    const material = document.createElement('h3');
    const quantity = document.createElement('h3');

    width.className = 'info-item';
    length.className = 'info-item';
    height.className = 'info-item';
    load.className = 'info-item';
    condition.className = 'info-item';
    material.className = 'info-item';
    quantity.className = 'info-item';

    width.textContent = `Width: ${productsJSON[0].width}`;
    length.textContent = `Length: ${productsJSON[0].length}`;
    height.textContent = `Height: ${productsJSON[0].height}`;
    load.textContent = `Load: ${productsJSON[0].load}`;
    condition.textContent = `Condition: ${productsJSON[0].condition}`;
    material.textContent = `Material: ${productsJSON[0].material}`;
    quantity.textContent = `Quantity: ${productsJSON[0].quantity}`;


    buttonsBlock.append(priceBlock, buyButton, likeButton);
    infoBlock.append(width, length, height, load, condition, material, quantity);
    descriptionBlock.append(nameTitle, buttonsBlock, split, itemDescription, infoBlock);
    productBlock.append(photosBlock, bigPhoto, descriptionBlock);
    this.container.append(productBlock);
  }

  render(): HTMLElement {
    // const title = this.createHeaderTitle(ProductPage.TextObject.MainTitle);
    // this.renderTest();
    this.renderProductBlock();
    this.container.append(this.footer.render());
    return this.container;
  }
}

export default ProductPage;
