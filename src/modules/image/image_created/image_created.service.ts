import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ResponseData } from 'src/common/utils/response.utils';
import * as compress_images from 'compress-images';
import { UserService } from 'src/modules/user/user.service';
import { Message } from 'src/common/constants/message.const';
import { compress_img } from 'src/common/utils/compress-img.utils';

@Injectable()
export class ImageCreatedService {
    constructor(
        private readonly userService: UserService
    ) { }
    prisma = new PrismaClient()

    async getImages() {
        const data = await this.prisma.hinh_anh.findMany({})
        return ResponseData(HttpStatus.OK, Message.IMAGE.LIST_ALL, data)
    }

    async searchImage(s: string) {
        const data = await this.prisma.hinh_anh.findMany({
            where: {
                ten_hinh: {
                    contains: s
                }
            }
        })
        return ResponseData(HttpStatus.OK, Message.IMAGE.LIST_SEARCH, data)
    }

    async getImageDetail(id: number) {
        const data = await this.prisma.hinh_anh.findFirst({
            where: { hinh_id: id },
            include: {
                nguoi_dung: {
                    select: {
                        email: true,
                        ho_ten: true,
                        tuoi: true,
                        anh_dai_dien: true,
                    }
                }
            }
        })
        return ResponseData(HttpStatus.OK, Message.IMAGE.DETAIL, data)
    }

    async removeImage(nguoi_dung_id: number, id: number) {
        const user = await this.userService.checkUserExistence(nguoi_dung_id)
        const image = await this.prisma.hinh_anh.findFirst({
            where: { hinh_id: id }
        })
        if (!image) {
            throw new HttpException(Message.IMAGE.DELETE_FAIL_INVALID, HttpStatus.BAD_REQUEST)
        }
        if (user.nguoi_dung_id !== image.nguoi_dung_id) {
            return new HttpException(Message.IMAGE.DELETE_FAIL_UNAUTHORIZED, HttpStatus.BAD_REQUEST)
        }
        await this.prisma.hinh_anh.delete({
            where: { hinh_id: id }
        })
        return ResponseData(HttpStatus.OK, Message.IMAGE.DELETE_SUCESS, "")
    }

    async uploadImage(nguoi_dung_id: number, file: Express.Multer.File) {
        await this.userService.checkUserExistence(nguoi_dung_id)
        const fileCompressed = compress_img(file)
        return ResponseData(HttpStatus.OK, Message.IMAGE.UPLOAD_SUCCESS, fileCompressed.filename)
    }

    async getImagesUser(nguoi_dung_id: number) {
        const user = await this.userService.checkUserExistence(nguoi_dung_id)
        const images = await this.prisma.hinh_anh.findMany({
            where: { nguoi_dung_id: user.nguoi_dung_id }
        })
        return ResponseData(HttpStatus.OK, Message.IMAGE.LIST_UPLOAD, images)
    }

    async checkImageExistence(hinh_id: number) {
        const image = await this.prisma.hinh_anh.findFirst({
            where: { hinh_id }
        })
        if (!image) {
            throw new HttpException(Message.IMAGE.NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        return image
    }
}