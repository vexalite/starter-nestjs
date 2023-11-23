import { PartialType } from '@nestjs/mapped-types';
import { CreateBookInstituteRelationDto } from './create-book-institute-relation.dto';

export class UpdateBookInstituteRelationDto extends PartialType(CreateBookInstituteRelationDto) {}
