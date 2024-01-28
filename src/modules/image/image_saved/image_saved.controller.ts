import { Controller, Get, Param, Post, UseFilters, UseGuards } from '@nestjs/common';
import { ImageSavedService } from './image_saved.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/auth.guard';
import { TUserAuth } from 'src/modules/auth/dto/user-auth.dto';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.fitler';
import { User } from 'src/common/decorators/user.decorator';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseFilters(HttpExceptionFilter)
@ApiTags("Lưu ảnh")
@Controller('saved-image')
export class ImageSavedController {
  constructor(private readonly imageSavedService: ImageSavedService) { }

  @Get("")
  @ApiOperation({ summary: "LẤY: danh sách hình ảnh người dùng (đăng nhập) đã lưu" })
  getSavedImages(
    @User('data') { nguoi_dung_id }: TUserAuth,
  ) {
    return this.imageSavedService.getSavedImages(nguoi_dung_id)
  }

  @Get("/check/:id")
  @ApiOperation({ summary: "LẤY: thông tin hình ảnh đã lưu / chưa lưu theo ID" })
  isSaved(
    @User('data') { nguoi_dung_id }: TUserAuth,
    @Param('id') hinh_id: string,
  ) {
    return this.imageSavedService.isSaved(nguoi_dung_id, +hinh_id)
  }

  @Post("/save/:id")
  @ApiOperation({ summary: "Lưu hình ảnh" })
  saveImage(
    @User('data') { nguoi_dung_id }: TUserAuth,
    @Param('id') hinh_id: string,
  ) {
    return this.imageSavedService.saveImage(nguoi_dung_id, +hinh_id, true)
  }

  @Post("/unsave/:id")
  @ApiOperation({ summary: "Bỏ lưu hình ảnh" })
  unsaveImage(
    @User('data') { nguoi_dung_id }: TUserAuth,
    @Param('id') hinh_id: string,
  ) {
    return this.imageSavedService.saveImage(nguoi_dung_id, +hinh_id, false)
  }
}