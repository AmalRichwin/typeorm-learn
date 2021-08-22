import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';

import { Client } from './entities/Client';
import { Banker } from './entities/Banker';

dotenv.config();

const main = async () => {
  try {
    await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5438,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      entities: [Client, Banker],
      synchronize: true,
      logger: 'debug',
    });

    console.log('Connection to postgres');
  } catch (error) {
    console.log(error);
    throw new Error('unable to connect to postgres');
  }
};

main();
