import * as purchaseServices from "../services/Heroes.purchases.services";
import {
  validateCreatePurchase,
  validateUpdatePurchase,
} from "../validation/Heroes.purchases.validation";
import Purchases from "../models/Heroes.purchases.models";
import UnpaidAccounts from "../models/Heroes.unpaidaccounts.models";
import UnpaidExams from "../models/Heroes.unpaidexams.models";
import WaittingAccounts from "../models/Heroes.waittingaccounts.models";
import WaittingExams from "../models/Heroes.waittingexams.models";
import TotalUserExams from "../models/Heroes.totaluserexams.models";
import TotalUserAccounts from "../models/Heroes.totaluseraccounts.models";
import PassedExams from "../models/Heroes.passedexams.models";
import FailledExams from "../models/Heroes.failedexams.models";
import ExpiredExams from "../models/Heroes.expiredexams.models";
import ExpiredAccounts from "../models/Heroes.expiredaccounts.models";

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
    const purchases = await Purchases.find({
      purchasedBy: userId,
      status: "pending",
    })
      .populate("purchasedBy")
      .populate("itemId")
      .sort({ createdAt: -1 });

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
    const purchases = await Purchases.find({
      purchasedBy: userId,
      status: "complete",
    })
      .populate("purchasedBy")
      .populate("itemId")
      .sort({ createdAt: -1 });

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
    const exams = await Purchases.findOne({ accessCode: code })
      .populate("purchasedBy")
      .populate("itemId");

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
    const purchases = await Purchases.find()
      .populate("purchasedBy")
      .populate("itemId")
      .sort({ createdAt: -1 });

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
//Admin
export const getUserPurchase = async (req, res) => {
  try {
    const userId = req.loggedInUser.id;
    const purchases = await Purchases.find({ purchasedBy: userId })
      .populate("purchasedBy")
      .populate("itemId")
      .sort({ createdAt: -1 });

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

    const purchase = await Purchases.findOne({
      _id: purchaseId,
      purchasedBy: userId,
    }).populate({
      path: "itemId",
    });

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

    const purchase = await Purchases.findById(purchaseId);

    if (!purchase) {
      return res.status(404).json({
        status: "404",
        message: "Purchase not found",
        data: result,
      });
    }

    const itemId = purchase.itemId;
    await UnpaidExams.deleteMany({
      exam: itemId,
    });
    await WaittingExams.deleteMany({
      exam: itemId,
    });

    await PassedExams.deleteMany({
      exam: itemId,
    });
    await FailledExams.deleteMany({
      exam: itemId,
    });
    await ExpiredExams.deleteMany({
      exam: itemId,
    });
    await TotalUserExams.deleteMany({
      exam: itemId,
    });
    await WaittingAccounts.deleteMany({
      account: itemId,
    });
    await UnpaidAccounts.deleteMany({
      account: itemId,
    });
    await TotalUserAccounts.deleteMany({
      account: itemId,
    });
    await ExpiredAccounts.deleteMany({
      account: itemId,
    });
    await Purchases.findByIdAndDelete(purchaseId);

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

    const purchase = await Purchases.findOne({ accessCode });

    if (!purchase) {
      return res.status(404).json({
        status: "404",
        message: "Purchase not found",
        data: result,
      });
    }
    if (purchase) {
      const id = purchase._id;
      const deletedPurchases = await Purchases.findByIdAndDelete(id);
      const purchaseAccessCode = purchase.accessCode;
      await WaittingExams.deleteOne({ accessCode: purchaseAccessCode });

      return res.status(200).json({
        status: "200",
        message: "Purchase deleted",
        data: deletedPurchases,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "500",
      message: "Purchase not found",
      error: error.message,
    });
  }
};
