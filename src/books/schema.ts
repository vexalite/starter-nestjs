import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

interface Dimensions {
  height?: number;
  width?: number;
  thickness?: number;
}

interface ISBN {
  ISBN10?: string;
  ISBN13?: string;
}

export interface Book extends Document {
  title: string;
  author: string[];
  publisher: string[];
  publishedDate: Date;
  description: string;
  ISBN: ISBN;
  pageCount: number;
  dimensions?: Dimensions;
  mainCategory: string;
  categories?: string[];
  edition?: string;
  volume?: string;
  coverImageUrl?: string;
  language: string;
  shelfLocation?: string;
  tags?: string[];
  averageRating?: number;
  createdAt: Date;
  updatedAt?: Date | undefined;
}

@Schema()
export class Books extends Document {
  @Prop({ required: true, index: true })
  title!: string;

  @Prop({ required: true, index: true })
  author!: string[];

  @Prop({ required: true, index: true })
  publisher!: string[];

  @Prop({ required: true })
  publishedDate!: Date;

  @Prop({ required: true })
  description!: string;

  @Prop({ type: mongoose.Schema.Types.Mixed, index: true })
  ISBN!: {
    ISBN10?: string;
    ISBN13?: string;
  };

  @Prop({ required: true })
  pageCount!: number;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  dimensions?: {
    height?: number;
    width?: number;
    thickness?: number;
  };

  @Prop({ required: true, index: true })
  mainCategory!: string;

  @Prop({ index: true })
  categories?: string[];

  @Prop()
  edition?: string;

  @Prop()
  volume?: string;

  @Prop()
  coverImageUrl?: string;

  @Prop({ required: true, index: true })
  language!: string;

  @Prop()
  shelfLocation?: string;

  @Prop()
  tags?: string[];

  @Prop()
  averageRating?: number;

  @Prop()
  createdAt!: Date;

  @Prop()
  updatedAt?: Date;
}

const BookSchema = SchemaFactory.createForClass(Books);

BookSchema.index({
  title: 'text',
  author: 'text',
  publisher: 'text',
  mainCategory: 'text',
  language: 'text',
});

export { BookSchema };
