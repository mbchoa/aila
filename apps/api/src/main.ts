import * as bodyParser from 'body-parser';
import * as express from 'express';
import monk, { ICollection, IMonkManager } from 'monk';
import morgan from 'morgan';

import { CuisineRecord, CuisineType } from '@aila/api-interfaces';

// Connect MongoDB
const db: IMonkManager = monk(process.env.MONGODB_URI);
const cuisineRecords: ICollection = db.get('cuisine-records');
cuisineRecords.createIndex({ cuisineType: 1 }, { unique: true });

// App
const app = express();
app.use(morgan('tiny'));
app.use(bodyParser.json());

app.get('/cuisines', async (_, res) => {
  try {
    const records: CuisineRecord[] = await cuisineRecords.find();
    res.json(records);
  } catch (err) {
    res.status(500);
  }
});

app.post('/cuisines/rank', async (req, res) => {
  // get cuisines selected from body
  const selectedCuisines: CuisineType[] = req.body;

  try {
    // look up last eaten timestamps for each cuisine
    const records: CuisineRecord[] = await cuisineRecords.find({ cuisineType: { $in: selectedCuisines } }, { raw: false });
    if (records.length === 0) {
      return res.status(400).json({ message: 'Cuisine types provided not found' });
    }

    // send sorted cuisine records by lastEatenTimeStamp
    const rankedRecords: CuisineRecord[] = records.sort((a, b) => a.lastEatenTimeStamp.getTime() - b.lastEatenTimeStamp.getTime());
    res.json(rankedRecords);
  } catch (err) {
    res.status(500).json({
      message: 'Fatal error encountered. Unable to rank selected cuisines',
      error: err,
    });
  }
});

app.post('/cuisines/select', async (req, res) => {
  const { cuisine } = req.body;
  try {
    const updatedRecord: CuisineRecord = await cuisineRecords.findOneAndUpdate({ cuisineType: cuisine }, { $set: { lastEatenTimeStamp: new Date() } });
    if (!updatedRecord) {
      return res.status(404).json({ message: `Unable to find selected cuisine: ${cuisine}` });      
    }
    res.json(updatedRecord);
  } catch (err) {
    res.status(500).json({ message: 'Fatal error encountered. Unable to update selected cuisine'});
  }
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
