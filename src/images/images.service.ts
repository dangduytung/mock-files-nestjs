import { Injectable } from '@nestjs/common';

@Injectable()
export class ImagesService {
  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
