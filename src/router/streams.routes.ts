import { StreamController } from '../controllers/streamController';
import { Router, Request, Response, NextFunction } from 'express';

class StreamRoutes {
  public static initRouter(router: Router) {

    router.use('/img**/:img', (req: Request, res: Response<any>, next: NextFunction) => {
      console.log(req.url);
      console.log(req.baseUrl);
      console.log(req.originalUrl);
      next();
    } ,        StreamController.images);

    router.get('/play', StreamController.videos);

    router.get('/doc', StreamController.documents);

    return router;
  }
}

export { StreamRoutes };
