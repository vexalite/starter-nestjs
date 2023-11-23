import {
  IsString,
  IsArray,
  IsDate,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsUrl,
  ValidateNested,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCatalogDto {
  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  width?: number;

  @IsOptional()
  @IsNumber()
  thickness?: number;
}

class IsbnDto {
  @IsOptional()
  @IsString()
  ISBN10?: string;

  @IsOptional()
  @IsString()
  ISBN13?: string;
}

export class InstituteDto {
  @IsString()
  instituteId!: string;

  @IsNumber()
  quantity!: number;
}

export class BookDto {
  @IsString()
  title!: string;

  @IsArray()
  @IsString({ each: true })
  author!: string[];

  @IsArray()
  @IsString({ each: true })
  publisher!: string[];

  @IsDate()
  publishedDate!: Date;

  @IsString()
  description!: string;

  @ValidateNested()
  @Type(() => IsbnDto)
  ISBN!: IsbnDto;

  @IsNumber()
  pageCount!: number;

  @ValidateNested()
  @Type(() => CreateCatalogDto)
  dimensions!: CreateCatalogDto;

  @IsString()
  mainCategory!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories?: string[];

  @IsOptional()
  @IsString()
  edition?: string;

  @IsOptional()
  @IsString()
  volume?: string;

  @IsOptional()
  @IsUrl()
  coverImageUrl?: string;

  @IsString()
  language!: string;

  @Type(() => InstituteDto)
  @ValidateNested()
  institutes!: InstituteDto[];

  @IsBoolean()
  isAvailableForIssue!: boolean;

  @IsOptional()
  @IsString()
  shelfLocation?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  holdLimit?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsNumber()
  @IsPositive()
  averageRating?: number;

  @IsDate()
  createdAt!: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @IsNumber()
  quantity: number;
}
