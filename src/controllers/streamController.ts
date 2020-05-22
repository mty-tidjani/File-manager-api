import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';

class StreamController{
  public static stream = (req: Request, res: Response<any>, next: NextFunction) => {
    return res.send('Ready to Stream');
  }

  public static videos = (req: Request, res: Response<any>, next: NextFunction) => {
    return res.send('Ready to Stream videos');
  }

  public static images = (req: Request, res: Response<any>, next: NextFunction) => {
    sharp(input)
    .resize({ height: 100 })
    .toBuffer()
    .then(data => {
      // 100 pixels high, auto-scaled width
    });
    return res.send('Ready to Stream images');
  }

  public static documents = (req: Request, res: Response<any>, next: NextFunction) => {
    return res.send('Ready to Stream documents (every thing different from videos and images)');
  }
}

export { StreamController };
