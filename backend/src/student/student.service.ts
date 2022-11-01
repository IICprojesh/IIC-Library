import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

import { Repository } from 'typeorm';
import { StudentEntity } from './entities/student.entity';
import { SettingsService } from 'src/settings/settings.service';
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,

    private readonly settingService: SettingsService,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const setting = await this.settingService.findOne();
    if (!setting) {
      throw new BadRequestException('initial setting must be created!!');
    }
    try {
      const email = `${createStudentDto.id}@${setting.emailSuffix}`;
      return await this.studentRepository.save({ ...createStudentDto, email });
    } catch (err) {
      const ERR_ALREADY_EXIST = 19;
      if (err.errno === ERR_ALREADY_EXIST) {
        throw new BadRequestException('contact number already exist.');
      }
    }
  }

  async findAll(limit: number, skip: number) {
    const result = { data: null, total: 0 };
    const students = await this.studentRepository.find({
      skip,
      take: limit,
    });
    result.data = students;
    result.total = students.length;
    return result;
  }

  findOne(id: string) {
    return this.studentRepository.findOne({ where: { id } });
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    return this.studentRepository.update({ id }, updateStudentDto);
  }

  remove(id: string) {
    return this.studentRepository.delete({ id });
  }
}
