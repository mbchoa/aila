import * as bodyParser from 'body-parser';
import * as express from 'express';
import monk, { ICollection, IMonkManager } from 'monk';
import morgan from 'morgan';
import { CuisineTag, CuisineType, Restaurant } from '@aila/api-interfaces';

import * as schemas from './schemas';
import * as helpers from './helpers';

// Connect MongoDB
const db: IMonkManager = monk(process.env.MONGODB_URI as string);
const restaurantCollection: ICollection = db.get('restaurants');
restaurantCollection.createIndex({ name: 1 }, { unique: true });

// Router
const router = express.Router();

router.get('/cuisine-types', async (_, res) => {
  try {
    const restaurants: Restaurant[] = await restaurantCollection.find();
    const cuisineTypes: CuisineType[] = [
      ...new Set(restaurants.map(({ cuisineType }) => cuisineType)),
    ].sort((a, b) => a.localeCompare(b));
    res.json(cuisineTypes);
  } catch (err) {
    res.status(500).json({
      message: 'Unable to fetch cuisine types.',
      error: err.message,
    });
  }
});

router.get('/restaurants', async (req, res) => {
  const requestedTags: CuisineTag[] = req.query?.tags?.length
    ? helpers.parseCuisineTags(req.query.tags as string)
    : [];

  try {
    if (requestedTags.length === 0 || requestedTags.includes(CuisineTag.NoPreference)) {
      const restaurants: Restaurant[] = await restaurantCollection.find();
      return res.json(restaurants);
    }

    const restaurants: Restaurant[] = await restaurantCollection.find({ tags: { $all: requestedTags }}, { raw: false });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({
      message: 'Unable to fetch restaurants.',
      error: err.message,
    });
  }
});

router.post('/restaurants', async (req, res) => {
  try {
    // validate request body
    const { cuisineType, name, tags } = schemas.addRestaurantSchema.parse(req.body)

    // insert restaurant document with data
    const restaurant: Restaurant = await restaurantCollection.insert({
      cuisineType, datesOrdered: [], name, tags
    });
    if (!restaurant) {
      throw new Error('Failed to insert restaurant into database');
    }
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({
      message: 'Fatal error encountered. Unable to create new restaurant',
      error: err.message,
    });
  }
});

router.post('/restaurants/rank', async (req, res) => {
  // get cuisines selected from body
  const selectedCuisines: CuisineType[] = req.body;

  try {
    // find restaurants that match the selected cuisine types
    const restaurants: Restaurant[] = await restaurantCollection.find(
      { cuisineType: { $in: selectedCuisines } },
      { raw: false }
    );
    if (restaurants.length === 0) {
      return res
        .status(400)
        .json({ message: 'Cuisine types provided not found' });
    }

    // send sorted restaurants by least recently ordered from
    const rankedRestaurants: Restaurant[] = restaurants.sort((a, b) => {
      const prevDate: Date = new Date(
        a.datesOrdered[a.datesOrdered.length - 1]
      );
      const nextDate: Date = new Date(
        b.datesOrdered[b.datesOrdered.length - 1]
      );
      return prevDate.getTime() - nextDate.getTime();
    });

    res.json(rankedRestaurants);
  } catch (err) {
    res.status(500).json({
      message: 'Fatal error encountered. Unable to rank selected cuisines',
      error: err.message,
    });
  }
});

router.put('/restaurants/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params;

  try {
    const updatedRestaurant: Restaurant = await restaurantCollection.findOneAndUpdate(
      { _id: restaurantId },
      { $push: { datesOrdered: new Date() } }
    );
    if (!updatedRestaurant) {
      return res.status(404).json({
        message: `Unable to find selected restaurantId: ${restaurantId} to update`,
      });
    }
    res.json(updatedRestaurant);
  } catch (err) {
    res.status(500).json({
      message: 'Fatal error encountered. Unable to update selected restaurant',
      error: err.message,
    });
  }
});

const app = express();
app.use(morgan('tiny'));
app.use(bodyParser.json());

export { app, router };
