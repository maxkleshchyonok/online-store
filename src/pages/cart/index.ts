import Page from '../../core/templates/page';
import Footer from '../../core/components/footer';
import productsJSON from '../../assets/json/products.json';
import './index.scss';

class CartPage extends Page {

  private footer: Footer;

  static TextObject = {
    MainTitle: 'Koszyk na zakupy',
  };

  constructor(id: string) {
    super(id);
    this.footer = new Footer('footer', 'footer-container');
  }

  private renderTitle(): void {
    const title = this.createHeaderTitle(CartPage.TextObject.MainTitle);
    title.className = 'page-top';
    this.container.append(title);
  }

  private renderItemsBlock(): void {
    const orderContainer = document.createElement('div');
    orderContainer.className = 'order-container';
    const cardsBlock = document.createElement('div');
    cardsBlock.className = 'order-items';
    // const keys = localStorage.getItem('plastik_1');
    const arr = [];
    for (let i = 0; i < productsJSON.length; i += 1) {
      if (localStorage.getItem(productsJSON[i].short) !== null) {
        arr.push(productsJSON[i]);
      }
    }
    for (let i = 0; i < arr.length; i += 1) {
      const orderCard = document.createElement('div');
      const image = document.createElement('img');

      const info = document.createElement('div');
      const title = document.createElement('h1');
      const amountOnStore = document.createElement('p');

      const chooseAmountBlock = document.createElement('div');
      const chooseBlock = document.createElement('div');
      const minus = document.createElement('div');
      const number = document.createElement('h2');
      const plus = document.createElement('div');
      const singlePrice = document.createElement('h3');

      const fullPrice = document.createElement('h1');

      orderCard.className = 'order-card';
      title.className = 'card-title';
      image.className = 'card-image';
      info.className = 'order-info';
      amountOnStore.className = 'order-amount';
      chooseAmountBlock.className = 'choose-amount-block';
      chooseBlock.className = 'choose-block';
      minus.className = 'choose-minus';
      number.className = 'choose-number';
      plus.className = 'choose-plus';
      singlePrice.className = 'single-price';
      fullPrice.className = 'full-price';

      image.src = arr[i].image1;
      title.textContent = arr[i].name;
      amountOnStore.textContent = `W magazynie: ${arr[i].quantity}`;

      let numberNum = parseInt(localStorage.getItem(arr[i].short) as string);
      number.textContent = `${numberNum}`;
      minus.textContent = '-';
      plus.textContent = '+';
      minus.addEventListener('click', () => {
        numberNum -= 1;
        number.textContent = `${numberNum}`;
        // localStorage.setItem(`${arr[i].short}`, `${number}`);
      });
      plus.addEventListener('click', () => {
        numberNum += 1;
        number.textContent = `${numberNum}`;
        // localStorage.setItem(`${arr[i].short}`, `${number}`);
      });
      singlePrice.textContent = `${arr[i].price} zl / rzecz`;
      fullPrice.textContent = `${arr[i].price * numberNum} zl`;


      info.append(title, amountOnStore);
      chooseBlock.append(minus, number, plus);
      chooseAmountBlock.append(chooseBlock, singlePrice);
      orderCard.append(image, info, chooseAmountBlock, fullPrice);

      cardsBlock.append(orderCard);
    }

    const buyBlock = document.createElement('div');
    const buyTitle = document.createElement('div');
    const infoBlock = document.createElement('div');

    const orderAmountPrice = document.createElement('div');
    const amount = document.createElement('h3');
    const price = document.createElement('h3');

    const orderDiscount = document.createElement('div');
    const discountTitle = document.createElement('h3');
    const discountNumber = document.createElement('h3');

    const orderDelivery = document.createElement('div');
    const deliveryTitle = document.createElement('h3');
    const deliveryAmount = document.createElement('h3');

    const orderButton = document.createElement('button');

    buyBlock.className = 'buy-block';
    buyTitle.className = 'buy-title';
    infoBlock.className = 'buy-info';
    orderAmountPrice.className = 'buy-amount-price';
    amount.className = 'amount';
    price.className = 'price';
    orderDiscount.className = 'buy-discount';
    discountTitle.className = 'discount-title';
    discountNumber.className = 'discount-number';
    orderDelivery.className = 'buy-delivery';
    deliveryTitle.className = 'delivery-title';
    deliveryAmount.className = 'delivery-amount';
    orderButton.className = 'order-button';

    buyTitle.textContent = 'About order';

    amount.textContent = `Orders(${arr.length})`;
    let priceNum = 0;
    for (let i = 0; i < arr.length; i += 1) {
      const amountOfItems = localStorage.getItem(arr[i].short) as string;
      priceNum += arr[i].price * parseInt(amountOfItems);
    }
    price.textContent = `${priceNum} zl`;

    discountTitle.textContent = 'Discounts:';
    discountNumber.textContent = '123456';

    deliveryTitle.textContent = 'Delivery price:';
    deliveryAmount.textContent = 'Free';

    orderButton.innerText = 'Buy';

    orderAmountPrice.append(amount, price);
    orderDiscount.append(discountTitle, discountNumber);
    orderDelivery.append(deliveryTitle, deliveryAmount);
    infoBlock.append(orderAmountPrice, orderDiscount, orderDelivery);
    buyBlock.append(buyTitle, infoBlock, orderButton);
    orderContainer.append(cardsBlock, buyBlock);


    this.container.append(orderContainer);
  }

  render(): HTMLElement {
    this.renderTitle();
    this.renderItemsBlock();
    this.container.append(this.footer.render());
    return this.container;
  }
}

export default CartPage;
