import { router } from '@aila/api-router';
import * as serverless from 'serverless-http';

export const handler = serverless(router);
