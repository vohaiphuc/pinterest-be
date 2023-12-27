import { Module } from '@nestjs/common';
import { ImageCreatedService } from './image_created.service';
import { ImageCreatedController } from './image_created.controller';
import { UserService } from 'src/modules/user/user.service';

@Module({
  controllers: [ImageCreatedController],
  providers: [ImageCreatedService, UserService],
})
export class ImageCreatedModule { }
