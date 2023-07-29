import { Body, Controller, Post, Delete } from '@nestjs/common';
import { TicketService } from '../../services/ticket/ticket.service';
import { CreateTicketDto } from '../../dtos/ticket/ticket.dto';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    const ticket = this.ticketService.create(
      createTicketDto.barcode,
      createTicketDto.firstName,
      createTicketDto.lastName,
    );
    return ticket;
  }

  @Delete()
  clearUsedBarcodes() {
    this.ticketService.clearUsedBarcodes();
    return { message: 'Successfully cleared used barcodes.' };
  }
}
