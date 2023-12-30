import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient, nguoi_dung } from '@prisma/client';
import { Message } from 'src/common/constants/message.const';
import { ResponseData } from 'src/common/utils/response.utils';
import * as bcrypt from 'bcrypt'
import { compress_img } from 'src/common/utils/compress-img.utils';

@Injectable()
export class UserService {
  prisma = new PrismaClient()

  async checkUserExistence(nguoi_dung_id: number): Promise<nguoi_dung> {
    if (!nguoi_dung_id) {
      throw new HttpException(Message.USER.NOT_FOUND, HttpStatus.NOT_FOUND, { cause: "nguoi_dung_id is " + nguoi_dung_id })
    }
    const user = await this.prisma.nguoi_dung.findFirstOrThrow({
      where: { nguoi_dung_id }
    })
    if (!user) {
      throw new HttpException(Message.USER.NOT_FOUND, HttpStatus.NOT_FOUND)
    }
    return user
  }

  async checkUserRegister(email: string): Promise<nguoi_dung> {
    return await this.prisma.nguoi_dung.findFirst({
      where: { email }
    })
  }

  async getInfo(nguoi_dung_id: number) {
    const user = await this.checkUserExistence(nguoi_dung_id)
    const { email, ho_ten, tuoi, anh_dai_dien } = user
    const data = { nguoi_dung_id, email, ho_ten, tuoi, anh_dai_dien }
    return ResponseData(HttpStatus.OK, Message.USER.SUCCESS, data)
  }

  async updateInfo(nguoi_dung_id: number, ho_ten: string, ngay_sinh: Date) {
    const user = await this.checkUserExistence(nguoi_dung_id)
    const newData = {
      ho_ten,
      tuoi: new Date().getFullYear() - new Date(ngay_sinh).getFullYear()
    }
    await this.prisma.nguoi_dung.update(
      {
        where: { nguoi_dung_id: user.nguoi_dung_id },
        data: newData
      })
    return ResponseData(HttpStatus.OK, Message.USER.UPDATE_INFO_SUCCESS, newData)
  }

  async updatePassword(nguoi_dung_id: number, mat_khau: string, mat_khau_moi: string) {
    const user = await this.checkUserExistence(nguoi_dung_id)

    if (!bcrypt.compareSync(mat_khau, user.mat_khau)) {
      throw new HttpException(Message.USER.UPDATE_PASSWORD_FAIL_INCORRECT, HttpStatus.BAD_REQUEST)
    } else {
      await this.prisma.nguoi_dung.update({
        where: { nguoi_dung_id },
        data: {
          ...user,
          mat_khau: bcrypt.hashSync(mat_khau_moi, 10)
        }
      })
      return ResponseData(HttpStatus.OK, Message.USER.UPDATE_PASSWORD_SUCCESS, "")
    }
  }

  async updateAvatar(nguoi_dung_id: number, file: Express.Multer.File) {
    const user = await this.checkUserExistence(nguoi_dung_id)
    const fileCompressed = await compress_img(file)

    user.anh_dai_dien = "public/img_compress/" + fileCompressed.filename
    await this.prisma.nguoi_dung.update({
      where: { nguoi_dung_id },
      data: user
    })
    return ResponseData(HttpStatus.OK, Message.USER.UPDATE_AVATAR_SUCCESS, user.anh_dai_dien)
  }
}