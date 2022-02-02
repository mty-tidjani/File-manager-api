import { UploadController } from '../controllers/uploadController';
import { Router } from 'express';
import { imgUpload, vidUpload } from '../middlewares/file.upload';
import { loadMeta } from '../middlewares/files.meta';

class UploadRoutes {
  public static initRouter(router: Router) {

    router.post('/uploads/images', imgUpload.array('image'), loadMeta('image'), UploadController.saveMany('image'));

    router.post('/uploads/video', vidUpload.array('video'), loadMeta('video'), UploadController.saveMany('video'));

    return router;
  }
}

export { UploadRoutes };
