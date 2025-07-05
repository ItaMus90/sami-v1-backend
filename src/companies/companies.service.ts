import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Company, CompanyDocument} from './schemas/company.schema';
import {Model} from 'mongoose';
import {CreateCompanyDto} from './dto/create-company.dto';
import {UpdateCompanyDto} from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
    constructor(
        @InjectModel(Company.name) private companyModel: Model<CompanyDocument>
    ) {}

    async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
        const createCompany = new this.companyModel(createCompanyDto);
        return createCompany.save();
    }

    async findAll(): Promise<Company[]> {
        return this.companyModel.find().exec();
    }

    async findOne(id: string): Promise<Company | null> {
        return this.companyModel.findById(id).exec();
    }

    async update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<Company | null> {
        return this.companyModel.findByIdAndUpdate(id, updateCompanyDto, { new: true }).exec();
    }

    async remove(id: string): Promise<any> {
        return this.companyModel.findByIdAndDelete(id).exec()
    }
}
