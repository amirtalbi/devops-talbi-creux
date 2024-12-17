import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class NotificationsGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  afterInit() {
    console.log('WebSocket server initialized');
  }

  notifyTaskAdded(task) {
    this.server.emit('taskAdded', task);
  }

  notifyTaskStatusChanged(task) {
    this.server.emit('taskStatusChanged', task);
  }
}
