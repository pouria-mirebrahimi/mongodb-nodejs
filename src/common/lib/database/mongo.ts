import mongoose from 'mongoose';
import { Database } from './database';

export class MongoDB extends Database {
  constructor(uri: string) {
    super(uri);
  }

  public async connect(): Promise<string> {
    try {
      await mongoose.connect(this.uri);
      return Promise.resolve('Connection established');
    } catch (e: any) {
      return Promise.reject(e.message);
    }
  }
}
