import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_BASE_URL = process.env.IREMBO_API_BASE_URL;
const SECRET_KEY = process.env.IREMBO_SECRET_KEY;
const PYACCIdentfy = process.env.PYACCOUNT_IDENT_RW;
export const createInvoice = async (
  req,
  res,
  {
    itemAmount,
    currency = "RWF",
    itemCode,
    expiresAt,
    descriptions,
    transacCode,
  }
) => {
  try {
    const user_email = req.loggedInUser.email;
    const user_fname = req.loggedInUser.fName;
    const user_lname = req.loggedInUser.lName;
    const user_phone = req.loggedInUser.phone;
    const response = await axios.post(
      `${API_BASE_URL}/invoices`,
      {
        transactionId: transacCode,
        paymentAccountIdentifier: PYACCIdentfy,
        customer: {
          email: user_email,
          phoneNumber: user_phone,
          name: user_fname + " " + user_lname,
        },
        paymentItems: [
          {
            unitAmount: itemAmount,
            quantity: 1,
            code: itemCode,
          },
        ],
        description: descriptions,
        expiryAt: expiresAt,
        language: "EN",
      },
      {
        headers: {
          "irembopay-secretKey": `${SECRET_KEY}`,
          "X-API-Version": 2,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};