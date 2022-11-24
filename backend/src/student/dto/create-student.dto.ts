import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsOptional()
  collegeId?: string;

  @IsString()
  @ApiProperty({ example: 'sujan parajuli' })
  @Transform((options) => {
    return (options.value as string).toLowerCase();
  })
  name: string;

  @ApiProperty({ example: '980000000' })
  @IsString()
  @Length(10)
  contactNumber: string;
}
