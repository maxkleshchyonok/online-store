import Page from '../../core/templates/page';
import Footer from '../../core/components/footer';
import './index.scss';
// import { parameters } from '../../core/components/parameters';
import productsJSON from '../../assets/json/products.json';
import { parametersObj } from '../../core/components/parameters';

class ProductPage extends Page {

  private shortName: string | undefined;

  private nameValue: string | undefined;

  private priceValue: number | undefined;

  private descriptionValue: string | undefined;

  private widthValue: number | undefined;

  private lengthValue: number | undefined;

  private heightValue: number | undefined;

  private conditionValue: string | undefined;

  private quantityValue: number | undefined;

  private loadValue: number | undefined;

  private materialValue: string | undefined;

  private image1: string | undefined;

  private image2: string | undefined;

  private footer: Footer;

  static TextObject = {
    MainTitle: 'Product page',
  };

  constructor(id: string) {
    super(id);
    this.footer = new Footer('footer', 'footer-container');
  }

  private renderProductBlock(): void {
    for (const item of productsJSON) {
      if (item.short === parametersObj().short[0]) {
        this.nameValue = item.name;
        this.priceValue = item.price;
        this.descriptionValue = item.info;
        this.widthValue = item.width;
        this.lengthValue = item.length;
        this.heightValue = item.height;
        this.conditionValue = item.condition;
        this.quantityValue = item.quantity;
        this.loadValue = item.load;
        this.materialValue = item.material;
        this.image1 = item.image1;
        this.image2 = item.image2;
        this.shortName = item.short;
      }
    }

    const productBlock = document.createElement('div');
    productBlock.className = 'product-block';

    const photosBlock = document.createElement('div');
    const bigPhoto = document.createElement('div');
    const descriptionBlock = document.createElement('div');
    photosBlock.className = 'photos-block';
    bigPhoto.className = 'big-photo';
    descriptionBlock.className = 'description-block';

    const bigPhotoImg = document.createElement('img');
    if (typeof this.image1 === 'string') {
      bigPhotoImg.src = this.image1;
    }
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
          if (typeof this.image1 === 'string') {
            item.src = this.image1;
          }
          item.className = 'photos-item';
          break;
        case 2:
          if (typeof this.image2 === 'string') {
            item.src = this.image2;
          }
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
    const amountButton = document.createElement('div');
    let number = 1;

    nameTitle.className = 'product-name';
    buttonsBlock.className = 'buttons-block';
    buyButton.className = 'buttons-buy';
    likeButton.className = 'buttons-like';
    priceBlock.className = 'price';
    itemDescription.className = 'product-description';
    infoBlock.className = 'product-info';
    split.className = 'splitter';

    if (typeof this.nameValue === 'string') {
      nameTitle.textContent = this.nameValue;
    }
    priceBlock.textContent = `${this.priceValue} zl`;
    buyButton.innerText = 'Dodaj do koszyka';
    buyButton.addEventListener('click', () => {
      amountButton.classList.add('activated');
      localStorage.setItem(`${this.shortName}`, `${number}`);
    });

    const minus = document.createElement('div');
    const plus = document.createElement('div');
    const numberBlock = document.createElement('div');
    const infoNumber = document.createElement('h3');
    const infoTitle = document.createElement('p');

    minus.className = 'button-minus';
    plus.className = 'button-plus';
    numberBlock.className = 'button-info-block';
    infoNumber.className = 'info-number';
    infoTitle.className = 'info-title';
    amountButton.className = 'amount-buttons';

    infoTitle.textContent = 'W koszyku';
    infoNumber.textContent = `${number}`;
    minus.textContent = '-';
    plus.textContent = '+';
    minus.addEventListener('click', () => {
      number -= 1;
      infoNumber.textContent = `${number}`;
      localStorage.setItem(`${this.shortName}`, `${number}`);
    });
    plus.addEventListener('click', () => {
      number += 1;
      infoNumber.textContent = `${number}`;
      localStorage.setItem(`${this.shortName}`, `${number}`);
    });

    numberBlock.append(infoNumber, infoTitle);
    amountButton.append(minus, numberBlock, plus);

    like.src = '../../assets/img/elements/like.svg';
    likeButton.append(like);
    split.src = '../../assets/img/elements/split-horizontal.svg';
    if (typeof this.descriptionValue === 'string') {
      itemDescription.textContent = this.descriptionValue;
    }

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

    width.textContent = `Width: ${this.widthValue}`;
    length.textContent = `Length: ${this.lengthValue}`;
    height.textContent = `Height: ${this.heightValue}`;
    load.textContent = `Load: ${this.loadValue}`;
    condition.textContent = `Condition: ${this.conditionValue}`;
    material.textContent = `Material: ${this.materialValue}`;
    quantity.textContent = `Quantity: ${this.quantityValue}`;


    buttonsBlock.append(priceBlock, buyButton, likeButton);
    infoBlock.append(width, length, height, load, condition, material, quantity);
    descriptionBlock.append(nameTitle, buttonsBlock, amountButton, split, itemDescription, infoBlock);
    productBlock.append(photosBlock, bigPhoto, descriptionBlock);
    this.container.append(productBlock);
  }

  render(): HTMLElement {
    this.renderProductBlock();
    this.container.append(this.footer.render());
    return this.container;
  }
}

export default ProductPage;
