import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Issue } from 'src/issues/entities/issue.entity';
import {
  Repository,
  FindOneOptions,
  FindOptionsWhere,
  Like,
  ILike,
} from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

import { findBookFromInternet } from './utils/find-book';

@Injectable()
export class BookService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
    @InjectRepository(Issue) private readonly issueRepo: Repository<Issue>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const book = await this.bookRepo.findOne({
      where: { isbn: createBookDto.isbn },
    });
    if (book) throw new BadRequestException('Book already exist');
    return await this.bookRepo.save(createBookDto);
  }

  async searchBook(isbn: string) {
    const data = await findBookFromInternet(isbn, this.httpService.axiosRef);
    return data;
  }

  async findAll({
    limit,
    skip,
    search,
  }: {
    limit?: number;
    skip?: number;
    search?: string;
  }) {
    let where: FindOptionsWhere<Book> | FindOptionsWhere<Book>[] = null;
    if (search) {
      search = search.replace(/-/g, '');
      where = [
        { title: ILike(`%${search}%`) },
        { summary: ILike(`%${search}%`) },
        { isbn: Like(`%${search}%`) },
      ];
    }
    const total = await this.bookRepo.count();
    const books = await this.bookRepo.find({
      skip,
      take: limit || 10,
      where,
    });
    return { total, data: books };
  }

  findOne(isbn: string, options?: FindOneOptions<Book>) {
    return this.bookRepo.findOne({
      where: {
        isbn,
      },
      ...options,
    });
  }

  async update(isbn: string, updateBookDto: UpdateBookDto) {
    const updated = await this.bookRepo.update({ isbn }, updateBookDto);
    if (updated.affected)
      return { message: 'book updated successfully.', success: true };
    else return { message: 'book update failed', success: false };
  }

  async remove(isbn: string) {
    const issue = await this.issueRepo.findOne({
      where: {
        bookId: isbn,
      },
    });

    if (issue && !issue.returned) {
      throw new BadRequestException(
        'The book cannot be deleted. This book is issued currently',
      );
    }

    const deleted = await this.bookRepo.delete(isbn);
    if (deleted.affected)
      return { message: 'book deleted successfully', success: true };
    else return { message: 'book delete failed.', success: false };
  }
}
