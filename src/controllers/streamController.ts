import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

import { optimize } from '../utils/imgUtils';

/**
 *
 * @class
 *
 */
class StreamController{
  /**
   *
   * @api {method} /vid/:vid Video_stream
   * @apiName file-service-api
   * @apiGroup Stream
   * @apiVersion  1.0.0
   *
   * @apiParam  {Request} req Express request object
   *
   * @apiParam  {Response} res Express response object
   *
   * @apiSuccess (200) {file} file_requested Video file
   *
   */
  public static videos = (req: any, res: Response<any>) => {

    const vid = req.params.vid;

    const reqPath: string = req.baseUrl.substr(req.baseL).split(vid).join('');

    const dirPath = `./uploads/videos${reqPath}`;

    if (!fs.existsSync(dirPath + vid)) return res.status(404).send('File not found');

    return res.sendFile(path.join(__dirname, `../.${dirPath + vid}`));
  }

  /**
   *
   * @api {method} /vid/:vid image_stream
   * @apiName file-service-api
   * @apiGroup Stream
   * @apiVersion  1.0.0
   *
   * @apiParam  {Request} req Express request object
   *
   * @apiParam  {Response} res Express response object
   *
   * @apiSuccess (200) {file} file_requested 'image file'
   *
   */
  public static images = async (req: any, res: Response<any>) => {
    const img = req.params.img;

    const reqPath: string = req.baseUrl.substr(req.baseL).split(img).join('');

    const dirPath = `./uploads/images${reqPath}`;

    const cacheDir = `./uploads/images/.cache${reqPath}`;

    let inUsePath = dirPath;

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

    if (filename !== img) inUsePath = cacheDir;

    if (!fs.existsSync(inUsePath + filename)) {

      options = await optimize(options, path.join(__dirname, `../.${dirPath + img}`));

      let realname = img;

      if (options.width) realname = `${options.width}x${realname}`;

      if (options.height) realname = `${options.height}x${realname}`;

      if (options.fit) realname = `${options.fit}_${realname}`;

      if (!fs.existsSync(inUsePath + realname)) {
        // Create directory to avoid exepction
        if (!fs.existsSync(inUsePath)) fs.mkdirSync(inUsePath);
        await sharp(dirPath + img)
        .resize(options)
        .withMetadata()
        .toFile(inUsePath + realname);
      }

      filename = realname;
    }

    return res.sendFile(path.join(__dirname, `../.${inUsePath + filename}`));
  }

  /**
   *
   * @api {method} /doc/:doc Document Stream
   * @apiName file-service-api
   * @apiGroup Stream
   * @apiVersion  1.0.0
   *
   * @apiParam  {Request} req Express request object
   *
   * @apiParam  {Response} res Express response object
   *
   * @apiParam  {NextFunction} next Express next Function
   *
   * @apiSuccess (200) {file} file_requested Document file
   *
   */
  public static documents = (req: any, res: Response<any>, next: NextFunction) => {
    const doc = req.params.doc;

    const reqPath: string = req.baseUrl.substr(req.baseL).split(doc).join('');

    const dirPath = `./uploads/docs${reqPath}`;

    if (!fs.existsSync(dirPath + doc)) return res.status(404).send('File not found');

    return res.sendFile(path.join(__dirname, `../.${dirPath + doc}`));
  }

  /**
   *
   * @api {Route} /vid/:vid Video Thumbnail Stream
   * @apiName file-service-api
   * @apiGroup Stream
   * @apiVersion  1.0.0
   *
   * @apiParam  {Request} req Express request object
   *
   * @apiParam  {Response} res Express response object
   *
   * @apiParam  {NextFunction} next Express next Function
   *
   * @apiSuccess (200) {file} file_requested Video file
   *
   */
  public static thumbnail = (req: any, res: Response<any>, next: NextFunction) => {
    const thumb = req.params.thumb;

    const reqPath: string = req.baseUrl.substr(req.baseL).split(thumb).join('');

    const dirPath = `./uploads/${reqPath}`;

    if (!fs.existsSync(dirPath + thumb)) return res.status(404).send('File not found');

    return res.sendFile(path.join(__dirname, `../.${dirPath + thumb}`));
  }


}

export { StreamController };
