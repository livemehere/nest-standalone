import { EventsGateway } from './events.gateway';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('events')
export class EventController {
  constructor(private eventGateWay: EventsGateway) {}

  @Post()
  sendNotice(@Body() body) {
    return this.eventGateWay.sendAll(body.msg);
  }
}
