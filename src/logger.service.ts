// logger.service.ts
import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info', // Set the desired log level
      format: winston.format.json(), // Choose the log format
      defaultMeta: { service: 'nest-test' }, // Optional metadata to include in each log entry
      transports: [
        new winston.transports.File({ filename: 'logs/app.log' }), // Log to a file
        new winston.transports.Console(), // Log to the console
      ],
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }
}
