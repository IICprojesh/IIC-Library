import { Transform } from 'class-transformer';
import { IsString, Length, Max, Validate } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  id: string;

  @IsString()
  @Transform((options) => {
    return (options.value as string).toLowerCase();
  })
  name: string;

  @IsString()
  @Length(10)
  contactNumber: string;
}
