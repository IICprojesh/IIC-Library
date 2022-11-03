import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  create(@Body() createSettingDto: CreateSettingDto) {
    return this.settingsService.create(createSettingDto);
  }

  @Patch('profile')
  @UseInterceptors(FileInterceptor('profile'))
  updateProfile(@UploadedFile() profile: Express.Multer.File) {
    return this.settingsService.uploadProfile(profile);
  }

  @Get()
  findOne() {
    return this.settingsService.getProfile();
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateSettingDto: UpdateSettingDto) {
    return this.settingsService.update(id, updateSettingDto);
  }
}
