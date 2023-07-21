import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { storageImages } from 'src/storage.config';
import { FILE_UPLOADS_MAX_NUMBER } from 'src/config/config';
import { ApiTags } from '@nestjs/swagger';

@Controller('images')
@ApiTags('images')
export class ImagesController {
  private readonly logger = new Logger(ImagesController.name);

  @Post('upload')
  @UseInterceptors(FileInterceptor('image', { storage: storageImages }))
  uploadSingle(@UploadedFile() file) {
    if (!file) {
      throw new BadRequestException('No files uploaded.'); // Use `throw` to handle exceptions
    }

    this.logger.log(file);
    this.logger.log(file);

    const res = { path: '/static/images/' + file?.filename };
    return res;
  }

  @Post('uploads')
  @UseInterceptors(
    FilesInterceptor('images', FILE_UPLOADS_MAX_NUMBER, {
      storage: storageImages,
    }),
  )
  uploadMultiple(@UploadedFiles() files) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded.'); // Use `throw` to handle exceptions
    }

    this.logger.log(files);
    this.logger.log(files);

    const res = [];
    files.forEach((file) => {
      res.push({ path: '/static/images/' + file?.filename });
    });
    return res;
  }
}
