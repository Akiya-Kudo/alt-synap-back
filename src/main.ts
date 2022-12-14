import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './_prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
}
bootstrap();
