import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class CounterGateWay
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket) {
    console.log('Client connected', client.id);

    const interval = setInterval(() => {
      client.emit('request_counter');
    }, 1000);

    client.data.interval = interval;
  }

  handleDisconnect(client: Socket) {
    clearInterval(client.data.interval);
    console.log('Client disconnected', client.id);
  }

  @SubscribeMessage('set_counter_value')
  handleCounterValue(client: Socket, payload: number) {
    console.log(`Counter value from client ${client.id}: ${payload}`);
  }
}
