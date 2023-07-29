import { Module } from '@nestjs/common';
import { AppController } from './core/controllers/app/app.controller';
import { AppService } from './core/services/app/app.service';
import { EventController } from './core/controllers/event/event.controller';
import { EventService } from './core/services/event/event.service';

@Module({
  imports: [],
  controllers: [AppController, EventController],
  providers: [AppService, EventService],
})
export class AppModule {}
