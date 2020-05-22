import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

class StreamController{
  public static stream = (req: Request, res: Response<any>, next: NextFunction) => {
    return res.send('Ready to Stream');
  }

  public static videos = (req: Request, res: Response<any>, next: NextFunction) => {
    return res.send('Ready to Stream videos');
  }

  public static images = async (req: Request, res: Response<any>, next: NextFunction) => {
    const img = req.params.img;
    const basePath = './uploads/images/';
    console.log('img', img);
    if (!fs.existsSync(basePath + img)) res.send('File not found')
    const data = await sharp(basePath + img)
    .resize({
      height: 300,
      width: 300,
      fit: 'cover' })
    .withMetadata()
    .toFile('./uploads/images/thanos_out_cover.jpg');
    return res.sendFile(path.join(__dirname, '../../uploads/images/thanos.jpg'));
  }

  public static documents = (req: Request, res: Response<any>, next: NextFunction) => {
    return res.send('Ready to Stream documents (every thing different from videos and images)');
  }
}

export { StreamController };
