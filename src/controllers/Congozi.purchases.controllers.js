import * as purchaseServices from "../services/Congozi.purchases.services";
import {
  validateCreatePurchase,
  validateUpdatePurchase,
} from "../validation/Congozi.purchases.validation";

export const purchasedItem = async (req, res) => {
  const { error, value } = validateCreatePurchase(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const userId = req.loggedInUser.id;
    const userRole = req.loggedInUser.role;
    const { itemId } = req.params;

    const result = await purchaseServices.makePurchase(
      userId,
      userRole,
      itemId,
      value
    );

    return res.status(201).json({
      status: "201",
      message: "Purchase created",
      data: result,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: err.message,
    });
  }
};
export const purchasedAndPaidItem = async (req, res) => {
  const { error, value } = validateCreatePurchase(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const userId = req.loggedInUser.id;
    const userRole = req.loggedInUser.role;
    const { itemId } = req.params;

    const result = await purchaseServices.makePaidPurchase(
      userId,
      userRole,
      itemId,
      value
    );

    return res.status(201).json({
      status: "201",
      message: "Purchase and paid success",
      data: result,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: err.message,
    });
  }
};

export const updatedPurchase = async (req, res) => {
  const { error, value } = validateUpdatePurchase(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const { id } = req.params;
    const updatepayment = await purchaseServices.updatePurchase(id, value);

    return res.status(200).json({
      message: "Purchase updated",
      data: updatepayment,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};
export const getUserPending = async (req, res) => {
  try {
    const userId = req.loggedInUser.id;
    const purchases = await purchaseServices.getPendingPurchases(userId);

    return res.status(200).json({
      status: "200",
      message: "Purchases retrieved",
      data: purchases,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};
//Complete
export const getUserComplete = async (req, res) => {
  try {
    const userId = req.loggedInUser.id;
    const purchases = await purchaseServices.getCompletePurchases(userId);

    return res.status(200).json({
      status: "200",
      message: "Purchases retrieved",
      data: purchases,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};
//Purchased exam by code
export const examByCode = async (req, res) => {
  try {
    const { code } = req.params;

    // Retrieve the payment using the access code
    const exams = await purchaseServices.getExamsByAccessCode(code);

    return res.status(200).json({
      status: "200",
      message: "Exam retrieved by access code",
      data: exams,
    });
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      status: "404",
      message: "Exam not found with the given access code",
      error: error.message,
    });
  }
};
//Admin
export const getUserAdmin = async (req, res) => {
  try {
    const userId = req.loggedInUser.id;
    const purchases = await purchaseServices.getAdminPurchases(userId);

    return res.status(200).json({
      status: "200",
      message: "Purchases retrieved",
      data: purchases,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};
//Logged user
//Admin
export const getUserPurchase = async (req, res) => {
  try {
    const userId = req.loggedInUser.id;
    const purchases = await purchaseServices.getUsersPurchases(userId);

    return res.status(200).json({
      status: "200",
      message: "Purchases retrieved",
      data: purchases,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getLoggedInUserSinglePurchase = async (req, res) => {
  try {
    const userId = req.loggedInUser.id;
    const { purchaseId } = req.params;

    const purchase = await purchaseServices.getSingleUserPurchase(
      userId,
      purchaseId
    );

    return res.status(200).json({
      status: "200",
      message: "Purchase retrieved successfully",
      data: purchase,
    });
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      status: "404",
      message: "Purchase not found",
      error: error.message,
    });
  }
};

export const deleteLoggedInUserPurchase = async (req, res) => {
  try {
    const { purchaseId } = req.params;

    const result = await purchaseServices.deleteUserPurchase(purchaseId);

    return res.status(200).json({
      status: "200",
      message: "Purchase deleted",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "500",
      message: "Purchase not found",
      error: error.message,
    });
  }
};

// Delete purchase by accessCode
export const deleteAccessCodePurchase = async (req, res) => {
  try {
    const { accessCode } = req.params;

    const result = await purchaseServices.deleteUserPurchaseByAccessCode(accessCode);

    return res.status(200).json({
      status: "200",
      message: "Purchase deleted",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "500",
      message: "Purchase not found",
      error: error.message,
    });
  }
};