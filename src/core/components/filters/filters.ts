import Component from '../../templates/components';
import { IFilters, INITIAL_STATE } from '../../types/types';

export default class Filters implements IFilters extends Component {
  // public price: [number, number] | [];
  // public stock: boolean;
  public category: string;
  // public material: string[];
  // public length: [number, number] | [];
  // public width: [number, number] | [];
  // public height: [number, number] | [];
  // public load: [number, number] | [];
  // public sort: SortEnum;

  constructor() {
    this.category = INITIAL_STATE.category;
  }

  public resetFilters(): void {
    this.category = INITIAL_STATE.category;
  }
  
  public initFilters(): void {
    const categoryCheck = document.querySelector('.category__checkbox') as HTMLElement;
    // this.category = categoryCheck.innerHTML as string;
    console.log(categoryCheck);
  }

  public recordFilters(): void {
    
  }

  categoryFilter(): string {
    return '';

  }

}