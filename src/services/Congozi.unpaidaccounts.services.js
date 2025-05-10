import UnpaidAccounts from "../models/Congozi.unpaidaccounts.models";

// Service to get all unpaid accounts for a logged-in user
export const getUserUnpaidAccounts = async (userId) => {
  try {
    const accounts = await UnpaidAccounts.find({ purchasedBy: userId })
      .populate({
        path: "account",
      })
      .sort({ createdAt: -1 });

    return accounts;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve user unpaid accounts");
  }
};

// Service to get a single unpaid account for the logged-in user
export const getSingleUserUnpaidAccounts = async (userId, id) => {
  try {
    const account = await UnpaidAccounts.findOne({
      _id: id,
      purchasedBy: userId,
    }).populate({
      path: "account",
    });

    if (!account) {
      throw new Error("Unpaid account not found or unauthorized access");
    }

    return account;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve the unpaid account");
  }
};
