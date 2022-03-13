import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import csurf from 'csurf';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // setup swagger
  const config = new DocumentBuilder()
    .setTitle('JoSend')
    .setDescription('Send crypto coins/tokens to friends on chat applications.')
    .setVersion('1.0')
    .addTag('slack')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // export the port
  await app.listen(3030);

  // secure app
  app.use(helmet());
  app.use(csurf());
}
bootstrap();
