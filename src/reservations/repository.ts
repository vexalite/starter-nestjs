import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from './schema';
import { BaseRepository } from 'src/base.repository';

@Injectable()
export class ReservationRepository extends BaseRepository<Reservation> {
  constructor(
    @InjectModel('Reservation')
    private readonly reservationModel: Model<Reservation>,
  ) {
    super(reservationModel);
  }
}
