import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { JwtStrategy } from './modules/auth/strategy/jwt.strategy';
import { ImageModule } from './modules/image/image.module';
import { CommentModule } from './modules/comment/comment.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ImageModule,
    CommentModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule { }
