import { Request, Response, NextFunction } from 'express';
import config from '../../config/config';


const saveThumb = (file: Express.Multer.File) => new Promise((resolve) => {
  config.ffmpeg(file.path).takeScreenshots({
    count: 1, timemarks: ['50%'],
    filename: `${file.filename}.png`
  }, 'uploads/videos/thumbs').on('end', () => {
    resolve(`${file.filename}.png`);
  }).on('error', () => {
    resolve('default_thumbnail.png');
  });
});

const getMetadata = (file: Express.Multer.File) => new Promise((resolve) => {
  config.ffmpeg.ffprobe(file.path, (err: any, metadata: any) => {
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

export const loadMeta = (type = 'video') => async (req: any, res: Response<any>, next: NextFunction) => {
  const { files } = req;
  for (const file of files) {
    file.meta = await getMetadata(file);
    if (type === 'video') file.meta = await saveThumb(file);
  }
  return next();
};
