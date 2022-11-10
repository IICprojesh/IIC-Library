import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindOptionsWhere, Like } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

import { findBookFromInternet } from './utils/find-book';

@Injectable()
export class BookService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    return await this.bookRepo.save(createBookDto);
  }

  async seachBook(isbn: string) {
    const book = await this.findOne(isbn);
    if (!book) {
      const data = await findBookFromInternet(isbn, this.httpService.axiosRef);
      return data;
    }
    return {
      exist: true,
      ...book,
    };
  }

  findAll({
    limit,
    skip,
    search,
  }: {
    limit: number;
    skip: number;
    search: string;
  }) {
    let where: FindOptionsWhere<Book> | FindOptionsWhere<Book>[] = [];
    if (search) {
      where = [
        { title: Like(`%${search}%`) },
        { summary: Like(`%${search}%`) },
        { isbn: Like(`%${search}%`) },
      ];
    }

    return this.bookRepo.find({
      skip,
      take: limit,
      where,
    });
  }

  findOne(isbn: string, options?: FindOneOptions<Book>) {
    return this.bookRepo.findOne({
      where: {
        isbn,
      },
      ...options,
    });
  }

  update(isbn: string, updateBookDto: UpdateBookDto) {
    return this.bookRepo.update({ isbn }, updateBookDto);
  }

  remove(isbn: string) {
    return this.bookRepo.delete({
      isbn,
    });
  }
}