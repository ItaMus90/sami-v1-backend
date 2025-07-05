import { Module } from '@nestjs/common';
import { PlatformsService } from './platforms.service';
import { PlatformsController } from './platforms.controller';
import {Platform, PlatformSchema} from './schemas/platform.schema';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: Platform.name, schema: PlatformSchema }])
  ],
  providers: [PlatformsService],
  controllers: [PlatformsController],
  exports: [PlatformsService]
})
export class PlatformsModule {}
