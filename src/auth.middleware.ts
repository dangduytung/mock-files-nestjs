import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
// import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private TOKEN: string = process.env.TOKEN;
  private readonly logger = new Logger(AuthMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    // this.logger.log(req.protocol + '://' + req.get('host') + req.originalUrl);
    this.logger.log('url ' + req.originalUrl);

    if (!authHeader) {
      return res.status(401).send({ message: 'Authorization header missing' });
    }

    const [bearer, token] = authHeader.split(' ');
    this.logger.log('token ' + token);

    if (bearer !== 'Bearer' || !token) {
      return res.status(401).send({ message: 'Invalid token format' });
    }

    if (token !== this.TOKEN) {
      return res.status(401).send({ message: 'Invalid token' });
    }

    try {
      // const decoded = jwt.verify(token, 'your-secret-key');
      // req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).send({ message: 'Invalid or expired token' });
    }
  }
}
