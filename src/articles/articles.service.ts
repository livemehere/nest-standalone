import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entity/article.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const article = this.articleRepository.create({
      title: createArticleDto.title,
      content: createArticleDto.content,
    });
    return this.articleRepository.save(article);
  }

  findAll() {
    return this.articleRepository.find();
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
