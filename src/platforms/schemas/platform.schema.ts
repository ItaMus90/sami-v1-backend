import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlatformDocument = Platform & Document;

@Schema()
export class Platform {
    @Prop({ required: true, unique: true})
    name: string; // e.g., "Facebook Ads", "Google Ads"

    @Prop({ required: true, unique: true})
    code: string; // e.g., "FB", "GOOG"

    @Prop()
    apiUrl?: string; // Base API URL for this platform

    @Prop()
    description?: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const PlatformSchema = SchemaFactory.createForClass(Platform);
PlatformSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

PlatformSchema.pre('findOneAndUpdate', function() {
    this.set({ updatedAt: new Date() });
});

PlatformSchema.pre('updateOne', function() {
    this.set({ updatedAt: new Date() });
});

PlatformSchema.pre('updateMany', function() {
    this.set({ updatedAt: new Date() });
});