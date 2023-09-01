export interface IDataBase {
  uri: string;
  connect(): Promise<string>;
}

export interface IDatabaseInstance {
  host: string;
  port: number;
  name: string;
}
