import { IsNumber } from 'class-validator';

export class CreateRenewDto {
  @IsNumber()
  issueId: number;
}
