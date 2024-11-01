import { Router } from 'express';
import { uploadImage } from '../controllers/uploadControllers.js';
import { upload } from '../middlewares/awsMiddleware.js';

const uploadRouter = Router();

uploadRouter.post(`/`, upload.single('image'), uploadImage);

export default uploadRouter;
