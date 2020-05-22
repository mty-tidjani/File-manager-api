require('dotenv').config();

const ev = process.env;

const config = {
  port: ev.APP_PORT,
  logDir: ev.LOG_DIR,
  imgPath: ev.IMAGES_PATH,
  vidPath: ev.VIDEOS_PATH,
  docPath: ev.DOCS_PATH,
};

export default config;
