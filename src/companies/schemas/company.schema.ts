import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {
    @Prop({ required: true, unique: true})
    name: string;

    @Prop()
    address?: string;

    @Prop()
    contactEmail?: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
CompanySchema.pre('save', function(next){
    this.updatedAt = new Date();
    next();
});

CompanySchema.pre('findOneAndUpdate', function() {
    this.set({ updatedAt: new Date() });
});

CompanySchema.pre('updateOne', function() {
    this.set({ updatedAt: new Date() });
});

CompanySchema.pre('updateMany', function() {
    this.set({ updatedAt: new Date() });
});

