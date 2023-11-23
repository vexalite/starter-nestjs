// book-institutes.service.ts
import { Injectable } from '@nestjs/common';
import { BookInstitutesRepository } from './repository';
import { BookInstitute } from './schema';

@Injectable()
export class BookInstitutesService {
  constructor(
    private readonly bookInstitutesRepository: BookInstitutesRepository,
  ) {}

  async createBookInstitute(
    instituteid: string,
    bookInstitute: BookInstitute,
  ): Promise<BookInstitute> {
    return this.bookInstitutesRepository.create(bookInstitute);
  }

  async getBookInstitutes(instituteid: string) {
    return this.bookInstitutesRepository.findAllBooks(instituteid);
  }

  async getBookInstituteById(id: string): Promise<BookInstitute> {
    return this.bookInstitutesRepository.findByIdAndPopulate(id);
  }

  async updateBookInstitute(
    id: string,
    bookInstitute: Partial<BookInstitute>,
  ): Promise<BookInstitute> {
    return this.bookInstitutesRepository.update(id, bookInstitute);
  }
}
