import { Request, Response, NextFunction } from 'express';

class StreamController{
  public static stream = (req: Request, res: Response<any>, next: NextFunction) => {
    return res.send('Ready to Stream');
  }

  public static videos = (req: Request, res: Response<any>, next: NextFunction) => {
    return res.send('Ready to Stream images');
  }

  public static images = (req: Request, res: Response<any>, next: NextFunction) => {
    return res.send('Ready to Stream videos');
  }

  public static documents = (req: Request, res: Response<any>, next: NextFunction) => {
    return res.send('Ready to Stream documents (every thing different from videos and images)');
  }
}

export { StreamController };
