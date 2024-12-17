import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class SomeService {
  constructor(@Inject('NATS_SERVICE') private readonly client: ClientProxy) {}

  async sendMessage(pattern: string, data: any) {
    return this.client.send(pattern, data).toPromise();
  }
} 