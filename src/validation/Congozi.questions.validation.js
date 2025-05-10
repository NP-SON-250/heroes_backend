import Joi from "joi";

//Create question validation schema
const createQuestonSchema = Joi.object({
  phrase: Joi.string().min(3).max(1000).required(),
  marks: Joi.number().required(),
  image: Joi.string().min(3).max(1000).optional(),
});
// Function to validate queston creation
export const validateCreateQueston = (questionData) => {
  return createQuestonSchema.validate(questionData);
};
// Validation schema for queston update
const updateQuestionSchema = Joi.object({
  phrase: Joi.string().min(3).max(1000).optional(),
  marks: Joi.number().optional(),
  image: Joi.string().min(3).max(1000).optional(),
});
// Function to validate question update
export const validateUpdateQuestion = (questionData) => {
  return updateQuestionSchema.validate(questionData);
};
