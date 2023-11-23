import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { InstituteService } from './service';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';

@Controller('institute')
export class InstituteController {
  constructor(private readonly instituteService: InstituteService) {}

  @Post()
  create(@Body() body: CreateInstituteDto) {
    return this.instituteService.create(body);
  }

  @Get()
  findAll() {
    return this.instituteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instituteService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateInstituteDto: UpdateInstituteDto,
  ) {
    return this.instituteService.update(id, updateInstituteDto);
  }
}
