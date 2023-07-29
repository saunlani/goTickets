import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Event } from '../../entities/event/event.entity';
import { CreateEventDto } from '../../dtos/event/event.dto';
import { Ticket } from '../../entities/ticket/ticket.entity';
import { InvalidBarcodeError } from '../../errors/InvalidBarcodeError';

@Injectable()
export class EventService {
  private readonly events: Event[] = [];

  create(createEventDto: CreateEventDto): Event {
    try {
      const tickets = createEventDto.tickets?.map(
        (ticket) =>
          new Ticket(ticket.barcode, ticket.firstName, ticket.lastName),
      );

      const event = new Event(
        createEventDto.title,
        new Date(createEventDto.date),
        createEventDto.city,
        tickets,
      );
      this.events.push(event);
      return event;
    } catch (error) {
      if (error instanceof InvalidBarcodeError) {
        throw new BadRequestException(error.message);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  findAll(limit?: number): Event[] {
    return limit ? this.events.slice(0, limit) : this.events;
  }
}
