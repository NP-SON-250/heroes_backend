import Joi from "joi";
const createExamSchema = Joi.object({
  number: Joi.string().required(),
  fees: Joi.string().required(),
  title: Joi.string().min(3).max(30).required(),
  type: Joi.string().valid("gukora", "kwiga").required().min(3).max(30),
});
export const validateCreateExam = (examData) => {
  return createExamSchema.validate(examData);
};
const updateExamSchema = Joi.object({
    title: Joi.string().min(3).max(30).optional(),
    type: Joi.string().min(3).max(30).valid("gukora", "kwiga").optional(),
    number: Joi.string().optional(),
    fees: Joi.string().optional(),
});
export const validateUpdateExam = (examData) => {
  return updateExamSchema.validate(examData);
};
