import Joi from "joi";

//Create option validation schema
const createOptionSchema = Joi.object({
  text: Joi.string().min(1).max(1000).optional(),
  isCorrect: Joi.boolean().optional(),
});
// Function to validate option creation
export const validateCreateOption = (optionData) => {
  return createOptionSchema.validate(optionData);
};
// Validation schema for option update
const updateOptionSchema = Joi.object({
    text: Joi.string().min(1).max(1000).optional(),
    isCorrect: Joi.boolean().optional(),
});
// Function to validate option update
export const validateUpdateOption = (optionData) => {
  return updateOptionSchema.validate(optionData);
};
