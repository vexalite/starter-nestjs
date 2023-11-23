import { Controller, Get, Param, UsePipes } from '@nestjs/common';
import { SearchService } from './service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('universal/:instituteid/:text')
  async universalSearch(
    @Param('instituteid') instituteid: string,
    @Param('text') text: string,
  ) {
    const books = await this.searchService.universalSearch(instituteid, text);
    return books;
  }

  // @Get('title/:title')
  // async titleSearch(
  //   @Param('title') title: string,
  //   @Param('instituteid') instituteid: string,
  // ) {
  //   const books = await this.searchService.titleSearch(title, instituteid);
  //   return books;
  // }

  // @Get('isbn/:isbn')
  // async ISBNSearch(
  //   @Param('isbn') isbn: string,
  //   @Param('instituteid') instituteid: string,
  // ) {
  //   const books = await this.searchService.ISBNSearch(isbn, instituteid);
  //   return books;
  // }

  // @Get('language/:language')
  // async languageSearch(
  //   @Param('language') language: string,
  //   @Param('instituteid') instituteid: string,
  // ) {
  //   const books = await this.searchService.languageSearch(
  //     language,
  //     instituteid,
  //   );
  //   return books;
  // }

  // @Get('category/:category')
  // async categorySearch(
  //   @Param('category') category: string,
  //   @Param('instituteid') instituteid: string,
  // ) {
  //   const books = await this.searchService.categorySearch(
  //     category,
  //     instituteid,
  //   );
  //   return books;
  // }

  // @Get('publisher/:publisher')
  // async publisherSearch(
  //   @Param('publisher') publisher: string,
  //   @Param('instituteid') instituteid: string,
  // ) {
  //   const books = await this.searchService.publisherSearch(
  //     publisher,
  //     instituteid,
  //   );
  //   return books;
  // }
}
