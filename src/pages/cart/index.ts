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
      const deleteBlock = document.createElement('div');
      const deleteItem = document.createElement('img');
      deleteItem.src = '../../assets/img/elements/delete.png';
      deleteBlock.className = 'delete-order';
      deleteBlock.addEventListener('click', () => {
        // localStorage.removeItem(`${arr[i].short}`);
      });
      deleteBlock.append(deleteItem);

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
      orderCard.append(image, info, chooseAmountBlock, fullPrice, deleteBlock);

      cardsBlock.append(orderCard);
    }

    const buyBlock = document.createElement('div');
    const buyTitle = document.createElement('div');
    const infoBlock = document.createElement('div');

    const customerBlock = document.createElement('div');
    const customerTitle = document.createElement('h2');
    const addressInput = document.createElement('input');
    const promocodeInput = document.createElement('input');

    customerBlock.className = 'customer-block';
    customerTitle.className = 'customer-title';
    addressInput.className = 'address-input';
    promocodeInput.className = 'promocode-input';

    customerTitle.textContent = 'Dane kupującego';
    addressInput.placeholder = 'Wpisz swój adres...';
    promocodeInput.placeholder = 'Wpisz swój kod promocyjny...';

    customerBlock.append(customerTitle, addressInput, promocodeInput);

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

    const popup = document.createElement('div');
    const popClose = document.createElement('button');
    const form = document.createElement('form');
    const formTitle = document.createElement('h1');
    const formInputName = document.createElement('input');
    const formInputPhone = document.createElement('input');
    const formInputAddress = document.createElement('input');
    const formInputEmail = document.createElement('input');
    const submit = document.createElement('button');
    const thank = document.createElement('h2');

    formInputName.addEventListener('input', () => {
      const reg = /^[a-z ,.'-]+$/i;
      if (formInputName.value.match(reg)) {
        console.log(formInputName.value);
      }
    });

    const creditCard = document.createElement('div');
    const cardImage = document.createElement('img');
    const cardNumber = document.createElement('input');
    const cardValid = document.createElement('input');
    const cardCVV = document.createElement('input');

    creditCard.className = 'credit-card';
    cardImage.className = 'card-img';
    cardNumber.className = 'card-number';
    cardValid.className = 'card-valid';
    cardCVV.className = 'card-cvv';

    cardImage.src = '../../assets/img/elements/money.png';
    cardNumber.placeholder = 'card number';
    cardValid.placeholder = 'valid to';
    cardCVV.placeholder = 'cvv';

    let test;
    cardNumber.maxLength = 16;
    cardNumber.minLength = 16;
    cardNumber.addEventListener('input', () => {
      test = cardNumber.value;
      if (test[0] === '3') {
        cardImage.src = '../../assets/img/elements/american.png';
      }
      if (test[0] === '4') {
        cardImage.src = '../../assets/img/elements/visa.png';
      }
      if (test[0] === '5') {
        cardImage.src = '../../assets/img/elements/master.png';
      }
    });
    cardCVV.minLength = 3;
    cardCVV.maxLength = 3;
    cardCVV.addEventListener('input', () => {
      const reg = /(10[0-9]|1[1-9]\d|[2-9]\d\d|1000)$/gm;
      if (cardCVV.value.match(reg) !== null) {
        console.log(cardCVV.value);
      }
    });

    creditCard.append(cardImage, cardNumber, cardValid, cardCVV);

    popup.className = 'popUp';
    popClose.className = 'closeBtn';
    form.className = 'holder';
    formInputName.className = 'Name';
    submit.className = 'submit-button';
    thank.className = 'thanks';

    formTitle.textContent = 'Personal details';
    popClose.textContent = 'X';
    submit.textContent = 'Submit';
    thank.textContent = 'Dziękuję Ci!';
    formInputName.placeholder = 'Enter name';
    formInputPhone.placeholder = 'Enter phone';
    formInputAddress.placeholder = 'enter address';
    formInputEmail.placeholder = 'enter email';

    form.append(formTitle, formInputName, formInputPhone,
      formInputAddress, formInputEmail, creditCard, submit);
    popup.append(popClose, form, thank);

    function closeForm() {
      popup.classList.remove('active');
      cardImage.src = '../../assets/img/elements/money.png';
    }
    function openForm() {
      popup.classList.add('active');
      form.classList.add('active');
    }
    function onSubmitForm() {
      thank.classList.add('active');
      form.classList.remove('active');
      setTimeout(() => {
        closeForm();
        thank.classList.remove('active');
        form.classList.add('active');
      }, 2000);
    }
    popClose.addEventListener('click', closeForm);
    submit.addEventListener('click', onSubmitForm);

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
    discountNumber.textContent = '-200 zl';

    deliveryTitle.textContent = 'Delivery price:';
    deliveryAmount.textContent = 'Free';

    orderButton.innerText = 'Idź do kasy';

    orderButton.addEventListener('click', openForm);

    orderAmountPrice.append(amount, price);
    orderDiscount.append(discountTitle, discountNumber);
    orderDelivery.append(deliveryTitle, deliveryAmount);
    infoBlock.append(orderAmountPrice, orderDiscount, orderDelivery);
    buyBlock.append(customerBlock, buyTitle, infoBlock, orderButton);
    orderContainer.append(cardsBlock, buyBlock, popup);


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
