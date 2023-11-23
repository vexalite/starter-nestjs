import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schema';
import { BaseRepository } from 'src/base.repository';
import { BookInstitute } from 'src/book-institute-relation/schema';

@Injectable()
export class BooksRepository extends BaseRepository<Book> {
  constructor(
    @InjectModel('Book') private readonly bookModel: Model<Book>,
    @InjectModel('BookInstitute')
    private readonly bookInstituteModel: Model<BookInstitute>,
  ) {
    super(bookModel);
  }
}
