import { Module } from '@nestjs/common';
import { ReservationsService } from './service';
import { ReservationsController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationsSchema } from './schema';
import { ReservationRepository } from './repository';
import { BookInstitutesRepository } from 'src/book-institute-relation/repository';
import { BookInstituteSchema } from 'src/book-institute-relation/schema';
import { InstituteSettingsSchema } from 'src/instituteSettings/schema';
import { InstituteSettingRepository } from 'src/instituteSettings/repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Reservation', schema: ReservationsSchema },
    ]),
    MongooseModule.forFeature([
      { name: 'BookInstitute', schema: BookInstituteSchema },
    ]),
    MongooseModule.forFeature([
      { name: 'instituteSettings', schema: InstituteSettingsSchema },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [
    ReservationsService,
    ReservationRepository,
    BookInstitutesRepository,
    InstituteSettingRepository,
  ],
})
export class ReservationsModule {}
