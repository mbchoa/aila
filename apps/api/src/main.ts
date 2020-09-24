import { router } from '@aila/api-router';

const port = process.env.port || 3333;
const server = router.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
