import Component from '../../templates/components';
import { IFilters, INITIAL_STATE } from '../../types/types';
import categoriesJSON from '../../../assets/json/categories.json';
import './filters.scss';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { parameters, createParametersObj, saveParameters, loadParameters } from '../parameters';

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
    this.category = INITIAL_STATE.category;
    this.run();
    this.categoryCheckboxes = null;
    this.price = INITIAL_STATE.price;
  }

  private resetFilters(): void {
    this.price = INITIAL_STATE.price;
    this.category = INITIAL_STATE.category;
  }

  private categoriesFilter(): void {

    const categoriesBlock = document.createElement('form') as HTMLFormElement;
    categoriesBlock.classList.add('categories__form');

    for (let i = 0; i < categoriesJSON.length; i++) {
      const categoryName = (categoriesJSON[i].short);

      const categoryCheck = document.createElement('input') as HTMLInputElement;
      categoryCheck.classList.add(`${categoryName}_checkbox`);
      categoryCheck.classList.add('category__checkbox');
      categoryCheck.setAttribute('type', 'checkbox');
      categoryCheck.setAttribute('id', `${categoryName}`);
      categoryCheck.setAttribute('value', `${categoryName}`);
      categoryCheck.setAttribute('name', `${categoryName}`);

      if (this.category.find(x => x === categoryCheck.value))
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
          createParametersObj();
          saveParameters();
        });
      });
    }
  }

  private priceFilters() {

    const priceBlock = document.createElement('form') as HTMLFormElement;
    priceBlock.classList.add('price__form');

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
        // priceTemp = [parseInt(priceSliderValues[0]), parseInt(priceSliderValues[1])];
        parameters.set('price', `${priceSliderValues[0]}-${priceSliderValues[1]}`);
        window.location.hash = parameters ? `catalog-page?${parameters.toString()}` : 'catalog-page';
        createParametersObj();
        saveParameters();
      });
    }

    priceBlock.append(priceMinInput, priceMaxInput, priceSlider);
    this.container.append(priceBlock);
  }

  priceChange(): void {
  }

  private recordFilters(): void {
  }

  run(): void {
    this.categoriesFilter();
    // this.resetFilters();
  }

  render(): HTMLElement {
    // if (localStorage.length('parameters')) {
    console.log(localStorage.getItem('parameters'));
    this.categoryChange();
    this.priceFilters();
    loadParameters();
    createParametersObj();
    return this.container;
  }
}