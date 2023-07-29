import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { EventService } from '../../services/event/event.service';
import { Event } from '../../entities/event/event.entity';
import { CreateEventDto } from '../../dtos/event/event.dto';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    try {
      const newEvent = this.eventService.create(createEventDto);
      return newEvent;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'There was a problem creating the event',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(@Query('limit') limit: number): Promise<Event[]> {
    try {
      return this.eventService.findAll(limit);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'There was a problem getting the events',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
