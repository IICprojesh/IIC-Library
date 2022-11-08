import { Module } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { SettingsModule } from 'src/settings/settings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from './entities/issue.entity';
import { Renew } from 'src/renew/entities/renew.entity';

@Module({
  imports: [SettingsModule, TypeOrmModule.forFeature([Issue, Renew])],
  controllers: [IssuesController],
  providers: [IssuesService],
  exports: [IssuesService],
})
export class IssuesModule {}
