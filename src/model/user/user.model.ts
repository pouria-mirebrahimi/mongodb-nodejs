import mongoose from 'mongoose';

const UserSchema = mongoose.Schema;

const UserModelSchema = new UserSchema({
  name: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    min: [8, 'Age is below of valid threshold'],
    max: [100, 'Age is above of valid threshold'],
    required: true,
  },

  createdAt: Date,
});

const UserModel = mongoose.model('User', UserModelSchema);
export { UserModel };
