import { UploadController } from '../controllers/uploadController';

class UploadRoutes {
  public static initRouter(router: any) {

    router.use('/uploads', UploadController.upload);

    return router;
  }
}

export { UploadRoutes };
