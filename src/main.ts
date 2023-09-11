import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError, useContainer } from 'class-validator';
import { configSwagger } from './infra/swagger/swagger';
import { ResponseInterceptor } from './infra/interceptors/ResponseInterceptor';
import { defaultErrorValidatorMessage } from './infra/message/validation-error';
import { corsOptions } from './infra/cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return defaultErrorValidatorMessage(errors);
      },
      stopAtFirstError: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());

  configSwagger(app);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors(corsOptions);

  await app.listen(3000);
}
bootstrap();
