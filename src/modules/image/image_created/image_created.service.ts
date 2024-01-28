import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
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

    async getImages(pagination: boolean, pageIndex: number, pageSize: number) {
        const data = pagination
            ? await this.prisma.hinh_anh.findMany({
                take: pageSize,
                skip: pageIndex * pageSize,
            })
            : await this.prisma.hinh_anh.findMany({})
        return ResponseData(HttpStatus.OK, Message.IMAGE.LIST_ALL, data)
    }

    async getImagesWithSavedInfo(nguoi_dung_id: number, pagination: boolean, pageIndex: number, pageSize: number) {
        await this.userService.checkUserExistence(nguoi_dung_id)
        const data = pagination
            ? await this.prisma.hinh_anh.findMany({
                take: pageSize,
                skip: pageIndex * pageSize,
                include: {
                    luu_anh: {
                        where: {
                            da_luu: true,
                            nguoi_dung_id,
                        }
                    }
                },
            })
            : await this.prisma.hinh_anh.findMany({
                include: {
                    luu_anh: {
                        where: {
                            da_luu: true,
                            nguoi_dung_id,
                        }
                    }
                },
            })
        const convertData = data.map(val => ({
            ...val,
            luu_anh: val.luu_anh?.[0]
        }))
        return ResponseData(HttpStatus.OK, Message.IMAGE.LIST_ALL, convertData)
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
            throw new HttpException(Message.IMAGE.DELETE_FAIL_UNAUTHORIZED, HttpStatus.BAD_REQUEST)
        }
        await this.prisma.hinh_anh.delete({
            where: { hinh_id: id }
        })
        return ResponseData(HttpStatus.OK, Message.IMAGE.DELETE_SUCESS, "")
    }

    async uploadImage(nguoi_dung_id: number, file: Express.Multer.File) {
        await this.userService.checkUserExistence(nguoi_dung_id)
        const fileCompressed = await compress_img(file)
        return ResponseData(HttpStatus.OK, Message.IMAGE.UPLOAD_SUCCESS, fileCompressed.filename)
    }

    async uploadImages(nguoi_dung_id: number, file: Express.Multer.File[], ten_hinh: string, mo_ta: string) {

        const uploadedFileNames: string[][] = [];

        for (const f of file) {
            const fileCompressed = await compress_img(f);
            const fileName = fileCompressed.filename;
            const filePath = "public/img_compress/" + fileCompressed.filename

            // Save the file details in the database using Prisma
            uploadedFileNames.push([fileName, filePath]);
        }
        console.log({ uploadedFileNames });

        await this.prisma.hinh_anh.createMany({
            data: uploadedFileNames.map(img => ({
                ten_hinh: ten_hinh ? ten_hinh : img[0],
                mo_ta,
                duong_dan: img[1],
                nguoi_dung_id
            }))
        });
        return ResponseData(HttpStatus.OK, Message.IMAGE.UPLOAD_SUCCESS, "")
    }

    async getImagesUser(nguoi_dung_id: number) {
        const user = await this.userService.checkUserExistence(nguoi_dung_id)
        const images = await this.prisma.hinh_anh.findMany({
            where: { nguoi_dung_id: user.nguoi_dung_id },
            include: { luu_anh: true }
        })
        const convertImages = images.map(item => ({
            ...item,
            luu_anh: item.luu_anh?.[0]
        }))
        return ResponseData(HttpStatus.OK, Message.IMAGE.LIST_UPLOAD, convertImages)
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