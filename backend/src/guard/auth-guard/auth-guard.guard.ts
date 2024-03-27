// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private jwtService: JwtService) {}

//   private extractTokenFromHeader(request: Request): string | undefined {
//     const headers = request.headers as { authorization?: string };
//     const [type, token] = headers.authorization?.split(' ') ?? [];
//     return type === 'Bearer' ? token : undefined;
//   }

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const token = this.extractTokenFromHeader(request);

//     if (!token) {
//       throw new UnauthorizedException();
//     }
//     try {
//       const payload = await this.jwtService.verifyAsync(token, {
//         secret: process.env.SECRET,
//       });
//       const { FirstName, LastName, Role, Country, PhoneNumber } = payload;
//       request['user'] = { FirstName, LastName, Role, Country, PhoneNumber };
//       return true;
//     } catch {
//       throw new UnauthorizedException();
//     }
//   }
// }
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies['access_token'];
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromCookie(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET,
      });
      if (!payload) {
        throw new UnauthorizedException({ message: 'asdsa' });
      }
      const { FirstName, LastName, Role, Country, PhoneNumber } = payload;
      request['user'] = { FirstName, LastName, Role, Country, PhoneNumber };
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
