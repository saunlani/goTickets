import { Test, TestingModule } from '@nestjs/testing';
import { TicketController } from './ticket.controller';
import { TicketService } from '../../services/ticket/ticket.service';
import { CreateTicketDto } from '../../dtos/ticket/ticket.dto';
import { Ticket } from '../../entities/ticket/ticket.entity';

describe('TicketController', () => {
  let controller: TicketController;
  let service: TicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketController],
      providers: [TicketService],
    }).compile();

    controller = module.get<TicketController>(TicketController);
    service = module.get<TicketService>(TicketService);
  });

  it('should call the service create method and return the ticket with correct properties', async () => {
    const createTicketDto: CreateTicketDto = {
      barcode: 'A1B2C3D4',
      firstName: 'Bernd',
      lastName: 'Schmidt',
    };

    const ticket: Ticket = new Ticket(
      createTicketDto.barcode,
      createTicketDto.firstName,
      createTicketDto.lastName,
    );

    jest.spyOn(service, 'create').mockImplementation(() => ticket);

    const createdTicket = controller.create(createTicketDto);

    expect(createdTicket).toBe(ticket);
    expect(createdTicket.barcode).toBe(createTicketDto.barcode);
    expect(createdTicket.firstName).toBe(createTicketDto.firstName);
    expect(createdTicket.lastName).toBe(createTicketDto.lastName);
    expect(service.create).toBeCalledWith(
      createTicketDto.barcode,
      createTicketDto.firstName,
      createTicketDto.lastName,
    );
  });

  it('should call the service clearUsedBarcodes method', async () => {
    const serviceSpy = jest.spyOn(service, 'clearUsedBarcodes');

    expect(controller.clearUsedBarcodes()).toEqual({
      message: 'Successfully cleared used barcodes.',
    });
    expect(serviceSpy).toBeCalled();
  });
});
