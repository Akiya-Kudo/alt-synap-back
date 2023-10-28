import { createServer, IncomingMessage, ServerResponse } from 'http';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';

let cachedApp: INestApplication;

const initializeApplication = async (): Promise<INestApplication> => {
  if (!cachedApp) {
    cachedApp = await NestFactory.create(AppModule);
    await cachedApp.init();
  }
  return cachedApp;
};

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  const app = await initializeApplication();
  app.getHttpAdapter().getInstance().run(req, res);
});

export default server;