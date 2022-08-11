import { CreateUserDto } from './../../users/dto/create-user.dto';
import { OmitType } from '@nestjs/mapped-types';

export class LoginDto extends OmitType(CreateUserDto, ['username'] as const) {}
