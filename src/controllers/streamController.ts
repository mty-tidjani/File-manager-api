import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

import { optimize } from '../utils/imgUtils';

class StreamController{

  public static videos = (req: any, res: Response<any>, next: NextFunction) => {

    const vid = req.params.vid;

    const reqPath: string = req.baseUrl.substr(req.baseL).split(vid).join('');

    const dirPath = `./uploads/videos${reqPath}`;

    if (!fs.existsSync(dirPath + vid)) return res.status(404).send('File not found');

    return res.sendFile(path.join(__dirname, `../.${dirPath + vid}`));
  }

  public static images = async (req: any, res: Response<any>, next: NextFunction) => {
    const img = req.params.img;

    const reqPath: string = req.baseUrl.substr(req.baseL).split(img).join('');

    const dirPath = `./uploads/images${reqPath}`;

    const { h, w, fit } = req.query;

    if (!fs.existsSync(dirPath + img)) return res.status(404).send('File not found');

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

    if (!fs.existsSync(dirPath + filename)) {

      options = await optimize(options, path.join(__dirname, `../.${dirPath + img}`));

      let realname = img;

      if (options.width) realname = `${options.width}x${realname}`;

      if (options.height) realname = `${options.height}x${realname}`;

      if (options.fit) realname = `${options.fit}_${realname}`;

      if (!fs.existsSync(dirPath + realname)) {
        await sharp(dirPath + img)
        .resize(options)
        .withMetadata()
        .toFile(dirPath + realname);
      }

      filename = realname;
    }

    return res.sendFile(path.join(__dirname, `../.${dirPath + filename}`));
  }

  public static documents = (req: any, res: Response<any>, next: NextFunction) => {
    const doc = req.params.doc;

    const reqPath: string = req.baseUrl.substr(req.baseL).split(doc).join('');

    const dirPath = `./uploads/docs${reqPath}`;

    if (!fs.existsSync(dirPath + doc)) return res.status(404).send('File not found');

    return res.sendFile(path.join(__dirname, `../.${dirPath + doc}`));
  }

  public static thumbnail = (req: any, res: Response<any>, next: NextFunction) => {
    const thumb = req.params.thumb;

    const reqPath: string = req.baseUrl.substr(req.baseL).split(thumb).join('');

    const dirPath = `./uploads/${reqPath}`;

    if (!fs.existsSync(dirPath + thumb)) return res.status(404).send('File not found');

    return res.sendFile(path.join(__dirname, `../.${dirPath + thumb}`));
  }


}

export { StreamController };
