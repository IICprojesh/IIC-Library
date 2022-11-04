import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSettingDto {
  @IsString()
  @IsOptional()
  emailSuffix?: string;

  @IsOptional()
  @IsNumber()
  maxRenew?: number;

  @IsNumber()
  @IsOptional()
  renewBefore?: number;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  fineAmount?: number;
}
