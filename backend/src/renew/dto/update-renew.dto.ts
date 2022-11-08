import { PartialType } from '@nestjs/mapped-types';
import { CreateRenewDto } from './create-renew.dto';

export class UpdateRenewDto extends PartialType(CreateRenewDto) {}
