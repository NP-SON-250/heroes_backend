import * as accountsService from "../services/Congozi.accounts.services";
import { 
    validateCreateAccount,
    validateUpdateAccount
 } from "../validation/Congozi.accounts.validation";

// create account controller
export const createAccount = async (req, res) => {
  const { error, value } = validateCreateAccount(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const account = await accountsService.createAccount(value);
    return res.status(201).json({
      status: "201",
      message: "Account created",
      data: account,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: err.message,
    });
  }
};

export const updateAccount = async (req, res) => {
  const { error, value } = validateUpdateAccount(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { id } = req.params;
    const updatedAccont = await accountsService.updateAccount(id, value);

    return res.status(200).json({
      message: "Account updated",
      data: updatedAccont,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await accountsService.deleteAccount(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllAccount = async (req, res) => {
  try {
    const accounts = await accountsService.getAllAccount();
    return res.status(200).json({
      status: "200",
      message: "Accounts retrieved ",
      data: accounts,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAccountById = async (req, res) => {
  try {
    const { id } = req.params;
    const acccount = await accountsService.getAccountById(id);

    return res.status(200).json({
      status: "200",
      message: "Account retrieved",
      data: acccount,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};
