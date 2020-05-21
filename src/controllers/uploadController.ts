import { Request, Response, NextFunction } from 'express';

class UploadController {
  public static upload = (req: Request, res: Response<any>, next: NextFunction) => {
    return res.send('We are ready to upload.');
  }
}

export { UploadController };
