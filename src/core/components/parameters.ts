import { INITIAL_STATE } from '../types/types';

const hash = window.location.hash.slice(1);

export let parameters = new URLSearchParams(hash.includes('?') ? hash.slice(hash.indexOf('?') + 1) : '');

export const parametersObj = (clear?: string) => {

  let category = [];
  let price = [];
  let quantity = [];

  if (!clear) {
    category = parameters.getAll('category').join().split(',');
    const priceStr = parameters.getAll('price').join('-').split('-');
    price = [parseInt(priceStr[0]), parseInt(priceStr[1])];
    quantity = parameters.getAll('quantity').join().split('-');
  } else {
    parameters.set('category', INITIAL_STATE.category.join(','));
    parameters.set('price', INITIAL_STATE.price.join('-'));
    parameters.set('quantity', INITIAL_STATE.quantity.join('-'));
    category = INITIAL_STATE.category;
    price = INITIAL_STATE.price;
    quantity = INITIAL_STATE.quantity;

    window.location.hash = 'catalog-page';
  }
  console.log('Reset!');
  return  {
    category: category,
    price: price,
    quantity: quantity,
  };
};

export function saveParameters() {
  localStorage.setItem('parameters', parameters.toString());
}

export function loadParameters() {
  const tempPar = localStorage.getItem('parameters') as string;
  if (tempPar) {
    const tempParams = new URLSearchParams(tempPar);
    parameters = tempParams;
  }
}