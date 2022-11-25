import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
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
    const settings = await this.settingsService.findOne();

    const totalIssues = await this.issueRepo.find({
      where: { returned: false, studentId: createIssueDto.studentId },
    });

    if (totalIssues.length >= settings.maxIssue)
      throw new BadGatewayException(
        'User cannot borrow more than ' + settings.maxIssue + ' books.',
      );
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

  findBorrowedBooks() {
    return this.issueRepo.find({
      where: {
        returned: false,
      },
    });
  }

  async findAll({
    limit,
    skip,
    studentId,
  }: {
    limit?: number;
    skip?: number;
    studentId?: string;
  }) {
    const [data, total] = await this.issueRepo.findAndCount({
      where: {
        studentId,
        ...(() => {
          return studentId ? {} : { returned: false };
        })(),
      },
      relations: {
        student: true,
      },
      skip,
      take: limit,
      order: {
        returned: {
          direction: 'ASC',
        },
      },
      select: {
        student: {
          collegeId: true,
          name: true,
        },
      },
    });
    const settings = await this.settingsService.findOne();
    const extendedData: (Issue & {
      canRenew: boolean;
      expireDate: Date;
      isExpired: boolean;
    })[] = data.map((issue: Issue) => {
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
        return {
          ...issue,
          canRenew: false,
          expireDate,
          isExpired: diff > settings.renewBefore,
        };
      else
        return {
          ...issue,
          canRenew: true,
          expireDate,
          isExpired: diff > settings.renewBefore,
        };
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
    const issue = await this.issueRepo.findOne({
      where: { id, returned: false },
    });
    if (!issue)
      throw new BadRequestException(`Issue with id ${id} is not active issue.`);

    const settings = await this.settingsService.findOne();

    const fine = this.fineCalculator(issue, settings);

    if (fine !== 0) (updateIssueDto as Issue).fine = fine;

    if (updateIssueDto.renew) {
      delete updateIssueDto.renew; // delete this property as this in to required

      if (issue.totalRenew >= settings.maxRenew)
        throw new BadRequestException('This book cannot be renewed.');

      (updateIssueDto as Issue).totalRenew = issue.totalRenew + 1;
      (updateIssueDto as Issue).latestRenewDate = new Date();
    }

    const updated = await this.issueRepo.update({ id }, updateIssueDto);
    if (updated.affected) {
      return {
        update: true,
        data: {
          issue,
          canRenew: issue.totalRenew < settings.maxRenew - 1,
          ...updateIssueDto,
        },
      };
    } else {
      return { update: false, data: null };
    }
  }
}
