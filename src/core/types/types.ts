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
  DEFAULT = 'Wybrane',
  NAME = 'Udźwig rosnąco',
  NAME_REVERSED = 'Udźwig malejąco ',
  PRICE_UP = 'Najtańsze',
  PRICE_DOWN = 'Najdroższe',
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
    'palety_przem', 'polpalety', 'palety_tektur', 'palety_plastik', 'nadstawki'],
  condition: ['used', 'new'],
  quantity: [0, 100000],
  material: ['drewno', 'plastik', 'tektura'],
  length: [0, 3000],
  width: [0, 3000],
  height: [0, 3000],
  load: [0, 5000],
  sort: SortEnum.DEFAULT,
  short: ['euro_new', 'euro_used_1', 'euro_used_2', 'euro_used_3',
    'europod_new', 'europod_used', 'jedno_new_1', 'jedno_new_2',
    'jedno_used_1', 'jedno_used_2', 'jedno_used_3', 'przem_1', 'przem_2',
    'polpal_1', 'polpal_2', 'plastik_1', 'plastik_2', 'tektur_1',
    'nadstawka_1', 'nadstawka_2', 'nadstawka_3'],
};
