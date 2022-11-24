import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({ example: 'np05cp4s210025' })
  @IsUUID()
  id: string;

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
