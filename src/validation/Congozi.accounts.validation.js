import Joi from "joi";

//Create account validation schema
const createAccountSchema = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  fees: Joi.string().required(),
  validIn: Joi.string().required(),
});
// Function to validate account creation
export const validateCreateAccount = (accountData) => {
  return createAccountSchema.validate(accountData);
};
// Validation schema for account update
const updateAccountSchema = Joi.object({
  title: Joi.string().min(3).max(50).optional(),
  fees: Joi.string().optional(),
  validIn: Joi.string().optional(),
});
// Function to validate account update
export const validateUpdateAccount = (accountData) => {
  return updateAccountSchema.validate(accountData);
};
