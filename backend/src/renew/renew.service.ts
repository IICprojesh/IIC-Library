import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IssuesService } from 'src/issues/issues.service';
import { Repository } from 'typeorm';
import { CreateRenewDto } from './dto/create-renew.dto';
import { UpdateRenewDto } from './dto/update-renew.dto';
import { Renew } from './entities/renew.entity';
import { DataSource } from 'typeorm';
import { SettingsService } from 'src/settings/settings.service';
import { getDateAfter } from 'src/utils/date-difference';

@Injectable()
export class RenewService {
  constructor(
    @InjectRepository(Renew) private readonly renewRepo: Repository<Renew>,
    private readonly issueService: IssuesService,
    private readonly dataSource: DataSource,
    private readonly settingsService: SettingsService,
  ) {}

  async create(createRenewDto: CreateRenewDto) {
    const issue = await this.issueService.findOne(createRenewDto.issueId, {
      where: {
        returned: false,
      },
    });
    if (issue && issue.maxIssue <= 0) {
      throw new BadRequestException('Maximum renew has been exceed');
    } else if (!issue)
      throw new BadRequestException('issue could not be found.');

    return await this.dataSource.manager.transaction(
      async (transactionEntity) => {
        const setting = await this.settingsService.findOne();
        issue.maxIssue--;
        await transactionEntity.save(issue);
        const renew = this.renewRepo.create({
          ...createRenewDto,
          returnDate: getDateAfter(setting.renewBefore),
          fineAmount: setting.fineAmount,
        });
        await transactionEntity.update(
          Renew,
          {
            active: true,
          } as Renew,
          {
            active: false,
          },
        );
        return await transactionEntity.save(renew);
      },
    );
  }

  findAll(issueId?: number) {
    return this.renewRepo.find({
      where: {
        issueId,
      },
    });
  }

  async findOne(id: number) {
    const renew = await this.renewRepo.findOne({
      where: {
        id,
      },
    });
    if (!renew.fined || !renew.active) {
      return renew;
    }

    try {
      return await this.dataSource.manager.transaction(
        async (transactionEntity) => {
          const fine = renew.fineAmount * Math.abs(renew.totalBorrowedDay());
          renew.totalFine = fine;
          return await transactionEntity.save(renew);
        },
      );
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
  }

  update(id: number, updateRenewDto: UpdateRenewDto) {
    return this.renewRepo.update({ id }, updateRenewDto);
  }
}
