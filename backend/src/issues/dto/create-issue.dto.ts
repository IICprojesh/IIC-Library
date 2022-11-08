import { IsISBN, IsString } from 'class-validator';

export class CreateIssueDto {
  @IsString()
  studentId: string;

  @IsISBN()
  bookId: string;
}
