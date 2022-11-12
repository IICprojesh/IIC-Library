import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

import { Repository, FindOptionsWhere, Like } from 'typeorm';
import { Student } from './entities/student.entity';
import { SettingsService } from 'src/settings/settings.service';
import { Issue } from 'src/issues/entities/issue.entity';
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Issue) private readonly issueRepo: Repository<Issue>,
    private readonly settingService: SettingsService,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const setting = await this.settingService.findOne();
    if (!setting) {
      throw new BadRequestException('initial setting must be created!!');
    }
    try {
      const email = `${createStudentDto.id}${setting.emailSuffix}`;
      const student = await this.studentRepository.save({
        ...createStudentDto,
      });
      return { ...student, email };
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
    const settings = await this.settingService.findOne();
    const total = await this.studentRepository.count();
    const data = students.map((each) => ({
      ...each,
      email: `${each.id}${settings.emailSuffix}`,
    }));
    return { total, data };
  }

  async findOne(id: string) {
    const settings = await this.settingService.findOne();
    const student = await this.studentRepository.findOne({ where: { id } });
    return { ...student, email: `${student.id}${settings.emailSuffix}` };
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    return this.studentRepository.update({ id }, updateStudentDto);
  }

  async remove(id: string) {
    const issue = await this.issueRepo.findOne({
      where: {
        studentId: id,
        returned: false,
      },
    });
    if (issue) {
      throw new BadRequestException(
        'This student has issued book. This student cannot be deleted',
      );
    }
    return this.studentRepository.delete(id);
  }
}
