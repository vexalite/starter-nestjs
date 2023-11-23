import { Module } from '@nestjs/common';
import { InstituteService } from './service';
import { InstituteController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InstituteSettingsSchema } from './schema';
import { InstituteSettingRepository } from './repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'instituteSettings', schema: InstituteSettingsSchema },
    ]),
  ],
  controllers: [InstituteController],
  providers: [InstituteService, InstituteSettingRepository],
  // exports: [InstituteService],
})
export class InstituteSettingsModule {}
