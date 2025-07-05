import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {CompanySchema} from './schemas/company.schema';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }])
  ],
  providers: [CompaniesService],
  controllers: [CompaniesController],
  exports: [CompaniesService]
})
export class CompaniesModule {}
