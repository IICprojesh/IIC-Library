import { Module } from '@nestjs/common';
import { RenewService } from './renew.service';
import { RenewController } from './renew.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Renew } from './entities/renew.entity';
import { IssuesModule } from 'src/issues/issues.module';
import { SettingsModule } from 'src/settings/settings.module';

@Module({
  imports: [TypeOrmModule.forFeature([Renew]), IssuesModule, SettingsModule],
  controllers: [RenewController],
  providers: [RenewService],
  exports: [RenewService],
})
export class RenewModule {}
