import {ConflictException, Injectable, OnModuleInit} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Company, CompanyDocument} from './schemas/company.schema';
import {Model} from 'mongoose';
import {CreateCompanyDto} from './dto/create-company.dto';
import {UpdateCompanyDto} from './dto/update-company.dto';

@Injectable()
export class CompaniesService implements OnModuleInit {
    constructor(
        @InjectModel(Company.name) private companyModel: Model<CompanyDocument>
    ) {}

    async onModuleInit(){
        await this.companyModel.createIndexes();
        await this.checkIndexes();
    }

    async checkIndexes() {
        const indexes = await this.companyModel.collection.indexes();
        const nameIndex = indexes.find(index =>
            index.key && index.key.name === 1 && index.unique === true
        );
        if (!nameIndex){
            console.log('Unique index on name field is missing!');
        }
    }

    async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
        try {
            const createCompany = new this.companyModel(createCompanyDto);
            return await createCompany.save();
        }catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Company with this name already exists');
            }
            throw error;
        }
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
