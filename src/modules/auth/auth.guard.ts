import {
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        if (!user && info) {
            throw new HttpException(`${info.name}: ${info.message}`, HttpStatus.UNAUTHORIZED)
        }
        if (err || (!user && info.name === "TokenExpiredError" && info.message === "jwt expired")) {
            throw err || new HttpException("Token hết hạn", HttpStatus.UNAUTHORIZED)
        }
        return user;
    }
}