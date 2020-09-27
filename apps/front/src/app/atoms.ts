import qs from 'qs';
import { atom } from 'jotai';
import { Restaurant } from '@aila/api-interfaces';

import { Step } from './types';

export const stepAtom = atom(Step.AsianOrNonAsian);
export const tagsAtom = atom([]);
export const restaurantsAtom = atom([]);

export const fetchRestaurantsAtom = atom(
  get => get(restaurantsAtom),
  async (get, set) => {
    const tags = get(tagsAtom).join(',');
    const response = await fetch(`/.netlify/functions/main/restaurants${qs.stringify({ tags }, { addQueryPrefix: true })}`);
    const restaurants: Restaurant[] = await response.json();
    set(restaurantsAtom, restaurants as []);
  }
);
