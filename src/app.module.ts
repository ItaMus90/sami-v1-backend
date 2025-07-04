import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';
import {ConfigModule} from '@nestjs/config';
import * as process from 'node:process';
import {MongooseModule} from '@nestjs/mongoose';
import { PlatformsModule } from './platforms/platforms.module';

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
      }),
      MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/test'
      ),
      CompaniesModule,
      PlatformsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
