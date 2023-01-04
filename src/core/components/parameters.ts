const hash = window.location.hash.slice(1);

export let parameters = new URLSearchParams(hash.includes('?') ? hash.slice(hash.indexOf('?') + 1) : '');

export function createParametersObj() {

  // let parametersObj = {};

  const category = parameters.getAll('category').join().split(',');

  const priceStr = parameters.getAll('price').join('-').split('-');
  const price = [parseInt(priceStr[0]), parseInt(priceStr[1])];

  return  {
    category: category, 
    price: price,
  };
}

export function saveParameters() {
  console.log(parameters.toString());
  localStorage.setItem('parameters', parameters.toString());
}

export function loadParameters() {
  console.log(parameters);
  const tempPar = localStorage.getItem('parameters') as string;
  if (tempPar) {
    const tempParams = new URLSearchParams(tempPar);
    parameters = tempParams;
  }
}