import { StreamController } from '../controllers/streamController';
import { Router, Request, Response, NextFunction } from 'express';

class StreamRoutes {
  public static initRouter(router: Router) {

    router.use('/img**/:img', (req: any, res: Response<any>, next: NextFunction) => {
      req.baseL = '/img'.length;
      next();
    } ,        StreamController.images);

    router.get('/play**/:vid', (req: any, res: Response<any>, next: NextFunction) => {
      req.baseL = '/play'.length;
      next();
    } ,        StreamController.videos);

    router.get('/thumb**/:thumb', (req: any, res: Response<any>, next: NextFunction) => {
      req.baseL = '/thumb'.length;
      next();
    } ,        StreamController.thumbnail);

    router.get('/doc**/:doc', (req: any, res: Response<any>, next: NextFunction) => {
      req.baseL = '/doc'.length;
      next();
    } ,        StreamController.documents);

    return router;
  }
}

export { StreamRoutes };
