import multer from 'multer';
import { Request } from 'express';


const imgStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: any) => {
    cb(null, 'uploads/images');
  },
  filename: (req: Request, file: Express.Multer.File, cb: any) => {
    cb(null, `${Date.now()}_${file.originalname.split(' ').join('_').toLowerCase()}`);
  },
});

const imgFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  const resp = ['image/png', 'image/jpg', 'image/jpeg'].indexOf(file.mimetype) >= 0;
  cb(null, resp);
};

const vidStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: any) => {
    cb(null, 'uploads/videos');
  },
  filename: (req: Request, file: Express.Multer.File, cb: any) => {
    cb(null, `${Date.now()}_${file.originalname.replace(' ', '_').toLowerCase()}`);
  },
});

const vidFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  const resp = ['video/x-flv', 'video/mp4', 'video/3gpp', 'video/quicktime',
  'video/x-msvideo', 'video/x-ms-wmv'].indexOf(file.mimetype) >= 0;
  cb(null, resp);
};

const docStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: any) => {
    cb(null, 'uploads/docs/');
  },
  filename: (req: Request, file: Express.Multer.File, cb: any) => {
    cb(null, `${Date.now()}_${file.originalname.split(' ').join('_').toLowerCase()}`);
  },
});

export const imgUpload = multer({ storage: imgStorage, fileFilter: imgFilter });

export const vidUpload = multer({ storage: vidStorage, fileFilter: vidFilter });

export const docUpload = multer({ storage: docStorage });
