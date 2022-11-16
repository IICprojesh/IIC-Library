import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateIssueDto {
  @IsOptional()
  @IsBoolean()
  returned?: boolean;

  @IsOptional()
  @IsBoolean()
  renew?: boolean;
}
