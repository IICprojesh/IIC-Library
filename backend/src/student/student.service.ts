import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

import { Repository, FindOptionsWhere, Like } from 'typeorm';
import { Student } from './entities/student.entity';
import { SettingsService } from 'src/settings/settings.service';
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,

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

  async findAll({
    skip,
    limit,
    search,
  }: {
    skip: number;
    limit: number;
    search: string;
  }) {
    let where: FindOptionsWhere<Student>[] = null;
    if (search) {
      where = [{ name: Like(`%${search}%`) }, { id: Like(`%${search}%`) }];
    }
    const students = await this.studentRepository.find({
      where,
      skip,
      take: limit,
    });
    const total = await this.studentRepository.count();
    return { total, data: students };
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
