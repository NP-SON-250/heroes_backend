import UnpaidAccounts from "../models/Congozi.unpaidaccounts.models";
import UnpaidExams from "../models/Congozi.unpaidexams.models";
import WaittingAccounts from "../models/Congozi.waittingaccounts.models";
import WaittingExams from "../models/Congozi.waittingexams.models";
import Purchases from "../models/Congozi.purchases.models";
import Exams from "../models/Congozi.exams.models";
import Accounts from "../models/Congozi.accounts.models";
import TotalUserExams from "../models/Congozi.totaluserexams.models";
import TotalUserAccounts from "../models/Congozi.totaluseraccounts.models";
import PassedExams from "../models/Congozi.passedexams.models";
import FailledExams from "../models/Congozi.failedexams.models";
import ExpiredExams from "../models/Congozi.expiredexams.models";
import ExpiredAccounts from "../models/Congozi.expiredaccounts.models";
//Code generator
const generateAccessCode = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const alphanum = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let code = letters[Math.floor(Math.random() * letters.length)];

  for (let i = 0; i < 11; i++) {
    code += alphanum[Math.floor(Math.random() * alphanum.length)];
  }

  return code;
};
// Make purchase no payment
export const makePaidPurchase = async (userId, userRole, itemId) => {
  try {
    let itemType = null;
    let itemFees = null;
    let item = await Exams.findById(itemId);

    if (item) {
      itemType = "exams";
      itemFees = item.fees;
    } else {
      item = await Accounts.findById(itemId);
      if (item) {
        itemType = "accounts";
        itemFees = item.fees;
      }
    }

    if (!itemType || !item) {
      throw new Error("Item not found in exams or accounts.");
    }

    // Restrict based on role
    if (userRole === "student" && itemType !== "exams") {
      throw new Error("Students are only allowed to purchase exams.");
    }

    if (userRole === "school" && itemType !== "accounts") {
      throw new Error("Schools are only allowed to purchase accounts.");
    }

    // If accounts, determine endDate from validity (e.g., "30d")
    let endDate = null;
    if (itemType === "accounts") {
      const days = parseInt(item.validIn.replace(/\D/g, ""));
      endDate = new Date();
      endDate.setDate(endDate.getDate() + days);
    }
    // Save purchase
    const savedPurchase = await Purchases.create({
      itemType,
      itemId,
      purchasedBy: userId,
      amount: itemFees,
      accessCode: generateAccessCode(),
      startDate: new Date(),
      endDate,
      status: "complete",
    });
    //Find saved purchase item
    let items = null;
    if (savedPurchase.itemType === "exams") {
      items = await Exams.findById(savedPurchase.itemId);
    } else if (savedPurchase.itemType === "accounts") {
      items = await Accounts.findById(savedPurchase.itemId);
    }

    // Save in unpaid exams /accounts
    if (itemType === "exams") {
      await WaittingExams.create({
        exam: itemId,
        purchasedBy: userId,
      });
    } else if (itemType === "accounts") {
      await WaittingAccounts.create({
        account: itemId,
        purchasedBy: userId,
      });
    }

    // Save in total exams / accounts
    if (itemType === "exams") {
      await TotalUserExams.create({
        exam: itemId,
        purchasedBy: userId,
      });
    } else if (itemType === "accounts") {
      await TotalUserAccounts.create({
        account: itemId,
        purchasedBy: userId,
      });
    }

    return {
      message: `${itemType} has been purchased.`,
      purchase: savedPurchase,
    };
  } catch (error) {
    console.error(error);
    throw new Error(`Error making purchase: ${error.message}`);
  }
};
// Make purchase no payment
export const makePurchase = async (userId, userRole, itemId) => {
  try {
    let itemType = null;
    let itemFees = null;
    let item = await Exams.findById(itemId);

    if (item) {
      itemType = "exams";
      itemFees = item.fees;
    } else {
      item = await Accounts.findById(itemId);
      if (item) {
        itemType = "accounts";
        itemFees = item.fees;
      }
    }

    if (!itemType || !item) {
      throw new Error("Item not found in exams or accounts.");
    }

    // Restrict based on role
    if (userRole === "student" && itemType !== "exams") {
      throw new Error("Students are only allowed to purchase exams.");
    }

    if (userRole === "school" && itemType !== "accounts") {
      throw new Error("Schools are only allowed to purchase accounts.");
    }

    // Save purchase
    const savedPurchase = await Purchases.create({
      itemType,
      itemId,
      purchasedBy: userId,
      amount: itemFees,
      accessCode: generateAccessCode(),
      startDate: null,
      endDate: null,
    });
    //Find saved purchase item to have its fees
    let items = null;
    if (savedPurchase.itemType === "exams") {
      items = await Exams.findById(savedPurchase.itemId);
    } else if (savedPurchase.itemType === "accounts") {
      items = await Accounts.findById(savedPurchase.itemId);
    }
    // If accounts, determine endDate from validity (e.g., "30d")
    let endDate = null;
    if (savedPurchase.itemType === "accounts" && savedPurchase.validIn) {
      const days = parseInt(item.validIn.replace(/\D/g, ""));
      endDate = new Date();
      endDate.setDate(endDate.getDate() + days);
    }
    // Save in unpaid exams /accounts
    if (itemType === "exams") {
      await UnpaidExams.create({
        exam: itemId,
        purchasedBy: userId,
      });
    } else if (itemType === "accounts") {
      await UnpaidAccounts.create({
        account: itemId,
        purchasedBy: userId,
      });
    }

    // Save in total exams / accounts
    if (itemType === "exams") {
      await TotalUserExams.create({
        exam: itemId,
        purchasedBy: userId,
      });
    } else if (itemType === "accounts") {
      await TotalUserAccounts.create({
        account: itemId,
        purchasedBy: userId,
      });
    }

    return {
      message: `${itemType} has been purchased.`,
      purchase: savedPurchase,
    };
  } catch (error) {
    console.error(error);
    throw new Error(`Error making purchase: ${error.message}`);
  }
};

// Service to update a purchase
export const updatePurchase = async (id, purchaseData) => {
  const { status } = purchaseData;

  try {
    const purchaseExist = await Purchases.findById(id);
    if (!purchaseExist) {
      throw new Error("Payment not found");
    }

    // Only process dates if marking as complete
    if (status === "complete") {
      const startDate = new Date();
      let endDate = null;

      // If account, calculate endDate from validIn
      if (purchaseExist.itemType === "accounts") {
        const accountItem = await Accounts.findById(purchaseExist.itemId);
        if (accountItem && accountItem.validIn) {
          const days = parseInt(accountItem.validIn.replace(/\D/g, ""));
          endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + days);
        }
      }

      // Add startDate and endDate to the update payload
      purchaseData.startDate = startDate;
      purchaseData.endDate = endDate;
    }

    const updatedPurchase = await Purchases.findByIdAndUpdate(
      id,
      purchaseData,
      {
        new: true,
      }
    );

    // Move to waiting + cleanup unpaid
    if (updatedPurchase.status === "complete") {
      const { itemId, itemType, purchasedBy } = updatedPurchase;

      if (itemType === "exams") {
        await WaittingExams.create({
          exam: itemId,
          purchasedBy: purchasedBy,
        });
        await UnpaidExams.deleteOne({ exam: itemId, purchasedBy });
      } else if (itemType === "accounts") {
        await WaittingAccounts.create({
          account: itemId,
          purchasedBy: purchasedBy,
        });
        await UnpaidAccounts.deleteOne({ account: itemId, purchasedBy });
      }
    }

    return updatedPurchase;
  } catch (error) {
    throw new Error(`Error updating purchase: ${error.message}`);
  }
};
// Service to get all purchases for admin
export const getUsersPurchases = async (userId) => {
  try {
    const purchases = await Purchases.find({ purchasedBy: userId })
      .populate("purchasedBy")
      .populate("itemId")
      .sort({ createdAt: -1 });

    return purchases;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve user purchases");
  }
};
// Service to get all purchases for admin
export const getAdminPurchases = async () => {
  try {
    const purchases = await Purchases.find()
      .populate("purchasedBy")
      .populate("itemId")
      .sort({ createdAt: -1 });

    return purchases;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve user purchases");
  }
};

export const getPendingPurchases = async (userId) => {
  try {
    const purchases = await Purchases.find({
      purchasedBy: userId,
      status: "pending",
    })
      .populate("purchasedBy")
      .populate("itemId")
      .sort({ createdAt: -1 });

    return purchases;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve user purchases");
  }
};
// Service to get all pending purchases
export const getCompletePurchases = async (userId) => {
  try {
    const purchases = await Purchases.find({
      purchasedBy: userId,
      status: "complete",
    })
      .populate("purchasedBy")
      .populate("itemId")
      .sort({ createdAt: -1 });

    return purchases;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve user purchases");
  }
};
//Get exam by access code
export const getExamsByAccessCode = async (code) => {
  try {
    // Correctly query by accessCode, not by _id
    const exam = await Purchases.findOne({ accessCode: code })
      .populate("purchasedBy")
      .populate("itemId");

    if (!exam) {
      throw new Error("No exam not found with this access code.");
    }

    return exam;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve the exams by access code");
  }
};
// Service to get a single purchase for the logged-in user
export const getSingleUserPurchase = async (userId, purchaseId) => {
  try {
    const purchase = await Purchases.findOne({
      _id: purchaseId,
      purchasedBy: userId,
    }).populate({
      path: "itemId",
    });

    if (!purchase) {
      throw new Error("Purchase not found or unauthorized access");
    }

    return purchase;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve the purchase");
  }
};

// Service to delete a purchase for the logged-in user
export const deleteUserPurchase = async (purchaseId) => {
  try {
    // Find the purchase that belongs to the logged-in user
    const purchase = await Purchases.findById(purchaseId);

    if (!purchase) {
      throw new Error("Purchase not found");
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
    // Delete the purchase
    await Purchases.findByIdAndDelete(purchaseId);

    return {
      message: "Purchase deleted",
      deletedPurchase: purchase,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete the purchase");
  }
};

// Service to delete a purchase by accessCode
export const deleteUserPurchaseByAccessCode = async (accessCode) => {
  try {
    // Find the purchase using accessCode
    const purchase = await Purchases.findOne({ accessCode });

    if (!purchase) {
      throw new Error("Purchase not found");
    }

    const itemId = purchase.itemId;

    // Delete related exam/account records based on itemType
    await UnpaidExams.deleteMany({ exam: itemId });
    await WaittingExams.deleteMany({ exam: itemId });
    await PassedExams.deleteMany({ exam: itemId });
    await FailledExams.deleteMany({ exam: itemId });
    await ExpiredExams.deleteMany({ exam: itemId });
    await TotalUserExams.deleteMany({ exam: itemId });

    await WaittingAccounts.deleteMany({ account: itemId });
    await UnpaidAccounts.deleteMany({ account: itemId });
    await TotalUserAccounts.deleteMany({ account: itemId });
    await ExpiredAccounts.deleteMany({ account: itemId });

    // Delete the purchase itself
    await Purchases.deleteOne({ accessCode });

    return {
      message: "Purchase deleted successfully",
      deletedPurchase: purchase,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete the purchase by accessCode");
  }
};
