import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({ example: 'np05cp4s210025' })
  @IsString()
  id: string;

  @IsString()
  @ApiProperty({ example: 'np05cp4s210025' })
  @Transform((options) => {
    return (options.value as string).toLowerCase();
  })
  name: string;

  @ApiProperty({ example: '980000000' })
  @IsString()
  @Length(10)
  contactNumber: string;
}
