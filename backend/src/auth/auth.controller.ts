import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInEmail, signInPhone } from 'src/Dto/sign.in/sign.in';
import { AuthGuard } from 'src/guard/auth-guard/auth-guard.guard';
import { Response } from 'express';
import { ResponseObject } from 'src/messages/message';

@Controller({ version: '1', path: 'auth' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('user/email')
  @HttpCode(200)
  async authUserByEmail(
    @Res({ passthrough: true }) res: Response,
    @Body() form: signInEmail,
  ): Promise<ResponseObject<void>> {
    try {
      const authToken = await this.authService.signInByEmailForUser(form);
      res.cookie('access_token', authToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
      });
      return new ResponseObject('success', 200, 'Cookie added ssuccessfully ');
    } catch (error) {
      throw error;
    }
  }
  @Post('user/phone/')
  @HttpCode(200)
  async authUserByPhoneNumber(
    @Res({ passthrough: true }) res: Response,
    @Body() form: signInPhone,
  ): Promise<ResponseObject<void>> {
    try {
      const authToken = await this.authService.signInByPhoneNumberForUser(form);
      res.cookie('access_token', authToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
      });
      return new ResponseObject('success', 200, 'Cookie added ssuccessfully ');
    } catch (error) {
      throw error;
    }
  }
  @Post('org/email')
  @HttpCode(200)
  async authOrgByEmail(
    @Res({ passthrough: true }) res: Response,
    @Body() form: signInEmail,
  ): Promise<ResponseObject<void>> {
    try {
      const authToken = await this.authService.signInByEmailForOrg(form);
      res.cookie('access_token', authToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
      });
      return new ResponseObject('success', 200, 'Cookie added ssuccessfully ');
    } catch (error) {
      throw error;
    }
  }
  @Post('Org/phone')
  @HttpCode(200)
  async authUserByOrgNumber(
    @Body() form: signInPhone,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseObject<void>> {
    try {
      const authToken = await this.authService.signInByPhoneNumberForOrg(form);
      res.cookie('access_token', authToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
      });
      return new ResponseObject('success', 200, 'Cookie added ssuccessfully ');
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
  @UseGuards(AuthGuard)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return new ResponseObject('success', 200, 'Cookie ssuccessfully cleared');
  }
}
