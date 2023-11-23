import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './schema';
import { ReservationRepository } from './repository';
import { BookInstitutesRepository } from 'src/book-institute-relation/repository';
import { InstituteSettingRepository } from 'src/instituteSettings/repository';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly bookInstitutesRepository: BookInstitutesRepository,
    private readonly instituteSettingRepository: InstituteSettingRepository,
  ) {}

  async issue(body: CreateReservationDto): Promise<Reservation | string> {
    const getQuantity = await this.bookInstitutesRepository.findOne({
      bookId: body.bookId,
      instituteId: body.instituteId,
    });
    // console.log(getQuantity.quantity);

    const getIssued = await this.reservationRepository.findMultiple({
      bookId: body.bookId,
      instituteId: body.instituteId,
    });
    // console.log(getIssued.length);

    const checkAvailability = getQuantity.quantity - getIssued.length;
    console.log(`available -- ${checkAvailability}`);

    const getBorrowingPeriod = await this.instituteSettingRepository.findOne({
      instituteId: body.instituteId,
    });
    // console.log(getBorrowingPeriod.student.borrowingPeriod);
    if (checkAvailability > 0) {
      if (body.patronType === 'student') {
        console.log(getIssued);
        // if (getIssued.patronId === body.patronId) {
        body.dueDate = new Date();
        body.dueDate.setDate(
          body.dueDate.getDate() + getBorrowingPeriod.student.borrowingPeriod,
        );
        const createdReservation =
          await this.reservationRepository.create(body);
        return createdReservation;
        // } else {
        //   return `max capacity reached`;
        // }
      } else {
        body.dueDate = new Date();
        body.dueDate.setDate(
          body.dueDate.getDate() + getBorrowingPeriod.employee.borrowingPeriod,
        );
        const createdReservation =
          await this.reservationRepository.create(body);
        return createdReservation;
      }
    } else {
      return `unfortunately!, this book is not available`;
    }
  }

  async reIssueBook(id: string): Promise<Reservation | string> {
    const getReservation = await this.reservationRepository.findById(id);
    console.log(getReservation);
    const getBorrowingPeriod = await this.instituteSettingRepository.findOne({
      instituteId: getReservation.instituteId,
    });
    getReservation.renewDate = new Date();
    if (getReservation.patronType === 'student') {
      getReservation.dueDate = new Date();
      getReservation.dueDate.setDate(
        getReservation.dueDate.getDate() +
          getBorrowingPeriod.student.borrowingPeriod,
      );
      const createdReservation =
        await this.reservationRepository.create(getReservation);
      return createdReservation;
    } else {
      getReservation.dueDate = new Date();
      getReservation.dueDate.setDate(
        getReservation.dueDate.getDate() +
          getBorrowingPeriod.employee.borrowingPeriod,
      );
      const createdReservation =
        await this.reservationRepository.create(getReservation);
      return createdReservation;
    }
  }
  async returnBook(
    body: CreateReservationDto,
    id: string,
  ): Promise<Reservation | string> {
    const getReservation = await this.reservationRepository.findById(id);
    getReservation.returnedDate = new Date();
    getReservation.status = 'returned';
    getReservation.overdueChargesPaid = body.overdueChargesPaid;
    await this.reservationRepository.create(getReservation);
    return getReservation;
  }

  async overdue(id: string): Promise<number> {
    const getReservation = await this.reservationRepository.findById(id);
    const getBorrowingPeriod = await this.instituteSettingRepository.findOne({
      instituteId: getReservation.instituteId,
    });
    const currentDate = new Date();
    const dueDate = new Date(getReservation.dueDate);
    if (dueDate > currentDate) {
      return 0;
    }
    const overDueDays = Math.floor(
      ((dueDate as any) - (currentDate as any)) / (24 * 60 * 60 * 1000),
    );
    console.log(
      `${new Date(currentDate)} + ${new Date(dueDate)} = ${overDueDays}`,
    );

    if (getReservation.patronType === 'student') {
      const overdueCharges =
        overDueDays * getBorrowingPeriod.student.overdueCharges;
      return overdueCharges;
    } else {
      const overdueCharges =
        overDueDays * getBorrowingPeriod.employee.overdueCharges;
      return overdueCharges;
    }
  }

  async findAll(id: string): Promise<Reservation[]> {
    console.log(id);
    const allReservations =
      await this.reservationRepository.findAllReservation(id);
    return allReservations;
  }

  async findOne(id: string): Promise<Reservation> {
    const reservations = await this.reservationRepository.findById(id);
    return reservations;
  }
}
