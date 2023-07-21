import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './auth.middleware';
// import { AuthIgnoreMiddleware } from './auth_ignore.middleware';
import { AttachmentsModule } from './attachments/attachments.module';
import { ImagesModule } from './images/images.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AttachmentsModule,
    ImagesModule,
    TestModule,
  ],
  controllers: [],
  providers: [],
})

// Doesn't check token in .env
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(AuthIgnoreMiddleware).forRoutes('*');
//   }
// }

// Authenticate token in .env
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware) // Apply the AuthMiddleware to all routes
      // .exclude({ path: '/api/test', method: RequestMethod.GET }) // Exclude the /api/test route with the GET method
      .forRoutes('*'); // Apply the middleware to all other routes
  }
}
