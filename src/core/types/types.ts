export type ProductType = {
  id: number;
  short: string;
  name: string;
  category: string;
  condition: string;
  material: string;
  length: number;
  width: number;
  height: number;
  load: number;
  image1: string;
  image2: string;
  info: string;
  price: number;
  quantity: number;
};

export enum SortEnum {
  DEFAULT = 'DEFAULT',
  NAME = 'NAME',
  NAME_REVERSED = 'NAME_REVERSED',
  PRICE_UP = 'PRICE_UP',
  PRICE_DOWN = 'PRICE_DOWN',
}

export interface IFilters {
  price: [number, number] | [];
  stock: boolean;
  category: string[];
  material: string[];
  length: [number, number] | [];
  width: [number, number] | [];
  height: [number, number] | [];
  load: [number, number] | [];
  sort: SortEnum;
}

export const INITIAL_STATE: IFilters = {
  price: [],
  stock: false,
  category: [],
  material: [],
  length: [],
  width: [],
  height: [],
  load: [],
  sort: SortEnum.DEFAULT,
};