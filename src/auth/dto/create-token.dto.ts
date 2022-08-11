import { IsEmail, IsString } from 'class-validator';

export class CreateTokenDto {
  @IsString()
  id: number;

  @IsEmail()
  email: string;

  @IsString()
  username: string;
}
