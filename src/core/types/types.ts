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
  price: [number, number];
  // stock: boolean;
  category: string[];
  // material: string[];
  // length: [number, number] | [];
  // width: [number, number] | [];
  // height: [number, number] | [];
  // load: [number, number] | [];
  // sort: SortEnum;
  // quantity: number;
}

export const INITIAL_STATE = {
  price: [0, 500] as [number, number],
  category: ['palety_euro', 'palety_europodobne', 'palety_jedno',
    'palety_przem', 'polpalety'],
  condition: ['used', 'new'],
  quantity: [0, 100000],
  material: ['drewno', 'plastik', 'tektura'],
  length: [0, 3000],
  width: [0, 3000],
  height: [0, 3000],
  load: [0, 10000],
  sort: SortEnum.DEFAULT,
};