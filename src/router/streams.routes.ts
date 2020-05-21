import { StreamController } from '../controllers/streamController';

class StreamRoutes {
  public static initRouter(router: any) {

    router.use('/img', StreamController.images);

    router.use('/play', StreamController.videos);

    router.use('/doc', StreamController.documents);

    return router;
  }
}

export { StreamRoutes };
