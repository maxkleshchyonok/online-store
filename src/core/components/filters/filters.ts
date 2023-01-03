import Component from '../../templates/components';
import { IFilters, INITIAL_STATE } from '../../types/types';
import categoriesJSON from '../../../assets/json/categories.json';
import './filters.scss';
// import noUiSlider, { target } from 'nouislider';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { parameters } from '../parameters';

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
      this.category.push(categoriesJSON[i].short);

      const categoryCheck = document.createElement('input') as HTMLInputElement;
      categoryCheck.classList.add(`${this.category[i]}_checkbox`);
      categoryCheck.classList.add('category__checkbox');
      categoryCheck.setAttribute('type', 'checkbox');
      categoryCheck.setAttribute('id', `${this.category[i]}`);
      categoryCheck.checked = true;

      categoryCheck.setAttribute('value', `${this.category[i]}`);
      categoryCheck.setAttribute('name', `${this.category[i]}`);

      const labelCategoryCheck = document.createElement('label');
      labelCategoryCheck.setAttribute('for', `${this.category[i]}`);
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
          // const a = Array.from(this.categoryCheckboxes);
          // this.category = a.map(x => x.value);
          this.category = a;
          parameters.set('category', `${this.category.join(',')}`);
          console.log(this.category);
          console.log(parameters);
        });
      });
    }
  }

    // this.categoryCheckboxes.forEach((checkbox) => {
    //   checkbox.addEventListener('change', () => {
    //     this.category = INITIAL_STATE.category;
    //     console.log(this.category);

    //     if (this.category.find(x => x === checkbox.value)) {
    //       if (!checkbox.checked) {
    //         const indexDelete = this.category.findIndex(x => x === checkbox.value);
    //         this.category.splice(indexDelete, 1);
    //       }
    //     } else if (checkbox.checked) {
    //       this.category.push(checkbox.value);
    //     }

        // if (checkbox.checked) {
        //   if (!this.category.find(x => x === checkbox.value)) {
        //     this.category.push(checkbox.value);
        //   }
        // } else if (!checkbox.checked) {
        //   const indexDelete = this.category.findIndex(x => x === checkbox.value);
        //   this.category.splice(indexDelete, 1);
        // }

  //     });
  //   });
  // }

  public priceFilters() {

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

    noUiSlider.create(priceSlider, {
      start: [0, 500],
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
        console.log(priceSliderValues);
        // priceTemp = [parseInt(priceSliderValues[0]), parseInt(priceSliderValues[1])];
        parameters.set('price', `${priceSliderValues[0]}-${priceSliderValues[1]}`);
        window.location.hash = parameters ? `catalog-page?${parameters.toString()}` : 'catalog-page';
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
    this.categoryChange();
    this.priceFilters();
    return this.container;
  }
}