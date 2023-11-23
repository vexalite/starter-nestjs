import { Module } from '@nestjs/common';
import { BooksService } from './service';
import { BooksController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './schema';
import { BooksRepository } from './repository';
import { BookInstitutesService } from 'src/book-institute-relation/service';
import { BookInstitutesRepository } from 'src/book-institute-relation/repository';
import { BookInstituteSchema } from 'src/book-institute-relation/schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
    MongooseModule.forFeature([
      { name: 'BookInstitute', schema: BookInstituteSchema },
    ]),
  ],
  controllers: [BooksController],
  providers: [
    BooksService,
    BooksRepository,
    BookInstitutesService,
    BookInstitutesRepository,
  ],
})
export class BooksModule {}
