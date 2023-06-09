import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { SettingsModule } from 'src/settings/settings.module';
import { Issue } from 'src/issues/entities/issue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Issue]), SettingsModule],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
