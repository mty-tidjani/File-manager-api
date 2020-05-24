import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

import { optimize } from '../utils/imgUtils';

class StreamController{
  public static stream = (req: Request, res: Response<any>, next: NextFunction) => {
    return res.send('Ready to Stream');
  }

  public static videos = (req: Request, res: Response<any>, next: NextFunction) => {
    const vid = req.params.vid;
    const basePath = './uploads/videos/';
    if (!fs.existsSync(basePath + vid)) return res.status(404).send('File not found');
    return res.sendFile(path.join(__dirname, `../.${basePath + vid}`));
  }

  public static images = async (req: any, res: Response<any>, next: NextFunction) => {
    const img = req.params.img;
    const basePath = './uploads/images/';
    const { h, w, fit } = req.query;
    console.log('img', img, h, w, fit, typeof(h), isNaN(h), isNaN(300));
    if (!fs.existsSync(basePath + img)) return res.status(404).send('File not found');
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
      let realname = img;
      if (options.width) realname = `${options.width}x${realname}`;
      if (options.height) realname = `${options.height}x${realname}`;
      if (options.fit) realname = `${options.fit}_${realname}`;
      if (!fs.existsSync(basePath + realname)) {
        await sharp(basePath + img)
        .resize(options)
        .withMetadata()
        .toFile(basePath + realname);
      }
      filename = realname;
    }
    return res.sendFile(path.join(__dirname, `../.${basePath + filename}`));
  }

  public static documents = (req: Request, res: Response<any>, next: NextFunction) => {
    const doc = req.params.doc;
    const basePath = './uploads/docs/';
    if (!fs.existsSync(basePath + doc)) return res.status(404).send('File not found');
    return res.sendFile(path.join(__dirname, `../.${basePath + doc}`));
  }
}

export { StreamController };
