import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateRenewDto {
  @ApiProperty({ example: 'issue id' })
  @IsNumber()
  issueId: number;
}
