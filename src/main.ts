import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const natsMicroservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      url: 'nats://localhost:4222', // Adjust the URL as needed
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
