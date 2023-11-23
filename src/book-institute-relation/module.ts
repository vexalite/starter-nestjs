import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookInstituteSchema } from './schema';
import { BookInstitutesController } from './controller';
import { BookInstitutesService } from './service';
import { BookInstitutesRepository } from './repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'BookInstitute', schema: BookInstituteSchema },
    ]),
  ],
  controllers: [BookInstitutesController],
  providers: [BookInstitutesService, BookInstitutesRepository],
})
export class BookInstituteRelationModule {}
