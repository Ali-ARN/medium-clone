import { IsString, MinLength, MaxLength, IsInt } from 'class-validator';
export class CreateArticleDto {
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  title: string;

  @IsString()
  body: string;

  @IsInt()
  userId: number;

  @IsString()
  description?: string;
}
