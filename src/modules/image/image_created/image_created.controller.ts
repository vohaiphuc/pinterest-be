import { Body, Controller, Delete, Get, Param, ParseBoolPipe, Post, Query, UploadedFiles, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ImageCreatedService } from './image_created.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/auth.guard';
import { TUserAuth } from 'src/modules/auth/dto/user-auth.dto';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.fitler';
import { User } from 'src/common/decorators/user.decorator';
import { UploadImageDto } from '../dto/upload-image.dto';
import { imageInterceptor, imagesInterceptor } from 'src/common/utils/upload-img-utils';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';

@UseFilters(HttpExceptionFilter)
@ApiTags("Image")
@Controller('image')
export class ImageCreatedController {
  constructor(private readonly imageCreatedService: ImageCreatedService) { }

  @Get("/")
  @ApiOperation({ summary: "LẤY: danh sách tất cả hình ảnh" })
  getImages(
    @Query('pagination', new ParseBoolPipe({ optional: true })) pagination: boolean = false,
    @Query('pageIndex', new PaginationPipe(1)) pageIndex: number = 1,
    @Query('pageSize', new PaginationPipe(10)) pageSize: number = 10
  ) {
    return this.imageCreatedService.getImages(pagination, pageIndex, pageSize)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("/saved-info")
  @ApiOperation({ summary: "LẤY: danh sách tất cả hình ảnh, kèm theo thông tin [Đã lưu]" })
  getImagesWithSavedInfo(
    @User("data") data: TUserAuth,
    @Query('pagination', new ParseBoolPipe({ optional: true })) pagination: boolean = false,
    @Query('pageIndex', new PaginationPipe(1)) pageIndex: number = 1,
    @Query('pageSize', new PaginationPipe(10)) pageSize: number = 10
  ) {
    return this.imageCreatedService.getImagesWithSavedInfo(data.nguoi_dung_id, pagination, pageIndex, pageSize)
  }

  @Get("/user-uploaded")
  @ApiOperation({ summary: "LẤY: danh sách hình ảnh mà người dùng (đăng nhập) đã đăng" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getImagesUser(
    @User('data') data: TUserAuth,
  ) {
    const { nguoi_dung_id } = data
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
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.imageCreatedService.getImageDetail(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: "XÓA: hình ảnh theo ID" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  removeImage(
    @User('data') data: TUserAuth,
    @Param('id', ParseIntPipe) id: number
  ) {
    const { nguoi_dung_id } = data
    return this.imageCreatedService.removeImage(nguoi_dung_id, id);
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