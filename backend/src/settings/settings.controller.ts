import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
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
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (_, file, callback) => {
        const validMimeTypes = ['image/jpeg', 'image/png'];
        if (validMimeTypes.find((mimetype) => mimetype === file.mimetype))
          callback(null, true);
        else
          callback(
            new BadRequestException('File is not valid image type'),
            false,
          );
      },
    }),
  )
  updateProfile(@UploadedFile() profile: Express.Multer.File) {
    console.log(profile);
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
