import { Client } from '../entities/Client';
import express, { Request, Response } from 'express';
import Logger from '../lib/logger';

const router = express.Router();

router.post('/client', async (req: Request, res: Response) => {
  const { firstName, lastName, email, cardNumber, balance, phone } = req.body;

  const client = Client.create({
    first_name: firstName,
    last_name: lastName,
    email: email,
    balance: balance,
    card_number: cardNumber,
    phone: phone,
  });

  Logger.debug('CLIENT OBJ', client);

  try {
    await client.save();
    return res.status(200).json(client);
  } catch (error) {
    Logger.error('Unable to save client', error);
    return res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
});

router.delete('/client/:clientId', async (req: Request, res: Response) => {
  const { clientId } = req.params;
  try {
    const response = await Client.delete(parseInt(clientId));

    return res.json({ status: 'success', client: response });
  } catch (error) {
    return res.json({ status: 'error', message: error.message });
  }
});

export { router as clientRouter };
