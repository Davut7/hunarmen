import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import * as Sentry from '@sentry/node';
import CustomLogger from './logger/helpers/customLogger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TimeoutInterceptor } from './helpers/interceptors/timeout.interceptor';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const port = process.env.PORT;
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger:
        process.env.NODE_ENV === 'production'
          ? ['error']
          : ['log', 'debug', 'error', 'warn'],
    },
  );

  Sentry.init({
    dsn: process.env.SENTRY_DNS,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),

      // new Sentry.Integrations.Fastify({ app }),
      nodeProfilingIntegration(),
    ],

    tracesSampleRate: 1.0,

    profilesSampleRate: 1.0,
  });

  app.use(Sentry.Handlers.requestHandler());

  app.use(Sentry.Handlers.tracingHandler());

  const config = new DocumentBuilder()
    .setTitle('Hunarmen server')
    .setDescription('Hunarmen server api documentation')
    .setVersion('1.0')
    .addTag('Hunarmen')
    .addServer('/api')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: false,
  });

  SwaggerModule.setup('api/docs', app, document, { useGlobalPrefix: true });
  app.enableShutdownHooks();
  app.use(helmet());
  app.enableCors({
    credentials: true,
    origin: '*',
  });
  app.use(cookieParser(`${process.env.COOKIE_SECRET}`));
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new TimeoutInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  app.setGlobalPrefix('api');
  await app.listen(port, () => {
    console.log(`Your server is listening on port ${port}`);
  });

  app.useLogger(app.get(CustomLogger, { strict: false }));
  app.use(Sentry.Handlers.tracingHandler());
}

bootstrap();
