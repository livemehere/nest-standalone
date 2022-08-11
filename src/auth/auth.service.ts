import { LoginDto } from './dto/login.dto';
import { UsersService } from './../users/users.service';
import { CreateTokenDto } from './dto/create-token.dto';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  createToken(body: CreateTokenDto) {
    const { email, id, username } = body;
    const token = this.jwtService.sign({ email, id, username });
    return token;
  }

  decodeToken(token: string) {
    const decoded = this.jwtService.decode(token);
    return decoded;
  }

  async verify(token: string) {
    try {
      const result = await this.jwtService.verifyAsync(token);
      return result;
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        throw new UnauthorizedException(e.message);
      }
    }
  }

  async login(loginDto: LoginDto) {
    const found = await this.userService.findByEmail(loginDto.email);
    if (found.password !== loginDto.password) {
      throw new BadRequestException('비밀번호가 틀렸습니다');
    }
    const { email, username, id } = found;
    return this.createToken({ id, email, username });
  }
}
