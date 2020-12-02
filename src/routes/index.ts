import express, { Request, Response, NextFunction } from 'express';


import { loadMeta, fileUpload } from './middlewares';
import { Controller } from '../controller';

const router = express.Router();


class AppRoutes {
  public static initRoutes() {

    router.post('/uploads/image', fileUpload.array('files'), loadMeta, Controller.create);

    router.use('/img**/:img', (req: any, res: Response<any>, next: NextFunction) => {
      req.baseL = '/img'.length;
      next();
    } ,        Controller.images);

    router.get('/play**/:vid', Controller.videos);

    router.get('/thumb**/:thumb', (req: any, res: Response<any>, next: NextFunction) => {
      req.baseL = '/thumb'.length;
      next();
    } ,        Controller.thumbnail);

    router.get('/doc**/:doc', (req: any, res: Response<any>, next: NextFunction) => {
      req.baseL = '/doc'.length;
      next();
    } ,        Controller.documents);

    router.get('/', (req: Request, res: Response<any>, next: NextFunction) => {
      res.send('<h1 style="text-align: center;padding-top: 10%"> File upload API service <br /> Version: 1.0.0 </h1>');
    });
    
    router.use('/', (req: Request, res: Response<any>, next: NextFunction) => {
      res.status(404).send(`<h1 style="text-align: center;padding-top: 10%">
      File upload API service <br /> Error 404: File not foud </h1>`);
    });
    return router;
  }
}

export { AppRoutes };
