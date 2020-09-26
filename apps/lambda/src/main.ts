import { app, router } from '@aila/api-router';
import * as serverless from 'serverless-http';

app.use('/.netlify/functions/main', router);

export const handler = serverless(app);
