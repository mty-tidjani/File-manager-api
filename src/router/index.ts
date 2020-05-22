import express, { Request, Response, NextFunction } from 'express';
import { StreamRoutes } from './streams.routes';
import { UploadRoutes } from './uploads.routes';

const router = express.Router();

class AppRoutes {
  public static initRoutes() {

    StreamRoutes.initRouter(router);

    UploadRoutes.initRouter(router);

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
