import Component from '../../templates/components';
import { IFilters, INITIAL_STATE } from '../../types/types';
import categoriesJSON from '../../../assets/json/categories.json';
import './filters.scss';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { parameters, parametersObj, saveParameters, loadParameters } from '../parameters';

export default class Filters extends Component implements IFilters {
  price: [number, number];
  // public stock: boolean;

  public category: string[];

  public categoryCheckboxes: NodeListOf<HTMLInputElement> | null;
  // public material: string[];
  // public length: [number, number] | [];
  // public width: [number, number] | [];
  // public height: [number, number] | [];
  // public load: [number, number] | [];
  // public sort: SortEnum;

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.category = parametersObj().category;
    this.categoryCheckboxes = null;
    this.price = INITIAL_STATE.price;
  }

  
  createFilterBlock(nameBlock: HTMLFormElement, name: string, container: HTMLElement) {
    nameBlock.classList.add(`${name}__form`);
    nameBlock.setAttribute('name', `${name}__form`);
    container.append(nameBlock);
  }

  createLegend(legend: HTMLElement, container: HTMLFormElement, innerText?: string) {
    legend.classList.add(`${container.name}__legend`);
    if (innerText)
      legend.innerText = innerText;
    container.append(legend);
  }

  createCheckbox(checkbox: HTMLInputElement, name: string, container: HTMLFormElement): void {
    checkbox.classList.add(`${name}_checkbox`);
    checkbox.classList.add('checkbox');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', `${name}`);
    checkbox.setAttribute('value', `${name}`);
    checkbox.setAttribute('name', `${name}`);
    container.append(checkbox);
  }

  createCheckboxLabel(label: HTMLElement, checkbox: HTMLInputElement, text: string, container: HTMLFormElement): void {
    label.setAttribute('for', `${checkbox}`);
    label.textContent = text;
    container.append(label);
  }

  private priceFilters() {

    const priceBlock = document.createElement('form') as HTMLFormElement;
    priceBlock.classList.add('price__form');
    priceBlock.setAttribute('name', 'price__form');

    const priceLegend = document.createElement('legend');
    priceLegend.classList.add('price__form__legend');
    priceLegend.innerText = 'Cena';

    const priceMinInput = document.createElement('input');
    priceMinInput.classList.add('pricemin__input');
    priceMinInput.setAttribute('type', 'text');

    const priceMaxInput = document.createElement('input');
    priceMaxInput.classList.add('pricemax__input');
    priceMaxInput.setAttribute('type', 'text');

    const priceInputs = [priceMinInput, priceMaxInput];

    const priceSlider = document.createElement('div') as noUiSlider.target;
    priceSlider.setAttribute('id', 'price__slider');
    priceSlider.classList.add('price__slider');

    let priceMin = 0;
    let priceMax = 500;

    if (parameters.get('price')) {
      const dashIndex: number = parameters.get('price')?.indexOf('-') as number;
      if (dashIndex) {
        priceMin = Number(parameters.get('price')?.slice(0, dashIndex));
        priceMax = Number(parameters.get('price')?.slice(dashIndex + 1));
      }
    }


    noUiSlider.create(priceSlider, {
      start: [priceMin, priceMax],
      connect: true,
      range: {
        'min': 0,
        'max': 500,
      },
    });

    priceInputs.forEach((input, handle) => {
      input.addEventListener('change', () => {
        priceSlider.noUiSlider?.setHandle(handle, input.value);
      });
    });

    if (priceSlider.noUiSlider) {
      priceSlider.noUiSlider.on('update', function (values, handle) {
        priceInputs[handle].value = values[handle].toString();
        const priceSliderValues = priceSlider.noUiSlider?.get() as string[];
        parameters.set('price', `${priceSliderValues[0]}-${priceSliderValues[1]}`);
        window.location.hash = parameters ? `catalog-page?${parameters.toString()}` : 'catalog-page';
        parametersObj();
        saveParameters();
      });
    }

    priceBlock.append(priceLegend, priceMinInput, priceMaxInput, priceSlider);
    this.container.append(priceBlock);
  }



  private stockFilter(): void {
    const stockBlock = document.createElement('form') as HTMLFormElement;
    this.createFilterBlock(stockBlock, 'stock', this.container);

    const stockLegend = document.createElement('legend');
    this.createLegend(stockLegend, stockBlock, 'Zapas');

    const stockCheckTrue = document.createElement('input') as HTMLInputElement;
    this.createCheckbox(stockCheckTrue, 'stock__true', stockBlock);
    const stockCheckLabel = document.createElement('label') as HTMLElement;
    this.createCheckboxLabel(stockCheckLabel, stockCheckTrue, 'Na stanie', stockBlock);

    const stockCheckFalse = document.createElement('input') as HTMLInputElement;
    this.createCheckbox(stockCheckFalse, 'stock__false', stockBlock);
    const stockCheckLabel2 = document.createElement('label') as HTMLElement;
    this.createCheckboxLabel(stockCheckLabel2, stockCheckFalse, 'Na zamówenie', stockBlock);

    function checkFalse(): void {
      if (stockCheckTrue.checked) {
        if (stockCheckFalse.checked)
          parameters.set('quantity', '0-100000');
        else parameters.set('quantity', '1-100000');
      } else parameters.set('quantity', '0-0');

      window.location.hash = parameters ? `catalog-page?${parameters.toString()}` : 'catalog-page';
      parametersObj();
      saveParameters();
    }

    function checkTrue(): void {
      if (stockCheckTrue.checked) {
        if (stockCheckFalse.checked)
          parameters.set('quantity', '0-100000');
        else parameters.set('quantity', '1-100000');
      } else parameters.set('quantity', '0-0');

      window.location.hash = parameters ? `catalog-page?${parameters.toString()}` : 'catalog-page';
      parametersObj();
      saveParameters();
    }

    if (parametersObj().quantity[1] !== 0) {
      stockCheckTrue.checked = true;
      checkTrue();
    }
    if (parametersObj().quantity[0] === 0) {
      stockCheckFalse.checked = true;
      checkFalse();
    }

    stockCheckTrue.addEventListener('change', () => {
      checkTrue();
    });

    stockCheckFalse.addEventListener('change', () => {
      checkFalse();
    });
  }


  private categoriesFilter(): void {

    const categoriesBlock = document.createElement('form') as HTMLFormElement;
    categoriesBlock.classList.add('categories__form');
    categoriesBlock.setAttribute('name', 'categories__block');
    const categoryLegend = document.createElement('legend');
    categoryLegend.classList.add('categories__form__legend');
    categoryLegend.innerText = 'Kategorie';
    categoriesBlock.append(categoryLegend);

    for (let i = 0; i < categoriesJSON.length; i++) {
      const categoryName = (categoriesJSON[i].short);

      const categoryCheck = document.createElement('input') as HTMLInputElement;
      categoryCheck.classList.add('checkbox');
      categoryCheck.classList.add('category__checkbox');
      categoryCheck.setAttribute('type', 'checkbox');
      categoryCheck.setAttribute('id', `${categoryName}`);
      categoryCheck.setAttribute('value', `${categoryName}`);
      categoryCheck.setAttribute('name', `${categoryName}`);

      if (parametersObj().category.find(x => x === categoryCheck.value))
        categoryCheck.checked = true;

      const labelCategoryCheck = document.createElement('label');
      labelCategoryCheck.setAttribute('for', `${categoryName}`);
      labelCategoryCheck.textContent = `${categoriesJSON[i].name}`;

      categoriesBlock.append(categoryCheck, labelCategoryCheck);
      this.container.append(categoriesBlock);
    }
  }

  private categoryChange():void {


    this.categoryCheckboxes =
      this.container.querySelectorAll('.category__checkbox');
    if (this.categoryCheckboxes) {
      this.categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
          const a = [];
          if (this.categoryCheckboxes)
            for (let i = 0; i < this.categoryCheckboxes?.length; i += 1) {
              if (this.categoryCheckboxes[i].checked)
                a.push(this.categoryCheckboxes[i].value);
            }
          this.category = a;
          parameters.set('category', `${this.category.join(',')}`);
          window.location.hash = parameters ? `catalog-page?${parameters.toString()}` : 'catalog-page';
          parametersObj();
          saveParameters();
        });
      });
    }
  }

  private resetFilters(): void {
    const resetBlock = document.createElement('form') as HTMLFormElement;
    resetBlock.classList.add('reset__form');
    resetBlock.setAttribute('name', 'reset__form');

    const resetButton = document.createElement('button');
    resetButton.setAttribute('type', 'reset');
    resetButton.setAttribute('name', 'resetButton');
    resetButton.classList.add('reset__form__button');
    resetButton.classList.add('button');
    resetButton.innerText = 'Reset';

    resetButton.addEventListener('click', () => {
      console.log('Reset!');
      parametersObj('clear');
      saveParameters();
    });

    resetBlock.append(resetButton);
    this.container.append(resetBlock);
  }

  render(): HTMLElement {
    this.priceFilters();
    this.stockFilter();
    this.categoriesFilter();
    this.categoryChange();
    this.resetFilters();
    loadParameters();
    parametersObj();
    return this.container;
  }
}

