import { Injectable } from '@nestjs/common';
import { Book } from 'src/books/schema';
import { SearchRepository } from './repository';
import mongoose from 'mongoose';
import { BooksRepository } from 'src/books/repository';

@Injectable()
export class SearchService {
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly searchRepository: SearchRepository,
  ) {}

  async universalSearch(instituteid: string, searchQuery: string) {
    const searchResults = await this.searchRepository.universalSearch(
      instituteid,
      searchQuery,
    );
    return searchResults;
  }

  // async titleSearch(title: string, instituteid: string): Promise<Book[]> {
  //   const books = await this.searchRepository
  //     .find({
  //       title: { $regex: new RegExp(title, 'i') },
  //       'institutes.instituteId': instituteid,
  //     })
  //     .exec();
  //   return books;
  // }

  // async ISBNSearch(isbn: string, instituteid: string): Promise<Book[]> {
  //   const books = await this.searchRepository
  //     .find({
  //       $or: [
  //         { 'ISBN.ISBN10': { $regex: new RegExp(isbn, 'i') } },
  //         { 'ISBN.ISBN13': { $regex: new RegExp(isbn, 'i') } },
  //       ],
  //       'institutes.instituteId': instituteid,
  //     })
  //     .exec();
  //   return books;
  // }

  // async languageSearch(language: string, instituteid: string): Promise<Book[]> {
  //   const books = await this.searchRepository
  //     .find({
  //       language: { $regex: new RegExp(language, 'i') },
  //       'institutes.instituteId': instituteid,
  //     })
  //     .exec();
  //   return books;
  // }

  // async categorySearch(category: string, instituteid: string): Promise<Book[]> {
  //   const books = await this.searchRepository
  //     .find({
  //       categories: { $regex: new RegExp(category, 'i') },
  //       'institutes.instituteId': instituteid,
  //     })
  //     .exec();
  //   return books;
  // }

  // async publisherSearch(
  //   publisher: string,
  //   instituteid: string,
  // ): Promise<Book[]> {
  //   const books = await this.searchRepository
  //     .find({
  //       publisher: { $regex: new RegExp(publisher, 'i') },
  //       'institutes.instituteId': instituteid,
  //     })
  //     .exec();
  //   return books;
  // }
}
