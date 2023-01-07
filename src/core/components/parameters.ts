import { INITIAL_STATE } from '../types/types';

const hash = window.location.hash.slice(1);

export let parameters = new URLSearchParams(hash.includes('?') ? hash.slice(hash.indexOf('?') + 1) : '');

export const parametersObj = (clear?: string) => {

  let category = [],
    quantity = [],
    condition = [],
    material: string[] = [],
    length: number[] = [],
    price: number[] = [],
    width: number[] = [],
    height: number[] = [],
    load: number[] = [],
    sort = '';
  
  const setSlider = (name: string) => {
    const sliderStr = parameters.getAll(`${name}`).join('-').split('-');
    const slider = [parseInt(sliderStr[0]), parseInt(sliderStr[1])];
    return slider;
  };

  if (!clear) {
    price = setSlider('price');
    width = setSlider('width');
    length = setSlider('length');
    height = setSlider('height');
    load = setSlider('load');
    category = parameters.getAll('category').join().split(',');
    const quantityStr = parameters.getAll('quantity').join('-').split('-');
    quantity = [parseInt(quantityStr[0]), parseInt(quantityStr[1])];
    condition = parameters.getAll('condition').join().split(',');
    material = parameters.getAll('material').join().split(',');
    sort = INITIAL_STATE.sort;

  } else {
    parameters.set('category', INITIAL_STATE.category.join(','));
    parameters.set('price', INITIAL_STATE.price.join('-'));
    parameters.set('quantity', INITIAL_STATE.quantity.join('-'));
    parameters.set('condition', INITIAL_STATE.condition.join(', '));
    parameters.set('material', INITIAL_STATE.material.join(','));
    parameters.set('length', INITIAL_STATE.length.join('-'));
    parameters.set('width', INITIAL_STATE.width.join('-'));
    parameters.set('height', INITIAL_STATE.height.join('-'));
    parameters.set('load', INITIAL_STATE.load.join('-'));
    category = INITIAL_STATE.category;
    price = INITIAL_STATE.price;
    quantity = INITIAL_STATE.quantity;
    condition = INITIAL_STATE.condition;
    material = INITIAL_STATE.material;
    length = INITIAL_STATE.length;
    width = INITIAL_STATE.width;
    height = INITIAL_STATE.height;
    load = INITIAL_STATE.load;
    sort = INITIAL_STATE.sort;

    window.location.hash = 'catalog-page';
  }

  return  {
    category: category,
    price: price,
    quantity: quantity,
    condition: condition,
    material: material,
    length: length,
    width: width,
    height: height,
    load: load,
    sort: sort,
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