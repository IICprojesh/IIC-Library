import { ApiProperty } from '@nestjs/swagger';
import { IsISBN, IsString, IsOptional, IsArray } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: '12313123', type: 'isbn' })
  @IsString()
  @IsISBN()
  isbn: string;

  @ApiProperty({ example: 'book title' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'book summary' })
  @IsString()
  @IsOptional()
  summary?: string;

  @ApiProperty({ example: 'author 1, author b, author z' })
  @IsString()
  authors: string;
}
