import Joi from "joi";

const createPurchaseSchema = Joi.object({
  itemType: Joi.string().valid("exams", "accounts").optional(),
  itemId: Joi.string().optional(),
  purchasedBy: Joi.string().optional(),
});
export const validateCreatePurchase = (purchaseData) => {
  return createPurchaseSchema.validate(purchaseData);
};
const updatePurchaseSchema = Joi.object({
  itemType: Joi.string().valid("exams", "accounts").optional(),
  itemId: Joi.string().optional(),
  purchasedBy: Joi.string().optional(),
  status: Joi.string()
    .valid("pending", "complete", "waitingConfirmation", "expired")
    .optional(),
});
export const validateUpdatePurchase = (purchaseData) => {
  return updatePurchaseSchema.validate(purchaseData);
};
