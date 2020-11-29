import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

import { optimize } from '../core/utils/imgUtils';
import { Medium, IMedium } from "../models/Medium";
import { mediaTCD, mediaSCD } from '../core/constants/type.codes';
import { accessPaths } from '../core/constants/global';
import { isArray } from 'util';
import { FileWithMeta } from '../types';
/**
 *
 * @class
 *
 */
class Controller{

  public static create = async (req: Request, res: Response<any>, next: NextFunction) => {
    try {
      const tempImgs: any[] = [];


      if (isArray(req.files)) 
      req.files.forEach((file: FileWithMeta) => {
        let more = {
          tcd: mediaTCD.document,
          urlPath: accessPaths.docs
        }

        if (file.mimetype.split('video').length > 1) {
          more.tcd = mediaTCD.video;
          more.urlPath = accessPaths.video
        }else if (file.mimetype.split('image').length > 1) {
          more.tcd = mediaTCD.image;
          more.urlPath = accessPaths.image
        }

        const temp = {
          tcd: more.tcd,
          scd: mediaSCD.inUse,
          url: more.urlPath + '/' + file.filename,
          fname: file.filename,
          path: file.path,
          mimetype: file.mimetype,
          width: file.meta?.width ? file.meta.width : null,
          height: file.meta?.height ? file.meta.height : null,
          size: file.meta?.size ? file.meta.size : null,
          thumb: file.meta?.thumbnail ? `/thumb/${file.meta.thumbnail}` : null,
          length: file.meta?.duration ? file.meta.duration : null,
          ext: file.filename.split('.')[1],
        };

        tempImgs.push(temp);
      });

      const data = await Medium.create(tempImgs);

      return res.status(200).json({ data });

    } catch (err) {

      return next(err);

    }
  }

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
  public static videos = (req: Request, res: Response<any>) => {

    const { baseL }: any = req;

    const vid = req.params.vid;

    const reqPath: string = req.baseUrl.substr(baseL).split(vid).join('');

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
    const { img } = req.params;
    const { baseL }: any = req;

    const reqPath: string = req.baseUrl.substr(baseL).split(img).join('');

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
    const { doc } = req.params;
    const { baseL }: any = req;

    const reqPath: string = req.baseUrl.substr(baseL).split(doc).join('');

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
    const { thumb } = req.params;
    const { baseL }: any = req;

    const reqPath: string = req.baseUrl.substr(baseL).split(thumb).join('');

    const dirPath = `./uploads/${reqPath}`;

    if (!fs.existsSync(dirPath + thumb)) return res.status(404).send('File not found');

    return res.sendFile(path.join(__dirname, `../.${dirPath + thumb}`));
  }


}

export { Controller };
