import mongoose from 'mongoose';
import { UserModel } from '../../../src/model/user/user.model';

describe('evaluating the User model', () => {
  it('should be defined', () => {
    const user = new UserModel();
    expect(user).toBeDefined();
    expect(user._id instanceof mongoose.Types.ObjectId).toBe(true);
  });

  it('should has firstName, lastName, age, createdAt property', () => {
    const user = new UserModel();

    expect(user).toHaveProperty('firstName');
    expect(user).toHaveProperty('lastName');
    expect(user).toHaveProperty('age');
    expect(user).toHaveProperty('createdAt');
    expect(user).toHaveProperty('fullNameWithAge');
  });

  it('should has an instance method: fullName', () => {
    const firstName = 'Pouria',
      lastName = 'Mirebrahimi';
    const user = new UserModel({ firstName, lastName });
    expect(user.fullName()).toBe(`${firstName} ${lastName}`);
  });

  it('should has an static method: goldenName', () => {
    const name = 'Pouria';
    expect(UserModel.goldenName(name)).toBe(true);
  });

  it('should has an virtual method: fullNameWithAge', () => {
    const firstName = 'Pouria',
      lastName = 'Mirebrahimi';
    const age = 20;

    const user = new UserModel({ firstName, lastName, age });
    expect(user.fullNameWithAge).toBe(`${firstName} ${lastName}, ${age}`);
  });
});
