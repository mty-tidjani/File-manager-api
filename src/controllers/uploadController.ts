import { Request, Response, NextFunction } from 'express';
import Medium from '../model/Medium';

class UploadController {

  public static upload = (req: Request, res: Response<any>, next: NextFunction) => {
    return res.send('We are ready to upload.');
  }

  private static registerMany = async (req: any, res: Response<any>, next: NextFunction) => {
    try {
      const tempImgs: any[] = [];
      req.files.forEach((file: any) => {
        const temp = {
          discr: 'image',
          url: `/img/${file.filename}`,
          filename: file.filename,
          filepath: file.path,
          width: file.meta.width,
          height: file.meta.height,
          size: file.meta.size,
          mimetype: file.mimetype,
          user: req.userId,
        };
        tempImgs.push(temp);
      });
      const temps = await Medium.create(tempImgs);
      // console.log(some);
      return res.status(200).json({ temps });
    } catch (err) {
      return next(err);
    }
  }
  
}

export { UploadController };
