import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateStudentDto {
  @IsString({ message: 'College Id must not be empty' })
  @IsOptional()
  collegeId?: string;

  @IsString({ message: 'Name must not be empty' })
  @ApiProperty({ example: 'Sujan Parajuli' })
  @Transform((options) => {
    return (options.value as string).toLowerCase();
  })
  name: string;

  @ApiProperty({ example: '9842104063' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'Contact number is not valid' },
  )
  @Min(10, { message: 'Contact number must be minimum of 10 digits' })
  contactNumber: string;
}
