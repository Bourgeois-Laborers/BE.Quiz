import { Module } from '@nestjs/common';
import { EventGateway } from '@event/event.gateway';
import { SocketService } from '@event/event.service';

@Module({
  providers: [EventGateway, SocketService],
})
export class EventsModule {}
