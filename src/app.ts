import express from 'express';
import { Config } from './config/config';

require('dotenv').config();

const app = express();

const config = new Config(process).getConfig();

app.listen(config.port, () => {
  console.log(`File Service API up at http://localhost:${config.port}.`);
});
