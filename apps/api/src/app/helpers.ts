import { ICollection } from 'monk'
import { CuisineType } from '@aila/api-interfaces';

export const seedCuisineRecordsDatabase = (collection: ICollection): void => {
  Object.values(CuisineType).forEach(async (cuisineType) => {
    console.log(`Inserting cuisine type: ${cuisineType}`);
    try {
      const docs = await collection.insert({
        cuisineType,
        lastEatenTimeStamp: new Date(),
        restaurants: [],
        tags: [],
      });
      console.log(docs);
    } catch (err) {
      console.error(err);
    }
  });
}
