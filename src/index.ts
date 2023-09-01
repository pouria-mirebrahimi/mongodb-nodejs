import { Database } from './common/lib/database/database';
import { MongoDB } from './common/lib/database/mongo';
import { ConfigService } from './common/lib/helper/config.service';
import { IDatabaseInstance } from './common/lib/interface/database.interface';

(async () => {
  ConfigService.init();

  const config = ConfigService.get<IDatabaseInstance>('database.mongodb');
  const uri = `mongodb://${config.host}:${config.port}/${config.name}`;
  const mongodb: Database = new MongoDB(uri);
  await mongodb
    .connect()
    .then((success) => console.log(success))
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
})();
