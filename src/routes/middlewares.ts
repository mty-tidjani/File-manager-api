
import multer from 'multer';
import ffmpegStatic from 'ffmpeg-static';
import ffprobeStatic from 'ffprobe-static';
import fluentFfmpeg from 'fluent-ffmpeg';
import { Request, NextFunction, Response } from 'express';
import { isArray } from 'lodash';
import { IMetadata } from '../types';

const storage =  multer.diskStorage({
  destination (req: Request, file: Express.Multer.File, cb) {
    if (file.mimetype.split('video').length > 1) {
      cb(null, 'uploads/videos');
    } else if (file.mimetype.split('image').length > 1) {
      cb(null, 'uploads/images');
    } else {
      cb(null, 'uploads/documents');
    }
  },
  filename (req: Request, file: Express.Multer.File, cb) {
    const fileExt = file.originalname.split('.')[file.originalname.split('.').length - 1];
    cb(
      null,
      `upload_${new Date().getTime()}.${fileExt}`,
    );
  },
});
// Exported
const fileUpload = multer({ storage });

const saveThumb = (file: Express.Multer.File) => new Promise((resolve) => {
  fluentFfmpeg(file.path).takeScreenshots({
    count: 1, timemarks: ['50%'],
    filename: `${file.filename}.png` },   'uploads/videos/thumbs').on('end', () => {
      resolve(`${file.filename}.png`);
    }).on('error', () => {
      resolve('default_thumbnail.png');
    });
});

const getMetadata = (file: Express.Multer.File) => new Promise<IMetadata | undefined>((resolve) => {
  fluentFfmpeg.ffprobe(file.path, (err: any, metadata) => {
    if (metadata) {
      const meta: any = {
        ...metadata.format,
        width: metadata.streams[0].width,
        height: metadata.streams[0].height,
        duration: metadata.streams[0].duration,
      };
      resolve(meta);
    } else {
      resolve(undefined);
    }
  });
});

// Exported
const loadMeta = () => async (req: Request | any , res: Response<any>, next: NextFunction) => {
  const { files } = req;
  fluentFfmpeg.setFfmpegPath(ffmpegStatic);
  fluentFfmpeg.setFfprobePath(ffprobeStatic.path);
  if (isArray(req.files)) {
    for (const file of req.files) {
      file.meta = await getMetadata(file);
      if (file.mimetype.split('video').length > 1) file.meta = await saveThumb(file);
    }
  }
  return next();
};

export  { fileUpload, loadMeta };
