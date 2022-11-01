import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

import { Repository } from 'typeorm';
import { StudentEntity } from './entities/student.entity';
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    try {
      return await this.studentRepository.save(createStudentDto);
    } catch (err) {
      const ERR_ALREADY_EXIST = 19;
      if (err.errno === ERR_ALREADY_EXIST) {
        throw new BadRequestException('contact number already exist.');
      }
    }
  }

  findAll(limit: number, skip: number) {
    return this.studentRepository.find({
      skip,
      take: limit,
    });
  }

  findOne(id: string) {
    return this.studentRepository.find({ where: { id } });
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    return this.studentRepository.update({ id }, updateStudentDto);
  }

  remove(id: string) {
    return this.studentRepository.delete({ id });
  }
}
