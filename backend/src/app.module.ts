import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { BorrowModule } from './borrow/borrow.module';
import { RenewModule } from './renew/renew.module';
import { SettingsModule } from './settings/settings.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    StudentModule,
    BookModule,
    AuthorModule,
    BorrowModule,
    RenewModule,
    SettingsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'lms',
      entities: [`${__dirname}/**/entities/*.*.js`],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
