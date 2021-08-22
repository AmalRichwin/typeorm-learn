import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import express from 'express';

import { Client } from './entities/Client';
import { Banker } from './entities/Banker';
import { Transaction } from './entities/Transaction';

dotenv.config();

const app = express();

const main = async () => {
  try {
    await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5438,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      entities: [Client, Banker, Transaction],
      synchronize: true,
      logger: 'debug',
    });

    console.log('Connection to postgres');

    app.listen(8080, () => console.log('Listening on port 8080'));
  } catch (error) {
    console.log(error);
    throw new Error('unable to connect to postgres');
  }
};

main();
