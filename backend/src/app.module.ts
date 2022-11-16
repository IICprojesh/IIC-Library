import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { SettingsModule } from './settings/settings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssuesModule } from './issues/issues.module';
import { BookModule } from './book/book.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    StudentModule,
    SettingsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'lms',
      entities: [`${__dirname}/**/entities/*.*.js`],
      synchronize: true,
    }),
    IssuesModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
