import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findOne(id: number) {
    try {
      return this.userRepository.findOneByOrFail({ id });
    } catch (e) {
      throw new NotFoundException('존재하지 않는 유저입니다');
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  async findByEmail(email: string) {
    try {
      return await this.userRepository.findOneByOrFail({ email });
    } catch (e) {
      throw new NotFoundException('존재하지 않는 유저입니다');
    }
  }
}
