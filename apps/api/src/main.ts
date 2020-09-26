import { app, router } from '@aila/api-router';

app.use('/', router);

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Started Express server at port: ${port}`);
});
