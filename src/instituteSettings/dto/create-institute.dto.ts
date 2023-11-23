import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SettingsDto {
  @IsNumber()
  borrowingPeriod!: number;

  @IsNumber()
  overdueCharges!: number;

  @IsNumber()
  borrowingCapacity!: number;
}

export class CreateInstituteDto {
  @IsString()
  instituteId!: string;

  @ValidateNested()
  @Type(() => SettingsDto)
  employee!: SettingsDto;

  @ValidateNested()
  @Type(() => SettingsDto)
  student!: SettingsDto;
}
