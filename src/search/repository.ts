import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.repository';
import { BookInstitute } from 'src/book-institute-relation/schema';
import { Book } from 'src/books/schema';

@Injectable()
export class SearchRepository extends BaseRepository<BookInstitute> {
  constructor(
    @InjectModel('Book') private readonly bookModel: Model<Book>,
    @InjectModel('BookInstitute')
    private readonly bookInstituteModel: Model<BookInstitute>,
  ) {
    super(bookInstituteModel);
  }

  async universalSearch(id: string, searchQuery: string) {
    console.log(`${id} + ${searchQuery}`);
    const book = await this.bookModel
      .find({
        title: { $regex: new RegExp(searchQuery, 'i') },
      })
      .exec();
    const booksToCheck = [];
    book.forEach((book) => {
      // console.log(book._id);
      booksToCheck.push(book.id);
    });
    const foundBooksInstitutes = await this.bookInstituteModel
      .find({
        // instituteId: id,
        bookId: { $in: booksToCheck },
      })
      .populate('bookId')
      .exec();

    // console.log(foundBooksInstitutes);
    // console.log(book);
    return foundBooksInstitutes;
  }

  // async universalSearch(id: string, searchQuery: string) {
  //   const book = await this.bookInstituteModel
  //     .find({
  //       title: { $regex: new RegExp(searchQuery, 'i') },
  //     })
  //     .exec();
  //   return book;
  // }
}
