import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from '../../controllers/event/event.controller';
import { EventService } from '../../services/event/event.service';
import { CreateEventDto } from '../../dtos/event/event.dto';
import { CreateTicketDto } from '../../dtos/ticket/ticket.dto';
import { Ticket } from '../../entities/ticket/ticket.entity';

describe('EventController', () => {
  let controller: EventController;
  let service: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [EventService],
    }).compile();

    controller = module.get<EventController>(EventController);
    service = module.get<EventService>(EventService);
  });

  it('should create an event without a ticket', async () => {
    const createEventDto: CreateEventDto = {
      title: 'Event 1',
      date: '2023-07-26',
      city: 'Berlin',
      tickets: [],
    };

    const mockEvent = {
      id: 'someId',
      ...createEventDto,
      date: new Date(createEventDto.date),
      tickets: [],
    };

    jest.spyOn(service, 'create').mockImplementation(() => mockEvent);

    expect(controller.create(createEventDto)).toBe(mockEvent);
  });

  it('should create an event with a ticket', async () => {
    const createTicketDto: CreateTicketDto = {
      barcode: '12345678',
      firstName: 'Bernd',
      lastName: 'Schmidt',
    };

    const createEventDto: CreateEventDto = {
      title: 'Event 2',
      date: '2023-07-26',
      city: 'Berlin',
      tickets: [],
    };

    const mockTicket = new Ticket(
      createTicketDto.barcode,
      createTicketDto.firstName,
      createTicketDto.lastName,
    );

    const mockEventTwo = {
      id: 'someId',
      ...createEventDto,
      date: new Date(createEventDto.date),
      tickets: [mockTicket],
    };
    jest.spyOn(service, 'create').mockImplementation(() => mockEventTwo);

    const result = controller.create(createEventDto);
    expect(result).toEqual(mockEventTwo);
    expect(result.id).toEqual(mockEventTwo.id);
    expect(result.title).toEqual(mockEventTwo.title);
    expect(result.city).toEqual(mockEventTwo.city);
    expect(result.date).toEqual(mockEventTwo.date);
    expect(result.tickets).toHaveLength(1);
    expect(result.tickets[0]).toEqual(mockTicket);
    expect(result.tickets[0].barcode).toEqual(createTicketDto.barcode);
    expect(result.tickets[0].firstName).toEqual(createTicketDto.firstName);
    expect(result.tickets[0].lastName).toEqual(createTicketDto.lastName);
  });
});
