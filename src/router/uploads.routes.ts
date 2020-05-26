import { UploadController } from '../controllers/uploadController';
import { Router } from 'express';
import { imgUpload, vidUpload, docUpload } from '../middlewares/file.upload';
import { loadManyMeta, loadSingleMeta } from '../middlewares/files.meta';

class UploadRoutes {
  public static initRouter(router: Router) {

    router.post('/uploads/image', imgUpload.single('image'), loadSingleMeta('image'), UploadController.uploadImage);

    router.post('/uploads/images', imgUpload.array('image'), loadManyMeta('image'), UploadController.uploadImages);

    router.post('/uploads/video', vidUpload.single('video'), loadSingleMeta('video'), UploadController.uploadVideo);

    router.post('/uploads/videos', vidUpload.array('video'), loadManyMeta('video'), UploadController.uploadVideos);

    // router.post('/uploads/document', docUpload.single('file'), UploadController.upload);

    // router.post('/uploads/documents', docUpload.array('files'), UploadController.upload);

    return router;
  }
}

export { UploadRoutes };
