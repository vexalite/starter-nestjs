import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export interface BookInstitute extends Document {
  bookInfo: string;
  instituteId: string;
  quantity: number;
  isAvailableForIssue?: boolean;
  barcode?: string;
  individualBookId: string;
}

@Schema()
export class BookInstitutes extends Document {
  @Prop({ unique: true })
  id: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Book' })
  bookInfo!: string;

  @Prop({ required: true })
  instituteId!: string;

  @Prop({ required: true })
  quantity!: number;

  @Prop({ required: true, default: true })
  isAvailableForIssue!: boolean;

  @Prop({ required: false })
  barcode: string;

  @Prop({ required: true })
  individualBookId: string;
}

const BookInstituteSchema = SchemaFactory.createForClass(BookInstitutes);

BookInstituteSchema.pre('save', function (next) {
  const prefix = 'customPrefix-';
  this._id = prefix + this.individualBookId;
  next();
});

export { BookInstituteSchema };
