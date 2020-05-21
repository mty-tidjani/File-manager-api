import express, { Request, Response, NextFunction } from 'express';
import { StreamRoutes } from './streams.routes';
import { UploadRoutes } from './uploads.routes';

const router = express.Router();

class AppRoutes {
  public static initRoutes() {

    router.use('/', (req: Request, res: Response<any>, next: NextFunction) => {
      res.send('<h1 style="text-align: center;padding-top: 10%"> File upload API service <br /> Version: 1.0.0 </h1>');
    });

    StreamRoutes.initRouter(router);

    UploadRoutes.initRouter(router);

    return router;
  }
}

export { AppRoutes };
