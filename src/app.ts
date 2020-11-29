import express from 'express';
import config from './core/config/config';
import { AppRoutes } from './routes';


const routes = AppRoutes.initRoutes();

const app = express();

app.use(routes);

app.listen(config.port, () => {
  console.log(`File Service API up at http://localhost:${config.port}.`);
});
