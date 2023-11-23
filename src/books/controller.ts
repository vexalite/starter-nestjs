import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { BooksService } from './service';
import { BookDto } from './dto/create-book.dto';
import { Book } from './schema';
import { UpdateCatalogDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post(':instituteid/:isbn')
  async createBook(
    @Param('instituteid') instituteid: string,
    @Param('isbn') isbn: string,
    @Body() body: BookDto,
  ): Promise<Book> {
    return this.booksService.create(instituteid, isbn, body);
  }

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<Book | null> {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() updateCatalogDto: UpdateCatalogDto,
  ): Promise<Book | null> {
    return this.booksService.update(id, updateCatalogDto);
  }

  // @Delete(':id')
  // async removeBook(@Param('id') id: string): Promise<void> {
  //   return this.booksService.remove(id);
  // }
}
