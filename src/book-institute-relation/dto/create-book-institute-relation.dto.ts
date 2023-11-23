import { IsString, IsNumber } from 'class-validator';

export class CreateBookInstituteRelationDto {
  @IsString()
  bookId: string;

  @IsString()
  instituteId: string;

  @IsNumber()
  quantity: number;
}
