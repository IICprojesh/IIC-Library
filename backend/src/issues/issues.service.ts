import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, FindOneOptions } from 'typeorm';
import { SettingsService } from 'src/settings/settings.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { Issue } from './entities/issue.entity';
import { getDateAfter, getDateDifference } from 'src/utils/date-difference';
import { SettingEntity } from 'src/settings/entities/setting.entity';

@Injectable()
export class IssuesService {
  constructor(
    private readonly settingsService: SettingsService,
    @InjectRepository(Issue) private readonly issueRepo: Repository<Issue>,
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
    const issue = this.issueRepo.create({
      ...createIssueDto,
    });
    return this.issueRepo.save(issue);
  }

  private fineCalculator(issue: Issue, settings: SettingEntity) {
    let diff = 0;
    let fine = 0;
    if (!issue.latestRenewDate) {
      diff = getDateDifference(issue.issueDate, new Date());
    } else {
      diff = getDateDifference(issue.latestRenewDate, new Date());
    }
    if (diff > settings.renewBefore) {
      fine = issue.fine + (diff - settings.renewBefore) * settings.fineAmount;
    }
    return fine;
  }

  async findAll({
    limit,
    skip,
    studentId,
  }: {
    limit: number;
    skip: number;
    studentId?: string;
  }) {
    const total = await this.issueRepo.count();
    const data = await this.issueRepo.find({
      where: {
        studentId,
      },
      skip,
      take: limit,
      order: {
        returned: {
          direction: 'ASC',
        },
      },
    });
    const settings = await this.settingsService.findOne();
    const extendedData: (Issue & { canRenew: boolean; expireDate: Date })[] =
      data.map((issue: Issue) => {
        let diff = 0;
        let expireDate: Date = null;
        if (!issue.latestRenewDate) {
          diff = getDateDifference(issue.issueDate, new Date());
          expireDate = getDateAfter(
            diff >= 0 ? settings.renewBefore - diff : settings.renewBefore,
          );
        } else {
          diff = getDateDifference(issue.latestRenewDate, new Date());
          expireDate = getDateAfter(
            diff >= 0 ? settings.renewBefore - diff : settings.renewBefore,
          );
        }
        if (!issue.returned) issue.fine = this.fineCalculator(issue, settings);
        if (issue.totalRenew >= settings.maxRenew)
          return { ...issue, canRenew: false, expireDate };
        else return { ...issue, canRenew: true, expireDate };
      });
    return { total, data: extendedData };
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
    if (updateIssueDto.renew) {
      delete updateIssueDto.renew;
      const issue = await this.issueRepo.findOne({
        where: { id, returned: false },
        select: {
          totalRenew: true,
        },
      });
      if (!issue)
        throw new BadRequestException(`Book with id ${id} does not exist`);

      const settings = await this.settingsService.findOne();

      if (issue.totalRenew >= settings.maxRenew)
        throw new BadRequestException('This book cannot be renewed.');

      const fine = this.fineCalculator(issue, settings);

      if (fine) (updateIssueDto as Issue).fine = fine;
      if (issue) (updateIssueDto as Issue).totalRenew = issue.totalRenew + 1;
      (updateIssueDto as Issue).latestRenewDate = new Date();
    }
    return this.issueRepo.update({ id }, updateIssueDto);
  }
}
