import Joi from "joi";

// Validation schema for user login
const loginUserSchema = Joi.object({
  identifier: Joi.string().required(),
  password: Joi.string().required(),
});

export const validateLoginUser = (userData) => {
  return loginUserSchema.validate(userData);
};
// Validation schema for user update
const updateUserSchema = Joi.object({
  companyName: Joi.string().optional(),
  tin: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().optional(),
  profile: Joi.string().optional(),
  fName: Joi.string().min(3).max(30),
  lName: Joi.string().min(3).max(30),
  idCard: Joi.string().min(3).max(16),
  address: Joi.string().optional().min(3).max(30),
  phone: Joi.string().optional(),
  role: Joi.string().valid("student", "admin", "school").optional(),
});
// Function to validate user update
export const validateUpdateUser = (userData) => {
  return updateUserSchema.validate(userData);
};
