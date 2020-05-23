import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import config from '../config/config';

const getMeta = (filePath:string) => {
  return new Promise((resolve) => {
    config.ffmpeg.ffprobe(filePath, (err: any, metadata: any) => {
      console.log(err);
      if (metadata) {
        const meta: any = {};
        meta.width = metadata.streams[0].width;
        meta.height = metadata.streams[0].height;
        return resolve(meta);
      }
      resolve(null);
    });
  });
};

const optimize = async (options: any, filePath: string) => {
  const meta: any = await getMeta(filePath);
  console.log('meta ------------', meta);
  if (!meta) return options;
  if (options.width && options.height) {
    if (meta.width >= options.width && meta.height >= options.height) return options;
    const ref = meta.width > meta.height ? meta.height : meta.width;
    const newW = options.width / (options.width / ref);
    const newH = options.height / (options.height / ref);
    return { ...options, width: newW, height: newH };
  }
  if (options.width) {
    if (options.width <= meta.width) return options;
    return { ...options, width: meta.width };
  }
  if (options.height) {
    if (options.height <= meta.height) return options;
    return { ...options, height: meta.height };
  }
  return options;
};

class StreamController{
  public static stream = (req: Request, res: Response<any>, next: NextFunction) => {
    return res.send('Ready to Stream');
  }

  public static videos = (req: Request, res: Response<any>, next: NextFunction) => {
    return res.send('Ready to Stream videos');
  }

  public static images = async (req: any, res: Response<any>, next: NextFunction) => {
    const img = req.params.img;
    const basePath = './uploads/images/';
    const { h, w, fit } = req.query;
    console.log('img', img, h, w, fit, typeof(h), isNaN(h), isNaN(300));
    if (!fs.existsSync(basePath + img)) return res.send('File not found');
    let options: any = {};
    let filename = img;
    if (w && !isNaN(w)) {
      options.width = Number(w);
      filename = `${w}x${filename}`;
    }
    if (h && !isNaN(h)) {
      options.height = Number(h);
      filename = `${h}x${filename}`;
    }
    if (fit && fit === 'crop') {
      options.fit = 'cover';
      filename = `crop_${filename}`;
    }

    if (!fs.existsSync(basePath + filename)) {
      options = await optimize(options, path.join(__dirname, `../.${basePath + img}`));
      console.log(options);
      await sharp(basePath + img)
        .resize(options)
        .withMetadata()
        .toFile(basePath + filename);
    }
    return res.sendFile(path.join(__dirname, `../.${basePath + filename}`));
  }

  public static documents = (req: Request, res: Response<any>, next: NextFunction) => {
    return res.send('Ready to Stream documents (every thing different from videos and images)');
  }
}

export { StreamController };
