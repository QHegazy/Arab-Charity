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

  @Post('user/email/login')
  @HttpCode(200)
  async authUserByEmail(
    @Body() form: signInUpByEmail,
  ): Promise<ResponseObject<string>> {
    try {
      const authData = await this.authService.signInByEmailForUser(form);
      return new ResponseObject('success', 200, 'auth success', authData);
    } catch (error) {
      throw error;
    }
  }
  @Post('user/phone/login')
  @HttpCode(200)
  async authUserByPhoneNumber(
    @Body() form: signInUpByPassword,
  ): Promise<ResponseObject<string>> {
    try {
      const authData = await this.authService.signInByPhoneNumberForUser(form);
      return new ResponseObject('success', 200, 'auth success', authData);
    } catch (error) {
      throw error;
    }
  }
  @Post('org/email/login')
  @HttpCode(200)
  async authOrgByEmail(
    @Body() form: signInUpByEmail,
  ): Promise<ResponseObject<string>> {
    try {
      const authData = await this.authService.signInByEmailForOrg(form);
      return new ResponseObject('success', 200, 'auth success', authData);
    } catch (error) {
      throw error;
    }
  }
  @Post('Org/phone/login')
  @HttpCode(200)
  async authUserByOrgNumber(
    @Body() form: signInUpByPassword,
  ): Promise<ResponseObject<string>> {
    try {
      const authData = await this.authService.signInByPhoneNumberForOrg(form);
      return new ResponseObject('success', 200, 'auth success', authData);
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(AuthGuard)
  @Get('user/profile')
  getUserProfile(@Req() req) {
    return req.user;
  }
  @UseGuards(AuthGuard)
  @Get('org/profile')
  getOrgProfile(@Req() req) {
    return req.user;
  }
}
