import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, FindOneOptions } from 'typeorm';
import { SettingsService } from 'src/settings/settings.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { Issue } from './entities/issue.entity';
import { Renew } from 'src/renew/entities/renew.entity';
import { getDateAfter } from 'src/utils/date-difference';

@Injectable()
export class IssuesService {
  constructor(
    private readonly settingsService: SettingsService,
    @InjectRepository(Issue) private readonly issueRepo: Repository<Issue>,
    @InjectRepository(Renew) private readonly renewRepo: Repository<Renew>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createIssueDto: CreateIssueDto) {
    const found = await this.issueRepo.findOne({
      where: {
        bookId: createIssueDto.bookId,
        studentId: createIssueDto.studentId,
        returned: false,
      },
    });
    if (found) {
      throw new BadRequestException('User has already borrowed this book');
    }
    const setting = await this.settingsService.findOne();
    const issue = this.issueRepo.create({
      ...createIssueDto,
      maxIssue: setting.maxIssue,
    });

    try {
      return await this.dataSource.manager.transaction(
        async (tranasactionalEntityManager) => {
          const _issue = await tranasactionalEntityManager.save(issue);
          const renew = this.renewRepo.create({
            issueId: _issue.id,
            returnDate: getDateAfter(setting.renewBefore),
            fineAmount: setting.fineAmount,
          });
          await tranasactionalEntityManager.save(renew);
          return _issue;
        },
      );
    } catch (err) {
      throw new BadRequestException(
        'Something went wrong while creating issue.',
      );
    }
  }

  async findAll({
    limit,
    skip,
    studentId,
  }: {
    limit: number;
    skip: number;
    studentId: string;
  }) {
    const total = await this.issueRepo.count();
    const data = await this.issueRepo.find({
      where: {
        studentId,
      },
      skip,
      take: limit,
      relations: {
        student: true,
        book: true,
      },
      select: {
        student: {
          id: true,
          name: true,
        },
        book: {
          isbn: true,
          title: true,
        },
      },
    });
    return { total, data };
  }

  findOne(id: number, option?: FindOneOptions<Issue>) {
    const { where, ...rest } = option;
    return this.issueRepo.findOne({
      where: {
        id,
        ...where,
      },
      ...rest,
    });
  }

  async update(id: number, updateIssueDto: UpdateIssueDto) {
    return this.issueRepo.update({ id }, updateIssueDto);
  }
}
