import { Schema, model } from 'mongoose';
import { IUserProperties } from './interface/user.interface';
import { IUserMethods, UserModel } from './interface/user.interface';

const UserSchema = new Schema<IUserProperties, UserModel, IUserMethods>({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    min: [8, 'too young'],
    max: [100, 'too old'],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.method('fullName', function fullName() {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.static('goldenName', function goldenName(name: string) {
  return name === 'Pouria';
});

UserSchema.virtual('fullNameWithAge').get(function () {
  return `${this.firstName} ${this.lastName}, ${this.age}`;
});

const UserModel = model<IUserProperties, UserModel>('User', UserSchema);
export { UserModel };
