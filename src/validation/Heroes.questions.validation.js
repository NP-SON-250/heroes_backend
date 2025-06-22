import Joi from "joi";
const createQuestonSchema = Joi.object({
  phrase: Joi.string().min(3).max(1000).required(),
  marks: Joi.number().required(),
  image: Joi.string().min(3).max(1000).optional(),
});
export const validateCreateQueston = (questionData) => {
  return createQuestonSchema.validate(questionData);
};
const updateQuestionSchema = Joi.object({
  phrase: Joi.string().min(3).max(1000).optional(),
  marks: Joi.number().optional(),
  image: Joi.string().min(3).max(1000).optional(),
});
export const validateUpdateQuestion = (questionData) => {
  return updateQuestionSchema.validate(questionData);
};
