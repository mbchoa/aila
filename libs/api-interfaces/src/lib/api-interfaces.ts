export enum CuisineType {
  'American BBQ' = 'american-bbq',
  'American Brunch' = 'american-brunch',
  'American Burger' = 'american-burger',
  'American Fried Chicken' = 'american-fried-chicken',
  'American Sandwiches' = 'american-sandwiches',
  Brazilian = 'brazilian',
  Chinese = 'chinese',
  Greek = 'greek',
  Indian = 'indian',
  Indonesian = 'indonesian',
  'Italian Pizza' = 'italian-pizza',
  'Italian Pasta' = 'italian-pasta',
  Jamaican = 'jamaican',
  'Japanese Sushi' = 'japanese-sushi',
  'Japanese Ramen' = 'japanese-ramen',
  Korean = 'korean',
  Mexican = 'mexican',
  Peruvian = 'peruvian',
  Thai = 'thai',
  Vietnamese = 'vietnamese',
};

export enum CuisineTag {
  Asian = 'asian',
  NonAsian = 'non-asian',
};

export interface Restaurant {
  _id: string,
  name: string,
}

export interface CuisineRecord {
  _id: string,
  cuisineType: CuisineType,
  lastEatenTimeStamp: Date,
  restaurants: Restaurant[],
  tags: CuisineTag[],
};
