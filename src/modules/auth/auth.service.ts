import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient, nguoi_dung } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { IUserDataAuth } from './dto/user-auth.dto';
import { UserService } from '../user/user.service';
import { ResponseData } from 'src/common/utils/response.utils';
import { Message } from 'src/common/constants/message.const';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly userService: UserService
  ) { }
  prisma = new PrismaClient()

  async login(email: string, mat_khau: string) {
    const checkUser = await this.userService.checkUserRegister(email)
    if (!checkUser) {
      throw new HttpException(Message.LOGIN.EMAIL_FAIL, HttpStatus.BAD_REQUEST)
    }

    if (!bcrypt.compareSync(mat_khau, checkUser.mat_khau)) {
      throw new HttpException(Message.LOGIN.PW_FAIL, HttpStatus.BAD_REQUEST)
    }

    const payload: IUserDataAuth = {
      data: {
        nguoi_dung_id: checkUser.nguoi_dung_id,
        key: Date.now()
      }
    }
    const token = this.jwtService.sign(payload,
      { expiresIn: '30d', secret: this.configService.get("TOKEN_SECRECT") }
    )
    const data = {
      token,
      user: {
        nguoi_dung_id: checkUser.nguoi_dung_id,
        email: checkUser.email,
        ho_ten: checkUser.ho_ten,
        tuoi: checkUser.tuoi,
        anh_dai_dien: checkUser.anh_dai_dien,
      }
    }
    return ResponseData(HttpStatus.OK, Message.LOGIN.SUCCESS, data)
  }

  async register(email, mat_khau, ho_ten, ngay_sinh) {
    const checkUser = await this.userService.checkUserRegister(email)
    if (checkUser) {
      throw new HttpException(Message.REGISTER.EMAIL_FAIL, HttpStatus.BAD_REQUEST)
    }
    const newUser: Partial<nguoi_dung> = {
      email,
      mat_khau: bcrypt.hashSync(mat_khau, 10),
      ho_ten,
      tuoi: new Date().getFullYear() - new Date(ngay_sinh).getFullYear()
    }
    await this.prisma.nguoi_dung.create({ data: newUser })
    return ResponseData(HttpStatus.OK, Message.REGISTER.SUCCESS, "")
  }
}