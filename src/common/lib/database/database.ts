import { IDataBase } from '../interface/database.interface';

export abstract class Database implements IDataBase {
  constructor(public readonly uri: string) {}
  public abstract connect(): Promise<string>;
  public abstract close(): Promise<void>;
}
