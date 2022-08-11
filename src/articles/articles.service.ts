import { UsersService } from './../users/users.service';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entity/article.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    private userService: UsersService,
  ) {}

  async create(createArticleDto: CreateArticleDto, userId: number) {
    const user = await this.userService.findOne(userId);
    const article = this.articleRepository.create({
      title: createArticleDto.title,
      content: createArticleDto.content,
    });
    return this.articleRepository.save({ ...article, user });
  }

  async findAll(query: any) {
    const option: FindManyOptions<Article> = {
      where: { user: {} },
      relations: ['user'],
      select: {
        title: true,
        user: {
          username: true,
        },
      },
    };

    if (query.userId) {
      option.where['user'] = { id: query.userId };
    }
    if (query.title) {
      option.where['title'] = query.title;
    }

    console.log(option);

    return this.articleRepository.find(option);
  }

  findOne(id: number) {
    return this.articleRepository.findOne({ where: { id } });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.articleRepository.update(id, updateArticleDto);
  }

  async remove(id: number) {
    const found = await this.articleRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException('존재하지 않는 게시글 입니다');
    }
    return this.articleRepository.remove(found);
  }
}
