import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Query, Req, UploadedFile, UploadedFiles, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ImageCreatedService } from './image_created.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/auth.guard';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { IUserDataAuth, IUserTokenAuth, TUserAuth } from 'src/modules/auth/dto/user-auth.dto';
import { HttpExceptionFilter } from 'src/filters/http-exception.fitler';
import { User } from 'src/decorators/user.decorator';
import { UploadImageDto } from '../dto/upload-image.dto';
import { imageInterceptor, imagesInterceptor } from 'src/common/utils/upload-img-utils';

@UseFilters(HttpExceptionFilter)
@ApiTags("Image")
@Controller('image')
export class ImageCreatedController {
  constructor(private readonly imageCreatedService: ImageCreatedService) { }

  @Get("/")
  @ApiOperation({ summary: "LẤY: danh sách tất cả hình ảnh" })
  getImages() {
    return this.imageCreatedService.getImages()
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("/saved-info")
  @ApiOperation({ summary: "LẤY: danh sách tất cả hình ảnh, kèm theo thông tin [Đã lưu]" })
  getImagesWithSavedInfo(
    @User("data") data: TUserAuth
  ) {
    return this.imageCreatedService.getImagesWithSavedInfo(data.nguoi_dung_id)
  }

  @Get("/user-uploaded")
  @ApiOperation({ summary: "LẤY: danh sách hình ảnh mà người dùng (đăng nhập) đã đăng" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getImagesUser(
    @Req() req: Request & { user: IUserTokenAuth }
  ) {
    const nguoi_dung_id: number = req.user.data.nguoi_dung_id
    return this.imageCreatedService.getImagesUser(nguoi_dung_id)
  }

  @Get("/search")
  @ApiOperation({ summary: "LẤY: danh sách hình ảnh theo từ khóa tìm kiếm" })
  findImages(
    @Query('s') s: string
  ) {
    return this.imageCreatedService.searchImage(s)
  }

  @Get('/detail/:id')
  @ApiOperation({ summary: "LẤY: thông tin hình ảnh theo ID" })
  getImageDetail(
    @Param('id') id: string
  ) {
    return this.imageCreatedService.getImageDetail(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: "XÓA: hình ảnh theo ID" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  removeImage(
    @Req() req: Request & { user: IUserTokenAuth },
    @Param('id') id: string
  ) {
    const nguoi_dung_id: number = req.user.data.nguoi_dung_id
    return this.imageCreatedService.removeImage(nguoi_dung_id, +id);
  }

  @Post("upload")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(imagesInterceptor)
  @ApiOperation({ summary: "ĐĂNG: hình ảnh" })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadImageDto })
  uploadImage(
    @User("data") data: TUserAuth,
    @UploadedFiles() file: Express.Multer.File[],
    @Body('ten_hinh') ten_hinh: string,
    @Body('mo_ta') mo_ta?: string,
  ) {
    const { nguoi_dung_id } = data
    return this.imageCreatedService.uploadImages(nguoi_dung_id, file, ten_hinh, mo_ta)
  }
}