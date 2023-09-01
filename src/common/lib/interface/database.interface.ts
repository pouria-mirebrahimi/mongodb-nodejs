export interface IDataBase {
  uri: string;
  connect(): Promise<string>;
  close(): Promise<void>;
}

export interface IDatabaseDetails {
  host: string;
  port: number;
  name: string;
}
