import Joi from "joi";

const createAccountSchema = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  fees: Joi.string().required(),
  validIn: Joi.string().required(),
});
export const validateCreateAccount = (accountData) => {
  return createAccountSchema.validate(accountData);
};
const updateAccountSchema = Joi.object({
  title: Joi.string().min(3).max(50).optional(),
  fees: Joi.string().optional(),
  validIn: Joi.string().optional(),
});
export const validateUpdateAccount = (accountData) => {
  return updateAccountSchema.validate(accountData);
};
