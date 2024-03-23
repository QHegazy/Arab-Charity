import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInUpByEmail, signInUpByPassword } from 'src/Dto/sign.in/sign.in';
import { ResponseObject } from 'src/messages/message';
import { AuthGuard } from 'src/guard/auth-guard/auth-guard.guard';

@Controller({ version: '1', path: 'auth' })
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get()
  getHello(): string {
    return 'Hello Worlds!';
  }
  @Post('email/login')
  @HttpCode(200)
  async authUserByEmail(
    @Body() form: signInUpByEmail,
  ): Promise<ResponseObject<string>> {
    try {
      const authData = await this.authService.signInByEmail(form);
      return new ResponseObject('success', 200, 'auth success', authData);
    } catch (error) {
      throw error;
    }
  }
  @Post('phone/login')
  @HttpCode(200)
  async authUserByPhoneNumber(
    @Body() form: signInUpByPassword,
  ): Promise<ResponseObject<string>> {
    try {
      const authData = await this.authService.signInByPhoneNumber(form);
      return new ResponseObject('success', 200, 'auth success', authData);
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
