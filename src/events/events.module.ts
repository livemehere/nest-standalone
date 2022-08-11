import { EventController } from './events.controller';
import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';

@Module({
  controllers: [EventController],
  providers: [EventsGateway],
})
export class EventsModule {}
