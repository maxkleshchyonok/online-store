import { INITIAL_STATE } from '../types/types';

const hash = window.location.hash.slice(1);

export let parameters = new URLSearchParams(hash.includes('?') ? hash.slice(hash.indexOf('?') + 1) : '');

export const parametersObj = (clear?: string) => {

  let category = [];
  let price = [];

  if (!clear) {
    category = parameters.getAll('category').join().split(',');
    const priceStr = parameters.getAll('price').join('-').split('-');
    price = [parseInt(priceStr[0]), parseInt(priceStr[1])];
  } else {
    parameters.set('category', INITIAL_STATE.category.join(','));
    parameters.set('price', INITIAL_STATE.price.join('-'));
    category = INITIAL_STATE.category;
    price = INITIAL_STATE.price;
  }
  console.log('Reset!');
  return  {
    category: category,
    price: price,
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