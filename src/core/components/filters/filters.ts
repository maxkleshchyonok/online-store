import { IFilters, INITIAL_STATE } from '../../types/types';

export default class Filters implements IFilters {
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
  
  public initFilters(category: string): void {
    if (localStorage.getItem('category')) {
      const categoryQuery = localStorage.getItem('category');
      this.category = categoryQuery as string;
    } else this.category = category;
  }

  public recordFilters(): void {
    
  }

  categoryFilter(): string {
    return '';

  }

}