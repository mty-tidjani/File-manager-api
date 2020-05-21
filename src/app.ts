import express from 'express';
import config from './config/config';
import { AppRoutes } from './router';


const routes = AppRoutes.initRoutes();

const app = express();

app.use(routes);

app.listen(config.port, () => {
  console.log(`File Service API up at http://localhost:${config.port}.`);
});
