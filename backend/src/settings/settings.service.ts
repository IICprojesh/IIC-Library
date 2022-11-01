import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { SettingEntity } from './entities/setting.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SettingEntity)
    private readonly settingRepository: Repository<SettingEntity>,
  ) {}

  async create(createSettingDto: CreateSettingDto) {
    const exist = await this.findOne();
    if (exist) {
      return exist;
    }
    return this.settingRepository.save(createSettingDto);
  }

  async findOne() {
    const setting = await this.settingRepository.find();
    if (setting.length) return setting[0];
    return null;
  }

  update(id: number, updateSettingDto: UpdateSettingDto) {
    return this.settingRepository.update({ id }, updateSettingDto);
  }
}
