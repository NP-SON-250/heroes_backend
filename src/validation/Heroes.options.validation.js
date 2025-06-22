import Joi from "joi";

const createOptionSchema = Joi.object({
  text: Joi.string().min(1).max(1000).optional(),
  isCorrect: Joi.boolean().optional(),
});
export const validateCreateOption = (optionData) => {
  return createOptionSchema.validate(optionData);
};
const updateOptionSchema = Joi.object({
    text: Joi.string().min(1).max(1000).optional(),
    isCorrect: Joi.boolean().optional(),
});
export const validateUpdateOption = (optionData) => {
  return updateOptionSchema.validate(optionData);
};
