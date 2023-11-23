import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ReservationsService } from './service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  issueBook(@Body() body: CreateReservationDto) {
    return this.reservationsService.issue(body);
  }

  @Patch('reissue:id')
  reIssueBook(@Param('id') id: string) {
    return this.reservationsService.reIssueBook(id);
  }

  @Patch('return/:id')
  returnBook(@Body() body: CreateReservationDto, @Param('id') id: string) {
    return this.reservationsService.returnBook(body, id);
  }
  @Get('overdue/:id')
  overdue(@Param('id') id: string) {
    return this.reservationsService.overdue(id);
  }

  @Get('all/:instituteid')
  findAll(@Param('instituteid') instituteid: string) {
    return this.reservationsService.findAll(instituteid);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }
}
