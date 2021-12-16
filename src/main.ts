require('dotenv').config({ path: '.env' });
import { NestFactory } from '@nestjs/core';
import cloudConfigClient from 'cloud-config-client';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import { config } from './config';
import { Logger, ValidationPipe, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
const logger: Logger = new Logger('Main');
const port = process.env.NODE_SERVER_PORT || config.get('server.port');
const useJHipsterRegistry = config.get('eureka.client.enabled');
const mongoose = require('mongoose');
if(process.env.BACKEND_ENV === 'dev'){
    mongoose.set('debug', true);
}

async function bootstrap(): Promise<void> {
    //loadCloudConfig();

    const appOptions = { cors: true };
    const app = await NestFactory.create(AppModule, appOptions);
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: (): BadRequestException => new BadRequestException('Validation error'),
        }),
    );

    const staticClientPath = config.getClientPath();
    if (fs.existsSync(staticClientPath)) {
        logger.log(`Serving static client resources on ${staticClientPath}`);
    } else {
        logger.log('No client it has been found');
    }
    setupSwagger(app);

    await app.listen(port);
    logger.log(`Application listening on port ${port}`);
}

async function loadCloudConfig(): Promise<void> {
    if (useJHipsterRegistry) {
        const endpoint = config.get('cloud.config.uri') || 'http://admin:admin@localhost:8761/config';
        logger.log(`Loading cloud config from ${endpoint}`);

        const cloudConfig = await cloudConfigClient.load({
            context: process.env,
            endpoint,
            name: config.get('cloud.config.name'),
            profiles: config.get('cloud.config.profile') || ['prod'],
            // auth: {
            //   user: config.get('jhipster.registry.username') || 'admin',
            //   pass: config.get('jhipster.registry.password') || 'admin'
            // }
        });
        config.addAll(cloudConfig.properties);
    }
}


bootstrap();
