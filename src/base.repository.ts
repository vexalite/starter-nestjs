import { Model, Document, FilterQuery } from 'mongoose';

export class BaseRepository<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async create(item: Partial<T>): Promise<T> {
    const createdItem = new this.model(item);
    return createdItem.save();
  }

  async findById(id: string): Promise<T> {
    return this.model.findById(id).exec();
  }

  async findByIdAndPopulate(id: string): Promise<T | null> {
    const result = await this.model
      .findById(id)
      .populate(['bookId', 'instituteId'])
      .exec();

    return result as T | null;
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async findAllReservation(id: string): Promise<T[]> {
    return this.model
      .find({
        instituteId: id,
      })
      .exec();
  }

  async findAllBooks(id: string): Promise<T[]> {
    return this.model
      .find({
        instituteId: id,
      })
      .populate('bookId')
      .exec();
  }

  async update(id: string, item: Partial<T>): Promise<T> {
    return this.model.findByIdAndUpdate(id, item, { new: true }).exec();
  }

  async delete(id: string): Promise<T> {
    return this.model.findByIdAndDelete(id).exec();
  }

  async remove(id: string): Promise<T> {
    return this.model.findByIdAndDelete(id).exec();
  }

  async findOne(filter: FilterQuery<T>): Promise<T> {
    return this.model.findOne(filter).exec();
  }

  async findMultiple(filter: FilterQuery<T>): Promise<T[]> {
    return this.model.find(filter).exec();
  }

  async findBookByISBN(isbn: string): Promise<T> {
    return this.model
      .findOne({
        $or: [{ 'ISBN.ISBN10': isbn }, { 'ISBN.ISBN13': isbn }],
      })
      .exec();
  }
}
