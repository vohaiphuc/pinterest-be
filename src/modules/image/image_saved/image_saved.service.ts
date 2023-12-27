import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Message } from 'src/common/constants/message.const';
import { ResponseData } from 'src/common/utils/response.utils';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class ImageSavedService {
    constructor(
        private readonly userService: UserService
    ) { }
    prisma = new PrismaClient()

    async getSavedImages(nguoi_dung_id: number) {
        await this.userService.checkUserExistence(nguoi_dung_id)
        const data = await this.prisma.luu_anh.findMany({
            where: { nguoi_dung_id }
        })
        return ResponseData(HttpStatus.OK, Message.IMAGE.LIST_SAVE, data)
    }

    async saveImage(nguoi_dung_id: number, hinh_id: number, save: boolean) {
        await this.userService.checkUserExistence(nguoi_dung_id)
        const isSavedImage = await this.prisma.luu_anh.findFirst({
            where: { nguoi_dung_id, hinh_id }
        })

        const newData = {
            nguoi_dung_id,
            hinh_id,
            ngay_luu: new Date(),
            da_luu: save,
        }

        if (isSavedImage) {
            await this.prisma.luu_anh.updateMany({
                where: { nguoi_dung_id, hinh_id },
                data: newData,
            })
        } else {
            await this.prisma.luu_anh.create({
                data: { ...newData }
            })
        }
        return ResponseData(
            HttpStatus.OK,
            newData.da_luu ? Message.IMAGE.SAVED : Message.IMAGE.UNSAVED,
            newData
        )
    }

    async isSaved(nguoi_dung_id: number, hinh_id: number) {
        await this.userService.checkUserExistence(nguoi_dung_id)
        const isSavedImage = await this.prisma.luu_anh.findFirst({
            where: { nguoi_dung_id, hinh_id }
        })
        return (isSavedImage && isSavedImage.da_luu)
            ? ResponseData(HttpStatus.OK, Message.IMAGE.SAVED, isSavedImage)
            : ResponseData(HttpStatus.OK, Message.IMAGE.NOTSAVED, null)
    }
}
