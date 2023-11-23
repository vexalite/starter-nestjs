import { Injectable } from '@nestjs/common';
import { Book } from './schema';
import { BookDto } from './dto/create-book.dto';
import { UpdateCatalogDto } from './dto/update-book.dto';
import { BooksRepository } from './repository';
import { BookInstitutesRepository } from 'src/book-institute-relation/repository';
import { CreateBookInstituteRelationDto } from 'src/book-institute-relation/dto/create-book-institute-relation.dto';

@Injectable()
export class BooksService {
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly bookInstitutesRepository: BookInstitutesRepository,
  ) {}

  async create(
    instituteid: string,
    isbn: string,
    body: BookDto,
  ): Promise<Book> {
    try {
      const existingBook = await this.booksRepository.findBookByISBN(isbn);
      if (existingBook) {
        console.log(existingBook.id);
        const relation: CreateBookInstituteRelationDto = {
          instituteId: instituteid,
          bookId: existingBook.id,
          quantity: body.quantity,
        };

        await this.bookInstitutesRepository.create(relation);
        return existingBook;
      } else {
        const createBook = await this.booksRepository.create(body);
        const relation: CreateBookInstituteRelationDto = {
          instituteId: instituteid,
          bookId: createBook.id,
          quantity: body.quantity,
        };
        await this.bookInstitutesRepository.create(relation);
        return createBook;
      }
    } catch (error) {
      console.error(`Error in create:`, (error as Error).message);
      throw error;
    }
  }

  async findAll(): Promise<Book[]> {
    try {
      const books = await this.booksRepository.findAll();
      return books;
    } catch (error) {
      console.error(`Error in findAll:`, (error as Error).message);
      throw error;
    }
  }

  async findOne(id: string): Promise<Book | null> {
    try {
      const book = await this.booksRepository.findById(id);
      return book;
    } catch (error) {
      console.error(`Error in findOne:`, (error as Error).message);
      throw error;
    }
  }

  async update(
    id: string,
    updateCatalogDto: UpdateCatalogDto,
  ): Promise<Book | null> {
    try {
      const updatedBook = await this.booksRepository.update(
        id,
        updateCatalogDto,
      );
      return updatedBook;
    } catch (error) {
      console.error(`Error in update:`, (error as Error).message);
      throw error;
    }
  }

  // async remove(id: string): Promise<void> {
  //   try {
  //     await this.booksRepository.removeBook(id);
  //   } catch (error) {
  //     console.error(`Error in remove:`, (error as Error).message);
  //     throw error;
  //   }
  // }
}
