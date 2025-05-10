import Joi from "joi";

// Create purchase validation schema
const createPurchaseSchema = Joi.object({
  itemType: Joi.string().valid("exams", "accounts").optional(),
  itemId: Joi.string().optional(),
  purchasedBy: Joi.string().optional(),
});

// Function to validate purchase creation
export const validateCreatePurchase = (purchaseData) => {
  return createPurchaseSchema.validate(purchaseData);
};

// Update purchase validation schema
const updatePurchaseSchema = Joi.object({
  itemType: Joi.string().valid("exams", "accounts").optional(),
  itemId: Joi.string().optional(),
  purchasedBy: Joi.string().optional(),
  status: Joi.string().valid("pending", "complete", "expired").optional(),
});

// Function to validate purchase update
export const validateUpdatePurchase = (purchaseData) => {
  return updatePurchaseSchema.validate(purchaseData);
};
