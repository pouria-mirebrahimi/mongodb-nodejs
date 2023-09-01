import fs from 'fs';
import yaml from 'yaml';
import dotenv from 'dotenv';

export abstract class ConfigService {
  static #environments: any;

  public static init(): void {
    dotenv.config();
    const fileName = `${process.env.NODE_ENV?.toLowerCase()}.yaml`;
    const filePath = `${__dirname}/../../config/${fileName}`;
    const configurations = fs.readFileSync(filePath, 'utf-8');

    ConfigService.#environments = yaml.parse(configurations);
  }

  public static get<T>(keyString: string): T {
    const keys = keyString.split('.');
    return ConfigService.getValue(keys) as T;
  }

  private static getValue(
    key: string[],
    obj: any = ConfigService.#environments,
  ): any {
    return !(key.length - 1)
      ? obj[key[0]]
      : ConfigService.getValue(key.splice(1), obj[key[0]]);
  }
}
