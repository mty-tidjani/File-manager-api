import ffmpegStatic from 'ffmpeg-static';
import ffprobeStatic from 'ffprobe-static';
import fluentFfmpeg from 'fluent-ffmpeg';
import { Request, Response, NextFunction } from 'express';


const saveThumb = (file: Express.Multer.File) => new Promise((resolve) => {
  fluentFfmpeg(file.path).takeScreenshots({
    count: 1, timemarks: ['50%'],
    filename: `${file.filename}.png` },   'uploads/videos/thumbs').on('end', () => {
      resolve(`${file.filename}.png`);
    }).on('error', () => {
      resolve('default_thumbnail.png');
    });
});

const getMetadata = (file: Express.Multer.File) => new Promise((resolve) => {
  fluentFfmpeg.ffprobe(file.path, (err: any, metadata: any) => {
    if (metadata) {
      const meta = {
        ...metadata.format,
        width: metadata.streams[0].width,
        height: metadata.streams[0].height,
      };
      resolve(meta);
    } else {
      resolve({});
    }
  });
});

export const loadSingleMeta = (type = 'video') => async (req: any, res: Response<any>, next: NextFunction) => {
  const { file } = req;
  fluentFfmpeg.setFfmpegPath(ffmpegStatic);
  fluentFfmpeg.setFfprobePath(ffprobeStatic.path);
  const meta: any = await getMetadata(file);
  if (type === 'video') meta.thumbnail = await saveThumb(file);
  // console.log(proc);
  file.meta = meta;
  return next();
};

export const loadImagesMeta = async (req: any, res: Response<any>, next: NextFunction) => {
  fluentFfmpeg.setFfmpegPath(ffmpegStatic);
  fluentFfmpeg.setFfprobePath(ffprobeStatic.path);

  for (const file of req.files) {
    file.meta = await getMetadata(file);
  }
  return next();
};

export const loadManyMeta = (type = 'video') => async (req: any, res: Response<any>, next: NextFunction) => {
  const { files } = req;
  fluentFfmpeg.setFfmpegPath(ffmpegStatic);
  fluentFfmpeg.setFfprobePath(ffprobeStatic.path);
  for (const file of files) {
    file.meta = await getMetadata(file);
    if (type === 'video') file.meta = await saveThumb(file);
  }
  return next();
};
