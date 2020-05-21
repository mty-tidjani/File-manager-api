import { StreamController } from '../controllers/streamController';

class StreamRoutes {
  public static initRouter(router: any) {

    router.use('/stream', StreamController.stream);

    return router;
  }
}

export { StreamRoutes };
