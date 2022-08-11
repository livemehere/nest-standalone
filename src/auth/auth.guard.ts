import { AuthService } from './auth.service';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      throw new UnauthorizedException();
    }

    const token = request.headers.authorization.split(' ')[1];
    const result = await this.authService.verify(token);
    const { email, id, username } = result;
    request.user = { email, id, username };
    return true;
  }
}
