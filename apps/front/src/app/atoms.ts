import qs from 'qs';
import { atom } from 'jotai';
import { CuisineType, Restaurant } from '@aila/api-interfaces';

import { Step } from './types';

export const stepAtom = atom(Step.AsianOrNonAsian);
export const tagsAtom = atom([]);
export const cuisineTypesAtom = atom([]);
export const recommendedRestaurantsAtom = atom([]);

export const fetchCuisineTypesAtom = atom(
  get => get(cuisineTypesAtom),
  async (get, set) => {
    const tags = get(tagsAtom).join(',');
    const response = await fetch(`/.netlify/functions/main/restaurants${qs.stringify({ tags }, { addQueryPrefix: true })}`);
    const restaurants: Restaurant[] = await response.json();
    const cuisineTypes: CuisineType[] = [...new Set(restaurants.map(({ cuisineType }) => cuisineType))]
    set(cuisineTypesAtom, cuisineTypes as []);
  },
);

export const fetchRecommendedRestaurantsAtom = atom(
  get => get(recommendedRestaurantsAtom),
  async (_, set, selectedCuisines) => {
    try {
      const response = await fetch('/.netlify/functions/main/restaurants/rank', {
        cache: 'no-cache',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedCuisines),
      });
      const recommendedRestaurants: Restaurant[] = await response.json();
      set(recommendedRestaurantsAtom, recommendedRestaurants as [])
    } catch (err) {
      // TODO: handle error
    }
  },
);
