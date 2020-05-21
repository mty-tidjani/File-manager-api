require('dotenv').config();

const ev = process.env;

const config = {
  port: ev.APP_PORT,
  logDir: ev.LOG_DIR,
};

export default config;
