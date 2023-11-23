import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InstituteSetting } from './schema';
import { BaseRepository } from 'src/base.repository';

@Injectable()
export class InstituteSettingRepository extends BaseRepository<InstituteSetting> {
  constructor(
    @InjectModel('instituteSettings')
    private readonly instituteSettingModel: Model<InstituteSetting>,
  ) {
    super(instituteSettingModel);
  }
}
