import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  // ==========================================
  // CONFIGURACIÓN DE SWAGGER
  // ==========================================
  const config = new DocumentBuilder()
    .setTitle('DonaVida API - Emergencia Venezuela')
    .setDescription('API para la coordinación de donación de sangre en zonas de desastre.')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // La documentación estará disponible en http://localhost:3000/api/docs
  SwaggerModule.setup('api/docs', app, document); 
  // ==========================================  

  const port = 3000;
  await app.listen(port);
  
  logger.log(`Servidor ejecutándose en http://localhost:${port}`);
  logger.log(`Documentación Swagger en http://localhost:${port}/api/docs`);
}
bootstrap();