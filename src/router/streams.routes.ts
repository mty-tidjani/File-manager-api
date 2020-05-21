import { StreamController } from '../controllers/streamController';
import { Router } from 'express';

class StreamRoutes {
  public static initRouter(router: Router) {

    router.get('/img', StreamController.images);

    router.get('/play', StreamController.videos);

    router.get('/doc', StreamController.documents);

    return router;
  }
}

export { StreamRoutes };
