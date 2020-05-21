import { UploadController } from '../controllers/uploadController';
import { Router } from 'express';

class UploadRoutes {
  public static initRouter(router: Router) {

    router.post('/uploads', UploadController.upload);

    return router;
  }
}

export { UploadRoutes };
