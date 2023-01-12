import Page from '../../core/templates/page';
import Footer from '../../core/components/footer';
import productsJSON from '../../assets/json/products.json';
import Product from '../../core/components/product/product';
import './index.scss';

class CartPage extends Page {

  public priceNum: number | undefined;

  private footer: Footer;

  static TextObject = {
    MainTitle: 'Twój koszyk',
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
    const arr: Product [] = [];
    // let priceNum = 0;
    this.priceNum = 0;

    for (let i = 0; i < productsJSON.length; i += 1) {
      if (localStorage.getItem(productsJSON[i].short) !== null) {
        arr.push(productsJSON[i]);
      }
    }

    for (let i = 0; i < arr.length; i += 1) {
      const amountOfItems = localStorage.getItem(arr[i].short) as string;
      this.priceNum += arr[i].price * parseInt(amountOfItems);
      localStorage.setItem('cartTotal', `${this.priceNum}`);
      localStorage.setItem('cartNum', `${arr.length}`);
    }
    const price = document.createElement('h3');
    for (let i = 0; i < arr.length; i += 1) {
      const orderCard = document.createElement('div');
      orderCard.className = `${arr[i].short}`;
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
        localStorage.removeItem(arr[i].short);
        const delItem = document.querySelector(`.${arr[i].short}`) as HTMLElement;
        delItem.remove();

      });
      deleteBlock.append(deleteItem);

      orderCard.classList.add('order-card');
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
        if (numberNum > 1) {
          numberNum -= 1;
          number.textContent = `${numberNum}`;
          localStorage.setItem(`${arr[i].short}`, `${numberNum}`);
          fullPrice.textContent = `${arr[i].price * numberNum} zl`;
          if (typeof this.priceNum !== 'undefined') {
            this.priceNum -= arr[i].price;
          }
          price.textContent = `${this.priceNum} zl`;
        }
      });
      plus.addEventListener('click', () => {
        numberNum += 1;
        number.textContent = `${numberNum}`;
        localStorage.setItem(`${arr[i].short}`, `${numberNum}`);
        fullPrice.textContent = `${arr[i].price * numberNum} zl`;
        if (typeof this.priceNum !== 'undefined') {
          this.priceNum += arr[i].price;
          if (numberNum > arr[i].quantity) {
            numberNum = arr[i].quantity;
          }
        }
        price.textContent = `${this.priceNum} zl`;
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
    submit.className = 'submit-button';
    submit.disabled = true;
    const thank = document.createElement('h2');


    formInputName.addEventListener('input', () => {
      const reg = /^[а-яА-ЯёЁa-zA-Z]{3,} [а-яА-ЯёЁa-zA-Z]{3,}$/gm;
      if (!formInputName.value.match(reg)) {
        formInputName.classList.add('invalid');
      }
      if (formInputName.value.match(reg)) {
        formInputName.classList.remove('invalid');
      }
    });

    formInputPhone.addEventListener('input', () => {
      const reg = /^(\+)((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/gm;
      if (!formInputPhone.value.match(reg)) {
        formInputPhone.classList.add('invalid');
      }
      if (formInputPhone.value.match(reg)) {
        formInputPhone.classList.remove('invalid');
      }
    });

    formInputAddress.addEventListener('input', () => {
      const reg = /^[а-яА-ЯёЁa-zA-Z]{5,} [а-яА-ЯёЁa-zA-Z]{5,} [а-яА-ЯёЁa-zA-Z]{5,}$/gm;
      if (!formInputAddress.value.match(reg)) {
        formInputAddress.classList.add('invalid');
      }
      if (formInputAddress.value.match(reg)) {
        formInputAddress.classList.remove('invalid');
      }
    });

    formInputEmail.addEventListener('input', () => {
      const reg = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/gm;
      if (!formInputEmail.value.match(reg)) {
        formInputEmail.classList.add('invalid');
      }
      if (formInputEmail.value.match(reg)) {
        formInputEmail.classList.remove('invalid');
      }
    });

    const creditCard = document.createElement('div');
    const cardImage = document.createElement('img');
    const cardNumber = document.createElement('input');
    const mm = document.createElement('input');
    const dd = document.createElement('input');
    const cardCVV = document.createElement('input');


    creditCard.className = 'credit-card';
    cardImage.className = 'card-img';
    cardNumber.className = 'card-number';
    mm.className = 'card-mm';
    dd.className = 'card-dd';
    cardCVV.className = 'card-cvv';

    cardImage.src = '../../assets/img/elements/money.png';
    cardNumber.placeholder = 'Numer karty';
    mm.placeholder = 'MM';
    dd.placeholder = 'YY';
    cardCVV.placeholder = 'cvv';

    mm.maxLength = 2;
    dd.maxLength = 2;
    mm.addEventListener('input', () => {
      const reg = /[0-12]{2}/gm;
      if (!mm.value.match(reg)) {
        mm.classList.add('invalid');
        dd.classList.add('invalid');
      }
      if (mm.value.match(reg)) {
        mm.classList.remove('invalid');
        dd.classList.remove('invalid');
      }
    });
    dd.addEventListener('input', () => {
      const reg = /[0-99]{2}/gm;
      if (!dd.value.match(reg)) {
        mm.classList.add('invalid');
        dd.classList.add('invalid');
      }
      if (dd.value.match(reg)) {
        dd.classList.remove('invalid');
        mm.classList.remove('invalid');
      }
    });

    let test;
    cardNumber.maxLength = 16;
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
      const reg = /[0-9]{16}/gm;
      if (!cardNumber.value.match(reg)) {
        cardNumber.classList.add('invalid');
      }
      if (cardNumber.value.match(reg)) {
        cardNumber.classList.remove('invalid');
      }
    });
    cardCVV.minLength = 3;
    cardCVV.maxLength = 3;
    cardCVV.addEventListener('input', () => {
      const reg = /[0-9]{3}/gm;
      if (!cardCVV.value.match(reg)) {
        cardCVV.classList.add('invalid');
      }
      if (cardCVV.value.match(reg)) {
        cardCVV.classList.remove('invalid');
        submit.disabled = false;
      }
    });

    creditCard.append(cardImage, cardNumber, mm, dd, cardCVV);

    popup.className = 'popUp';
    popClose.className = 'closeBtn';
    form.className = 'holder';
    formInputName.className = 'Name';

    thank.className = 'thanks';

    formTitle.textContent = 'Dane osobiste';
    popClose.textContent = 'X';
    submit.textContent = 'Wysłać';
    thank.textContent = 'Dziękuję Ci!';
    formInputName.placeholder = 'Wprowadź imię';
    formInputPhone.placeholder = 'Wpisz telefon';
    formInputAddress.placeholder = 'Podaj adres';
    formInputEmail.placeholder = 'Wprowadź e-mail';


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

    buyTitle.textContent = 'O porządku';

    amount.textContent = `Zamówienia(${arr.length})`;
    price.textContent = `${this.priceNum} zl`;

    discountTitle.textContent = 'Zniżki:';
    discountNumber.textContent = '';

    promocodeInput.addEventListener('input', () => {
      if (promocodeInput.value === 'RS') {
        this.priceNum! *= 0.8;
        price.textContent = `${this.priceNum} zl`;
        discountTitle.textContent = 'Zniżki: (RS)';
        discountNumber.textContent = `${this.priceNum! * 0.2} zl`;
      }
      if (promocodeInput.value === 'EPAM') {
        this.priceNum! *= 0.8;
        price.textContent = `${this.priceNum} zl`;
        discountTitle.textContent += '(EPAM)';
        discountNumber.textContent += ` ${this.priceNum! * 0.2} zl`;
      }
    });

    deliveryTitle.textContent = 'Cena dostawy:';
    deliveryAmount.textContent = 'Bezpłatny';

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
