import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (type !== "Bearer" || !token) throw new ForbiddenException("No token or wrong rormat: Bearer <token>");

    try {
      await this.jwtService.verifyAsync(token);
    } catch {
      throw new ForbiddenException("Wrong token");
    }

    return true;
  }
}
