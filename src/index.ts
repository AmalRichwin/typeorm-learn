import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import express from 'express';

import { Client } from './entities/Client';
import { Banker } from './entities/Banker';
import { Transaction } from './entities/Transaction';

/**
 * routes
 */
import { createBankerRouter, createClientRouter } from './routes';

import morganMiddleware from './config/morganMiddleware';
import Logger from './lib/logger';

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

    Logger.debug('Connection to postgres');

    app.use(express.json());
    app.use(morganMiddleware);

    // routes
    app.use(createClientRouter);
    app.use(createBankerRouter);

    app.listen(8080, () => Logger.debug('Listening on port 8080'));
  } catch (error) {
    Logger.error(error);
    throw new Error('unable to connect to postgres');
  }
};

main();
