import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ImageCreatedModule } from './image_created/image_created.module';
import { ImageSavedModule } from './image_saved/image_saved.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: "."
    }),
    ImageCreatedModule,
    ImageSavedModule,
  ],
  controllers: [],
  providers: [],
})
export class ImageModule { }
