import { Banker } from '../entities/Banker';
import { Client } from '../entities/Client';
import express, { Request, Response } from 'express';
import Logger from '../lib/logger';

const router = express.Router();

router.post('/banker', async (req: Request, res: Response) => {
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

router.put('/banker/:bankerId/client/:clientId', async (req, res) => {
  const { bankerId, clientId } = req.params;
  try {
    const client = await Client.findOne(parseInt(clientId));

    const banker = await Banker.findOne(parseInt(bankerId));

    if (!client || !banker) {
      return res.json({ status: 'error', message: ' banker or client not found' });
    }
    banker.clients = [client];

    await banker.save();

    return res.json({ status: 'success', message: 'banker connected to client' });
  } catch (error) {
    return res.json({ status: 'error', message: error.message });
  }
});

export { router as bankerRouter };
