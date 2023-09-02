import { IUserProperties } from '../../../src/model/user/interface/user.interface';
import { expectType } from 'tsd';

// NOTE - Expected types

expectType<'firstName' | 'lastName' | 'age' | 'createdAt' | 'fullNameWithAge'>(
  'type' as keyof IUserProperties,
);
