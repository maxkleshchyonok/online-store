import Product from '../product';
import productsJSON from '../../../assets/json/products.json';

const createProductCard: (product: Product, container: HTMLElement, i: number) => void = (product, container, i) => {
  const image = container.querySelector('.product__image') as HTMLImageElement;
  const name = container.querySelector('.product__name') as HTMLSpanElement;
  const length = container.querySelector('.product__length') as HTMLSpanElement;
  const width = container.querySelector('.product__width') as HTMLSpanElement;
  const load = container.querySelector('.product__load') as HTMLSpanElement;
  const quantity = container.querySelector('.product__quantity') as HTMLSpanElement;
  const button = container.querySelector('.product__button') as HTMLButtonElement;

  // image.setAttribute('src', product.image1);
  // image.setAttribute('alt', `${product.name}`);
  name.textContent = product.name;
  // length.textContent = `${product.length} mm`;
  // width.textContent = `${product.width} mm`;
  // load.textContent = `${product.load} kg`;
  // quantity.textContent = `${product.quantity} szt.`;
  // button.textContent = `${product.price} zł.`;
};

export default createProductCard;