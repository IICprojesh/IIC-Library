import { ApiProperty } from '@nestjs/swagger';
import { IsISBN, IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateBookDto {
  @ApiProperty({ example: '12313123', type: 'isbn' })
  @IsString()
  @IsISBN()
  @Transform(({ value }) => {
    return value.replace(/[\s-]/g, '');
  })
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

  @ApiProperty({ example: 'https:google.com' })
  @IsString()
  @IsOptional()
  image: string;
}
