import { Model } from 'mongoose';

export interface IUserProperties {
  firstName: string;
  lastName: string;
  age: number;
  createdAt: Date;

  // virtual field
  fullNameWithAge: string;
}

export interface IUserMethods {
  fullName(): string;
}

export interface UserModel
  extends Model<IUserProperties, Record<string, never>, IUserMethods> {
  goldenName(name: string): boolean;
}
