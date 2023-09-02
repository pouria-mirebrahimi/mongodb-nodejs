import { Database } from '../../src/common/lib/database/database';
import { MongoDB } from '../../src/common/lib/database/mongo';
import { ConfigService } from '../../src/common/lib/helper/config.service';
import { IDatabaseDetails } from '../../src/common/lib/interface/database.interface';

(async () => {
  ConfigService.init();

  const config = ConfigService.get<IDatabaseDetails>('database.mongodb');
  const uri = `mongodb://${config.host}:${config.port}/${config.name}`;
  const mongodb: Database = new MongoDB(uri);
  await mongodb
    .connect()
    .then((success) => console.log(success))
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });

  await mongodb.close();
})();
