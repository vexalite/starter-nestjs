import { Module } from '@nestjs/common';
import { SearchService } from './service';
import { SearchController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookInstituteSchema } from 'src/book-institute-relation/schema';
import { SearchRepository } from './repository';
import { BookSchema } from 'src/books/schema';
import { BooksRepository } from 'src/books/repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
    MongooseModule.forFeature([
      { name: 'BookInstitute', schema: BookInstituteSchema },
    ]),
  ],
  controllers: [SearchController],
  providers: [SearchService, SearchRepository, BooksRepository],
})
export class SearchModule {}
