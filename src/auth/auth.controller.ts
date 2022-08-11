import { LoginDto } from './dto/login.dto';
import { CreateTokenDto } from './dto/create-token.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Headers, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('token')
  createToken(@Body() body: CreateTokenDto) {
    return this.authService.createToken(body);
  }

  @Get('decode')
  decodeToken(@Headers() headers) {
    const token = headers.authorization.split(' ')[1];
    return this.authService.decodeToken(token);
  }

  @Get('verify')
  verify(@Headers() headers) {
    const token = headers.authorization.split(' ')[1];
    return this.authService.verify(token);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
