import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from '@nestjs/common';
import {PlatformsService} from './platforms.service';
import {CreatePlatformDto} from './dto/create-platform.dto';
import {UpdatePlatformDto} from './dto/update-platform.dto';

@Controller('platforms')
export class PlatformsController {
    constructor(private readonly platformsService: PlatformsService) {}

    @Post()
    async create(@Body() createPlatformDto: CreatePlatformDto) {
        return this.platformsService.create(createPlatformDto);
    }

    @Get()
    async findAll() {
        return this.platformsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const platform = await this.platformsService.findOne(id);
        if (!platform) {
            throw new NotFoundException(`Platform with ID ${id} not found.`);
        }
        return platform;
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updatePlatformDto: UpdatePlatformDto) {
        const platform = await this.platformsService.update(id, updatePlatformDto);
        if (!platform) {
            throw new NotFoundException(`Platform with ID ${id} not found.`);
        }
        return platform;
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const result = await this.platformsService.remove(id);
        if (!result) {
            throw new NotFoundException(`Platform with ID ${id} not found.`);
        }
        return;
    }
}
