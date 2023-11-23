import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export interface InstituteSetting extends Document {
  instituteId: string;
  student: {
    borrowingPeriod: number;
    overdueCharges: number;
    borrowingCapacity: number;
  };
  employee: {
    borrowingPeriod: number;
    overdueCharges: number;
    borrowingCapacity: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

@Schema()
export class InstituteSettings extends Document {
  @Prop({ required: true })
  instituteId!: string;

  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  student!: {
    borrowingPeriod: number;
    overdueCharges: number;
    borrowingCapacity: number;
  };

  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  employee!: {
    borrowingPeriod: number;
    overdueCharges: number;
    borrowingCapacity: number;
  };

  @Prop()
  createdAt!: Date;

  @Prop()
  updatedAt?: Date;
}

export const InstituteSettingsSchema =
  SchemaFactory.createForClass(InstituteSettings);
