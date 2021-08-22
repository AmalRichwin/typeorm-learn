import { Banker } from './../entities/Banker';
import { Client } from './../entities/Client';
import express, { Request, Response } from 'express';
import Logger from '../lib/logger';

const router = express.Router();

router.post('/api/banker', async (req: Request, res: Response) => {
  const { firstName, lastName, email, cardNumber, employeeId, phone } = req.body;

  const banker = Banker.create({
    first_name: firstName,
    last_name: lastName,
    email: email,
    card_number: cardNumber,
    phone: phone,
    employee_id: employeeId,
  });

  Logger.debug('CLIENT OBJ', banker);

  try {
    await banker.save();
    return res.status(200).json(banker);
  } catch (error) {
    Logger.error('Unable to save banker', error);
    return res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
});

export { router as createBankerRouter };
