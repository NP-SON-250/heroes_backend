import express from 'express';
import { initiatePayment,verifyPayment } from '../controllers/Congozi.irembo.controllers';

const iremboRoute = express.Router();

iremboRoute.post('/pay', initiatePayment);
iremboRoute.get('/verify/:invoiceNumber', verifyPayment);

export default iremboRoute;
