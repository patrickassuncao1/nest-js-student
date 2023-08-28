import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const configSwagger = (app: INestApplication<any>) => {
  const config = new DocumentBuilder()
    .setTitle('Expedente-API')
    .setDescription('The expediente API description')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      description: 'Autenticação utilizando JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
};

export { configSwagger };
