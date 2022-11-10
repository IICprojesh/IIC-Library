import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { RenewService } from './renew.service';
import { CreateRenewDto } from './dto/create-renew.dto';
import { UpdateRenewDto } from './dto/update-renew.dto';

@Controller('renew')
export class RenewController {
  constructor(private readonly renewService: RenewService) {}

  @Post()
  async create(@Body() createRenewDto: CreateRenewDto) {
    return this.renewService.create(createRenewDto);
  }

  @Get()
  findAll(@Query('issueId') issueId: number) {
    return this.renewService.findAll(issueId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.renewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRenewDto: UpdateRenewDto) {
    return this.renewService.update(+id, updateRenewDto);
  }
}
