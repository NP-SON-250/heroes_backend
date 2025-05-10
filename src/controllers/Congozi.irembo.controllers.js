import { createInvoice, pushPayment,verifyInvoice } from "../services/Congozi.irembo.services";

export const initiatePayment = async (req, res) => {
  const { amount, reference, phoneNumber, provider, description } = req.body;

  try {
    const invoice = await createInvoice({
      amount,
      reference,
      description,
      callbackUrl: 'payment.operations@irembo.com',
    });

    const payment = await pushPayment({
      invoiceNumber: invoice.invoiceNumber,
      phoneNumber,
      provider,
    });

    res.status(200).json({ invoice, payment });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const verifyPayment = async (req, res) => {
  const { invoiceNumber } = req.params;

  try {
    const invoice = await verifyInvoice(invoiceNumber);
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ error });
  }
};
