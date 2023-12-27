import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';
import { IUserTokenAuth, TUserAuth } from '../auth/dto/user-auth.dto';
import { HttpExceptionFilter } from 'src/filters/http-exception.fitler';
import { CommentDto } from './dto/comment.dto';
import { User } from 'src/decorators/user.decorator';

@UseFilters(HttpExceptionFilter)
@ApiTags("Bình luận")
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Get(":id")
  @ApiOperation({ summary: "LẤY: danh sách bình luận theo ID hình ảnh" })
  getComments(
    @Param("id") hinh_id: string
  ) {
    return this.commentService.getComments(+hinh_id)
  }

  @Post()
  @ApiOperation({ summary: "ĐĂNG: bình luận" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CommentDto })
  comment(
    @User('data') data: TUserAuth,
    @Body() body: CommentDto,
  ) {
    const { hinh_id, noi_dung } = body
    const { nguoi_dung_id } = data
    return this.commentService.comment(nguoi_dung_id, +hinh_id, noi_dung)
  }
}