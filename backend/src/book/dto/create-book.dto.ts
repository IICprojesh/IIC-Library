import { IsISBN, IsString, IsOptional, IsArray } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsISBN()
  isbn: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  summary?: string;

  @IsString()
  authors: string;
}
