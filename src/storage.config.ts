import { diskStorage } from 'multer';
import { PUBLIC_FOLDER_UPLOAD, PRIVATE_FOLDER_UPLOAD } from './config/config';
import { Logger } from '@nestjs/common';

const logger = new Logger('storage');
logger.log('PUBLIC_FOLDER_UPLOAD', PUBLIC_FOLDER_UPLOAD);

export const storageImages = diskStorage({
  destination: PUBLIC_FOLDER_UPLOAD + '/images',
  filename: (req, file, callback) => {
    callback(null, generateFilename(file));
  },
});

export const storageDocuments = diskStorage({
  destination: PRIVATE_FOLDER_UPLOAD + '/documents',
  filename: (req, file, callback) => {
    callback(null, generateFilename(file));
  },
});

function generateFilename(file) {
  return `${Date.now()}.${file.originalname}`;
}
