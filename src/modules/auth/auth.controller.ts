import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpException, HttpStatus, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.fitler';
import { LoginDto } from './dto/login-auth.dto';
import { RegisterDto } from './dto/register-auth.dto';

interface LoginBody {
  email: string,
  mat_khau: string,
}

interface RegisterBody extends LoginBody {
  ho_ten: string,
  ngay_sinh: Date
}

@UseFilters(HttpExceptionFilter)
@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("login")
  @ApiOperation({ summary: "Đăng nhập" })
  @ApiBody({ type: LoginDto })
  login(
    @Body() body: LoginBody,
  ) {
    const { email, mat_khau } = body
    return this.authService.login(email, mat_khau)
  }

  @Post("register")
  @ApiOperation({ summary: "Đăng ký" })
  @ApiBody({ type: RegisterDto })
  register(
    @Body() body: RegisterBody
  ) {
    const { email, mat_khau, ho_ten, ngay_sinh } = body
    return this.authService.register(email, mat_khau, ho_ten, ngay_sinh)
  }
}