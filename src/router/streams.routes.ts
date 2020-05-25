import { StreamController } from '../controllers/streamController';
import { Router, Request, Response, NextFunction } from 'express';

class StreamRoutes {
  public static initRouter(router: Router) {

    router.use('/img**/:img', (req: Request, res: Response<any>, next: NextFunction) => {
      // Todo: take into consideration subpath.
      // console.log(req.url);
      // console.log(req.baseUrl);
      // console.log(req.originalUrl);
      next();
    } ,        StreamController.images);

    router.get('/play**/:vid', StreamController.videos);

    router.get('/thumb**/:thumb', StreamController.thumbnail);

    router.get('/doc**/:doc', StreamController.documents);

    return router;
  }
}

export { StreamRoutes };
