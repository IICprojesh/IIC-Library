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
    const { avatar, ...rest } = await this.settingRepository.save(
      createSettingDto,
    );
    return {
      ...rest,
      avatar: avatar && `data:image/jpeg;base64, ${avatar}`,
    };
  }

  async findOne() {
    const setting = await this.settingRepository.find({
      cache: {
        milliseconds: 10 * 1000 * 60,
        id: 'SETTING_DEFAULT',
      },
    });
    const _setting = setting?.[0];
    if (!_setting) return null;
    if (_setting) {
      return {
        ..._setting,
        avatar: _setting.avatar && `data:image/jpeg;base64, ${_setting.avatar}`,
      };
    }
  }

  async update(id: number, updateSettingDto: UpdateSettingDto) {
    console.log(updateSettingDto);
    return await this.settingRepository.update(
      {
        id,
      },
      updateSettingDto,
    );
  }

  async uploadProfile(profile: Express.Multer.File) {
    const settings = await this.findOne();
    settings.avatar = profile.buffer.toString('base64');
    const saved = await this.settingRepository.save(settings);
    return saved;
  }

  async getProfile() {
    let settings = await this.findOne();
    if (!settings) settings = await this.create({});
    return settings;
  }
}
