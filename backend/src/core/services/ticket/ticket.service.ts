import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Ticket } from '../../entities/ticket/ticket.entity';
import { InvalidBarcodeError } from '../../errors/InvalidBarcodeError';

@Injectable()
export class TicketService {
  create(barcode: string, firstName: string, lastName: string): Ticket {
    try {
      const ticket = new Ticket(barcode, firstName, lastName);
      return ticket;
    } catch (error) {
      if (error instanceof InvalidBarcodeError) {
        throw new BadRequestException(error.message);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  clearUsedBarcodes() {
    Ticket.clearUsedBarcodes();
  }
}
