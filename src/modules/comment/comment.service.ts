import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient, binh_luan } from '@prisma/client';
import { ResponseData } from 'src/common/utils/response.utils';
import { UserService } from '../user/user.service';
import { Message } from 'src/common/constants/message.const';
import { ImageCreatedService } from '../image/image_created/image_created.service';

@Injectable()
export class CommentService {
    constructor(
        private readonly userService: UserService,
        private readonly imageCreatedService: ImageCreatedService,
    ) { }
    prisma = new PrismaClient()

    async getComments(hinh_id: number) {
        const data = await this.prisma.binh_luan.findMany({
            where: { hinh_id },
            include: {
                nguoi_dung: {
                    select: {
                        ho_ten: true,
                        anh_dai_dien: true,
                    }
                }
            }
        })
        return ResponseData(HttpStatus.OK, Message.COMMENT.LIST_ALL, data)
    }

    async comment(nguoi_dung_id: number, hinh_id: number, noi_dung: string) {
        await this.userService.checkUserExistence(nguoi_dung_id)
        await this.imageCreatedService.checkImageExistence(hinh_id)
        const newComment: Partial<binh_luan> = {
            nguoi_dung_id,
            hinh_id,
            ngay_binh_luan: new Date(),
            noi_dung,
        }
        await this.prisma.binh_luan.create({
            data: newComment
        })
        return ResponseData(HttpStatus.OK, Message.COMMENT.SUCCESS, "")
    }

    async delete(nguoi_dung_id: number, binh_luan_id: number) {
        const comment = await this.prisma.binh_luan.findUnique({
            where: { binh_luan_id }
        })
        if (!comment) {
            throw new HttpException(Message.COMMENT.DELETE_FAIL_NONEXISTED, HttpStatus.UNAUTHORIZED)
        }
        // verify ownership
        if (comment.nguoi_dung_id !== nguoi_dung_id) {
            throw new HttpException(Message.COMMENT.DELETE_FAIL_UNAUTHORIZED, HttpStatus.UNAUTHORIZED)
        }
        await this.prisma.binh_luan.delete({
            where: { binh_luan_id }
        })
        return ResponseData(HttpStatus.OK, Message.COMMENT.DELETE_SUCESS, "")
    }
}