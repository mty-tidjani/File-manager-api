import fs from 'fs';
import path from 'path';
import ffmpegStatic from 'ffmpeg-static';
import ffprobeStatic from 'ffprobe-static';
import ffmpeg from 'fluent-ffmpeg';
import { Request, Response, NextFunction } from 'express';


const saveThumb = (file: Express.Multer.File) => new Promise((resolve) => {
  ffmpeg(file.path).takeScreenshots({
    count: 1, timemarks: ['50%'],
    filename: `${file.filename}.png` },
                                    'uploads/videos/thumbs').on('end', () => {
                                      resolve(`${file.filename}.png`);
                                    }).on('error', () => {
                                      resolve('default_thumbnail.png');
                                    });
});

const getMetadata = (file: Express.Multer.File) => new Promise((resolve) => {
  ffmpeg.ffprobe(file.path, (err: any, metadata: any) => {
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

export const loadMetadata = (type = 'video') => async (req, res, next) => {
  const { file } = req;
  ffmpeg.setFfmpegPath(ffstatic);
  ffmpeg.setFfprobePath(ffprobe.path);
  const meta = await getMetadata(file);
  if (type === 'video') meta.thumbnail = await saveThumb(file);
  // console.log(proc);
  req.metadata = meta;
  return next();
};

export const loadImagesMeta = async (req: Request, res: Response<any>, next: NextFunction) => {
  ffmpeg.setFfmpegPath(ffstatic);
  ffmpeg.setFfprobePath(ffprobe.path);
  for (let i = 0; i < req.files.length; i += 1) {
    req.files[i].meta = await getMetadata(req.files[i]);
  }
  return next();
};
