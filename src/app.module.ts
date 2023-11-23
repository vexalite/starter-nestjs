import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BookInstituteRelationModule } from './book-institute-relation/module';
import { InstituteSettingsModule } from './instituteSettings/module';
import { ReservationsModule } from './reservations/module';
import { SearchModule } from './search/module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI as string),
    BooksModule,
    BookInstituteRelationModule,
    InstituteSettingsModule,
    ReservationsModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
