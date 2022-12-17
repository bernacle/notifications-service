import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['well-cobra-14839-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'd2VsbC1jb2JyYS0xNDgzOSQ0QD_TmKu0osSZzs7BCTEnFnWSKNZ3rGnlMK2KQA4',
          password:
            'TQtVEOzOyoVVMCVvK0b0ZWcA2z6WOEUUoIZCuNPaqTg1KJICZmCcwWy67cjNBqEFqI_PoA==',
        },
        ssl: true,
      },
    });
  }
  async onModuleDestroy() {
    await this.close();
  }
}
