import { Request, Response, NextFunction } from 'express';
import Medium from '../model/Medium';

class UploadController {

  public static upload = (req: Request, res: Response<any>, next: NextFunction) => {
    return res.send('We are ready to upload.');
  }

  private static saveMany = async (req: any, res: Response<any>, next: NextFunction, fileType = 'video') => {
    try {
      const tempImgs: any[] = [];
      const basePath = fileType === 'video' ? '/play/' : '/img/';
      req.files.forEach((file: any) => {
        const temp = {
          discr: fileType,
          url: basePath + file.filename ,
          filename: file.filename,
          filepath: file.path,
          mimetype: file.mimetype,
          width: file.meta.width,
          height: file.meta.height,
          size: file.meta.size,
          user: req.userId,
          thumb_url: file.meta.thumbnail ? `/thumb/${file.meta.thumbnail}` : null,
          vid_length: file.meta.duration,
        };
        tempImgs.push(temp);
      });
      const data = await Medium.create(tempImgs);
      // console.log(some);
      return res.status(200).json({ data });
    } catch (err) {
      return next(err);
    }
  }

  private static saveOne = async (req: any, res: Response<any>, next: NextFunction, fileType = 'video') => {
    // console.log('Called--------', req.file, req.thumb);
    const { file } = req;
    const basePath = fileType === 'video' ? '/play/' : '/img/';
    try {
      const tempImgs = [];
      const data: any = new Medium({
        discr: fileType,
        url: basePath + file.filename ,
        filename: file.filename,
        filepath: file.path,
        mimetype: file.mimetype,
        width: file.meta.width,
        height: file.meta.height,
        size: file.meta.size,
        user: req.userId,
        thumb_url: file.meta.thumbnail ? `/thumb/${file.meta.thumbnail}` : null,
        vid_length: file.meta.duration,
      });
      await data.save();
      return res.status(200).json({ data });
    } catch (err) {
      return next(err);
    }
  }

  public static uploadImage = async (req: any, res: Response<any>, next: NextFunction) => {
    await UploadController.saveOne(req, res, next, 'image');
  }

  public static uploadImages = async (req: any, res: Response<any>, next: NextFunction) => {
    await UploadController.saveMany(req, res, next, 'image');
  }

  public static uploadVideo = async (req: any, res: Response<any>, next: NextFunction) => {
    await UploadController.saveOne(req, res, next);
  }

  public static uploadVideos = async (req: any, res: Response<any>, next: NextFunction) => {
    await UploadController.saveMany(req, res, next);
  }
}

export { UploadController };
