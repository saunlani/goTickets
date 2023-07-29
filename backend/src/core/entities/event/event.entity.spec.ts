import { Event } from './event.entity';
import { Ticket } from '../ticket/ticket.entity';

describe('Event', () => {
  it('should create a new Event with the provided details', () => {
    const ticket = new Ticket('abc12345', 'Joe', 'Bob');
    const event = new Event('Event 1', new Date('2023-07-26'), 'Berlin', [
      ticket,
    ]);

    expect(event.title).toBe('Event 1');
    expect(event.date).toEqual(new Date('2023-07-26'));
    expect(event.city).toBe('Berlin');
    expect(event.tickets).toEqual([ticket]);
  });

  it('should generate a unique id for each event', () => {
    const ticket1 = new Ticket('abc12346', 'Joe', 'Bob');
    const event1 = new Event('Event 1', new Date('2023-07-26'), 'Berlin', [
      ticket1,
    ]);

    const ticket2 = new Ticket('abc12347', 'Sarah', 'Bob');
    const event2 = new Event('Event 2', new Date('2023-07-27'), 'Berlin', [
      ticket2,
    ]);

    expect(event1.id).not.toBeUndefined();
    expect(event1.id).not.toBeNull();
    expect(event1.id).not.toEqual(event2.id);
  });
});
