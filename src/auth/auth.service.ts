import { LoginDto } from './dto/login.dto';
import { UsersService } from './../users/users.service';
import { CreateTokenDto } from './dto/create-token.dto';
import {
  BadRequestException,
  Headers,
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

  createRefreshToken() {
    const refreshToken = this.jwtService.sign(
      {},
      {
        expiresIn: '3d',
      },
    );
    return refreshToken;
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
    const accessToken = this.createToken({ id, email, username });
    const refreshToken = this.createRefreshToken();
    return { accessToken, refreshToken };
  }

  async refresh(accessToken: string, refreshToken: string) {
    // accessToken 이 유효한가?
    try {
      const accessVerified = await this.verify(accessToken);
      if (accessVerified === undefined) {
        throw new UnauthorizedException('유효하지 않은 토큰입니다');
      }
    } catch (e) {
      if (e.message === '유효하지 않은 토큰입니다') {
        throw new UnauthorizedException(e.message);
      }
    }

    // refreshToken이 유효한가?
    try {
      await this.verify(refreshToken);
    } catch (e) {
      throw new UnauthorizedException('리프레시 토큰이 만료되었습니다');
    }

    // 토큰 재발급
    const user: any = this.decodeToken(accessToken);
    const { email, id, username } = user;
    const newAccessToken = this.createToken({ email, id, username });
    const newRefreshToken = this.createRefreshToken();
    return { newAccessToken, newRefreshToken };
  }
}
