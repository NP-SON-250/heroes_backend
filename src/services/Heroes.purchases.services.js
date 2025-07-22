import UnpaidAccounts from "../models/Heroes.unpaidaccounts.models";
import UnpaidExams from "../models/Heroes.unpaidexams.models";
import WaittingAccounts from "../models/Heroes.waittingaccounts.models";
import WaittingExams from "../models/Heroes.waittingexams.models";
import Purchases from "../models/Heroes.purchases.models";
import Exams from "../models/Heroes.exams.models";
import Accounts from "../models/Heroes.accounts.models";
import TotalUserExams from "../models/Heroes.totaluserexams.models";
import TotalUserAccounts from "../models/Heroes.totaluseraccounts.models";
import PassedExams from "../models/Heroes.passedexams.models";
import FailledExams from "../models/Heroes.failedexams.models";
import ExpiredExams from "../models/Heroes.expiredexams.models";
import ExpiredAccounts from "../models/Heroes.expiredaccounts.models";
import Notify from "../models/Heroes.notifies.models";
const generateAccessCode = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const alphanum = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let code = letters[Math.floor(Math.random() * letters.length)];

  for (let i = 0; i < 11; i++) {
    code += alphanum[Math.floor(Math.random() * alphanum.length)];
  }

  return code;
};

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
    if (userRole === "student" && itemType !== "exams") {
      throw new Error("Students are only allowed to purchase exams.");
    }

    if (userRole === "school" && itemType !== "accounts") {
      throw new Error("Schools are only allowed to purchase accounts.");
    }
    const savedPurchase = await Purchases.create({
      itemType,
      itemId,
      purchasedBy: userId,
      amount: itemFees,
      accessCode: generateAccessCode(),
      startDate: null,
      endDate: null,
    });

    let items = null;
    if (savedPurchase.itemType === "exams") {
      items = await Exams.findById(savedPurchase.itemId);
    } else if (savedPurchase.itemType === "accounts") {
      items = await Accounts.findById(savedPurchase.itemId);
    }
    let endDate = null;
    if (savedPurchase.itemType === "accounts" && savedPurchase.validIn) {
      const days = parseInt(item.validIn.replace(/\D/g, ""));
      endDate = new Date();
      endDate.setDate(endDate.getDate() + days);
    }
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
    if (itemType === "exams") {
      await TotalUserExams.create({
        exam: itemId,
        accessCode: savedPurchase.accessCode,
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
    if (userRole === "student" && itemType !== "exams") {
      throw new Error("Students are only allowed to purchase exams.");
    }

    if (userRole === "school" && itemType !== "accounts") {
      throw new Error("Schools are only allowed to purchase accounts.");
    }
    let endDate = null;
    if (itemType === "accounts") {
      const days = parseInt(item.validIn.replace(/\D/g, ""));
      endDate = new Date();
      endDate.setDate(endDate.getDate() + days);
    }
    const savedPurchase = await Purchases.create({
      itemType,
      itemId,
      purchasedBy: userId,
      amount: itemFees,
      accessCode: generateAccessCode(),
      startDate: new Date(),
      endDate,
    });
    let items = null;
    if (savedPurchase.itemType === "exams") {
      items = await Exams.findById(savedPurchase.itemId);
    } else if (savedPurchase.itemType === "accounts") {
      items = await Accounts.findById(savedPurchase.itemId);
    }
    if (itemType === "exams") {
      await WaittingExams.create({
        exam: itemId,
        accessCode: savedPurchase.accessCode,
        purchasedBy: userId,
      });
    } else if (itemType === "accounts") {
      await WaittingAccounts.create({
        account: itemId,
        purchasedBy: userId,
      });
    }
    if (itemType === "exams") {
      await TotalUserExams.create({
        exam: itemId,
        accessCode: savedPurchase.accessCode,
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
export const updatePurchase = async (id, purchaseData) => {
  const { status } = purchaseData;

  try {
    const purchaseExist = await Purchases.findById(id);
    if (!purchaseExist) {
      throw new Error("Payment not found");
    }
    if (status === "complete") {
      const startDate = new Date();
      let endDate = null;
      if (purchaseExist.itemType === "accounts") {
        const accountItem = await Accounts.findById(purchaseExist.itemId);
        if (accountItem && accountItem.validIn) {
          const days = parseInt(accountItem.validIn.replace(/\D/g, ""));
          endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + days);
        }
      }
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
    if (updatedPurchase.status === "complete") {
      const { itemId, itemType, purchasedBy } = updatedPurchase;

      if (itemType === "exams") {
        await WaittingExams.create({
          exam: itemId,
          accessCode: updatedPurchase.accessCode,
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
      const note = await Notify.findOne({ purchasedItem: id });
      if (note) {
        const updatedMessage = `Dear 
        ${note.ownerName}, Ubusabe bwawe bwo guhabwa uburenganzira kuri 
        ${updatedPurchase.itemType} wishyuye 
        ${updatedPurchase.amount} bwamaje kwemezwa. Code yokwifashisha ureba ${updatedPurchase.itemType} zawe ni ${updatedPurchase.accessCode}. Murakoze!!! `;
        await Notify.findOneAndUpdate(
          { purchasedItem: id },
          {
            status: "Access Granted",
            message: updatedMessage,
          }
        );
      }
    }

    return updatedPurchase;
  } catch (error) {
    throw new Error(`Error updating purchase: ${error.message}`);
  }
};
