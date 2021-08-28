import { Transaction, TransactionType } from './../entities/Transaction';
import { Client } from './../entities/Client';
import express, { Request, Response } from 'express';
import e from 'express';

const router = express.Router();

router.post('/client/:clientId/transaction', async (req: Request, res: Response) => {
  const { clientId } = req.params;

  const { type, amount } = req.body;

  try {
    const client = await Client.findOne(+clientId);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    const transaction = Transaction.create({
      amount,
      type,
      client,
    });

    const saveTransaction = await transaction.save();

    console.log(typeof amount, typeof client.balance);

    if (type === TransactionType.DEPOSIT) {
      client.balance = +client.balance + amount;
      client.transactions = [transaction];
    } else if (type === TransactionType.WITHDRAW) {
      if (client.balance - amount > 100) {
        client.balance = +client.balance - amount;
        client.transactions = [transaction];
      } else {
        return res.status(400).json({ message: 'Not enough funds' });
      }
    }

    const updateClient = await client.save();

    if (saveTransaction && updateClient) {
      return res.status(200).json({ message: 'transaction added successfully', details: client });
    }
    return res.status(404).json({ message: 'error updating transaction' });
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
});

export { router as transactionRouter };
