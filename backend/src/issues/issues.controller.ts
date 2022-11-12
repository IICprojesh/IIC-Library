import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('issues')
@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Post()
  create(@Body() createIssueDto: CreateIssueDto) {
    return this.issuesService.create(createIssueDto);
  }

  @ApiQuery({
    name: 'limit',
    example: 5,
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'studentId',
    example: 5,
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'skip',
    example: 5,
    type: Number,
    required: false,
  })
  @Get()
  findAll(
    @Query('studentId') studentId: string,
    @Query('limit') limit: number,
    @Query('skip') skip: number,
  ) {
    return this.issuesService.findAll({ limit, skip, studentId });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('studentId') studentId: string) {
    return this.issuesService.findOne(+id, {
      where: {
        studentId,
      },
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIssueDto: UpdateIssueDto) {
    return this.issuesService.update(+id, updateIssueDto);
  }
}
