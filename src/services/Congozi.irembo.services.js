import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API_BASE_URL = process.env.IREMBO_API_BASE_URL;
const SECRET_KEY = process.env.IREMBO_SECRET_KEY;

export const createInvoice = async ({ amount, reference, description, callbackUrl }) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/invoice`,
      {
        amount,
        currency: 'RWF',
        reference,
        description,
        callbackUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const pushPayment = async ({ invoiceNumber, phoneNumber, provider }) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/payment/mobile-money`,
      { invoiceNumber, phoneNumber, provider },
      {
        headers: {
          Authorization: `Bearer ${SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const verifyInvoice = async (invoiceNumber) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/invoice/${invoiceNumber}`, {
      headers: {
        Authorization: `Bearer ${SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
