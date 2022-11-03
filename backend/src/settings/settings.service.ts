import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { SettingEntity } from './entities/setting.entity';
import { Blob } from 'node:buffer';

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
    if (setting.length)
      return {
        ...setting[0],
      };
    return null;
  }

  update(id: number, updateSettingDto: UpdateSettingDto) {
    return this.settingRepository.update({ id }, updateSettingDto);
  }

  async uploadProfile(profile: Express.Multer.File) {
    const settings = await this.findOne();
    if (!settings)
      throw new BadRequestException('Setting instance is not defined.');

		settings.adminProfile = profile.buffer.toString('base64');
		return this.settingRepository.save(settings);
  }

	async getProfile() {
		const settings = await this.findOne();
    if (!settings)
      throw new BadRequestException('Setting instance is not defined.');
		return {
			...settings,
			adminProfile: `data:image/jpeg;base64, ${settings.adminProfile}`,
		};
	}
}
