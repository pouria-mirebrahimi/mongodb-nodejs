import { ConfigService } from '../../../src/common/lib/helper/config.service';
import { IDatabaseDetails } from '../../../src/common/lib/interface/database.interface';
import { MongoDB } from '../../../src/common/lib/database/mongo';
import { Database } from '../../../src/common/lib/database/database';

describe('test connection to mongodb database', () => {
  let config: IDatabaseDetails;
  let mongodb: Database;

  beforeAll(() => {
    ConfigService.init();
    config = ConfigService.get<IDatabaseDetails>('database.mongodb');
  });

  it('should be gets the database data from config file', () => {
    expect(config).toHaveProperty('host');
    expect(config).toHaveProperty('port');
    expect(config).toHaveProperty('name');
  });

  it('should be connects to database through uri', async () => {
    const uri = `mongodb://${config.host}:${config.port}/${config.name}`;
    mongodb = new MongoDB(uri);
    await mongodb
      .connect()
      .then((success: string) =>
        expect(success).toEqual('Connection established'),
      );
  });

  afterAll(async () => {
    await mongodb.close();
  });
});
