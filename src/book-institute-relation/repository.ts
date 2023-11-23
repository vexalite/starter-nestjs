// book-institutes.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookInstitute } from './schema';
import { BaseRepository } from 'src/base.repository';

@Injectable()
export class BookInstitutesRepository extends BaseRepository<BookInstitute> {
  constructor(
    @InjectModel('BookInstitute')
    private readonly bookInstituteModel: Model<BookInstitute>,
  ) {
    super(bookInstituteModel);
  }
}
