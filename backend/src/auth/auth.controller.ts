import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService, authUser } from './auth.service';
import { signInUpByEmail, signInUpByPassword } from 'src/Dto/sign.in/sign.in';
import { ResponseObject } from 'src/messages/message';

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
  ): Promise<ResponseObject<authUser>> {
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
  ): Promise<ResponseObject<authUser>> {
    try {
      const authData = await this.authService.signInByPhoneNumber(form);
      return new ResponseObject('success', 200, 'auth success', authData);
    } catch (error) {
      throw error;
    }
  }
}
