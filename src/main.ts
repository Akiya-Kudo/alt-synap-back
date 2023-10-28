import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './_prisma/prisma.service';
import * as serviceAccount from '../tipsy-firebase.json'
import admin from "firebase-admin";
import { log } from 'console';

async function bootstrap() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
  })
  const app = await NestFactory.create(AppModule);
  // await app.enableCors({
  //   origin: ["https://alt-synap-front.vercel.app", "https://tipsy-search.net", "http://localhost:3000"],
  //   methods: 'POST,GET',
  // })
  app.enableCors({
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  });
  await app.listen(4000);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
}
bootstrap();
