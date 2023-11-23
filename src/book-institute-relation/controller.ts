import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
import { BookInstitutesService } from './service';
import { BookInstitute } from './schema';

@Controller('bookInstitutes')
export class BookInstitutesController {
  constructor(private readonly bookInstitutesService: BookInstitutesService) {}

  @Post(':instituteid')
  create(
    @Param('instituteid') instituteid: string,
    @Body() bookInstitute: BookInstitute,
  ): Promise<BookInstitute> {
    return this.bookInstitutesService.createBookInstitute(
      instituteid,
      bookInstitute,
    );
  }

  @Get('all/:instituteid')
  findAll(@Param('instituteid') instituteid: string) {
    return this.bookInstitutesService.getBookInstitutes(instituteid);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BookInstitute> {
    return this.bookInstitutesService.getBookInstituteById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() bookInstitute: Partial<BookInstitute>,
  ): Promise<BookInstitute> {
    return this.bookInstitutesService.updateBookInstitute(id, bookInstitute);
  }
}
