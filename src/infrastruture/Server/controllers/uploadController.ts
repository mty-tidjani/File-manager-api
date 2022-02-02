import { Response, NextFunction } from 'express';
import Medium from '../../DAO/MediumModel';

class UploadController {

  // public static upload = (req: Request, res: Response<any>, next: NextFunction) => {
  //   return res.send('We are ready to upload.');
  // }

  static saveMany = (fileType = 'video') => async (req: any, res: Response<any>, next: NextFunction) => {
    try {
      const basePath = fileType === 'video' ? '/play/' : '/img/';

      const tempImgs = req.files.map((file: any) => ({
        discr: fileType,
        url: basePath + file.filename,
        filename: file.filename,
        filepath: file.path,
        mimetype: file.mimetype,
        width: file.meta.width,
        height: file.meta.height,
        size: file.meta.size,
        user: req.userId,
        thumb_url: file.meta.thumbnail ? `/thumb/${file.meta.thumbnail}` : null,
        vid_length: file.meta.duration,

      }));

      const data = await Medium.create(tempImgs);

      return res.status(200).json({ data });

    } catch (err) {

      return next(err);

    }
  }
}

export { UploadController };
