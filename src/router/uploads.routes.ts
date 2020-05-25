import { UploadController } from '../controllers/uploadController';
import { Router } from 'express';
import { imgUpload, vidUpload, docUpload } from '../middlewares/file.upload';
import { loadManyMeta } from '../middlewares/files.meta';

class UploadRoutes {
  public static initRouter(router: Router) {

    router.post('/uploads', UploadController.upload);

    router.post('/uploads/image', imgUpload.single('image'), , UploadController.upload);

    router.post('/uploads/images', imgUpload.array('image'), loadManyMeta('image'), UploadController.upload);

    router.post('/uploads/video', vidUpload.single('video'), loadSingleMeta(), UploadController.upload);

    router.post('/uploads/videos', vidUpload.array('video'), loadManyMeta('video'), UploadController.upload);

    router.post('/uploads/document', docUpload.single('file'), UploadController.upload);

    router.post('/uploads/documents', docUpload.array('files'), UploadController.upload);

    return router;
  }
}

export { UploadRoutes };
