require('dotenv').config();
import ffmpegStatic from 'ffmpeg-static';
import ffprobeStatic from 'ffprobe-static';
import fluentFfmpeg from 'fluent-ffmpeg';

const ev = process.env;

fluentFfmpeg.setFfmpegPath(ffmpegStatic);

fluentFfmpeg.setFfprobePath(ffprobeStatic.path);

const config = {
  port: ev.APP_PORT,
  logDir: ev.LOG_DIR,
  imgPath: ev.IMAGES_PATH,
  vidPath: ev.VIDEOS_PATH,
  docPath: ev.DOCS_PATH,
  ffmpeg: fluentFfmpeg,
};

export default config;
