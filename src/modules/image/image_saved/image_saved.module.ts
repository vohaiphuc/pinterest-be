import { Module } from '@nestjs/common';
import { ImageSavedService } from './image_saved.service';
import { ImageSavedController } from './image_saved.controller';
import { UserService } from 'src/modules/user/user.service';

@Module({
  controllers: [ImageSavedController],
  providers: [ImageSavedService, UserService],
})
export class ImageSavedModule { }
