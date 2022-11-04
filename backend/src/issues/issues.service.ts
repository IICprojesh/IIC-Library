import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SettingsService } from 'src/settings/settings.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { Issue } from './entities/issue.entity';

@Injectable()
export class IssuesService {
  constructor(
    private readonly settingsService: SettingsService,

    @InjectRepository(Issue) private readonly issueRepo: Repository<Issue>,
  ) {}

  create(createIssueDto: CreateIssueDto) {}

  findAll() {
    return `This action returns all issues`;
  }

  findOne(id: number) {
    return `This action returns a #${id} issue`;
  }

  update(id: number, updateIssueDto: UpdateIssueDto) {
    return `This action updates a #${id} issue`;
  }

  remove(id: number) {
    return `This action removes a #${id} issue`;
  }
}
