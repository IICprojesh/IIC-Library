import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSettingDto {
  @IsOptional()
  @IsString()
  emailSuffix?: string;

  @IsOptional()
  @IsNumber()
  maxRenew?: number;

  @IsNumber()
	@IsOptional()
  renewDay?: number;
}
