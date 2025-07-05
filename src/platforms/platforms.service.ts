import {ConflictException, Injectable, OnModuleInit} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Platform, PlatformDocument} from './schemas/platform.schema';
import {Model} from 'mongoose';
import {CreatePlatformDto} from './dto/create-platform.dto';
import {UpdatePlatformDto} from './dto/update-platform.dto';

@Injectable()
export class PlatformsService implements OnModuleInit {
    constructor(
        @InjectModel(Platform.name) private platformModel: Model<PlatformDocument>
    ) {}

    async onModuleInit() {
        await this.platformModel.createIndexes();
        await this.checkIndexes();
    }

    async checkIndexes() {
        const indexes = await this.platformModel.collection.indexes();
        const nameIndex = indexes.find(index =>
            index.key && index.key.name === 1 && index.unique === true
        );

        if (!nameIndex){
            console.log('Unique index on name field is missing!');
        }
    }

    async create(createPlatformDto: CreatePlatformDto): Promise<Platform> {
        try {
            const platform = new this.platformModel(createPlatformDto);
            return await platform.save();
        }catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Platform with this name or code already exists');
            }
            throw error;
        }
    }

    async findAll(): Promise<Platform[]> {
        return this.platformModel.find().exec();
    }

    async findOne(id: string): Promise<Platform | null> {
        return this.platformModel.findById(id).exec();
    }

    async findByCode(code: string): Promise<Platform | null> {
        return this.platformModel.findOne({ code }).exec();
    }

    async update(id: string, updatePlatformDto: UpdatePlatformDto): Promise<Platform | null> {
        return this.platformModel.findByIdAndUpdate(id, updatePlatformDto, { new: true }).exec();
    }

    async remove(id: string): Promise<any> {
        return this.platformModel.findByIdAndDelete(id).exec();
    }
}
