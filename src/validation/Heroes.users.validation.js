import Joi from "joi";

const loginUserSchema = Joi.object({
  identifier: Joi.string().required(),
  password: Joi.string().required(),
});

export const validateLoginUser = (userData) => {
  return loginUserSchema.validate(userData);
};
const updateUserSchema = Joi.object({
  companyName: Joi.string().optional(),
  tin: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().optional(),
  profile: Joi.string().optional(),
  fName: Joi.string().optional().min(3).max(30),
  lName: Joi.string().optional().min(3).max(30),
  idCard: Joi.string().optional().min(3).max(16),
  address: Joi.string().optional().min(3).max(30),
  phone: Joi.string().optional(),
  role: Joi.string().valid("student", "admin", "school","supperAdmin").optional(),
});
export const validateUpdateUser = (userData) => {
  return updateUserSchema.validate(userData);
};
