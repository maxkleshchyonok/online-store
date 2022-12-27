import Product from '../product/product';
import productsJSON from '../../../assets/json/products.json';
import './product_card.scss';

const createProductCard: (product: Product, container: HTMLElement, i: number) => void = (product, container, i) => {

  function createElement(tag: string, tagClass: string): void {
    const el = document.createElement(tag);
    el.classList.add(tagClass);
    container.append(el);
  }

  createElement('div', 'product__image');
  // createElement('image', 'product__image');
  createElement('div', 'product__name');
  createElement('div', 'product__length');
  createElement('div', 'product__width');
  createElement('div', 'product__load');
  createElement('div', 'product__quantity');
  createElement('button', 'product__button');

  const image = container.querySelector('.product__image') as HTMLDivElement;
  // const image = container.querySelector('.product__image') as HTMLImageElement;
  const name = container.querySelector('.product__name') as HTMLSpanElement;
  const length = container.querySelector('.product__length') as HTMLSpanElement;
  const width = container.querySelector('.product__width') as HTMLSpanElement;
  const load = container.querySelector('.product__load') as HTMLSpanElement;
  const quantity = container.querySelector('.product__quantity') as HTMLSpanElement;
  const button = container.querySelector('.product__button') as HTMLButtonElement;

  // image.setAttribute('src', 'static/' + `${product.short}` + '.jpg');
  // image.setAttribute('alt', product.name);
  name.textContent = product.name;
  length.textContent = `${product.length} mm`;
  width.textContent = `${product.width} mm`;
  load.textContent = `${product.load} kg`;
  quantity.textContent = `${product.quantity} szt.`;
  button.textContent = `${product.price} zł.`;
};

export default createProductCard;