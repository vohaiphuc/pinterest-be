import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { UserService } from '../user/user.service';
import { ImageCreatedService } from '../image/image_created/image_created.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService, UserService, ImageCreatedService],
})
export class CommentModule { }
