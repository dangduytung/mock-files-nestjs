import { Controller, Logger, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('test')
@ApiTags('test')
export class TestController {
  private readonly logger = new Logger(TestController.name);

  @Get()
  test() {
    this.logger.log('Call test');
    return `Test success!`;
  }
}
