import { AuthGuard } from './../auth/auth.guard';
import { UpdateArticleDto } from './dto/update-article.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseFloatPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { User } from '../auth/user.decorator';

@Controller('articles')
@UseGuards(AuthGuard)
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Post()
  create(
    @Body() createArticleDto: CreateArticleDto,
    @User('id') userId: number,
  ) {
    return this.articlesService.create(createArticleDto, userId);
  }

  @Get()
  findAll(@Query() query) {
    return this.articlesService.findAll(query);
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.articlesService.findOne(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
