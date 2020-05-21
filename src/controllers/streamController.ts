import { Request, Response, NextFunction } from 'express';

class StreamController{
  public static stream = (req: Request, res: Response<any>, next: NextFunction) => {
    return res.send('Ready to Stream');
  }
}

export { StreamController };
