import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateReservationDto {
  @IsEnum(['student', 'employee'])
  patronType!: 'student' | 'employee';

  @IsString()
  patronId!: string;

  @IsMongoId()
  bookId!: Types.ObjectId | string;

  @IsString()
  instituteId!: string;

  @IsEnum(['issued', 'returned'])
  status!: 'issued' | 'returned';

  //   @IsOptional()
  //   @IsString()
  //   issuedBy!: string;

  @IsDateString()
  issuedDate!: Date;

  @IsOptional()
  @IsDateString()
  renewDate?: Date;

  @IsDateString()
  dueDate!: Date;

  @IsNumber()
  @IsOptional()
  overdueChargesPaid?: number;

  @IsOptional()
  @IsDateString()
  returnedDate?: Date;

  @IsDateString()
  createdAt!: Date;
}
