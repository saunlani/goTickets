import { Ticket } from '../ticket/ticket.entity';
import { v4 as uuidv4 } from 'uuid';

export class Event {
  constructor(title: string, date: Date, city: string, tickets?: Ticket[]) {
    this.id = uuidv4();
    this.title = title;
    this.date = date;
    this.city = city;
    this.tickets = tickets;
  }

  id: string;

  title: string;

  date: Date;

  city: string;

  tickets?: Ticket[];
}
