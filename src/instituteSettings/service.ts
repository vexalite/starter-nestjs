import { Injectable } from '@nestjs/common';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import { InstituteSetting } from './schema';
import { InstituteSettingRepository } from './repository';

@Injectable()
export class InstituteService {
  constructor(
    private readonly instituteSettingRepository: InstituteSettingRepository,
  ) {}

  async create(
    createInstituteDto: CreateInstituteDto,
  ): Promise<InstituteSetting> {
    const createdInstitute =
      await this.instituteSettingRepository.create(createInstituteDto);
    return createdInstitute;
  }

  async findAll(): Promise<InstituteSetting[]> {
    const allInstitutes = await this.instituteSettingRepository.findAll();
    return allInstitutes;
  }

  async findOne(id: string): Promise<InstituteSetting> {
    const institute = await this.instituteSettingRepository.findById(id);
    return institute;
  }

  async update(
    id: string,
    updateInstituteDto: UpdateInstituteDto,
  ): Promise<InstituteSetting> {
    const updatedInstitute = await this.instituteSettingRepository.update(
      id,
      updateInstituteDto,
    );
    return updatedInstitute;
  }

  async remove(id: string): Promise<InstituteSetting> {
    const removedInstitute = await this.instituteSettingRepository.remove(id);
    return removedInstitute;
  }
}
