import {IsNotEmpty, IsOptional, IsString, IsUrl} from 'class-validator';

export class CreatePlatformDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    code: string

    @IsUrl()
    @IsOptional()
    apiUrl?: string;

    @IsString()
    @IsOptional()
    description?: string;
}