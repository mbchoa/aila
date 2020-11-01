export enum CuisineType {
  American = 'american',
  BBQ = 'bbq',
  Boba = 'boba',
  Brazilian = 'brazilian',
  Brunch = 'brunch',
  Burger = 'burger',
  Chinese = 'chinese',
  FriedChicken = 'fried-chicken',
  Healthy = 'healthy',
  Indian = 'indian',
  Indonesian = 'indonesian',
  Jamaican = 'jamaican',
  Japanese = 'japanese',
  Korean = 'korean',
  Mediterranean = 'mediterranean',
  Mexican = 'mexican',
  Pasta = 'pasta',
  Pastries = 'pastries',
  Peruvian = 'peruvian',
  Pizza = 'pizza',
  Sandwiches = 'sandwiches',
  Thai = 'thai',
  Vietnamese = 'vietnamese',
};

export enum CuisineTag {
  Asian = 'asian',
  NonAsian = 'non-asian',
  NoPreference = 'no-pref',
};

export interface Restaurant {
  _id: string,
  name: string,
  cuisineType: CuisineType,
  datesOrdered: string[],
  tags: CuisineTag[],
}
