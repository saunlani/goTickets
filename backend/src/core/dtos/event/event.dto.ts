import { IsString, IsArray, IsDateString } from 'class-validator';
import { CreateTicketDto } from '../ticket/ticket.dto';

export class CreateEventDto {
  @IsString()
  readonly title: string;

  @IsDateString()
  readonly date: string;

  @IsString()
  readonly city: string;

  @IsArray()
  readonly tickets?: CreateTicketDto[];
}
