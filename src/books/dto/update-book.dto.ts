import { PartialType } from '@nestjs/mapped-types';
import { BookDto } from './create-book.dto';

export class UpdateCatalogDto extends PartialType(BookDto) {}
