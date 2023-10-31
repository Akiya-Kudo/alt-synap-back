import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './_prisma/prisma.service';
// import * as serviceAccount from '../tipsy-firebase.json'
import admin from "firebase-admin";

async function bootstrap() {
  admin.initializeApp({
    credential: admin.credential.cert({
      "type": process.env.TYPE,
      "project_id": process.env.PROJECT_ID,
      "private_key_id": process.env.PRIVATE_KEY_ID,
      "private_key": process.env.PRIVATEKEY,
      "client_email": process.env.CLIENT_EMAIL,
      "client_id": process.env.CLIENT_ID,
      "auth_uri": process.env.AUTH_URL,
      "token_uri": process.env.TOKEN_URL,
      "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
      "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL,
      "universe_domain": process.env.UNIVERSE_DOMAIN
    } as admin.ServiceAccount)
    // credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
  })
  const app = await NestFactory.create(AppModule);
  await app.enableCors({
    origin: ["https://alt-synap-front.vercel.app", "https://tipsy-search.net"],
    // methods: 'POST,GET,OPTION',
    credentials: true,
  })
  await app.listen(4000);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
}
bootstrap();
