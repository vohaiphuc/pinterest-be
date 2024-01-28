import { Controller, Get, Req, HttpException, HttpStatus, UseGuards, Put, UseFilters, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';
import { TUserAuth } from '../auth/dto/user-auth.dto';
import { User } from 'src/common/decorators/user.decorator';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.fitler';
import { UpdateInfoDto, UpdatePasswordDto } from './dto/update-user.dto';
import { UploadImageDto } from '../image/dto/upload-image.dto';
import { imageInterceptor } from 'src/common/utils/upload-img-utils';
import { UpdateAvatarDto } from '../image/dto/update-avatar.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseFilters(HttpExceptionFilter)
@ApiTags("User")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get("info")
  @ApiOperation({ summary: 'LẤY: thông tin người dùng' })
  getInfo(
    @User('data') data: TUserAuth,
  ) {
    return this.userService.getInfo(data.nguoi_dung_id)
  }

  @Put("update-info")
  @ApiOperation({ summary: 'CẬP NHẬT: thông tin người dùng' })
  @ApiBody({ type: UpdateInfoDto })
  updateInfo(
    @User('data') data: TUserAuth,
    @Body() body: UpdateInfoDto,
  ) {
    const { nguoi_dung_id } = data
    const { ho_ten, ngay_sinh } = body
    return this.userService.updateInfo(nguoi_dung_id, ho_ten, ngay_sinh)
  }

  @Put("update-password")
  @ApiOperation({ summary: "CẬP NHẬT: mật khẩu" })
  @ApiBody({ type: UpdatePasswordDto })
  updatePassword(
    @User("data") data: TUserAuth,
    @Body() body: UpdatePasswordDto,
  ) {
    const { nguoi_dung_id } = data
    const { mat_khau, mat_khau_moi } = body
    return this.userService.updatePassword(nguoi_dung_id, mat_khau, mat_khau_moi)
  }

  @Put("update-avatar")
  @UseInterceptors(imageInterceptor)
  @ApiOperation({ summary: "CẬP NHẬT: ảnh đại diện" })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateAvatarDto })
  updateAvatar(
    @User("data") data: TUserAuth,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log("🚀 ~ file: user.controller.ts:62 ~ UserController ~ file:", file)
    const { nguoi_dung_id } = data
    return this.userService.updateAvatar(nguoi_dung_id, file)
  }
}