import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  search(
    @Query('network') isbn: string,
    @Query('limit') limit: number,
    @Query('skip') skip: number,
    @Query('search') search: string,
  ) {
    if (isbn) {
      return this.bookService.seachBook(isbn);
    } else {
      return this.bookService.findAll({ limit, skip, search });
    }
  }

  @Get(':isbn')
  findOne(@Param('isbn') isbn: string) {
    return this.bookService.findOne(isbn, {
      relations: {
        authors: true,
      },
    });
  }

  @Patch(':isbn')
  update(@Param('isbn') isbn: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(isbn, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('isbn') isbn: string) {
    return this.bookService.remove(isbn);
  }
}