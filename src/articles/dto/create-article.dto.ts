import { IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString({ message: '타이틀은 문자열 이여야합니다' })
  title: string;

  @IsString({ message: '컨텐츠는 문자열 이여야합니다' })
  content: string;
}
