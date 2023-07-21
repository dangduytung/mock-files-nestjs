import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  Get,
  Res,
  Query,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AttachmentsService } from './attachments.service';
import { storageDocuments } from './../storage.config';
import {
  PRIVATE_FOLDER_UPLOAD,
  FILE_UPLOADS_MAX_NUMBER,
} from 'src/config/config';
import * as fs from 'fs';
import { ApiTags } from '@nestjs/swagger';

@Controller('attachments')
@ApiTags('attachments')
export class AttachmentsController {
  private readonly logger = new Logger(AttachmentsController.name);

  constructor(private readonly attachmentsService: AttachmentsService) {}

  extractFilenameFromPath(input: string): string {
    const filename = path.basename(input);
    return filename;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage: storageDocuments }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No files uploaded.'); // Use `throw` to handle exceptions
    }

    this.logger.log(file);

    // Handle the uploaded file
    const res = { path: '/documents/' + file?.filename };
    return res;
  }

  @Post('uploads')
  @UseInterceptors(
    FilesInterceptor('files', FILE_UPLOADS_MAX_NUMBER, {
      storage: storageDocuments,
    }),
  )
  uploadMultiple(@UploadedFiles() files) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded.'); // Use `throw` to handle exceptions
    }

    this.logger.log(files);

    const res = [];
    files.forEach((file) => {
      res.push({ path: '/documents/' + file?.filename });
    });
    return res;
  }

  @Get('download')
  downloadFile(@Query('file') file: string, @Res() res: Response): void {
    // const filePath = join(__dirname, '..', 'documents', file); // Adjust the path according to your directory structure
    if (!file) {
      res.status(400).json({ message: 'What file?' });
      return;
    }
    const filePath = PRIVATE_FOLDER_UPLOAD + file;
    const filename = this.extractFilenameFromPath(file);

    this.logger.log('filePath', filePath, 'filename', filename);

    // res.setHeader('Content-Disposition', `attachment; filename="${file}"`);
    // res.sendFile(filePath);

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      res.download(filePath, filename);
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  }
}
